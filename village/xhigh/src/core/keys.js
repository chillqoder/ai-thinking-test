// Keyframe blending for vectors, angles and quaternions within one cycle.

import * as THREE from 'three';
import { smooth, lerpAngle } from './loop.js';

function segment(T, keys) {
  if (T <= keys[0][0]) return [0, 0, 0];
  for (let i = 0; i < keys.length - 1; i++) {
    const ta = keys[i][0];
    const tb = keys[i + 1][0];
    if (T <= tb) return [i, i + 1, tb > ta ? smooth((T - ta) / (tb - ta)) : 1];
  }
  const n = keys.length - 1;
  return [n, n, 0];
}

/** Smoothly blend through [[time, Vector3], ...] (values may change every frame). */
export function keyed(T, keys, out = new THREE.Vector3()) {
  const [a, b, k] = segment(T, keys);
  return out.copy(keys[a][1]).lerp(keys[b][1], k);
}

/** Same for quaternions. */
export function keyedQuat(T, keys, out = new THREE.Quaternion()) {
  const [a, b, k] = segment(T, keys);
  return out.copy(keys[a][1]).slerp(keys[b][1], k);
}

/** Same for angles (shortest path). */
export function keyedAngle(T, keys) {
  const [a, b, k] = segment(T, keys);
  return lerpAngle(keys[a][1], keys[b][1], k);
}

/** Place a unit-height Y-aligned mesh so it spans from a to b. */
const _d = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);
export function span(mesh, a, b, thickness = 1) {
  _d.subVectors(b, a);
  const len = _d.length();
  mesh.position.copy(a).addScaledVector(_d, 0.5);
  if (len > 1e-5) mesh.quaternion.setFromUnitVectors(_up, _d.multiplyScalar(1 / len));
  mesh.scale.set(thickness, Math.max(len, 1e-4), thickness);
}
