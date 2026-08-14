/**
 * scene.js — the rendering core: renderer, camera, lights, the procedural sky
 * dome, the sun and its lens flare.
 *
 * Everything reflective in AERODRIFT (chrome rings, glass rings, the wisp
 * shell) is lit by an environment map generated at runtime from
 * RoomEnvironment + PMREMGenerator, so there is no .hdr file to load.
 */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { sunTexture, flareRingTexture, streakTexture, bokehTexture } from './textures.js';
import { clamp, lerp } from './utils.js';
import { BASE_PALETTE } from './worlds.js';

/** Direction the sun sits in, shared by the sky shader, key light and flare. */
export const SUN_DIR = new THREE.Vector3(0.34, 0.42, -1).normalize();

const SKY_RADIUS = 1600;

/* ==========================================================================
   Sky dome shaders
   ========================================================================== */

const SKY_VERT = /* glsl */ `
  varying vec3 vDir;
  void main() {
    // The dome is a unit-ish sphere centred on the camera each frame, so the
    // local vertex position doubles as the view direction.
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SKY_FRAG = /* glsl */ `
  uniform vec3  uTop;       // zenith
  uniform vec3  uMid;       // the dominant blue most of the screen sees
  uniform vec3  uHorizon;   // bright pale band right at eye level
  uniform vec3  uGround;    // below the horizon (cloud sea / deep water)
  uniform vec3  uSunColor;
  uniform vec3  uSunDir;
  uniform float uSunGlow;
  varying vec3  vDir;

  void main() {
    float h = vDir.y; // -1 (straight down) .. +1 (straight up)

    // Above the horizon the pale band has to stay *narrow*. Spreading it
    // across the upper hemisphere is what turns the whole frame into milk —
    // the blue needs to take over within a few degrees of eye level.
    vec3 up = mix(uHorizon, uMid, smoothstep(0.010, 0.115, h));
    up = mix(up, uTop, smoothstep(0.11, 0.72, h));

    // Below it, sink from the same glow into the denser ground tone.
    vec3 dn = mix(uHorizon, uGround, smoothstep(0.0, -0.28, h));

    // Narrow cross-fade keeps a crisp horizon without an aliased hard edge.
    vec3 col = mix(dn, up, smoothstep(-0.014, 0.014, h));

    // Sun halo: a tight core plus two progressively wider skirts. Layering
    // three powers gives the bloomy "backlit haze" of a 2000s sky render
    // without needing an actual light-scattering model.
    float d = max(dot(vDir, normalize(uSunDir)), 0.0);
    float halo = pow(d, 350.0) * 3.2 + pow(d, 30.0) * 0.34 + pow(d, 7.0) * 0.05;
    col += uSunColor * halo * uSunGlow;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ==========================================================================
   Default (Sky biome) palette — world.js overrides this as biomes blend.
   ========================================================================== */

/**
 * The opening palette. Sourced from worlds.js so there is exactly one place
 * that defines what a palette field is — a second copy here drifted out of
 * sync the moment a field was added.
 */
export const DEFAULT_PALETTE = { ...BASE_PALETTE };

/**
 * Base tone-mapping exposure, before the player's Brightness setting and the
 * per-World trim are applied.
 *
 * v1 sat at 0.98 and read as blown out: ACES plus a sky that is already near
 * white at the horizon plus bloom is a lot of light stacked in one place. 0.86
 * keeps the image bright and optimistic — Frutiger Aero is not a moody look —
 * while leaving headroom so the emissive orbs, ring rims and the sun are the
 * things that clip, which is the point of them.
 *
 * Perceived brightness is monitor-dependent and genuinely subjective, so this
 * is only the default: Settings exposes a Brightness slider over it.
 */
export const BASE_EXPOSURE = 0.86;

/* ==========================================================================
   Scene factory
   ========================================================================== */

export function createSceneCore(canvasEl, { pixelRatioCap = 2, antialias = true } = {}) {
  /* --- Renderer ------------------------------------------------------- */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasEl,
    antialias,
    powerPreference: 'high-performance',
    stencil: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, pixelRatioCap));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = BASE_EXPOSURE;

  /* --- Scene + camera -------------------------------------------------- */
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(
    new THREE.Color(DEFAULT_PALETTE.fog),
    DEFAULT_PALETTE.fogNear,
    DEFAULT_PALETTE.fogFar,
  );

  const camera = new THREE.PerspectiveCamera(
    64,
    window.innerWidth / Math.max(1, window.innerHeight),
    0.5,
    SKY_RADIUS * 1.6,
  );
  camera.position.set(0, 3, 14);
  scene.add(camera); // camera has children (flare, bokeh) so it must be in the graph

  /* --- Environment map for chrome + glass ------------------------------ */
  // RoomEnvironment is a tiny scene of emissive boxes; PMREM turns it into a
  // pre-filtered cube map. It gives metals something to reflect and glass
  // something to refract, entirely in code — no external HDR.
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;
  scene.environmentIntensity = DEFAULT_PALETTE.envIntensity;
  pmrem.dispose();

  /* --- Lights ---------------------------------------------------------- */
  const hemi = new THREE.HemisphereLight(
    new THREE.Color(DEFAULT_PALETTE.hemiSky),
    new THREE.Color(DEFAULT_PALETTE.hemiGround),
    DEFAULT_PALETTE.hemiIntensity,
  );
  scene.add(hemi);

  const key = new THREE.DirectionalLight(new THREE.Color('#FFF6DC'), DEFAULT_PALETTE.keyIntensity);
  key.position.copy(SUN_DIR).multiplyScalar(120);
  scene.add(key);

  // Cool rim from behind/below keeps shadowed sides blue rather than grey —
  // no pure black anywhere in the image.
  const rim = new THREE.DirectionalLight(new THREE.Color('#8FD8F2'), 0.24);
  rim.position.set(-60, -30, 70);
  scene.add(rim);

  /* --- Sky dome -------------------------------------------------------- */
  const skyUniforms = {
    uTop: { value: new THREE.Color(DEFAULT_PALETTE.skyTop) },
    uMid: { value: new THREE.Color(DEFAULT_PALETTE.skyMid) },
    uHorizon: { value: new THREE.Color(DEFAULT_PALETTE.skyHorizon) },
    uGround: { value: new THREE.Color(DEFAULT_PALETTE.skyGround) },
    uSunColor: { value: new THREE.Color(DEFAULT_PALETTE.sunColor) },
    uSunDir: { value: SUN_DIR.clone() },
    uSunGlow: { value: DEFAULT_PALETTE.sunGlow },
  };

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(SKY_RADIUS, 32, 20),
    new THREE.ShaderMaterial({
      uniforms: skyUniforms,
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false, // the dome *is* the horizon; fogging it would grey it out
    }),
  );
  sky.renderOrder = -1000;
  sky.frustumCulled = false;
  scene.add(sky);

  /* --- Sun sprite ------------------------------------------------------ */
  const sun = new THREE.Sprite(new THREE.SpriteMaterial({
    map: sunTexture(),
    color: 0xffffff,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    fog: false,
  }));
  sun.scale.setScalar(190);
  sun.renderOrder = -900;
  sun.frustumCulled = false;
  scene.add(sun);

  /* --- Lens flare ------------------------------------------------------ */
  const flare = createFlare(camera);

  /* --- Camera-locked bokeh ------------------------------------------- */
  const bokeh = createBokehField(camera);

  /* ====================================================================== */

  const _sunWorld = new THREE.Vector3();
  const _ndc = new THREE.Vector3();
  const palette = { ...DEFAULT_PALETTE };
  let bokehEnabled = true;

  /**
   * Blend the live sky/fog/light state toward a palette.
   *
   * `mix` below 1 eases every field, not just the colours. That matters at a
   * Portal: strata cross-fade smoothly over hundreds of metres, but a Portal
   * swaps World in a single frame, and a hard cut in fog distance or light
   * intensity reads as a glitch rather than a transition. main.js drives this
   * with a frame-rate independent factor so the swap lands as a fast, deliberate
   * wipe instead of a pop.
   */
  function applyPalette(p, mix = 1) {
    if (mix >= 1) {
      skyUniforms.uTop.value.set(p.skyTop);
      skyUniforms.uMid.value.set(p.skyMid);
      skyUniforms.uHorizon.value.set(p.skyHorizon);
      skyUniforms.uGround.value.set(p.skyGround);
      skyUniforms.uSunColor.value.set(p.sunColor);
      scene.fog.color.set(p.fog);
      hemi.color.set(p.hemiSky);
      hemi.groundColor.set(p.hemiGround);

      skyUniforms.uSunGlow.value = p.sunGlow;
      scene.fog.near = p.fogNear;
      scene.fog.far = p.fogFar;
      hemi.intensity = p.hemiIntensity;
      key.intensity = p.keyIntensity;
      scene.environmentIntensity = p.envIntensity;
      worldExposure = p.exposure ?? 1;
    } else {
      skyUniforms.uTop.value.lerp(_c(p.skyTop), mix);
      skyUniforms.uMid.value.lerp(_c(p.skyMid), mix);
      skyUniforms.uHorizon.value.lerp(_c(p.skyHorizon), mix);
      skyUniforms.uGround.value.lerp(_c(p.skyGround), mix);
      skyUniforms.uSunColor.value.lerp(_c(p.sunColor), mix);
      scene.fog.color.lerp(_c(p.fog), mix);
      hemi.color.lerp(_c(p.hemiSky), mix);
      hemi.groundColor.lerp(_c(p.hemiGround), mix);

      skyUniforms.uSunGlow.value = lerp(skyUniforms.uSunGlow.value, p.sunGlow, mix);
      scene.fog.near = lerp(scene.fog.near, p.fogNear, mix);
      scene.fog.far = lerp(scene.fog.far, p.fogFar, mix);
      hemi.intensity = lerp(hemi.intensity, p.hemiIntensity, mix);
      key.intensity = lerp(key.intensity, p.keyIntensity, mix);
      scene.environmentIntensity = lerp(scene.environmentIntensity, p.envIntensity, mix);
      worldExposure = lerp(worldExposure, p.exposure ?? 1, mix);
    }
    applyExposure();
    Object.assign(palette, p);
  }

  /* --- Exposure ---------------------------------------------------------
     Two independent factors: the player's Brightness setting, and a per-World
     trim (Aurora Reach lifts a little, Crystal Atrium and Solar Bloom pull
     back). Kept separate so a World can never override what the player chose,
     only nudge around it. */
  let userExposure = 1;
  let worldExposure = 1;

  function applyExposure() {
    renderer.toneMappingExposure = BASE_EXPOSURE * userExposure * worldExposure;
  }

  /** Settings slider, 0.6..1.4 of the tuned default. */
  function setExposure(scale) {
    userExposure = clamp(scale, 0.5, 1.6);
    applyExposure();
  }

  const _tmpColor = new THREE.Color();
  function _c(hex) { return _tmpColor.set(hex); }

  /** Per-frame: keep sky/sun locked to the camera and drive the flare. */
  function update(dt, elapsed) {
    // The dome and sun ride with the camera so they read as infinitely far.
    sky.position.copy(camera.position);
    _sunWorld.copy(SUN_DIR).multiplyScalar(SKY_RADIUS * 0.7).add(camera.position);
    sun.position.copy(_sunWorld);

    updateFlare(flare, camera, _sunWorld, _ndc);
    if (bokehEnabled) updateBokeh(bokeh, elapsed);
  }

  function resize() {
    const w = window.innerWidth;
    const h = Math.max(1, window.innerHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  function setPixelRatioCap(cap) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cap));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  }

  function setBokehEnabled(on) {
    bokehEnabled = on;
    bokeh.group.visible = on;
  }

  function dispose() {
    envRT.dispose();
    sky.geometry.dispose();
    sky.material.dispose();
    renderer.dispose();
  }

  return {
    renderer, scene, camera, sky, sun, hemi, key, rim, palette,
    applyPalette, setExposure, update, resize, setPixelRatioCap, setBokehEnabled, dispose,
    get exposure() { return renderer.toneMappingExposure; },
  };
}

