/**
 * worlds.js — World definitions, the per-run World sequence, and the pure
 * distance -> look/content functions the rest of the game reads.
 *
 * WHAT REPLACED waterAmount()
 * ---------------------------
 * v1 had exactly two biomes and a single closed-form `waterAmount(distance)`
 * that returned 0 in Sky and 1 in Water, mirrored by hand in GLSL. That worked
 * for two, and could not be extended to N without special-casing every new
 * biome on top of the old one.
 *
 * The generalisation is two levels deep:
 *
 *   WORLD    a themed realm (Skyshore, Verdant Circuit, ...). A run flies
 *            through them in sequence, one every WORLD_LENGTH metres, crossing
 *            a Portal gate at each boundary.
 *   STRATUM  a World's two faces (Skyshore is Sky then Shore; Verdant Circuit
 *            is Grove then Circuit). Each World shows both of its strata
 *            exactly once, cross-fading between them.
 *
 * `paletteAt(distance)` blends the two strata straddling the player and hands
 * back one flat palette; every visual system consumes that and nothing else.
 * The old Sky/Water pair is now simply the first World's two strata, so its
 * behaviour is preserved exactly while the machinery underneath is general.
 *
 * The water plane no longer mirrors a formula in GLSL. `surfaceAmountAt()` is
 * sampled into a small lookup texture each frame (see world.js), which is what
 * lets an arbitrary sequence of Worlds — some with an ocean, some with a mirror
 * flood, some with nothing — fade in ahead of the player down the corridor.
 */

import { clamp, lerp } from './utils.js';

/* ==========================================================================
   Layout
   ========================================================================== */

/** Metres of flight per World before its Portal. */
export const WORLD_LENGTH = 2400;
/** Each World shows two strata, so a stratum is half a World. */
export const STRATUM_LENGTH = WORLD_LENGTH / 2;
/** Half-width of the cross-fade between strata. */
export const STRATUM_FADE = 220;
/** The Epic checkpoint heralds the Portal this far before it. */
export const PORTAL_LEAD = 300;

/* ==========================================================================
   Palette
   ==========================================================================
   Every field is either a colour string or a number, which is the whole reason
   blending is a four-line loop. `BASE_PALETTE` exists so a stratum only has to
   state what makes it different, and so adding a field later cannot produce an
   `undefined` halfway through a blend.
   ========================================================================== */

export const BASE_PALETTE = {
  /* Sky dome */
  skyTop: '#0F6099',
  skyMid: '#3AA9D8',
  skyHorizon: '#AEDFF2',
  skyGround: '#4394BE',

  /* Atmosphere */
  fog: '#78BCDE',
  fogNear: 380,
  fogFar: 1100,

  /* Sun */
  sunColor: '#FFE58F',
  sunGlow: 0.86,

  /* Lighting, in true physical units — see the note in README on brightness. */
  hemiSky: '#B6E2F6',
  hemiGround: '#6AA6C0',
  hemiIntensity: 0.66,
  keyIntensity: 0.80,
  envIntensity: 1.00,
  /** Per-world exposure trim, multiplied into the player's exposure setting. */
  exposure: 1.0,

  /* Reflective surface (ocean / mirror flood / glass floor) */
  surfaceDeep: '#07515A',
  surfaceShallow: '#3FD1C0',
  surfaceWave: 1.0,       // amplitude scale for the three wave components
  surfaceCaustic: 1.0,
  surfaceFresnel: 3.4,
  surfaceSpec: 1.7,

  /* Obstacle field tints */
  puffColor: '#D9ECF8',
  spireColor: '#BFF3EC',
  beadColor: '#DCF0F7',
  shardColor: '#DFF2FA',

  /* Drifting motes (bubbles / pollen / stardust / glass dust) */
  moteColor: '#CFF8FF',
  moteRise: 4.8,          // metres/second; negative falls
  moteSize: 1.0,
  moteOpacity: 0.55,

  /* Veils (underwater shafts / aurora ribbons / sun through glass) */
  veilColor: '#DFFBFF',
  veilOpacity: 1.0,
  veilTilt: -0.29,        // radians of roll; ~0 is vertical, ~1.5 is horizontal
  veilWidth: 1.0,
  veilHeight: 1.0,

  /* Content accents */
  accent: '#7FE0D2',
  streamColor: '#8CFFF0',
  gateColor: '#8CFFF0',
};

