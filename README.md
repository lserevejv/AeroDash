# AERODRIFT

An endless 3D glide-and-collect game rendered entirely in the **Frutiger Aero**
aesthetic — glossy chrome, translucent glass, water droplets, bokeh light and
bright optimistic gradients.

You steer a small glowing orb (the **Wisp**) forward through a procedurally
generated corridor of light orbs, glass ring gates, checkpoint arches and World
Portals, chaining combos and riding glowing current streams.

**There is no timer.** A run ends only when you clip something with no Integrity
left — an ending you can always see coming and always avoid. A careful pilot can
fly forever.

---

## Running it

No build step, no bundler, no `npm install`. It does need to be served over
HTTP, because every modern browser blocks ES modules loaded from `file://`.

```bash
python3 -m http.server 8000
# or:  npx serve .
```

Then open <http://localhost:8000>.

Three.js is pulled from a CDN (pinned to `three@0.185.1`) via an import map in
`index.html`, so the first load needs a network connection. If the CDN can't be
reached the game shows a "Couldn't reach the CDN" panel rather than a blank
screen.

### Optional: leaderboards and ghost racing

```bash
node server/server.js
```

Also dependency-free — only `node:http` and `node:fs`. See
[`server/README.md`](server/README.md). **The game is completely playable
without it**: every Droplet, Prism, upgrade, cosmetic, level and record lives in
`localStorage` and is written there whether or not a server exists. With it
stopped, one screen says so and nothing else changes.

---

## Controls

| Action | Desktop | Touch |
|---|---|---|
| Steer | Move the mouse, or `W`/`A`/`S`/`D` / arrow keys | Drag anywhere on screen |
| Boost | Hold `Space` | Hold the on-screen **BOOST** pad |
| Pause | `Esc` | Pause button, top right |
| Photo mode | `P` while paused | "Photo Mode" in the pause menu |

Steering is always eased — the wisp glides toward where you point rather than
snapping to it, and the damping is frame-rate independent so it feels identical
at 30fps and 144fps.

---

## How a run works

### Integrity

The Wisp carries **Integrity pips** (3 by default, up to 6 with upgrades).

- Clipping a cloud, coral, shard or pylon costs **one pip**, your combo, and a
  little speed.
- Flying clean for ~18 seconds **restores** one pip.
- The run ends when you take a contact **with no pips left**. At zero, the HUD
  chip pulses and the Wisp itself throbs — the danger state is never a surprise.

Everything else is unchanged from the calm original: obstacles are soft, there
is no health bar, and nothing else in the game can end a run.

### Scoring

- **Light orbs** score `10 × multiplier`. Big violet orbs score `35 ×`.
- **Glass ring gates** score a flat `150` and add **+1 combo** (max ×25). Rings
  are the only way the combo grows; missing one resets it, as does a contact.
- **Current streams** grant speed, a score trickle and a ×1.5 multiplier.
- The full multiplier is `combo × checkpoint bonus × stream × rebirth`.

### Checkpoints and Portals

An endless run needs internal structure, so every World has a rhythm:

| Gate | Where | Reward |
|---|---|---|
| Minor arch | every 200 m | small Droplet burst |
| Major arch | every 800 m | bigger burst **+1 permanent run multiplier** |
| Epic arch | 300 m before the Portal | large burst, a chance of a Prism shard |
| **Portal** | every 2,400 m | Droplets + score for a clean pass, and the next World |

Arches span the entire corridor and cannot be missed — they mark progress, they
are not a skill test. A Portal's aperture *is* narrower than the corridor, so
threading it is a real (if gentle) target.

The corridor beyond a Portal belongs to the next World whether or not you
threaded the aperture — it has to, because chunks are built hundreds of metres
ahead of you. So a Portal is a threshold you always cross and a target you can
hit: miss it and you fly on regardless, you just don't collect the bonus.

### Worlds

A run flies through them in sequence and then loops, harder each time.

