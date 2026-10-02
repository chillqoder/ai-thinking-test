// Shared materials, geometries and a static-geometry batcher.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// ---------- materials ----------
const matCache = new Map();
export function mat(color, opts = {}) {
  const key = color + JSON.stringify(opts);
  if (!matCache.has(key)) {
    matCache.set(
      key,
      new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0, flatShading: true, ...opts })
    );
  }
  return matCache.get(key);
}

/** Shared glass material for every window; its glow is driven by the day cycle. */
export const windowMat = new THREE.MeshStandardMaterial({
  color: '#3e4c5c',
  roughness: 0.4,
  emissive: '#ffb04a',
  emissiveIntensity: 0,
  flatShading: true,
});

// ---------- geometries ----------
const geoCache = new Map();
function cached(key, make) {
  if (!geoCache.has(key)) geoCache.set(key, make());
  return geoCache.get(key);
}
export const geo = {
  box: (w, h, d) => cached(`b${w},${h},${d}`, () => new THREE.BoxGeometry(w, h, d)),
  cyl: (rt, rb, h, s = 8) => cached(`c${rt},${rb},${h},${s}`, () => new THREE.CylinderGeometry(rt, rb, h, s)),
  cone: (r, h, s = 8) => cached(`k${r},${h},${s}`, () => new THREE.ConeGeometry(r, h, s)),
  ico: (r, d = 0) => cached(`i${r},${d}`, () => new THREE.IcosahedronGeometry(r, d)),
  dode: (r) => cached(`d${r}`, () => new THREE.DodecahedronGeometry(r, 0)),
  sphere: (r, w = 8, h = 6) => cached(`s${r},${w},${h}`, () => new THREE.SphereGeometry(r, w, h)),
  torus: (r, t, rs = 6, ts = 10, arc = Math.PI * 2) =>
    cached(`t${r},${t},${rs},${ts},${arc}`, () => new THREE.TorusGeometry(r, t, rs, ts, arc)),
  /** Triangular prism: triangle (base w, height h) in XY, extruded along Z by d. Base at y=0. */
  prism: (w, h, d) =>
    cached(`p${w},${h},${d}`, () => {
      const s = new THREE.Shape();
      s.moveTo(-w / 2, 0);
      s.lineTo(w / 2, 0);
      s.lineTo(0, h);
      s.closePath();
      const g = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: false });
      g.translate(0, 0, -d / 2);
      return g;
    }),
};

/** Mesh helper: m(geometry, color|material, [x,y,z], [rx,ry,rz], scale). */
export function mesh(g, color, pos = [0, 0, 0], rot = [0, 0, 0], scale = 1, opts) {
  const material = color instanceof THREE.Material ? color : mat(color, opts);
  const o = new THREE.Mesh(g, material);
  o.position.set(...pos);
  o.rotation.set(...rot);
  if (typeof scale === 'number') o.scale.setScalar(scale);
  else o.scale.set(...scale);
  o.castShadow = true;
  o.receiveShadow = true;
  return o;
}

export function group(parent, pos = [0, 0, 0], rot = [0, 0, 0]) {
  const g = new THREE.Group();
  g.position.set(...pos);
  g.rotation.set(...rot);
  if (parent) parent.add(g);
  return g;
}

// ---------- static batcher ----------
// Collects coloured primitives into one merged, vertex-coloured mesh: hundreds of
// static props become a single draw call.
const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _v = new THREE.Vector3();
const _s = new THREE.Vector3();
const _c = new THREE.Color();

export class Batch {
  constructor() {
    this.parts = [];
    this.stack = [new THREE.Matrix4()];
  }
  get top() {
    return this.stack[this.stack.length - 1];
  }
  /** Push a local frame (translation + yaw) — everything added after is relative to it. */
  push(pos = [0, 0, 0], yaw = 0) {
    _m.compose(_v.set(...pos), _q.setFromEuler(_e.set(0, yaw, 0)), _s.set(1, 1, 1));
    this.stack.push(this.top.clone().multiply(_m));
    return this;
  }
  pop() {
    this.stack.pop();
    return this;
  }
  /** Transform a local point to world space using the current frame. */
  world(pos) {
    return new THREE.Vector3(...pos).applyMatrix4(this.top);
  }
  add(g, color, pos = [0, 0, 0], rot = [0, 0, 0], scale = [1, 1, 1]) {
    if (typeof scale === 'number') scale = [scale, scale, scale];
    _m.compose(_v.set(...pos), _q.setFromEuler(_e.set(...rot)), _s.set(...scale));
    return this.addMatrix(g, color, this.top.clone().multiply(_m));
  }
  addMatrix(g, color, matrix) {
    let p = g.index ? g.toNonIndexed() : g.clone();
    for (const name of Object.keys(p.attributes)) if (name !== 'position') p.deleteAttribute(name);
    p.applyMatrix4(matrix);
    _c.set(color);
    const n = p.attributes.position.count;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = _c.r;
      arr[i * 3 + 1] = _c.g;
      arr[i * 3 + 2] = _c.b;
    }
    p.setAttribute('color', new THREE.BufferAttribute(arr, 3));
    this.parts.push(p);
    return this;
  }
  box(color, pos, size, rot) {
    return this.add(geo.box(...size), color, pos, rot);
  }
  build(material, { castShadow = true, receiveShadow = true } = {}) {
    if (!this.parts.length) return new THREE.Group();
    const merged = mergeGeometries(this.parts);
    merged.computeVertexNormals();
    merged.computeBoundingSphere();
    const m = new THREE.Mesh(
      merged,
      material || new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, flatShading: true })
    );
    m.castShadow = castShadow;
    m.receiveShadow = receiveShadow;
    return m;
  }
}

/** Slightly vary a colour, deterministic given rand(). */
export function vary(hex, rand, amount = 0.06) {
  _c.set(hex);
  const hsl = {};
  _c.getHSL(hsl);
  _c.setHSL(hsl.h + (rand() - 0.5) * amount * 0.3, hsl.s, THREE.MathUtils.clamp(hsl.l + (rand() - 0.5) * amount, 0, 1));
  return '#' + _c.getHexString();
}
