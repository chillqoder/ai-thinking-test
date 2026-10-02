import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { rng, hash3 } from './math.js';

// Low-poly building blocks. Every helper returns a non-indexed BufferGeometry with
// `position`, `normal` and `color` attributes, already transformed into place, so
// thousands of pieces can be merged into a handful of draw calls.

const tint = rng(1337);
const _e = new THREE.Euler();
const _q = new THREE.Quaternion();
const _p = new THREE.Vector3();
const _s = new THREE.Vector3();
const _c = new THREE.Color();

/** Transform description: {x, y, z, rx, ry, rz, order, s, sx, sy, sz}. */
export function matrixFrom(t = {}) {
  _e.set(t.rx ?? 0, t.ry ?? 0, t.rz ?? 0, t.order ?? 'XYZ');
  _q.setFromEuler(_e);
  const s = t.s ?? 1;
  _s.set((t.sx ?? 1) * s, (t.sy ?? 1) * s, (t.sz ?? 1) * s);
  _p.set(t.x ?? 0, t.y ?? 0, t.z ?? 0);
  return new THREE.Matrix4().compose(_p, _q, _s);
}

/** Displace vertices by a hash of their position so coincident vertices stay welded. */
export function wobble(geo, amount, seed = 0) {
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    pos.setXYZ(
      i,
      x + (hash3(x, y, z, seed) - 0.5) * 2 * amount,
      y + (hash3(x, y, z, seed + 1) - 0.5) * 2 * amount,
      z + (hash3(x, y, z, seed + 2) - 0.5) * 2 * amount,
    );
  }
  return geo;
}

/** Assign one colour per triangle with a little brightness jitter (classic low-poly look). */
export function paint(geo, color, jitter = 0.04) {
  const n = geo.attributes.position.count;
  const arr = new Float32Array(n * 3);
  _c.set(color);
  for (let i = 0; i < n; i += 3) {
    const k = 1 + (tint.next() - 0.5) * 2 * jitter;
    for (let j = 0; j < 3 && i + j < n; j++) {
      arr[(i + j) * 3] = _c.r * k;
      arr[(i + j) * 3 + 1] = _c.g * k;
      arr[(i + j) * 3 + 2] = _c.b * k;
    }
  }
  geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return geo;
}

/** Convert any geometry into a coloured, transformed, non-indexed piece. */
export function piece(geometry, color, t, opts = {}) {
  let g = geometry.index ? geometry.toNonIndexed() : geometry;
  if (g === geometry && opts.clone) g = geometry.clone();
  for (const name of Object.keys(g.attributes)) if (name !== 'position') g.deleteAttribute(name);
  g.morphAttributes = {};
  g.clearGroups();
  if (opts.wobble) wobble(g, opts.wobble, opts.seed ?? 0);
  if (t) g.applyMatrix4(matrixFrom(t));
  g.computeVertexNormals();
  paint(g, color, opts.jitter ?? 0.035);
  return g;
}

export const box = (w, h, d, color, t, o) => piece(new THREE.BoxGeometry(w, h, d), color, t, o);
export const cyl = (rt, rb, h, seg, color, t, o = {}) =>
  piece(new THREE.CylinderGeometry(rt, rb, h, seg, 1, o.open ?? false, o.thetaStart ?? 0, o.thetaLength ?? Math.PI * 2), color, t, o);
export const cone = (r, h, seg, color, t, o) => piece(new THREE.ConeGeometry(r, h, seg), color, t, o);
export const ico = (r, detail, color, t, o) => piece(new THREE.IcosahedronGeometry(r, detail), color, t, o);
export const dodeca = (r, color, t, o) => piece(new THREE.DodecahedronGeometry(r, 0), color, t, o);
export const sphere = (r, ws, hs, color, t, o = {}) =>
  piece(new THREE.SphereGeometry(r, ws, hs, 0, Math.PI * 2, o.thetaStart ?? 0, o.thetaLength ?? Math.PI), color, t, o);
export const torus = (r, tube, rs, ts, arc, color, t, o) =>
  piece(new THREE.TorusGeometry(r, tube, rs, ts, arc), color, t, o);

/** Triangular prism: base width w along x, apex height h along y, length l along z; base at y = 0. */
export function prism(w, h, l, color, t, o) {
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2, 0);
  shape.lineTo(w / 2, 0);
  shape.lineTo(0, h);
  shape.closePath();
  const g = new THREE.ExtrudeGeometry(shape, { depth: l, bevelEnabled: false });
  g.translate(0, 0, -l / 2);
  return piece(g, color, t, o);
}

/** Flat polygon (in XZ, facing up) from [[x,z],...] points. */
export function polygon(points, color, t, o) {
  const shape = new THREE.Shape(points.map(([x, z]) => new THREE.Vector2(x, -z)));
  const g = new THREE.ShapeGeometry(shape);
  g.rotateX(-Math.PI / 2);
  return piece(g, color, t, o);
}

/** Apply a transform to a list of pieces in place (used to place pre-built groups). */
export function place(list, t) {
  const m = matrixFrom(t);
  for (const g of list) g.applyMatrix4(m);
  return list;
}

/** A box spanning from point a to point b (thickness w×h), e.g. fence rails, beams, ropes. */
export function beam(a, b, w, h, color, o) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2];
  const len = Math.hypot(dx, dy, dz);
  const g = new THREE.BoxGeometry(w, h, len);
  const m = new THREE.Matrix4().lookAt(new THREE.Vector3(0, 0, 0), new THREE.Vector3(dx, dy, dz), new THREE.Vector3(0, 1, 0));
  if (Math.abs(dy) > 0.999 * len) m.lookAt(new THREE.Vector3(0, 0, 0), new THREE.Vector3(dx, dy, dz), new THREE.Vector3(1, 0, 0));
  m.setPosition((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
  const p = piece(g, color, null, o);
  p.applyMatrix4(m);
  p.computeVertexNormals();
  return p;
}

/** Adds a per-vertex float attribute (used for foliage sway weights). */
export function withAttribute(geo, name, fn) {
  const pos = geo.attributes.position;
  const arr = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i++) arr[i] = fn(pos.getX(i), pos.getY(i), pos.getZ(i), i);
  geo.setAttribute(name, new THREE.BufferAttribute(arr, 1));
  return geo;
}

export function merge(list) {
  return mergeGeometries(list, false);
}

/** Collects static pieces and merges them into a single mesh per material. */
export class Bucket {
  constructor(name) {
    this.name = name;
    this.geos = [];
  }

  add(...items) {
    for (const g of items.flat(Infinity)) if (g) this.geos.push(g);
  }

  build(material, { castShadow = true, receiveShadow = true } = {}) {
    if (!this.geos.length) return null;
    const merged = mergeGeometries(this.geos, false);
    if (!merged) throw new Error(`Bucket "${this.name}": incompatible geometries`);
    merged.computeBoundingSphere();
    const mesh = new THREE.Mesh(merged, material);
    mesh.name = this.name;
    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    this.geos.length = 0;
    return mesh;
  }
}
