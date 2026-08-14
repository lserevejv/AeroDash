/**
 * server/server.js — AERODRIFT's optional leaderboard and ghost-replay service.
 *
 *   node server/server.js
 *
 * NO DEPENDENCIES, ON PURPOSE
 * ---------------------------
 * The game client ships with no build step and no `npm install`, and it would
 * be a poor trade to reintroduce one on the server side just to avoid writing
 * twenty lines of routing. This uses only `node:http`, so the service starts
 * from a fresh clone with nothing installed — which also means it cannot rot
 * when a transitive dependency does.
 *
 * WHAT IT IS NOT
 * --------------
 * It is not required. The game is fully playable and fully persistent with this
 * process stopped; every currency, upgrade, cosmetic and record lives in the
 * browser's localStorage. If this is unreachable the client shows an offline
 * state on one screen and behaves identically everywhere else.
 */

import { createServer } from 'node:http';
import * as db from './db.js';
import { getLeaderboard, postRun } from './routes/leaderboard.js';
import { getGhost } from './routes/ghosts.js';

const PORT = Number(process.env.PORT) || 8787;
const HOST = process.env.HOST || '0.0.0.0';
/** Reject oversized bodies before buffering them. A run with a path is ~40 KB. */
const MAX_BODY_BYTES = 512 * 1024;
const VERSION = '2.0.0';

/* ==========================================================================
   Helpers
   ========================================================================== */

/**
 * The client is served from a different origin (a static file server on another
 * port), so CORS is required for the game to talk to this at all. The API is
 * read-mostly public data with no credentials and no cookies, so a wildcard
 * origin is the right level of access rather than a shortcut.
 */
function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function send(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (!chunks.length) { resolve(null); return; }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch (err) {
        reject(new Error('invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

/* ==========================================================================
   Routing
   ========================================================================== */

async function route(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/api/health') {
    return { payload: { ok: true, version: VERSION, ...db.stats() } };
  }

  if (req.method === 'GET' && url.pathname === '/api/leaderboard') {
    return { payload: getLeaderboard(url) };
  }

  if (req.method === 'GET' && url.pathname === '/api/ghost') {
    return getGhost(url);
  }

  if (req.method === 'POST' && url.pathname === '/api/runs') {
    let body;
    try {
      body = await readBody(req);
    } catch (err) {
      return { status: 400, payload: { error: err.message } };
    }
    return postRun(body);
  }

  return { status: 404, payload: { error: 'not found' } };
}

/* ==========================================================================
   Boot
   ========================================================================== */

db.load();

const server = createServer(async (req, res) => {
  cors(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let url;
  try {
    url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  } catch (err) {
    send(res, 400, { error: 'bad url' });
    return;
  }

  try {
    const result = await route(req, res, url);
    send(res, result.status || 200, result.payload);
  } catch (err) {
    // A malformed request must never take the process down — the game may be
    // mid-run and pointed at it.
    console.error('[aerodrift-server]', err);
    send(res, 500, { error: 'internal error' });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[aerodrift-server] v${VERSION} listening on http://${HOST}:${PORT}`);
  console.log('[aerodrift-server] the game works fine without this — it only adds leaderboards and ghosts');
});

/** Flush the store on the way out so the last few runs are not lost. */
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    console.log(`\n[aerodrift-server] ${signal} — flushing store`);
    db.flushNow();
    server.close(() => process.exit(0));
    // Do not wait forever on lingering keep-alive sockets.
    setTimeout(() => process.exit(0), 1500).unref();
  });
}
