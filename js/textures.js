/**
 * textures.js — every texture in AERODRIFT is drawn to an offscreen <canvas>
 * at runtime and wrapped in a THREE.CanvasTexture.
 *
 * This is what lets the game ship with zero external image files: glow sprites,
 * bokeh discs, lens-flare ghosts, the sun corona, the scrolling stream stripes
 * and the water caustics are all just 2D gradients. Results are memoised, since
 * a texture is only ever built once per distinct look.
 */

import * as THREE from 'three';

const cache = new Map();

/** Build-once helper: `memo('key', () => texture)`. */
function memo(key, build) {
  let tex = cache.get(key);
  if (!tex) {
    tex = build();
    cache.set(key, tex);
  }
  return tex;
}

function canvas(size, height) {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = height ?? size;
  return c;
}

/** Wrap a canvas as a colour texture with the right colour space + filtering. */
function toTexture(c, { repeat = false } = {}) {
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  if (repeat) {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
  } else {
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
  }
  tex.needsUpdate = true;
  return tex;
}

/* ==========================================================================
   Glows and sprites
   ========================================================================== */

/**
 * Soft radial glow — the workhorse sprite behind orbs, sparkles, the sun and
 * the wisp itself. `falloff` shapes how tight the core is: a higher exponent
 * gives a small hot centre with a wide faint halo, which is what reads as
 * "bloom source" once UnrealBloomPass gets hold of it.
 */
export function glowTexture(color = '#ffffff', falloff = 2.6, size = 256) {
  return memo(`glow:${color}:${falloff}:${size}`, () => {
    const c = canvas(size);
    const ctx = c.getContext('2d');
    const r = size / 2;
    const img = ctx.createImageData(size, size);
    const rgb = new THREE.Color(color);
    const cr = rgb.r * 255, cg = rgb.g * 255, cb = rgb.b * 255;

    // Drawn per-pixel rather than with a canvas gradient so the falloff curve
    // is exact — canvas colour-stop interpolation banded visibly under bloom.
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = (x - r) / r;
        const dy = (y - r) / r;
        const d = Math.sqrt(dx * dx + dy * dy);
        const a = d >= 1 ? 0 : Math.pow(1 - d, falloff);
        const i = (y * size + x) * 4;
        img.data[i] = cr;
        img.data[i + 1] = cg;
        img.data[i + 2] = cb;
        img.data[i + 3] = Math.round(a * 255);
      }
    }
    ctx.putImageData(img, 0, 0);
    return toTexture(c);
  });
}

