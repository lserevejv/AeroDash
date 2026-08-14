/**
 * world.js — chunked world generation, object recycling and biome switching.
 *
 * CHUNK POOLING
 * -------------
 * The corridor is divided into fixed-length chunks along Z. At any moment only
 * the chunks between the wisp and the draw distance exist; as the wisp advances,
 * chunks that fall behind the camera are torn down and their contents returned
 * to the per-type pools in collectibles.js / obstacles.js, and a fresh chunk is
 * generated at the far end. Nothing is ever allocated mid-flight: "generating" a
 * chunk only means claiming already-built meshes and instance slots and moving
 * them into place. That is what keeps the framerate flat instead of sawtoothing
 * on every GC.
 *
 * BIOMES
 * ------
 * The biome is a pure function of distance travelled, so it needs no state and
 * cannot desync: `waterAmount(distance)` returns 0 in Sky, 1 in Water and a
 * smooth ramp across the boundary. That single number drives the palette blend,
 * the content each chunk spawns, and — evaluated per-vertex in GLSL against the
 * same constants — the water plane's own opacity. Because the plane fades in at
 * exactly the world position where the biome changes, the transition is visible
 * far ahead down the corridor rather than popping in around the player.
 */

import * as THREE from 'three';
import { clamp, lerp, randRange, randInt, chance, pick } from './utils.js';
import { causticTexture, shaftTexture, glowTexture } from './textures.js';
import { CORRIDOR } from './player.js';

/* ==========================================================================
   Layout constants
   ========================================================================== */

export const CHUNK_LENGTH = 140;
export const BIOME_LENGTH = 1600;   // metres of one biome before it changes
export const TRANSITION = 240;      // half-width of the cross-fade at a boundary
export const RUN_DISTANCE = 5000;   // a run ends here — the only end condition

const WATER_Y = -26;

/* ==========================================================================
   Biomes
   ========================================================================== */

export const BIOMES = {
  sky: {
    key: 'sky',
    name: 'Sky',
    accent: '#7FE0D2',
    streamColor: '#8CFFF0',
    palette: {
      skyTop: '#1273B5',
      skyMid: '#40B8E4',
      skyHorizon: '#B8E6F8',
      skyGround: '#4EA6D2',
      fog: '#7FC6E8',
      fogNear: 380,
      fogFar: 1100,
      sunColor: '#FFE985',
      sunGlow: 1.0,
      hemiSky: '#BFE9FA',
      hemiGround: '#6FAEC8',
      hemiIntensity: 0.72,
      keyIntensity: 0.85,
      envIntensity: 1.05,
    },
  },
  water: {
    key: 'water',
    name: 'Water',
    accent: '#3FD1C0',
    streamColor: '#B6FFF0',
    palette: {
      skyTop: '#07688C',
      skyMid: '#22A8BC',
      skyHorizon: '#9FEDE8',
      skyGround: '#0A6B72',
      fog: '#4FC0C4',
      fogNear: 300,
      fogFar: 980,
      sunColor: '#DFFBF4',
      sunGlow: 0.72,
      hemiSky: '#A8F0E8',
      hemiGround: '#0E6E74',
      hemiIntensity: 0.82,
      keyIntensity: 0.72,
      envIntensity: 1.2,
    },
  },
};

/**
 * How "water" the world is at a given distance. 0 = Sky, 1 = Water.
 *
 * Kept deliberately simple and closed-form so the identical curve can be
 * written in GLSL for the water plane (see WATER_FRAG) — if the two ever
 * disagreed, the surface would fade in at a different place from the palette.
 */
export function waterAmount(distance) {
  const cycle = BIOME_LENGTH * 2;
  const p = ((distance % cycle) + cycle) % cycle;
  // Fade in across the Sky->Water boundary at BIOME_LENGTH...
  const a = smooth(BIOME_LENGTH - TRANSITION, BIOME_LENGTH + TRANSITION, p);
  // ...and back out so that it reaches exactly 0 at the end of the cycle,
  // where the next cycle's `a` is also 0. No discontinuity at the wrap.
  const b = 1 - smooth(cycle - TRANSITION * 2, cycle, p);
  return clamp(Math.min(a, b), 0, 1);
}

