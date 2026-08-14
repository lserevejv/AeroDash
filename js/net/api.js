/**
 * net/api.js — the optional backend client.
 *
 * THE RULE THIS FILE EXISTS TO ENFORCE
 * ------------------------------------
 * AERODRIFT is fully playable with no server running. Every currency, upgrade,
 * cosmetic, level and record lives in localStorage and is written there
 * regardless of what happens here. This module is strictly additive: it copies
 * finished runs up to a leaderboard and pulls other players' runs back down for
 * ghost replays. Nothing calls into it on a path that matters.
 *
 * Consequently every method here resolves rather than rejects, requests carry a
 * short timeout, and a single failure flips the whole module to `offline` so
 * the UI can say so plainly instead of hanging behind a spinner.
 */

const TIMEOUT_MS = 2500;
/** After a failure, wait this long before trying the network again. */
const RETRY_AFTER_MS = 20000;

/**
 * Where the backend lives.
 *
 * The game client is a static bundle, usually served by `python3 -m http.server`
 * on one port while `node server/server.js` listens on another, so same-origin
 * is the wrong default. Resolution order:
 *   1. `?api=` in the URL          — for testing against another machine
 *   2. localStorage override        — sticky, set from Settings
 *   3. same host, port 8787         — what `node server/server.js` uses
 */
function resolveBase() {
  try {
    const q = new URLSearchParams(location.search).get('api');
    if (q) return q.replace(/\/$/, '');
    const stored = localStorage.getItem('aerodrift.api');
    if (stored) return stored.replace(/\/$/, '');
  } catch (err) { /* URL or storage unavailable — fall through */ }

  if (location.protocol === 'file:') return null;
  return `${location.protocol}//${location.hostname}:8787`;
}

export function createApi() {
  const base = resolveBase();

  const state = {
    /** 'unknown' until the first probe, then 'online' | 'offline'. */
    status: base ? 'unknown' : 'offline',
    lastFailure: 0,
    version: null,
  };

  /** True when it is worth attempting a request at all. */
  function shouldTry() {
    if (!base) return false;
    if (state.status === 'offline' && Date.now() - state.lastFailure < RETRY_AFTER_MS) return false;
    return true;
  }

  function markOffline() {
    state.status = 'offline';
    state.lastFailure = Date.now();
  }

  /**
   * One request. Never throws: returns `null` on any failure, having already
   * recorded the offline state.
   */
  async function request(path, { method = 'GET', body = null } = {}) {
    if (!shouldTry()) return null;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(`${base}${path}`, {
        method,
        signal: controller.signal,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!res.ok) { markOffline(); return null; }
      const data = await res.json();
      state.status = 'online';
      return data;
    } catch (err) {
      markOffline();
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  /* ======================================================================
     Endpoints
     ====================================================================== */

  async function health() {
    const data = await request('/api/health');
    if (data) state.version = data.version || null;
    return !!data;
  }

  /**
   * @param {'global'|'daily'} board
   * @param {string} [key] the daily key, ignored for the global board
   */
  async function leaderboard(board = 'global', key = '', limit = 25) {
    const q = new URLSearchParams({ board, limit: String(limit) });
    if (key) q.set('key', key);
    const data = await request(`/api/leaderboard?${q}`);
    return data?.entries || null;
  }

  /**
   * Submit a finished run. Fire-and-forget from the caller's point of view:
   * the results screen never waits on it.
   */
  async function submitRun(run) {
    return request('/api/runs', { method: 'POST', body: run });
  }

  /** The best stored run for a seed, with its recorded path, for a ghost race. */
  async function ghostForSeed(seed) {
    const data = await request(`/api/ghost?seed=${seed >>> 0}`);
    return data?.run || null;
  }

  return {
    health, leaderboard, submitRun, ghostForSeed,
    get base() { return base; },
    get status() { return state.status; },
    get online() { return state.status === 'online'; },
    /** Explicitly re-probe, e.g. when the player opens the leaderboard. */
    async refresh() { state.lastFailure = 0; return health(); },
  };
}
