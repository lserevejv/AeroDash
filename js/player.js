/**
 * player.js — the Wisp: its geometry, the input layer, the eased flight model
 * and the chase camera that follows it.
 *
 * Movement is rail-based. Z advances automatically every frame from delta
 * time; X and Y are a *target* the player nudges, which the real position
 * eases toward with frame-rate independent damping. Nothing here ever snaps —
 * that easing is the whole feel of the game.
 */

import * as THREE from 'three';
import { clamp, damp, lerp, randRange } from './utils.js';
import { glowTexture, sparkTexture, haloRingTexture, prismDiscTexture } from './textures.js';
import { makeGlassMaterial, makeChromeMaterial } from './scene.js';
import { TRAILS, SKINS, AURAS } from './shop.js';

/* ==========================================================================
   Tuning
   ========================================================================== */

/** The bounded flight corridor, in world units. */
export const CORRIDOR = { x: 30, yMin: -15, yMax: 18 };

const BASE_SPEED = 52;        // units/second of forward travel
const BOOST_MULT = 1.62;
const STREAM_MULT = 1.34;
const HIT_MULT = 0.54;        // speed floor right after clipping an obstacle

const STEER_LAMBDA = 5.2;     // how eagerly the wisp chases the target point
const KEY_SPEED = 42;         // units/second when steering on the keyboard
const TOUCH_GAIN = 0.085;     // screen px -> world units when dragging

const BOOST_DRAIN = 0.34;     // meter/second while boosting
const BOOST_MIN_TO_FIRE = 0.06;

const DEFAULT_TRAIL = TRAILS.trail_chrome;
const DEFAULT_SKIN = SKINS.skin_dew;

/* ==========================================================================
   Sparkle trail
   ==========================================================================
   A fixed-size ring buffer of points. Particles are never allocated after
   construction — the oldest slot is simply overwritten, which keeps the trail
   allocation-free during flight.
   ========================================================================== */

const TRAIL_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  uniform float uScale;      // renderer height * 0.5, for perspective sizing
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // Perspective sizing, but hard-capped: the wisp outruns its own sparks, so
    // they stream past the camera, and an uncapped 1/z blows a single particle
    // up to fill the screen as it passes.
    gl_PointSize = min(aSize * (uScale / max(0.001, -mv.z)), 54.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const TRAIL_FRAG = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec4 t = texture2D(uMap, gl_PointCoord);
    // uColor is deliberately allowed above 1.0 so the trail lands over the
    // bloom threshold and actually glows.
    gl_FragColor = vec4(uColor * t.rgb, t.a * vAlpha);
  }
