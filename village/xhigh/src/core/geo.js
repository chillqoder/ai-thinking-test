// Geometry helpers: vertex-coloured primitives that merge into a handful of
// draw calls. Everything static in the world is baked into a few big meshes
// that share one flat-shaded material.

import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();
const _c = new THREE.Color();
const _base = new THREE.Color();

/** Apply position / rotation (Euler) / scale to a geometry in place. */
export function transform(geom, { p, r, s, order = 'XYZ' } = {}) {
  _p.set(...(p ?? [0, 0, 0]));
  _e.set(...(r ?? [0, 0, 0]), order);
  _q.setFromEuler(_e);
  if (typeof s === 'number') _s.set(s, s, s);
  else _s.set(...(s ?? [1, 1, 1]));
  _m.compose(_p, _q, _s);
  geom.applyMatrix4(_m);
  return geom;
}

/**
 * Normalise a geometry for merging (non-indexed; position/normal/color only)
 * and bake a per-face colour. `color` may be a hex/Color or a function
 * (cx, cy, cz) => hex|Color evaluated at each face centroid.
 */
export function paint(geom, color, { jitter = 0, rand = null } = {}) {
  const g = geom.index ? geom.toNonIndexed() : geom;
  for (const name of Object.keys(g.attributes)) if (name !== 'position' && name !== 'normal') g.deleteAttribute(name);
  g.morphAttributes = {};
  g.clearGroups();
  g.computeVertexNormals();
  const pos = g.attributes.position.array;
  const n = g.attributes.position.count;
  const col = new Float32Array(n * 3);
  const fn = typeof color === 'function' ? color : null;
  if (!fn) _base.set(color);
  for (let i = 0; i < n; i += 3) {
    if (fn) {
      const o = i * 3;
      const cx = (pos[o] + pos[o + 3] + pos[o + 6]) / 3;
      const cy = (pos[o + 1] + pos[o + 4] + pos[o + 7]) / 3;
      const cz = (pos[o + 2] + pos[o + 5] + pos[o + 8]) / 3;
      _c.set(fn(cx, cy, cz));
    } else _c.copy(_base);
    if (jitter && rand) _c.multiplyScalar(1 + (rand() * 2 - 1) * jitter);
    for (let v = 0; v < 3; v++) {
      col[(i + v) * 3] = _c.r;
      col[(i + v) * 3 + 1] = _c.g;
      col[(i + v) * 3 + 2] = _c.b;
    }
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return g;
}

/** Collects painted, transformed primitives and merges them into one mesh. */
export class Builder {
  constructor(rand = null) {
    this.parts = [];
    this.rand = rand;
  }
  /** Add a geometry: transform → paint. Returns this for chaining. */
  add(geom, color, xf = {}, opts = {}) {
    transform(geom, xf);
    this.parts.push(paint(geom, color, { rand: this.rand, ...opts }));
    return this;
  }
  /** Add an already painted geometry. */
  push(geom) {
    this.parts.push(geom);
    return this;
  }
  geometry() {
    if (!this.parts.length) return null;
    const g = mergeGeometries(this.parts, false);
    g.computeBoundingSphere();
    return g;
  }
  build(material, { cast = true, receive = true } = {}) {
    const g = this.geometry();
    if (!g) return new THREE.Group();
    const mesh = new THREE.Mesh(g, material);
    mesh.castShadow = cast;
    mesh.receiveShadow = receive;
    return mesh;
  }
}

// ---- primitive shorthands (fresh geometry every call) ---------------------

export const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
export const cyl = (rt, rb, h, seg = 8, open = false) => new THREE.CylinderGeometry(rt, rb, h, seg, 1, open);
export const cone = (r, h, seg = 8) => new THREE.ConeGeometry(r, h, seg);
export const ico = (r, detail = 0) => new THREE.IcosahedronGeometry(r, detail);
export const sphere = (r, ws = 8, hs = 6) => new THREE.SphereGeometry(r, ws, hs);
export const capsule = (r, len, cap = 3, seg = 7) => new THREE.CapsuleGeometry(r, len, cap, seg);
export const dodeca = (r) => new THREE.DodecahedronGeometry(r, 0);

/**
 * Gable-roof prism body (triangular), ridge along X, base centred at y = 0.
 * Used for the plaster gable ends under a roof.
 */
export function gablePrism(w, d, h) {
  const shape = new THREE.Shape();
  shape.moveTo(-d / 2, 0);
  shape.lineTo(d / 2, 0);
  shape.lineTo(0, h);
  shape.closePath();
  const g = new THREE.ExtrudeGeometry(shape, { depth: w, bevelEnabled: false });
  g.translate(0, 0, -w / 2);
  g.rotateY(Math.PI / 2);
  return g;
}

/**
 * Add a two-slab gable roof to a builder. Ridge along local X at height
 * `ridgeY`, eaves at ±(d/2 + overhang). Returns nothing.
 */
export function addGableRoof(b, color, { w, d, ridgeY, pitchH, overhang = 0.3, thick = 0.18, xf = null, jitter = 0.06 }) {
  const a = Math.atan2(pitchH, d / 2);
  const run = d / 2 + overhang;
  const slope = run / Math.cos(a);
  const len = w + overhang * 2;
  for (const side of [1, -1]) {
    const g = box(len, thick, slope);
    // slab local +z → downslope; top surface passes through the ridge line
    const down = new THREE.Vector3(0, -Math.sin(a), Math.cos(a) * side);
    const nrm = new THREE.Vector3(0, Math.cos(a), Math.sin(a) * side);
    const c = new THREE.Vector3(0, ridgeY, 0).addScaledVector(down, slope / 2).addScaledVector(nrm, -thick / 2 + 0.02);
    transform(g, { p: [c.x, c.y, c.z], r: [a * side, 0, 0] });
    if (xf) g.applyMatrix4(xf);
    b.push(paint(g, color, { rand: b.rand, jitter }));
  }
  // ridge cap
  const cap = box(len + 0.04, thick * 0.9, thick * 1.4);
  transform(cap, { p: [0, ridgeY + thick * 0.15, 0], r: [Math.PI / 4, 0, 0] });
  if (xf) cap.applyMatrix4(xf);
  b.push(paint(cap, new THREE.Color(color).multiplyScalar(0.85), { rand: b.rand, jitter }));
}

/** Matrix from position + yaw (Y rotation). */
export function placeMatrix(x, y, z, yaw = 0, scale = 1) {
  const m = new THREE.Matrix4();
  _q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
  m.compose(new THREE.Vector3(x, y, z), _q, new THREE.Vector3(scale, scale, scale));
  return m;
}

/** Add a geometry that is first transformed locally, then by an outer matrix. */
export function addPlaced(b, geom, color, local, outer, opts = {}) {
  transform(geom, local);
  if (outer) geom.applyMatrix4(outer);
  b.push(paint(geom, color, { rand: b.rand, ...opts }));
}