/** Build a stratum, stating only what differs from the base palette. */
function stratum(name, surface, overrides, content = {}) {
  return {
    name,
    /** 0..1 — how present the reflective surface plane is in this stratum. */
    surface,
    palette: { ...BASE_PALETTE, ...overrides },
    /** Obstacle style ids (see obstacles.js) used inside the corridor. */
    hazard: content.hazard || 'cloud',
    /** Decorative style outside the corridor; never collides. */
    decor: content.decor || 'skybank',
  };
}

/* ==========================================================================
   The World roster
   ==========================================================================
   Order is the order a run flies them. Everything stays inside the Frutiger
   Aero range: bright, optimistic, wet, glossy. Aurora Reach is the darkest of
   them and is still a pastel twilight, never a night.
   ========================================================================== */

export const WORLDS = [
  {
    key: 'skyshore',
    name: 'Skyshore',
    tier: 'base',
    blurb: 'Open sky over a warm shallow sea.',
    strata: [
      stratum('Sky', 0, {}, { hazard: 'cloud', decor: 'skybank' }),
      stratum('Shore', 1, {
        skyTop: '#065C7E',
        skyMid: '#1E9BAE',
        skyHorizon: '#96E4E0',
        skyGround: '#095F66',
        fog: '#48B4B8',
        fogNear: 300,
        fogFar: 980,
        sunColor: '#D8F6EF',
        sunGlow: 0.62,
        hemiSky: '#A0E8E0',
        hemiGround: '#0C666C',
        hemiIntensity: 0.74,
        keyIntensity: 0.68,
        envIntensity: 1.14,
        surfaceDeep: '#07515A',
        surfaceShallow: '#3FD1C0',
        spireColor: '#BFF3EC',
        moteColor: '#CFF8FF',
        moteRise: 4.8,
        accent: '#3FD1C0',
        streamColor: '#B6FFF0',
      }, { hazard: 'coral', decor: 'coralbank' }),
    ],
  },

  {
    key: 'verdant',
    name: 'Verdant Circuit',
    tier: 'base',
    blurb: 'Living canopy threaded with humming chrome.',
    strata: [
      stratum('Grove', 0, {
        skyTop: '#186B5E',
        skyMid: '#4FB98F',
        skyHorizon: '#CDE8AE',
        skyGround: '#357E52',
        fog: '#7FC79E',
        fogNear: 340,
        fogFar: 1000,
        sunColor: '#FBEB98',
        sunGlow: 0.80,
        hemiSky: '#C8ECB8',
        hemiGround: '#37704C',
        hemiIntensity: 0.68,
        keyIntensity: 0.80,
        puffColor: '#BFE8A8',
        spireColor: '#7FE0C8',
        beadColor: '#DCF7EC',
        shardColor: '#CFF5DC',
        // Pollen drifts *down* through shafts of canopy light.
        moteColor: '#EAFFB8',
        moteRise: -1.6,
        moteSize: 0.8,
        moteOpacity: 0.5,
        veilColor: '#EFFFD0',
        veilOpacity: 1.0,
        veilTilt: -0.16,
        accent: '#7FE8B4',
        streamColor: '#A8FFD0',
        gateColor: '#A8FFC8',
      }, { hazard: 'leaf', decor: 'grovebank' }),
      stratum('Circuit', 0.85, {
        skyTop: '#0E6E74',
        skyMid: '#2FB6B0',
        skyHorizon: '#C6F7E8',
        skyGround: '#14807A',
        fog: '#63CFC0',
        fogNear: 320,
        fogFar: 960,
        sunColor: '#E8FFF0',
        sunGlow: 0.74,
        hemiSky: '#BFF7EC',
        hemiGround: '#116E70',
        hemiIntensity: 0.74,
        keyIntensity: 0.76,
        envIntensity: 1.20,
        // A still mirror flood rather than an ocean: tiny waves, hard specular.
        surfaceDeep: '#0A5A56',
        surfaceShallow: '#59E8D0',
        surfaceWave: 0.28,
        surfaceCaustic: 0.5,
        surfaceFresnel: 4.6,
        surfaceSpec: 2.6,
        puffColor: '#A8E0C0',
        spireColor: '#8CF0DC',
        beadColor: '#E4FBF4',
        shardColor: '#BFF6E8',
        moteColor: '#B8FFE8',
        moteRise: 2.6,
        veilColor: '#D8FFF0',
        veilTilt: -0.22,
        accent: '#4FE8C8',
        streamColor: '#8CFFE0',
        gateColor: '#8CFFE0',
      }, { hazard: 'pylon', decor: 'circuitbank' }),
    ],
  },

  {
    key: 'aurora',
    name: 'Aurora Reach',
    tier: 'base',
    blurb: 'Pastel twilight over a mirror-still sea.',
    strata: [
      stratum('Dusk', 0, {
        skyTop: '#3A4E96',
        skyMid: '#7B86D0',
        skyHorizon: '#F0C9E0',
        skyGround: '#4A4E86',
        fog: '#A6A8DC',
        fogNear: 340,
        fogFar: 1050,
        sunColor: '#FFD8E8',
        sunGlow: 0.78,
        hemiSky: '#D8D2F5',
        hemiGround: '#4E4E86',
        hemiIntensity: 0.72,
        keyIntensity: 0.72,
        envIntensity: 1.10,
        exposure: 1.06,
        puffColor: '#D6CFF0',
        spireColor: '#B9C6F0',
        beadColor: '#EAE6FA',
        shardColor: '#D8D0F6',
        moteColor: '#FFEAF6',
        moteRise: 0.9,
        moteSize: 0.7,
        moteOpacity: 0.7,
        veilColor: '#D6C4F0',
        veilOpacity: 0.8,
        accent: '#C9A9F0',
        streamColor: '#D8C0FF',
        gateColor: '#D8C0FF',
      }, { hazard: 'cloud', decor: 'skybank' }),
      stratum('Aurora', 0.92, {
        skyTop: '#2C4488',
        skyMid: '#6E92D8',
        skyHorizon: '#CFF2EC',
        skyGround: '#33478E',
        fog: '#8FA8DC',
        fogNear: 320,
        fogFar: 1000,
        sunColor: '#CFF6FF',
        sunGlow: 0.60,
        hemiSky: '#C6E4FA',
        hemiGround: '#33478E',
        hemiIntensity: 0.76,
        keyIntensity: 0.62,
        envIntensity: 1.18,
        exposure: 1.08,
        surfaceDeep: '#1B2A5E',
        surfaceShallow: '#7FD8E8',
        surfaceWave: 0.36,
        surfaceCaustic: 0.35,
        surfaceFresnel: 5.2,
        surfaceSpec: 2.3,
        puffColor: '#C6D6F2',
        spireColor: '#9CC8F0',
        shardColor: '#CFE8FA',
        // Stardust: barely moving, tiny, bright.
        moteColor: '#FFFFFF',
        moteRise: 0.35,
        moteSize: 0.55,
        moteOpacity: 0.85,
        // Ribbons: rolled almost flat and stretched wide across the sky.
        veilColor: '#8CF0D0',
        veilOpacity: 1.5,
        veilTilt: 1.42,
        veilWidth: 2.1,
        veilHeight: 0.5,
        accent: '#8CF0D8',
        streamColor: '#B8F0FF',
        gateColor: '#B8F0FF',
      }, { hazard: 'shard', decor: 'auroraband' }),
    ],
  },

  {
    key: 'crystal',
    name: 'Crystal Atrium',
    tier: 'base',
    blurb: 'A sunlit conservatory of geode glass.',
    strata: [
      // Crystal Atrium is the hardest World to keep out of blow-out: a pale sky
      // over a pale fog over glass that reflects both. Its horizon, fog and
      // exposure are all pulled down from where they first landed, and the
      // brightness now comes from contrast against the geode glass rather than
      // from the whole frame sitting near white.
      stratum('Atrium', 0, {
        skyTop: '#4A90AC',
        skyMid: '#8FC8DC',
        skyHorizon: '#F2E2C2',
        skyGround: '#74A8B6',
        fog: '#B6D8DC',
        fogNear: 380,
        fogFar: 1150,
        sunColor: '#FFEBB8',
        sunGlow: 0.88,
        hemiSky: '#F4E8D2',
        hemiGround: '#86AAB4',
        hemiIntensity: 0.70,
        keyIntensity: 0.80,
        envIntensity: 1.15,
        exposure: 0.86,
        puffColor: '#E8F2F0',
        spireColor: '#DCF2F8',
        beadColor: '#F4FAFC',
        shardColor: '#EAF6FF',
        moteColor: '#FFF4D8',
        moteRise: 1.2,
        moteSize: 0.6,
        moteOpacity: 0.6,
        veilColor: '#FFF0D0',
        veilOpacity: 0.9,
        veilTilt: -0.08,
        accent: '#FFD8A8',
        streamColor: '#FFE8C0',
        gateColor: '#FFE0B0',
      }, { hazard: 'crystal', decor: 'atriumbank' }),
      stratum('Prism', 0.80, {
        skyTop: '#5F72C4',
        skyMid: '#9CBEE0',
        skyHorizon: '#F0C8DE',
        skyGround: '#7E8EC4',
        fog: '#BCB8DC',
        fogNear: 360,
        fogFar: 1100,
        sunColor: '#FFF4FA',
        sunGlow: 0.94,
        hemiSky: '#E2D8F6',
        hemiGround: '#7A88C0',
        hemiIntensity: 0.74,
        keyIntensity: 0.80,
        envIntensity: 1.25,
        exposure: 0.86,
        // Polished glass floor: no swell at all, mirror-hard highlight.
        surfaceDeep: '#6A7AB8',
        surfaceShallow: '#CFE8FF',
        surfaceWave: 0.14,
        surfaceCaustic: 0.7,
        surfaceFresnel: 5.8,
        surfaceSpec: 3.0,
        puffColor: '#F0E4F8',
        spireColor: '#E4D8FA',
        shardColor: '#FFF0FA',
        moteColor: '#FFE4F4',
        moteRise: 1.6,
        moteSize: 0.7,
        veilColor: '#FFD8F0',
        veilOpacity: 1.1,
        accent: '#F0A8D8',
        streamColor: '#E8C0FF',
        gateColor: '#F0C0F0',
      }, { hazard: 'crystal', decor: 'prismbank' }),
    ],
  },

  /* --- Realm tier -------------------------------------------------------- */
  {
    key: 'solarbloom',
    name: 'Solar Bloom',
    tier: 'realm',
    blurb: 'Endless golden hour. Molten chrome, heavy flare.',
    strata: [
      stratum('Gold', 0, {
        skyTop: '#B85E20',
        skyMid: '#F0A048',
        skyHorizon: '#FFEBC0',
        skyGround: '#C87838',
        fog: '#F0C088',
        fogNear: 360,
        fogFar: 1080,
        sunColor: '#FFF0B0',
        sunGlow: 1.25,
        hemiSky: '#FFE8B8',
        hemiGround: '#B06A30',
        hemiIntensity: 0.72,
        keyIntensity: 0.92,
        envIntensity: 1.20,
        exposure: 0.88,
        puffColor: '#FFDCA8',
        spireColor: '#FFC878',
        beadColor: '#FFEED0',
        shardColor: '#FFE0B0',
        moteColor: '#FFE0A0',
        moteRise: 2.2,
        veilColor: '#FFDFA0',
        veilOpacity: 1.4,
        veilTilt: -0.34,
        accent: '#FFC24C',
        streamColor: '#FFDE8C',
        gateColor: '#FFD470',
      }, { hazard: 'cloud', decor: 'skybank' }),
      stratum('Ember', 0.90, {
        skyTop: '#A8481E',
        skyMid: '#F08850',
        skyHorizon: '#FFE0B0',
        skyGround: '#B85A28',
        fog: '#E8A468',
        fogNear: 320,
        fogFar: 1000,
        sunColor: '#FFF4C8',
        sunGlow: 1.35,
        hemiSky: '#FFDCA0',
        hemiGround: '#9C4A1E',
        hemiIntensity: 0.74,
        keyIntensity: 0.88,
        envIntensity: 1.28,
        exposure: 0.86,
        surfaceDeep: '#8A3A18',
        surfaceShallow: '#FFC070',
        surfaceWave: 0.55,
        surfaceCaustic: 0.8,
        surfaceFresnel: 4.0,
        surfaceSpec: 2.8,
        puffColor: '#FFCE90',
        spireColor: '#FFB060',
        shardColor: '#FFD8A0',
        moteColor: '#FFCE80',
        moteRise: 3.4,
        veilColor: '#FFCE88',
        veilOpacity: 1.2,
        accent: '#FF9E3C',
        streamColor: '#FFC868',
        gateColor: '#FFBC50',
      }, { hazard: 'crystal', decor: 'emberbank' }),
    ],
  },
];