/** Crisp-edged disc with a soft rim — the classic out-of-focus bokeh circle. */
export function bokehTexture(color = '#ffffff', size = 128) {
  return memo(`bokeh:${color}:${size}`, () => {
    const c = canvas(size);
    const ctx = c.getContext('2d');
    const r = size / 2;
    const g = ctx.createRadialGradient(r, r, 0, r, r, r);
    g.addColorStop(0.0, hexToRgba(color, 0.30));
    g.addColorStop(0.62, hexToRgba(color, 0.36));
    g.addColorStop(0.86, hexToRgba(color, 0.62)); // bright rim
    g.addColorStop(0.96, hexToRgba(color, 0.18));
    g.addColorStop(1.0, hexToRgba(color, 0.0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(r, r, r, 0, Math.PI * 2);
    ctx.fill();
    return toTexture(c);
  });
}

/** Four-point sparkle star for the wisp trail. */
export function sparkTexture(color = '#ffffff', size = 128) {
  return memo(`spark:${color}:${size}`, () => {
    const c = canvas(size);
    const ctx = c.getContext('2d');
    const r = size / 2;

    const halo = ctx.createRadialGradient(r, r, 0, r, r, r);
    halo.addColorStop(0, hexToRgba(color, 0.95));
    halo.addColorStop(0.22, hexToRgba(color, 0.42));
    halo.addColorStop(1, hexToRgba(color, 0));
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, size, size);

    // Two crossed needles make the star points.
    ctx.globalCompositeOperation = 'lighter';
    for (const angle of [0, Math.PI / 2]) {
      ctx.save();
      ctx.translate(r, r);
      ctx.rotate(angle);
      const g = ctx.createLinearGradient(-r, 0, r, 0);
      g.addColorStop(0, hexToRgba(color, 0));
      g.addColorStop(0.5, hexToRgba(color, 0.9));
      g.addColorStop(1, hexToRgba(color, 0));
      ctx.fillStyle = g;
      ctx.fillRect(-r, -size * 0.018, size, size * 0.036);
      ctx.restore();
    }
    return toTexture(c);
  });
}

/** Sun disc: blown-out white core, warm corona, faint outer bloom. */
export function sunTexture(size = 512) {
  return memo(`sun:${size}`, () => {
    const c = canvas(size);
    const ctx = c.getContext('2d');
    const r = size / 2;
    const g = ctx.createRadialGradient(r, r, 0, r, r, r);
    g.addColorStop(0.00, 'rgba(255,255,255,1)');
    g.addColorStop(0.11, 'rgba(255,253,236,1)');
    g.addColorStop(0.18, 'rgba(255,233,133,0.95)');
    g.addColorStop(0.30, 'rgba(255,210,76,0.55)');
    g.addColorStop(0.52, 'rgba(255,214,120,0.20)');
    g.addColorStop(0.78, 'rgba(255,235,180,0.06)');
    g.addColorStop(1.00, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return toTexture(c);
  });
}

/** Hollow iris ring — the lens-flare "ghost" that mirrors the sun on-screen. */
export function flareRingTexture(color = '#C9A9F0', size = 128) {
  return memo(`flarering:${color}:${size}`, () => {
    const c = canvas(size);
    const ctx = c.getContext('2d');
    const r = size / 2;
    const g = ctx.createRadialGradient(r, r, 0, r, r, r);
    g.addColorStop(0.0, hexToRgba(color, 0.0));
    g.addColorStop(0.55, hexToRgba(color, 0.05));
    g.addColorStop(0.76, hexToRgba(color, 0.55));
    g.addColorStop(0.90, hexToRgba(color, 0.22));
    g.addColorStop(1.0, hexToRgba(color, 0.0));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return toTexture(c);
  });
}

/** Wide horizontal anamorphic streak across the sun. */
export function streakTexture(color = '#FFE985', w = 512, h = 64) {
  return memo(`streak:${color}:${w}x${h}`, () => {
    const c = canvas(w, h);
    const ctx = c.getContext('2d');
    const gx = ctx.createLinearGradient(0, 0, w, 0);
    gx.addColorStop(0.0, hexToRgba(color, 0));
    gx.addColorStop(0.5, hexToRgba(color, 1));
    gx.addColorStop(1.0, hexToRgba(color, 0));
    ctx.fillStyle = gx;
    ctx.fillRect(0, 0, w, h);

    // Vertical falloff, multiplied in so the streak tapers to a thin line.
    const gy = ctx.createLinearGradient(0, 0, 0, h);
    gy.addColorStop(0.0, 'rgba(0,0,0,1)');
    gy.addColorStop(0.5, 'rgba(0,0,0,0)');
    gy.addColorStop(1.0, 'rgba(0,0,0,1)');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = gy;
    ctx.fillRect(0, 0, w, h);
    return toTexture(c);
  });
}

/* ==========================================================================
   Tiling / world textures
   ========================================================================== */

/**
 * Current-stream ribbon: soft lengthwise stripes that get scrolled by
 * animating `texture.offset.y`, plus an edge falloff across the width so the
 * ribbon fades out at its borders instead of ending on a hard line.
 * Tiles vertically (along the ribbon), clamps across it.
 */
export function streamTexture(color = '#7FF3E4', size = 256) {
  return memo(`stream:${color}:${size}`, () => {
    const c = canvas(size);
    const ctx = c.getContext('2d');
    ctx.fillStyle = hexToRgba(color, 0.16);
    ctx.fillRect(0, 0, size, size);

    // Lengthwise bands of varying brightness read as flowing current.
    ctx.globalCompositeOperation = 'lighter';
    const bands = 9;
    for (let i = 0; i < bands; i++) {
      const y = (i / bands) * size;
      const h = size / bands;
      const g = ctx.createLinearGradient(0, y, 0, y + h);
      g.addColorStop(0.0, hexToRgba(color, 0.0));
      g.addColorStop(0.45, hexToRgba(color, 0.55 + 0.35 * Math.sin(i * 2.1)));
      g.addColorStop(1.0, hexToRgba(color, 0.0));
      ctx.fillStyle = g;
      ctx.fillRect(0, y, size, h);
    }

    // Bright core down the middle of the ribbon.
    const core = ctx.createLinearGradient(0, 0, size, 0);
    core.addColorStop(0.0, 'rgba(255,255,255,0)');
    core.addColorStop(0.5, 'rgba(255,255,255,0.55)');
    core.addColorStop(1.0, 'rgba(255,255,255,0)');
    ctx.fillStyle = core;
    ctx.fillRect(0, 0, size, size);

    // Feather the ribbon edges.
    ctx.globalCompositeOperation = 'destination-out';
    const edge = ctx.createLinearGradient(0, 0, size, 0);
    edge.addColorStop(0.0, 'rgba(0,0,0,1)');
    edge.addColorStop(0.22, 'rgba(0,0,0,0)');
    edge.addColorStop(0.78, 'rgba(0,0,0,0)');
    edge.addColorStop(1.0, 'rgba(0,0,0,1)');
    ctx.fillStyle = edge;
    ctx.fillRect(0, 0, size, size);

    const tex = toTexture(c, { repeat: true });
    tex.wrapS = THREE.ClampToEdgeWrapping; // across the ribbon
    tex.wrapT = THREE.RepeatWrapping;      // along the ribbon (scrolled)
    return tex;
  });
}

/**
 * Seamless caustic-ish blobs used to shimmer the water surface. Built from
 * overlapping soft circles wrapped around the edges so the tile has no seam.
 */
export function causticTexture(size = 256) {
  return memo(`caustic:${size}`, () => {
    const c = canvas(size);
    const ctx = c.getContext('2d');
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, size, size);
    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < 40; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = size * (0.04 + Math.random() * 0.10);
      // Draw each blob nine times (3x3 wrap) so it tiles seamlessly.
      for (let ox = -1; ox <= 1; ox++) {
        for (let oy = -1; oy <= 1; oy++) {
          const g = ctx.createRadialGradient(
            x + ox * size, y + oy * size, 0,
            x + ox * size, y + oy * size, r,
          );
          g.addColorStop(0, 'rgba(255,255,255,0.5)');
          g.addColorStop(0.5, 'rgba(255,255,255,0.14)');
          g.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = g;
          ctx.fillRect(x + ox * size - r, y + oy * size - r, r * 2, r * 2);
        }
      }
    }
    const tex = toTexture(c, { repeat: true });
    tex.colorSpace = THREE.NoColorSpace; // sampled as a scalar mask, not colour
    return tex;
  });
}

