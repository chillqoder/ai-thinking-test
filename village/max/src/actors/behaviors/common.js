import * as THREE from 'three';
import { angleDelta, clamp, fract, smoothstep, TAU, wave } from '../../core/math.js';
import { LOOP } from '../../config.js';
import { groundHeight } from '../../world/layout.js';

/** A smooth path along the ground through [x, z] points, sampled by arc length. */
export class GroundPath {
  constructor(points, closed = false) {
    this.curve = new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, 0, z)), closed, 'centripetal');
    this.curve.arcLengthDivisions = 400;
    this.length = this.curve.getLength();
    this.closed = closed;
    this._t = new THREE.Vector3();
  }

  point(s, out) {
    const u = this.closed ? fract(s) : clamp(s);
    this.curve.getPointAt(u, out);
    out.y = groundHeight(out.x, out.z);
    return out;
  }

  heading(s) {
    const u = this.closed ? fract(s) : clamp(s, 0, 0.9999);
    this.curve.getTangentAt(u, this._t);
    return Math.atan2(this._t.x, this._t.z);
  }

  /** Arc fraction of the point on the path nearest to (x, z). */
  nearest(x, z) {
    let best = 0;
    let bestD = Infinity;
    const p = new THREE.Vector3();
    for (let i = 0; i <= 800; i++) {
      this.curve.getPointAt(i / 800, p);
      const d = (p.x - x) ** 2 + (p.z - z) ** 2;
      if (d < bestD) {
        bestD = d;
        best = i / 800;
      }
    }
    return best;
  }
}

/** Keys for walking from s0 to s1 between t0 and t1 at near-constant speed (eased ends). */
export function walkKeys(t0, t1, s0, s1, ease = 0.6) {
  const e = Math.min(ease, (t1 - t0) / 3);
  const v = (s1 - s0) / (t1 - t0 - e);
  return [
    [t0, s0],
    [t0 + e, s0 + (v * e) / 2],
    [t1 - e, s1 - (v * e) / 2],
    [t1, s1],
  ];
}

const _a = new THREE.Vector3();
const _b = new THREE.Vector3();

/**
 * Facing direction for a character whose position is a pure function of time:
 * follows the direction of travel, and blends to `idleHeading` when (nearly) still.
 */
export function travelHeading(posFn, t, idleHeading, minSpeed = 0.25, dt = 0.2) {
  posFn(t - dt, _a);
  posFn(t + dt, _b);
  const dx = _b.x - _a.x;
  const dz = _b.z - _a.z;
  const speed = Math.hypot(dx, dz) / (2 * dt);
  const move = Math.atan2(dx, dz);
  const w = smoothstep(minSpeed * 0.4, minSpeed * 1.2, speed);
  return idleHeading + angleDelta(idleHeading, move) * w;
}

/** Like travelHeading, but a keyed weight (0 = idle heading, 1 = direction of travel) decides. */
export function steeredHeading(posFn, t, idleHeading, weight, dt = 0.2) {
  if (weight <= 0) return idleHeading;
  posFn(t - dt, _a);
  posFn(t + dt, _b);
  const move = Math.atan2(_b.x - _a.x, _b.z - _a.z);
  return idleHeading + angleDelta(idleHeading, move) * weight;
}

/**
 * Gentle breathing on the belly bone (15 breaths per loop = one every 4 s).
 * `p` must be a fresh pose object each frame. belly.s is assigned (not accumulated)
 * so a reused object can never make the belly grow without bound.
 */
export function breathe(p, t, amount = 0.035, offset = 0, cycles = 15) {
  p['belly.s'] = amount * (0.5 + 0.5 * wave(t, cycles, offset));
  p['chest.rx'] = (p['chest.rx'] ?? 0) - amount * 0.25 * wave(t, cycles, offset);
  return p;
}

/** Periodic narrow pulse (0..1) occurring `count` times per loop. */
export function pulse(t, count, offset = 0, sharp = 0.75) {
  return smoothstep(sharp, 1, wave(t, count, offset));
}

export const loopPhase = (t) => t / LOOP;
export { TAU };
