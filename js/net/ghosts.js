/**
 * net/ghosts.js — recording a run's flight path, and racing a stored one.
 *
 * This is the payoff for seeding world generation (prng.js). Because a seed
 * reproduces the corridor exactly, a stored path replayed on the same seed is
 * flying through the *same world* — so a translucent ghost of somebody else's
 * run is a genuine race, with no realtime networking involved at all.
 *
 * Playback is on the wall clock of the run, not on position. That is the
 * difference between "here is where they were at this moment" — which tells you
 * whether you are ahead — and "here is the line they took", which would just be
 * a racing guide. The first is the one that creates a race.
 */

import * as THREE from 'three';
import { lerp, clamp } from './../utils.js';
import { glowTexture } from './../textures.js';

/** Seconds between recorded samples. */
export const SAMPLE_INTERVAL = 0.25;
/** Hard cap, so an extremely long run cannot grow an unbounded array. */
const MAX_SAMPLES = 2400; // 10 minutes of flight

/* ==========================================================================
   Recorder
   ========================================================================== */

/**
 * Records a flat `[x, y, z, x, y, z, ...]` array at a fixed interval.
 *
 * Quantised to one decimal place before storage: at the scale the ghost is
 * drawn, a tenth of a unit is invisible, and it roughly halves the JSON that
 * goes over the wire.
 */
export function createRecorder() {
  let path = [];
  let acc = 0;
  let recording = false;

  function start() {
    path = [];
    acc = SAMPLE_INTERVAL; // sample immediately on the first update
    recording = true;
  }

  function stop() { recording = false; }

  function update(dt, pos) {
    if (!recording || path.length >= MAX_SAMPLES * 3) return;
    acc += dt;
    if (acc < SAMPLE_INTERVAL) return;
    acc -= SAMPLE_INTERVAL;
    path.push(
      Math.round(pos.x * 10) / 10,
      Math.round(pos.y * 10) / 10,
      Math.round(pos.z * 10) / 10,
    );
  }

  return {
    start,
    stop,
    update,
    get path() { return path; },
    get sampleCount() { return path.length / 3; },
    get duration() { return (path.length / 3) * SAMPLE_INTERVAL; },
  };
}

/* ==========================================================================
   Playback
   ========================================================================== */

/**
 * The ghost wisp: a translucent bead with a soft halo, deliberately much
 * plainer than the player's own wisp. It has no trail, no aura and no light —
 * partly for cost, but mostly so it can never be mistaken for you at a glance.
 */
export function createGhost(sceneCore) {
  const { scene } = sceneCore;

  const group = new THREE.Group();
  group.visible = false;
  scene.add(group);

  const bead = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 18, 14),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color('#D6E8FF'),
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    }),
  );
  group.add(bead);

  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture('#FFFFFF', 2.4),
    color: new THREE.Color('#C9D8FF'),
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
    opacity: 0.30,
    fog: false,
  }));
  halo.scale.setScalar(2.6);
  group.add(halo);

  let path = null;
  let meta = null;
  let time = 0;

  /** @param {{path:number[], name?:string, score?:number}} run */
  function load(run) {
    if (!run || !Array.isArray(run.path) || run.path.length < 6) {
      clear();
      return false;
    }
    path = run.path;
    meta = run;
    time = 0;
    group.visible = true;
    return true;
  }

  function clear() {
    path = null;
    meta = null;
    group.visible = false;
  }

  function reset() {
    time = 0;
    group.visible = !!path;
  }

  function update(dt, elapsedInRun) {
    if (!path) return;
    time = elapsedInRun;

    const samples = path.length / 3;
    const f = time / SAMPLE_INTERVAL;
    const i = Math.floor(f);

    // The ghost's run ended: fade it out rather than freezing it mid-air,
    // which would read as a bug rather than "you outlasted them".
    if (i >= samples - 1) {
      const over = clamp((f - (samples - 1)) / 4, 0, 1);
      bead.material.opacity = 0.28 * (1 - over);
      halo.material.opacity = 0.30 * (1 - over);
      if (over >= 1) group.visible = false;
      return;
    }

    const t = f - i;
    const a = i * 3;
    const b = a + 3;
    group.position.set(
      lerp(path[a], path[b], t),
      lerp(path[a + 1], path[b + 1], t),
      lerp(path[a + 2], path[b + 2], t),
    );
  }

  /** Signed metres the player is ahead of the ghost. Negative means behind. */
  function leadOver(playerZ) {
    if (!path || !group.visible) return null;
    return group.position.z - playerZ;
  }

  function setEnabled(on) { group.visible = on && !!path; }

  function dispose() {
    bead.geometry.dispose();
    bead.material.dispose();
    halo.material.dispose();
  }

  return {
    group, load, clear, reset, update, leadOver, setEnabled, dispose,
    get active() { return !!path && group.visible; },
    get name() { return meta?.name || 'Ghost'; },
    get score() { return meta?.score || 0; },
  };
}
