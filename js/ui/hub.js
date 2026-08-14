/**
 * ui/hub.js — the hub screen: wallet, account level, records and Worlds reached.
 *
 * The hub is the home base between runs, so it is the one screen that has to
 * answer "what have I got, and what is next" at a glance. Everything here is a
 * read of the save file — it owns no state of its own, which means it can be
 * refreshed after any transaction without a reconciliation step.
 */

import { formatScore, formatDistance } from './../utils.js';
import { levelProgress } from './../economy.js';
import { canRebirth } from './../rebirth.js';
import { WORLDS } from './../worlds.js';
import { dailyKey } from './../prng.js';

export function createHub({ el, save }) {
  /** Wallet chips appear in several screens; they all render through here. */
  function refreshWallet() {
    const droplets = formatScore(save.droplets);
    const prisms = formatScore(save.prisms);
    const lp = levelProgress(save.xp);

    setText(el.walDroplets, droplets);
    setText(el.walPrisms, prisms);
    setText(el.walLevel, String(lp.level));
    if (el.walXp) el.walXp.style.width = `${Math.round(lp.frac * 100)}%`;

    // The shop and upgrades screens carry their own copies of the wallet.
    setText(el.shopDroplets, droplets);
    setText(el.shopPrisms, prisms);
    setText(el.upgDroplets, droplets);
    setText(el.upgLevel, String(lp.level));
  }

  function refreshStats() {
    setText(el.statBest, formatScore(save.bestScore));
    setText(el.statBestDist, formatDistance(save.bestDistance));
    setText(el.statLifetime, formatDistance(save.lifetimeDistance));
  }

  /**
   * Worlds are shown whether or not they have been reached — a locked World is
   * a destination, and hiding it removes the reason to keep flying.
   */
  function refreshWorlds() {
    if (!el.worldRow) return;
    el.worldRow.innerHTML = '';
    for (const w of WORLDS) {
      const reached = save.worldsUnlocked.includes(w.key);
      const chip = document.createElement('span');
      chip.className = `world-chip${reached ? ' is-reached' : ''}${w.tier === 'realm' ? ' is-realm' : ''}`;
      chip.textContent = reached ? w.name : '???';
      chip.title = reached ? w.blurb : 'Not yet reached';
      el.worldRow.appendChild(chip);
    }
  }

  function refreshButtons() {
    // Rebirth is always visible so the loop is discoverable, but it only lights
    // up when it can actually be taken.
    if (el.btnRebirth) el.btnRebirth.classList.toggle('is-disabled', !canRebirth(save));
    if (el.btnDaily) {
      const done = save.daily.key === dailyKey() && save.daily.played;
      el.btnDaily.textContent = done ? 'Daily ✓' : 'Daily';
    }
  }

  function refresh() {
    refreshWallet();
    refreshStats();
    refreshWorlds();
    refreshButtons();
  }

  return { refresh, refreshWallet };
}

function setText(node, text) { if (node) node.textContent = text; }
