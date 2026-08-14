/**
 * economy.js — the save file, the two currencies, and the account-level
 * XP/Level track.
 *
 * This module is the single owner of persisted state. Every other system reads
 * and writes progression through the helpers here rather than poking at the
 * save object's shape directly, so the schema can move without a hunt through
 * a dozen files.
 *
 * THE OFFLINE RULE
 * ----------------
 * localStorage is the source of truth for *all* progression. The backend
 * (leaderboards, ghosts) is strictly additive: it can receive a copy of a run,
 * and it can hand back other players' runs, but nothing in this file ever waits
 * on it or degrades without it. The game is fully playable, fully progressible
 * and fully persistent with no server running at all.
 */

/* ==========================================================================
   Currencies
   ========================================================================== */

/**
 * Droplets — the common currency. Earned constantly during a run from orbs,
 * rings, streams and checkpoints, spent on upgrades and most cosmetics.
 * Rebirth resets them.
 *
 * Prisms — the prestige currency. Earned from Rebirth and, rarely, from Epic
 * checkpoints. Spent on premium cosmetics and permanent bonuses. Never reset.
 */
export const DROPLET_RATES = {
  orb: 1,
  orbBig: 4,
  ring: 6,
  streamPerSecond: 2,
  checkpointMinor: 25,
  checkpointMajor: 90,
  checkpointEpic: 320,
  portal: 180,
};

/** Chance an Epic checkpoint also drops a prism shard, and the shard value. */
export const EPIC_PRISM_CHANCE = 0.34;

/* ==========================================================================
   Level / XP
   ==========================================================================
   XP is a *lifetime* track: it never resets, not even through Rebirth, and it
   accrues from distance flown and droplets earned across every run. It is the
   thing that makes long-term play feel like it is going somewhere between
   prestige cycles, so it must never move backwards.
   ========================================================================== */

const XP_BASE = 420;
const XP_EXP = 1.55;
export const MAX_LEVEL = 60;

/** Total cumulative XP required to *reach* a given level. */
export function xpForLevel(level) {
  if (level <= 1) return 0;
  return Math.round(XP_BASE * Math.pow(level - 1, XP_EXP));
}

/** Level implied by a cumulative XP total. */
export function levelFromXp(xp) {
  let level = 1;
  while (level < MAX_LEVEL && xp >= xpForLevel(level + 1)) level++;
  return level;
}

/** Progress through the current level, for the hub's XP tube. */
export function levelProgress(xp) {
  const level = levelFromXp(xp);
  if (level >= MAX_LEVEL) return { level, into: 1, need: 1, frac: 1 };
  const floor = xpForLevel(level);
  const ceil = xpForLevel(level + 1);
  const into = xp - floor;
  const need = ceil - floor;
  return { level, into, need, frac: need > 0 ? into / need : 1 };
}

/** XP awarded by a finished run. Distance is the bulk; droplets top it up. */
export function xpForRun({ distance = 0, droplets = 0 } = {}) {
  return Math.floor(distance / 10) + Math.floor(droplets * 0.5);
}

/* ==========================================================================
   Save schema
   ========================================================================== */

const SAVE_KEY = 'aerodrift.save.v2';
const LEGACY_KEY = 'aerodrift.save.v1';