/** Soft vertical gradient for underwater god-rays. */
export function shaftTexture(color = '#DFFBFF', w = 64, h = 256) {
  return memo(`shaft:${color}:${w}x${h}`, () => {
    const c = canvas(w, h);
    const ctx = c.getContext('2d');
    // The top stop MUST reach zero alpha. Starting the gradient part-way up
    // leaves a hard horizontal line along the quad's top edge, which is
    // invisible on a small distant shaft and turns into a screen-wide seam once
    // a World scales its veils up — exactly the sort of artefact that reads as
    // a rendering bug rather than a light shaft.
    const gy = ctx.createLinearGradient(0, 0, 0, h);
    gy.addColorStop(0.0, hexToRgba(color, 0.0));
    gy.addColorStop(0.14, hexToRgba(color, 0.55));
    gy.addColorStop(0.52, hexToRgba(color, 0.20));
    gy.addColorStop(1.0, hexToRgba(color, 0.0));
    ctx.fillStyle = gy;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'destination-out';
    const gx = ctx.createLinearGradient(0, 0, w, 0);
    gx.addColorStop(0.0, 'rgba(0,0,0,1)');
    gx.addColorStop(0.5, 'rgba(0,0,0,0)');
    gx.addColorStop(1.0, 'rgba(0,0,0,1)');
    ctx.fillStyle = gx;
    ctx.fillRect(0, 0, w, h);
    return toTexture(c);
  });
}

/**
 * Aurora ribbon: a soft band with wavy internal filaments, stretched wide and
 * rolled nearly flat by Aurora Reach's veil settings. The filaments are what
 * stop it reading as a plain blurred rectangle.
 */
