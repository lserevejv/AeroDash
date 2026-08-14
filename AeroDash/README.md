# AERODRIFT

A relaxing, endless 3D glide-and-collect game rendered entirely in the
**Frutiger Aero** aesthetic — glossy chrome, translucent glass, water droplets,
bokeh light and bright optimistic sky/aqua gradients.

You steer a small glowing orb (the **Wisp**) forward through a procedurally
generated corridor of clouds, glass ring gates and light orbs, chaining combos
and riding glowing current streams for boosts.

**There is no death and no fail state.** Only score, distance, and flow.

---

## Running it

The game needs no build step, no bundler and no `npm install` — but it does
need to be served over HTTP, because every modern browser blocks ES modules
loaded from `file://` for security reasons. Any static server works:

```bash
python3 -m http.server 8000
# or:  npx serve .
```

Then open <http://localhost:8000>.

Three.js is pulled from a CDN (pinned to `three@0.185.1`) via an import map in
`index.html`, so the first load needs a network connection. If the CDN can't be
reached the game shows a "Couldn't reach the CDN" panel rather than a blank
screen.

---

## Controls

| Action | Desktop | Touch |
|---|---|---|
| Steer | Move the mouse, or `W`/`A`/`S`/`D` / arrow keys | Drag anywhere on screen |
| Boost | Hold `Space` | Hold the on-screen **BOOST** pad |
| Pause | `Esc` | Pause button, top right |

Steering is always eased — the wisp glides toward where you point rather than
snapping to it, and the damping is frame-rate independent so it feels identical
at 30fps and 144fps.

---

## How a run works

- **Light orbs** score `10 × combo`. Big violet orbs score `35 × combo` and
  refill more boost.
- **Glass ring gates** score a flat `150` and add **+1 combo**. Rings are the
  only way the multiplier grows.
- **Missing a ring** (flying past outside it) resets the combo to 1, as does
  clipping an obstacle. The combo also decays slowly if you stop collecting
  for more than five seconds.
- **Current streams** — the glowing ribbons — grant extra speed, a continuous
  score trickle and a ×1.5 multiplier while you ride them.
- **Cloud puffs and coral clusters** are *soft* obstacles. Brushing one costs
  speed and your combo and shakes the camera. Nothing more. They cannot end a
  run.
- A run ends at **5,000 m**, or when you choose "End Run" from the pause menu.

The world alternates **Sky → Water** every 1,600 m, cross-fading palette, fog,
lighting and set dressing across the boundary.

### Unlockable Wisp trails

| Trail | Requirement |
|---|---|
| Chrome | Available from the start |
| Aqua | Score 1,500 in a run |
| Sunset | Fly 15,000 m lifetime |
| Mint | Score 6,000 in a run |

High score, best combo, lifetime distance and settings are saved to
`localStorage` (key `aerodrift.save.v1`).

---

## Project layout

```
.
├── index.html          entry point, import map, all screen markup
├── css/style.css       glass panels, gel buttons, HUD, gloss sweeps
├── js/
│   ├── main.js         game state machine, render loop, scoring
│   ├── scene.js        renderer, camera, lights, sky dome, sun, lens flare
│   ├── player.js       the Wisp, input, eased movement, chase camera, trail
│   ├── world.js        chunk generation & recycling, biomes, water surface
│   ├── collectibles.js orbs, ring gates, current streams, pickup detection
│   ├── obstacles.js    cloud puffs, coral clusters, soft collisions
│   ├── postfx.js       EffectComposer + bloom, quality tiers, FPS watchdog
│   ├── audio.js        Web Audio synthesis — pad, chimes, whooshes
│   ├── ui.js           screen flow, HUD, settings, results
│   ├── textures.js     canvas-generated gradients, glows, caustics
│   └── utils.js        easing, object pool, localStorage helpers
└── README.md
```

---

## Notes on the implementation

**Zero external assets.** There is not a single image or audio file in this
repository. Every texture — glow sprites, bokeh discs, lens-flare ghosts, the
sun corona, the scrolling stream ribbons, the water caustics — is drawn to an
offscreen `<canvas>` at runtime and wrapped in a `THREE.CanvasTexture`.
Reflections on the chrome and glass come from a `RoomEnvironment` scene run
through `PMREMGenerator`, not from an `.hdr`. All audio is synthesised from
oscillators and noise buffers, including the reverb, whose impulse response is
a procedurally generated decaying noise burst.

**Bloom is the load-bearing visual system.** The chain is
`RenderPass → UnrealBloomPass → OutputPass`. The `OutputPass` terminator is
required, not decorative: `WebGLRenderer` only applies tone mapping and the
sRGB conversion when drawing to the default framebuffer, and rendering into the
composer's float target skips both — `OutputPass` re-applies ACES and sRGB at
the end, after bloom has done its work in linear space.

The bloom threshold sits just above `1.0` deliberately. A bright sky carries a
luminance around `0.85` all by itself, so a lower threshold blooms the entire
frame and the image turns to white milk. Above `1.0`, only things that were
made deliberately super-bright — emissive orbs, ring rims, stream ribbons, the
sun — actually glow. For the same reason the scene lights are set in true
physical units (hemisphere ≈ 0.7, key ≈ 0.85) rather than the much larger
values that look right under legacy lighting.

**Nothing is allocated mid-flight.** The corridor is built in chunks that are
generated ahead of the wisp and recycled behind it. "Generating" a chunk only
claims already-built meshes and instance slots from pools and moves them into
place, so there is no GC sawtooth. Orbs are drawn as one `InstancedMesh` plus
one `Points` cloud — two draw calls for the entire orb field — and clouds and
coral are each a single instanced field.

**Collision is swept, not point-in-sphere.** At 85 units/second the wisp covers
more than a unit per frame, so every pickup and gate test checks the segment
travelled during the frame rather than the current position. Nothing can be
tunnelled through at boost speed.

**The biome is a pure function of distance.** `waterAmount(distance)` returns 0
in Sky, 1 in Water and a smooth ramp between. The same closed-form curve is
written again in GLSL for the water plane, so the surface fades in at exactly
the world position where the palette changes — which is why you can see the
ocean coming from far down the corridor instead of watching it pop in.

**Quality tiers.** Three tiers drive pixel ratio, bloom buffer size, draw
distance, particle budgets and whether the expensive transmissive glass
material is used. On `Auto`, a watchdog samples the framerate in windows and
steps the tier *down* (never up — hunting across a threshold is more
distracting than settling) after two consecutive bad windows.

**A note on CSS entry animations.** Screen transitions animate `transform` only,
never `opacity`. A CSS animation that has been applied but not yet started pins
its element at the keyframes' `from` values; if that included `opacity: 0`, a
menu could sit fully laid out and completely invisible with no way to reach
Play. Animating transform alone means the worst case is a panel that appears
without sliding.

---

## Browser support

Tested in Chromium. Uses WebGL2, ES modules, import maps, Web Audio and
`backdrop-filter` — all supported in current Chrome, Firefox and Safari.
