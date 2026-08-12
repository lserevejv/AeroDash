/**
 * ui.js — screen flow, HUD and the glass/gel DOM chrome.
 *
 * The UI is plain DOM layered over the WebGL canvas: it keeps text crisp at any
 * DPI and lets the Aero look come from CSS (backdrop blur, gloss sweeps, gel
 * gradients) rather than from expensive in-scene geometry.
 *
 * Screen flow, in full:
 *   boot -> title -> [how|settings] -> playing -> pause -> [settings]
 *                                            \-> results -> title | playing
 *
 * There is deliberately no failure branch anywhere in that graph.
 */

import { TRAILS, computeUnlocks } from './player.js';
import { formatScore, formatDistance, clamp } from './utils.js';

const SCREENS = ['boot', 'title', 'how', 'pause', 'results', 'settings', 'offline'];

export function createUI(opts) {
  const {
    save,
    onPlay, onResume, onEndRun, onHome,
    onSettingsChange, onTrailChange,
    audio,
  } = opts;

  const $ = (id) => document.getElementById(id);

  const el = {
    screens: Object.fromEntries(SCREENS.map((s) => [s, $(`screen-${s}`)])),
    hud: $('hud'),
    score: $('hud-score'),
    combo: $('hud-combo'),
    distance: $('hud-distance'),
    progress: $('hud-progress'),
    boostGauge: $('boost-gauge'),
    boostFill: $('boost-fill'),
    biome: $('hud-biome'),
    popups: $('popups'),
    flash: $('flash'),
    boostPad: $('boost-pad'),
    pauseBtn: $('pause-btn'),
    statBest: $('stat-best'),
    statLifetime: $('stat-lifetime'),
    trailRow: $('trail-row'),
    trailHint: $('trail-hint'),
    resScore: $('res-score'),
    resDistance: $('res-distance'),
    resCombo: $('res-combo'),
    resBest: $('res-best'),
    resBadge: $('result-badge'),
    resUnlocks: $('res-unlocks'),
    setBloom: $('set-bloom'),
    setVolume: $('set-volume'),
    setMute: $('set-mute'),
    setQuality: $('set-quality'),
    valBloom: $('val-bloom'),
    valVolume: $('val-volume'),
    qualityNote: $('quality-note'),
  };

  let current = 'boot';
  let modalReturn = 'title'; // where "Back" goes from a modal

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
    // Remember whether we came from the title or from a paused run.
    if (current === 'title' || current === 'pause') modalReturn = current;
    show(name);
  }

  function closeModal() { show(modalReturn); }

  /* ======================================================================
     HUD
     ====================================================================== */

  let lastCombo = 1;
  let comboPulseTimer = null;

  function setHud(s) {
    el.score.textContent = formatScore(s.score);
    el.distance.textContent = formatDistance(s.distance);
    el.progress.style.width = `${clamp(s.progress, 0, 1) * 100}%`;

    if (s.combo !== lastCombo) {
      el.combo.textContent = `×${s.combo}`;
      el.combo.classList.toggle('is-hot', s.combo >= 8);
      // Retrigger the pop animation.
      el.combo.classList.add('is-pulse');
      clearTimeout(comboPulseTimer);
      comboPulseTimer = setTimeout(() => el.combo.classList.remove('is-pulse'), 130);
      lastCombo = s.combo;
    }

    el.boostFill.style.width = `${clamp(s.boost, 0, 1) * 100}%`;
    el.boostGauge.classList.toggle('is-ready', s.boost > 0.35 && !s.boosting);
    el.boostGauge.classList.toggle('is-firing', !!s.boosting);
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

  /* --- Floating score popups ------------------------------------------- */
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
     Title stats + trail picker
     ====================================================================== */

  function refreshTitleStats() {
    el.statBest.textContent = formatScore(save.bestScore);
    el.statLifetime.textContent = formatDistance(save.lifetimeDistance);
  }

  function refreshTrails() {
    const unlocked = computeUnlocks(save);
    save.unlocked = unlocked;
    el.trailRow.innerHTML = '';

    for (const [key, t] of Object.entries(TRAILS)) {
      const isUnlocked = unlocked.includes(key);
      const btn = document.createElement('button');
      btn.className = 'trail-dot';
      btn.type = 'button';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-label', t.name);
      btn.setAttribute('aria-checked', String(save.trail === key));
      btn.style.background =
        `radial-gradient(circle at 34% 28%, #FFFFFF 0%, ${t.core} 26%, ${t.glow} 68%, ${t.trail} 100%)`;

      if (!isUnlocked) {
        btn.classList.add('is-locked');
        btn.disabled = true;
        btn.title = t.hint;
      } else if (save.trail === key) {
        btn.classList.add('is-selected');
      }

      btn.addEventListener('pointerenter', () => {
        el.trailHint.textContent = isUnlocked ? t.name : `${t.name} — ${t.hint}`;
      });
      btn.addEventListener('pointerleave', () => { el.trailHint.innerHTML = '&nbsp;'; });

      btn.addEventListener('click', () => {
        if (!isUnlocked) return;
        save.trail = key;
        if (audio) audio.click();
        onTrailChange(key);
        refreshTrails();
      });

      el.trailRow.appendChild(btn);
    }
  }

  /* ======================================================================
     Results
     ====================================================================== */

  function showResults(data) {
    el.resScore.textContent = formatScore(data.score);
    el.resDistance.textContent = formatDistance(data.distance);
    el.resCombo.textContent = `×${data.bestCombo}`;
    el.resBest.textContent = formatScore(save.bestScore);
    el.resBadge.hidden = !data.isNewBest;

    el.resUnlocks.innerHTML = '';
    for (const key of data.newUnlocks || []) {
      const t = TRAILS[key];
      if (!t) continue;
      const node = document.createElement('div');
      node.className = 'unlock-toast';
      node.textContent = `New trail unlocked — ${t.name}`;
      el.resUnlocks.appendChild(node);
    }

    show('results');
  }

  /* ======================================================================
     Settings
     ====================================================================== */

  function syncSettingsUI() {
    const s = save.settings;
    el.setBloom.value = String(Math.round(s.bloom * 100));
    el.valBloom.textContent = `${Math.round(s.bloom * 100)}%`;
    el.setVolume.value = String(Math.round(s.volume * 100));
    el.valVolume.textContent = `${Math.round(s.volume * 100)}%`;
    el.setMute.checked = !!s.muted;
    for (const b of el.setQuality.querySelectorAll('.seg-btn')) {
      b.classList.toggle('is-on', b.dataset.q === s.quality);
    }
  }

  function setQualityNote(text) { el.qualityNote.textContent = text; }

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

  el.setQuality.addEventListener('click', (e) => {
    const btn = e.target.closest('.seg-btn');
    if (!btn) return;
    save.settings.quality = btn.dataset.q;
    syncSettingsUI();
    if (audio) audio.click();
    onSettingsChange('quality', save.settings.quality);
  });

  /* ======================================================================
     Global button wiring
     ====================================================================== */

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    if (audio && action !== 'reload') audio.click();

    switch (action) {
      case 'play': onPlay(); break;
      case 'resume': onResume(); break;
      case 'end-run': onEndRun(); break;
      case 'home': onHome(); break;
      case 'how': openModal('how'); break;
      case 'settings': openModal('settings'); break;
      case 'close-modal': closeModal(); break;
      default: break;
    }
  });

  /* ======================================================================
     Touch affordances
     ====================================================================== */

  function setTouch(isTouch) {
    document.body.classList.toggle('is-touch', isTouch);
  }

  return {
    el,
    show, openModal, closeModal,
    setHud, showBiome, popup, flash,
    refreshTitleStats, refreshTrails, showResults,
    syncSettingsUI, setQualityNote, setTouch,
    get current() { return current; },
  };
}
