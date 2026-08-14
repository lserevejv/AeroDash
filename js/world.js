/**
 * world.js — chunked corridor generation, object recycling, and the shared
 * environment layers (reflective surface, motes, veils).
 *
 * CHUNK POOLING
 * -------------
 * The corridor is divided into fixed-length chunks along Z. Only the chunks
 * between the wisp and the draw distance exist; as the wisp advances, chunks it
 * has passed are torn down and their contents returned to the per-type pools,
 * and a fresh chunk is generated at the far end. Nothing is allocated
 * mid-flight: "generating" a chunk means claiming already-built meshes and
 * instance slots and moving them into place.
 *
 * SEEDED GENERATION
 * -----------------
 * Every chunk derives its own generator from `hash2(runSeed, chunkIndex)`
 * rather than drawing from one shared stream. That matters because chunk
 * building is driven by framerate — a slow frame builds two chunks where a fast
 * one builds none — so a single stream would be consumed in a different order
 * on every machine and the "same seed, same world" promise would quietly fail.
 * Per-chunk seeding makes chunk N identical no matter when it was built.
 *
 * WORLDS
 * ------
 * All the "what does it look like here" logic lives in worlds.js as pure
 * functions of distance. This module asks the plan what the palette, the
 * surface level and the hazard style are at a given distance, and builds
 * accordingly. It knows nothing about any specific World.
 */

import * as THREE from 'three';
import { clamp, lerp } from './utils.js';
import { Rng, hash2 } from './prng.js';
import { causticTexture, shaftTexture, auroraTexture, glowTexture } from './textures.js';
import { CORRIDOR } from './player.js';
import { STYLES } from './obstacles.js';
import { WORLD_LENGTH, conditionFor, applyCondition } from './worlds.js';

/* ==========================================================================
   Layout constants
   ========================================================================== */

export const CHUNK_LENGTH = 140;
const SURFACE_Y = -26;

/** Clear space either side of a Portal, so the approach is never cluttered. */
const PORTAL_CLEARANCE = 70;

/* ==========================================================================
   Reflective surface
   ==========================================================================
   One plane covers every World's ocean, mirror flood and glass floor. What
   changes per World is: how *present* it is (a lookup texture sampled along the
   corridor), and a handful of scalar uniforms for swell, caustics and specular
   hardness.

   The presence lookup replaced v1's hand-mirrored GLSL copy of waterAmount().
   With an arbitrary sequence of Worlds there is no longer a closed form to
   mirror, so world.js samples worlds.js into a 256-entry ramp each frame and
   the shader reads that. The plane still fades in at exactly the world position
   where the palette changes, which is why you can see an ocean coming from far
   down the corridor instead of watching it pop in around you.
   ========================================================================== */

