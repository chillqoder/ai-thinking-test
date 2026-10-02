// Loop math. Every animated value in the scene is a pure function of loop time
// `t` in [0, LOOP). Anything periodic must repeat an *integer* number of times
// per loop, which is what `ph` / `osc` enforce — so t = LOOP is identical to t = 0.

export const LOOP = 60;
export const TAU = Math.PI * 2;

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, f) => a + (b - a) * f;
export const fract = (x) => x - Math.floor(x);
export const smooth = (x) => {
  x = clamp(x);
  return x * x * (3 - 2 * x);
};
export const linear = (x) => clamp(x);

/** Phase in [0,1) of something that repeats `cycles` (integer) times per loop. */
export const ph = (t, cycles, offset = 0) => fract((t * cycles) / LOOP + offset);
/** Sine that completes `cycles` (integer) periods per loop. */
export const osc = (t, cycles, offset = 0) => Math.sin(TAU * ((t * cycles) / LOOP + offset));

/** Linear 0..1 progress of u through [a, b]. */
export const range = (u, a, b) => clamp((u - a) / (b - a));
export const sRange = (u, a, b) => smooth(range(u, a, b));
/** 0 outside [a,b], 1 inside, with smooth ramps of width `ramp`. */
export const bump = (u, a, b, ramp = 0.05) =>
  smooth(range(u, a, a + ramp)) * (1 - smooth(range(u, b - ramp, b)));

/** Movement easing: trapezoidal velocity (accelerate, cruise, decelerate). */
export function walkEase(x, a = 0.18) {
  x = clamp(x);
  const v = 1 / (1 - a);
  if (x < a) return (v * x * x) / (2 * a);
  if (x > 1 - a) return 1 - (v * (1 - x) * (1 - x)) / (2 * a);
  return v * (x - a / 2);
}

function interp(a, b, f) {
  if (typeof a === 'number') return a + (b - a) * f;
  return a.map((v, i) => v + (b[i] - v) * f);
}

/**
 * Periodic keyframe track. keys = [[u, value], ...] sorted by u in [0,1).
 * The segment after the last key wraps around to the first, so a track is
 * seamless as long as nothing jumps between keys. Values may be numbers or arrays.
 * A key may carry its own easing as a third element (applies to the segment it starts).
 */
export function track(u, keys, ease = smooth) {
  const n = keys.length;
  let i = n - 1;
  for (let k = 0; k < n; k++) {
    if (keys[k][0] > u) {
      i = k - 1;
      break;
    }
  }
  if (i < 0) i = n - 1;
  const a = keys[i];
  const b = keys[(i + 1) % n];
  let ua = a[0];
  let ub = b[0];
  let uu = u;
  if (ub <= ua) {
    ub += 1;
    if (uu < ua) uu += 1;
  }
  const e = a[2] || ease;
  return interp(a[1], b[1], e((uu - ua) / (ub - ua)));
}

/** Deterministic PRNG so the world layout is identical on every load. */
export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
