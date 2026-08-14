/**
 * shop.js — the cosmetic catalog: Wisp trails, Wisp skins and auras.
 *
 * Cosmetics are pure description here too. A trail is a four-colour palette, a
 * skin is a set of proportions and material weights over the wisp meshes that
 * already exist, and an aura is a mode flag plus a colour. Nothing in the
 * catalog builds geometry — player.js constructs every mesh once at boot and
 * these entries only ever change scales, colours and visibility.
 *
 * That constraint is what makes cosmetics free at runtime: equipping one during
 * a run allocates nothing and cannot hitch.
 *
 * Cosmetics are also the one thing Rebirth can never take away.
 */

import { levelFromXp } from './economy.js';

/* ==========================================================================
   Trails
   ==========================================================================
   `shift` marks the two premium trails whose palette cycles over time. The
   cycle stays inside the Frutiger Aero range on purpose — pastel aqua, lilac,
   rose, mint — rather than a saturated RGB sweep, which would read as a
   different game's cosmetic entirely.
   ========================================================================== */

export const TRAILS = {
  trail_chrome: {
    name: 'Chrome', tier: 0, cost: null,
    core: '#FFFFFF', glow: '#CFE6F2', trail: '#EAF4FA', shell: '#EAF6FB',
  },
  trail_aqua: {
    name: 'Aqua', tier: 1, cost: { droplets: 600 },
    core: '#EAFFFC', glow: '#3FD1C0', trail: '#7FF3E4', shell: '#DBFFFA',
  },
  trail_mint: {
    name: 'Mint', tier: 1, cost: { droplets: 950 },
    core: '#F6FFEC', glow: '#8CD867', trail: '#BFF29A', shell: '#EDFCE0',
  },
  trail_sunset: {
    name: 'Sunset', tier: 2, cost: { droplets: 1500 }, reqLevel: 3,
    core: '#FFF6DE', glow: '#FFB36B', trail: '#FFD24C', shell: '#FFEFD2',
  },
  trail_lagoon: {
    name: 'Lagoon', tier: 2, cost: { droplets: 2400 }, reqLevel: 5,
    core: '#E4FBFF', glow: '#2FA8C8', trail: '#63D8F0', shell: '#CDF2FB',
  },
  trail_blossom: {
    name: 'Blossom', tier: 3, cost: { droplets: 3600 }, reqLevel: 8,
    core: '#FFF2F8', glow: '#F09ACB', trail: '#FFC3E2', shell: '#FFE6F2',
  },
  trail_citrus: {
    name: 'Citrus', tier: 3, cost: { droplets: 5200 }, reqLevel: 11,
    core: '#FCFFE8', glow: '#D6E84A', trail: '#EEF88C', shell: '#F7FFD6',
  },
  trail_iridescent: {
    name: 'Iridescent', tier: 4, cost: { prisms: 3 },
    core: '#FFFFFF', glow: '#9AD8F0', trail: '#CFE9FA', shell: '#EAF6FB',
    // Slow pastel hue cycle — condensation on glass, not a gamer keyboard.
    shift: { speed: 0.13, ramp: ['#8CE0F0', '#B7A9F0', '#F0A9D2', '#8CE8C8'] },
  },
  trail_aurora: {
    name: 'Aurora', tier: 4, cost: { prisms: 6 }, reqRebirth: 1,
    core: '#F4FFFB', glow: '#7FE0D2', trail: '#B9F5E6', shell: '#E6FFF8',
    shift: { speed: 0.08, ramp: ['#7FE0D2', '#9CC8FF', '#C9A9F0', '#8CFFE0'] },
  },
};

/* ==========================================================================
   Skins
   ==========================================================================
   Fields map straight onto the meshes player.js builds:
     core        which core mesh is shown ('sphere' | 'facet')
     coreScale   radius multiplier for it
     shellScale  radius multiplier for the glass shell
     shellOpacity
     emissive    emissive intensity of the core (bloom depends on this)
     halos       how many chrome rings are visible (0..2)
     glow        sprite halo size multiplier
     metal       core metalness — the difference between "light" and "object"
     pulse       core breathing rate
   ========================================================================== */

