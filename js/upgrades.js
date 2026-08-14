/**
 * upgrades.js — persistent functional upgrades bought with Droplets.
 *
 * Every upgrade is a pure description: how many levels it has, what a level
 * costs, what account Level unlocks it, and how a level count maps to a number
 * the game reads. Nothing here touches the scene or the run — `computeMods()`
 * folds the whole purchased set into one flat object, and the systems that care
 * (shield, player, collectibles, scoring) read that object.
 *
 * Keeping it one-directional like this means an upgrade can never desync from
 * the save: there is no cached per-system state to invalidate, the mods are
 * simply recomputed whenever a run starts.
 *
 * Upgrades are the one thing Rebirth resets — see rebirth.js.
 */

import { levelFromXp } from './economy.js';

/* ==========================================================================
   Definitions
   ==========================================================================
   `value(level)` returns the *effective* number at that purchased level, with
   level 0 meaning "not bought" and returning the game's baseline. That way the
   baseline lives next to the curve instead of being scattered through the
   modules that consume it.
   ========================================================================== */

export const UPGRADES = [
  {
    id: 'shieldCapacity',
    name: 'Shield Capacity',
    blurb: 'More integrity pips before a run can end.',
    detail: (lv) => `${3 + lv} pips`,
    icon: 'shield',
    maxLevel: 3,
    reqLevel: 1,
    baseCost: 900,
    growth: 2.6,
    value: (lv) => 3 + lv,
  },
  {
    id: 'shieldRegen',
    name: 'Shield Regen',
    blurb: 'Clean flying restores a pip sooner.',
    detail: (lv) => `${(18 - lv * 1.9).toFixed(1)}s of clean flight`,
    icon: 'regen',
    maxLevel: 4,
    reqLevel: 3,
    baseCost: 700,
    growth: 2.2,
    value: (lv) => 18 - lv * 1.9,
  },
  {
    id: 'magnet',
    name: 'Magnet Radius',
    blurb: 'Nearby orbs drift toward the wisp.',
    detail: (lv) => (lv ? `${(lv * 1.7).toFixed(1)} m pull` : 'none'),
    icon: 'magnet',
    maxLevel: 5,
    reqLevel: 2,
    baseCost: 420,
    growth: 1.95,
    value: (lv) => lv * 1.7,
  },
  {
    id: 'boostTank',
    name: 'Boost Efficiency',
    blurb: 'Boost drains slower and orbs refill more.',
    detail: (lv) => `${Math.round(lv * 11)}% slower drain`,
    icon: 'boost',
    maxLevel: 5,
    reqLevel: 2,
    baseCost: 520,
    growth: 2.0,
    value: (lv) => 1 - lv * 0.11,
  },
  {
    id: 'comboHold',
    name: 'Combo Hold',
    blurb: 'The multiplier survives longer without a pickup.',
    detail: (lv) => `${(5 + lv * 1.1).toFixed(1)}s grace`,
    icon: 'combo',
    maxLevel: 5,
    reqLevel: 4,
    baseCost: 640,
    growth: 2.05,
    value: (lv) => 5 + lv * 1.1,
  },
  {
    id: 'streamTune',
    name: 'Stream Tuning',
    blurb: 'Riding a current is worth more.',
    detail: (lv) => `×${(1.5 + lv * 0.14).toFixed(2)} while riding`,
    icon: 'stream',
    maxLevel: 5,
    reqLevel: 6,
    baseCost: 780,
    growth: 2.1,
    value: (lv) => 1.5 + lv * 0.14,
  },
  {
    id: 'checkpointBonus',
    name: 'Checkpoint Yield',
    blurb: 'Checkpoint gates pay out more Droplets.',
    detail: (lv) => `+${Math.round(lv * 12)}%`,
    icon: 'gate',
    maxLevel: 5,
    reqLevel: 8,
    baseCost: 950,
    growth: 2.15,
    value: (lv) => 1 + lv * 0.12,
  },
];

export const UPGRADE_BY_ID = Object.fromEntries(UPGRADES.map((u) => [u.id, u]));

/* ==========================================================================
   Queries
   ========================================================================== */

export function upgradeLevel(save, id) {
  return Math.max(0, Math.min(UPGRADE_BY_ID[id]?.maxLevel ?? 0, save.upgrades?.[id] || 0));
}

/** Cost of the *next* level, or null when maxed. */
export function upgradeCost(save, id) {
  const def = UPGRADE_BY_ID[id];
  if (!def) return null;
  const lv = upgradeLevel(save, id);
  if (lv >= def.maxLevel) return null;
  return { droplets: Math.round(def.baseCost * Math.pow(def.growth, lv)) };
}

/** Whether the account Level is high enough to see/buy this upgrade yet. */
export function upgradeUnlocked(save, id) {
  const def = UPGRADE_BY_ID[id];
  if (!def) return false;
  return levelFromXp(save.xp) >= def.reqLevel;
}

/* ==========================================================================
   The flat mod set the game actually reads
   ========================================================================== */

/**
 * Fold every purchased upgrade (plus the permanent rebirth bonus) into one
 * object. Called once when a run starts; nothing reads UPGRADES during flight.
 *
 * @param {object} save
 * @returns {{shieldMax:number, shieldRegen:number, magnet:number,
 *            boostDrain:number, boostRefill:number, comboGrace:number,
 *            streamMultiplier:number, checkpointBonus:number,
 *            scoreMultiplier:number}}
 */
export function computeMods(save) {
  const lv = (id) => upgradeLevel(save, id);
  const val = (id) => UPGRADE_BY_ID[id].value(lv(id));

  return {
    shieldMax: val('shieldCapacity'),
    shieldRegen: val('shieldRegen'),
    magnet: val('magnet'),
    boostDrain: val('boostTank'),
    // The same tier that slows the drain also sweetens the refill, so one
    // purchase reads as "boost is better" rather than two half-upgrades.
    boostRefill: 1 + lv('boostTank') * 0.09,
    comboGrace: val('comboHold'),
    streamMultiplier: val('streamTune'),
    checkpointBonus: val('checkpointBonus'),
    // Prestige: a small permanent multiplier that stacks across rebirths.
    scoreMultiplier: 1 + (save.rebirthCount || 0) * 0.12,
  };
}

/**
 * Buy one level. Returns true if the purchase went through.
 * Deliberately does not persist — the caller writes the save, so a UI can batch.
 */
export function buyUpgrade(save, id, economy) {
  const def = UPGRADE_BY_ID[id];
  if (!def) return false;
  if (!upgradeUnlocked(save, id)) return false;
  const cost = upgradeCost(save, id);
  if (!cost) return false;
  if (!economy.spend(save, cost)) return false;
  save.upgrades[id] = upgradeLevel(save, id) + 1;
  return true;
}