export const DEFAULT_SAVE = {
  version: 2,

  /* --- Identity (local-only until the player opts into a leaderboard) ---- */
  playerId: '',
  displayName: '',

  /* --- Currencies + account track --------------------------------------- */
  droplets: 0,
  prisms: 0,
  xp: 0,

  /* --- Prestige ---------------------------------------------------------- */
  rebirthCount: 0,
  /** Distance flown since the last rebirth — the rebirth gate. */
  cycleDistance: 0,
  /** Droplets earned since the last rebirth — feeds the prism payout. */
  cycleDroplets: 0,

  /* --- Purchased functional upgrades (id -> level). Reset by rebirth. ---- */
  upgrades: {},

  /* --- Cosmetics. NEVER reset by rebirth. -------------------------------- */
  ownedCosmetics: ['trail_chrome', 'skin_dew', 'aura_none'],
  equipped: { trail: 'trail_chrome', skin: 'skin_dew', aura: 'aura_none' },

  /* --- Content reached. NEVER reset by rebirth. -------------------------- */
  worldsUnlocked: ['skyshore'],
  realmsUnlocked: [],

  /* --- Records ----------------------------------------------------------- */
  bestScore: 0,
  bestCombo: 1,
  bestDistance: 0,
  lifetimeDistance: 0,
  lifetimeDroplets: 0,
  runs: 0,

  /* --- Achievements (ids) + the counters some of them watch -------------- */
  achievements: [],
  stats: {
    orbs: 0,
    rings: 0,
    checkpoints: 0,
    portals: 0,
    hits: 0,
    cleanRuns: 0,
    bestNoHitDistance: 0,
    photos: 0,
  },

  /* --- Daily challenge --------------------------------------------------- */
  daily: { key: '', score: 0, distance: 0, played: false },

  settings: {
    exposure: 0.86,
    bloom: 1.0,
    volume: 0.7,
    muted: false,
    quality: 'auto',
    ghosts: true,
    photoHud: true,
  },
};

/** Deep-ish clone that is safe on the plain data above. */
const cloneDefaults = () => JSON.parse(JSON.stringify(DEFAULT_SAVE));

/**
 * localStorage throws outright in some private-browsing modes and sandboxed
 * frames. Every access is guarded: losing progression is bad, but refusing to
 * start the game is worse.
 */
export function loadSave() {
  let parsed = null;
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) parsed = JSON.parse(raw);
  } catch (err) {
    console.warn('[aerodrift] save unreadable, using defaults', err);
  }

  if (!parsed) {
    const migrated = migrateV1();
    if (migrated) parsed = migrated;
  }

  const save = merge(cloneDefaults(), parsed || {});
  if (!save.playerId) save.playerId = makePlayerId();
  normalise(save);
  return save;
}

/**
 * Pull a v1 save forward. v1 had no economy at all, so the player keeps their
 * records and their earned trails and starts the new systems from zero — which
 * is the honest mapping, and better than silently wiping a high score.
 */
function migrateV1() {
  let old = null;
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (raw) old = JSON.parse(raw);
  } catch (err) {
    return null;
  }
  if (!old) return null;

  const owned = ['trail_chrome', 'skin_dew', 'aura_none'];
  for (const key of old.unlocked || []) {
    const id = `trail_${key}`;
    if (!owned.includes(id)) owned.push(id);
  }

  console.info('[aerodrift] migrating a v1 save forward');
  return {
    bestScore: old.bestScore || 0,
    bestCombo: old.bestCombo || 1,
    lifetimeDistance: old.lifetimeDistance || 0,
    cycleDistance: old.lifetimeDistance || 0,
    runs: old.runs || 0,
    // v1 players earned their trails the hard way; they keep them.
    ownedCosmetics: owned,
    equipped: {
      trail: old.trail ? `trail_${old.trail}` : 'trail_chrome',
      skin: 'skin_dew',
      aura: 'aura_none',
    },
    // Seed the XP track from the distance already flown, so a returning player
    // does not open the hub at level 1 with 40km behind them.
    xp: Math.floor((old.lifetimeDistance || 0) / 10),
    settings: old.settings || {},
  };
}

/** Recursive merge that keeps unknown keys from the stored save. */
function merge(base, over) {
  for (const [k, v] of Object.entries(over)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) {
      merge(base[k], v);
    } else if (v !== undefined) {
      base[k] = v;
    }
  }
  return base;
}

