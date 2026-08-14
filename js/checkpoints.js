/**
 * checkpoints.js — the two kinds of gate that give an endless run its shape.
 *
 * CHECKPOINT ARCHES give a run internal structure. v1's only "win" was the
 * distance counter ticking up, which is not a moment. These fire on a rhythm —
 * something every 200 m, something bigger every 800 m, something loud once per
 * World — and each one is a burst, a sting, a number popping up and a payout.
 * They are deliberately *not* a skill test: an arch spans the whole corridor,
 * so it is impossible to miss. They mark progress; the ring gates in
 * collectibles.js are where precision is rewarded.
 *
 * PORTALS close a World and open the next. Unlike an arch, a Portal's aperture
 * is narrower than the corridor, so flying cleanly through it is a real (if
 * gentle) target worth a bonus.
 *
 * A note on what a Portal does and does not decide: the corridor beyond it
 * genuinely belongs to the next World, whether or not the player threaded the
 * aperture. It has to — chunks are generated hundreds of metres ahead and the
 * world they belong to cannot depend on something the player has not done yet.
 * So the Portal is a *threshold* you always cross and a *target* you can hit:
 * miss the aperture and you still fly on into the new World, you simply do not
 * collect the bonus. That is also the only reading consistent with the game's
 * no-punishment rule.
 */

import * as THREE from 'three';
import { clamp, lerp, Pool } from './utils.js';
import { bandTexture, glowTexture, portalTexture, haloRingTexture } from './textures.js';
import { makeGlassMaterial, makeChromeMaterial } from './scene.js';
import { WORLD_LENGTH, PORTAL_LEAD } from './worlds.js';

/* ==========================================================================
   Schedule
   ========================================================================== */

/** A milestone every this many metres inside a World. */
export const MINOR_EVERY = 200;
/** Every fourth one is a Major — a payout plus a permanent run multiplier. */
export const MAJOR_EVERY = 800;

/** How far ahead of the player gates are built. */
const LOOKAHEAD = 950;
/** How far behind before a gate is recycled (must clear the trailing camera). */
const BEHIND = 90;

export const TIERS = {
  minor: { radius: 34, tube: 0.20, bandOpacity: 0.55, glow: 26, label: null, shake: 0 },
  major: { radius: 34, tube: 0.34, bandOpacity: 0.85, glow: 40, label: 'CHECKPOINT', shake: 0.10 },
  epic: { radius: 34, tube: 0.52, bandOpacity: 1.15, glow: 60, label: "WORLD'S EDGE", shake: 0.22 },
};

/** Portal aperture. Narrower than the corridor, so threading it means something. */
const PORTAL_RADIUS = 19;

/**
 * Every milestone inside one World, in ascending local distance.
 * The Epic sits `PORTAL_LEAD` before the Portal so it reads as the herald for
 * it: the run announces the boundary, then you see the Portal coming.
 */
export function milestonesForWorld() {
  const out = [];
  for (let local = MINOR_EVERY; local < WORLD_LENGTH; local += MINOR_EVERY) {
    out.push({ local, tier: local % MAJOR_EVERY === 0 ? 'major' : 'minor' });
  }
  out.push({ local: WORLD_LENGTH - PORTAL_LEAD, tier: 'epic' });
  out.sort((a, b) => a.local - b.local);
  return out;
}

/* ==========================================================================
   Celebration burst
   ==========================================================================
   One shared additive Points cloud, written as a ring buffer. Every gate in the
   game emits into it, so the whole celebration system is a single draw call and
   allocates nothing after construction.
   ========================================================================== */

