// Deterministic movement scripts for walking characters.
//
// A Script is a list of steps (walk along a path, turn, wait/act) whose total
// duration is padded to exactly one period. sample(t) returns where the actor
// is, which way it faces and how fast it is moving — all as a pure function of
// time. A script that ends where it began loops with no seam.

import * as THREE from 'three';
import { LOOP, TAU, clamp, smooth, lerpAngle, mod } from './loop.js';

const ACCEL = 0.45; // seconds to reach / leave walking speed

/** Distance along a walk with a trapezoid speed profile (ramps of `ta`). */
function travel(tau, D, L) {
  const ta = Math.min(ACCEL, D / 2);
  const v = L / (D - ta);
  if (tau < ta) return { s: (v * tau * tau) / (2 * ta), k: tau / ta };
  if (tau < D - ta) return { s: v * (tau - ta / 2), k: 1 };
  const r = D - tau;
  return { s: L - (v * r * r) / (2 * ta), k: r / ta };
}

export class Script {
  /** start: [x, z], yaw: initial facing (radians, 0 = +Z). */
  constructor(start, yaw = 0, { period = LOOP, stride = 1.1 } = {}) {
    this.start = new THREE.Vector3(start[0], 0, start[1]);
    this.pos = this.start.clone();
    this.yaw0 = yaw;
    this.yaw = yaw;
    this.period = period;
    this.stride = stride;
    this.steps = [];
    this.time = 0;
  }

  /** Walk through the given [x,z] points at `speed` (m/s). */
  walk(points, speed = 1.0, data = {}) {
    const pts = [this.pos.clone(), ...points.map(([x, z]) => new THREE.Vector3(x, 0, z))];
    const curve = pts.length === 2 ? new THREE.LineCurve3(pts[0], pts[1]) : new THREE.CatmullRomCurve3(pts, false, 'centripetal');
    const L = curve.getLength();
    const dur = data.dur ?? L / speed + ACCEL;
    const end = pts[pts.length - 1];
    const tan = curve.getTangentAt(1);
    const endYaw = Math.atan2(tan.x, tan.z);
    this.steps.push({ type: 'walk', t0: this.time, dur, curve, L, yawFrom: this.yaw, speed, stride: data.stride ?? this.stride, ...data });
    this.time += dur;
    this.pos.copy(end);
    this.yaw = endYaw;
    return this;
  }

  /** Turn on the spot to face `yaw` (number) or a point [x, z]. */
  turn(target, dur = 0.8, data = {}) {
    const yaw = Array.isArray(target) ? Math.atan2(target[0] - this.pos.x, target[1] - this.pos.z) : target;
    this.steps.push({ type: 'turn', t0: this.time, dur, pos: this.pos.clone(), yawFrom: this.yaw, yawTo: yaw, ...data });
    this.time += dur;
    this.yaw = lerpAngle(this.yaw, yaw, 1);
    return this;
  }

  /** Stand still (optionally performing an action the actor interprets). */
  wait(dur, action = 'idle', data = {}) {
    this.steps.push({ type: 'wait', t0: this.time, dur, pos: this.pos.clone(), yaw: this.yaw, action, ...data });
    this.time += dur;
    return this;
  }

  /** Pad the script to exactly one period; returns this. */
  close(action = 'idle') {
    if (this.pos.distanceTo(this.start) > 0.02) console.warn('[script] does not end where it starts', this.pos, this.start);
    if (Math.abs(mod(this.yaw - this.yaw0 + Math.PI, TAU) - Math.PI) > 0.01) this.turn(this.yaw0, 0.9);
    const rest = this.period - this.time;
    if (rest < -1e-6) console.warn(`[script] is ${(-rest).toFixed(2)}s longer than its period ${this.period}s`);
    if (rest > 1e-6) this.wait(rest, action);
    return this;
  }

  find(t) {
    const tt = mod(t, this.period);
    let lo = 0;
    for (let i = 0; i < this.steps.length; i++) {
      if (this.steps[i].t0 <= tt) lo = i;
      else break;
    }
    return { step: this.steps[lo], local: tt - this.steps[lo].t0 };
  }

  /**
   * → { x, z, yaw, moving (0..1), phase (walk cycle 0..1), step, local, u }
   */
  sample(t, out = {}) {
    const { step, local } = this.find(t);
    out.step = step;
    out.local = local;
    out.u = clamp(local / step.dur);
    out.action = step.action ?? step.type;
    if (step.type === 'walk') {
      const { s, k } = travel(local, step.dur, step.L);
      const u = s / step.L;
      step.curve.getPointAt(u, _p);
      step.curve.getTangentAt(u, _tan);
      const heading = Math.atan2(_tan.x, _tan.z);
      out.x = _p.x;
      out.z = _p.z;
      out.yaw = lerpAngle(step.yawFrom, heading, smooth(local / 0.55));
      out.moving = k;
      out.phase = (s / step.stride) % 1;
    } else if (step.type === 'turn') {
      const u = smooth(local / step.dur);
      out.x = step.pos.x;
      out.z = step.pos.z;
      out.yaw = lerpAngle(step.yawFrom, step.yawTo, u);
      // little shuffling steps while turning
      const turnAmt = Math.abs(mod(step.yawTo - step.yawFrom + Math.PI, TAU) - Math.PI);
      out.moving = Math.min(0.35, turnAmt * 0.25) * Math.sin(Math.PI * clamp(local / step.dur));
      out.phase = clamp(local / step.dur) % 1;
    } else {
      out.x = step.pos.x;
      out.z = step.pos.z;
      out.yaw = step.yaw;
      out.moving = 0;
      out.phase = 0;
    }
    return out;
  }
}

const _p = new THREE.Vector3();
const _tan = new THREE.Vector3();
