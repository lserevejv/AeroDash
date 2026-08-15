/**
 * diagnostics.js — the module half of the diagnostic system.
 *
 * The always-on half lives in an inline script in index.html, because the
 * failures hardest to report remotely happen before any module runs: a blocked
 * CDN, a syntax error, a missing browser feature. That half owns the console
 * ring buffer, the global error handlers and the copy panel, and it works with
 * nothing else loaded.
 *
 * This half enriches it. Once the game is alive it registers a provider that
 * appends what only the game knows — which state it was in, which World and
 * seed, what the save file looked like on load, whether the backend answered,
 * how the renderer is actually performing.
 *
 * Design rule throughout: the report is a *pasteable artefact*. Everything is
 * plain text, nothing is truncated to the point of being useless, and no field
 * contains anything personal. The player should be able to read it themselves
 * and see that.
 */

import { BUILD, BUILD_ID } from './version.js';
import { loadMeta } from './economy.js';

/** Rolling frame-time sample, so the report can say "it was chugging". */
const perf = {
  frames: 0,
  worst: 0,
  acc: 0,
  window: 0,
  fps: 0,
  longFrames: 0,
};

export function noteFrame(dt) {
  perf.frames++;
  perf.acc += dt;
  perf.window += dt;
  if (dt > perf.worst) perf.worst = dt;
  // A frame over 100ms is a visible hitch, not just a slow frame.
  if (dt > 0.1) perf.longFrames++;
  if (perf.window >= 2) {
    perf.fps = Math.round(perf.frames / perf.window);
    perf.frames = 0;
    perf.window = 0;
  }
}

/**
 * Wire the module layer into the always-on core.
 *
 * @param {object} ctx  everything the report needs to interrogate, passed in
 *   rather than imported so this module has no opinion about game structure
 *   and cannot itself become a source of load-order bugs.
 */
export function installDiagnostics(ctx) {
  const D = globalThis.__AERO_DIAG;
  // Announce the build even if the core is somehow absent — the debug probe
  // and the console both benefit.
  globalThis.__AERO_BUILD_ID = BUILD_ID;

  if (!D) {
    console.warn('[aerodrift] diagnostic core missing; index.html may be stale');
    return { open: () => {}, noteFrame };
  }

  D.mark('booted', BUILD_ID);
  D.provider = () => buildGameSection(ctx);

  return {
    /** Open the panel on demand (Settings -> Report an issue). */
    open: () => D.open(false),
    noteFrame,
  };
}

/* ==========================================================================
   The game-state section of the report
   ========================================================================== */

function buildGameSection(ctx) {
  const out = [];
  const push = (k, v) => out.push(`  ${k}: ${v}`);

  out.push('[build detail]');
  push('build', BUILD_ID);
  push('branch', BUILD.branch);
  push('commit date', BUILD.commitDate || 'unknown');
  push('stamped', BUILD.stampedAt);
  if (BUILD.dirty) push('note', 'stamped from a DIRTY working tree — local edits present');
  out.push('');

  /* --- Game state ------------------------------------------------------- */
  out.push('[game state]');
  let probe = null;
  try {
    probe = ctx.probe();
  } catch (err) {
    push('probe', `threw: ${err.message}`);
  }
  if (probe) {
    push('state', probe.state);
    push('screen', probe.screen);
    push('world', `${probe.world} (condition: ${probe.condition || 'n/a'})`);
    push('seed', `${probe.seedText} (${probe.seed})`);
    push('distance', `${probe.distance} m`);
    push('score', probe.score);
    push('combo', `x${probe.combo}  checkpoint mult x${probe.checkpointMult}`);
    push('integrity', `${probe.pips}/${probe.maxPips}${probe.exposed ? ' (EXPOSED)' : ''}  hits: ${probe.hits}`);
    push('quality tier', probe.tier);
    push('live objects', `chunks ${probe.chunks}, orbs ${probe.orbs}, rings ${probe.rings}, ` +
      `streams ${probe.streams}, obstacles ${probe.obstacles}, gates ${probe.gates}`);
    push('worlds unlocked', probe.worlds.join(', '));
  }
  out.push('');

  /* --- Renderer --------------------------------------------------------- */
  out.push('[renderer]');
  try {
    const r = ctx.sceneCore.renderer;
    const info = r.info;
    push('fps (2s avg)', perf.fps || 'measuring');
    push('worst frame', `${Math.round(perf.worst * 1000)}ms`);
    push('hitches >100ms', perf.longFrames);
    push('pixel ratio', r.getPixelRatio());
    push('draw calls', info.render.calls);
    push('triangles', info.render.triangles);
    push('geometries', info.memory.geometries);
    push('textures', info.memory.textures);
    push('programs', info.programs ? info.programs.length : '?');
    push('exposure', ctx.sceneCore.exposure.toFixed(3));
    push('context lost', r.getContext().isContextLost());
  } catch (err) {
    push('renderer', `unavailable: ${err.message}`);
  }
  out.push('');

  /* --- Save ------------------------------------------------------------- */
  out.push('[save]');
  push('load source', loadMeta.source);
  push('storage', loadMeta.storage);
  push('stored bytes', loadMeta.rawBytes);
  if (loadMeta.parseError) push('parse error', loadMeta.parseError);
  push('keys present', loadMeta.keys.length ? loadMeta.keys.join(', ') : '(none — fresh profile)');
  push('repairs on load', loadMeta.repairs.length ? loadMeta.repairs.join(', ') : 'none');
  try {
    const s = ctx.save;
    push('writable', ctx.writeProbe());
    push('progress', `droplets ${s.droplets}, prisms ${s.prisms}, xp ${s.xp}, runs ${s.runs}, rebirths ${s.rebirthCount}`);
    push('equipped', `${s.equipped.trail} / ${s.equipped.skin} / ${s.equipped.aura}`);
    push('settings', JSON.stringify(s.settings));
  } catch (err) {
    push('save', `unreadable: ${err.message}`);
  }
  out.push('');

  /* --- Network ---------------------------------------------------------- */
  out.push('[network]');
  try {
    push('navigator.onLine', navigator.onLine);
    push('api base', ctx.api.base || '(none configured)');
    push('api status', ctx.api.status);
    const c = navigator.connection;
    if (c) push('connection', `${c.effectiveType || '?'} downlink ${c.downlink || '?'}Mb rtt ${c.rtt || '?'}ms${c.saveData ? ' save-data' : ''}`);
  } catch (err) {
    push('network', `unavailable: ${err.message}`);
  }
  out.push('');

  /* --- Audio ------------------------------------------------------------ */
  out.push('[audio]');
  try {
    push('started', ctx.audio.started);
    push('muted', ctx.audio.muted);
    push('volume', ctx.audio.volume);
  } catch (err) {
    push('audio', `unavailable: ${err.message}`);
  }

  return out.join('\n');
}
