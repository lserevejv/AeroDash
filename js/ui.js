/**
 * ui.js — screen flow, HUD, and the glass/gel DOM chrome.
 *
 * The UI is plain DOM layered over the WebGL canvas: it keeps text crisp at any
 * DPI and lets the Aero look come from CSS (backdrop blur, gloss sweeps, gel
 * gradients) rather than from expensive in-scene geometry.
 *
 * Screen flow:
 *   boot -> hub -> [shop | upgrades | rebirth | leaderboard | log | how | settings]
 *        -> playing <-> pause -> [settings | photo]
 *                             \-> results -> hub | playing
 *
 * There is exactly one branch in that graph that ends a run against the
 * player's wishes, and it is a contact taken with no Shield left.
 */

import { formatScore, formatDistance, clamp } from './utils.js';
import * as shop from './shop.js';
import { createHub } from './ui/hub.js';
import { createShopUI } from './ui/shopUI.js';
import { createLeaderboardUI } from './ui/leaderboardUI.js';
import { seedToString } from './prng.js';

const SCREENS = [
  'boot', 'hub', 'how', 'pause', 'results', 'settings',
  'shop', 'upgrades', 'rebirth', 'leaderboard', 'achievements', 'offline',
];

export function createUI(opts) {
  const {
    save, audio, api,
    onPlay, onDaily, onResume, onEndRun, onHome,
    onSettingsChange, onEquip, onRebirth, onResetProgress,
    onPhotoEnter, onPhotoExit, onPhotoSave, onPhotoChange,
  } = opts;

  const $ = (id) => document.getElementById(id);

  const el = {
    screens: Object.fromEntries(SCREENS.map((s) => [s, $(`screen-${s}`)])),

    /* HUD */
    hud: $('hud'),
    score: $('hud-score'),
    combo: $('hud-combo'),
    mult: $('hud-mult'),
    distance: $('hud-distance'),
    next: $('hud-next'),
    progress: $('hud-progress'),
    boostGauge: $('boost-gauge'),
    boostFill: $('boost-fill'),
    biome: $('hud-biome'),
    toast: $('hud-toast'),
    popups: $('popups'),
    flash: $('flash'),
    boostPad: $('boost-pad'),
    pauseBtn: $('pause-btn'),
    shieldChip: $('hud-shield'),
    pipRow: $('pip-row'),
    regenFill: $('regen-fill'),
    hudDroplets: $('hud-droplets'),
    ghostChip: $('hud-ghost'),
    ghostDelta: $('ghost-delta'),

    /* Hub */
    walDroplets: $('wal-droplets'),
    walPrisms: $('wal-prisms'),
    walLevel: $('wal-level'),
    walXp: $('wal-xp'),
    statBest: $('stat-best'),
    statBestDist: $('stat-bestdist'),
    statLifetime: $('stat-lifetime'),
    worldRow: $('world-row'),
    btnRebirth: $('btn-rebirth'),
    btnDaily: $('btn-daily'),

    /* Shop / upgrades */
    shopGrid: $('shop-grid'),
    shopTabs: $('shop-tabs'),
    shopDroplets: $('shop-droplets'),
    shopPrisms: $('shop-prisms'),
    upgradeGrid: $('upgrade-grid'),
    upgDroplets: $('upg-droplets'),
    upgLevel: $('upg-level'),

    /* Rebirth */
    rebProgress: $('reb-progress'),
    rebProgressLabel: $('reb-progress-label'),
    rebKeeps: $('reb-keeps'),
    rebResets: $('reb-resets'),
    rebPrisms: $('reb-prisms'),
    rebMult: $('reb-mult'),
    rebConfirm: $('reb-confirm'),

    /* Leaderboard / log */
    netState: $('net-state'),
    boardList: $('board-list'),
    boardTabs: $('board-tabs'),
    setName: $('set-name'),
    achList: $('ach-list'),
    achProgress: $('ach-progress'),

    /* Results */
    resTitle: $('res-title'),
    resCause: $('res-cause'),
    resScore: $('res-score'),
    resDistance: $('res-distance'),
    resCombo: $('res-combo'),
    resWorlds: $('res-worlds'),
    resDroplets: $('res-droplets'),
    resPrisms: $('res-prisms'),
    resPrismWrap: $('res-prism-wrap'),
    resXp: $('res-xp'),
    resLevelup: $('res-levelup'),
    resBadge: $('result-badge'),
    resUnlocks: $('res-unlocks'),
    resSeed: $('res-seed'),
    pauseSeed: $('pause-seed'),

    /* Settings */
    setExposure: $('set-exposure'),
    setBloom: $('set-bloom'),
    setVolume: $('set-volume'),
    setMute: $('set-mute'),
    setGhosts: $('set-ghosts'),
    setQuality: $('set-quality'),
    valExposure: $('val-exposure'),
    valBloom: $('val-bloom'),
    valVolume: $('val-volume'),
    qualityNote: $('quality-note'),

    /* Photo mode */
    photoBar: $('photo-bar'),
    photoOrbit: $('photo-orbit'),
    photoHeight: $('photo-height'),
    photoZoom: $('photo-zoom'),
    photoExposure: $('photo-exposure'),
    valOrbit: $('val-orbit'),
    valHeight: $('val-height'),
    valZoom: $('val-zoom'),
    valPhotoExp: $('val-photo-exp'),
  };

  let current = 'boot';
  let modalReturn = 'hub'; // where "Back" goes from a modal

  /* --- Sub-screens ------------------------------------------------------- */
  const hub = createHub({ el, save });

  const shopUI = createShopUI({
    el, save, audio,
    onChange: () => { hub.refresh(); },
    onEquip: (type) => { onEquip?.(type); },
  });

  const boardUI = createLeaderboardUI({ el, save, api });

  /* ======================================================================
     Screen management
     ====================================================================== */

  function show(name) {
    for (const [key, node] of Object.entries(el.screens)) {
      if (node) node.classList.toggle('is-active', key === name);
    }
    el.hud.classList.toggle('is-active', name === 'playing');
    el.hud.setAttribute('aria-hidden', name === 'playing' ? 'false' : 'true');
    current = name;
    // Quiet the pad a little whenever a panel is up.
    if (audio) audio.setPadLevel(name === 'playing' ? 0.26 : 0.17);
  }

  function openModal(name) {
    // Remember whether we came from the hub or from a paused run.
    if (current === 'hub' || current === 'pause') modalReturn = current;
    switch (name) {
      case 'shop': shopUI.renderCosmetics(); hub.refreshWallet(); break;
      case 'upgrades': shopUI.renderUpgrades(); hub.refreshWallet(); break;
      case 'rebirth': shopUI.renderRebirth(); break;
      case 'leaderboard': boardUI.refresh(); break;
      case 'achievements': boardUI.renderAchievements(); break;
      default: break;
    }
    show(name);
  }

  function closeModal() {
    if (modalReturn === 'hub') refreshHub();
    show(modalReturn);
  }

  function refreshHub() { hub.refresh(); }

  /* ======================================================================
     HUD
     ====================================================================== */

  let lastCombo = 1;
  let comboPulseTimer = null;
  let lastPips = -1;
  let lastMax = -1;

  function setHud(s) {
    el.score.textContent = formatScore(s.score);
    el.distance.textContent = formatDistance(s.distance);
    el.progress.style.width = `${clamp(s.worldProgress, 0, 1) * 100}%`;
    el.next.textContent = `Portal in ${formatDistance(s.toPortal)}`;
    el.hudDroplets.textContent = formatScore(s.droplets);

    if (s.combo !== lastCombo) {
      el.combo.textContent = `×${s.combo}`;
      el.combo.classList.toggle('is-hot', s.combo >= 8);
      // Retrigger the pop animation.
      el.combo.classList.add('is-pulse');
      clearTimeout(comboPulseTimer);
      comboPulseTimer = setTimeout(() => el.combo.classList.remove('is-pulse'), 130);
      lastCombo = s.combo;
    }

    // The stacking checkpoint bonus only appears once it exists.
    if (s.runMult > 0) {
      el.mult.hidden = false;
      el.mult.textContent = `+${s.runMult}`;
    } else {
      el.mult.hidden = true;
    }

    setShield(s.pips, s.maxPips, s.regen, s.exposed);

    el.boostFill.style.width = `${clamp(s.boost, 0, 1) * 100}%`;
    el.boostGauge.classList.toggle('is-ready', s.boost > 0.35 && !s.boosting);
    el.boostGauge.classList.toggle('is-firing', !!s.boosting);
  }

  /**
   * Pips are rebuilt only when the count changes, and the pip that just went
   * out gets a one-shot pop animation — losing integrity has to be a visible
   * event, not a silent state change the player notices two gates later.
   */
  function setShield(pips, max, regen, exposed) {
    if (max !== lastMax) {
      el.pipRow.innerHTML = '';
      for (let i = 0; i < max; i++) {
        const pip = document.createElement('i');
        pip.className = 'pip';
        el.pipRow.appendChild(pip);
      }
      lastMax = max;
      lastPips = -1;
    }

    if (pips !== lastPips) {
      const nodes = el.pipRow.children;
      for (let i = 0; i < nodes.length; i++) {
        const full = i < pips;
        nodes[i].classList.toggle('is-full', full);
        // Pop the pip that just refilled; the lost one is covered by the shake.
        if (full && lastPips >= 0 && i >= lastPips) {
          nodes[i].classList.remove('is-popping');
          void nodes[i].offsetWidth;
          nodes[i].classList.add('is-popping');
        }
      }
      lastPips = pips;
    }

    el.regenFill.style.width = `${clamp(regen, 0, 1) * 100}%`;
    el.shieldChip.classList.toggle('is-exposed', !!exposed);
  }

  function setGhost(delta) {
    if (delta === null || delta === undefined) {
      el.ghostChip.hidden = true;
      return;
    }
    el.ghostChip.hidden = false;
    const ahead = delta < 0;
    el.ghostDelta.textContent = `${ahead ? '+' : '−'}${Math.abs(Math.round(delta))} m`;
    el.ghostChip.classList.toggle('is-ahead', ahead);
    el.ghostChip.classList.toggle('is-behind', !ahead);
  }

  let biomeTimer = null;
  function showBiome(name) {
    el.biome.textContent = name;
    el.biome.classList.remove('is-shown');
    // Force a reflow so the animation restarts even on a repeat name.
    void el.biome.offsetWidth;
    el.biome.classList.add('is-shown');
    clearTimeout(biomeTimer);
    biomeTimer = setTimeout(() => el.biome.classList.remove('is-shown'), 3300);
  }

  let toastTimer = null;
  function showToast(text) {
    el.toast.textContent = text;
    el.toast.classList.remove('is-shown');
    void el.toast.offsetWidth;
    el.toast.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.remove('is-shown'), 1900);
  }

  /* --- Floating score popups -------------------------------------------- */
  // Capped and self-cleaning: a long combo can fire these several times a
  // second, and orphaned nodes would pile up for the whole run.
  const MAX_POPUPS = 14;

  function popup(text, x, y, kind = '') {
    if (el.popups.childElementCount >= MAX_POPUPS) {
      el.popups.removeChild(el.popups.firstChild);
    }
    const node = document.createElement('div');
    node.className = `popup${kind ? ` popup--${kind}` : ''}`;
    node.textContent = text;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    el.popups.appendChild(node);
    node.addEventListener('animationend', () => node.remove(), { once: true });
  }

  let flashTimer = null;
  function flash(strength = 1) {
    el.flash.classList.add('is-lit');
    clearTimeout(flashTimer);
    flashTimer = setTimeout(() => el.flash.classList.remove('is-lit'), 60 + strength * 40);
  }

  /* ======================================================================
     Results
     ====================================================================== */

  function showResults(data) {
    el.resTitle.textContent = data.fatal ? 'Run Ended' : 'Run Complete';
    el.resCause.textContent = data.cause || '';
    el.resScore.textContent = formatScore(data.score);
    el.resDistance.textContent = formatDistance(data.distance);
    el.resCombo.textContent = `×${data.bestCombo}`;
    el.resWorlds.textContent = String(data.worldsVisited);
    el.resDroplets.textContent = `+${formatScore(data.droplets)}`;
    el.resXp.textContent = `+${formatScore(data.xp)}`;
    el.resSeed.textContent = `Seed ${seedToString(data.seed)}${data.daily ? ' · Daily' : ''}`;

    el.resPrismWrap.hidden = !data.prisms;
    el.resPrisms.textContent = `+${data.prisms || 0}`;

    el.resBadge.hidden = !data.isNewBest;

    if (data.leveledUp) {
      el.resLevelup.hidden = false;
      el.resLevelup.textContent = `Level ${data.levelAfter} reached`;
    } else {
      el.resLevelup.hidden = true;
    }

    el.resUnlocks.innerHTML = '';
    for (const text of data.toasts || []) {
      const node = document.createElement('div');
      node.className = 'unlock-toast';
      node.textContent = text;
      el.resUnlocks.appendChild(node);
    }

    show('results');
  }

  function setPauseSeed(seed, daily) {
    el.pauseSeed.textContent = `Seed ${seedToString(seed)}${daily ? ' · Daily Challenge' : ''}`;
  }

  /* ======================================================================
     Settings
     ====================================================================== */

  function syncSettingsUI() {
    const s = save.settings;
    el.setExposure.value = String(Math.round(s.exposure * 100));
    el.valExposure.textContent = `${Math.round(s.exposure * 100)}%`;
    el.setBloom.value = String(Math.round(s.bloom * 100));
    el.valBloom.textContent = `${Math.round(s.bloom * 100)}%`;
    el.setVolume.value = String(Math.round(s.volume * 100));
    el.valVolume.textContent = `${Math.round(s.volume * 100)}%`;
    el.setMute.checked = !!s.muted;
    el.setGhosts.checked = s.ghosts !== false;
    el.setName.value = save.displayName || '';
    for (const b of el.setQuality.querySelectorAll('.seg-btn')) {
      b.classList.toggle('is-on', b.dataset.q === s.quality);
    }
  }

  function setQualityNote(text) { el.qualityNote.textContent = text; }

  el.setExposure.addEventListener('input', () => {
    save.settings.exposure = Number(el.setExposure.value) / 100;
    el.valExposure.textContent = `${el.setExposure.value}%`;
    onSettingsChange('exposure', save.settings.exposure);
  });

  el.setBloom.addEventListener('input', () => {
    save.settings.bloom = Number(el.setBloom.value) / 100;
    el.valBloom.textContent = `${el.setBloom.value}%`;
    onSettingsChange('bloom', save.settings.bloom);
  });

  el.setVolume.addEventListener('input', () => {
    save.settings.volume = Number(el.setVolume.value) / 100;
    el.valVolume.textContent = `${el.setVolume.value}%`;
    onSettingsChange('volume', save.settings.volume);
  });

  el.setMute.addEventListener('change', () => {
    save.settings.muted = el.setMute.checked;
    onSettingsChange('muted', save.settings.muted);
  });

  el.setGhosts.addEventListener('change', () => {
    save.settings.ghosts = el.setGhosts.checked;
    onSettingsChange('ghosts', save.settings.ghosts);
  });

  el.setName.addEventListener('change', () => {
    save.displayName = el.setName.value.trim().slice(0, 18);
    onSettingsChange('displayName', save.displayName);
  });

  el.setQuality.addEventListener('click', (e) => {
    const btn = e.target.closest('.seg-btn');
    if (!btn) return;
    save.settings.quality = btn.dataset.q;
    syncSettingsUI();
    if (audio) audio.click();
    onSettingsChange('quality', save.settings.quality);
  });

  /* ======================================================================
     Photo mode
     ====================================================================== */

  function readPhoto() {
    return {
      orbit: Number(el.photoOrbit.value) * Math.PI / 180,
      height: Number(el.photoHeight.value),
      zoom: Number(el.photoZoom.value),
      exposure: Number(el.photoExposure.value) / 100,
    };
  }

  function syncPhotoLabels() {
    el.valOrbit.textContent = `${el.photoOrbit.value}°`;
    el.valHeight.textContent = el.photoHeight.value;
    el.valZoom.textContent = el.photoZoom.value;
    el.valPhotoExp.textContent = `${el.photoExposure.value}%`;
  }

  for (const input of [el.photoOrbit, el.photoHeight, el.photoZoom, el.photoExposure]) {
    input.addEventListener('input', () => {
      syncPhotoLabels();
      onPhotoChange?.(readPhoto());
    });
  }

  function setPhotoMode(on) {
    document.body.classList.toggle('is-photo', on);
    el.photoBar.hidden = !on;
    if (on) { syncPhotoLabels(); onPhotoChange?.(readPhoto()); }
  }

  /* ======================================================================
     Global button wiring
     ====================================================================== */

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    if (btn.disabled || btn.classList.contains('is-disabled')) {
      if (audio) audio.bump();
      return;
    }
    if (audio && action !== 'reload') audio.click();

    switch (action) {
      case 'play': onPlay(); break;
      case 'daily': onDaily(); break;
      case 'resume': onResume(); break;
      case 'end-run': onEndRun(); break;
      case 'home': onHome(); break;
      case 'how': openModal('how'); break;
      case 'settings': openModal('settings'); break;
      case 'shop': openModal('shop'); break;
      case 'upgrades': openModal('upgrades'); break;
      case 'rebirth': openModal('rebirth'); break;
      case 'leaderboard': openModal('leaderboard'); break;
      case 'achievements': openModal('achievements'); break;
      case 'close-modal': closeModal(); break;
      case 'refresh-board': api.refresh().then(() => boardUI.refresh()); break;
      case 'do-rebirth': onRebirth?.(); break;
      case 'reset-progress': confirmReset(btn); break;
      case 'photo': onPhotoEnter?.(); break;
      case 'photo-exit': onPhotoExit?.(); break;
      case 'photo-save': onPhotoSave?.(); break;
      default: break;
    }
  });

  /**
   * Reset is destructive and irreversible, so it takes two deliberate presses
   * with a visible state change between them rather than a browser confirm().
   */
  let resetArmed = 0;
  function confirmReset(btn) {
    const now = Date.now();
    if (resetArmed && now - resetArmed < 4000) {
      resetArmed = 0;
      btn.textContent = 'Reset progress';
      onResetProgress?.();
      return;
    }
    resetArmed = now;
    btn.textContent = 'Tap again to erase everything';
    setTimeout(() => {
      if (!resetArmed) return;
      resetArmed = 0;
      btn.textContent = 'Reset progress';
    }, 4000);
  }

  /* ======================================================================
     Touch affordances
     ====================================================================== */

  function setTouch(isTouch) {
    document.body.classList.toggle('is-touch', isTouch);
  }

  return {
    el, hub, shopUI, boardUI,
    show, openModal, closeModal,
    setHud, setGhost, showBiome, showToast, popup, flash,
    refreshHub, showResults, setPauseSeed,
    syncSettingsUI, setQualityNote, setTouch, setPhotoMode, readPhoto,
    /** Equipped cosmetics, resolved through shop.js so ownership is enforced. */
    equipped: (type) => shop.equipped(save, type),
    get current() { return current; },
  };
}