export const WORLD_BY_KEY = Object.fromEntries(WORLDS.map((w) => [w.key, w]));
export const BASE_WORLDS = WORLDS.filter((w) => w.tier === 'base');
export const REALM_WORLDS = WORLDS.filter((w) => w.tier === 'realm');

/** Realms open once every base World has been reached at least once. */
export function realmsAvailable(save) {
  return BASE_WORLDS.every((w) => save.worldsUnlocked.includes(w.key));
}

/* ==========================================================================
   Per-run World sequence
   ========================================================================== */

/**
 * The order a run visits Worlds. Always starts at World 1 — a run is a journey
 * outward, not a level select — and appends the Realm tier once it is earned.
 * The sequence loops, because a skilled pilot is supposed to be able to fly
 * forever and must never run out of world.
 */
export function buildSequence(save) {
  const seq = BASE_WORLDS.map((w) => w.key);
  if (realmsAvailable(save)) seq.push(...REALM_WORLDS.map((w) => w.key));
  return seq;
}

/**
 * A run's plan: which World sits at which distance, where the Portals are, and
 * the pure look/content functions keyed off distance.
 *
 * Everything here is a function of distance alone. That is deliberate — chunks
 * are generated far ahead of the player and must agree exactly with what the
 * palette and the surface plane will be doing when the player arrives.
 */