/* ==========================================================================
   Lens flare
   ==========================================================================
   Ghosts are sprites parented to the camera and repositioned in *camera
   space* every frame, mirrored through screen centre from the sun's projected
   position. depthTest is off so they always sit on top of the scene, which is
   exactly how a real lens artefact behaves.
   ========================================================================== */

function createFlare(camera) {
  const group = new THREE.Group();
  group.frustumCulled = false;
  camera.add(group);

  const ghostSpecs = [
    { k: -0.22, size: 0.34, color: '#FFE985', tex: 'ring', op: 0.34 },
    { k: 0.28, size: 0.20, color: '#C9A9F0', tex: 'ring', op: 0.30 },
    { k: 0.52, size: 0.42, color: '#8CD867', tex: 'ring', op: 0.20 },
    { k: 0.78, size: 0.26, color: '#4FC3E8', tex: 'glow', op: 0.30 },
    { k: 1.08, size: 0.58, color: '#FFD24C', tex: 'ring', op: 0.16 },
    { k: 1.42, size: 0.30, color: '#C9A9F0', tex: 'glow', op: 0.18 },
  ];

  const ghosts = ghostSpecs.map((spec) => {
    const map = spec.tex === 'ring' ? flareRingTexture(spec.color) : bokehTexture(spec.color);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map,
      color: new THREE.Color(spec.color),
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      opacity: 0,
      fog: false,
    }));
    sprite.frustumCulled = false;
    sprite.renderOrder = 4000;
    group.add(sprite);
    return { sprite, spec };
  });

  // Wide anamorphic streak sitting directly on the sun.
  const streak = new THREE.Sprite(new THREE.SpriteMaterial({
    map: streakTexture('#FFE985'),
    color: new THREE.Color('#FFF3C4'),
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    opacity: 0,
    fog: false,
  }));
  streak.frustumCulled = false;
  streak.renderOrder = 4001;
  group.add(streak);

  return { group, ghosts, streak };
}

