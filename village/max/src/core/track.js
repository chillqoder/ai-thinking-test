import { assertLoopable } from './math.js';

/**
 * A periodic animation curve through keyframes.
 *
 * Values are interpolated with a monotone cubic (Steffen) spline that wraps around
 * the period, so the curve is smooth (C1) everywhere – including across the loop
 * seam – and never overshoots a key: holds stay perfectly still and extremes are
 * eased into, which gives the calm pose-to-pose feel the scene needs.
 *
 * `wrap` lets a channel grow by a fixed amount every period (e.g. a heading that
 * turns 2π per cycle, or a path parameter that does one lap per cycle).
 */
export class CyclicTrack {
  constructor(period, keys, wrap = 0) {
    const sorted = keys
      .map(([t, v]) => [((t % period) + period) % period, v])
      .sort((a, b) => a[0] - b[0]);
    const clean = [];
    for (const k of sorted) {
      if (clean.length && Math.abs(clean[clean.length - 1][0] - k[0]) < 1e-6) {
        if (clean[clean.length - 1][1] !== k[1]) console.warn('[track] conflicting keys at the same time (a key at t = period aliases onto t = 0)', k);
        clean[clean.length - 1] = k;
      } else clean.push(k);
    }
    const n = clean.length;
    this.period = period;
    this.wrap = wrap;
    this.n = n;
    this.t = new Float64Array(n + 1);
    this.v = new Float64Array(n + 1);
    this.m = new Float64Array(n + 1);
    for (let i = 0; i < n; i++) {
      this.t[i] = clean[i][0];
      this.v[i] = clean[i][1];
    }
    this.t[n] = this.t[0] + period;
    this.v[n] = this.v[0] + wrap;

    for (let i = 0; i < n; i++) {
      const tp = i === 0 ? this.t[n - 1] - period : this.t[i - 1];
      const vp = i === 0 ? this.v[n - 1] - wrap : this.v[i - 1];
      const tn = this.t[i + 1];
      const vn = this.v[i + 1];
      const h0 = this.t[i] - tp;
      const h1 = tn - this.t[i];
      const s0 = (this.v[i] - vp) / h0;
      const s1 = (vn - this.v[i]) / h1;
      let m = 0;
      if (s0 * s1 > 0) {
        const p = (s0 * h1 + s1 * h0) / (h0 + h1);
        m = 2 * Math.sign(s0) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p));
      }
      this.m[i] = m;
    }
    this.m[n] = this.m[0];
  }

  sample(time) {
    const { period, n, t, v, m } = this;
    const rel = time - t[0];
    const cycle = Math.floor(rel / period);
    const tau = t[0] + (rel - cycle * period);
    let lo = 0;
    let hi = n - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (t[mid] <= tau) lo = mid;
      else hi = mid - 1;
    }
    const i = lo;
    const h = t[i + 1] - t[i];
    const u = (tau - t[i]) / h;
    const u2 = u * u;
    const u3 = u2 * u;
    const value =
      (2 * u3 - 3 * u2 + 1) * v[i] +
      (u3 - 2 * u2 + u) * h * m[i] +
      (-2 * u3 + 3 * u2) * v[i + 1] +
      (u3 - u2) * h * m[i + 1];
    return value + cycle * this.wrap;
  }
}

/**
 * A periodic clip made of keyframed poses: `frames = [[time, {channel: value}], ...]`.
 *
 * Channels containing a dot ("armL.rx", "hips.py") are pose channels: a frame that
 * does not mention one is treated as the rest value 0, so every frame is a complete
 * pose. Other channels ("s", "turn", "bucket") are free channels and are only keyed
 * where they are mentioned.
 */
export class Clip {
  constructor(period, frames, { wraps = {}, label = 'clip' } = {}) {
    assertLoopable(period, label);
    this.period = period;
    const poseChannels = new Set();
    for (const [, pose] of frames) for (const k in pose) if (k.includes('.')) poseChannels.add(k);
    const keys = new Map();
    const push = (name, key) => {
      if (!keys.has(name)) keys.set(name, []);
      keys.get(name).push(key);
    };
    for (const [time, pose] of frames) {
      for (const ch of poseChannels) push(ch, [time, pose[ch] ?? 0]);
      for (const k in pose) if (!k.includes('.')) push(k, [time, pose[k]]);
    }
    this.names = [];
    this.tracks = [];
    for (const [name, list] of keys) {
      this.names.push(name);
      this.tracks.push(new CyclicTrack(period, list, wraps[name] ?? 0));
    }
  }

  sample(time, out = {}) {
    for (let i = 0; i < this.names.length; i++) out[this.names[i]] = this.tracks[i].sample(time);
    return out;
  }
}

/** Merge pose objects left-to-right (later keys win). */
export function pose(...parts) {
  return Object.assign({}, ...parts);
}

/** Add pose channels onto `target` (missing channels count as 0). */
export function addPose(target, extra, weight = 1) {
  for (const k in extra) target[k] = (target[k] ?? 0) + extra[k] * weight;
  return target;
}