const BURST_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3  aColor;
  uniform float uScale;
  varying float vAlpha;
  varying vec3  vColor;
  void main() {
    vAlpha = aAlpha;
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = min(aSize * (uScale / max(0.001, -mv.z)), 120.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const BURST_FRAG = /* glsl */ `
  uniform sampler2D uMap;
  varying float vAlpha;
  varying vec3  vColor;
  void main() {
    vec4 t = texture2D(uMap, gl_PointCoord);
    gl_FragColor = vec4(vColor * t.rgb, t.a * vAlpha);
  }
`;

function createBurst(scene, count = 220) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const life = new Float32Array(count);
  const maxLife = new Float32Array(count);
  for (let i = 0; i < count; i++) positions[i * 3 + 1] = -9999;

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uMap: { value: glowTexture('#ffffff', 2.0) },
      uScale: { value: window.innerHeight * 0.5 },
    },
    vertexShader: BURST_VERT,
    fragmentShader: BURST_FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geo, material);
  points.frustumCulled = false;
  points.renderOrder = 60;
  scene.add(points);

  let cursor = 0;
  const _c = new THREE.Color();

  /** Fire `n` particles outward in the gate's plane. */
  function emit(x, y, z, n, color, power = 1) {
    _c.set(color);
    for (let k = 0; k < n; k++) {
      const i = cursor;
      cursor = (cursor + 1) % count;
      const a = (k / n) * Math.PI * 2 + Math.random() * 0.4;
      const speed = (7 + Math.random() * 16) * power;
      positions[i * 3] = x + Math.cos(a) * 1.5;
      positions[i * 3 + 1] = y + Math.sin(a) * 1.5;
      positions[i * 3 + 2] = z + (Math.random() - 0.5) * 2;
      vel[i * 3] = Math.cos(a) * speed;
      vel[i * 3 + 1] = Math.sin(a) * speed;
      // Drift backwards relative to the world so sparks trail behind the gate.
      vel[i * 3 + 2] = 6 + Math.random() * 16;
      maxLife[i] = 0.5 + Math.random() * 0.7;
      life[i] = maxLife[i];
      sizes[i] = (5 + Math.random() * 12) * power;
      colors[i * 3] = _c.r; colors[i * 3 + 1] = _c.g; colors[i * 3 + 2] = _c.b;
    }
  }

  function update(dt) {
    for (let i = 0; i < count; i++) {
      if (life[i] <= 0) { alphas[i] = 0; continue; }
      life[i] -= dt;
      const t = clamp(life[i] / maxLife[i], 0, 1);
      positions[i * 3] += vel[i * 3] * dt;
      positions[i * 3 + 1] += vel[i * 3 + 1] * dt;
      positions[i * 3 + 2] += vel[i * 3 + 2] * dt;
      // Drag, so the burst blooms fast then settles rather than flying flat out.
      const drag = Math.exp(-2.4 * dt);
      vel[i * 3] *= drag;
      vel[i * 3 + 1] *= drag;
      alphas[i] = t * t;
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.aSize.needsUpdate = true;
    geo.attributes.aAlpha.needsUpdate = true;
    geo.attributes.aColor.needsUpdate = true;
  }

  function clear() {
    for (let i = 0; i < count; i++) { life[i] = 0; alphas[i] = 0; }
    geo.attributes.aAlpha.needsUpdate = true;
  }

  return {
    emit,
    update,
    clear,
    setScale(h) { material.uniforms.uScale.value = h * 0.5; },
    dispose() { geo.dispose(); material.dispose(); },
  };
}

/* ==========================================================================
   Gates
   ========================================================================== */