function updateFlare(flare, camera, sunWorld, ndc) {
  ndc.copy(sunWorld).project(camera);

  // project() gives garbage behind the camera; z > 1 means the sun is behind us.
  const behind = ndc.z > 1;
  const radial = Math.hypot(ndc.x, ndc.y);
  // Fade the whole flare out as the sun leaves the frame.
  const visibility = behind ? 0 : clamp(1.25 - radial * 0.62, 0, 1);

  if (visibility <= 0.001) {
    for (const { sprite } of flare.ghosts) sprite.material.opacity = 0;
    flare.streak.material.opacity = 0;
    return;
  }

  // Camera-space extents of a plane at distance `dist`.
  const dist = 12;
  const vH = 2 * Math.tan((camera.fov * Math.PI) / 360) * dist;
  const vW = vH * camera.aspect;

  for (const { sprite, spec } of flare.ghosts) {
    sprite.position.set((-ndc.x * spec.k * vW) / 2, (-ndc.y * spec.k * vH) / 2, -dist);
    const s = spec.size * vH * 0.16;
    sprite.scale.set(s, s, 1);
    sprite.material.opacity = spec.op * visibility;
  }

  flare.streak.position.set((ndc.x * vW) / 2, (ndc.y * vH) / 2, -dist);
  flare.streak.scale.set(vW * 0.72, vH * 0.045, 1);
  flare.streak.material.opacity = 0.15 * visibility;
}

