// Loop-time helpers.
//
// The whole simulation is a pure function of loop time t ∈ [0, LOOP). Nothing
// integrates state frame-to-frame, so t = LOOP is exactly t = 0 and the scene
// can never drift. Every periodic motion must therefore use a period that
// divides LOOP evenly; `phase()` warns once if one does not.

export const LOOP = 60;
export const TAU = Math.PI * 2;

export const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, k) => a + (b - a) * k;
export const fract = (v) => v - Math.floor(v);
export const mod = (v, m) => ((v % m) + m) % m;

/** Smoothstep easing of k ∈ [0,1] (clamped). */
export const smooth = (k) => {
  k = clamp(k);
  return k * k * (3 - 2 * k);
};
/** Quintic smootherstep — zero velocity and acceleration at both ends. */
export const smoother = (k) => {
  k = clamp(k);
  return k * k * k * (k * (k * 6 - 15) + 10);
};
export const easeIn = (k) => {
  k = clamp(k);
  return k * k;
};
export const easeOut = (k) => {
  k = clamp(k);
  return 1 - (1 - k) * (1 - k);
};

/** Eased 0→1 ramp over [a, b]. */
export const ramp = (t, a, b) => smooth((t - a) / (b - a));
/** Linear 0→1 ramp over [a, b]. */
export const lin = (t, a, b) => clamp((t - a) / (b - a));
/** Eased 0→1 over [a,b], hold, eased 1→0 over [c,d]. */
export const hold = (t, a, b, c, d) => ramp(t, a, b) * (1 - ramp(t, c, d));
/** Smooth hump 0→1→0 over [a, b]. */
export const hump = (t, a, b) => {
  const k = clamp((t - a) / (b - a));
  return Math.sin(Math.PI * k) ** 2;
};

const checked = new Set();
function checkPeriod(p) {
  if (checked.has(p)) return;
  checked.add(p);
  const n = LOOP / p;
  if (Math.abs(n - Math.round(n)) > 1e-6) console.warn(`[loop] period ${p}s does not divide ${LOOP}s — motion will pop at the loop seam`);
}

/** Normalised phase 0..1 of a cycle with the given period (seconds). `offset` is in cycles. */
export function phase(t, period, offset = 0) {
  checkPeriod(period);
  return fract(t / period + offset);
}
/** Seconds elapsed inside the current cycle. */
export function local(t, period, offset = 0) {
  return phase(t, period, offset) * period;
}
/** Sine oscillation with a loop-safe period. */
export function osc(t, period, offset = 0) {
  return Math.sin(TAU * phase(t, period, offset));
}
/** Cosine oscillation with a loop-safe period. */
export function cosc(t, period, offset = 0) {
  return Math.cos(TAU * phase(t, period, offset));
}

/** Shortest-path angle interpolation. */
export function lerpAngle(a, b, k) {
  let d = mod(b - a + Math.PI, TAU) - Math.PI;
  return a + d * k;
}

/**
 * Smoothly interpolated keyframe track over one period.
 * keys: [[time, value], ...] sorted by time inside [0, period). The track wraps,
 * interpolating from the last key back to the first across the period seam.
 * Values may be numbers or arrays of numbers.
 */
export function track(keys, period = LOOP, ease = smooth) {
  checkPeriod(period);
  const n = keys.length;
  return (t) => {
    const tt = mod(t, period);
    let i = n - 1;
    for (let k = 0; k < n; k++) {
      if (keys[k][0] > tt) {
        i = k - 1;
        break;
      }
    }
    let a, b, ta, tb;
    if (i < 0) {
      a = keys[n - 1];
      b = keys[0];
      ta = a[0] - period;
      tb = b[0];
    } else if (i === n - 1) {
      a = keys[n - 1];
      b = keys[0];
      ta = a[0];
      tb = b[0] + period;
    } else {
      a = keys[i];
      b = keys[i + 1];
      ta = a[0];
      tb = b[0];
    }
    const k = tb > ta ? ease((tt - ta) / (tb - ta)) : 0;
    if (Array.isArray(a[1])) return a[1].map((v, j) => lerp(v, b[1][j], k));
    return lerp(a[1], b[1], k);
  };
}
