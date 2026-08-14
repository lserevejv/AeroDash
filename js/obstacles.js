/**
 * obstacles.js — the soft hazards and the scenery, for every World.
 *
 * SOFT MEANS SOFT
 * ---------------
 * Contact costs speed, the combo, a camera shake and one Shield pip. That is
 * the entire consequence. There is no damage model and no health bar. A run can
 * only end when a contact happens with no Shield left (shield.js), and that is
 * the single exception in the whole codebase.
 *
 * FIELDS AND STYLES
 * -----------------
 * v1 had two hardcoded hazard shapes: a cloud puff and a coral spire. With five
 * Worlds that would have meant five bespoke spawners, so it is now two layers:
 *
 *   FIELD  one InstancedMesh per primitive shape (puff, spire, bead, shard),
 *          each with a free-list of instance slots. Four draw calls cover every
 *          obstacle and every piece of scenery in the game.
 *   STYLE  a recipe naming which fields to claim, how many, and the offset,
 *          scale and spin ranges to pose them in. A "cloud" and a "crystal" are
 *          the same code path with different numbers.
 *
 * Worlds reference styles by id, so adding a World adds data, not a spawner.
 * The field materials are re-tinted from the blended palette every frame, which
 * is what lets one puff mesh be a cloud in Skyshore, a leaf in Verdant Circuit
 * and a frosted bloom in Crystal Atrium without a second material.
 */

import * as THREE from 'three';
import { clamp, lerp } from './utils.js';
import { makeChromeMaterial } from './scene.js';

/* ==========================================================================
   Style recipes
   ==========================================================================
   `n` is an inclusive [min,max] instance count, `off` the ± offset spread in
   local units (scaled by the cluster size), `sx/sy/sz` scale ranges, `spin` the
   idle rotation rate. `place` only appears on decorative styles and describes
   where world.js should put them relative to the corridor.
   ========================================================================== */

