import * as THREE from 'three';
import { TAU, clamp, fract } from './math.js';

/**
 * Precomputes how far a character travels during its (periodic) motion so that
 * leg cycles are driven by distance – feet don't slide – while the total number of
 * steps per period is an integer, which keeps the walk cycle seamless at the loop seam.
 */
export class GaitTracker {
  constructor(period, positionAt, stride, samples = 1200) {
    this.period = period;
    this.samples = samples;
    const dist = new Float64Array(samples + 1);
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    positionAt(0, a);
    let total = 0;
    for (let i = 1; i <= samples; i++) {
      positionAt((i / samples) * period, b);
      total += Math.hypot(b.x - a.x, b.z - a.z);
      dist[i] = total;
      a.copy(b);
    }
    this.dist = dist;
    this.total = total;
    this.cycles = total > 1e-4 ? Math.max(1, Math.round(total / stride)) : 0;

    const dt = period / samples;
    const speed = new Float32Array(samples + 1);
    for (let i = 0; i <= samples; i++) {
      const i0 = i === 0 ? samples - 1 : i - 1;
      const i1 = i === samples ? 1 : i + 1;
      const seg0 = i === 0 ? dist[samples] - dist[samples - 1] : dist[i] - dist[i0];
      const seg1 = i === samples ? dist[1] - dist[0] : dist[i1] - dist[i];
      speed[i] = (seg0 + seg1) / (2 * dt);
    }
    this.speedTable = speed;
  }

  _lookup(table, t) {
    const u = fract(t / this.period) * this.samples;
    const i = Math.min(Math.floor(u), this.samples - 1);
    const f = u - i;
    return table[i] + (table[i + 1] - table[i]) * f;
  }

  /** Walk-cycle phase in "cycles" (each cycle = two steps). */
  phase(t) {
    if (!this.cycles) return 0;
    return (this._lookup(this.dist, t) / this.total) * this.cycles;
  }

  speed(t) {
    return this._lookup(this.speedTable, t);
  }
}

const add = (p, k, v) => {
  p[k] = (p[k] ?? 0) + v;
};

/**
 * Additive walk / run layer for the human rig.
 * amp ∈ [0,1] fades the gait in and out with speed, so starts and stops are smooth.
 */
export function addWalk(p, phase, amp, o = {}) {
  if (amp <= 1e-4) return p;
  const s = Math.sin(TAU * phase);
  const c = Math.cos(TAU * phase);
  const leg = (o.leg ?? 0.48) * amp;
  const knee = (o.knee ?? 0.75) * amp;
  const arm = (o.arm ?? 0.42) * amp;
  add(p, 'legL.rx', -leg * s);
  add(p, 'legR.rx', leg * s);
  add(p, 'shinL.rx', knee * Math.max(0, c) + 0.05 * amp);
  add(p, 'shinR.rx', knee * Math.max(0, -c) + 0.05 * amp);
  add(p, 'footL.rx', -0.25 * amp * Math.max(0, c) + 0.15 * amp * s);
  add(p, 'footR.rx', -0.25 * amp * Math.max(0, -c) - 0.15 * amp * s);
  if (!o.lockArmL) {
    add(p, 'armL.rx', arm * s);
    add(p, 'foreL.rx', -0.18 * amp - 0.12 * amp * Math.max(0, -s));
  }
  if (!o.lockArmR) {
    add(p, 'armR.rx', -arm * s);
    add(p, 'foreR.rx', -0.18 * amp - 0.12 * amp * Math.max(0, s));
  }
  add(p, 'hips.py', 0.025 * amp * Math.cos(2 * TAU * phase) - 0.012 * amp);
  add(p, 'hips.ry', 0.09 * amp * s);
  add(p, 'hips.rz', 0.025 * amp * c);
  add(p, 'chest.ry', -0.13 * amp * s);
  add(p, 'head.ry', 0.04 * amp * s);
  return p;
}

/** Run layer: bigger strides, bent arms, bounce and lean. */
export function addRun(p, phase, amp) {
  if (amp <= 1e-4) return p;
  const s = Math.sin(TAU * phase);
  const c = Math.cos(TAU * phase);
  add(p, 'legL.rx', -0.85 * amp * s - 0.15 * amp);
  add(p, 'legR.rx', 0.85 * amp * s - 0.15 * amp);
  add(p, 'shinL.rx', 1.25 * amp * Math.max(0, c) + 0.3 * amp);
  add(p, 'shinR.rx', 1.25 * amp * Math.max(0, -c) + 0.3 * amp);
  add(p, 'armL.rx', 0.8 * amp * s);
  add(p, 'armR.rx', -0.8 * amp * s);
  add(p, 'foreL.rx', -1.3 * amp);
  add(p, 'foreR.rx', -1.3 * amp);
  add(p, 'armL.rz', 0.12 * amp);
  add(p, 'armR.rz', -0.12 * amp);
  add(p, 'spine.rx', 0.18 * amp);
  add(p, 'hips.py', 0.05 * amp * Math.abs(c) - 0.02 * amp);
  add(p, 'hips.ry', 0.12 * amp * s);
  add(p, 'chest.ry', -0.18 * amp * s);
  return p;
}

/** Quadruped walk (diagonal leg pairs) for animals with legFL/legFR/legBL/legBR bones. */
export function addQuadWalk(p, phase, amp, swing = 0.5) {
  if (amp <= 1e-4) return p;
  const s = Math.sin(TAU * phase) * swing * amp;
  add(p, 'legFL.rx', -s);
  add(p, 'legBR.rx', -s);
  add(p, 'legFR.rx', s);
  add(p, 'legBL.rx', s);
  add(p, 'body.py', 0.02 * amp * Math.cos(2 * TAU * phase));
  add(p, 'body.rz', 0.03 * amp * Math.sin(TAU * phase));
  return p;
}

/** Speed-dependent gait amplitude. */
export const gaitAmp = (speed, ref) => clamp(speed / ref, 0, 1);