export function auroraTexture(color = '#8CF0D0', w = 512, h = 128) {
  return memo(`aurora:${color}:${w}x${h}`, () => {
    const c = canvas(w, h);
    const ctx = c.getContext('2d');

    // Base band, brightest along the lower edge the way a real curtain hangs.
    const base = ctx.createLinearGradient(0, 0, 0, h);
    base.addColorStop(0.0, hexToRgba(color, 0.0));
    base.addColorStop(0.35, hexToRgba(color, 0.22));
    base.addColorStop(0.72, hexToRgba(color, 0.48));
    base.addColorStop(1.0, hexToRgba(color, 0.0));
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    // Vertical filaments on a slow sine so the curtain has structure.
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 26; i++) {
      const x = (i / 26) * w + Math.sin(i * 1.7) * 12;
      const width = 3 + Math.abs(Math.sin(i * 2.3)) * 9;
      const g = ctx.createLinearGradient(x - width, 0, x + width, 0);
      g.addColorStop(0.0, hexToRgba(color, 0));
      g.addColorStop(0.5, hexToRgba(color, 0.18 + 0.16 * Math.sin(i * 0.9)));
      g.addColorStop(1.0, hexToRgba(color, 0));
      ctx.fillStyle = g;
      ctx.fillRect(x - width, h * 0.18, width * 2, h * 0.82);
    }

    // Feather both ends so the ribbon never terminates on a hard edge.
    ctx.globalCompositeOperation = 'destination-out';
    const ends = ctx.createLinearGradient(0, 0, w, 0);
    ends.addColorStop(0.0, 'rgba(0,0,0,1)');
    ends.addColorStop(0.18, 'rgba(0,0,0,0)');
    ends.addColorStop(0.82, 'rgba(0,0,0,0)');
    ends.addColorStop(1.0, 'rgba(0,0,0,1)');
    ctx.fillStyle = ends;
    ctx.fillRect(0, 0, w, h);

    return toTexture(c);
  });
}

/**
 * Portal interior: concentric refraction rings with a swirl, scrolled radially
 * at runtime. A portal has to read as an *invitation* rather than a hazard, so
 * this stays bright and open in the middle instead of dark and solid.
 */
export function portalTexture(color = '#B8F0FF', size = 512) {
  return memo(`portal:${color}:${size}`, () => {
    const c = canvas(size);
    const ctx = c.getContext('2d');
    const r = size / 2;

    // Open, luminous centre.
    const core = ctx.createRadialGradient(r, r, 0, r, r, r);
    core.addColorStop(0.0, hexToRgba('#FFFFFF', 0.55));
    core.addColorStop(0.30, hexToRgba(color, 0.34));
    core.addColorStop(0.72, hexToRgba(color, 0.16));
    core.addColorStop(1.0, hexToRgba(color, 0.0));
    ctx.fillStyle = core;
    ctx.fillRect(0, 0, size, size);

    // Swirled refraction arcs.
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = size * 0.006;
    for (let i = 0; i < 34; i++) {
      const t = i / 34;
      const radius = r * (0.14 + t * 0.82);
      const a0 = t * 9.1;
      const sweep = 1.1 + Math.sin(i * 1.9) * 0.7;
      ctx.strokeStyle = hexToRgba(i % 3 === 0 ? '#FFFFFF' : color, 0.30 * (1 - t * 0.55));
      ctx.beginPath();
      ctx.arc(r, r, radius, a0, a0 + sweep);
      ctx.stroke();
    }

    // Trim to a clean circle.
    ctx.globalCompositeOperation = 'destination-in';
    const mask = ctx.createRadialGradient(r, r, 0, r, r, r);
    mask.addColorStop(0.0, 'rgba(0,0,0,1)');
    mask.addColorStop(0.86, 'rgba(0,0,0,1)');
    mask.addColorStop(1.0, 'rgba(0,0,0,0)');
    ctx.fillStyle = mask;
    ctx.fillRect(0, 0, size, size);

    return toTexture(c);
  });
}

/** Thin bright annulus — the "Halo" aura, and the checkpoint pass ripple. */
export function haloRingTexture(color = '#CFEFFA', size = 256) {
  return memo(`halo:${color}:${size}`, () => {
    const c = canvas(size);
    const ctx = c.getContext('2d');
    const r = size / 2;
    const g = ctx.createRadialGradient(r, r, 0, r, r, r);
    g.addColorStop(0.00, hexToRgba(color, 0.0));
    g.addColorStop(0.68, hexToRgba(color, 0.0));
    g.addColorStop(0.82, hexToRgba(color, 0.85));
    g.addColorStop(0.90, hexToRgba('#FFFFFF', 0.95));
    g.addColorStop(0.97, hexToRgba(color, 0.16));
    g.addColorStop(1.00, hexToRgba(color, 0.0));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return toTexture(c);
  });
}

