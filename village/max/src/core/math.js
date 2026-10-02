import { LOOP } from '../config.js';

export const TAU = Math.PI * 2;

export const clamp = (v, lo = 0, hi = 1) => (v < lo ? lo : v > hi ? hi : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const fract = (x) => x - Math.floor(x);
export const mod = (x, m) => ((x % m) + m) % m;

export function smoothstep(e0, e1, x) {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
}

/** Smooth 0→1→0 window: rises over [a, b], holds, falls over [c, d]. */
export function windowed(x, a, b, c, d) {
  return smoothstep(a, b, x) * (1 - smoothstep(c, d, x));
}

/** Shortest signed difference b − a between two angles. */
export function angleDelta(a, b) {
  return mod(b - a + Math.PI, TAU) - Math.PI;
}

export function angleLerp(a, b, t) {
  return a + angleDelta(a, b) * t;
}

/** Heading (rotation.y) that makes a +Z-facing model look along (dx, dz). */
export const headingOf = (dx, dz) => Math.atan2(dx, dz);

// ---------------------------------------------------------------------------
// Loop helpers. Frequencies are expressed as integer cycles per loop so that
// every oscillation lines up perfectly when the loop wraps around.
// ---------------------------------------------------------------------------

/** sin wave that completes `cycles` (integer) periods per loop. */
export const wave = (t, cycles, offset = 0) => Math.sin(TAU * (cycles * t / LOOP + offset));

/** Phase in [0,1) of a sub-cycle whose period divides the loop. */
export const cyclePhase = (t, period, offset = 0) => fract((t + offset) / period);

export function assertLoopable(period, label = 'cycle') {
  const n = LOOP / period;
  if (Math.abs(n - Math.round(n)) > 1e-6) {
    console.warn(`[loop] ${label} period ${period}s does not divide the ${LOOP}s loop`);
  }
}

// ---------------------------------------------------------------------------
// Deterministic randomness & noise (the island is identical on every load).
// ---------------------------------------------------------------------------

export function rng(seed = 1) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    range: (lo, hi) => lo + (hi - lo) * next(),
    int: (lo, hi) => Math.floor(lo + (hi - lo + 1) * next()),
    pick: (arr) => arr[Math.floor(next() * arr.length) % arr.length],
    sign: () => (next() < 0.5 ? -1 : 1),
  };
}

function hash2i(ix, iz, seed) {
  let h = Math.imul(ix, 374761393) ^ Math.imul(iz, 668265263) ^ Math.imul(seed + 1, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

/** Smooth value noise in [-1, 1]. */
export function noise2(x, z, seed = 0) {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx);
  const uz = fz * fz * (3 - 2 * fz);
  const a = hash2i(ix, iz, seed);
  const b = hash2i(ix + 1, iz, seed);
  const c = hash2i(ix, iz + 1, seed);
  const d = hash2i(ix + 1, iz + 1, seed);
  return lerp(lerp(a, b, ux), lerp(c, d, ux), uz) * 2 - 1;
}

export function fbm2(x, z, octaves = 3, seed = 0) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * noise2(x * freq, z * freq, seed + i * 31);
    norm += amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return sum / norm;
}

/** Hash of a 3D position – used to displace shared vertices consistently. */
export function hash3(x, y, z, seed = 0) {
  const q = (v) => Math.round(v * 1000);
  let h = Math.imul(q(x), 73856093) ^ Math.imul(q(y), 19349663) ^ Math.imul(q(z), 83492791) ^ Math.imul(seed + 7, 2654435761);
  h = Math.imul(h ^ (h >>> 15), 2246822519);
  h ^= h >>> 13;
  return (h >>> 0) / 4294967296;
}

// ---------------------------------------------------------------------------
// 2D geometry helpers
// ---------------------------------------------------------------------------

/** Distance from point to polyline [[x,z],...] and the arc-length parameter (0..1) of the closest point. */
export function polylineDistance(x, z, pts, out = {}) {
  let best = Infinity;
  let bestS = 0;
  let acc = 0;
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) total += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i];
    const [bx, bz] = pts[i + 1];
    const dx = bx - ax;
    const dz = bz - az;
    const len2 = dx * dx + dz * dz;
    const len = Math.sqrt(len2);
    const u = len2 > 0 ? clamp(((x - ax) * dx + (z - az) * dz) / len2) : 0;
    const px = ax + dx * u;
    const pz = az + dz * u;
    const d = Math.hypot(x - px, z - pz);
    if (d < best) {
      best = d;
      bestS = (acc + u * len) / total;
    }
    acc += len;
  }
  out.d = best;
  out.s = bestS;
  return out;
}

/** Point on a polyline at arc-length fraction s. */
export function polylinePoint(pts, s, out = [0, 0]) {
  let total = 0;
  const lens = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const l = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
    lens.push(l);
    total += l;
  }
  let target = clamp(s) * total;
  for (let i = 0; i < lens.length; i++) {
    if (target <= lens[i] || i === lens.length - 1) {
      const u = lens[i] > 0 ? clamp(target / lens[i]) : 0;
      out[0] = lerp(pts[i][0], pts[i + 1][0], u);
      out[1] = lerp(pts[i][1], pts[i + 1][1], u);
      return out;
    }
    target -= lens[i];
  }
  return out;
}