function smooth(e0, e1, x) {
  const t = clamp((x - e0) / (e1 - e0 || 1), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Blend two palettes; every field is either a colour string or a number. */
const _cA = new THREE.Color();
const _cB = new THREE.Color();
function blendPalettes(a, b, t, out) {
  for (const k of Object.keys(a)) {
    const va = a[k], vb = b[k];
    if (typeof va === 'number') {
      out[k] = lerp(va, vb, t);
    } else {
      _cA.set(va); _cB.set(vb);
      out[k] = `#${_cA.lerp(_cB, t).getHexString()}`;
    }
  }
  return out;
}

/* ==========================================================================
   Water surface shader
   ========================================================================== */

const WATER_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uBiomeLen;
  uniform float uTrans;
  varying vec3  vWorldPos;
  varying vec3  vNrm;
  varying float vAmt;

  // Mirror of waterAmount() in world.js — see the note there.
  float waterAmount(float dist) {
    float cycle = uBiomeLen * 2.0;
    float p = mod(dist, cycle);
    float a = smoothstep(uBiomeLen - uTrans, uBiomeLen + uTrans, p);
    float b = 1.0 - smoothstep(cycle - uTrans * 2.0, cycle, p);
    return clamp(min(a, b), 0.0, 1.0);
  }

  // One directional sine, returning its height and writing its XZ gradient so
  // the normal can be derived analytically instead of from neighbour samples.
  float wave(vec2 p, vec2 dir, float len, float speed, float amp, inout vec2 grad) {
    float k = 6.2831853 / len;
    float f = dot(dir, p) * k + uTime * speed;
    grad += dir * (k * amp * cos(f));
    return amp * sin(f);
  }

  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);

    // Wave phase is driven by *world* XZ, so the surface stays put in the
    // world as the plane is dragged along behind the player. Using local UVs
    // instead makes the whole ocean swim forwards with the camera.
    vec2 p = wp.xz;
    vec2 grad = vec2(0.0);
    float h = 0.0;
    h += wave(p, normalize(vec2(1.0, 0.28)), 62.0, 1.15, 1.15, grad);
    h += wave(p, normalize(vec2(-0.55, 1.0)), 34.0, 1.65, 0.62, grad);
    h += wave(p, normalize(vec2(0.35, -0.85)), 21.0, 2.30, 0.28, grad);
    wp.y += h;

    vWorldPos = wp.xyz;
    vNrm = normalize(vec3(-grad.x, 1.0, -grad.y));
    // Distance travelled is -z, because the wisp flies toward negative Z.
    vAmt = waterAmount(-wp.z);

    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const WATER_FRAG = /* glsl */ `
  uniform vec3  uDeep;
  uniform vec3  uShallow;
  uniform vec3  uSkyTint;
  uniform vec3  uSunColor;
  uniform vec3  uSunDir;
  uniform vec3  uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uTime;
  uniform sampler2D uCaustic;

  varying vec3  vWorldPos;
  varying vec3  vNrm;
  varying float vAmt;

  void main() {
    if (vAmt <= 0.001) discard;

    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 N = normalize(vNrm);

    // Schlick-ish Fresnel: glancing angles mirror the sky, steep angles show
    // the body colour. This one term is most of what makes water read as water.
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.4);
    fres = mix(0.04, 0.82, fres);

    vec3 body = mix(uDeep, uShallow, clamp(N.y * 0.55 + 0.15, 0.0, 1.0));
    vec3 col = mix(body, uSkyTint, fres);

    // Tight specular glint off the sun.
    vec3 H = normalize(normalize(uSunDir) + V);
    col += uSunColor * pow(max(dot(N, H), 0.0), 260.0) * 3.0;

    // Two counter-scrolling caustic samples multiplied together — the product
    // gives moving cells rather than two obvious sliding layers.
    vec2 cuv = vWorldPos.xz * 0.011;
    float c1 = texture2D(uCaustic, cuv + vec2(uTime * 0.011, uTime * 0.007)).r;
    float c2 = texture2D(uCaustic, cuv * 1.7 - vec2(uTime * 0.008, uTime * 0.013)).r;
    col += uShallow * (c1 * c2) * 0.45;

    // Manual linear fog: this is a ShaderMaterial, so three's fog chunks
    // aren't wired in, and the surface must match the scene fog exactly.
    float d = length(cameraPosition - vWorldPos);
    float f = clamp((d - uFogNear) / max(1.0, uFogFar - uFogNear), 0.0, 1.0);
    col = mix(col, uFogColor, f);

    gl_FragColor = vec4(col, vAmt * (1.0 - f * 0.35));
  }
`;

/* ==========================================================================
   World factory
   ========================================================================== */

export function createWorld(sceneCore, collect, obstacles, opts = {}) {
  const { scene } = sceneCore;
  const {
    chunksAhead = 7,
    bubbleCount = 230,
    shaftCount = 9,
    waterSegments = 112,
  } = opts;

  /* --- Water surface ---------------------------------------------------- */
  const waterGeo = new THREE.PlaneGeometry(1900, 1500, waterSegments, waterSegments);
  waterGeo.rotateX(-Math.PI / 2);

  const waterMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uBiomeLen: { value: BIOME_LENGTH },
      uTrans: { value: TRANSITION },
      uDeep: { value: new THREE.Color('#08575F') },
      uShallow: { value: new THREE.Color('#3FD1C0') },
      uSkyTint: { value: new THREE.Color('#22A8BC') },
      uSunColor: { value: new THREE.Color('#FFFFFF') },
      uSunDir: { value: new THREE.Vector3(0.34, 0.42, -1).normalize() },
      uFogColor: { value: new THREE.Color('#8FE0DC') },
      uFogNear: { value: 150 },
      uFogFar: { value: 780 },
      uCaustic: { value: causticTexture() },
    },
    vertexShader: WATER_VERT,
    fragmentShader: WATER_FRAG,
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
  });

  const water = new THREE.Mesh(waterGeo, waterMat);
  water.frustumCulled = false;
  water.renderOrder = -50;
  water.position.y = WATER_Y;
  scene.add(water);

  /* --- Rising bubbles (Water biome) ------------------------------------- */
  const bubbles = createBubbles(scene, bubbleCount);

  /* --- Light shafts (Water biome) --------------------------------------- */
  const shafts = createShafts(scene, shaftCount);

  /* --- Chunk bookkeeping ------------------------------------------------- */
  const chunks = new Map();   // index -> chunk record
  let nextIndex = 0;
  let chunksAheadLive = chunksAhead;
  const palette = { ...BIOMES.sky.palette };

  /* ======================================================================
     Chunk generation
     ====================================================================== */

  function chunkBiome(index) {
    const centre = (index + 0.5) * CHUNK_LENGTH;
    return waterAmount(centre) > 0.5 ? BIOMES.water : BIOMES.sky;
  }

  /** 0 at the start of a run, 1 once fully ramped up. */
  function difficultyAt(distance) { return clamp(distance / 4200, 0, 1); }

  function generateChunk(index) {
    const zStart = -index * CHUNK_LENGTH;
    const zEnd = zStart - CHUNK_LENGTH;
    const biome = chunkBiome(index);
    const dist = index * CHUNK_LENGTH;
    const diff = difficultyAt(dist);

    const chunk = {
      index, zStart, zEnd, biome,
      orbs: [], rings: [], streams: [], obstacles: [],
    };

    /* --- Collectible formations ---------------------------------------- */
    // The first couple of chunks stay clear so the player can settle in.
    const formations = index < 2 ? 1 : randInt(1, 2);
    for (let f = 0; f < formations; f++) {
      const z = randRange(zStart - 12, zEnd + 40);
      addFormation(chunk, z, biome);
    }

    /* --- Ring gate ------------------------------------------------------ */
    if (index >= 1 && chance(0.55)) {
      const radius = randRange(6, 9);
      const x = randRange(-16, 16);
      const y = randRange(-6, 10);
      const z = randRange(zStart - 40, zEnd + 30);
      chunk.rings.push(collect.spawnRing(x, y, z, {
        radius,
        tilt: randRange(-0.35, 0.35),
        accent: biome.accent,
      }));
      // A short lead-in of orbs makes the gate read as an invitation.
      for (let i = 1; i <= 5; i++) {
        const t = i / 6;
        const oz = z + 26 * t;
        chunk.orbs.push(collect.spawnOrb(
          lerp(x, x * 0.6, t) + Math.sin(t * 3) * 0.6,
          lerp(y, y * 0.7, t),
          oz,
        ));
      }
    }

    /* --- Current stream -------------------------------------------------- */
    // Streams span roughly two chunks, so keep them sparse.
    if (index >= 3 && chance(0.2)) {
      chunk.streams.push(collect.spawnStream(
        randRange(-14, 14),
        randRange(-4, 8),
        zStart,
        biome.streamColor,
      ));
    }

    /* --- Obstacles ------------------------------------------------------- */
    const obstacleCount = index < 3 ? 0 : randInt(1, Math.round(lerp(2, 5, diff)));
    for (let i = 0; i < obstacleCount; i++) {
      const x = randRange(-CORRIDOR.x + 4, CORRIDOR.x - 4);
      const y = randRange(CORRIDOR.yMin + 3, CORRIDOR.yMax - 2);
      const z = randRange(zStart, zEnd);
      const size = randRange(0.9, 1.7);
      const rec = biome.key === 'water'
        ? obstacles.spawnCoral(x, y, z, size)
        : obstacles.spawnCloud(x, y, z, size);
      if (rec) chunk.obstacles.push(rec);
    }

    /* --- Decorative set dressing (never collides) ----------------------- */
    addDecor(chunk, biome, index);

    return chunk;
  }

  /** Orb formations. Each writes its orb indices into the chunk for recycling. */
  function addFormation(chunk, z, biome) {
    const kind = pick(['line', 'wave', 'arc', 'helix', 'cluster']);
    const cx = randRange(-20, 20);
    const cy = randRange(-8, 12);
    const big = chance(0.22);
    const push = (x, y, zz, isBig = false) => {
      const i = collect.spawnOrb(
        clamp(x, -CORRIDOR.x + 2, CORRIDOR.x - 2),
        clamp(y, CORRIDOR.yMin + 2, CORRIDOR.yMax - 2),
        zz,
        isBig,
      );
      if (i >= 0) chunk.orbs.push(i);
    };

    switch (kind) {
      case 'line': {
        const n = randInt(5, 9);
        const drift = randRange(-0.5, 0.5);
        for (let i = 0; i < n; i++) push(cx + i * drift, cy, z - i * 7, big && i === n - 1);
        break;
      }
      case 'wave': {
        const n = randInt(7, 12);
        const amp = randRange(3, 7);
        const freq = randRange(0.5, 1.1);
        for (let i = 0; i < n; i++) push(cx, cy + Math.sin(i * freq) * amp, z - i * 6.5);
        break;
      }
      case 'arc': {
        const n = randInt(6, 10);
        const r = randRange(6, 11);
        const a0 = randRange(0, Math.PI * 2);
        for (let i = 0; i < n; i++) {
          const a = a0 + (i / n) * Math.PI * 1.1;
          push(cx + Math.cos(a) * r, cy + Math.sin(a) * r, z - i * 6);
        }
        break;
      }
      case 'helix': {
        const n = randInt(9, 15);
        const r = randRange(3.5, 7);
        for (let i = 0; i < n; i++) {
          const a = i * 0.7;
          push(cx + Math.cos(a) * r, cy + Math.sin(a) * r, z - i * 5.5);
        }
        break;
      }
      default: { // cluster: a knot of orbs around one big one
        push(cx, cy, z, true);
        const n = randInt(4, 7);
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2;
          push(cx + Math.cos(a) * 3.4, cy + Math.sin(a) * 3.4, z - randRange(-3, 3));
        }
        break;
      }
    }
  }

  /**
   * Scenery outside the flight corridor. These use the same instanced fields
   * as the hazards but with collides:false, so they cost nothing extra to draw
   * and can never surprise the player with a hit they couldn't see coming.
   */
  function addDecor(chunk, biome, index) {
    const { zStart, zEnd } = chunk;

    if (biome.key === 'sky') {
      // Flanking cloud banks, kept well clear of the corridor so they frame
      // the flight path instead of filling it.
      for (let i = 0; i < 2; i++) {
        const side = chance(0.5) ? 1 : -1;
        const rec = obstacles.spawnCloud(
          side * randRange(62, 150),
          randRange(-14, 30),
          randRange(zStart, zEnd),
          randRange(2.4, 4.8),
          { collides: false, blobs: 5 },
        );
        if (rec) chunk.obstacles.push(rec);
      }
      // A cloud sea far below, which gives the horizon something to sit on.
      for (let i = 0; i < 1; i++) {
        const rec = obstacles.spawnCloud(
          randRange(-220, 220),
          randRange(-104, -74),
          randRange(zStart, zEnd),
          randRange(4, 8),
          { collides: false, blobs: 5 },
        );
        if (rec) chunk.obstacles.push(rec);
      }
    } else {
      // Coral pillars flanking the corridor, rooted toward the sea floor.
      for (let i = 0; i < 3; i++) {
        const side = chance(0.5) ? 1 : -1;
        const rec = obstacles.spawnCoral(
          side * randRange(40, 110),
          randRange(-24, 4),
          randRange(zStart, zEnd),
          randRange(2.0, 4.2),
          { collides: false },
        );
        if (rec) chunk.obstacles.push(rec);
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

    // Build forward to the draw distance.
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

    /* --- Biome blend ---------------------------------------------------- */
    const amt = waterAmount(distance);
    blendPalettes(BIOMES.sky.palette, BIOMES.water.palette, amt, _paletteOut);

    /* --- Water surface -------------------------------------------------- */
    waterMat.uniforms.uTime.value = elapsed;
    waterMat.uniforms.uFogColor.value.set(_paletteOut.fog);
    waterMat.uniforms.uFogNear.value = _paletteOut.fogNear;
    waterMat.uniforms.uFogFar.value = _paletteOut.fogFar;
    waterMat.uniforms.uSkyTint.value.set(_paletteOut.skyMid);
    // Drag the plane along with the wisp; the waves are world-anchored so this
    // is invisible, and it means one modest plane covers an endless ocean.
    water.position.z = playerZ - 520;
    water.position.x = 0;
    water.visible = amt > 0.001;

    /* --- Particles ------------------------------------------------------ */
    bubbles.update(dt, elapsed, playerZ, amt);
    shafts.update(dt, elapsed, playerZ, amt);

    return { palette: _paletteOut, waterAmount: amt };
  }

  function reset() {
    for (const chunk of chunks.values()) releaseChunk(chunk);
    chunks.clear();
    nextIndex = 0;
    bubbles.reset();
    shafts.reset();
  }

  function dispose() {
    waterGeo.dispose();
    waterMat.dispose();
    bubbles.dispose();
    shafts.dispose();
  }

  /* --- Live quality knobs ------------------------------------------------ */

  /** Draw distance, in chunks. The single most effective runtime perf dial. */
  function setChunksAhead(n) {
    chunksAheadLive = Math.max(2, Math.round(n));
  }

  /** Scale the active particle counts without reallocating the buffers. */
  function setParticleBudget(nBubbles, nShafts) {
    bubbles.setActive(nBubbles);
    shafts.setActive(nShafts);
  }

  function onResize() { bubbles.setScale(window.innerHeight); }

  return {
    update, reset, dispose, water,
    setChunksAhead, setParticleBudget, onResize,
    get chunkCount() { return chunks.size; },
    palette,
  };
}

/* ==========================================================================
   Bubbles
   ==========================================================================
   A single Points cloud recycled around the wisp. Bubbles are spawned in a box
   ahead of the player and rise; once one leaves the box it is respawned rather
   than destroyed.
   ========================================================================== */

const BUBBLE_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  uniform float uScale;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = min(aSize * (uScale / max(0.001, -mv.z)), 90.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const BUBBLE_FRAG = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec4 t = texture2D(uMap, gl_PointCoord);
    gl_FragColor = vec4(uColor * t.rgb, t.a * vAlpha);
  }
`;

function createBubbles(scene, count) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);
  const rise = new Float32Array(count);
  const wobble = new Float32Array(count);

  for (let i = 0; i < count; i++) positions[i * 3 + 1] = -9999;

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1).setUsage(THREE.DynamicDrawUsage));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uMap: { value: glowTexture('#DFFBFF', 1.7) },
      uColor: { value: new THREE.Color('#CFF8FF') },
      uScale: { value: window.innerHeight * 0.5 },
    },
    vertexShader: BUBBLE_VERT,
    fragmentShader: BUBBLE_FRAG,
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
  // of them are simulated and drawn, so quality can move mid-run for free.
  let activeCount = count;

  function place(i, playerZ, spread = true) {
    positions[i * 3] = randRange(-70, 70);
    positions[i * 3 + 1] = spread ? randRange(-24, 20) : randRange(-26, -18);
    positions[i * 3 + 2] = playerZ - randRange(20, 620);
    sizes[i] = randRange(3, 12);
    rise[i] = randRange(2.4, 7.5);
    wobble[i] = Math.random() * Math.PI * 2;
  }

  function update(dt, elapsed, playerZ, amt) {
    points.visible = amt > 0.01;
    if (!points.visible) { seeded = false; return; }

    if (!seeded) {
      for (let i = 0; i < count; i++) place(i, playerZ, true);
      seeded = true;
    }

    for (let i = 0; i < activeCount; i++) {
      positions[i * 3 + 1] += rise[i] * dt;
      positions[i * 3] += Math.sin(elapsed * 1.4 + wobble[i]) * dt * 1.6;

      // Recycle when a bubble surfaces or the player leaves it behind.
      if (positions[i * 3 + 1] > 24 || positions[i * 3 + 2] > playerZ + 40) {
        place(i, playerZ, false);
      }
      alphas[i] = amt * 0.55;
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
   Light shafts
   ==========================================================================
   Additive quads angled with the sun, drifting slowly and recycled ahead of
   the player. Cheap, and they do most of the work of selling "underwater".
   ========================================================================== */

function createShafts(scene, count) {
  const group = new THREE.Group();
  group.frustumCulled = false;
  scene.add(group);

  const geo = new THREE.PlaneGeometry(1, 1);
  const shafts = [];

  for (let i = 0; i < count; i++) {
    const mat = new THREE.MeshBasicMaterial({
      map: shaftTexture('#DFFBFF'),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      fog: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    mesh.renderOrder = 12;
    group.add(mesh);
    shafts.push({ mesh, mat, phase: Math.random() * Math.PI * 2, w: 1, h: 1 });
  }

  function place(s, playerZ) {
    s.w = randRange(14, 40);
    s.h = randRange(90, 160);
    s.mesh.scale.set(s.w, s.h, 1);
    s.mesh.position.set(
      randRange(-90, 90),
      randRange(6, 30),
      playerZ - randRange(60, 700),
    );
    // Lean with the sun and yaw a little so they aren't all parallel cards.
    s.mesh.rotation.set(0, randRange(-0.5, 0.5), randRange(-0.42, -0.16));
    s.phase = Math.random() * Math.PI * 2;
  }

  let seeded = false;
  let activeCount = count;

  function update(dt, elapsed, playerZ, amt) {
    group.visible = amt > 0.01;
    if (!group.visible) { seeded = false; return; }

    if (!seeded) {
      for (const s of shafts) place(s, playerZ);
      seeded = true;
    }

    for (let i = 0; i < shafts.length; i++) {
      const s = shafts[i];
      if (i >= activeCount) { s.mesh.visible = false; continue; }
      s.mesh.visible = true;
      if (s.mesh.position.z > playerZ + 60) place(s, playerZ);
      s.mat.opacity = amt * (0.045 + Math.sin(elapsed * 0.5 + s.phase) * 0.022 + 0.028);
      s.mesh.position.x += Math.sin(elapsed * 0.25 + s.phase) * dt * 1.2;
    }
  }

  return {
    update,
    reset() { seeded = false; group.visible = false; },
    setActive(n) { activeCount = clamp(Math.round(n), 0, count); },
    dispose() { geo.dispose(); for (const s of shafts) s.mat.dispose(); },
  };
}