/**
 * Chromatic disc for the Prism Bloom aura and the Crystal Atrium accents.
 * Held to pastel wedges rather than saturated primaries — this is a prism
 * caustic on wet glass, not an RGB fan.
 */
export function prismDiscTexture(size = 256) {
  return memo(`prism:${size}`, () => {
    const c = canvas(size);
    const ctx = c.getContext('2d');
    const r = size / 2;
    const wedges = ['#FFD9E8', '#FFE9B8', '#DCF6C8', '#BFF0F5', '#CFD8FA', '#E8CFF6'];

    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < wedges.length; i++) {
      const a0 = (i / wedges.length) * Math.PI * 2;
      const a1 = ((i + 1.35) / wedges.length) * Math.PI * 2;
      const g = ctx.createRadialGradient(r, r, r * 0.12, r, r, r);
      g.addColorStop(0.0, hexToRgba(wedges[i], 0.0));
      g.addColorStop(0.55, hexToRgba(wedges[i], 0.42));
      g.addColorStop(1.0, hexToRgba(wedges[i], 0.0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(r, r);
      ctx.arc(r, r, r, a0, a1);
      ctx.closePath();
      ctx.fill();
    }

    // Hot centre so it still reads at small sizes.
    const core = ctx.createRadialGradient(r, r, 0, r, r, r * 0.4);
    core.addColorStop(0, 'rgba(255,255,255,0.7)');
    core.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = core;
    ctx.fillRect(0, 0, size, size);

    ctx.globalCompositeOperation = 'destination-in';
    const mask = ctx.createRadialGradient(r, r, 0, r, r, r);
    mask.addColorStop(0.0, 'rgba(0,0,0,1)');
    mask.addColorStop(0.9, 'rgba(0,0,0,1)');
    mask.addColorStop(1.0, 'rgba(0,0,0,0)');
    ctx.fillStyle = mask;
    ctx.fillRect(0, 0, size, size);

    return toTexture(c);
  });
}

/**
 * Scrolling energy band for checkpoint arches. Tiles along its length so the
 * arch's light appears to run around the gate.
 */
export function bandTexture(color = '#8CFFF0', w = 256, h = 64) {
  return memo(`band:${color}:${w}x${h}`, () => {
    const c = canvas(w, h);
    const ctx = c.getContext('2d');
    ctx.fillStyle = hexToRgba(color, 0.18);
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';
    const pulses = 6;
    for (let i = 0; i < pulses; i++) {
      const x = (i / pulses) * w;
      const g = ctx.createLinearGradient(x, 0, x + w / pulses, 0);
      g.addColorStop(0.0, hexToRgba(color, 0.0));
      g.addColorStop(0.42, hexToRgba('#FFFFFF', 0.75));
      g.addColorStop(0.58, hexToRgba(color, 0.5));
      g.addColorStop(1.0, hexToRgba(color, 0.0));
      ctx.fillStyle = g;
      ctx.fillRect(x, 0, w / pulses, h);
    }

    // Soften top and bottom so the band has a rounded, gel-like profile.
    ctx.globalCompositeOperation = 'destination-out';
    const gy = ctx.createLinearGradient(0, 0, 0, h);
    gy.addColorStop(0.0, 'rgba(0,0,0,0.85)');
    gy.addColorStop(0.5, 'rgba(0,0,0,0)');
    gy.addColorStop(1.0, 'rgba(0,0,0,0.85)');
    ctx.fillStyle = gy;
    ctx.fillRect(0, 0, w, h);

    const tex = toTexture(c, { repeat: true });
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  });
}

/* ==========================================================================
   Helpers
   ========================================================================== */

function hexToRgba(hex, alpha) {
  const c = new THREE.Color(hex);
  return `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},${alpha})`;
}

/** Release every cached GPU texture (used on teardown). */
export function disposeTextures() {
  for (const tex of cache.values()) tex.dispose();
  cache.clear();
}