export const STYLES = {
  /* --- Corridor hazards ------------------------------------------------- */

  cloud: {
    radius: 2.5, bob: [0.25, 0.7],
    parts: [{
      field: 'puff', n: [4, 7],
      off: [1.5, 0.7, 1.6],
      // Squashed spheres read as cloud; round ones read as bubbles.
      sx: [1.4, 2.6], sy: [0.85, 1.5], sz: [1.4, 2.6],
      tumble: true, spin: [-0.09, 0.09],
    }],
  },

  coral: {
    radius: 2.6, bob: [0.1, 0.35],
    parts: [
      {
        field: 'spire', n: [3, 6],
        off: [1.6, 1.2, 1.6],
        sx: [0.7, 1.3], sy: [1.3, 2.8], sz: [0.7, 1.3],
        lean: 0.8, spin: [-0.05, 0.05],
      },
      // Chrome beads nestled in the cluster — nature plus tech, the core
      // Frutiger Aero juxtaposition.
      { field: 'bead', n: [2, 2], off: [1.5, 1.0, 1.5], sx: [0.4, 0.8], spin: [-0.5, 0.5] },
    ],
  },

  leaf: {
    radius: 2.4, bob: [0.3, 0.8],
    parts: [
      {
        field: 'puff', n: [5, 8],
        off: [1.8, 0.5, 1.8],
        // Wide and thin: a canopy clump rather than a ball of foliage.
        sx: [1.6, 3.0], sy: [0.45, 0.9], sz: [1.6, 3.0],
        tumble: true, spin: [-0.13, 0.13],
      },
      { field: 'spire', n: [1, 2], off: [0.9, 0.8, 0.9], sx: [0.3, 0.55], sy: [1.0, 1.9], sz: [0.3, 0.55], lean: 0.5 },
    ],
  },

  pylon: {
    radius: 2.5, bob: [0.05, 0.18],
    parts: [
      {
        field: 'spire', n: [2, 3],
        off: [1.2, 1.5, 1.2],
        sx: [0.5, 0.85], sy: [2.0, 3.6], sz: [0.5, 0.85],
        lean: 0.14, spin: [-0.02, 0.02],
      },
      { field: 'bead', n: [3, 4], off: [1.3, 1.6, 1.3], sx: [0.3, 0.6], spin: [-0.9, 0.9] },
    ],
  },

  shard: {
    radius: 2.6, bob: [0.15, 0.5],
    parts: [
      {
        field: 'shard', n: [3, 6],
        off: [1.5, 1.3, 1.5],
        sx: [0.8, 1.6], sy: [1.1, 2.4], sz: [0.8, 1.6],
        tumble: true, spin: [-0.28, 0.28],
      },
      { field: 'bead', n: [1, 2], off: [1.2, 1.0, 1.2], sx: [0.35, 0.7], spin: [-0.6, 0.6] },
    ],
  },

  crystal: {
    radius: 2.6, bob: [0.08, 0.3],
    parts: [
      {
        field: 'shard', n: [2, 4],
        off: [1.2, 1.4, 1.2],
        sx: [0.9, 1.5], sy: [1.6, 3.0], sz: [0.9, 1.5],
        lean: 0.42, spin: [-0.12, 0.12],
      },
      {
        field: 'spire', n: [2, 3],
        off: [1.4, 1.2, 1.4],
        sx: [0.6, 1.1], sy: [1.4, 2.6], sz: [0.6, 1.1],
        lean: 0.55,
      },
    ],
  },

  /* --- Decorative scenery ----------------------------------------------- */
  // Never collides, always outside the corridor. `place` is read by world.js.

  skybank: {
    radius: 3, bob: [0.2, 0.6],
    place: [
      { count: 2, flank: [62, 150], y: [-14, 30], size: [2.4, 4.8] },
      // A cloud sea far below, so the horizon has something to sit on.
      { count: 1, spread: 220, y: [-104, -74], size: [4, 8] },
    ],
    parts: [{ field: 'puff', n: [5, 5], off: [1.5, 0.7, 1.6], sx: [1.4, 2.6], sy: [0.85, 1.5], sz: [1.4, 2.6], tumble: true }],
  },

  coralbank: {
    radius: 3, bob: [0.1, 0.3],
    place: [{ count: 3, flank: [40, 110], y: [-24, 4], size: [2.0, 4.2] }],
    parts: [
      { field: 'spire', n: [4, 6], off: [1.6, 1.2, 1.6], sx: [0.7, 1.3], sy: [1.6, 3.2], sz: [0.7, 1.3], lean: 0.6 },
      { field: 'bead', n: [1, 2], off: [1.5, 1.0, 1.5], sx: [0.4, 0.8] },
    ],
  },

  grovebank: {
    radius: 3, bob: [0.3, 0.7],
    place: [
      { count: 3, flank: [46, 130], y: [-20, 26], size: [2.6, 5.4] },
      { count: 1, spread: 200, y: [-96, -66], size: [4, 8] },
    ],
    parts: [
      { field: 'puff', n: [5, 6], off: [2.0, 0.6, 2.0], sx: [1.8, 3.2], sy: [0.5, 1.0], sz: [1.8, 3.2], tumble: true },
      { field: 'spire', n: [1, 2], off: [0.6, 1.4, 0.6], sx: [0.35, 0.6], sy: [2.2, 3.6], sz: [0.35, 0.6] },
    ],
  },

  circuitbank: {
    radius: 3, bob: [0.03, 0.12],
    place: [{ count: 3, flank: [44, 120], y: [-26, 10], size: [2.2, 4.6] }],
    parts: [
      { field: 'spire', n: [2, 4], off: [1.2, 1.8, 1.2], sx: [0.4, 0.8], sy: [2.6, 5.0], sz: [0.4, 0.8], lean: 0.1 },
      { field: 'bead', n: [2, 4], off: [1.4, 2.0, 1.4], sx: [0.3, 0.65], spin: [-1.1, 1.1] },
    ],
  },

  auroraband: {
    radius: 3, bob: [0.1, 0.4],
    place: [
      { count: 2, flank: [56, 140], y: [-16, 34], size: [2.4, 5.0] },
      { count: 1, spread: 210, y: [-98, -70], size: [4, 8] },
    ],
    parts: [{ field: 'shard', n: [4, 6], off: [1.8, 1.6, 1.8], sx: [1.0, 2.0], sy: [1.4, 3.4], sz: [1.0, 2.0], tumble: true, spin: [-0.1, 0.1] }],
  },

  atriumbank: {
    radius: 3, bob: [0.05, 0.2],
    place: [{ count: 3, flank: [48, 128], y: [-28, 18], size: [2.4, 5.2] }],
    parts: [
      { field: 'shard', n: [3, 5], off: [1.4, 1.8, 1.4], sx: [1.0, 1.8], sy: [2.2, 4.4], sz: [1.0, 1.8], lean: 0.3 },
      { field: 'spire', n: [2, 3], off: [1.6, 1.4, 1.6], sx: [0.7, 1.2], sy: [1.8, 3.4], sz: [0.7, 1.2], lean: 0.4 },
    ],
  },

  prismbank: {
    radius: 3, bob: [0.05, 0.2],
    place: [
      { count: 3, flank: [44, 124], y: [-26, 22], size: [2.2, 4.8] },
      { count: 1, spread: 190, y: [-92, -64], size: [3.5, 7] },
    ],
    parts: [{ field: 'shard', n: [4, 7], off: [1.6, 1.8, 1.6], sx: [0.9, 1.9], sy: [1.8, 4.0], sz: [0.9, 1.9], tumble: true, spin: [-0.16, 0.16] }],
  },

  emberbank: {
    radius: 3, bob: [0.15, 0.5],
    place: [
      { count: 2, flank: [58, 144], y: [-18, 30], size: [2.6, 5.2] },
      { count: 1, spread: 210, y: [-100, -72], size: [4, 8] },
    ],
    parts: [
      { field: 'puff', n: [4, 5], off: [1.7, 0.8, 1.7], sx: [1.6, 2.8], sy: [0.9, 1.6], sz: [1.6, 2.8], tumble: true },
      { field: 'shard', n: [1, 2], off: [1.2, 1.0, 1.2], sx: [0.6, 1.1], sy: [1.2, 2.2], sz: [0.6, 1.1], tumble: true },
    ],
  },
};

