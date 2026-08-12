/**
 * collectibles.js — light orbs, glass ring gates and current streams, plus all
 * of their pickup / pass / ride detection.
 *
 * Performance shape:
 *  - Orbs are by far the most numerous thing in the world, so they are drawn
 *    as ONE InstancedMesh (the glossy cores) plus ONE Points cloud (the additive
 *    halos) — two draw calls for the entire orb field regardless of count.
 *  - Rings and streams are few, so they are ordinary pooled meshes.
 *
 * Detection is *swept*, not point-in-sphere. At 85 units/second the wisp moves
 * over a unit per frame, so a naive distance test would let the player tunnel
 * straight through an orb or a ring. Everything here tests the segment the wisp
 * travelled this frame instead.
 */

import * as THREE from 'three';
import { clamp, lerp, Pool, randRange } from './utils.js';
import { glowTexture, streamTexture } from './textures.js';
import { makeGlassMaterial, makeChromeMaterial } from './scene.js';

/* ==========================================================================
   Tuning
   ========================================================================== */

export const ORB_VALUE = 10;
export const ORB_BIG_VALUE = 35;
export const RING_VALUE = 150;

const ORB_PICKUP_R = 2.4;
const ORB_BIG_PICKUP_R = 3.1;
const ORB_BOOST = 0.05;
const ORB_BIG_BOOST = 0.11;
const RING_BOOST = 0.12;

const STREAM_RIDE_R = 3.6;
const STREAM_LENGTH = 300;

/* ==========================================================================
   Additive halo point cloud (shared by orbs)
   ========================================================================== */

const HALO_VERT = /* glsl */ `
  attribute float aSize;
  attribute vec3  aColor;
  attribute float aAlpha;
  uniform float uScale;
  varying vec3  vColor;
  varying float vAlpha;
  void main() {
    vColor = aColor;
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = min(aSize * (uScale / max(0.001, -mv.z)), 220.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const HALO_FRAG = /* glsl */ `
  uniform sampler2D uMap;
  varying vec3  vColor;
  varying float vAlpha;
  void main() {
    vec4 t = texture2D(uMap, gl_PointCoord);
    gl_FragColor = vec4(vColor * t.rgb, t.a * vAlpha);
  }
