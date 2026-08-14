/**
 * main.js — entry point, game state machine and the render loop.
 *
 * States: boot -> title -> playing <-> pause -> results -> title | playing
 *
 * There is no failure state. A run ends only when the player reaches the
 * distance goal or chooses to end it; collisions cost speed and combo and
 * nothing else. Any change that introduces a "you lost" branch here would be
 * a change to the design, not a bug fix.
 */

import * as THREE from 'three';

import { createSceneCore } from './scene.js';
import { createPostFX, createFpsWatchdog, TIERS, TIER_ORDER } from './postfx.js';
import { createPlayer, computeUnlocks } from './player.js';
import { createCollectibles } from './collectibles.js';
import { createObstacles } from './obstacles.js';
import { createWorld, RUN_DISTANCE, waterAmount, BIOMES } from './world.js';
import { createAudio } from './audio.js';
import { createUI } from './ui.js';
import {
  loadSave, writeSave, guessQualityTier, isTouchDevice, formatScore,
} from './utils.js';

/* ==========================================================================
   Scoring rules
   ========================================================================== */

const COMBO_MAX = 25;
const COMBO_GRACE = 5.0;     // seconds of no pickups before the combo decays
const COMBO_DECAY_EVERY = 1.2;
const STREAM_SCORE_RATE = 18; // points/second while riding a current
const STREAM_MULTIPLIER = 1.5;

const STATE = {
  BOOT: 'boot',
  TITLE: 'title',
  PLAYING: 'playing',
  PAUSED: 'pause',
  RESULTS: 'results',
};

boot().catch((err) => {
  console.error('[aerodrift] fatal during boot', err);
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('is-active'));
  document.getElementById('screen-offline')?.classList.add('is-active');
});