| World | Strata | Feel |
|---|---|---|
| **Skyshore** | Sky → Shore | Open sky over a warm shallow sea |
| **Verdant Circuit** | Grove → Circuit | Canopy and pollen, then chrome over a mirror flood |
| **Aurora Reach** | Dusk → Aurora | Pastel twilight, stardust, curtains over a still sea |
| **Crystal Atrium** | Atrium → Prism | Sunlit geode glass, then rainbow refraction |
| **Solar Bloom** *(Realm)* | Gold → Ember | Endless golden hour, molten chrome, heavy flare |

Reaching a World unlocks it on your account forever. Once every base World has
been reached, the **Realm** tier joins the rotation.

Each World also draws a **condition** from the run seed — Clear, Golden, Misty,
Crisp or Radiant — which multiplies fog, sun and exposure. A World is always
recognisably itself; it is just never quite the same twice.

---

## Meta-progression

- **Droplets** — earned constantly from orbs, rings, streams and checkpoints.
  Spent on upgrades and most cosmetics. Reset by Rebirth.
- **Prisms** — rare. Earned from Rebirth and occasionally from Epic checkpoints.
  Spent on premium cosmetics. Never reset.
- **Level / XP** — a lifetime track fed by distance and Droplets. Gates which
  upgrades and cosmetics you can buy. Never resets, not even through Rebirth.

**Upgrades** (Droplets, level-gated): Shield Capacity, Shield Regen, Magnet
Radius, Boost Efficiency, Combo Hold, Stream Tuning, Checkpoint Yield.

**Cosmetics**: nine trails (two of them premium palettes that cycle slowly), six
Wisp skins, five auras. All purely visual, and all permanent.

**Rebirth** unlocks at 10,000 m of cycle distance (+6,000 m each time). It pays
Prisms on a square-rooted curve — deliberately, so hoarding one enormous cycle
is never strictly better than cycling sooner — plus a permanent +12% score
multiplier that stacks forever.

Rebirth resets **exactly three things**: current Droplets, purchased upgrades,
and cycle progress. It never touches cosmetics, Level/XP, World unlocks or
records. Ascending should never feel like losing something you earned.

---

## Project layout

```
.
├── index.html            entry point, import map, all screen markup
├── css/style.css         glass panels, gel buttons, HUD, cards, gloss sweeps
├── js/
│   ├── main.js           game state machine, render loop, scoring
│   ├── scene.js          renderer, camera, lights, sky dome, sun, lens flare
│   ├── player.js         the Wisp, input, eased flight, chase camera, trail
│   ├── world.js          chunk generation & recycling, surface, motes, veils
│   ├── worlds.js         World/stratum definitions, palettes, conditions
│   ├── checkpoints.js    checkpoint arches, Portals, celebration bursts
│   ├── shield.js         Integrity: pips, regen, the one end condition
│   ├── collectibles.js   orbs, ring gates, streams, magnet, pickup detection
│   ├── obstacles.js      instanced hazard/scenery fields and style recipes
│   ├── economy.js        save schema + migration, currencies, XP/Level
│   ├── upgrades.js       upgrade definitions, purchase, effect folding
│   ├── shop.js           cosmetic catalog, purchase/equip logic
│   ├── rebirth.js        prestige thresholds, payout, reset/keep logic
│   ├── achievements.js   the milestone log
│   ├── prng.js           mulberry32, seed hashing, daily seeds
│   ├── postfx.js         EffectComposer + bloom, quality tiers, FPS watchdog
│   ├── audio.js          Web Audio synthesis — pad, layers, chimes, whooshes
│   ├── textures.js       canvas-generated gradients, glows, caustics, portals
│   ├── utils.js          easing, object pool, formatting
│   ├── ui.js             screen flow, HUD, results, settings, photo mode
│   ├── ui/               hub, shop/upgrades/rebirth, leaderboard/log
│   └── net/              optional backend client, ghost record + playback
└── server/               optional zero-dependency leaderboard + ghost service
```

---

## Notes on the implementation

