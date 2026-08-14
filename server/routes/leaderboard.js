/**
 * server/routes/leaderboard.js — reading and writing the score boards.
 */

import * as db from './../db.js';

/** GET /api/leaderboard?board=global|daily&key=YYYY-MM-DD&limit=25 */
export function getLeaderboard(url) {
  const board = url.searchParams.get('board') === 'daily' ? 'daily' : 'global';
  const key = (url.searchParams.get('key') || '').slice(0, 10);
  const limit = Number(url.searchParams.get('limit')) || 25;

  return { entries: db.leaderboard({ board, key, limit }) };
}

/** POST /api/runs */
export function postRun(body) {
  const run = db.normaliseRun(body);
  if (!run) return { status: 400, payload: { error: 'malformed run' } };

  db.addRun(run);
  return { payload: { ok: true, stored: { seed: run.seed, score: run.score } } };
}
