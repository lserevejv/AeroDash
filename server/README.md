# AERODRIFT — optional backend

Leaderboards and ghost replays. **The game does not need this to run.**

Everything that constitutes progress — Droplets, Prisms, account Level and XP,
upgrades, cosmetics, rebirths, Worlds reached, records, achievements, settings —
lives in the browser's `localStorage` and is written there whether or not this
process exists. With the server stopped, the Leaderboard screen says so plainly
and every other screen behaves identically.

## Running it

```bash
node server/server.js
```

No `npm install`. There are no dependencies — only `node:http` and `node:fs`,
so it starts from a fresh clone with nothing installed. Node 18 or newer.

```
PORT=8787   # default
HOST=0.0.0.0
```

## How the game finds it

The client resolves the API base in this order:

1. `?api=http://host:port` in the game's URL
2. `localStorage['aerodrift.api']`
3. `http://<same host>:8787` — the default this server listens on

So the usual local setup is two terminals, and nothing to configure:

```bash
python3 -m http.server 8000    # the game
node server/server.js          # this
```

Then open <http://localhost:8000>.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/health` | liveness + stored run count |
| `GET` | `/api/leaderboard?board=global\|daily&key=YYYY-MM-DD&limit=25` | ranked rows, paths stripped |
| `GET` | `/api/ghost?seed=N` | the best stored run **for that seed**, with its path |
| `POST` | `/api/runs` | submit a finished run |

A submitted run is:

```json
{
  "playerId": "uuid",     "name": "Drifter",
  "seed": 123456789,      "score": 48210,
  "distance": 9400,       "world": "aurora",
  "daily": "2026-08-14",  "path": [x, y, z, x, y, z, ...]
}
```

`path` is sampled every 0.25 s. Because world generation is seeded, replaying
that path on the same seed puts the ghost in the *same corridor* — which is what
makes it a race rather than a decorative line.

## Storage

One JSON file at `server/data/runs.json`, written on a short debounce via
write-to-temp-then-rename, so a crash mid-write leaves the previous good file
intact. Only each player's best run per board is kept, capped at 500 rows per
board, so the file stays small and one enthusiastic player cannot push everyone
else off.

Delete the file to reset the boards.

## Trust model

Be clear-eyed about this: the client is a static bundle that anyone can edit, so
submitted scores are **not** verifiable. Making them so would need a
server-side simulation of the whole game, which is far outside what an optional
leaderboard justifies.

What the server does guarantee is that nothing stored can be malformed,
oversized, or capable of injecting markup into another player's screen: every
field is clamped and coerced, names are stripped of markup characters and
length-bounded (and rendered via `textContent` on the client), bodies over
512 KB are refused before buffering, and paths are truncated to 3,000 points.

Treat the boards as a friendly scoreboard among people who know each other,
which is the scale this is built for.