export const SKINS = {
  skin_dew: {
    name: 'Dew Drop', tier: 0, cost: null,
    core: 'sphere', coreScale: 1, shellScale: 1, shellOpacity: 1,
    emissive: 2.15, halos: 2, glow: 1, metal: 0, pulse: 3.4,
  },
  skin_bubble: {
    name: 'Bubble', tier: 1, cost: { droplets: 800 },
    core: 'sphere', coreScale: 0.62, shellScale: 1.34, shellOpacity: 1.25,
    emissive: 1.5, halos: 0, glow: 1.15, metal: 0, pulse: 2.1,
  },
  skin_chrome: {
    name: 'Chrome Bead', tier: 2, cost: { droplets: 1800 }, reqLevel: 4,
    core: 'sphere', coreScale: 1.08, shellScale: 0.9, shellOpacity: 0.55,
    emissive: 0.55, halos: 2, glow: 0.8, metal: 1, pulse: 2.6,
  },
  skin_shard: {
    name: 'Glass Shard', tier: 2, cost: { droplets: 2800 }, reqLevel: 7,
    core: 'facet', coreScale: 1.12, shellScale: 1.06, shellOpacity: 0.9,
    emissive: 1.9, halos: 1, glow: 0.95, metal: 0.25, pulse: 1.7,
  },
  skin_firefly: {
    name: 'Firefly', tier: 3, cost: { droplets: 4400 }, reqLevel: 10,
    core: 'sphere', coreScale: 0.5, shellScale: 0.72, shellOpacity: 0.4,
    emissive: 3.4, halos: 0, glow: 1.7, metal: 0, pulse: 6.2,
  },
  skin_prism: {
    name: 'Prism Core', tier: 4, cost: { prisms: 4 },
    core: 'facet', coreScale: 1.0, shellScale: 1.16, shellOpacity: 1.1,
    emissive: 2.6, halos: 2, glow: 1.3, metal: 0.1, pulse: 3.0,
  },
};

/* ==========================================================================
   Auras
   ==========================================================================
   `mode` selects which of the (pre-built, always-allocated) aura layers is
   switched on. 'none' hides all of them and costs nothing to draw.
   ========================================================================== */

export const AURAS = {
  aura_none: { name: 'None', tier: 0, cost: null, mode: 'none' },
  aura_halo: {
    name: 'Halo', tier: 1, cost: { droplets: 900 },
    mode: 'halo', color: '#CFEFFA', size: 3.0, speed: 1.4,
  },
  aura_motes: {
    name: 'Motes', tier: 2, cost: { droplets: 1900 }, reqLevel: 5,
    mode: 'motes', color: '#FFE985', size: 1.0, speed: 1.1, count: 10,
  },
  aura_dew: {
    name: 'Dewfall', tier: 2, cost: { droplets: 3000 }, reqLevel: 9,
    mode: 'motes', color: '#9BE9F5', size: 1.5, speed: 0.55, count: 7,
  },
  aura_prism: {
    name: 'Prism Bloom', tier: 4, cost: { prisms: 3 },
    mode: 'prism', color: '#FFFFFF', size: 3.6, speed: 0.7,
  },
};

/* ==========================================================================
   Catalog plumbing
   ========================================================================== */

export const CATALOG = {
  trail: TRAILS,
  skin: SKINS,
  aura: AURAS,
};

export const COSMETIC_TYPES = ['trail', 'skin', 'aura'];

/** Look an item up without caring which table it lives in. */
export function getCosmetic(id) {
  for (const type of COSMETIC_TYPES) {
    if (CATALOG[type][id]) return { type, id, ...CATALOG[type][id] };
  }
  return null;
}

export function owns(save, id) {
  return save.ownedCosmetics.includes(id);
}

/**
 * Requirements are shown even when unmet — a locked item the player can see is
 * a goal, and hiding the catalog until it is affordable removes the pull.
 */
export function requirement(save, id) {
  const item = getCosmetic(id);
  if (!item) return 'Unknown';
  if (item.reqRebirth && (save.rebirthCount || 0) < item.reqRebirth) {
    return `Rebirth ${item.reqRebirth}`;
  }
  if (item.reqLevel && levelFromXp(save.xp) < item.reqLevel) {
    return `Level ${item.reqLevel}`;
  }
  return null;
}

export function purchasable(save, id) {
  return !owns(save, id) && !requirement(save, id);
}

/** Buy a cosmetic. Does not persist or equip — the caller decides both. */
export function buyCosmetic(save, id, economy) {
  const item = getCosmetic(id);
  if (!item || owns(save, id)) return false;
  if (requirement(save, id)) return false;
  if (item.cost && !economy.spend(save, item.cost)) return false;
  save.ownedCosmetics.push(id);
  return true;
}

export function equip(save, id) {
  const item = getCosmetic(id);
  if (!item || !owns(save, id)) return false;
  save.equipped[item.type] = id;
  return true;
}

/** The equipped item of a type, falling back to the free default if invalid. */
export function equipped(save, type) {
  const fallback = { trail: 'trail_chrome', skin: 'skin_dew', aura: 'aura_none' }[type];
  const id = save.equipped?.[type];
  if (id && CATALOG[type][id] && owns(save, id)) return { id, ...CATALOG[type][id] };
  return { id: fallback, ...CATALOG[type][fallback] };
}

/** Everything of a type, in catalog order, with the state the UI needs. */
export function listType(save, type) {
  return Object.entries(CATALOG[type]).map(([id, item]) => ({
    id,
    type,
    ...item,
    owned: owns(save, id),
    equipped: save.equipped?.[type] === id,
    locked: requirement(save, id),
  }));
}
