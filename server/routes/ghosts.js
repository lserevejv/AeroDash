/**
 * server/routes/ghosts.js — serving a recorded path back for a ghost race.
 *
 * A ghost is only meaningful on the seed it was flown on: the corridor is
 * generated from that seed, so replaying a path against a different one would
 * show a wisp flying through solid coral. The seed is therefore the lookup key,
 * not an optional filter.
 */

import * as db from './../db.js';

/** GET /api/ghost?seed=123456 */
export function getGhost(url) {
  const seed = Number(url.searchParams.get('seed'));
  if (!Number.isFinite(seed)) return { status: 400, payload: { error: 'seed required' } };

  const run = db.ghostForSeed(seed >>> 0);
  if (!run) return { payload: { run: null } };

  return {
    payload: {
      run: {
        name: run.name,
        score: run.score,
        distance: run.distance,
        seed: run.seed,
        path: run.path,
      },
    },
  };
}