**Zero external assets.** There is not a single image or audio file in this
repository. Every texture — glow sprites, bokeh discs, lens-flare ghosts, the
sun corona, stream ribbons, water caustics, aurora curtains, portal swirls — is
drawn to an offscreen `<canvas>` at runtime and wrapped in a
`THREE.CanvasTexture`. Reflections on chrome and glass come from a
`RoomEnvironment` run through `PMREMGenerator`, not an `.hdr`. All audio is
synthesised from oscillators and noise buffers, including the reverb, whose
impulse response is a procedurally generated decaying noise burst. The Droplet
and Prism icons are `border-radius` and `clip-path`.

**Generation is seeded.** Every chunk derives its own generator from
`hash2(runSeed, chunkIndex)` rather than drawing from one shared stream. That
matters because chunk building is driven by framerate — a slow frame builds two
chunks where a fast one builds none — so a single stream would be consumed in a
different order on every machine and "same seed, same world" would quietly fail.
Per-chunk seeding makes chunk N identical no matter when it was built, which is
what ghost racing and daily challenges rest on.

**Worlds replaced `waterAmount()`.** v1 had two biomes and one closed-form
`waterAmount(distance)` mirrored by hand in GLSL. That could not extend to five
Worlds without special-casing each new one on top of the old. Now `worlds.js`
describes N Worlds of two strata each, `paletteAt(distance)` blends the pair
straddling the player into one flat palette, and every visual system consumes
that and nothing else. The reflective surface no longer mirrors a formula: JS
samples `surfaceAmountAt()` into a 256-entry R8 ramp each frame and the shader
reads that, which is what lets an arbitrary sequence — some Worlds with an
ocean, some with a mirror flood, some with nothing — still fade in far down the
corridor instead of popping in around the player.

**Bloom is the load-bearing visual system.** The chain is
`RenderPass → UnrealBloomPass → OutputPass`. The `OutputPass` terminator is
required, not decorative: `WebGLRenderer` only applies tone mapping and the sRGB
conversion when drawing to the default framebuffer, and rendering into the
composer's float target skips both — `OutputPass` re-applies ACES and sRGB at
the end, after bloom has done its work in linear space.

**On brightness.** This took three passes to get right and is worth writing
down, because "too bright" is rarely one thing:

- Exposure sits at **0.86** (v1: 0.98), with a per-World trim and a user-facing
  **Brightness** slider in Settings over the top. Perceived brightness is
  monitor-dependent and genuinely subjective; a slider settles it permanently in
  a way that chasing one "correct" value never does.
- The bloom threshold sits just above `1.0`. A bright sky carries a luminance
  around `0.85` all by itself, so a lower threshold blooms the entire frame and
  the image turns to white milk. Above `1.0`, only things made deliberately
  super-bright — emissive orbs, ring rims, stream ribbons, the sun — glow.
- Scene lights are in true physical units (hemisphere ≈ 0.7, key ≈ 0.8) rather
  than the much larger values that look right under legacy lighting.
- The water's specular term is **clamped**. Wave normals spread that highlight
  across a wide band, every pixel of which is over the bloom threshold —
  unclamped it becomes one enormous white smear that swallows the orbs in front
  of it.
- Gates and light veils **fade as you approach them**. A glow sprite sized to
  read from 400 m away fills the screen at 5 m, and being additive it whites out
  the frame at exactly the moment the player most needs to see where they are.
- One real bug: `shaftTexture` began its gradient at 55% alpha, leaving a hard
  line along the quad's top edge. Invisible on a small distant shaft; a
  screen-wide diagonal seam once a World scaled its veils up.

**Nothing is allocated mid-flight.** The corridor is built in chunks generated
ahead of the wisp and recycled behind it. "Generating" a chunk only claims
already-built meshes and instance slots from pools. Orbs are one `InstancedMesh`
plus one `Points` cloud; hazards and scenery across all five Worlds share four
instanced fields, re-tinted per frame from the blended palette — which is how one
puff mesh is a cloud in Skyshore, a leaf in Verdant Circuit and a frosted bloom
in Crystal Atrium without a second material.