const SURFACE_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uWave;
  uniform sampler2D uAmtLut;
  uniform float uLutStart;
  uniform float uLutSpan;

  varying vec3  vWorldPos;
  varying vec3  vNrm;
  varying float vAmt;

  // One directional sine, returning its height and accumulating its XZ gradient
  // so the normal is derived analytically rather than from neighbour samples.
  float wave(vec2 p, vec2 dir, float len, float speed, float amp, inout vec2 grad) {
    float k = 6.2831853 / len;
    float f = dot(dir, p) * k + uTime * speed;
    grad += dir * (k * amp * cos(f));
    return amp * sin(f);
  }

  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);

    // Wave phase is driven by *world* XZ, so the surface stays put in the world
    // as the plane is dragged along behind the player. Local UVs would make the
    // whole ocean swim forward with the camera.
    vec2 p = wp.xz;
    vec2 grad = vec2(0.0);
    float h = 0.0;
    h += wave(p, normalize(vec2(1.0, 0.28)),  62.0, 1.15, 1.15 * uWave, grad);
    h += wave(p, normalize(vec2(-0.55, 1.0)), 34.0, 1.65, 0.62 * uWave, grad);
    h += wave(p, normalize(vec2(0.35, -0.85)), 21.0, 2.30, 0.28 * uWave, grad);
    wp.y += h;

    vWorldPos = wp.xyz;
    vNrm = normalize(vec3(-grad.x, 1.0, -grad.y));

    // Distance travelled is -z, because the wisp flies toward negative Z.
    float u = clamp((-wp.z - uLutStart) / uLutSpan, 0.0, 1.0);
    vAmt = texture2D(uAmtLut, vec2(u, 0.5)).r;

    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const SURFACE_FRAG = /* glsl */ `
  uniform vec3  uDeep;
  uniform vec3  uShallow;
  uniform vec3  uSkyTint;
  uniform vec3  uSunColor;
  uniform vec3  uSunDir;
  uniform vec3  uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uTime;
  uniform float uFresnel;
  uniform float uSpec;
  uniform float uCaustic;
  uniform sampler2D uCausticMap;

  varying vec3  vWorldPos;
  varying vec3  vNrm;
  varying float vAmt;

  void main() {
    if (vAmt <= 0.003) discard;

    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 N = normalize(vNrm);

    // Schlick-ish Fresnel: glancing angles mirror the sky, steep angles show
    // the body colour. This one term is most of what makes water read as water,
    // and raising the exponent is what turns an ocean into a mirror floor.
    float fres = pow(1.0 - max(dot(N, V), 0.0), uFresnel);
    fres = mix(0.04, 0.86, fres);

    vec3 body = mix(uDeep, uShallow, clamp(N.y * 0.55 + 0.15, 0.0, 1.0));
    vec3 col = mix(body, uSkyTint, fres);

    // Tight specular glint off the sun.
    //
    // Clamped, and deliberately so. The wave normals spread this highlight over
    // a wide band of the surface, and every pixel of that band sits above the
    // bloom threshold — unclamped it becomes one enormous white smear across
    // the horizon that swallows the orbs and gates in front of it. Capping the
    // term keeps a bright, wet glint without letting it take the frame.
    vec3 H = normalize(normalize(uSunDir) + V);
    float glint = pow(max(dot(N, H), 0.0), 320.0) * uSpec;
    col += uSunColor * min(glint, 1.6);

    // Two counter-scrolling caustic samples multiplied together — the product
    // gives moving cells rather than two obvious sliding layers.
    if (uCaustic > 0.001) {
      vec2 cuv = vWorldPos.xz * 0.011;
      float c1 = texture2D(uCausticMap, cuv + vec2(uTime * 0.011, uTime * 0.007)).r;
      float c2 = texture2D(uCausticMap, cuv * 1.7 - vec2(uTime * 0.008, uTime * 0.013)).r;
      col += uShallow * (c1 * c2) * 0.45 * uCaustic;
    }

    // Manual linear fog: this is a ShaderMaterial, so three's fog chunks are
    // not wired in and the surface must match the scene fog by hand.
    float d = length(cameraPosition - vWorldPos);
    float f = clamp((d - uFogNear) / max(1.0, uFogFar - uFogNear), 0.0, 1.0);
    col = mix(col, uFogColor, f);

    gl_FragColor = vec4(col, vAmt * (1.0 - f * 0.35));
  }
`;

const LUT_SIZE = 256;
const LUT_BEHIND = 400;
const LUT_SPAN = 2200;

/* ==========================================================================
   World factory
   ========================================================================== */

