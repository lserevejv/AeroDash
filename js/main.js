/**
 * main.js — entry point, game state machine and the render loop.
 *
 * States: boot -> hub -> playing <-> pause -> results -> hub | playing
 *
 * THE ONE WAY A RUN ENDS
 * ----------------------
 * A contact taken with no Shield left. That is it. There is no timer, no
 * distance limit and no score condition anywhere in this file — v1's fixed
 * 5,000 m cutoff is gone, not merely raised. If you are reading this while
 * adding an end condition, it belongs in shield.js or nowhere.
 *
 * SIMULATION VS RENDER
 * --------------------
 * `simulate(dt)` is kept strictly separate from `render()`, so one frame of
 * game logic is reproducible from dt alone. That is what lets the automated QA
 * harness fly entire runs with no GPU in the loop, and it is why the seeded
 * generator can promise "same seed, same world".
 */

import * as THREE from 'three';

import { createSceneCore } from './scene.js';
import { createPostFX, createFpsWatchdog, TIERS, TIER_ORDER } from './postfx.js';
import { createPlayer } from './player.js';
import { createCollectibles } from './collectibles.js';
import { createObstacles } from './obstacles.js';
import { createWorld } from './world.js';
import { createGates } from './checkpoints.js';
import { createShield } from './shield.js';
import { createAudio } from './audio.js';
import { createUI } from './ui.js';
import { createApi } from './net/api.js';
import { createRecorder, createGhost } from './net/ghosts.js';
import { installDiagnostics } from './diagnostics.js';

import * as economy from './economy.js';
import { computeMods } from './upgrades.js';
import { performRebirth } from './rebirth.js';
import { evaluate as evaluateAchievements } from './achievements.js';
import { buildSequence, createPlan, WORLD_LENGTH, WORLDS } from './worlds.js';
import {
  randomSeed, seedFromString, seedToString, dailySeed, dailyKey,
} from './prng.js';
import {
  guessQualityTier, isTouchDevice, formatScore, formatDistance, clamp,
} from './utils.js';

/* ==========================================================================
   Scoring rules
   ========================================================================== */

const COMBO_MAX = 25;
const COMBO_DECAY_EVERY = 1.2;
const STREAM_SCORE_RATE = 18;    // points/second while riding a current

const ORB_VALUE = 10;
const ORB_BIG_VALUE = 35;
const RING_VALUE = 150;

const STATE = {
  BOOT: 'boot',
  HUB: 'hub',
  PLAYING: 'playing',
  PAUSED: 'pause',
  RESULTS: 'results',
};

/** Human-readable names for the thing that ended a run. */
const HAZARD_NAMES = {
  cloud: 'a cloud bank',
  coral: 'a coral cluster',
  leaf: 'a canopy bough',
  pylon: 'a circuit pylon',
  shard: 'a drifting shard',
  crystal: 'a crystal spire',
};

boot().catch((err) => {
  console.error('[aerodrift] fatal during boot', err);
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('is-active'));
  document.getElementById('screen-offline')?.classList.add('is-active');
});

