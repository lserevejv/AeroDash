/**
 * audio.js — every sound in AERODRIFT is synthesised with the Web Audio API.
 * There are no .mp3/.wav files anywhere in the project.
 *
 *   ambient pad   detuned saw stacks through a slowly-swept lowpass, playing a
 *                 four-chord loop scheduled with a lookahead clock
 *   collect       triangle + sine bell, pitched up with the combo
 *   ring          bright arpeggiated shimmer plus a filtered noise sparkle
 *   boost         noise swept through a bandpass
 *   bump          soft filtered thud (never harsh — nothing here is a failure)
 *   click         short UI blip
 *
 * The AudioContext is not constructed until the first real user gesture.
 * Building it earlier is what produces the "AudioContext was not allowed to
 * start" console warning, so construction is deliberately deferred rather than
 * created-then-resumed.
 */

import { clamp } from './utils.js';

/* MIDI note -> Hz. */
const hz = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

/**
 * A bright, unresolved four-chord loop — major 9ths and suspensions, no
 * leading tones pulling anywhere. It should feel like it could continue
 * forever, because it does.
 */
const PROGRESSION = [
  [50, 57, 62, 66, 69, 76], // Dadd9
  [45, 57, 61, 64, 69, 73], // A
  [47, 54, 59, 62, 66, 71], // Bm7
  [43, 55, 59, 62, 66, 69], // Gmaj9
];

const CHORD_SECONDS = 7.5;