**Collision is swept, not point-in-sphere.** At boost speed the wisp covers well
over a unit per frame, so every pickup, gate and hazard test checks the segment
travelled during the frame rather than the current position.

**Quality tiers.** Three tiers drive pixel ratio, bloom buffer size, draw
distance, particle budgets and whether the expensive transmissive glass material
is used. On `Auto`, a watchdog samples framerate in windows and steps the tier
*down* (never up — hunting across a threshold is more distracting than settling)
after two consecutive bad windows.

**A note on CSS entry animations.** Screen transitions animate `transform` only,
never `opacity`. A CSS animation that has been applied but not yet started pins
its element at the keyframes' `from` values; if that included `opacity: 0`, a
menu could sit fully laid out and completely invisible with no way to reach
Play.

---

## Changelog — v2

### Replacing the timer

v1 ended every run at a fixed 5,000 m. That has no relationship to how the
player flew, so the ending always read as arbitrary — the game simply got bored.
A straight death would have thrown away the calm the game rests on. **Integrity**
threads between them: an earned, avoidable ending that names something you did,
with enough forgiveness (3 pips, regen, a loud zero state) that casual play still
gets an unhurried run. No timer or distance limit exists anywhere in the codebase
now.

### Built in this iteration

**Tier 1 — all complete.** Brightness pass and slider; seeded generation;
Integrity; three-tier checkpoints; Droplets/Prisms/XP with a migrating save
schema; upgrades, shop, cosmetics and the hub; Worlds generalised with working
in-run Portals, shipping Verdant Circuit *and* the remaining two base Worlds.

**Tier 2 — all complete.** Rebirth with a ceremonial confirmation screen; Aurora
Reach, Crystal Atrium and the Solar Bloom realm; the async multiplayer MVP —
zero-dependency Node backend, global and daily leaderboards, and ghost replays
that race a stored path on the same seed.

**Tier 2 stretch — not attempted.** Realtime WebSocket presence (§6.2) was
explicitly gated behind everything above being solid, and the honest call is
that spending the remaining time on the five original features below produced
more game than a presence layer would have.

### Tier 3 — five original features

1. **Daily Challenge.** One shared seed per UTC day, so every player flies the
   identical corridor, with its own leaderboard. This is the feature the seeded
   PRNG was really for — it costs almost nothing on top of it, and it turns a
   solo endless game into something with a daily reason to return.

2. **Ghost racing.** A stored run's path replayed as a translucent Wisp on the
   same seed. Playback runs on the run's wall clock, not on position: "where
   they were at this moment" tells you whether you are ahead, where "the line
   they took" would only be a racing guide. The HUD shows the gap in metres.

3. **Milestone log.** 26 achievements over records, volume, Worlds and prestige,
   each paying Droplets. An endless game with no fail state needs somewhere to
   put the sentence "you did a thing" across a career, and the payouts double as
   a soft catch-up for players who have been flying casually.

4. **Dynamic music layering.** The ambient pad gains an eighth-note arpeggio
   from a ×6 combo and a high shimmer near the cap, both ramped rather than
   switched. The notes are always scheduled and only the bus gains move — gating
   the scheduling instead would make layers arrive up to two seconds late, since
   Web Audio events must be queued ahead. A streak now *sounds* like it is
   building.

5. **Photo mode.** Pause, then orbit, raise, zoom and re-light the frozen wisp
   and save a PNG. Reachable with `P`. Given how much of this project is a
   lighting exercise, not being able to keep a frame felt like an omission.

*(Weather variation — the seeded per-World conditions described above — was the
sixth idea and ended up folded into the World system itself rather than shipping
as a separate feature.)*

---

## Browser support

Tested in Chromium. Uses WebGL2, ES modules, import maps, Web Audio and
`backdrop-filter` — all supported in current Chrome, Firefox and Safari.