export function createPlan(sequence) {
  const seq = sequence.length ? sequence : ['skyshore'];

  /** Which entry of the sequence covers this distance, and how far into it. */
  function worldAt(distance) {
    const d = Math.max(0, distance);
    const index = Math.floor(d / WORLD_LENGTH);
    const world = WORLD_BY_KEY[seq[index % seq.length]] || WORLDS[0];
    return {
      index,
      /** How many complete passes through the sequence — the difficulty dial. */
      loop: Math.floor(index / seq.length),
      key: world.key,
      world,
      local: d - index * WORLD_LENGTH,
    };
  }

  /**
   * The two strata straddling a distance, and the blend between them.
   * Returns `{ a, b, t }` where t=0 is purely `a`.
   */
  function strataAt(distance) {
    const { world, local } = worldAt(distance);
    const [s0, s1] = world.strata;
    // Stratum 0 for the first half of the World, stratum 1 for the second,
    // with a symmetric cross-fade centred on the halfway mark.
    const t = smooth(STRATUM_LENGTH - STRATUM_FADE, STRATUM_LENGTH + STRATUM_FADE, local);
    return { a: s0, b: s1, t };
  }

  /**
   * How present the reflective surface is at a distance. Cheap on purpose:
   * world.js samples this a few hundred times per frame to fill the lookup
   * texture the surface shader reads, so it must not touch a Color object.
   */
  function surfaceAmountAt(distance) {
    const { a, b, t } = strataAt(distance);
    return lerp(a.surface, b.surface, t);
  }

  /** The blended palette at a distance, written into `out` to avoid garbage. */
  function paletteAt(distance, out = {}) {
    const { a, b, t } = strataAt(distance);
    return blendPalettes(a.palette, b.palette, t, out);
  }

  /** The dominant stratum, for the on-screen "SKYSHORE — SHORE" announcement. */
  function stratumAt(distance) {
    const { a, b, t } = strataAt(distance);
    return t > 0.5 ? b : a;
  }

  /** Distance of the Portal that closes the World containing `distance`. */
  function nextPortalDistance(distance) {
    return (Math.floor(Math.max(0, distance) / WORLD_LENGTH) + 1) * WORLD_LENGTH;
  }

  /** Distance of the Portal at the end of World `index` (0-based). */
  function portalDistance(index) { return (index + 1) * WORLD_LENGTH; }

  return {
    sequence: seq,
    worldAt, strataAt, stratumAt, paletteAt, surfaceAmountAt,
    nextPortalDistance, portalDistance,
    get length() { return seq.length; },
  };
}

