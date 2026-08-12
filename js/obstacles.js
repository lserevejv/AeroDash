/**
 * obstacles.js — the soft hazards: cloud puffs in the Sky biome, glass/coral
 * clusters in the Water biome.
 *
 * These are *soft* in the strict sense: touching one costs speed and the combo
 * and shakes the camera, and that is the entire consequence. There is no damage
 * model, no health, and no way for a collision to end a run. That is a design
 * constraint, not an unfinished feature.
 *
 * Both hazard types are built from the same InstancedField primitive: one
 * InstancedMesh per shape, with a free-list of instance slots. A cluster is
 * just a handful of slots posed around a common centre, so the entire cloud
 * field of a run costs a single draw call.
 */

import * as THREE from 'three';
import { clamp, lerp, randRange, randInt } from './utils.js';
import { makeChromeMaterial } from './scene.js';

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
    // Park every slot until it's claimed, otherwise unused instances render
    // as identity-transformed blobs sitting at the origin.
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

  /* --- Cloud puffs ------------------------------------------------------ */
  // Low-poly rounded blobs. Flat shading at detail 0 keeps the faceted, chunky
  // silhouette that reads as a mid-2000s render rather than a modern volumetric.
  const cloudGeo = new THREE.IcosahedronGeometry(1, cloudDetail);
  const cloudMat = new THREE.MeshStandardMaterial({
    // Not pure white: a faint sky tint keeps clouds sitting *in* the
    // atmosphere rather than punching holes of paper through it.
    color: new THREE.Color('#D9ECF8'),
    roughness: 0.94,
    metalness: 0.0,
    transparent: true,
    opacity: 0.88,
    flatShading: cloudDetail === 0,
    envMapIntensity: 0.7,
  });
  const clouds = new InstancedField(scene, cloudGeo, cloudMat, capacity);

  /* --- Coral / glass spires --------------------------------------------- */
  const coralGeo = new THREE.ConeGeometry(1, 2.6, 7, 1);
  const coralMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#BFF3EC'),
    roughness: 0.12,
    metalness: 0.15,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    transparent: true,
    opacity: 0.82,
    envMapIntensity: 1.5,
  });
  const corals = new InstancedField(scene, coralGeo, coralMat, capacity);

  /* --- Chrome/glass beads that dress the coral clusters ----------------- */
  const beadGeo = new THREE.IcosahedronGeometry(1, 1);
  const beadMat = makeChromeMaterial({ color: '#DCF0F7', roughness: 0.1 });
  const beads = new InstancedField(scene, beadGeo, beadMat, Math.floor(capacity * 0.6));

  /* --- Live obstacle records -------------------------------------------- */
  const list = [];

  const _p = new THREE.Vector3();
  const _q = new THREE.Quaternion();
  const _e = new THREE.Euler();
  const _s = new THREE.Vector3();

  /**
   * Spawn a cloud puff.
   * @param {boolean} collides decorative banks pass false — they are scenery
   *   sitting outside the corridor and must never punish the player.
   */
  function spawnCloud(x, y, z, size = 1, { collides = true, blobs = 0 } = {}) {
    const n = blobs || randInt(4, 7);
    const parts = [];
    for (let i = 0; i < n; i++) {
      const slot = clouds.acquire();
      if (slot < 0) break;
      parts.push({
        slot,
        field: clouds,
        ox: randRange(-1.5, 1.5) * size,
        oy: randRange(-0.7, 0.7) * size,
        oz: randRange(-1.6, 1.6) * size,
        // Squashed spheres read far more like cloud than round ones do.
        sx: randRange(1.4, 2.6) * size,
        sy: randRange(0.85, 1.5) * size,
        sz: randRange(1.4, 2.6) * size,
        rx: randRange(0, Math.PI), ry: randRange(0, Math.PI), rz: randRange(0, Math.PI),
        spin: randRange(-0.09, 0.09),
      });
    }
    if (!parts.length) return null;

    const rec = {
      kind: 'cloud', x, y, z, parts, collides,
      radius: 2.5 * size,           // forgiving: well inside the visual bounds
      phase: Math.random() * Math.PI * 2,
      bob: randRange(0.25, 0.7),
    };
    list.push(rec);
    return rec;
  }

  /** Spawn a coral/glass cluster (Water biome). */
  function spawnCoral(x, y, z, size = 1, { collides = true } = {}) {
    const parts = [];
    const spires = randInt(3, 6);
    for (let i = 0; i < spires; i++) {
      const slot = corals.acquire();
      if (slot < 0) break;
      parts.push({
        slot,
        field: corals,
        ox: randRange(-1.6, 1.6) * size,
        oy: randRange(-1.2, 1.2) * size,
        oz: randRange(-1.6, 1.6) * size,
        sx: randRange(0.7, 1.3) * size,
        sy: randRange(1.3, 2.8) * size,
        sz: randRange(0.7, 1.3) * size,
        rx: randRange(-0.8, 0.8), ry: randRange(0, Math.PI * 2), rz: randRange(-0.8, 0.8),
        spin: randRange(-0.05, 0.05),
      });
    }
    // A couple of chrome beads nestled in the cluster — nature plus tech.
    for (let i = 0; i < 2; i++) {
      const slot = beads.acquire();
      if (slot < 0) break;
      parts.push({
        slot,
        field: beads,
        ox: randRange(-1.5, 1.5) * size,
        oy: randRange(-1.0, 1.0) * size,
        oz: randRange(-1.5, 1.5) * size,
        sx: randRange(0.4, 0.8) * size, sy: randRange(0.4, 0.8) * size, sz: randRange(0.4, 0.8) * size,
        rx: 0, ry: 0, rz: 0,
        spin: randRange(-0.5, 0.5),
      });
    }
    if (!parts.length) return null;

    const rec = {
      kind: 'coral', x, y, z, parts, collides,
      radius: 2.6 * size,
      phase: Math.random() * Math.PI * 2,
      bob: randRange(0.1, 0.35),
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

  function flush() { clouds.flush(); corals.flush(); beads.flush(); }

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

    /* --- Swept collision, same approach as the collectibles ------------ */
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
    spawnCloud, spawnCoral, release, reset, update, flush,
    list,
    materials: { cloudMat, coralMat, beadMat },
    get count() { return list.length; },
  };
}
