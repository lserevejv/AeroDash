/**
 * postfx.js — the EffectComposer chain and the quality-tier system.
 *
 * Bloom is the single most important visual system in AERODRIFT: it is what
 * turns emissive orbs, ring rims, current streams and the sun into the wet,
 * backlit glow the aesthetic depends on. Without it the scene reads as flat
 * plastic.
 *
 * Chain: RenderPass -> UnrealBloomPass -> OutputPass
 *
 * The OutputPass terminator is not optional. WebGLRenderer only applies tone
 * mapping and the sRGB conversion when it draws to the default framebuffer;
 * rendering into the composer's float target skips both. OutputPass re-applies
 * ACES + sRGB at the very end, after bloom has done its work in linear space —
 * which is also the correct order physically.
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { clamp } from './utils.js';

/* ==========================================================================
   Quality tiers
   ==========================================================================
   One place to describe how heavy the game is allowed to be. Everything
   expensive reads its budget from here: bloom buffer size, device pixel ratio,
   how far ahead the world is built, particle counts, and whether the costly
   transmissive glass material is used at all.
   ========================================================================== */

export const TIERS = {
  low: {
    label: 'Low',
    pixelRatio: 1.0,
    bloomScale: 0.5,
    bloomStrength: 0.48,
    msaa: 0,
    chunksAhead: 4,
    trailCount: 70,
    bubbles: 70,
    cheapGlass: true,
    waterSegments: 40,
    cloudDetail: 0,
    shafts: 3,
    bokeh: false,
  },
  medium: {
    label: 'Medium',
    pixelRatio: 1.5,
    bloomScale: 0.7,
    bloomStrength: 0.55,
    msaa: 0,
    chunksAhead: 5,
    trailCount: 150,
    bubbles: 140,
    cheapGlass: false,
    waterSegments: 72,
    cloudDetail: 1,
    shafts: 6,
    bokeh: true,
  },
  high: {
    label: 'High',
    pixelRatio: 2.0,
    bloomScale: 1.0,
    bloomStrength: 0.62,
    msaa: 4,
    chunksAhead: 7,
    trailCount: 260,
    bubbles: 230,
    cheapGlass: false,
    waterSegments: 112,
    cloudDetail: 2,
    shafts: 9,
    bokeh: true,
  },
};

export const TIER_ORDER = ['low', 'medium', 'high'];

/* ==========================================================================
   Composer
   ========================================================================== */

export function createPostFX(sceneCore, tierName = 'high') {
  const { renderer, scene, camera } = sceneCore;
  let tier = TIERS[tierName] ? tierName : 'high';

  const size = new THREE.Vector2();
  renderer.getSize(size);

  // HalfFloat keeps bloom working on values above 1.0 — an 8-bit target would
  // clip every highlight to white before the bloom pass ever saw it.
  const renderTarget = new THREE.WebGLRenderTarget(size.x, size.y, {
    type: THREE.HalfFloatType,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    samples: TIERS[tier].msaa,
  });

  const composer = new EffectComposer(renderer, renderTarget);
  composer.setPixelRatio(renderer.getPixelRatio());
  composer.setSize(window.innerWidth, window.innerHeight);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Threshold sits just above 1.0 on purpose. The composer's target is linear
  // HDR, and a bright sky can carry a luminance of ~0.85 all on its own — with
  // a lower threshold the *entire frame* blooms and the image turns to white
  // milk. Above 1.0, only things we deliberately made super-bright (emissive
  // orbs, stream ribbons, the sun sprite) glow, which is what actually reads.
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(size.x * TIERS[tier].bloomScale, size.y * TIERS[tier].bloomScale),
    TIERS[tier].bloomStrength, // strength
    0.52,                      // radius — soft, but not a formless smear
    1.02,                      // threshold — only genuine light sources bloom
  );
  composer.addPass(bloomPass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  /** User-facing bloom scale (settings slider), multiplied into the tier base. */
  let bloomUserScale = 1.0;

  function applyBloomStrength() {
    bloomPass.strength = TIERS[tier].bloomStrength * bloomUserScale;
  }

  function setBloomScale(v) {
    bloomUserScale = clamp(v, 0, 2);
    applyBloomStrength();
  }

  function setSize(w, h) {
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(w, h);
    const pr = renderer.getPixelRatio();
    bloomPass.setSize(w * pr * TIERS[tier].bloomScale, h * pr * TIERS[tier].bloomScale);
  }

  /**
   * Swap tiers at runtime. Things that can be changed live (pixel ratio, bloom
   * buffer size) are applied here; things baked at construction (particle
   * counts, chunk distance) are read back out by the systems that own them.
   */
  function setTier(name) {
    if (!TIERS[name] || name === tier) return TIERS[tier];
    tier = name;
    const t = TIERS[tier];
    sceneCore.setPixelRatioCap(t.pixelRatio);
    sceneCore.setBokehEnabled(t.bokeh);
    applyBloomStrength();
    setSize(window.innerWidth, window.innerHeight);
    return t;
  }

  function render() { composer.render(); }

  function dispose() {
    composer.dispose();
    renderTarget.dispose();
  }

  return {
    composer, bloomPass, renderPass,
    render, setSize, setTier, setBloomScale, dispose,
    get tierName() { return tier; },
    get tier() { return TIERS[tier]; },
  };
}

/* ==========================================================================
   Adaptive quality
   ==========================================================================
   Samples framerate in fixed windows and steps the tier down when the game is
   clearly struggling. It only ever steps *down*: hunting up and down across a
   threshold is far more distracting than simply settling at a tier that works.
   ========================================================================== */

export function createFpsWatchdog({ onStepDown, windowSeconds = 3, threshold = 44 }) {
  let acc = 0;
  let frames = 0;
  let badWindows = 0;
  let enabled = true;
  let warmup = 2.5; // ignore the first couple of seconds: shaders are compiling

  function reset() { acc = 0; frames = 0; badWindows = 0; warmup = 2.5; }

  function update(dt) {
    if (!enabled) return;
    if (warmup > 0) { warmup -= dt; return; }

    acc += dt;
    frames++;
    if (acc < windowSeconds) return;

    const fps = frames / acc;
    acc = 0;
    frames = 0;

    if (fps < threshold) {
      badWindows++;
      // Two bad windows in a row, so a single hitch never demotes the player.
      if (badWindows >= 2) {
        badWindows = 0;
        onStepDown(Math.round(fps));
      }
    } else {
      badWindows = 0;
    }
  }

  return {
    update,
    reset,
    setEnabled(v) { enabled = v; if (v) reset(); },
  };
}