/* ==========================================================================
   Conditions
   ==========================================================================
   A World looks slightly different every time you fly it. The condition is
   drawn from the run seed and the World index, so it is reproducible (a ghost
   race sees the same weather) but never the same two Worlds running.

   Every entry is a multiplier over the blended palette rather than a second
   palette. That keeps a World recognisably itself — Crystal Atrium under mist
   is still obviously Crystal Atrium — and means a condition cannot accidentally
   push a World outside the aesthetic.
   ========================================================================== */

export const CONDITIONS = [
  { key: 'clear', name: 'Clear', weight: 3, mul: {} },
  {
    key: 'golden',
    name: 'Golden',
    weight: 2,
    mul: { sunGlow: 1.38, fogFar: 1.12, exposure: 0.96, keyIntensity: 1.08 },
    tint: { sunColor: ['#FFD98C', 0.42], fog: ['#F2CE9A', 0.22] },
  },
  {
    key: 'misty',
    name: 'Misty',
    weight: 2,
    mul: { fogNear: 0.42, fogFar: 0.60, sunGlow: 0.62, hemiIntensity: 1.14, keyIntensity: 0.86 },
    tint: { fog: ['#E8F4F8', 0.3] },
  },
  {
    key: 'crisp',
    name: 'Crisp',
    weight: 2,
    mul: { fogNear: 1.45, fogFar: 1.38, envIntensity: 1.12, keyIntensity: 1.10, exposure: 0.97 },
  },
  {
    key: 'bloom',
    name: 'Radiant',
    weight: 1,
    mul: { sunGlow: 1.22, envIntensity: 1.18, exposure: 1.05, hemiIntensity: 1.08 },
    tint: { sunColor: ['#FFFFFF', 0.3] },
  },
];

