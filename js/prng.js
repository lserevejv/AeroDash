/**
 * prng.js — seeded pseudo-random numbers.
 *
 * WHY THIS EXISTS
 * ---------------
 * Everything the world generator does used to come from `Math.random()`, which
 * makes a run impossible to reproduce. Three features depend on reproducing one:
 * ghost replays (racing a stored path only works if the corridor is identical),
 * daily-seed challenges, and being able to reproduce a reported bug from its
 * seed alone. So all *gameplay* randomness now flows through here.
 *
 * Purely cosmetic randomness — spark jitter, bokeh drift, camera shake — is
 * deliberately left on `Math.random()`. It never affects where anything is, so
 * seeding it would only make the world look subtly identical without buying
 * anything.
 *
 * DETERMINISM AND CALL ORDER
 * --------------------------
 * A single stream of numbers is only reproducible if it is consumed in exactly
 * the same order every time, and chunk generation is driven by framerate — a
 * slow frame builds two chunks where a fast one builds none. Rather than depend
 * on that, every chunk derives its *own* generator from `hash(seed, index)`.
 * Chunk N is then identical no matter when, or in what order, it was built.
 */

/* ==========================================================================
   Core generator
   ========================================================================== */

/**
 * mulberry32 — a 32-bit generator that is tiny, fast and has more than good
 * enough distribution for level layout. Cryptographic quality is irrelevant
 * here; reproducibility is the entire point.
 */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Mix two 32-bit integers into a well-scattered third (finalizer of murmur3). */
export function hash2(a, b) {
  let h = (a ^ Math.imul(b ^ (b >>> 16), 0x45d9f3b)) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b) >>> 0;
  return (h ^ (h >>> 16)) >>> 0;
}

/** Hash an arbitrary string to a 32-bit integer (so seeds can be typed in). */
export function hashString(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/* ==========================================================================
   Rng — the object the game actually passes around
   ========================================================================== */

/**
 * A seeded generator with the same helper surface the code used to get from
 * utils.js (`randRange`, `randInt`, `chance`, `pick`), so call sites read the
 * same as before and nothing is quietly left on Math.random by accident.
 */
export class Rng {
  constructor(seed = 1) {
    this.seed = seed >>> 0;
    this.next = mulberry32(this.seed);
  }

  /** Restart this generator from its seed. */
  reset() { this.next = mulberry32(this.seed); }

  /** Re-seed in place — used when a run starts. */
  reseed(seed) {
    this.seed = seed >>> 0;
    this.next = mulberry32(this.seed);
  }

  /** A fresh independent generator derived from this one plus a salt. */
  fork(salt) { return new Rng(hash2(this.seed, salt >>> 0)); }

  float() { return this.next(); }
  range(min, max) { return min + this.next() * (max - min); }
  int(min, max) { return Math.floor(this.range(min, max + 1)); }
  chance(p) { return this.next() < p; }
  pick(arr) { return arr[(this.next() * arr.length) | 0]; }
  sign() { return this.next() < 0.5 ? -1 : 1; }

  /**
   * Weighted pick. `weights` parallels `arr`; entries need not sum to 1.
   * Used for obstacle/formation mixes that differ per world.
   */
  weighted(arr, weights) {
    let total = 0;
    for (const w of weights) total += w;
    let r = this.next() * total;
    for (let i = 0; i < arr.length; i++) {
      r -= weights[i];
      if (r <= 0) return arr[i];
    }
    return arr[arr.length - 1];
  }
}

/* ==========================================================================
   Seed presentation
   ========================================================================== */

/**
 * Seeds are shown to players (results screen, URL, leaderboard) so they need a
 * short human-typeable form. Base36 uppercase gives at most 7 characters, and
 * `I`/`O`/`1`/`0` confusion is tolerable because seeds are copied, not dictated.
 */
export function seedToString(seed) {
  return (seed >>> 0).toString(36).toUpperCase().padStart(6, '0');
}

/**
 * Parse a seed the player supplied. Anything that isn't a clean base36 integer
 * is hashed instead, so "aerodrift" and "🌊" are both perfectly valid seeds.
 */
export function seedFromString(str) {
  if (str == null) return null;
  const s = String(str).trim();
  if (!s) return null;
  if (/^[0-9a-z]{1,7}$/i.test(s)) {
    const n = parseInt(s, 36);
    if (Number.isFinite(n) && n > 0) return n >>> 0;
  }
  return hashString(s);
}

/** A fresh unpredictable seed for a normal run. */
export function randomSeed() {
  return (Math.random() * 0xFFFFFFFF) >>> 0;
}

/**
 * The daily-challenge seed: identical for every player on a given UTC date, so
 * a shared leaderboard is comparing identical corridors.
 */
export function dailySeed(date = new Date()) {
  const key = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
  return hashString(`aerodrift-daily-${key}`);
}

/** The `YYYY-MM-DD` label that goes with `dailySeed()`. */
export function dailyKey(date = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${date.getUTCFullYear()}-${p(date.getUTCMonth() + 1)}-${p(date.getUTCDate())}`;
}