async function boot() {
  const save = loadSave();
  const touch = isTouchDevice();

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
    bubbleCount: TIERS.high.bubbles,        // ...and scale the active count live
    shaftCount: TIERS.high.shafts,
    waterSegments: tier0.waterSegments,
  });

  const audio = createAudio(save.settings);

  /* --- Run state -------------------------------------------------------- */
  let state = STATE.BOOT;
  const run = newRun();

  function newRun() {
    return {
      score: 0,
      combo: 1,
      bestCombo: 1,
      distance: 0,
      orbsCollected: 0,
      ringsPassed: 0,
      sincePickup: 0,
      decayAcc: 0,
      riding: false,
      wasRiding: false,
      lastWaterAmount: 0,
      biomeAnnounced: '',
      elapsed: 0,
    };
  }

  /* --- UI --------------------------------------------------------------- */
  const ui = createUI({
    save,
    audio,
    onPlay: () => startRun(),
    onResume: () => resumeRun(),
    onEndRun: () => endRun(),
    onHome: () => goTitle(),
    onTrailChange: (key) => { player.setTrail(key); persist(); },
    onSettingsChange: (key, value) => applySetting(key, value),
  });

  ui.setTouch(touch);
  ui.refreshTitleStats();
  ui.refreshTrails();
  ui.syncSettingsUI();
  player.setTrail(save.trail);

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

  /* ======================================================================
     Settings + quality
     ====================================================================== */

  function applySetting(key, value) {
    switch (key) {
      case 'bloom': fx.setBloomScale(value); break;
      case 'volume': audio.setVolume(value); break;
      case 'muted': audio.setMuted(value); break;
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
   * Everything a tier controls that can be changed while the game is running.
   * Geometry-level choices (cloud tessellation, water plane density) are baked
   * at construction from the opening tier; the live knobs below are the ones
   * that actually move the framerate.
   */
  function applyTier(name, { silent = false } = {}) {
    if (!TIERS[name]) return;
    tierName = name;
    const t = TIERS[name];

    fx.setTier(name);
    world.setChunksAhead(t.chunksAhead);
    world.setParticleBudget(t.bubbles, t.shafts);
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
    for (const mat of collectGlassMaterials()) {
      const wantTransmission = cheap ? 0 : 1;
      if (mat.transmission === undefined) continue;
      if (mat.transmission === wantTransmission) continue;
      mat.transmission = wantTransmission;
      mat.opacity = cheap ? 0.42 : 1;
      mat.transparent = true;
      mat.needsUpdate = true; // transmission on/off changes the shader program
    }
  }

  function collectGlassMaterials() {
    const out = [];
    for (const g of collect.rings) {
      const m = g.g?.userData?.glass?.material;
      if (m) out.push(m);
    }
    // Ring meshes sitting idle in the pool need the same treatment.
    sceneCore.scene.traverse((o) => {
      if (o.isMesh && o.material && o.material.isMeshPhysicalMaterial && o.material.transmission !== undefined) {
        if (!out.includes(o.material)) out.push(o.material);
      }
    });
    return out;
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
     State transitions
     ====================================================================== */

  function goTitle() {
    state = STATE.TITLE;
    Object.assign(run, newRun());
    world.reset();
    collect.reset();
    obstacles.reset();
    player.reset();
    player.setEnabled(false);
    ui.refreshTitleStats();
    ui.refreshTrails();
    ui.show('title');
  }

  function startRun() {
    Object.assign(run, newRun());
    world.reset();
    collect.reset();
    obstacles.reset();
    player.reset();
    player.setTrail(save.trail);
    player.setEnabled(true);
    watchdog.reset();
    state = STATE.PLAYING;
    ui.show('playing');
    ui.showBiome(BIOMES.sky.name);
    run.biomeAnnounced = 'sky';
  }

  function pauseRun() {
    if (state !== STATE.PLAYING) return;
    state = STATE.PAUSED;
    player.setEnabled(false);
    ui.show('pause');
  }

  function resumeRun() {
    if (state !== STATE.PAUSED) return;
    state = STATE.PLAYING;
    player.setEnabled(true);
    ui.show('playing');
  }

  function endRun() {
    if (state !== STATE.PLAYING && state !== STATE.PAUSED) return;
    state = STATE.RESULTS;
    player.setEnabled(false);

    /* --- Persist and work out what was unlocked ----------------------- */
    const before = computeUnlocks(save);
    const isNewBest = run.score > save.bestScore;

    save.bestScore = Math.max(save.bestScore, Math.floor(run.score));
    save.bestCombo = Math.max(save.bestCombo, run.bestCombo);
    save.lifetimeDistance = Math.floor(save.lifetimeDistance + run.distance);
    save.runs += 1;
    persist();

    const after = computeUnlocks(save);
    const newUnlocks = after.filter((k) => !before.includes(k));

    audio.chime();
    ui.showResults({
      score: run.score,
      distance: run.distance,
      bestCombo: run.bestCombo,
      isNewBest,
      newUnlocks,
    });
  }

  function persist() { writeSave(save); }

  /* ======================================================================
     Input that belongs to the shell rather than the wisp
     ====================================================================== */

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (state === STATE.PLAYING) pauseRun();
      else if (state === STATE.PAUSED) resumeRun();
      else if (ui.current === 'how' || ui.current === 'settings') ui.closeModal();
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

  function bumpCombo() {
    run.combo = Math.min(COMBO_MAX, run.combo + 1);
    run.bestCombo = Math.max(run.bestCombo, run.combo);
  }

  function breakCombo() {
    run.combo = 1;
    run.decayAcc = 0;
    run.sincePickup = 0;
  }

  function handleEvents(events, dt) {
    for (const ev of events) {
      switch (ev.type) {
        case 'orb': {
          const mult = run.riding ? STREAM_MULTIPLIER : 1;
          run.score += ev.value * run.combo * mult;
          run.orbsCollected++;
          run.sincePickup = 0;
          run.decayAcc = 0;
          player.addBoost(ev.boost);
          audio.collect(run.combo, ev.big);
          if (ev.big) {
            const p = toScreen(ev.x, ev.y, ev.z);
            if (p) ui.popup(`+${formatScore(ev.value * run.combo * mult)}`, p.x, p.y);
          }
          break;
        }
        case 'ring': {
          // Flat bonus, and the ring is what actually grows the multiplier.
          run.score += ev.value;
          run.ringsPassed++;
          run.sincePickup = 0;
          run.decayAcc = 0;
          bumpCombo();
          player.addBoost(ev.boost);
          audio.ring();
          ui.flash(0.5);
          const p = toScreen(ev.x, ev.y, ev.z);
          if (p) ui.popup(`+${formatScore(ev.value)}  ×${run.combo}`, p.x, p.y, 'ring');
          break;
        }
        case 'ringMiss':
          // Missing a gate is the one thing that breaks a combo outright.
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

  function updateCombo(dt) {
    run.sincePickup += dt;
    if (run.combo > 1 && run.sincePickup > COMBO_GRACE) {
      run.decayAcc += dt;
      while (run.decayAcc >= COMBO_DECAY_EVERY && run.combo > 1) {
        run.decayAcc -= COMBO_DECAY_EVERY;
        run.combo--;
      }
    }
  }

  /* ======================================================================
     Render loop
     ====================================================================== */

  const timer = new THREE.Timer();
  timer.connect(document); // resets delta across tab-visibility changes
  const prevPos = new THREE.Vector3();
  let boostWasHeld = false;

  /**
   * All game logic for one step. Kept separate from rendering so a frame's
   * simulation is reproducible from dt alone — which is also what lets the
   * automated QA harness play whole runs without a GPU in the loop.
   */
  function simulate(dt) {
    run.elapsed += dt;
    const elapsed = run.elapsed;

    const playing = state === STATE.PLAYING;
    const attract = state === STATE.TITLE || state === STATE.RESULTS;

    if (playing || attract) {
      prevPos.copy(player.state.pos);

      // Attract mode: fly the wisp on a lazy sine so the title screen is alive.
      if (attract) {
        player.state.target.x = Math.sin(elapsed * 0.31) * 17;
        player.state.target.y = 2 + Math.sin(elapsed * 0.22 + 1.1) * 6.5;
      }

      player.state.riding = run.riding;
      player.update(dt, elapsed, {});
      run.riding = false; // re-asserted each frame by the stream test below

      const dist = player.state.distance;
      if (playing) run.distance = dist;

      const w = world.update(dt, elapsed, player.state.pos.z, dist);
      sceneCore.applyPalette(w.palette);

      const events = collect.update(dt, elapsed, player, prevPos);
      const hit = obstacles.update(dt, elapsed, player, prevPos);

      if (playing) {
        handleEvents(events, dt);

        if (hit && player.knock(1)) {
          breakCombo();
          audio.bump();
        }

        // Rising edge only — one whoosh per stream entry, not per frame.
        if (run.riding && !run.wasRiding) audio.stream();
        run.wasRiding = run.riding;

        if (run.riding) {
          run.score += STREAM_SCORE_RATE * run.combo * dt;
          run.sincePickup = 0;
        }

        updateCombo(dt);

        // Boost start sound, on the rising edge only.
        if (player.state.boosting && !boostWasHeld) { audio.boost(); ui.flash(1); }
        boostWasHeld = player.state.boosting;

        /* --- Biome announcement ---------------------------------------- */
        const amt = w.waterAmount;
        const nowBiome = amt > 0.5 ? 'water' : 'sky';
        if (nowBiome !== run.biomeAnnounced) {
          run.biomeAnnounced = nowBiome;
          ui.showBiome(BIOMES[nowBiome].name);
          ui.flash(0.4);
        }

        /* --- HUD ------------------------------------------------------- */
        ui.setHud({
          score: run.score,
          combo: run.combo,
          distance: run.distance,
          progress: run.distance / RUN_DISTANCE,
          boost: player.state.boost,
          boosting: player.state.boosting,
        });

        /* --- The one and only end condition ---------------------------- */
        if (run.distance >= RUN_DISTANCE) endRun();
      }
    }

    if (playing) watchdog.update(dt);
  }

  function frame() {
    requestAnimationFrame(frame);

    timer.update();
    // Clamp: a long stall (tab switch, GC, breakpoint) must not teleport the
    // wisp through half the world in one step.
    const dt = Math.min(timer.getDelta(), 0.05);

    simulate(dt);
    sceneCore.update(dt, run.elapsed);
    fx.render();
  }

  /* --- Go ---------------------------------------------------------------- */
  window.__AERODRIFT_BOOTED = true;
  goTitle();
  requestAnimationFrame(frame);

  /* --- Debug probe used by the automated QA harness --------------------- */
  window.__aerodrift = {
    probe: () => ({
      state,
      tier: tierName,
      score: Math.floor(run.score),
      combo: run.combo,
      distance: Math.floor(run.distance),
      speed: Math.round(player.state.speed),
      boost: Number(player.state.boost.toFixed(2)),
      chunks: world.chunkCount,
      orbs: collect.orbCount,
      rings: collect.rings.length,
      streams: collect.streams.length,
      obstacles: obstacles.count,
      waterAmount: Number(waterAmount(run.distance).toFixed(3)),
      screen: ui.current,
      best: save.bestScore,
      lifetime: save.lifetimeDistance,
      unlocked: computeUnlocks(save),
    }),
    startRun, pauseRun, resumeRun, endRun, goTitle,
    setTier: applyTier,
    /** Advance the simulation without rendering — QA harness only. */
    step: (dt = 1 / 60, steps = 1) => { for (let i = 0; i < steps; i++) simulate(dt); },
    player, world, collect, obstacles, sceneCore, fx, save, audio, ui,
  };
}
