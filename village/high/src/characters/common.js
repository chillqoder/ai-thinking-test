// Shared helpers for character behaviours.
import * as THREE from 'three';
import { clamp, LOOP, ph, track } from '../core/util.js';
import { getHeight } from '../world/terrain.js';

export function place(rig, x, z, yaw, y) {
  rig.root.position.set(x, y ?? getHeight(x, z), z);
  rig.root.rotation.y = yaw;
}

/**
 * Back-and-forth movement along a segment driven by a periodic keyframe track
 * `sKeys` (s in 0..1). Returns position, travel distance (for walk phase) and
 * a 0..1 walk amount derived from the instantaneous speed.
 */
export function segmentMover(ax, az, bx, bz, cycles, sKeys, { offset = 0, cruise = 0.9 } = {}) {
  const len = Math.hypot(bx - ax, bz - az);
  const period = LOOP / cycles;
  return (t, lag = 0) => {
    const u = ph(t, cycles, offset - lag);
    const s = track(u, sKeys);
    const d = 0.002;
    const v = (Math.abs(track((u + d) % 1, sKeys) - track((u - d + 1) % 1, sKeys)) * len) / (2 * d * period);
    return {
      u,
      s,
      x: ax + (bx - ax) * s,
      z: az + (bz - az) * s,
      dist: s * len,
      amt: clamp(v / cruise),
    };
  };
}

/** Closed path follower; laps must be an integer so the walk phase also closes. */
export function loopMover(points, laps, { stride = 1.2, offset = 0, y = 0 } = {}) {
  const curve = new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, y, z)), true, 'centripetal');
  const len = curve.getLength();
  const strides = Math.max(1, Math.round(len / stride));
  const p = new THREE.Vector3();
  const tan = new THREE.Vector3();
  return (t) => {
    const u = ph(t, laps, offset);
    curve.getPointAt(u, p);
    curve.getTangentAt(u, tan);
    return { x: p.x, z: p.z, yaw: Math.atan2(tan.x, tan.z), phase: u * strides, u };
  };
}

/** World position of an object expressed in another object's local space. */
const _v = new THREE.Vector3();
export function localPos(obj, frame, out = new THREE.Vector3()) {
  obj.getWorldPosition(_v);
  return out.copy(frame.worldToLocal(_v));
}

/** Orient + stretch a unit cylinder (height 1, centred) between two world points. */
const _up = new THREE.Vector3(0, 1, 0);
const _d = new THREE.Vector3();
export function stretchBetween(mesh, a, b) {
  _d.subVectors(b, a);
  const L = _d.length();
  mesh.position.copy(a).addScaledVector(_d, 0.5);
  mesh.quaternion.setFromUnitVectors(_up, _d.normalize());
  mesh.scale.set(1, Math.max(L, 0.001), 1);
}