/** Repair anything a hand-edited or partial save could get wrong. */
function normalise(save) {
  if (!Array.isArray(save.ownedCosmetics) || !save.ownedCosmetics.length) {
    save.ownedCosmetics = ['trail_chrome', 'skin_dew', 'aura_none'];
  }
  for (const must of ['trail_chrome', 'skin_dew', 'aura_none']) {
    if (!save.ownedCosmetics.includes(must)) save.ownedCosmetics.push(must);
  }
  if (!Array.isArray(save.worldsUnlocked) || !save.worldsUnlocked.length) {
    save.worldsUnlocked = ['skyshore'];
  }
  if (!save.upgrades || typeof save.upgrades !== 'object') save.upgrades = {};
  for (const k of Object.keys(save.upgrades)) {
    const n = Math.floor(Number(save.upgrades[k]));
    if (!Number.isFinite(n) || n <= 0) delete save.upgrades[k];
    else save.upgrades[k] = n;
  }
  for (const k of ['droplets', 'prisms', 'xp', 'lifetimeDistance', 'cycleDistance', 'cycleDroplets']) {
    if (!Number.isFinite(save.droplets)) save.droplets = 0;
    if (!Number.isFinite(save[k]) || save[k] < 0) save[k] = 0;
  }
}

export function writeSave(save) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    return true;
  } catch (err) {
    /* Storage full or blocked. The run still plays; it just won't persist. */
    return false;
  }
}

/** Wipe everything. Used by the (confirmed) "reset progress" control. */
export function clearSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem(LEGACY_KEY);
  } catch (err) { /* ignore */ }
}

/** Anonymous, local, and never tied to anything personal. */
function makePlayerId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/* ==========================================================================
   Spending and earning
   ========================================================================== */

export function canAfford(save, cost) {
  if (!cost) return true;
  if (cost.prisms && save.prisms < cost.prisms) return false;
  if (cost.droplets && save.droplets < cost.droplets) return false;
  return true;
}

export function spend(save, cost) {
  if (!canAfford(save, cost)) return false;
  if (cost.droplets) save.droplets -= cost.droplets;
  if (cost.prisms) save.prisms -= cost.prisms;
  return true;
}

/** Droplets earned are tracked twice: for the wallet, and for the prism payout. */
export function earnDroplets(save, n) {
  const amount = Math.max(0, Math.floor(n));
  save.droplets += amount;
  save.lifetimeDroplets += amount;
  save.cycleDroplets += amount;
  return amount;
}

export function earnPrisms(save, n) {
  const amount = Math.max(0, Math.floor(n));
  save.prisms += amount;
  return amount;
}

/* ==========================================================================
   Run settlement
   ========================================================================== */

/**
 * Fold a finished run into the save file and report what changed, so the
 * results screen can celebrate the right things.
 *
 * The run's droplets have already been banked incrementally during flight (the
 * HUD counts them up live, which feels much better than a lump sum at the end),
 * so this only handles records, XP and the level-up check.
 */
export function settleRun(save, run) {
  const before = levelFromXp(save.xp);

  const isNewBestScore = run.score > save.bestScore;
  const isNewBestDistance = run.distance > save.bestDistance;

  save.bestScore = Math.max(save.bestScore, Math.floor(run.score));
  save.bestCombo = Math.max(save.bestCombo, run.bestCombo);
  save.bestDistance = Math.max(save.bestDistance, Math.floor(run.distance));
  save.lifetimeDistance = Math.floor(save.lifetimeDistance + run.distance);
  save.cycleDistance = Math.floor(save.cycleDistance + run.distance);
  save.runs += 1;

  const xpGain = xpForRun({ distance: run.distance, droplets: run.droplets });
  save.xp += xpGain;

  const after = levelFromXp(save.xp);

  return {
    xpGain,
    levelBefore: before,
    levelAfter: after,
    leveledUp: after > before,
    isNewBestScore,
    isNewBestDistance,
  };
}

/** Record that a World was reached for the first time. */
export function unlockWorld(save, key) {
  if (!key || save.worldsUnlocked.includes(key)) return false;
  save.worldsUnlocked.push(key);
  return true;
}

export function unlockRealm(save, key) {
  if (!key || save.realmsUnlocked.includes(key)) return false;
  save.realmsUnlocked.push(key);
  return true;
}