export function createGates(sceneCore, { cheapGlass = false } = {}) {
  const { scene } = sceneCore;

  const burst = createBurst(scene);

  /* --- Shared geometry (built once; every gate is a transform of it) ---- */
  const archGeo = new THREE.TorusGeometry(1, 0.02, 10, 64);
  const bandGeo = new THREE.TorusGeometry(1, 0.05, 8, 72);
  const portalRimGeo = new THREE.TorusGeometry(PORTAL_RADIUS, 1.15, 16, 64);
  const portalChromeGeo = new THREE.TorusGeometry(PORTAL_RADIUS, 0.38, 12, 64);
  const portalDiscGeo = new THREE.CircleGeometry(PORTAL_RADIUS * 0.97, 48);

  /* --- Checkpoint arch pool -------------------------------------------- */
  const archPool = new Pool(
    () => {
      const g = new THREE.Group();

      const arch = new THREE.Mesh(archGeo, makeChromeMaterial({ roughness: 0.07 }));
      g.add(arch);

      // The scrolling energy band is the part bloom grabs and the part that
      // makes an arch legible as "a thing you are about to achieve".
      const bandMat = new THREE.MeshBasicMaterial({
        map: bandTexture('#8CFFF0'),
        color: new THREE.Color('#8CFFF0'),
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: true,
      });
      const band = new THREE.Mesh(bandGeo, bandMat);
      g.add(band);

      const glow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: haloRingTexture('#8CFFF0'),
        color: new THREE.Color('#8CFFF0'),
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        opacity: 0,
        fog: false,
      }));
      glow.renderOrder = 40;
      g.add(glow);

      g.userData = { arch, band, bandMat, glow };
      scene.add(g);
      return g;
    },
    (g) => { g.visible = false; },
  );

  /* --- Portal pool ------------------------------------------------------ */
  const portalPool = new Pool(
    () => {
      const g = new THREE.Group();

      const rim = new THREE.Mesh(portalRimGeo, makeGlassMaterial({
        color: '#EAF8FF', cheap: cheapGlass, opacity: 0.5,
      }));
      g.add(rim);

      const chrome = new THREE.Mesh(portalChromeGeo, makeChromeMaterial({ roughness: 0.05 }));
      chrome.scale.setScalar(1.06);
      g.add(chrome);

      // The aperture itself: an additive swirl that rotates. Bright and open,
      // never dark — a portal must invite, not threaten.
      const discMat = new THREE.MeshBasicMaterial({
        map: portalTexture('#B8F0FF'),
        color: new THREE.Color('#B8F0FF'),
        transparent: true,
        opacity: 0.66,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: false,
      });
      const disc = new THREE.Mesh(portalDiscGeo, discMat);
      g.add(disc);

      const glow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTexture('#ffffff', 1.9),
        color: new THREE.Color('#B8F0FF'),
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        opacity: 0.5,
        fog: false,
      }));
      glow.scale.setScalar(90);
      glow.renderOrder = 39;
      g.add(glow);

      g.userData = { rim, chrome, disc, discMat, glow };
      scene.add(g);
      return g;
    },
    (g) => { g.visible = false; },
  );

  /* --- Live gates -------------------------------------------------------- */
  const gates = [];
  /** Absolute distances already scheduled, so nothing is spawned twice. */
  let scheduledTo = -1;
  const template = milestonesForWorld();
  const events = [];

  function spawnCheckpoint(distance, tier) {
    const t = TIERS[tier];
    const g = archPool.acquire();
    g.visible = true;
    g.position.set(0, 2, -distance);
    g.rotation.set(0, 0, 0);
    g.userData.arch.scale.set(t.radius, t.radius, t.tube / 0.02);
    g.userData.band.scale.set(t.radius * 1.012, t.radius * 1.012, t.tube / 0.05);
    g.userData.glow.scale.setScalar(t.glow);
    g.userData.bandMat.opacity = t.bandOpacity;
    gates.push({
      kind: 'checkpoint', tier, g, distance,
      x: 0, y: 2, z: -distance,
      radius: t.radius, passed: false, flash: 0, scroll: 0,
    });
  }

  function spawnPortal(distance, worldIndex, nextWorld) {
    const g = portalPool.acquire();
    g.visible = true;
    g.position.set(0, 2, -distance);
    g.rotation.set(0, 0, 0);
    gates.push({
      kind: 'portal', g, distance, worldIndex, nextWorld,
      x: 0, y: 2, z: -distance,
      radius: PORTAL_RADIUS, passed: false, flash: 0, spin: 0,
    });
  }

  function release(rec) {
    const i = gates.indexOf(rec);
    if (i >= 0) gates.splice(i, 1);
    if (rec.kind === 'portal') portalPool.release(rec.g);
    else archPool.release(rec.g);
  }

  /**
   * Build every gate between what has already been scheduled and the lookahead
   * horizon. Driven by absolute distance so it stays correct no matter how many
   * chunks a given frame happens to generate.
   */
  function schedule(distance, plan) {
    const horizon = distance + LOOKAHEAD;
    const startWorld = Math.max(0, Math.floor(Math.max(0, scheduledTo) / WORLD_LENGTH));
    const endWorld = Math.floor(horizon / WORLD_LENGTH);

    for (let w = startWorld; w <= endWorld; w++) {
      const base = w * WORLD_LENGTH;
      for (const m of template) {
        const d = base + m.local;
        if (d <= scheduledTo || d > horizon) continue;
        spawnCheckpoint(d, m.tier);
      }
      const portalD = base + WORLD_LENGTH;
      if (portalD > scheduledTo && portalD <= horizon) {
        const next = plan.worldAt(portalD + 1);
        spawnPortal(portalD, w, next.world);
      }
    }
    scheduledTo = Math.max(scheduledTo, horizon);
  }

  /* ======================================================================
     Per-frame
     ====================================================================== */

  function update(dt, elapsed, player, prev, distance, plan, palette) {
    events.length = 0;
    burst.update(dt);
    schedule(distance, plan);

    const px = player.state.pos.x;
    const py = player.state.pos.y;
    const pz = player.state.pos.z;
    const dz = prev.z - pz;

    for (let i = gates.length - 1; i >= 0; i--) {
      const rec = gates[i];

      /* --- Recycle once well behind the trailing camera ---------------- */
      if (pz < rec.z - BEHIND) { release(rec); continue; }

      const ud = rec.g.userData;

      /* --- Proximity fade -----------------------------------------------
         A gate's glow sprite is tens of units across so that it reads from far
         down the corridor. Held at that strength as the wisp arrives, it fills
         the screen and — being additive, above the bloom threshold — whites out
         the whole frame at the exact moment the player most needs to see where
         they are going. Fading the additive layers out on approach keeps the
         gate legible at distance and the frame readable at contact. */
      const near = clamp((pz - rec.z) / 90, 0, 1);
      const prox = 0.12 + 0.88 * near;

      if (rec.kind === 'checkpoint') {
        // Scroll the energy band so the arch's light runs around it.
        rec.scroll -= dt * 0.35;
        ud.bandMat.map.offset.x = rec.scroll;

        if (rec.flash > 0) {
          rec.flash = Math.max(0, rec.flash - dt * 1.8);
          ud.glow.material.opacity = rec.flash * 0.85 * prox;
          ud.bandMat.opacity = TIERS[rec.tier].bandOpacity * (1 + rec.flash * 2.4);
          ud.glow.scale.setScalar(TIERS[rec.tier].glow * (1 + rec.flash * 0.7));
        } else {
          // Idle shimmer keeps the gate alive on approach.
          ud.glow.material.opacity = (0.10 + Math.sin(elapsed * 1.6 + rec.distance) * 0.04) * prox;
        }

        ud.bandMat.color.set(palette.gateColor);
        ud.glow.material.color.set(palette.gateColor);

        if (!rec.passed && pz <= rec.z) {
          rec.passed = true;
          rec.flash = 1;
          const n = rec.tier === 'epic' ? 96 : rec.tier === 'major' ? 54 : 22;
          const power = rec.tier === 'epic' ? 1.9 : rec.tier === 'major' ? 1.3 : 0.85;
          burst.emit(rec.x, rec.y, rec.z, n, palette.gateColor, power);
          events.push({
            type: 'checkpoint',
            tier: rec.tier,
            distance: rec.distance,
            x: rec.x, y: rec.y, z: rec.z,
            shake: TIERS[rec.tier].shake,
            label: TIERS[rec.tier].label,
          });
        }
      } else {
        /* --- Portal ---------------------------------------------------- */
        rec.spin += dt * 0.22;
        ud.disc.rotation.z = rec.spin;
        ud.discMat.map.offset.x = rec.spin * 0.1;
        ud.discMat.color.set(palette.gateColor);
        ud.glow.material.color.set(palette.gateColor);
        ud.glow.material.opacity = (0.34 + Math.sin(elapsed * 1.1) * 0.08 + rec.flash * 0.6) * prox;
        // The aperture itself dims as you enter it, so crossing reads as flying
        // *through* light rather than into a wall of it.
        ud.discMat.opacity = 0.66 * (0.10 + 0.90 * near);

        if (rec.flash > 0) {
          rec.flash = Math.max(0, rec.flash - dt * 1.4);
          ud.disc.scale.setScalar(1 + rec.flash * 0.22);
        }

        if (!rec.passed && pz <= rec.z) {
          rec.passed = true;
          rec.flash = 1;
          // Where was the wisp when it crossed the portal plane?
          const t = dz > 0.0001 ? clamp((prev.z - rec.z) / dz, 0, 1) : 1;
          const sx = lerp(prev.x, px, t);
          const sy = lerp(prev.y, py, t);
          const through = Math.hypot(sx - rec.x, sy - rec.y) <= rec.radius * 0.96;
          burst.emit(rec.x, rec.y, rec.z, through ? 130 : 44, palette.gateColor, through ? 2.2 : 1.0);
          events.push({
            type: 'portal',
            through,
            worldIndex: rec.worldIndex,
            nextWorld: rec.nextWorld,
            distance: rec.distance,
            x: rec.x, y: rec.y, z: rec.z,
          });
        }
      }
    }

    return events;
  }

  function reset() {
    for (const rec of gates.slice()) release(rec);
    burst.clear();
    scheduledTo = -1;
  }

  function onResize() { burst.setScale(window.innerHeight); }

  return {
    update, reset, onResize, gates, burst,
    get count() { return gates.length; },
  };
}
