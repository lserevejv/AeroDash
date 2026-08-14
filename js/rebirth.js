/**
 * rebirth.js — the prestige loop.
 *
 * WHAT REBIRTH IS FOR
 * -------------------
 * Upgrades eventually top out, and once they do, Droplets stop meaning
 * anything. Rebirth turns the accumulated cycle back into something scarce:
 * you trade your Droplets and your purchased upgrades for Prisms, a permanent
 * score multiplier, and access to the Realm tier.
 *
 * WHAT REBIRTH MUST NEVER TAKE
 * ----------------------------
 * Cosmetics, account Level/XP, World unlock history, and lifetime records are
 * untouchable. A player perceives those as *theirs* — an earned trail, a level
 * number, a World they were the first to reach. Resetting any of them would
 * make ascending feel like losing, which is the exact opposite of the intent,
 * and no amount of compensating currency fixes that feeling. The reset list
 * below is exhaustive and deliberately short.
 */

import { levelFromXp } from './economy.js';

/** Distance since the last rebirth that opens the option. */
export const REBIRTH_BASE = 10000;
/** Each cycle asks for more, so prestige stays meaningful as upgrades grow. */
export const REBIRTH_STEP = 6000;

/** Metres of cycle distance needed for the player's next rebirth. */
export function rebirthRequirement(save) {
  return REBIRTH_BASE + (save.rebirthCount || 0) * REBIRTH_STEP;
}

export function canRebirth(save) {
  return save.cycleDistance >= rebirthRequirement(save);
}

/** 0..1 progress toward the next rebirth, for the hub's meter. */
export function rebirthProgress(save) {
  return Math.min(1, save.cycleDistance / rebirthRequirement(save));
}

/**
 * Prisms a rebirth would pay out right now.
 *
 * Square-rooted on purpose. A linear payout would make it always correct to
 * delay rebirth for one more enormous cycle, which turns a prestige system into
 * a waiting game. Diminishing returns mean cycling *sooner* is competitive, so
 * the decision stays interesting.
 */
export function prismPayout(save) {
  const fromDroplets = Math.floor(Math.sqrt(save.cycleDroplets / 260));
  const fromDistance = Math.floor(save.cycleDistance / 25000);
  return Math.max(1, fromDroplets + fromDistance);
}

/** The permanent score multiplier at a given rebirth count. Stacks forever. */
export function rebirthMultiplier(count) {
  return 1 + count * 0.12;
}

/**
 * Everything the confirmation screen needs to show the player *before* they
 * commit. Ceremony matters here — this is a one-way door, and it should be
 * presented as an ascension with a full accounting, never a browser confirm().
 */
export function rebirthPreview(save) {
  return {
    eligible: canRebirth(save),
    requirement: rebirthRequirement(save),
    progress: rebirthProgress(save),
    prisms: prismPayout(save),
    nextCount: (save.rebirthCount || 0) + 1,
    multiplierNow: rebirthMultiplier(save.rebirthCount || 0),
    multiplierNext: rebirthMultiplier((save.rebirthCount || 0) + 1),
    resets: [
      `${Math.floor(save.droplets).toLocaleString('en-US')} Droplets`,
      'All purchased upgrades',
      'Cycle progress',
    ],
    keeps: [
      'Every cosmetic you own',
      `Level ${levelFromXp(save.xp)} and all XP`,
      'Worlds and Realms reached',
      'All lifetime records',
      `${save.prisms} Prisms`,
    ],
  };
}

/**
 * Perform the rebirth. Returns the payout summary, or null if not eligible.
 * Does not persist — the caller writes the save.
 */
export function performRebirth(save) {
  if (!canRebirth(save)) return null;

  const prisms = prismPayout(save);
  save.prisms += prisms;
  save.rebirthCount = (save.rebirthCount || 0) + 1;

  /* --- The complete reset list. Nothing else may be added here. --------- */
  save.droplets = 0;
  save.upgrades = {};
  save.cycleDistance = 0;
  save.cycleDroplets = 0;

  return {
    prisms,
    count: save.rebirthCount,
    multiplier: rebirthMultiplier(save.rebirthCount),
  };
}