const CONDITION_BY_KEY = Object.fromEntries(CONDITIONS.map((c) => [c.key, c]));

/**
 * Which condition applies to a World index in a seeded run.
 * Uses its own hash rather than a generator so it can be asked out of order —
 * chunks far ahead need the answer before the player gets there.
 */
export function conditionFor(seed, worldIndex) {
  let total = 0;
  for (const c of CONDITIONS) total += c.weight;
  // Cheap deterministic hash of (seed, index) into [0,1).
  const h = hashMix(seed >>> 0, (worldIndex + 1) * 0x9E3779B1);
  let r = (h / 4294967296) * total;
  for (const c of CONDITIONS) {
    r -= c.weight;
    if (r <= 0) return c;
  }
  return CONDITIONS[0];
}

function hashMix(a, b) {
  let h = (a ^ Math.imul(b ^ (b >>> 16), 0x45d9f3b)) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b) >>> 0;
  return (h ^ (h >>> 16)) >>> 0;
}

/**
 * Apply a condition to an already-blended palette, in place.
 *
 * `amount` cross-fades the condition itself, so the weather can ease across a
 * Portal instead of switching on the frame the World does.
 */
export function applyCondition(palette, condition, amount = 1) {
  if (!condition || amount <= 0) return palette;
  const c = typeof condition === 'string' ? CONDITION_BY_KEY[condition] : condition;
  if (!c) return palette;

  for (const k in c.mul) {
    if (typeof palette[k] !== 'number') continue;
    palette[k] *= lerp(1, c.mul[k], amount);
  }
  if (c.tint) {
    for (const k in c.tint) {
      const [hex, strength] = c.tint[k];
      palette[k] = mixHex(palette[k], hex, strength * amount);
    }
  }
  return palette;
}

/* ==========================================================================
   Blending
   ========================================================================== */

function smooth(e0, e1, x) {
  const t = clamp((x - e0) / (e1 - e0 || 1), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Blend two palettes field by field. Numbers lerp; colour strings are parsed to
 * RGB, mixed, and written back as hex.
 *
 * Parsing hex twice per field per frame sounds wasteful, and would be if this
 * ran per-object — but it runs exactly once a frame for the whole game, and
 * keeping palettes as plain strings means a stratum definition is readable data
 * rather than a wall of constructor calls.
 */
export function blendPalettes(a, b, t, out = {}) {
  for (const k in a) {
    const va = a[k];
    const vb = b[k];
    if (typeof va === 'number') {
      out[k] = lerp(va, vb === undefined ? va : vb, t);
    } else {
      out[k] = mixHex(va, vb === undefined ? va : vb, t);
    }
  }
  return out;
}

const _hexCache = new Map();
function parseHex(hex) {
  let v = _hexCache.get(hex);
  if (v === undefined) {
    const n = parseInt(hex.slice(1), 16);
    v = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    _hexCache.set(hex, v);
  }
  return v;
}

function mixHex(ha, hb, t) {
  if (t <= 0) return ha;
  if (t >= 1) return hb;
  const a = parseHex(ha);
  const b = parseHex(hb);
  const r = Math.round(lerp(a[0], b[0], t));
  const g = Math.round(lerp(a[1], b[1], t));
  const bl = Math.round(lerp(a[2], b[2], t));
  return `#${((1 << 24) | (r << 16) | (g << 8) | bl).toString(16).slice(1)}`;
}