/* ==========================================================================
   Instanced slot allocator
   ========================================================================== */

class InstancedField {
  constructor(scene, geo, mat, capacity) {
    this.capacity = capacity;
    this.mesh = new THREE.InstancedMesh(geo, mat, capacity);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.mesh.count = capacity;
    scene.add(this.mesh);

    this.free = [];
    for (let i = capacity - 1; i >= 0; i--) this.free.push(i);

    this._m = new THREE.Matrix4();
    this._zero = new THREE.Matrix4().makeScale(0, 0, 0);
    // Park every slot until claimed, or unused instances render as
    // identity-transformed blobs piled at the origin.
    for (let i = 0; i < capacity; i++) this.mesh.setMatrixAt(i, this._zero);
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  acquire() { return this.free.length ? this.free.pop() : -1; }

  release(slot) {
    if (slot < 0) return;
    this.mesh.setMatrixAt(slot, this._zero);
    this.free.push(slot);
  }

  set(slot, pos, quat, scale) {
    this._m.compose(pos, quat, scale);
    this.mesh.setMatrixAt(slot, this._m);
  }

  flush() { this.mesh.instanceMatrix.needsUpdate = true; }
}

/* ==========================================================================
   Obstacle system
   ========================================================================== */

export function createObstacles(sceneCore, { cloudDetail = 1, capacity = 420 } = {}) {
  const { scene } = sceneCore;

  /* --- Materials, all re-tinted per frame from the blended palette ------ */

  const puffMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#D9ECF8'),
    roughness: 0.94,
    metalness: 0,
    transparent: true,
    opacity: 0.88,
    flatShading: cloudDetail === 0,
    envMapIntensity: 0.7,
  });

  const spireMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#BFF3EC'),
    roughness: 0.12,
    metalness: 0.15,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    transparent: true,
    opacity: 0.82,
    envMapIntensity: 1.5,
  });

  const beadMat = makeChromeMaterial({ color: '#DCF0F7', roughness: 0.1 });

  const shardMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#DFF2FA'),
    roughness: 0.05,
    metalness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    transparent: true,
    opacity: 0.7,
    envMapIntensity: 1.9,
    flatShading: true,
  });

  const fields = {
    puff: new InstancedField(scene, new THREE.IcosahedronGeometry(1, cloudDetail), puffMat, capacity),
    spire: new InstancedField(scene, new THREE.ConeGeometry(1, 2.6, 7, 1), spireMat, capacity),
    bead: new InstancedField(scene, new THREE.IcosahedronGeometry(1, 1), beadMat, Math.floor(capacity * 0.6)),
    shard: new InstancedField(scene, new THREE.OctahedronGeometry(1, 0), shardMat, Math.floor(capacity * 0.7)),
  };

  /* --- Live records ------------------------------------------------------ */
  const list = [];

  const _p = new THREE.Vector3();
  const _q = new THREE.Quaternion();
  const _e = new THREE.Euler();
  const _s = new THREE.Vector3();

  /**
   * Claim slots for one cluster.
   *
   * @param {string} styleId key into STYLES
   * @param {Rng} rng the chunk's seeded generator — every number drawn here
   *   comes from it, so a seed reproduces the scenery as well as the layout.
   */
  function spawn(styleId, x, y, z, size = 1, rng, { collides = true } = {}) {
    const style = STYLES[styleId] || STYLES.cloud;
    const parts = [];

    for (const recipe of style.parts) {
      const field = fields[recipe.field];
      if (!field) continue;
      const n = rng.int(recipe.n[0], recipe.n[1]);
      for (let i = 0; i < n; i++) {
        const slot = field.acquire();
        if (slot < 0) break; // pool exhausted: draw fewer rather than allocate
        const sxr = recipe.sx || [1, 1];
        const syr = recipe.sy || sxr;
        const szr = recipe.sz || sxr;
        const spin = recipe.spin || [0, 0];
        parts.push({
          slot,
          field,
          ox: rng.range(-recipe.off[0], recipe.off[0]) * size,
          oy: rng.range(-recipe.off[1], recipe.off[1]) * size,
          oz: rng.range(-recipe.off[2], recipe.off[2]) * size,
          sx: rng.range(sxr[0], sxr[1]) * size,
          sy: rng.range(syr[0], syr[1]) * size,
          sz: rng.range(szr[0], szr[1]) * size,
          // `tumble` scatters orientation freely; `lean` keeps a shape upright
          // and only tips it, which is what makes spires read as *rooted*.
          rx: recipe.tumble ? rng.range(0, Math.PI) : rng.range(-(recipe.lean || 0), recipe.lean || 0),
          ry: rng.range(0, Math.PI * 2),
          rz: recipe.tumble ? rng.range(0, Math.PI) : rng.range(-(recipe.lean || 0), recipe.lean || 0),
          spin: rng.range(spin[0], spin[1]),
        });
      }
    }

    if (!parts.length) return null;

    const rec = {
      style: styleId, x, y, z, parts, collides,
      // Forgiving on purpose: well inside the visual bounds, so a hit always
      // corresponds to something the player can see they clipped.
      radius: style.radius * size,
      phase: rng.range(0, Math.PI * 2),
      bob: rng.range(style.bob[0], style.bob[1]),
    };
    list.push(rec);
    return rec;
  }

  function release(rec) {
    const i = list.indexOf(rec);
    if (i >= 0) list.splice(i, 1);
    for (const p of rec.parts) p.field.release(p.slot);
  }

  function reset() { for (const rec of list.slice()) release(rec); flush(); }

  function flush() { for (const k in fields) fields[k].flush(); }

  /** Re-tint the shared field materials from the current blended palette. */
  function applyPalette(p) {
    puffMat.color.set(p.puffColor);
    spireMat.color.set(p.spireColor);
    beadMat.color.set(p.beadColor);
    shardMat.color.set(p.shardColor);
  }

  /* ======================================================================
     Update + collision
     ====================================================================== */

  const WISP_R = 1.0;

  function update(dt, elapsed, player, prev) {
    for (const rec of list) {
      const bobY = Math.sin(elapsed * 0.55 + rec.phase) * rec.bob;
      for (const p of rec.parts) {
        p.rz += p.spin * dt;
        _p.set(rec.x + p.ox, rec.y + p.oy + bobY, rec.z + p.oz);
        _e.set(p.rx, p.ry, p.rz);
        _q.setFromEuler(_e);
        _s.set(p.sx, p.sy, p.sz);
        p.field.set(p.slot, _p, _q, _s);
      }
    }
    flush();

    /* --- Swept collision ------------------------------------------------
       At boost speed the wisp covers well over a unit per frame, so a
       point-in-sphere test would let it pass straight through a cluster on a
       slow frame. Test the segment travelled instead. */
    const px = player.state.pos.x;
    const py = player.state.pos.y;
    const pz = player.state.pos.z;
    const dz = prev.z - pz;

    let hit = null;
    for (const rec of list) {
      if (!rec.collides) continue;
      if (rec.z > prev.z + rec.radius || rec.z < pz - rec.radius) continue;

      const t = dz > 0.0001 ? clamp((prev.z - rec.z) / dz, 0, 1) : 1;
      const sx = lerp(prev.x, px, t);
      const sy = lerp(prev.y, py, t);
      const bobY = Math.sin(elapsed * 0.55 + rec.phase) * rec.bob;
      const dx = sx - rec.x;
      const dy = sy - (rec.y + bobY);
      const r = rec.radius + WISP_R;

      if (dx * dx + dy * dy <= r * r) { hit = rec; break; }
    }
    return hit;
  }

  return {
    spawn, release, reset, update, flush, applyPalette,
    list, fields, STYLES,
    materials: { puffMat, spireMat, beadMat, shardMat },
    get count() { return list.length; },
  };
}