export function createWorld(sceneCore, collect, obstacles, opts = {}) {
  const { scene } = sceneCore;
  const {
    chunksAhead = 7,
    moteCount = 230,
    veilCount = 9,
    surfaceSegments = 112,
  } = opts;

  /* --- Surface ----------------------------------------------------------- */
  const surfaceGeo = new THREE.PlaneGeometry(1900, 1500, surfaceSegments, surfaceSegments);
  surfaceGeo.rotateX(-Math.PI / 2);

  // R8 rather than a float texture: one byte of precision is plenty for a 0..1
  // presence ramp, and R8 filters linearly everywhere without an extension.
  const lutData = new Uint8Array(LUT_SIZE);
  const lutTex = new THREE.DataTexture(lutData, LUT_SIZE, 1, THREE.RedFormat, THREE.UnsignedByteType);
  lutTex.minFilter = THREE.LinearFilter;
  lutTex.magFilter = THREE.LinearFilter;
  lutTex.wrapS = THREE.ClampToEdgeWrapping;
  lutTex.wrapT = THREE.ClampToEdgeWrapping;
  lutTex.needsUpdate = true;

  const surfaceMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uWave: { value: 1 },
      uAmtLut: { value: lutTex },
      uLutStart: { value: 0 },
      uLutSpan: { value: LUT_SPAN },
      uDeep: { value: new THREE.Color('#07515A') },
      uShallow: { value: new THREE.Color('#3FD1C0') },
      uSkyTint: { value: new THREE.Color('#22A8BC') },
      uSunColor: { value: new THREE.Color('#FFFFFF') },
      uSunDir: { value: new THREE.Vector3(0.34, 0.42, -1).normalize() },
      uFogColor: { value: new THREE.Color('#8FE0DC') },
      uFogNear: { value: 150 },
      uFogFar: { value: 780 },
      uFresnel: { value: 3.4 },
      uSpec: { value: 3.0 },
      uCaustic: { value: 1.0 },
      uCausticMap: { value: causticTexture() },
    },
    vertexShader: SURFACE_VERT,
    fragmentShader: SURFACE_FRAG,
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
  });

  const surface = new THREE.Mesh(surfaceGeo, surfaceMat);
  surface.frustumCulled = false;
  surface.renderOrder = -50;
  surface.position.y = SURFACE_Y;
  scene.add(surface);

  /* --- Ambient layers ---------------------------------------------------- */
  const motes = createMotes(scene, moteCount);
  const veils = createVeils(scene, veilCount);

  /* --- Chunk bookkeeping -------------------------------------------------- */
  const chunks = new Map();     // index -> chunk record
  let nextIndex = 0;
  let chunksAheadLive = chunksAhead;
  let runSeed = 1;
  let plan = null;
  let currentCondition = null;
  /** Metres over which one World's weather hands over to the next. */
  const CONDITION_FADE = 180;

  /* ======================================================================
     Chunk generation
     ====================================================================== */

  /** 0 at the start of a run, 1 once fully ramped. Loops keep pushing it. */
  function difficultyAt(distance, loop) {
    return clamp(distance / 6000, 0, 1) + loop * 0.35;
  }

  /** True if `z` sits in the protected space around a Portal. */
  function nearPortal(distance) {
    const into = distance % WORLD_LENGTH;
    return into < PORTAL_CLEARANCE || into > WORLD_LENGTH - PORTAL_CLEARANCE;
  }

  function generateChunk(index) {
    // Per-chunk generator: chunk N is identical regardless of build order.
    const rng = new Rng(hash2(runSeed, index + 1));

    const zStart = -index * CHUNK_LENGTH;
    const zEnd = zStart - CHUNK_LENGTH;
    const dist = index * CHUNK_LENGTH;
    const centre = dist + CHUNK_LENGTH * 0.5;

    const where = plan.worldAt(centre);
    const st = plan.stratumAt(centre);
    const pal = st.palette;
    const diff = difficultyAt(dist, where.loop);

    const chunk = { index, zStart, zEnd, orbs: [], rings: [], streams: [], obstacles: [] };

    /* --- Collectible formations ---------------------------------------- */
    // The first couple of chunks stay clear so the player can settle in.
    const formations = index < 2 ? 1 : rng.int(1, 2);
    for (let f = 0; f < formations; f++) {
      addFormation(chunk, rng.range(zStart - 12, zEnd + 40), rng);
    }

    /* --- Ring gate ------------------------------------------------------ */
    if (index >= 1 && rng.chance(0.55)) {
      const radius = rng.range(6, 9);
      const x = rng.range(-16, 16);
      const y = rng.range(-6, 10);
      const z = rng.range(zStart - 40, zEnd + 30);
      chunk.rings.push(collect.spawnRing(x, y, z, {
        radius,
        tilt: rng.range(-0.35, 0.35),
        accent: pal.accent,
        rng,
      }));
      // A short lead-in of orbs makes the gate read as an invitation.
      for (let i = 1; i <= 5; i++) {
        const t = i / 6;
        chunk.orbs.push(collect.spawnOrb(
          lerp(x, x * 0.6, t) + Math.sin(t * 3) * 0.6,
          lerp(y, y * 0.7, t),
          z + 26 * t,
          false,
          rng,
        ));
      }
    }

    /* --- Current stream -------------------------------------------------- */
    // Streams span roughly two chunks, so keep them sparse.
    if (index >= 3 && rng.chance(0.2)) {
      chunk.streams.push(collect.spawnStream(
        rng.range(-14, 14),
        rng.range(-4, 8),
        zStart,
        pal.streamColor,
        rng,
      ));
    }

    /* --- Hazards --------------------------------------------------------- */
    const clear = index < 3 || nearPortal(dist) || nearPortal(dist + CHUNK_LENGTH);
    const obstacleCount = clear ? 0 : rng.int(1, Math.round(lerp(2, 5, Math.min(1, diff))) + Math.floor(where.loop));
    for (let i = 0; i < obstacleCount; i++) {
      const rec = obstacles.spawn(
        st.hazard,
        rng.range(-CORRIDOR.x + 4, CORRIDOR.x - 4),
        rng.range(CORRIDOR.yMin + 3, CORRIDOR.yMax - 2),
        rng.range(zStart, zEnd),
        rng.range(0.9, 1.7),
        rng,
      );
      if (rec) chunk.obstacles.push(rec);
    }

    /* --- Decorative set dressing (never collides) ----------------------- */
    addDecor(chunk, st.decor, rng);

    return chunk;

    /* ------------------------------------------------------------------ */

    /** Orb formations. Each writes its orb indices into the chunk. */
    function addFormation(ch, z, r) {
      const kind = r.pick(['line', 'wave', 'arc', 'helix', 'cluster']);
      const cx = r.range(-20, 20);
      const cy = r.range(-8, 12);
      const big = r.chance(0.22);
      const push = (x, y, zz, isBig = false) => {
        const i = collect.spawnOrb(
          clamp(x, -CORRIDOR.x + 2, CORRIDOR.x - 2),
          clamp(y, CORRIDOR.yMin + 2, CORRIDOR.yMax - 2),
          zz,
          isBig,
          r,
        );
        if (i >= 0) ch.orbs.push(i);
      };

      switch (kind) {
        case 'line': {
          const n = r.int(5, 9);
          const drift = r.range(-0.5, 0.5);
          for (let i = 0; i < n; i++) push(cx + i * drift, cy, z - i * 7, big && i === n - 1);
          break;
        }
        case 'wave': {
          const n = r.int(7, 12);
          const amp = r.range(3, 7);
          const freq = r.range(0.5, 1.1);
          for (let i = 0; i < n; i++) push(cx, cy + Math.sin(i * freq) * amp, z - i * 6.5);
          break;
        }
        case 'arc': {
          const n = r.int(6, 10);
          const rad = r.range(6, 11);
          const a0 = r.range(0, Math.PI * 2);
          for (let i = 0; i < n; i++) {
            const a = a0 + (i / n) * Math.PI * 1.1;
            push(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad, z - i * 6);
          }
          break;
        }
        case 'helix': {
          const n = r.int(9, 15);
          const rad = r.range(3.5, 7);
          for (let i = 0; i < n; i++) {
            const a = i * 0.7;
            push(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad, z - i * 5.5);
          }
          break;
        }
        default: { // cluster: a knot of orbs around one big one
          push(cx, cy, z, true);
          const n = r.int(4, 7);
          for (let i = 0; i < n; i++) {
            const a = (i / n) * Math.PI * 2;
            push(cx + Math.cos(a) * 3.4, cy + Math.sin(a) * 3.4, z - r.range(-3, 3));
          }
          break;
        }
      }
    }

    /**
     * Scenery outside the flight corridor. Placement comes from the style's own
     * `place` recipe (obstacles.js), so a new World's scenery is data.
     * Everything here passes collides:false — it frames the corridor and can
     * never surprise the player with a hit they could not see coming.
     */
    function addDecor(ch, styleId, r) {
      const style = STYLES[styleId];
      if (!style || !style.place) return;
      for (const spot of style.place) {
        for (let i = 0; i < spot.count; i++) {
          const x = spot.flank
            ? r.sign() * r.range(spot.flank[0], spot.flank[1])
            : r.range(-spot.spread, spot.spread);
          const rec = obstacles.spawn(
            styleId,
            x,
            r.range(spot.y[0], spot.y[1]),
            r.range(zStart, zEnd),
            r.range(spot.size[0], spot.size[1]),
            r,
            { collides: false },
          );
          if (rec) ch.obstacles.push(rec);
        }
      }
    }
  }

  function releaseChunk(chunk) {
    for (const i of chunk.orbs) collect.releaseOrb(i);
    for (const r of chunk.rings) collect.releaseRing(r);
    for (const s of chunk.streams) collect.releaseStream(s);
    for (const o of chunk.obstacles) obstacles.release(o);
    chunk.orbs.length = 0;
    chunk.rings.length = 0;
    chunk.streams.length = 0;
    chunk.obstacles.length = 0;
  }

  /* ======================================================================
     Per-frame
     ====================================================================== */

  const _paletteOut = {};

  function update(dt, elapsed, playerZ, distance) {
    /* --- Stream chunks in and out -------------------------------------- */
    const currentIndex = Math.max(0, Math.floor(-playerZ / CHUNK_LENGTH));

    const wanted = currentIndex + chunksAheadLive;
    while (nextIndex <= wanted) {
      chunks.set(nextIndex, generateChunk(nextIndex));
      nextIndex++;
    }

    // Retire anything the camera has fully passed. The camera trails the wisp,
    // so the margin has to clear it too or chunks vanish in the rear view.
    for (const [index, chunk] of chunks) {
      if (playerZ < chunk.zEnd - 110) {
        releaseChunk(chunk);
        chunks.delete(index);
      }
    }

    /* --- Palette + condition -------------------------------------------- */
    plan.paletteAt(distance, _paletteOut);

    // Weather is per-World and seeded, and cross-fades across the last stretch
    // before a Portal so it arrives with the new World rather than snapping to
    // it a frame later.
    const wi = Math.floor(Math.max(0, distance) / WORLD_LENGTH);
    const local = Math.max(0, distance) - wi * WORLD_LENGTH;
    currentCondition = conditionFor(runSeed, wi);
    const fadeFrom = WORLD_LENGTH - CONDITION_FADE;
    if (local > fadeFrom) {
      const t = (local - fadeFrom) / CONDITION_FADE;
      applyCondition(_paletteOut, currentCondition, 1 - t);
      applyCondition(_paletteOut, conditionFor(runSeed, wi + 1), t);
    } else {
      applyCondition(_paletteOut, currentCondition, 1);
    }

    const amt = plan.surfaceAmountAt(distance);
    obstacles.applyPalette(_paletteOut);

    /* --- Surface presence ramp ------------------------------------------ */
    // Quantised anchor so the ramp does not shimmer as the player moves.
    const lutStart = Math.floor((distance - LUT_BEHIND) / 16) * 16;
    for (let i = 0; i < LUT_SIZE; i++) {
      const d = lutStart + (i / (LUT_SIZE - 1)) * LUT_SPAN;
      lutData[i] = Math.round(clamp(plan.surfaceAmountAt(d), 0, 1) * 255);
    }
    lutTex.needsUpdate = true;

    const u = surfaceMat.uniforms;
    u.uTime.value = elapsed;
    u.uLutStart.value = lutStart;
    u.uLutSpan.value = LUT_SPAN;
    u.uFogColor.value.set(_paletteOut.fog);
    u.uFogNear.value = _paletteOut.fogNear;
    u.uFogFar.value = _paletteOut.fogFar;
    u.uSkyTint.value.set(_paletteOut.skyMid);
    u.uDeep.value.set(_paletteOut.surfaceDeep);
    u.uShallow.value.set(_paletteOut.surfaceShallow);
    u.uWave.value = _paletteOut.surfaceWave;
    u.uFresnel.value = _paletteOut.surfaceFresnel;
    u.uSpec.value = _paletteOut.surfaceSpec;
    u.uCaustic.value = _paletteOut.surfaceCaustic;

    // Drag the plane along with the wisp; the waves are world-anchored so this
    // is invisible, and it means one modest plane covers an endless ocean.
    surface.position.z = playerZ - 520;
    surface.visible = amt > 0.002 || plan.surfaceAmountAt(distance + 900) > 0.002;

    /* --- Ambient layers -------------------------------------------------- */
    motes.update(dt, elapsed, playerZ, _paletteOut);
    veils.update(dt, elapsed, playerZ, _paletteOut);

    return { palette: _paletteOut, surfaceAmount: amt, condition: currentCondition };
  }

  /**
   * Start a run. The seed and the World plan are fixed for its whole duration —
   * neither may change mid-flight, or chunks already built would disagree with
   * chunks yet to be built.
   */
  function reset(seed, runPlan) {
    if (seed !== undefined) runSeed = seed >>> 0;
    if (runPlan) plan = runPlan;
    for (const chunk of chunks.values()) releaseChunk(chunk);
    chunks.clear();
    nextIndex = 0;
    motes.reset();
    veils.reset();
  }

  function dispose() {
    surfaceGeo.dispose();
    surfaceMat.dispose();
    lutTex.dispose();
    motes.dispose();
    veils.dispose();
  }

  /* --- Live quality knobs ------------------------------------------------ */

  /** Draw distance, in chunks. The single most effective runtime perf dial. */
  function setChunksAhead(n) { chunksAheadLive = Math.max(2, Math.round(n)); }

  /** Scale active particle counts without reallocating the buffers. */
  function setParticleBudget(nMotes, nVeils) {
    motes.setActive(nMotes);
    veils.setActive(nVeils);
  }

  function onResize() { motes.setScale(window.innerHeight); }

  return {
    update, reset, dispose, surface,
    setChunksAhead, setParticleBudget, onResize,
    get chunkCount() { return chunks.size; },
    get seed() { return runSeed; },
    get condition() { return currentCondition; },
  };
}

