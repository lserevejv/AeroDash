/**
 * server/db.js — persistence for the optional leaderboard/ghost service.
 *
 * A single JSON file, held in memory and flushed on a debounce. At the scale
 * this service is meant for — one household, one classroom, one game jam — that
 * is not a compromise, it is the correct amount of database: no schema
 * migration, no daemon, no install step, and the whole store is greppable.
 *
 * Writes go to a temp file and are then renamed. rename() is atomic on POSIX,
 * so a crash mid-write leaves the previous good file intact rather than a
 * half-written one that would fail to parse on the next boot.
 */

import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(HERE, 'data');
const DATA_FILE = join(DATA_DIR, 'runs.json');
const TEMP_FILE = join(DATA_DIR, 'runs.tmp.json');

/** Keep the store bounded — this is a leaderboard, not an archive. */
const MAX_RUNS_PER_BOARD = 500;
/** A recorded path is the bulk of a run's size; refuse anything absurd. */
const MAX_PATH_POINTS = 3000;
const FLUSH_DELAY_MS = 400;

const empty = () => ({ version: 1, runs: [] });

let state = empty();
let flushTimer = null;

export function load() {
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    if (existsSync(DATA_FILE)) {
      state = JSON.parse(readFileSync(DATA_FILE, 'utf8'));
      if (!Array.isArray(state.runs)) state = empty();
    }
  } catch (err) {
    console.warn('[aerodrift-server] store unreadable, starting fresh:', err.message);
    state = empty();
  }
  console.log(`[aerodrift-server] ${state.runs.length} runs loaded`);
  return state;
}

function flush() {
  flushTimer = null;
  try {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(TEMP_FILE, JSON.stringify(state), 'utf8');
    renameSync(TEMP_FILE, DATA_FILE);
  } catch (err) {
    console.error('[aerodrift-server] failed to persist:', err.message);
  }
}

/** Coalesce bursts of submissions into one write. */
function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(flush, FLUSH_DELAY_MS);
}

/** Force a synchronous write — used on shutdown. */
export function flushNow() {
  if (flushTimer) { clearTimeout(flushTimer); flushTimer = null; }
  flush();
}

/* ==========================================================================
   Validation
   ==========================================================================
   Everything arriving here is from an untrusted client — the game is a static
   bundle anyone can edit. This cannot be made cheat-proof without a server-side
   simulation, which is far beyond the scope of an optional leaderboard, so the
   goal is narrower and achievable: nothing stored can be malformed, oversized,
   or capable of injecting markup into another player's screen.
   ========================================================================== */

const clampNum = (v, lo, hi) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return lo;
  return Math.min(hi, Math.max(lo, Math.floor(n)));
};

function cleanName(raw) {
  if (typeof raw !== 'string') return '';
  // Strip anything that could be markup, then bound the length. The client
  // renders names via textContent, so this is defence in depth.
  return raw.replace(/[<>&"'`\r\n\t]/g, '').trim().slice(0, 18);
}

function cleanPath(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  const limit = Math.min(raw.length, MAX_PATH_POINTS * 3);
  for (let i = 0; i + 2 < limit; i += 3) {
    const x = Number(raw[i]);
    const y = Number(raw[i + 1]);
    const z = Number(raw[i + 2]);
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) break;
    out.push(
      Math.round(x * 10) / 10,
      Math.round(y * 10) / 10,
      Math.round(z * 10) / 10,
    );
  }
  return out;
}

/** Normalise a submitted run, or return null if it is unusable. */
export function normaliseRun(body) {
  if (!body || typeof body !== 'object') return null;
  const playerId = typeof body.playerId === 'string' ? body.playerId.slice(0, 64) : '';
  if (!playerId) return null;

  return {
    playerId,
    name: cleanName(body.name),
    seed: clampNum(body.seed, 0, 0xFFFFFFFF),
    score: clampNum(body.score, 0, 1e12),
    distance: clampNum(body.distance, 0, 1e9),
    world: typeof body.world === 'string' ? body.world.slice(0, 24) : '',
    daily: typeof body.daily === 'string' ? body.daily.slice(0, 10) : '',
    path: cleanPath(body.path),
    at: Date.now(),
  };
}

/* ==========================================================================
   Queries
   ========================================================================== */

export function addRun(run) {
  state.runs.push(run);
  prune();
  scheduleFlush();
  return run;
}

/**
 * Keep only each player's best run per board, then cap the total. Storing every
 * attempt would let one enthusiastic player fill the file and push everyone
 * else off the board.
 */
function prune() {
  const best = new Map();
  for (const r of state.runs) {
    const key = `${r.daily || 'global'}|${r.playerId}`;
    const prev = best.get(key);
    if (!prev || r.score > prev.score) best.set(key, r);
  }

  const byBoard = new Map();
  for (const r of best.values()) {
    const board = r.daily || 'global';
    if (!byBoard.has(board)) byBoard.set(board, []);
    byBoard.get(board).push(r);
  }

  const kept = [];
  for (const runs of byBoard.values()) {
    runs.sort((a, b) => b.score - a.score);
    kept.push(...runs.slice(0, MAX_RUNS_PER_BOARD));
  }
  state.runs = kept;
}

/** Leaderboard rows. Paths are stripped — they are large and unused here. */
export function leaderboard({ board = 'global', key = '', limit = 25 } = {}) {
  const wantDaily = board === 'daily';
  return state.runs
    .filter((r) => (wantDaily ? r.daily === key : !r.daily))
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(100, Math.max(1, limit)))
    .map(({ path, ...rest }) => rest);
}

/** The best stored run for a seed that actually carries a path to replay. */
export function ghostForSeed(seed) {
  let best = null;
  for (const r of state.runs) {
    if (r.seed !== seed || !r.path.length) continue;
    if (!best || r.score > best.score) best = r;
  }
  return best;
}

export function stats() {
  return { runs: state.runs.length };
}