`;

function createHaloCloud(scene, capacity) {
  const positions = new Float32Array(capacity * 3);
  const sizes = new Float32Array(capacity);
  const colors = new Float32Array(capacity * 3);
  const alphas = new Float32Array(capacity);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1).setUsage(THREE.DynamicDrawUsage));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uMap: { value: glowTexture('#ffffff', 2.2) },
      uScale: { value: window.innerHeight * 0.5 },
    },
    vertexShader: HALO_VERT,
    fragmentShader: HALO_FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geo, material);
  points.frustumCulled = false;
  points.renderOrder = 20;
  scene.add(points);
  return { points, geo, material, positions, sizes, colors, alphas };
}

/* ==========================================================================
   Orb field
   ========================================================================== */

class OrbField {
  constructor(scene, capacity) {
    this.capacity = capacity;

    // One instanced draw for every orb core in the world.
    const geo = new THREE.SphereGeometry(0.62, 14, 10);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFFFFF'),
      emissive: new THREE.Color('#FFE985'),
      emissiveIntensity: 2.4,   // above 1.0 so bloom picks it up
      roughness: 0.25,
      metalness: 0.0,
    });
    this.mesh = new THREE.InstancedMesh(geo, mat, capacity);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.mesh.count = capacity;
    scene.add(this.mesh);

    this.halo = createHaloCloud(scene, capacity);

    /* Per-orb state, stored as flat parallel arrays (no per-orb objects). */
    this.active = new Uint8Array(capacity);
    this.px = new Float32Array(capacity);
    this.py = new Float32Array(capacity);
    this.pz = new Float32Array(capacity);
    this.phase = new Float32Array(capacity);
    this.big = new Uint8Array(capacity);
    this.pop = new Float32Array(capacity);   // >0 while playing the collect pop
    this.freeList = [];
    for (let i = capacity - 1; i >= 0; i--) this.freeList.push(i);

    this._m = new THREE.Matrix4();
    this._q = new THREE.Quaternion();
    this._p = new THREE.Vector3();
    this._s = new THREE.Vector3();
    this._colorNormal = new THREE.Color('#FFE985');
    this._colorBig = new THREE.Color('#C9A9F0');
    this.count = 0;
  }

  spawn(x, y, z, big = false) {
    const i = this.freeList.pop();
    if (i === undefined) return -1; // pool exhausted; skip rather than allocate
    this.active[i] = 1;
    this.px[i] = x; this.py[i] = y; this.pz[i] = z;
    this.phase[i] = Math.random() * Math.PI * 2;
    this.big[i] = big ? 1 : 0;
    this.pop[i] = 0;
    this.count++;
    return i;
  }

  release(i) {
    if (i < 0 || !this.active[i]) return;
    this.active[i] = 0;
    this.pop[i] = 0;
    this.count--;
    this.freeList.push(i);
    // Park the instance out of sight until it is reused.
    this._m.makeScale(0, 0, 0);
    this.mesh.setMatrixAt(i, this._m);
    this.halo.alphas[i] = 0;
  }

  releaseAll() {
    for (let i = 0; i < this.capacity; i++) if (this.active[i]) this.release(i);
  }

  /** Start the collect animation; the orb is released when it finishes. */
  startPop(i) { this.pop[i] = 0.001; }

  update(dt, elapsed) {
    const { positions, sizes, colors, alphas } = this.halo;

    for (let i = 0; i < this.capacity; i++) {
      if (!this.active[i]) { alphas[i] = 0; continue; }

      let scale = this.big[i] ? 1.55 : 1.0;
      let alpha = 1;

      if (this.pop[i] > 0) {
        // Collect feedback: flare outward and fade, then recycle.
        this.pop[i] += dt;
        const t = clamp(this.pop[i] / 0.28, 0, 1);
        scale *= 1 + t * 1.9;
        alpha = 1 - t;
        if (t >= 1) { this.release(i); continue; }
      }

      // Gentle bob + spin so the field never looks static.
      const bob = Math.sin(elapsed * 1.9 + this.phase[i]) * 0.42;
      const y = this.py[i] + bob;

      this._p.set(this.px[i], y, this.pz[i]);
      this._q.setFromAxisAngle(UP, elapsed * 1.4 + this.phase[i]);
      this._s.setScalar(scale);
      this._m.compose(this._p, this._q, this._s);
      this.mesh.setMatrixAt(i, this._m);

      positions[i * 3] = this._p.x;
      positions[i * 3 + 1] = this._p.y;
      positions[i * 3 + 2] = this._p.z;
      sizes[i] = (this.big[i] ? 15 : 10) * scale;
      const c = this.big[i] ? this._colorBig : this._colorNormal;
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
      alphas[i] = alpha * (0.75 + Math.sin(elapsed * 3.1 + this.phase[i]) * 0.12);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
    this.halo.geo.attributes.position.needsUpdate = true;
    this.halo.geo.attributes.aSize.needsUpdate = true;
    this.halo.geo.attributes.aColor.needsUpdate = true;
    this.halo.geo.attributes.aAlpha.needsUpdate = true;
  }

  setHaloScale(h) { this.halo.material.uniforms.uScale.value = h * 0.5; }
}

const UP = new THREE.Vector3(0, 1, 0);

/* ==========================================================================
   Collectibles system
   ========================================================================== */

export function createCollectibles(sceneCore, { capacityOrbs = 300, cheapGlass = false } = {}) {
  const { scene } = sceneCore;

  const orbs = new OrbField(scene, capacityOrbs);

  /* --- Ring pool -------------------------------------------------------- */
  // Rings are chunky and few, so they stay as individual pooled groups. The
  // geometry is shared across every instance — only the transform differs.
  const ringGlassGeo = new THREE.TorusGeometry(7, 0.62, 16, 56);
  const ringChromeGeo = new THREE.TorusGeometry(7, 0.20, 12, 56);
  const ringGlowGeo = new THREE.TorusGeometry(7, 0.34, 8, 48);

  const ringPool = new Pool(
    () => {
      const g = new THREE.Group();

      const glass = new THREE.Mesh(ringGlassGeo, makeGlassMaterial({
        color: '#E8F7FD', cheap: cheapGlass, opacity: 0.4,
      }));
      g.add(glass);

      const chrome = new THREE.Mesh(ringChromeGeo, makeChromeMaterial({ roughness: 0.07 }));
      chrome.scale.setScalar(1.055);
      g.add(chrome);

      // Emissive inner lip — this is the part bloom grabs, and it's what makes
      // a ring legible as a *gate* from far away.
      const glowMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FFFFFF'),
        emissive: new THREE.Color('#7FE0D2'),
        emissiveIntensity: 2.2,
        roughness: 0.4,
        transparent: true,
        opacity: 0.9,
      });
      const glow = new THREE.Mesh(ringGlowGeo, glowMat);
      glow.scale.setScalar(0.94);
      g.add(glow);

      g.userData = { glass, chrome, glow, glowMat };
      scene.add(g);
      return g;
    },
    (g) => { g.visible = false; },
  );

  const rings = [];

  /* --- Stream pool ------------------------------------------------------ */
  // Stream centrelines are analytic, so the same handful of tube geometries
  // can be reused everywhere and the ride test can evaluate the curve directly
  // instead of searching mesh vertices.
  const STREAM_VARIANTS = [
    { ax: 9, fx: 1.2, px: 0.0, ay: 4.5, fy: 0.8, py: 1.1 },
    { ax: 14, fx: 0.8, px: 1.7, ay: 3.0, fy: 1.4, py: 0.3 },
    { ax: 6, fx: 1.8, px: 0.6, ay: 6.5, fy: 1.0, py: 2.2 },
    { ax: 18, fx: 0.6, px: 2.4, ay: 2.0, fy: 1.7, py: 0.9 },
  ];

  /** Analytic centreline of a stream variant, in the stream's local space. */
  function streamPoint(v, t, out) {
    return out.set(
      v.ax * Math.sin(t * v.fx * Math.PI * 2 + v.px),
      v.ay * Math.sin(t * v.fy * Math.PI * 2 + v.py),
      -t * STREAM_LENGTH,
    );
  }

  const streamGeos = STREAM_VARIANTS.map((v) => {
    const pts = [];
    const tmp = new THREE.Vector3();
    for (let i = 0; i <= 40; i++) pts.push(streamPoint(v, i / 40, tmp).clone());
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 90, 2.5, 10, false);
  });

  const streamPool = new Pool(
    () => {
      const map = streamTexture('#8CFFF0');
      const mat = new THREE.MeshBasicMaterial({
        map,
        // Additive + DoubleSide means you see through both walls of the tube
        // and the contribution doubles. Keep the base modest so only the
        // texture's bright cores cross the bloom threshold.
        color: new THREE.Color('#8CFFF0').multiplyScalar(0.8),
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: true,
      });
      const mesh = new THREE.Mesh(streamGeos[0], mat);
      mesh.frustumCulled = false;
      mesh.renderOrder = 15;
      scene.add(mesh);
      return mesh;
    },
    (m) => { m.visible = false; },
  );

  const streams = [];

  /* --- Spawners --------------------------------------------------------- */

  function spawnOrb(x, y, z, big = false) {
    return orbs.spawn(x, y, z, big);
  }

  function spawnRing(x, y, z, { radius = 7, tilt = 0, accent = '#7FE0D2' } = {}) {
    const g = ringPool.acquire();
    g.visible = true;
    g.position.set(x, y, z);
    g.rotation.set(0, 0, tilt);
    g.scale.setScalar(radius / 7);
    g.userData.glowMat.emissive.set(accent);
    const rec = { g, x, y, z, radius, passed: false, spin: randRange(-0.5, 0.5), flash: 0 };
    rings.push(rec);
    return rec;
  }

  function spawnStream(x, y, z, accentColor = '#8CFFF0') {
    const vi = (Math.random() * STREAM_VARIANTS.length) | 0;
    const mesh = streamPool.acquire();
    mesh.geometry = streamGeos[vi];
    mesh.visible = true;
    mesh.position.set(x, y, z);
    mesh.material.map.offset.y = Math.random();
    mesh.material.color.set(accentColor).multiplyScalar(0.8);
    const rec = { mesh, variant: STREAM_VARIANTS[vi], x, y, z, length: STREAM_LENGTH };
    streams.push(rec);
    return rec;
  }

  /* --- Recycling -------------------------------------------------------- */

  function releaseRing(rec) {
    const idx = rings.indexOf(rec);
    if (idx >= 0) rings.splice(idx, 1);
    ringPool.release(rec.g);
  }

  function releaseStream(rec) {
    const idx = streams.indexOf(rec);
    if (idx >= 0) streams.splice(idx, 1);
    streamPool.release(rec.mesh);
  }

  function releaseOrb(i) { orbs.release(i); }

  function reset() {
    orbs.releaseAll();
    for (const r of rings.slice()) releaseRing(r);
    for (const s of streams.slice()) releaseStream(s);
  }

  /* ======================================================================
     Per-frame update + detection
     ====================================================================== */

  const _sp = new THREE.Vector3();
  const events = [];

  /**
   * @param {object} player the player module
   * @param {THREE.Vector3} prev the wisp's position at the *start* of this
   *   frame. Everything below tests the segment prev -> current rather than a
   *   single point, so nothing can be tunnelled through at high speed.
   */
  function update(dt, elapsed, player, prev) {
    events.length = 0;

    const px = player.state.pos.x;
    const py = player.state.pos.y;
    const pz = player.state.pos.z;
    const prevX = prev.x;
    const prevY = prev.y;
    const prevZ = prev.z;
    const dz = prevZ - pz; // positive: distance covered this frame

    orbs.update(dt, elapsed);

    /* --- Orb pickup (swept along the frame's travel) ------------------- */
    for (let i = 0; i < orbs.capacity; i++) {
      if (!orbs.active[i] || orbs.pop[i] > 0) continue;
      const oz = orbs.pz[i];

      // Only consider orbs the wisp actually passed through this frame,
      // with a little slack so slow frames can't skip one.
      if (oz > prevZ + 2 || oz < pz - 2) continue;

      // Where was the wisp when it was level with this orb?
      const t = dz > 0.0001 ? clamp((prevZ - oz) / dz, 0, 1) : 1;
      const sx = lerp(prevX, px, t);
      const sy = lerp(prevY, py, t);

      const r = orbs.big[i] ? ORB_BIG_PICKUP_R : ORB_PICKUP_R;
      const bob = Math.sin(elapsed * 1.9 + orbs.phase[i]) * 0.42;
      const dx = orbs.px[i] - sx;
      const dy = (orbs.py[i] + bob) - sy;

      if (dx * dx + dy * dy <= r * r) {
        orbs.startPop(i);
        events.push({
          type: 'orb',
          big: !!orbs.big[i],
          value: orbs.big[i] ? ORB_BIG_VALUE : ORB_VALUE,
          boost: orbs.big[i] ? ORB_BIG_BOOST : ORB_BOOST,
          x: orbs.px[i], y: orbs.py[i] + bob, z: oz,
        });
      }
    }

    /* --- Rings --------------------------------------------------------- */
    for (const r of rings) {
      r.g.rotation.z += r.spin * dt * 0.35;

      if (r.flash > 0) {
        r.flash = Math.max(0, r.flash - dt * 2.4);
        r.g.userData.glowMat.emissiveIntensity = 2.2 + r.flash * 9;
        const s = (r.radius / 7) * (1 + r.flash * 0.10);
        r.g.scale.setScalar(s);
      }

      // The wisp crossed the ring plane this frame.
      if (!r.passed && pz <= r.z) {
        r.passed = true;
        const t = dz > 0.0001 ? clamp((prevZ - r.z) / dz, 0, 1) : 1;
        const sx = lerp(prevX, px, t);
        const sy = lerp(prevY, py, t);
        const dx = sx - r.x;
        const dy = sy - r.y;
        const inside = Math.hypot(dx, dy) <= r.radius * 0.95;
        if (inside) {
          r.flash = 1;
          events.push({ type: 'ring', value: RING_VALUE, boost: RING_BOOST, x: r.x, y: r.y, z: r.z });
        } else {
          events.push({ type: 'ringMiss', x: r.x, y: r.y, z: r.z });
        }
      }
    }

    /* --- Streams: scroll the texture and test riding ------------------- */
    let riding = false;
    let ridingRec = null;

    for (const s of streams) {
      // Scrolling the map offset is what makes the ribbon look like it flows.
      s.mesh.material.map.offset.y -= dt * 0.55;

      const localZ = pz - s.z;                 // 0 at the head, -LENGTH at the tail
      if (localZ > 2 || localZ < -s.length - 2) continue;

      const t = clamp(-localZ / s.length, 0, 1);
      streamPoint(s.variant, t, _sp);
      const dx = px - (s.x + _sp.x);
      const dy = py - (s.y + _sp.y);
      if (dx * dx + dy * dy <= STREAM_RIDE_R * STREAM_RIDE_R) {
        riding = true;
        ridingRec = s;
      }
    }

    if (riding) events.push({ type: 'stream', rec: ridingRec });

    return events;
  }

  function onResize() { orbs.setHaloScale(window.innerHeight); }

  return {
    orbs, rings, streams,
    spawnOrb, spawnRing, spawnStream,
    releaseOrb, releaseRing, releaseStream,
    update, reset, onResize,
    streamPoint,
    get orbCount() { return orbs.count; },
  };
}