/* ==========================================================================
   Motes
   ==========================================================================
   One Points cloud recycled around the wisp: bubbles in Skyshore's shore,
   pollen in Verdant Circuit, stardust in Aurora Reach, glass dust in Crystal
   Atrium. Colour, size, opacity and rise speed all come from the blended
   palette, and `rise` may be negative — pollen falls.
   ========================================================================== */

const MOTE_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  uniform float uScale;
  uniform float uSizeScale;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = min(aSize * uSizeScale * (uScale / max(0.001, -mv.z)), 90.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const MOTE_FRAG = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec4 t = texture2D(uMap, gl_PointCoord);
    gl_FragColor = vec4(uColor * t.rgb, t.a * vAlpha);
  }
`;

function createMotes(scene, count) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);
  const wobble = new Float32Array(count);
  const speedJitter = new Float32Array(count);

  for (let i = 0; i < count; i++) positions[i * 3 + 1] = -9999;

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1).setUsage(THREE.DynamicDrawUsage));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      // White texture tinted by uColor: the palette blends continuously, and
      // building a texture per blended colour would leak thousands of them.
      uMap: { value: glowTexture('#FFFFFF', 1.7) },
      uColor: { value: new THREE.Color('#CFF8FF') },
      uScale: { value: window.innerHeight * 0.5 },
      uSizeScale: { value: 1 },
    },
    vertexShader: MOTE_VERT,
    fragmentShader: MOTE_FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geo, material);
  points.frustumCulled = false;
  points.renderOrder = 18;
  scene.add(points);

  let seeded = false;
  // Buffers are allocated once at the maximum; the tier only changes how many
  // are simulated and drawn, so quality can move mid-run for free.
  let activeCount = count;

  function place(i, playerZ, spread) {
    positions[i * 3] = rand(-70, 70);
    positions[i * 3 + 1] = spread ? rand(-24, 20) : rand(-26, 22);
    positions[i * 3 + 2] = playerZ - rand(20, 620);
    sizes[i] = rand(3, 12);
    wobble[i] = Math.random() * Math.PI * 2;
    speedJitter[i] = rand(0.55, 1.6);
  }

  /** Re-seed one mote at whichever vertical edge it should enter from. */
  function recycle(i, playerZ, rise) {
    place(i, playerZ, false);
    positions[i * 3 + 1] = rise >= 0 ? rand(-28, -20) : rand(20, 28);
  }

  function update(dt, elapsed, playerZ, palette) {
    const opacity = palette.moteOpacity;
    points.visible = opacity > 0.01;
    if (!points.visible) { seeded = false; return; }

    material.uniforms.uColor.value.set(palette.moteColor);
    material.uniforms.uSizeScale.value = palette.moteSize;

    const rise = palette.moteRise;

    if (!seeded) {
      for (let i = 0; i < count; i++) place(i, playerZ, true);
      seeded = true;
    }

    for (let i = 0; i < activeCount; i++) {
      positions[i * 3 + 1] += rise * speedJitter[i] * dt;
      positions[i * 3] += Math.sin(elapsed * 1.4 + wobble[i]) * dt * 1.6;

      const y = positions[i * 3 + 1];
      const past = positions[i * 3 + 2] > playerZ + 40;
      const gone = rise >= 0 ? y > 26 : y < -28;
      if (past || gone) recycle(i, playerZ, rise);

      alphas[i] = opacity;
    }

    geo.attributes.position.needsUpdate = true;
    geo.attributes.aSize.needsUpdate = true;
    geo.attributes.aAlpha.needsUpdate = true;
  }

  return {
    update,
    reset() { seeded = false; points.visible = false; },
    setScale(h) { material.uniforms.uScale.value = h * 0.5; },
    setActive(n) {
      activeCount = clamp(Math.round(n), 0, count);
      geo.setDrawRange(0, activeCount);
    },
    dispose() { geo.dispose(); material.dispose(); },
  };
}

/* ==========================================================================
   Veils
   ==========================================================================
   Additive quads drifting alongside the corridor. In a water stratum they are
   near-vertical god-rays; in Aurora Reach they roll almost flat and stretch
   wide into aurora curtains.

   Each veil is two quads — a shaft and a ribbon — cross-faded by how rolled the
   palette's tilt is. Swapping one mesh's texture at a threshold would pop
   mid-transition; cross-fading two costs one extra quad each and is seamless.
   ========================================================================== */

function createVeils(scene, count) {
  const group = new THREE.Group();
  group.frustumCulled = false;
  scene.add(group);

  const geo = new THREE.PlaneGeometry(1, 1);
  const veils = [];

  const makeMat = (map) => new THREE.MeshBasicMaterial({
    map,
    color: new THREE.Color('#FFFFFF'),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    fog: false,
  });

  for (let i = 0; i < count; i++) {
    // Both textures are white and tinted by material.color, for the same reason
    // the motes are: the palette blends continuously.
    const shaftMat = makeMat(shaftTexture('#FFFFFF'));
    const ribbonMat = makeMat(auroraTexture('#FFFFFF'));

    const shaft = new THREE.Mesh(geo, shaftMat);
    const ribbon = new THREE.Mesh(geo, ribbonMat);
    for (const m of [shaft, ribbon]) {
      m.frustumCulled = false;
      m.renderOrder = 12;
      group.add(m);
    }
    veils.push({ shaft, ribbon, shaftMat, ribbonMat, phase: Math.random() * Math.PI * 2, w: 1, h: 1 });
  }

  function place(v, playerZ) {
    v.w = rand(14, 40);
    v.h = rand(90, 160);
    const x = rand(-90, 90);
    const y = rand(6, 30);
    // Never spawn one on top of the camera. A veil is a large additive quad;
    // placed close it fills the frame with flat light instead of reading as a
    // shaft in the distance.
    const z = playerZ - rand(220, 760);
    v.shaft.position.set(x, y, z);
    v.ribbon.position.set(x, y + 26, z);
    v.yaw = rand(-0.5, 0.5);
    v.phase = Math.random() * Math.PI * 2;
  }

  let seeded = false;
  let activeCount = count;

  function update(dt, elapsed, playerZ, palette) {
    const baseOpacity = palette.veilOpacity;
    group.visible = baseOpacity > 0.01;
    if (!group.visible) { seeded = false; return; }

    if (!seeded) {
      for (const v of veils) place(v, playerZ);
      seeded = true;
    }

    // How "aurora curtain" versus "god ray" the current palette is.
    const ribbonness = clamp((Math.abs(palette.veilTilt) - 0.6) / 0.5, 0, 1);

    for (let i = 0; i < veils.length; i++) {
      const v = veils[i];
      const on = i < activeCount;
      v.shaft.visible = on;
      v.ribbon.visible = on;
      if (!on) continue;

      if (v.shaft.position.z > playerZ + 60) place(v, playerZ);

      const flicker = 0.045 + Math.sin(elapsed * 0.5 + v.phase) * 0.022 + 0.028;
      const w = v.w * palette.veilWidth;
      const h = v.h * palette.veilHeight;
      // Fade as the wisp closes on one, for the same reason gates do: a huge
      // additive quad a few units from the lens is just a white screen.
      const near = clamp((playerZ - v.shaft.position.z) / 200, 0, 1);

      v.shaft.scale.set(w, h, 1);
      v.shaft.rotation.set(0, v.yaw, palette.veilTilt);
      v.shaftMat.color.set(palette.veilColor);
      v.shaftMat.opacity = baseOpacity * flicker * (1 - ribbonness) * near;

      // Curtains hang wide and shallow, and sway rather than flicker.
      v.ribbon.scale.set(w * 5.5, h * 0.55, 1);
      v.ribbon.rotation.set(0, v.yaw * 0.3, palette.veilTilt - Math.PI * 0.5);
      v.ribbonMat.color.set(palette.veilColor);
      v.ribbonMat.opacity = baseOpacity * (0.05 + Math.sin(elapsed * 0.33 + v.phase) * 0.028) * ribbonness * near;

      v.shaft.position.x += Math.sin(elapsed * 0.25 + v.phase) * dt * 1.2;
      v.ribbon.position.x = v.shaft.position.x;
      v.ribbon.position.z = v.shaft.position.z;
    }
  }

  return {
    update,
    reset() { seeded = false; group.visible = false; },
    setActive(n) { activeCount = clamp(Math.round(n), 0, count); },
    dispose() {
      geo.dispose();
      for (const v of veils) { v.shaftMat.dispose(); v.ribbonMat.dispose(); }
    },
  };
}

/** Ambient-layer jitter is cosmetic only, so it stays off the seeded stream. */
function rand(min, max) { return min + Math.random() * (max - min); }