/* ==========================================================================
   Camera-locked bokeh
   ==========================================================================
   A handful of translucent discs drifting in front of the lens. They live in
   camera space so they never parallax — they read as dust/condensation on the
   glass, which is a core Frutiger Aero tell.
   ========================================================================== */

function createBokehField(camera) {
  const group = new THREE.Group();
  group.frustumCulled = false;
  camera.add(group);

  const colors = ['#FFFFFF', '#FFE985', '#C9A9F0', '#3FD1C0', '#A9E4F5'];
  const discs = [];

  for (let i = 0; i < 14; i++) {
    const color = colors[i % colors.length];
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: bokehTexture(color),
      color: new THREE.Color(color),
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      opacity: 0.05 + Math.random() * 0.07,
      fog: false,
    }));
    sprite.frustumCulled = false;
    sprite.renderOrder = 3900;
    const size = 0.7 + Math.random() * 2.4;
    sprite.scale.set(size, size, 1);
    group.add(sprite);
    discs.push({
      sprite,
      // Each disc drifts on its own slow lissajous path.
      ax: (Math.random() - 0.5) * 9,
      ay: (Math.random() - 0.5) * 6,
      sx: 0.03 + Math.random() * 0.07,
      sy: 0.02 + Math.random() * 0.06,
      px: Math.random() * Math.PI * 2,
      py: Math.random() * Math.PI * 2,
      z: -6 - Math.random() * 5,
    });
  }
  return { group, discs };
}

function updateBokeh(bokeh, t) {
  for (const d of bokeh.discs) {
    d.sprite.position.set(
      d.ax + Math.sin(t * d.sx + d.px) * 2.2,
      d.ay + Math.cos(t * d.sy + d.py) * 1.6,
      d.z,
    );
  }
}

/* ==========================================================================
   Shared material helpers
   ========================================================================== */

/**
 * Glass: physically transmissive, low roughness, thin-walled, faintly blue.
 * `transmission` is expensive (it forces an extra scene render pass), so the
 * low quality tier swaps in a cheap translucent standard material instead —
 * same silhouette and tint, a fraction of the cost.
 */
export function makeGlassMaterial({ color = '#F2F6F8', cheap = false, opacity = 0.42 } = {}) {
  if (cheap) {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      metalness: 0.1,
      roughness: 0.18,
      transparent: true,
      opacity,
      envMapIntensity: 1.4,
    });
  }
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0,
    roughness: 0.08,
    transmission: 1,
    thickness: 0.5,
    ior: 1.4,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.5,
    transparent: true,
    opacity: 1,
  });
}

/** Chrome: near-white metal that lives or dies by the PMREM environment map. */
export function makeChromeMaterial({ color = '#EAF2F6', roughness = 0.09 } = {}) {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 1,
    roughness,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.6,
  });
}

/** Glossy plastic — the "gel button" look, in 3D. */
export function makeGelMaterial({ color = '#4FC3E8', emissive = '#0B4763', emissiveIntensity = 0.12 } = {}) {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0,
    roughness: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    emissive: new THREE.Color(emissive),
    emissiveIntensity,
    envMapIntensity: 1.1,
  });
}