async function boot() {
  const save = economy.loadSave();
  const touch = isTouchDevice();
  const api = createApi();

  /* --- Quality tier ----------------------------------------------------- */
  const autoQuality = save.settings.quality === 'auto';
  let tierName = autoQuality ? guessQualityTier() : save.settings.quality;
  if (!TIERS[tierName]) tierName = 'medium';
  const tier0 = TIERS[tierName];

  /* --- Core systems ----------------------------------------------------- */
  const canvas = document.getElementById('gl');
  const sceneCore = createSceneCore(canvas, {
    pixelRatioCap: tier0.pixelRatio,
    antialias: tier0.msaa > 0,
  });
  const fx = createPostFX(sceneCore, tierName);
  sceneCore.setBokehEnabled(tier0.bokeh);
  sceneCore.setExposure(save.settings.exposure);

  const player = createPlayer(sceneCore, {
    trailCount: TIERS.high.trailCount,      // allocate once at max...
    cheapGlass: tier0.cheapGlass,
  });

  const collect = createCollectibles(sceneCore, {
    capacityOrbs: 320,
    cheapGlass: tier0.cheapGlass,
  });

  const obstacles = createObstacles(sceneCore, {
    cloudDetail: tier0.cloudDetail,
    capacity: 460,
  });

  const world = createWorld(sceneCore, collect, obstacles, {
    chunksAhead: tier0.chunksAhead,
    moteCount: TIERS.high.motes,            // ...and scale the active count live
    veilCount: TIERS.high.veils,
    surfaceSegments: tier0.surfaceSegments,
  });

  const gates = createGates(sceneCore, { cheapGlass: tier0.cheapGlass });
  const shield = createShield();
  const ghost = createGhost(sceneCore);
  const recorder = createRecorder();
  const audio = createAudio(save.settings);

  /* --- Run state -------------------------------------------------------- */
  let state = STATE.BOOT;
  /** Never resets: drives every idle animation phase in the scene. */
  let clock = 0;
  let mods = computeMods(save);

  const run = newRun();

  function newRun() {
    return {
      seed: 0,
      daily: false,
      plan: createPlan(buildSequence(save)),
      score: 0,
      combo: 1,
      bestCombo: 1,
      /** +1 per Major checkpoint; multiplies everything for the rest of the run. */
      checkpointMult: 1,
      distance: 0,
      droplets: 0,
      prisms: 0,
      orbs: 0,
      rings: 0,
      checkpoints: 0,
      portals: 0,
      hits: 0,
      /** Distance since the last contact, and the best such streak this run. */
      cleanDistance: 0,
      bestCleanDistance: 0,
      sincePickup: 0,
      decayAcc: 0,
      riding: false,
      wasRiding: false,
      worldAnnounced: -1,
      stratumAnnounced: '',
      time: 0,
      fatal: false,
      cause: '',
    };
  }

  /* --- UI --------------------------------------------------------------- */
  const ui = createUI({
    save, audio, api,
    onPlay: () => startRun({ daily: false }),
    onDaily: () => startRun({ daily: true }),
    onResume: () => resumeRun(),
    onEndRun: () => endRun({ fatal: false }),
    onHome: () => goHub(),
    onSettingsChange: (key, value) => applySetting(key, value),
    onEquip: () => { applyCosmetics(); persist(); },
    onRebirth: () => doRebirth(),
    onResetProgress: () => { economy.clearSave(); location.reload(); },
    onPhotoEnter: () => enterPhoto(),
    onPhotoExit: () => exitPhoto(),
    onPhotoSave: () => { photo.capture = true; },
    onPhotoChange: (p) => Object.assign(photo, p),
    onReportIssue: () => diag.open(),
  });

  /* --- Diagnostics -------------------------------------------------------
     Registered as soon as there is a game to describe. Everything it needs is
     handed in rather than imported, so it can never become a load-order
     dependency of the thing it is supposed to be reporting on. */
  const diag = installDiagnostics({
    probe: () => window.__aerodrift.probe(),
    sceneCore,
    save,
    api,
    audio,
    /** Prove storage is writable *now*, not just readable at boot. */
    writeProbe: () => economy.writeSave(save),
  });

  ui.setTouch(touch);
  ui.syncSettingsUI();
  applyCosmetics();

  fx.setBloomScale(save.settings.bloom);
  applyTier(tierName, { silent: true });

  /* --- Audio starts on the first genuine user gesture ------------------- */
  // Constructing the AudioContext any earlier is what trips Chrome's autoplay
  // warning, so we wait for a real interaction and build it inside the handler.
  const startAudioOnce = () => {
    audio.start().then((ok) => {
      if (ok) {
        audio.setVolume(save.settings.volume);
        audio.setMuted(save.settings.muted);
      }
    });
    window.removeEventListener('pointerdown', startAudioOnce);
    window.removeEventListener('keydown', startAudioOnce);
    window.removeEventListener('touchstart', startAudioOnce);
  };
  window.addEventListener('pointerdown', startAudioOnce);
  window.addEventListener('keydown', startAudioOnce);
  window.addEventListener('touchstart', startAudioOnce);

  // Probe the backend once, quietly. Nothing waits on the answer.
  api.health();

  /* ======================================================================
     Settings + quality
     ====================================================================== */

  function applySetting(key, value) {
    switch (key) {
      case 'exposure': sceneCore.setExposure(value); break;
      case 'bloom': fx.setBloomScale(value); break;
      case 'volume': audio.setVolume(value); break;
      case 'muted': audio.setMuted(value); break;
      case 'ghosts': ghost.setEnabled(value); break;
      case 'displayName': break; // persisted below, nothing live to change
      case 'quality':
        if (value === 'auto') {
          watchdog.setEnabled(true);
          applyTier(guessQualityTier());
        } else {
          watchdog.setEnabled(false);
          applyTier(value);
        }
        break;
      default: break;
    }
    persist();
  }

  /**
   * Everything a tier controls that can change while the game is running.
   * Geometry-level choices (cloud tessellation, surface plane density) are
   * baked at construction from the opening tier; the live knobs below are the
   * ones that actually move the framerate.
   */
  function applyTier(name, { silent = false } = {}) {
    if (!TIERS[name]) return;
    tierName = name;
    const t = TIERS[name];

    fx.setTier(name);
    world.setChunksAhead(t.chunksAhead);
    world.setParticleBudget(t.motes, t.veils);
    // Transmission forces an extra full scene render per frame. Dropping it is
    // the single biggest win available on a weak GPU, and it can be toggled on
    // live materials without rebuilding them.
    setGlassCheap(t.cheapGlass);

    if (!silent) {
      ui.setQualityNote(
        save.settings.quality === 'auto'
          ? `Auto — currently ${t.label}.`
          : 'Auto steps quality down if the framerate dips.',
      );
    }
  }

  function setGlassCheap(cheap) {
    sceneCore.scene.traverse((o) => {
      const mat = o.material;
      if (!mat || !mat.isMeshPhysicalMaterial || mat.transmission === undefined) return;
      const want = cheap ? 0 : 1;
      if (mat.transmission === want) return;
      mat.transmission = want;
      mat.opacity = cheap ? 0.42 : 1;
      mat.transparent = true;
      mat.needsUpdate = true; // transmission on/off changes the shader program
    });
  }

  const watchdog = createFpsWatchdog({
    threshold: 44,
    onStepDown: (fps) => {
      const i = TIER_ORDER.indexOf(tierName);
      if (i <= 0) return; // already at the floor; nothing further to give up
      const next = TIER_ORDER[i - 1];
      console.info(`[aerodrift] ${fps}fps — stepping quality down to ${next}`);
      applyTier(next);
      ui.setQualityNote(`Auto — stepped down to ${TIERS[next].label} (${fps}fps).`);
    },
  });
  watchdog.setEnabled(autoQuality);

  /* ======================================================================
     Cosmetics
     ====================================================================== */

  function applyCosmetics() {
    player.setTrail(ui.equipped('trail'));
    player.setSkin(ui.equipped('skin'));
    player.setAura(ui.equipped('aura'));
  }

  /* ======================================================================
     State transitions
     ====================================================================== */

  function goHub() {
    state = STATE.HUB;
    Object.assign(run, newRun());
    world.reset(randomSeed(), run.plan);
    collect.reset();
    obstacles.reset();
    gates.reset();
    player.reset();
    player.setEnabled(false);
    ghost.clear();
    recorder.stop();
    audio.setIntensity(1);
    ui.refreshHub();
    ui.show('hub');
  }

  /**
   * @param {{daily?:boolean, seed?:number}} opts
   *   `seed` is honoured so a run can be reproduced from a shared code; the
   *   URL's `?seed=` is read here too.
   */
  function startRun({ daily = false, seed = null } = {}) {
    const urlSeed = seedFromString(new URLSearchParams(location.search).get('seed'));
    const chosen = daily ? dailySeed() : (seed ?? urlSeed ?? randomSeed());

    Object.assign(run, newRun());
    run.seed = chosen >>> 0;
    run.daily = daily;
    run.plan = createPlan(buildSequence(save));

    // Upgrades are folded into one flat object exactly here, and nothing reads
    // the upgrade definitions again until the next run starts.
    mods = computeMods(save);
    shield.reset(mods);

    world.reset(run.seed, run.plan);
    collect.reset();
    obstacles.reset();
    gates.reset();
    player.reset();
    applyCosmetics();
    player.setEnabled(true);
    watchdog.reset();

    recorder.start();
    ghost.clear();
    if (save.settings.ghosts !== false) loadGhost(run.seed);

    state = STATE.PLAYING;
    ui.show('playing');
    ui.setPauseSeed(run.seed, run.daily);
    announceWorld(0, true);
  }

  /** Fetch a ghost for this seed in the background. Never blocks the run. */
  async function loadGhost(seed) {
    const stored = await api.ghostForSeed(seed);
    // The player may have ended the run (or started another) while we waited.
    if (!stored || run.seed !== seed || state !== STATE.PLAYING) return;
    if (ghost.load(stored)) console.info(`[aerodrift] racing ghost: ${stored.name || 'anonymous'}`);
  }

  function pauseRun() {
    if (state !== STATE.PLAYING) return;
    state = STATE.PAUSED;
    player.setEnabled(false);
    ui.show('pause');
  }

  function resumeRun() {
    if (state !== STATE.PAUSED) return;
    if (photo.active) exitPhoto();
    state = STATE.PLAYING;
    player.setEnabled(true);
    ui.show('playing');
  }

  /**
   * End the run. `fatal` is true only when the Shield ran out — everything else
   * is the player choosing to stop from the pause menu.
   */
  function endRun({ fatal = false, cause = '' } = {}) {
    if (state !== STATE.PLAYING && state !== STATE.PAUSED) return;
    state = STATE.RESULTS;
    player.setEnabled(false);
    recorder.stop();
    if (photo.active) exitPhoto();
    audio.setIntensity(1);

    run.fatal = fatal;
    run.cause = cause;
    run.bestCleanDistance = Math.max(run.bestCleanDistance, run.cleanDistance);

    /* --- Fold the run into the save ------------------------------------ */
    const stats = save.stats;
    stats.orbs += run.orbs;
    stats.rings += run.rings;
    stats.checkpoints += run.checkpoints;
    stats.portals += run.portals;
    stats.hits += run.hits;
    if (run.hits === 0 && run.distance > 0) stats.cleanRuns += 1;
    stats.bestNoHitDistance = Math.max(stats.bestNoHitDistance, Math.floor(run.bestCleanDistance));

    if (run.daily) {
      const key = dailyKey();
      if (save.daily.key !== key) save.daily = { key, score: 0, distance: 0, played: false };
      save.daily.played = true;
      save.daily.score = Math.max(save.daily.score, Math.floor(run.score));
      save.daily.distance = Math.max(save.daily.distance, Math.floor(run.distance));
    }

    const settled = economy.settleRun(save, run);
    const earned = evaluateAchievements(save, run, economy);
    persist();

    /* --- Results ------------------------------------------------------- */
    // A first long run can clear a dozen milestones at once. Name a few and
    // total the rest, so the panel celebrates without becoming a wall of text.
    const SHOWN = 4;
    const toasts = earned.slice(0, SHOWN).map((a) => `Milestone — ${a.name}`);
    if (earned.length > SHOWN) toasts.push(`…and ${earned.length - SHOWN} more milestones`);
    if (earned.length) {
      const bonus = earned.reduce((sum, a) => sum + a.reward, 0);
      toasts.push(`+${formatScore(bonus)} Droplets from milestones`);
    }

    audio.chime();
    if (settled.leveledUp) setTimeout(() => audio.levelUp(), 500);

    ui.showResults({
      fatal,
      cause,
      score: run.score,
      distance: run.distance,
      bestCombo: run.bestCombo,
      worldsVisited: Math.floor(run.distance / WORLD_LENGTH) + 1,
      droplets: run.droplets,
      prisms: run.prisms,
      xp: settled.xpGain,
      leveledUp: settled.leveledUp,
      levelAfter: settled.levelAfter,
      isNewBest: settled.isNewBestScore,
      seed: run.seed,
      daily: run.daily,
      toasts,
    });

    submitRun();
  }

  /** Copy the run up to the leaderboard, if there is one. Fire and forget. */
  function submitRun() {
    if (!api.base || run.distance < 200) return;
    api.submitRun({
      playerId: save.playerId,
      name: save.displayName || '',
      seed: run.seed,
      score: Math.floor(run.score),
      distance: Math.floor(run.distance),
      world: run.plan.worldAt(run.distance).key,
      daily: run.daily ? dailyKey() : '',
      path: recorder.path,
    });
  }

  function doRebirth() {
    const result = performRebirth(save);
    if (!result) { audio.bump(); return; }
    mods = computeMods(save);
    persist();
    audio.levelUp();
    ui.refreshHub();
    ui.shopUI.renderRebirth();
    ui.show('hub');
  }

  function persist() { economy.writeSave(save); }

  /* ======================================================================
     Photo mode
     ====================================================================== */

  const photo = {
    active: false,
    capture: false,
    orbit: 0,
    height: 4,
    zoom: 14,
    exposure: 1,
  };

  function enterPhoto() {
    if (state !== STATE.PAUSED) return;
    photo.active = true;
    ui.setPhotoMode(true);
  }

  function exitPhoto() {
    photo.active = false;
    photo.capture = false;
    ui.setPhotoMode(false);
    sceneCore.setExposure(save.settings.exposure);
    if (state === STATE.PAUSED) ui.show('pause');
  }

  /**
   * Orbit the paused wisp. Photo mode only runs while paused, so nothing is
   * fighting for the camera — the chase rig is simply not being updated.
   */
  function updatePhotoCamera() {
    const p = player.state.pos;
    const cam = sceneCore.camera;
    cam.position.set(
      p.x + Math.sin(photo.orbit) * photo.zoom,
      p.y + photo.height,
      p.z + Math.cos(photo.orbit) * photo.zoom,
    );
    cam.lookAt(p.x, p.y, p.z);
    sceneCore.setExposure(save.settings.exposure * photo.exposure);
  }

  /**
   * Grab the canvas straight after a render, in the same task — the drawing
   * buffer is cleared before the next paint, so anything asynchronous here
   * would capture a blank image.
   */
  function capturePhoto() {
    photo.capture = false;
    try {
      const url = sceneCore.renderer.domElement.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `aerodrift-${seedToString(run.seed)}-${Math.floor(run.distance)}m.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      save.stats.photos += 1;
      persist();
      audio.ring();
    } catch (err) {
      console.warn('[aerodrift] photo capture failed', err);
    }
  }

  /* ======================================================================
     Input that belongs to the shell rather than the wisp
     ====================================================================== */

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (photo.active) exitPhoto();
      else if (state === STATE.PLAYING) pauseRun();
      else if (state === STATE.PAUSED) resumeRun();
      else if (ui.current !== 'hub' && ui.current !== 'results') ui.closeModal();
    }
    if ((e.key === 'p' || e.key === 'P') && state === STATE.PAUSED) {
      if (photo.active) exitPhoto(); else enterPhoto();
    }
  });

  ui.el.pauseBtn?.addEventListener('click', () => pauseRun());

  // Touch boost pad. pointerdown/up rather than click so it can be held.
  const pad = ui.el.boostPad;
  if (pad) {
    const press = (e) => { e.preventDefault(); player.boostHeld = true; };
    const release = () => { player.boostHeld = false; };
    pad.addEventListener('pointerdown', press);
    pad.addEventListener('pointerup', release);
    pad.addEventListener('pointercancel', release);
    pad.addEventListener('pointerleave', release);
  }

  /* --- Tab blur pauses the run ------------------------------------------ */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (state === STATE.PLAYING) pauseRun();
      audio.suspend();
    } else {
      audio.resume();
    }
  });

  /* --- Resize ------------------------------------------------------------ */
  let resizeRaf = 0;
  function onResize() {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      sceneCore.resize();
      fx.setSize(window.innerWidth, window.innerHeight);
      player.onResize();
      collect.onResize();
      world.onResize();
      gates.onResize();
    });
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  /* ======================================================================
     Scoring
     ====================================================================== */

  const _proj = new THREE.Vector3();

  /** World point -> screen pixels, or null if it is behind the camera. */
  function toScreen(x, y, z) {
    _proj.set(x, y, z).project(sceneCore.camera);
    if (_proj.z > 1) return null;
    return {
      x: (_proj.x * 0.5 + 0.5) * window.innerWidth,
      y: (-_proj.y * 0.5 + 0.5) * window.innerHeight,
    };
  }

  /** Everything that scales a point: combo, checkpoints, streams, prestige. */
  function scoreMultiplier() {
    return run.combo
      * run.checkpointMult
      * (run.riding ? mods.streamMultiplier : 1)
      * mods.scoreMultiplier;
  }

  function bumpCombo() {
    run.combo = Math.min(COMBO_MAX, run.combo + 1);
    run.bestCombo = Math.max(run.bestCombo, run.combo);
    audio.setIntensity(run.combo);
  }

  function breakCombo() {
    run.combo = 1;
    run.decayAcc = 0;
    run.sincePickup = 0;
    audio.setIntensity(1);
  }

  function handleEvents(events) {
    for (const ev of events) {
      switch (ev.type) {
        case 'orb': {
          const value = ev.big ? ORB_BIG_VALUE : ORB_VALUE;
          const gained = value * scoreMultiplier();
          run.score += gained;
          run.orbs++;
          run.sincePickup = 0;
          run.decayAcc = 0;
          economy.earnDroplets(save, 0); // no-op; run droplets banked below
          run.droplets += ev.big
            ? economy.DROPLET_RATES.orbBig
            : economy.DROPLET_RATES.orb;
          player.addBoost(ev.boost * mods.boostRefill);
          audio.collect(run.combo, ev.big);
          if (ev.big) {
            const p = toScreen(ev.x, ev.y, ev.z);
            if (p) ui.popup(`+${formatScore(gained)}`, p.x, p.y);
          }
          break;
        }
        case 'ring': {
          // Flat bonus, and the ring is what actually grows the multiplier.
          run.score += RING_VALUE * run.checkpointMult * mods.scoreMultiplier;
          run.rings++;
          run.droplets += economy.DROPLET_RATES.ring;
          run.sincePickup = 0;
          run.decayAcc = 0;
          bumpCombo();
          player.addBoost(ev.boost * mods.boostRefill);
          audio.ring();
          ui.flash(0.5);
          const p = toScreen(ev.x, ev.y, ev.z);
          if (p) ui.popup(`+${formatScore(RING_VALUE)}  ×${run.combo}`, p.x, p.y, 'ring');
          break;
        }
        case 'ringMiss':
          // Missing a gate is the one thing besides contact that breaks a combo.
          breakCombo();
          break;
        case 'stream':
          // Sound is triggered on the rising edge after this loop, not here:
          // run.riding is cleared every frame, so testing it in-place would
          // retrigger the whoosh on every single frame of the ride.
          run.riding = true;
          break;
        default: break;
      }
    }
  }

  function handleGateEvents(events) {
    for (const ev of events) {
      if (ev.type === 'checkpoint') {
        run.checkpoints++;
        const base = {
          minor: economy.DROPLET_RATES.checkpointMinor,
          major: economy.DROPLET_RATES.checkpointMajor,
          epic: economy.DROPLET_RATES.checkpointEpic,
        }[ev.tier];
        const payout = Math.round(base * mods.checkpointBonus);
        run.droplets += payout;

        if (ev.tier === 'major') {
          // The escalating "win": every Major permanently multiplies the rest
          // of the run, so a long flight compounds instead of flattening out.
          run.checkpointMult += 1;
          ui.showToast(`Checkpoint  ×${run.checkpointMult}`);
        } else if (ev.tier === 'epic') {
          ui.showToast(ev.label);
          // Rare prism shards give the prestige currency a second, luckier tap.
          if (Math.random() < economy.EPIC_PRISM_CHANCE) {
            run.prisms += 1;
            economy.earnPrisms(save, 1);
          }
        }

        if (ev.shake) player.shake(ev.shake);
        if (ev.tier !== 'minor') ui.flash(ev.tier === 'epic' ? 1 : 0.6);
        audio.checkpoint(ev.tier);

        const p = toScreen(ev.x, ev.y, ev.z);
        if (p) ui.popup(`+${formatScore(payout)}`, p.x, p.y, ev.tier === 'minor' ? '' : 'ring');
      } else if (ev.type === 'portal') {
        run.portals++;
        if (ev.through) {
          run.droplets += Math.round(economy.DROPLET_RATES.portal * mods.checkpointBonus);
          run.score += 400 * run.checkpointMult * mods.scoreMultiplier;
        }
        // Reaching a World unlocks it permanently, whether or not the aperture
        // was threaded — you got here, and that is what the record means.
        if (economy.unlockWorld(save, ev.nextWorld.key)) persist();
        player.shake(0.3);
        // Restrained on purpose: the portal burst and the palette swap are
        // already carrying the moment, and a full-strength flash on top of both
        // washes out the first second of the new World.
        ui.flash(0.55);
        audio.portal();
        announceWorld(ev.worldIndex + 1, true);
        ui.showToast(ev.through ? 'Portal — clean pass' : 'Portal');
      }
    }
  }

  function updateCombo(dt) {
    run.sincePickup += dt;
    if (run.combo > 1 && run.sincePickup > mods.comboGrace) {
      run.decayAcc += dt;
      while (run.decayAcc >= COMBO_DECAY_EVERY && run.combo > 1) {
        run.decayAcc -= COMBO_DECAY_EVERY;
        run.combo--;
      }
      audio.setIntensity(run.combo);
    }
  }

  function announceWorld(index, force = false) {
    if (!force && index === run.worldAnnounced) return;
    run.worldAnnounced = index;
    const where = run.plan.worldAt(index * WORLD_LENGTH);
    ui.showBiome(where.world.name);
    run.stratumAnnounced = where.world.strata[0].name;
  }

  /* ======================================================================
     Render loop
     ====================================================================== */

  const timer = new THREE.Timer();
  timer.connect(document); // resets delta across tab-visibility changes
  const prevPos = new THREE.Vector3();
  let boostWasHeld = false;

  function simulate(dt) {
    clock += dt;

    const playing = state === STATE.PLAYING;
    const attract = state === STATE.HUB || state === STATE.RESULTS;

    if (!playing && !attract) return;

    prevPos.copy(player.state.pos);

    // Attract mode: fly the wisp on a lazy sine so the hub is alive.
    if (attract) {
      player.state.target.x = Math.sin(clock * 0.31) * 17;
      player.state.target.y = 2 + Math.sin(clock * 0.22 + 1.1) * 6.5;
    }

    player.state.riding = run.riding;
    player.update(dt, clock, { ...mods, exposed: playing && shield.exposed });
    run.riding = false; // re-asserted each frame by the stream test below

    const dist = player.state.distance;
    if (playing) {
      run.distance = dist;
      run.time += dt;
      run.cleanDistance += player.state.speed * dt;
    }

    const w = world.update(dt, clock, player.state.pos.z, dist);
    // Ease rather than snap: a Portal changes World in one frame, and a hard
    // cut in fog and light reads as a glitch. 6 per second lands the swap in
    // about half a second, which registers as deliberate.
    sceneCore.applyPalette(w.palette, 1 - Math.exp(-6 * dt));

    const events = collect.update(dt, clock, player, prevPos, mods);
    const hit = obstacles.update(dt, clock, player, prevPos);
    const gateEvents = gates.update(dt, clock, player, prevPos, dist, run.plan, w.palette);

    if (!playing) return;

    handleEvents(events);
    handleGateEvents(gateEvents);

    /* --- Contact, and the only end condition in the game ---------------- */
    if (hit && player.knock(1)) {
      run.hits++;
      run.bestCleanDistance = Math.max(run.bestCleanDistance, run.cleanDistance);
      run.cleanDistance = 0;
      breakCombo();

      const result = shield.hit();
      if (result.fatal) {
        audio.bump();
        endRun({
          fatal: true,
          cause: `You flew into ${HAZARD_NAMES[hit.style] || 'an obstacle'} with no integrity left.`,
        });
        return;
      }
      audio.bump();
      audio.shieldBreak();
      ui.flash(0.5);
    }

    if (shield.update(dt)) audio.shieldRegen();

    // Rising edge only — one whoosh per stream entry, not per frame.
    if (run.riding && !run.wasRiding) audio.stream();
    run.wasRiding = run.riding;

    if (run.riding) {
      run.score += STREAM_SCORE_RATE * scoreMultiplier() * dt;
      run.droplets += economy.DROPLET_RATES.streamPerSecond * dt;
      run.sincePickup = 0;
    }

    updateCombo(dt);

    // Boost start sound, on the rising edge only.
    if (player.state.boosting && !boostWasHeld) { audio.boost(); ui.flash(1); }
    boostWasHeld = player.state.boosting;

    /* --- Ghost racing ---------------------------------------------------- */
    recorder.update(dt, player.state.pos);
    ghost.update(dt, run.time);
    ui.setGhost(ghost.active ? ghost.leadOver(player.state.pos.z) : null);

    /* --- Announcements --------------------------------------------------- */
    const stratum = run.plan.stratumAt(dist);
    if (stratum.name !== run.stratumAnnounced) {
      run.stratumAnnounced = stratum.name;
      ui.showBiome(stratum.name);
      ui.flash(0.4);
    }

    /* --- HUD ------------------------------------------------------------- */
    const localIntoWorld = dist % WORLD_LENGTH;
    ui.setHud({
      score: run.score,
      combo: run.combo,
      runMult: run.checkpointMult - 1,
      distance: run.distance,
      droplets: Math.floor(run.droplets),
      worldProgress: localIntoWorld / WORLD_LENGTH,
      toPortal: WORLD_LENGTH - localIntoWorld,
      boost: player.state.boost,
      boosting: player.state.boosting,
      pips: shield.state.pips,
      maxPips: shield.state.max,
      regen: shield.regenFraction,
      exposed: shield.exposed,
    });

    watchdog.update(dt);
  }

  function frame() {
    requestAnimationFrame(frame);

    timer.update();
    const raw = timer.getDelta();
    // Clamp: a long stall (tab switch, GC, breakpoint) must not teleport the
    // wisp through half the world in one step. The *unclamped* delta is what
    // the diagnostics want, though — the hitches are the symptom.
    const dt = Math.min(raw, 0.05);
    diag.noteFrame(raw);

    simulate(dt);
    sceneCore.update(dt, clock);
    if (photo.active) updatePhotoCamera();
    fx.render();
    if (photo.capture) capturePhoto();
  }

  /* --- Go ---------------------------------------------------------------- */
  window.__AERODRIFT_BOOTED = true;
  goHub();
  requestAnimationFrame(frame);

  /* --- Debug probe used by the automated QA harness --------------------- */
  window.__aerodrift = {
    probe: () => ({
      state,
      tier: tierName,
      seed: run.seed,
      seedText: seedToString(run.seed),
      score: Math.floor(run.score),
      combo: run.combo,
      checkpointMult: run.checkpointMult,
      distance: Math.floor(run.distance),
      speed: Math.round(player.state.speed),
      boost: Number(player.state.boost.toFixed(2)),
      pips: shield.state.pips,
      maxPips: shield.state.max,
      exposed: shield.exposed,
      hits: run.hits,
      chunks: world.chunkCount,
      orbs: collect.orbCount,
      rings: collect.rings.length,
      streams: collect.streams.length,
      obstacles: obstacles.count,
      gates: gates.count,
      world: run.plan.worldAt(run.distance).key,
      condition: world.condition?.key || null,
      surface: Number(run.plan.surfaceAmountAt(run.distance).toFixed(3)),
      screen: ui.current,
      droplets: save.droplets,
      prisms: save.prisms,
      xp: save.xp,
      best: save.bestScore,
      lifetime: save.lifetimeDistance,
      worlds: save.worldsUnlocked.slice(),
      net: api.status,
    }),
    startRun, pauseRun, resumeRun, endRun, goHub, doRebirth,
    setTier: applyTier,
    /** Advance the simulation without rendering — QA harness only. */
    step: (dt = 1 / 60, steps = 1) => { for (let i = 0; i < steps; i++) simulate(dt); },
    player, world, collect, obstacles, gates, shield, sceneCore, fx, save, audio, ui, api,
    economy, WORLDS,
  };
}
