/**
 * utils.js — small maths, pooling and persistence helpers shared by every module.
 */

/* ==========================================================================
   Maths
   ========================================================================== */

export const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

export const lerp = (a, b, t) => a + (b - a) * t;

/** Inverse lerp, clamped to 0..1. */
export const invLerp = (a, b, v) => clamp((v - a) / (b - a || 1), 0, 1);

export const smoothstep = (edge0, edge1, x) => {
  const t = invLerp(edge0, edge1, x);
  return t * t * (3 - 2 * t);
};

/**
 * Frame-rate independent exponential smoothing.
 *
 * A naive `a = lerp(a, b, 0.1)` moves faster at high framerates and slower at
 * low ones, which makes the glide feel different on every machine. This decays
 * the *remaining* distance at a fixed rate per second instead, so the easing
 * curve is identical at 30fps and 144fps — essential for the "smooth glossy
 * glide" the whole game rests on.
 *
 * @param {number} lambda higher = snappier. ~4 is loose, ~12 is tight.
 */
export const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt));

export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
export const easeOutBack = (t) => {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

export const randRange = (min, max) => min + Math.random() * (max - min);
export const randInt = (min, max) => Math.floor(randRange(min, max + 1));
export const pick = (arr) => arr[(Math.random() * arr.length) | 0];
export const chance = (p) => Math.random() < p;

/** Deterministic 1D value noise — used for gentle, repeatable world undulation. */
export function hashNoise(x) {
  const s = Math.sin(x * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

/** Smooth pseudo-random curve in [-1, 1]; good for drifting paths. */
export function noise1D(x) {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return (lerp(hashNoise(i), hashNoise(i + 1), u) - 0.5) * 2;
}

/* ==========================================================================
   Object pool
   ========================================================================== */

/**
 * A minimal free-list pool.
 *
 * The world is generated in chunks ahead of the player and recycled behind, so
 * meshes must never be created or disposed mid-flight — allocating a
 * BufferGeometry during play causes a GC hitch that is instantly visible as a
 * stutter. Every world entity therefore comes from one of these pools: `acquire`
 * reuses a dead object when one exists and only builds a new one when the pool
 * has run dry, and `release` hides the object and returns it to the free list.
 */
export class Pool {
  /**
   * @param {() => any} factory builds a brand-new item (called rarely)
   * @param {(item:any) => void} [onRelease] resets an item as it goes back
   */
  constructor(factory, onRelease) {
    this.factory = factory;
    this.onRelease = onRelease;
    this.free = [];
    this.created = 0;
  }

  acquire() {
    const item = this.free.pop();
    if (item) return item;
    this.created++;
    return this.factory();
  }

  release(item) {
    if (this.onRelease) this.onRelease(item);
    this.free.push(item);
  }
}

/* Persistence lives in economy.js — it owns the save schema, its migration and
   every read/write, so there is exactly one definition of what a save is. */

/* ==========================================================================
   Formatting
   ========================================================================== */

export const formatScore = (n) => Math.floor(n).toLocaleString('en-US');
export const formatDistance = (m) => `${Math.floor(m).toLocaleString('en-US')} m`;

/* ==========================================================================
   Environment probes
   ========================================================================== */

export const isTouchDevice = () =>
  ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

/** Rough "is this a weak GPU" guess used to pick the opening quality tier. */
export function guessQualityTier() {
  const touch = isTouchDevice();
  const cores = navigator.hardwareConcurrency || 4;
  const smallScreen = Math.min(window.innerWidth, window.innerHeight) < 500;
  if (touch && (cores <= 4 || smallScreen)) return 'low';
  if (touch) return 'medium';
  if (cores <= 4) return 'medium';
  return 'high';
}