export function createAudio(initial = {}) {
  let ctx = null;
  let master = null;
  let padBus = null;
  let sfxBus = null;
  let reverb = null;
  let reverbGain = null;
  let noiseBuffer = null;

  let started = false;
  let volume = clamp(initial.volume ?? 0.7, 0, 1);
  let muted = !!initial.muted;

  let chordIndex = 0;
  let nextChordTime = 0;
  let schedulerId = null;

  /* ======================================================================
     Graph construction
     ====================================================================== */

  function build() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();

    master = ctx.createGain();
    master.gain.value = muted ? 0 : volume;

    // A gentle limiter keeps stacked pad voices and a burst of chimes from
    // clipping when a big combo lands.
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.knee.value = 26;
    comp.ratio.value = 5;
    comp.attack.value = 0.006;
    comp.release.value = 0.28;

    master.connect(comp);
    comp.connect(ctx.destination);

    // Procedural reverb: an exponentially decaying noise burst is a perfectly
    // serviceable impulse response, and costs nothing to ship.
    reverb = ctx.createConvolver();
    reverb.buffer = makeImpulse(ctx, 2.6, 2.4);
    reverbGain = ctx.createGain();
    reverbGain.gain.value = 0.42;
    reverb.connect(reverbGain);
    reverbGain.connect(master);

    padBus = ctx.createGain();
    padBus.gain.value = 0.26;
    padBus.connect(master);
    padBus.connect(reverb);

    sfxBus = ctx.createGain();
    sfxBus.gain.value = 0.55;
    sfxBus.connect(master);

    // SFX get a lighter reverb send than the pad.
    const sfxSend = ctx.createGain();
    sfxSend.gain.value = 0.3;
    sfxBus.connect(sfxSend);
    sfxSend.connect(reverb);

    noiseBuffer = makeNoise(ctx, 2);
    return true;
  }

  function makeImpulse(context, seconds, decay) {
    const rate = context.sampleRate;
    const len = Math.floor(rate * seconds);
    const buf = context.createBuffer(2, len, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
    }
    return buf;
  }

  function makeNoise(context, seconds) {
    const len = Math.floor(context.sampleRate * seconds);
    const buf = context.createBuffer(1, len, context.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  /* ======================================================================
     Ambient pad
     ====================================================================== */

  /** Schedule one chord's worth of voices starting at `time`. */
  function scheduleChord(time) {
    const notes = PROGRESSION[chordIndex % PROGRESSION.length];
    chordIndex++;

    const attack = 2.4;
    const hold = CHORD_SECONDS;
    const release = 3.4;

    notes.forEach((midi, i) => {
      // Two slightly detuned voices per note give the pad its slow chorusing.
      for (const detune of [-6, 6]) {
        const osc = ctx.createOscillator();
        osc.type = i < 2 ? 'triangle' : 'sawtooth';
        osc.frequency.value = hz(midi);
        osc.detune.value = detune;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.Q.value = 0.7;
        // Sweep the cutoff open and closed again across the chord so the pad
        // breathes instead of sitting still.
        filter.frequency.setValueAtTime(420, time);
        filter.frequency.linearRampToValueAtTime(1500 + i * 260, time + hold * 0.55);
        filter.frequency.linearRampToValueAtTime(500, time + hold + release);

        const gain = ctx.createGain();
        const peak = 0.16 / (1 + i * 0.35); // higher voices quieter
        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.exponentialRampToValueAtTime(peak, time + attack);
        gain.gain.setValueAtTime(peak, time + hold);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + hold + release);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(padBus);

        osc.start(time);
        osc.stop(time + hold + release + 0.1);
      }
    });
  }

  /**
   * Lookahead scheduler. Web Audio events must be queued ahead of time —
   * scheduling from rAF alone drifts and glitches whenever a frame is late.
   */
  function tickScheduler() {
    if (!ctx) return;
    const horizon = ctx.currentTime + 2.0;
    while (nextChordTime < horizon) {
      scheduleChord(nextChordTime);
      // Overlap chords slightly so the pad never fully gaps.
      nextChordTime += CHORD_SECONDS - 1.2;
    }
  }

  /* ======================================================================
     SFX
     ====================================================================== */

  function envBlip(dest, { type = 'sine', freq = 660, dur = 0.3, peak = 0.3, sweepTo = null, delay = 0 }) {
    if (!ctx) return;
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (sweepTo) osc.frequency.exponentialRampToValueAtTime(sweepTo, t + dur);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(g);
    g.connect(dest);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  function noiseBurst(dest, { dur = 0.4, peak = 0.25, type = 'bandpass', f0 = 400, f1 = 2400, q = 1.2, delay = 0 }) {
    if (!ctx || !noiseBuffer) return;
    const t = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer;
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.Q.value = q;
    filter.frequency.setValueAtTime(f0, t);
    filter.frequency.exponentialRampToValueAtTime(Math.max(40, f1), t + dur);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + dur * 0.18);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    src.connect(filter);
    filter.connect(g);
    g.connect(dest);
    src.start(t);
    src.stop(t + dur + 0.05);
  }

  /* --- Public sound events --------------------------------------------- */

  /** Collect chime. Climbs a pentatonic ladder as the combo grows. */
  function collect(combo = 1, big = false) {
    if (!started || !ctx) return;
    const LADDER = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];
    const step = LADDER[Math.min(LADDER.length - 1, Math.max(0, combo - 1))];
    const base = hz(74 + step); // D5 upward
    envBlip(sfxBus, { type: 'triangle', freq: base, dur: big ? 0.5 : 0.32, peak: big ? 0.30 : 0.20 });
    envBlip(sfxBus, { type: 'sine', freq: base * 2, dur: 0.22, peak: 0.10 });
    if (big) envBlip(sfxBus, { type: 'sine', freq: base * 3, dur: 0.4, peak: 0.07, delay: 0.04 });
  }

  /** Ring pass: a rising sparkle, the biggest positive sound in the game. */
  function ring() {
    if (!started || !ctx) return;
    const root = 78;
    [0, 4, 7, 11, 14].forEach((s, i) => {
      envBlip(sfxBus, {
        type: 'sine',
        freq: hz(root + s),
        dur: 0.55,
        peak: 0.15,
        delay: i * 0.035,
      });
    });
    noiseBurst(sfxBus, { dur: 0.6, peak: 0.09, f0: 1800, f1: 7000, q: 0.9 });
  }

  function boost() {
    if (!started || !ctx) return;
    noiseBurst(sfxBus, { dur: 0.75, peak: 0.20, f0: 260, f1: 3600, q: 1.6 });
    envBlip(sfxBus, { type: 'sawtooth', freq: 110, sweepTo: 440, dur: 0.6, peak: 0.10 });
  }

  function stream() {
    if (!started || !ctx) return;
    noiseBurst(sfxBus, { dur: 0.9, peak: 0.10, f0: 900, f1: 3200, q: 2.4 });
    envBlip(sfxBus, { type: 'sine', freq: hz(81), dur: 0.7, peak: 0.10 });
  }

  /** Obstacle contact. Deliberately soft and low — a nudge, not a punishment. */
  function bump() {
    if (!started || !ctx) return;
    noiseBurst(sfxBus, { dur: 0.32, peak: 0.16, type: 'lowpass', f0: 900, f1: 160, q: 0.8 });
    envBlip(sfxBus, { type: 'sine', freq: 180, sweepTo: 70, dur: 0.28, peak: 0.14 });
  }

  function click() {
    if (!started || !ctx) return;
    envBlip(sfxBus, { type: 'sine', freq: 920, dur: 0.09, peak: 0.13 });
  }

  function chime() { // run complete
    if (!started || !ctx) return;
    [0, 4, 7, 12].forEach((s, i) => {
      envBlip(sfxBus, { type: 'triangle', freq: hz(69 + s), dur: 1.3, peak: 0.17, delay: i * 0.13 });
    });
  }

  /* ======================================================================
     Lifecycle
     ====================================================================== */

  /** Must be called from inside a user-gesture handler. */
  async function start() {
    if (started) return true;
    if (!ctx && !build()) return false;
    try {
      if (ctx.state === 'suspended') await ctx.resume();
    } catch (err) {
      return false;
    }
    started = true;
    nextChordTime = ctx.currentTime + 0.15;
    tickScheduler();
    schedulerId = setInterval(tickScheduler, 500);
    return true;
  }

  function setVolume(v) {
    volume = clamp(v, 0, 1);
    if (master) master.gain.setTargetAtTime(muted ? 0 : volume, ctx.currentTime, 0.04);
  }

  function setMuted(m) {
    muted = !!m;
    if (master) master.gain.setTargetAtTime(muted ? 0 : volume, ctx.currentTime, 0.04);
  }

  /** Duck the pad while a menu is open so UI sounds stay legible. */
  function setPadLevel(level) {
    if (padBus && ctx) padBus.gain.setTargetAtTime(level, ctx.currentTime, 0.3);
  }

  function suspend() {
    if (ctx && ctx.state === 'running') ctx.suspend().catch(() => {});
  }

  function resume() {
    if (started && ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
  }

  function dispose() {
    if (schedulerId) clearInterval(schedulerId);
    if (ctx) ctx.close().catch(() => {});
    ctx = null;
    started = false;
  }

  return {
    start, dispose, suspend, resume,
    setVolume, setMuted, setPadLevel,
    collect, ring, boost, stream, bump, click, chime,
    get started() { return started; },
    get volume() { return volume; },
    get muted() { return muted; },
  };
}