`;

class SparkTrail {
  constructor(scene, count, color) {
    this.count = count;
    this.cursor = 0;

    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);

    // Park every particle far below the world until it is first spawned.
    for (let i = 0; i < count; i++) positions[i * 3 + 1] = -9999;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1).setUsage(THREE.DynamicDrawUsage));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6); // never cull

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: sparkTexture('#ffffff') },
        uColor: { value: new THREE.Color(color).multiplyScalar(1.2) },
        uScale: { value: window.innerHeight * 0.5 },
      },
      vertexShader: TRAIL_VERT,
      fragmentShader: TRAIL_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(geo, this.material);
    this.points.frustumCulled = false;
    this.points.renderOrder = 50;
    scene.add(this.points);

    // Parallel CPU-side state; only the GPU attributes above are uploaded.
    this.life = new Float32Array(count);
    this.maxLife = new Float32Array(count);
    this.vel = new Float32Array(count * 3);
    this.baseSize = new Float32Array(count);
    this.emitAcc = 0;
  }

  setColor(hex) { this.material.uniforms.uColor.value.set(hex).multiplyScalar(1.2); }
  setScale(h) { this.material.uniforms.uScale.value = h * 0.5; }

  spawn(x, y, z, energy) {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % this.count;

    const pos = this.points.geometry.attributes.position.array;
    pos[i * 3] = x + randRange(-0.34, 0.34);
    pos[i * 3 + 1] = y + randRange(-0.34, 0.34);
    pos[i * 3 + 2] = z + randRange(-0.2, 0.2);

    this.vel[i * 3] = randRange(-1.6, 1.6);
    this.vel[i * 3 + 1] = randRange(-1.0, 1.8);
    this.vel[i * 3 + 2] = randRange(3, 11) * (0.6 + energy); // drifts backwards

    this.maxLife[i] = randRange(0.38, 0.82);
    this.life[i] = this.maxLife[i];
    this.baseSize[i] = randRange(4, 11) * (0.8 + energy * 0.5);
  }

  update(dt, wisp, energy, emitting) {
    // Emit at a steady rate in *time*, not per frame, so the trail density is
    // identical regardless of framerate.
    if (emitting) {
      const rate = 62 + energy * 90;
      this.emitAcc += dt * rate;
      while (this.emitAcc >= 1) {
        this.emitAcc -= 1;
        this.spawn(wisp.x, wisp.y, wisp.z, energy);
      }
    } else {
      this.emitAcc = 0;
    }

    const pos = this.points.geometry.attributes.position.array;
    const sizes = this.points.geometry.attributes.aSize.array;
    const alphas = this.points.geometry.attributes.aAlpha.array;

    for (let i = 0; i < this.count; i++) {
      if (this.life[i] <= 0) { alphas[i] = 0; continue; }
      this.life[i] -= dt;
      const t = clamp(this.life[i] / this.maxLife[i], 0, 1);

      pos[i * 3] += this.vel[i * 3] * dt;
      pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;

      // Shrink and fade on a curve — linear fades look cheap.
      alphas[i] = t * t;
      sizes[i] = this.baseSize[i] * (0.35 + t * 0.65);
    }

    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.aSize.needsUpdate = true;
    this.points.geometry.attributes.aAlpha.needsUpdate = true;
  }

  clear() {
    const alphas = this.points.geometry.attributes.aAlpha.array;
    for (let i = 0; i < this.count; i++) { this.life[i] = 0; alphas[i] = 0; }
    this.points.geometry.attributes.aAlpha.needsUpdate = true;
  }
}

/* ==========================================================================
   Player factory
   ========================================================================== */

export function createPlayer(sceneCore, { trailCount = 260, cheapGlass = false } = {}) {
  const { scene, camera } = sceneCore;

  /* --- Wisp geometry ---------------------------------------------------
     Every mesh a skin or aura could need is built here, once. Equipping a
     cosmetic only toggles visibility and rewrites scales and colours, so it
     allocates nothing and can be done mid-run without a hitch. */
  const group = new THREE.Group();
  scene.add(group);

  // Hot emissive core. emissiveIntensity above 1 pushes it past the bloom
  // threshold so the orb reads as a genuine light source, not a white ball.
  const coreMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FFFFFF'),
    emissive: new THREE.Color(DEFAULT_TRAIL.core),
    emissiveIntensity: 2.15,
    roughness: 0.3,
    metalness: 0,
  });

  // Two core shapes; a skin picks one. The faceted core catches the
  // environment map in hard planes, which is a completely different read from
  // the smooth bead even though the material is shared.
  const coreSphere = new THREE.Mesh(new THREE.SphereGeometry(0.6, 24, 18), coreMat);
  const coreFacet = new THREE.Mesh(new THREE.IcosahedronGeometry(0.72, 0), coreMat);
  coreFacet.visible = false;
  group.add(coreSphere, coreFacet);

  // Translucent outer shell — the wet, glassy bead look.
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(0.98, 28, 20),
    makeGlassMaterial({ color: DEFAULT_TRAIL.shell, cheap: cheapGlass, opacity: 0.38 }),
  );
  group.add(shell);

  // Spinning chrome halos — pure Aero jewellery.
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.35, 0.055, 12, 48),
    makeChromeMaterial({ roughness: 0.06 }),
  );
  halo.rotation.x = Math.PI * 0.5;
  group.add(halo);

  const halo2 = new THREE.Mesh(
    new THREE.TorusGeometry(1.62, 0.03, 10, 44),
    makeChromeMaterial({ color: '#DCEBF3', roughness: 0.12 }),
  );
  halo2.rotation.set(Math.PI * 0.5, 0.6, 0.3);
  group.add(halo2);

  // Soft additive halo sprite so the wisp glows even against a bright sky.
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture('#ffffff', 2.4),
    color: new THREE.Color(DEFAULT_TRAIL.glow),
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
    opacity: 0.26,
    fog: false,
  }));
  glow.scale.setScalar(2.2);
  group.add(glow);

  // Local light so the wisp actually illuminates nearby clouds and rings.
  const lamp = new THREE.PointLight(new THREE.Color(DEFAULT_TRAIL.glow), 26, 46, 2);
  group.add(lamp);

  /* --- Aura layers ------------------------------------------------------ */
  const auraRing = new THREE.Sprite(new THREE.SpriteMaterial({
    map: haloRingTexture('#FFFFFF'),
    color: new THREE.Color('#CFEFFA'),
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
    opacity: 0,
    fog: false,
  }));
  auraRing.visible = false;
  group.add(auraRing);

  const auraPrism = new THREE.Sprite(new THREE.SpriteMaterial({
    map: prismDiscTexture(),
    color: new THREE.Color('#FFFFFF'),
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
    opacity: 0,
    fog: false,
  }));
  auraPrism.visible = false;
  group.add(auraPrism);

  // Orbiting motes. A dozen sprites is cheaper to reason about than a Points
  // cloud here, because they orbit on fixed analytic paths rather than
  // simulating, and there are never more than AURA_MOTES of them.
  const AURA_MOTES = 12;
  const auraMotes = [];
  for (let i = 0; i < AURA_MOTES; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture('#FFFFFF', 2.2),
      color: new THREE.Color('#FFE985'),
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      opacity: 0,
      fog: false,
    }));
    s.visible = false;
    s.scale.setScalar(0.5);
    group.add(s);
    auraMotes.push({
      sprite: s,
      // Each mote rides its own tilted circle so the swarm never looks like a
      // flat dial spinning in place.
      phase: (i / AURA_MOTES) * Math.PI * 2,
      radius: 1.7 + (i % 3) * 0.42,
      tilt: (i % 4) * 0.5,
      rate: 0.8 + (i % 5) * 0.16,
    });
  }

  const trail = new SparkTrail(scene, trailCount, DEFAULT_TRAIL.trail);

  /* --- State ------------------------------------------------------------ */
  const state = {
    pos: new THREE.Vector3(0, 2, 0),
    target: new THREE.Vector2(0, 2),
    vel: new THREE.Vector2(0, 0),   // smoothed lateral velocity, for banking
    speed: BASE_SPEED,
    boost: 0.35,                    // meter, 0..1
    boosting: false,
    boostHeld: false,
    riding: false,                  // riding a current stream
    hitTimer: 0,                    // seconds of post-collision slowdown left
    invuln: 0,
    distance: 0,
    enabled: false,
  };

  /* --- Equipped cosmetics ------------------------------------------------ */
  let trailDef = DEFAULT_TRAIL;
  let skinDef = DEFAULT_SKIN;
  let auraDef = AURAS.aura_none;
  let activeCore = coreSphere;
  /** Advances only while the trail's palette actually shifts. */
  let shiftPhase = 0;

  const _shiftA = new THREE.Color();
  const _shiftB = new THREE.Color();
  const _shiftOut = new THREE.Color();

  /**
   * Premium trails cycle their palette. The ramp is walked as a loop of pastel
   * stops rather than a hue rotation — a raw hue sweep leaves the Frutiger Aero
   * range almost immediately and lands in saturated primaries.
   */
  function updateShift(dt) {
    const shift = trailDef.shift;
    if (!shift) return;
    shiftPhase += dt * shift.speed;
    const ramp = shift.ramp;
    const t = (shiftPhase % 1 + 1) % 1;
    const scaled = t * ramp.length;
    const i = Math.floor(scaled) % ramp.length;
    const f = scaled - Math.floor(scaled);
    _shiftA.set(ramp[i]);
    _shiftB.set(ramp[(i + 1) % ramp.length]);
    _shiftOut.copy(_shiftA).lerp(_shiftB, f);

    glow.material.color.copy(_shiftOut);
    lamp.color.copy(_shiftOut);
    trail.material.uniforms.uColor.value.copy(_shiftOut).multiplyScalar(1.2);
    auraRing.material.color.copy(_shiftOut);
  }

  /* --- Camera rig ------------------------------------------------------- */
  const camRig = {
    pos: new THREE.Vector3(0, 5, 14),
    look: new THREE.Vector3(0, 2, -20),
    shake: 0,
    bobPhase: 0,
    fov: 64,
  };
  const _lookTarget = new THREE.Vector3();

  /* ======================================================================
     Input
     ====================================================================== */

  const keys = new Set();
  let inputMode = 'pointer';       // 'pointer' | 'key' | 'touch'
  let touchId = null;
  let touchLast = { x: 0, y: 0 };

  function setTargetFromScreen(clientX, clientY) {
    const nx = (clientX / window.innerWidth) * 2 - 1;
    const ny = -((clientY / window.innerHeight) * 2 - 1);
    state.target.x = nx * CORRIDOR.x * 0.94;
    state.target.y = lerp(CORRIDOR.yMin, CORRIDOR.yMax, (ny + 1) * 0.5) * 0.94;
    clampTarget();
  }

  function clampTarget() {
    state.target.x = clamp(state.target.x, -CORRIDOR.x, CORRIDOR.x);
    state.target.y = clamp(state.target.y, CORRIDOR.yMin, CORRIDOR.yMax);
  }

  function onPointerMove(e) {
    if (!state.enabled || e.pointerType === 'touch') return;
    inputMode = 'pointer';
    setTargetFromScreen(e.clientX, e.clientY);
  }

  function onKeyDown(e) {
    // Never swallow the keys the shell needs (F5, devtools, tab...).
    const k = e.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'w', 'a', 's', 'd'].includes(k)) {
      if (state.enabled) e.preventDefault();
    }
    if (k === ' ') { state.boostHeld = true; return; }
    if (!['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(k)) return;
    keys.add(k);
    inputMode = 'key';
  }

  function onKeyUp(e) {
    const k = e.key.toLowerCase();
    if (k === ' ') { state.boostHeld = false; return; }
    keys.delete(k);
  }

  function onTouchStart(e) {
    if (!state.enabled) return;
    const t = e.changedTouches[0];
    // Ignore touches that start on a UI control (boost pad, pause).
    if (t.target && t.target.closest && t.target.closest('button')) return;
    touchId = t.identifier;
    touchLast = { x: t.clientX, y: t.clientY };
    inputMode = 'touch';
  }

  function onTouchMove(e) {
    if (!state.enabled || touchId === null) return;
    for (const t of e.changedTouches) {
      if (t.identifier !== touchId) continue;
      // Relative dragging feels far better than absolute on a phone: the
      // player's thumb never has to cover the point they're aiming at.
      state.target.x += (t.clientX - touchLast.x) * TOUCH_GAIN;
      state.target.y -= (t.clientY - touchLast.y) * TOUCH_GAIN;
      touchLast = { x: t.clientX, y: t.clientY };
      clampTarget();
      e.preventDefault();
    }
  }

  function onTouchEnd(e) {
    for (const t of e.changedTouches) if (t.identifier === touchId) touchId = null;
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: false });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('touchcancel', onTouchEnd, { passive: true });
  // Releasing focus must not leave a key stuck down.
  window.addEventListener('blur', () => { keys.clear(); state.boostHeld = false; });

  /* ======================================================================
     Frame update
     ====================================================================== */

  const _prevTarget = new THREE.Vector2();

  function update(dt, elapsed, mods = {}) {
    /* --- Keyboard steering integrates the target ----------------------- */
    if (keys.size) {
      const kx = (keys.has('arrowright') || keys.has('d') ? 1 : 0) - (keys.has('arrowleft') || keys.has('a') ? 1 : 0);
      const ky = (keys.has('arrowup') || keys.has('w') ? 1 : 0) - (keys.has('arrowdown') || keys.has('s') ? 1 : 0);
      if (kx || ky) {
        inputMode = 'key';
        // Normalise so diagonals aren't faster than the cardinals.
        const len = Math.hypot(kx, ky) || 1;
        state.target.x += (kx / len) * KEY_SPEED * dt;
        state.target.y += (ky / len) * KEY_SPEED * dt;
        clampTarget();
      }
    }

    /* --- Boost --------------------------------------------------------- */
    const wantBoost = state.boostHeld && state.boost > BOOST_MIN_TO_FIRE;
    state.boosting = wantBoost;
    if (state.boosting) {
      // The Boost Efficiency upgrade slows the drain (mods.boostDrain <= 1).
      state.boost = clamp(state.boost - BOOST_DRAIN * (mods.boostDrain ?? 1) * dt, 0, 1);
    }

    /* --- Speed --------------------------------------------------------- */
    state.hitTimer = Math.max(0, state.hitTimer - dt);
    state.invuln = Math.max(0, state.invuln - dt);

    let targetSpeed = BASE_SPEED;
    if (state.boosting) targetSpeed *= BOOST_MULT;
    if (state.riding) targetSpeed *= STREAM_MULT;

    // A gentle ramp so later stretches of a run feel quicker.
    targetSpeed *= 1 + Math.min(0.22, state.distance / 26000);
    if (state.hitTimer > 0) targetSpeed *= HIT_MULT;
    if (mods.speedScale) targetSpeed *= mods.speedScale;

    // Losing speed on a knock should bite immediately; regaining it eases in.
    const speedLambda = targetSpeed < state.speed ? 9 : 2.6;
    state.speed = damp(state.speed, targetSpeed, speedLambda, dt);

    /* --- Position ------------------------------------------------------ */
    _prevTarget.set(state.pos.x, state.pos.y);

    state.pos.z -= state.speed * dt;   // -Z is "forward"
    state.distance += state.speed * dt;

    state.pos.x = damp(state.pos.x, state.target.x, STEER_LAMBDA, dt);
    state.pos.y = damp(state.pos.y, state.target.y, STEER_LAMBDA, dt);

    // Smoothed lateral velocity drives banking; raw per-frame deltas are noisy.
    const instVX = (state.pos.x - _prevTarget.x) / Math.max(dt, 1e-4);
    const instVY = (state.pos.y - _prevTarget.y) / Math.max(dt, 1e-4);
    state.vel.x = damp(state.vel.x, instVX, 9, dt);
    state.vel.y = damp(state.vel.y, instVY, 9, dt);

    group.position.copy(state.pos);

    /* --- Wisp attitude + flourish -------------------------------------- */
    const energy = clamp((state.speed - BASE_SPEED) / (BASE_SPEED * 0.7), 0, 1);

    group.rotation.z = damp(group.rotation.z, clamp(-state.vel.x * 0.022, -0.7, 0.7), 8, dt);
    group.rotation.x = damp(group.rotation.x, clamp(-state.vel.y * 0.012, -0.4, 0.4), 8, dt);

    halo.rotation.z += dt * (1.1 + energy * 2.6);
    halo2.rotation.x += dt * 0.7;
    halo2.rotation.y += dt * (0.9 + energy * 1.8);

    // Breathe the core, and flare it while boosting. The skin sets the rate and
    // the baseline emissive, so a Firefly throbs fast and hot while a Chrome
    // Bead barely glows at all.
    const pulse = 1 + Math.sin(elapsed * skinDef.pulse) * 0.045 + energy * 0.16;
    activeCore.scale.setScalar(pulse * skinDef.coreScale);
    activeCore.rotation.y += dt * 0.9;
    coreMat.emissiveIntensity = skinDef.emissive + energy * 1.9;
    glow.scale.setScalar(2.2 * skinDef.glow * (1 + energy * 0.55) * (1 + Math.sin(elapsed * 2.1) * 0.03));
    glow.material.opacity = (0.24 + energy * 0.2) * skinDef.glow;
    lamp.intensity = 22 + energy * 26;
    // Flash the shell briefly after a knock so contact always registers.
    const shellBase = cheapGlass ? 0.38 * skinDef.shellOpacity : Math.min(1, skinDef.shellOpacity);
    shell.material.opacity = state.invuln > 0 ? 0.62 : shellBase;

    // Zero shield left: pulse the whole wisp so the danger state is impossible
    // to miss even with the HUD out of the corner of your eye.
    if (mods.exposed) {
      const warn = 0.5 + Math.sin(elapsed * 7.5) * 0.5;
      coreMat.emissiveIntensity += warn * 1.6;
      glow.material.opacity += warn * 0.22;
    }

    updateShift(dt);
    updateAura(dt, elapsed, energy);

    trail.update(dt, state.pos, energy, true);

    /* --- Chase camera --------------------------------------------------- */
    updateCamera(dt, elapsed, energy);

    return energy;
  }

  function updateCamera(dt, elapsed, energy) {
    // Sit behind and slightly above; pull back a touch under boost.
    const back = 13.2 + energy * 2.6;
    const up = 3.0 + energy * 0.5;

    // Different lambdas per axis: Z is stiff (it must keep pace with forward
    // motion) while X/Y lag, which produces the lazy sweeping arc on turns.
    camRig.pos.z = damp(camRig.pos.z, state.pos.z + back, 14, dt);
    camRig.pos.x = damp(camRig.pos.x, state.pos.x * 0.82, 4.0, dt);
    camRig.pos.y = damp(camRig.pos.y, state.pos.y + up, 4.6, dt);

    // Gentle idle bob — the scene should feel buoyant even flying straight.
    camRig.bobPhase += dt * 0.9;
    const bobY = Math.sin(camRig.bobPhase) * 0.26;
    const bobX = Math.cos(camRig.bobPhase * 0.73) * 0.20;

    // Decaying random shake, applied on top of the smoothed rig.
    camRig.shake = Math.max(0, camRig.shake - dt * 1.9);
    const s = camRig.shake * camRig.shake;
    const shakeX = (Math.random() - 0.5) * s * 2.6;
    const shakeY = (Math.random() - 0.5) * s * 2.6;

    camera.position.set(
      camRig.pos.x + bobX + shakeX,
      camRig.pos.y + bobY + shakeY,
      camRig.pos.z,
    );

    // Aim ahead of the wisp, not at it, so the corridor stays framed.
    _lookTarget.set(
      state.pos.x * 0.55 + state.vel.x * 0.05,
      state.pos.y * 0.7 + 1.2 + state.vel.y * 0.03,
      state.pos.z - 26,
    );
    camRig.look.lerp(_lookTarget, 1 - Math.exp(-7 * dt));
    camera.lookAt(camRig.look);
    camera.rotation.z += clamp(-state.vel.x * 0.0016, -0.10, 0.10) + s * 0.05;

    // FOV kick sells acceleration far better than raw speed does.
    const targetFov = 64 + energy * 11;
    camRig.fov = damp(camRig.fov, targetFov, 4, dt);
    if (Math.abs(camera.fov - camRig.fov) > 0.01) {
      camera.fov = camRig.fov;
      camera.updateProjectionMatrix();
    }
  }

  /* ======================================================================
     Public helpers
     ====================================================================== */

  function addBoost(amount) { state.boost = clamp(state.boost + amount, 0, 1); }

  /** Called on obstacle contact: brief slowdown, shake, brief immunity. */
  function knock(strength = 1) {
    if (state.invuln > 0) return false;
    state.hitTimer = 0.85 * strength;
    state.invuln = 1.15;
    state.speed *= 0.72;
    camRig.shake = Math.min(1.15, camRig.shake + 0.62 * strength);
    return true;
  }

  function shake(amount) { camRig.shake = Math.min(1.4, camRig.shake + amount); }

  /* ======================================================================
     Cosmetics
     ====================================================================== */

  /** @param {object} t a trail entry from shop.js (already resolved + owned). */
  function setTrail(t) {
    trailDef = t || DEFAULT_TRAIL;
    coreMat.emissive.set(trailDef.core);
    glow.material.color.set(trailDef.glow);
    lamp.color.set(trailDef.glow);
    shell.material.color.set(trailDef.shell);
    trail.setColor(trailDef.trail);
    auraRing.material.color.set(trailDef.glow);
    shiftPhase = 0;
  }

  /** @param {object} s a skin entry from shop.js. */
  function setSkin(s) {
    skinDef = s || DEFAULT_SKIN;
    const facet = skinDef.core === 'facet';
    coreSphere.visible = !facet;
    coreFacet.visible = facet;
    activeCore = facet ? coreFacet : coreSphere;
    activeCore.scale.setScalar(skinDef.coreScale);

    shell.scale.setScalar(skinDef.shellScale);
    coreMat.metalness = skinDef.metal;
    coreMat.emissiveIntensity = skinDef.emissive;
    coreMat.needsUpdate = true;

    halo.visible = skinDef.halos >= 1;
    halo2.visible = skinDef.halos >= 2;
  }

  /** @param {object} a an aura entry from shop.js. */
  function setAura(a) {
    auraDef = a || AURAS.aura_none;
    const mode = auraDef.mode;
    auraRing.visible = mode === 'halo';
    auraPrism.visible = mode === 'prism';
    const moteCount = mode === 'motes' ? (auraDef.count || 0) : 0;
    for (let i = 0; i < auraMotes.length; i++) {
      const m = auraMotes[i];
      m.sprite.visible = i < moteCount;
      if (i < moteCount) {
        m.sprite.material.color.set(auraDef.color);
        m.sprite.scale.setScalar(0.42 * (auraDef.size || 1));
      }
    }
    if (mode === 'halo') auraRing.material.color.set(auraDef.color);
    if (mode === 'prism') auraPrism.material.color.set(auraDef.color);
  }

  function updateAura(dt, elapsed, energy) {
    switch (auraDef.mode) {
      case 'halo': {
        const t = Math.sin(elapsed * auraDef.speed);
        auraRing.scale.setScalar(auraDef.size * (1 + t * 0.09 + energy * 0.2));
        auraRing.material.opacity = 0.22 + t * 0.07 + energy * 0.14;
        break;
      }
      case 'prism': {
        auraPrism.material.rotation += dt * auraDef.speed;
        auraPrism.scale.setScalar(auraDef.size * (1 + energy * 0.24));
        auraPrism.material.opacity = 0.18 + Math.sin(elapsed * 0.9) * 0.05 + energy * 0.12;
        break;
      }
      case 'motes': {
        for (const m of auraMotes) {
          if (!m.sprite.visible) continue;
          const a = elapsed * auraDef.speed * m.rate + m.phase;
          // Orbit in a circle tipped out of the XY plane, so motes weave in
          // front of and behind the wisp instead of ringing it flatly.
          m.sprite.position.set(
            Math.cos(a) * m.radius,
            Math.sin(a) * m.radius * Math.cos(m.tilt),
            Math.sin(a) * m.radius * Math.sin(m.tilt),
          );
          m.sprite.material.opacity = 0.5 + Math.sin(a * 2) * 0.2 + energy * 0.2;
        }
        break;
      }
      default: break;
    }
  }

  function reset() {
    state.pos.set(0, 2, 0);
    state.target.set(0, 2);
    state.vel.set(0, 0);
    state.speed = BASE_SPEED;
    state.boost = 0.35;
    state.boosting = false;
    state.boostHeld = false;
    state.riding = false;
    state.hitTimer = 0;
    state.invuln = 0;
    state.distance = 0;
    camRig.pos.set(0, 5, 14);
    camRig.look.set(0, 2, -20);
    camRig.shake = 0;
    camRig.fov = 64;
    camera.fov = 64;
    camera.updateProjectionMatrix();
    group.position.copy(state.pos);
    group.rotation.set(0, 0, 0);
    trail.clear();
    keys.clear();
  }

  function setEnabled(on) {
    state.enabled = on;
    if (!on) { keys.clear(); state.boostHeld = false; touchId = null; }
  }

  function onResize() { trail.setScale(window.innerHeight); }

  function dispose() {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('touchcancel', onTouchEnd);
  }

  return {
    group, state, trail, camRig,
    update, reset, knock, shake, addBoost, setEnabled, onResize, dispose,
    setTrail, setSkin, setAura,
    get position() { return state.pos; },
    set boostHeld(v) { state.boostHeld = v; },
    get baseSpeed() { return BASE_SPEED; },
  };
}
