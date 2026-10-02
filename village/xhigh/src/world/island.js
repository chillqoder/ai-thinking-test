// The floating island: grassy top (height field), layered rocky underside,
// hanging roots, scattered rocks, and a few small bobbing islets.

import * as THREE from 'three';
import { Builder, paint, ico, cone, cyl, transform } from '../core/geo.js';
import { flatMat } from '../core/materials.js';
import { fbm, noise2, ringNoise, rng } from '../core/random.js';
import { clamp, lerp, smooth, smoother, osc, TAU } from '../core/loop.js';
import { CASTLE, PLAZA, POND, MUD, PATHS, STREAMS, FIELD, PASTURE, KEEP } from './layout.js';

// ---------------------------------------------------------------------------
// Shape functions
// ---------------------------------------------------------------------------

export function rimRadius(theta) {
  return (
    44 +
    2.6 * Math.sin(3 * theta + 0.7) +
    1.7 * Math.sin(5 * theta + 2.1) +
    1.0 * Math.sin(9 * theta + 0.3) +
    1.3 * ringNoise(theta, 2.2, 7)
  );
}

/** Distance from point to a 2D polyline, plus the parameter of the closest point. */
export function polyDist(x, z, pts) {
  let best = Infinity;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i];
    const [bx, bz] = pts[i + 1];
    const dx = bx - ax;
    const dz = bz - az;
    const L2 = dx * dx + dz * dz;
    const k = clamp(((x - ax) * dx + (z - az) * dz) / L2);
    const px = ax + dx * k - x;
    const pz = az + dz * k - z;
    const d = Math.sqrt(px * px + pz * pz);
    if (d < best) best = d;
  }
  return best;
}

export function pathInfo(x, z) {
  // returns signed closeness: d - halfWidth for the nearest path
  let best = Infinity;
  for (const p of PATHS) {
    const d = polyDist(x, z, p.pts) - p.w;
    if (d < best) best = d;
  }
  return best;
}

function streamInfo(x, z) {
  let best = Infinity;
  for (const s of STREAMS) {
    const d = polyDist(x, z, s.pts) - s.w;
    if (d < best) best = d;
  }
  return best;
}

const hyp = Math.hypot;

/** Terrain height of the island top at (x, z). */
export function heightAt(x, z) {
  const r = hyp(x, z);
  const R = rimRadius(Math.atan2(z, x));

  let h = fbm(x * 0.05, z * 0.05, 3, 3) * 0.95 + 0.25;
  h += fbm(x * 0.18, z * 0.18, 2, 9) * 0.12;

  // flatten around places where things stand
  const dPlaza = hyp(x - PLAZA.x, z - PLAZA.z);
  const dPond = hyp(x - POND.x, z - POND.z);
  let flat = Math.max(smooth((PLAZA.r + 9 - dPlaza) / 6), smooth((POND.r + 5 - dPond) / 4));
  flat = Math.max(flat, smooth((1.6 - pathInfo(x, z)) / 2.5) * 0.6);
  h = lerp(h, 0.25, flat * 0.85);

  // castle hill with a perfectly flat plateau
  const dC = hyp(x - CASTLE.x, z - CASTLE.z);
  const hillK = 1 - smoother((dC - CASTLE.plateauR) / (CASTLE.hillR - CASTLE.plateauR));
  h = lerp(h, CASTLE.y, hillK);

  // pond basin
  h -= 1.15 * smooth((POND.r + 1.6 - dPond) / 2.6);

  // stream channels
  const ds = streamInfo(x, z);
  h -= 0.5 * smooth((0.9 - ds) / 1.4);

  // mud wallow
  const dMud = hyp(x - MUD.x, z - MUD.z);
  h -= 0.3 * smooth((MUD.r + 0.5 - dMud) / 1.2);

  // rounded rim
  h -= 1.7 * smooth((r - (R - 6.5)) / 6.5);
  return h;
}

// ---------------------------------------------------------------------------
// Ground colouring
// ---------------------------------------------------------------------------

const C = (hex) => new THREE.Color(hex);
const GRASS = [C(0x7ab64a), C(0x88c257), C(0x6ca944), C(0x93c95e)];
const DIRT = C(0xbf9263);
const DIRT_DARK = C(0xa77c51);
const PLAZA_C = C(0xcaa67a);
const COBBLE = C(0xb9ad97);
const SOIL = C(0x7d5636);
const SOIL_RIDGE = C(0x93683f);
const SAND = C(0xd8c38e);
const MUD_C = C(0x5e402a);
const PASTURE_C = C(0x9cc862);
const tmp = new THREE.Color();

function inCastle(x, z) {
  return Math.abs(x - CASTLE.x) < CASTLE.half + 0.5 && Math.abs(z - CASTLE.z) < CASTLE.half + 0.5;
}

export function groundColor(x, y, z) {
  const n = noise2(x * 0.35, z * 0.35, 21);
  if (inCastle(x, z)) return tmp.copy(COBBLE).multiplyScalar(0.95 + n * 0.05);

  const dMud = hyp(x - MUD.x, z - MUD.z);
  if (dMud < MUD.r + 0.4) return tmp.copy(MUD_C).lerp(DIRT_DARK, smooth((dMud - MUD.r + 0.4) / 0.8));

  const dPond = hyp(x - POND.x, z - POND.z);
  if (dPond < POND.r + 1.3) return tmp.copy(SAND).multiplyScalar(0.96 + n * 0.04);
  if (streamInfo(x, z) < 0.6) return tmp.copy(SAND).multiplyScalar(0.92 + n * 0.05);

  if (x > FIELD.x0 && x < FIELD.x1 && z > FIELD.z0 && z < FIELD.z1) {
    const row = Math.sin(((x - FIELD.x0) / 1.25) * Math.PI);
    return tmp.copy(SOIL).lerp(SOIL_RIDGE, row * 0.5 + 0.5);
  }

  const dPlaza = hyp(x - PLAZA.x, z - PLAZA.z);
  if (dPlaza < PLAZA.r) return tmp.copy(PLAZA_C).multiplyScalar(0.96 + n * 0.05);

  const pd = pathInfo(x, z);
  if (pd < 0) return tmp.copy(DIRT).lerp(DIRT_DARK, 0.5 + n * 0.5);
  if (dPlaza < PLAZA.r + 0.6 || pd < 0.45) return tmp.copy(DIRT).lerp(GRASS[0], 0.55);

  let g = GRASS[Math.floor((noise2(x * 0.12, z * 0.12, 5) * 0.5 + 0.5) * 3.99)];
  tmp.copy(g);
  if (x > PASTURE.x0 && x < PASTURE.x1 && z > PASTURE.z0 && z < PASTURE.z1) tmp.lerp(PASTURE_C, 0.6);
  // sunny tips on the hill, slightly deeper green in hollows
  tmp.multiplyScalar(0.94 + clamp(y * 0.02, -0.06, 0.08) + n * 0.03);
  return tmp;
}

// ---------------------------------------------------------------------------
// Mesh construction
// ---------------------------------------------------------------------------

/** Stitch two concentric rings (arrays of {a, v}) into triangles. */
function stitch(A, B, out) {
  if (A.length === 1 || B.length === 1) {
    const [P, ring] = A.length === 1 ? [A[0].v, B] : [B[0].v, A];
    for (let j = 0; j < ring.length; j++) out.push([P, ring[j].v, ring[(j + 1) % ring.length].v]);
    return;
  }
  let i = 0;
  let j = 0;
  const nA = A.length;
  const nB = B.length;
  const angA = (k) => A[k % nA].a + (k >= nA ? TAU : 0);
  const angB = (k) => B[k % nB].a + (k >= nB ? TAU : 0);
  while (i < nA || j < nB) {
    const advanceA = j >= nB || (i < nA && angA(i + 1) < angB(j + 1));
    if (advanceA) {
      out.push([A[i % nA].v, A[(i + 1) % nA].v, B[j % nB].v]);
      i++;
    } else {
      out.push([A[i % nA].v, B[(j + 1) % nB].v, B[j % nB].v]);
      j++;
    }
  }
}

const _ab = new THREE.Vector3();
const _ac = new THREE.Vector3();
const _n = new THREE.Vector3();

/** Triangles → non-indexed geometry, each oriented so its normal faces away from `ref(centroid)`. */
function trisToGeometry(tris, outward) {
  const pos = new Float32Array(tris.length * 9);
  let o = 0;
  for (const [a, b, c] of tris) {
    _ab.subVectors(b, a);
    _ac.subVectors(c, a);
    _n.crossVectors(_ab, _ac);
    const cx = (a.x + b.x + c.x) / 3;
    const cy = (a.y + b.y + c.y) / 3;
    const cz = (a.z + b.z + c.z) / 3;
    const flip = outward(_n, cx, cy, cz) < 0;
    const list = flip ? [a, c, b] : [a, b, c];
    for (const v of list) {
      pos[o++] = v.x;
      pos[o++] = v.y;
      pos[o++] = v.z;
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  return g;
}

const ROCK = [0x9a8571, 0x8c7765, 0x7d6a5c, 0x726462, 0x67626e, 0x5e5b6b].map(C);

function rockColor(x, y, z, top) {
  const d = top - y; // depth below the rim
  if (d < 0.7) return C(0x689f42);
  if (d < 3.2) return C(0x8d5f3d).multiplyScalar(0.95 + noise2(x * 0.3, z * 0.3, 2) * 0.06);
  const band = Math.floor((d + noise2(x * 0.08, z * 0.08, 4) * 1.8) / 2.6);
  const base = ROCK[Math.min(ROCK.length - 1, Math.floor(band / 2))].clone();
  if (band % 2) base.multiplyScalar(0.9);
  return base;
}

export function buildIsland() {
  const rand = rng(11);
  const group = new THREE.Group();
  group.name = 'island';

  // ---- top surface ---------------------------------------------------------
  const NR = 60;
  const rings = [];
  rings.push([{ a: 0, v: new THREE.Vector3(0, heightAt(0, 0), 0) }]);
  for (let i = 1; i <= NR; i++) {
    const f = i / NR;
    const n = Math.max(7, Math.round(230 * f));
    const ring = [];
    for (let j = 0; j < n; j++) {
      const jit = i < NR ? (rand() - 0.5) * 0.5 : (rand() - 0.5) * 0.2;
      const a = ((j + 0.5 + jit) / n) * TAU;
      const R = rimRadius(a);
      const rr = i < NR ? R * f + (rand() - 0.5) * (R / NR) * 0.45 : R;
      const x = Math.cos(a) * rr;
      const z = Math.sin(a) * rr;
      ring.push({ a, v: new THREE.Vector3(x, heightAt(x, z), z) });
    }
    rings.push(ring);
  }
  const topTris = [];
  for (let i = 0; i < NR; i++) stitch(rings[i], rings[i + 1], topTris);
  const topGeom = paint(
    trisToGeometry(topTris, (n) => n.y),
    groundColor,
    { jitter: 0.035, rand },
  );
  const top = new THREE.Mesh(topGeom, flatMat);
  top.receiveShadow = true;
  top.name = 'island-top';
  group.add(top);

  // ---- underside -----------------------------------------------------------
  const rim = rings[NR];
  const profile = [
    // [depth below rim (or absolute y if abs), radius factor, segment count]
    { dy: 0.5, s: 1.012, n: rim.length, jit: 0.05 },
    { dy: 2.4, s: 0.985, n: rim.length, jit: 0.25 },
    { y: -6.5, s: 0.9, n: 150, jit: 1.4 },
    { y: -12, s: 0.76, n: 110, jit: 2.0 },
    { y: -18.5, s: 0.58, n: 80, jit: 2.2 },
    { y: -25, s: 0.4, n: 54, jit: 2.0 },
    { y: -31.5, s: 0.23, n: 30, jit: 1.6 },
    { y: -36.5, s: 0.1, n: 14, jit: 1.0 },
  ];
  const under = [rim];
  profile.forEach((p, k) => {
    const ring = [];
    for (let j = 0; j < p.n; j++) {
      let a;
      let baseY;
      let R;
      if (p.n === rim.length) {
        a = rim[j].a;
        baseY = rim[j].v.y;
        R = Math.hypot(rim[j].v.x, rim[j].v.z);
      } else {
        a = ((j + 0.5 + (rand() - 0.5) * 0.4) / p.n) * TAU;
        baseY = 0;
        R = rimRadius(a);
      }
      const lobes = 1 + 0.13 * ringNoise(a, 2.6, 40 + k) + 0.06 * Math.sin(a * 4 + k);
      const r = R * p.s * (k >= 2 ? lobes : 1) + (rand() - 0.5) * p.jit;
      const y = p.y !== undefined ? p.y + (rand() - 0.5) * 1.6 : baseY - p.dy;
      ring.push({ a, v: new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r) });
    }
    under.push(ring);
  });
  under.push([{ a: 0, v: new THREE.Vector3(1.5, -43, -1) }]);
  const underTris = [];
  for (let k = 0; k < under.length - 1; k++) stitch(under[k], under[k + 1], underTris);
  const ref = new THREE.Vector3(0, -12, 0);
  const underGeom = paint(
    trisToGeometry(underTris, (n, cx, cy, cz) => n.x * (cx - ref.x) + n.y * (cy - ref.y) + n.z * (cz - ref.z)),
    (x, y, z) => rockColor(x, y, z, heightAt(x * 0.97, z * 0.97) - 0.05),
    { jitter: 0.06, rand },
  );

  const rocks = new Builder(rand);
  rocks.push(underGeom);

  // hanging stalactite crags
  for (let i = 0; i < 16; i++) {
    const a = rand() * TAU;
    const f = 0.25 + rand() * 0.45;
    const R = rimRadius(a) * f;
    const yTop = -6 - (1 - f) * 22;
    const h = 7 + rand() * 12;
    const rad = 2.2 + rand() * 3.5;
    const g = cone(rad, h, 6 + Math.floor(rand() * 3));
    transform(g, { p: [Math.cos(a) * R, yTop - h / 2 + 2, Math.sin(a) * R], r: [Math.PI + (rand() - 0.5) * 0.3, rand() * TAU, (rand() - 0.5) * 0.3] });
    rocks.push(paint(g, (x, y, z) => rockColor(x, y, z, 0), { jitter: 0.07, rand }));
  }

  // dangling roots & vines from the lip
  for (let i = 0; i < 70; i++) {
    const a = rand() * TAU;
    const R = rimRadius(a) * 1.005;
    const len = 1 + rand() * 3.5;
    const x = Math.cos(a) * R;
    const z = Math.sin(a) * R;
    const y = heightAt(x * 0.985, z * 0.985) - 0.5;
    const g = cyl(0.05, 0.02, len, 4);
    transform(g, { p: [x, y - len / 2, z], r: [(rand() - 0.5) * 0.2, 0, (rand() - 0.5) * 0.2] });
    rocks.push(paint(g, rand() < 0.6 ? 0x4f7d34 : 0x6b4a2e, { jitter: 0.1, rand }));
    if (rand() < 0.5) {
      const leaf = ico(0.18 + rand() * 0.12, 0);
      transform(leaf, { p: [x, y - len, z] });
      rocks.push(paint(leaf, 0x5f9a3c, { jitter: 0.1, rand }));
    }
  }

  // boulders on the surface (avoid paths, plaza, buildings)
  for (let i = 0; i < 70; i++) {
    const a = rand() * TAU;
    const rf = rand() < 0.6 ? 0.82 + rand() * 0.14 : 0.3 + rand() * 0.6;
    const R = rimRadius(a) * rf;
    const x = Math.cos(a) * R;
    const z = Math.sin(a) * R;
    if (!isFreeGround(x, z, 1.2)) continue;
    const s = 0.25 + rand() * 0.7;
    const g = ico(s, 0);
    transform(g, { p: [x, heightAt(x, z) + s * 0.2, z], r: [rand() * 3, rand() * 3, rand() * 3], s: [1, 0.7, 1] });
    rocks.push(paint(g, ROCK[Math.floor(rand() * 3)].clone().multiplyScalar(1.15), { jitter: 0.08, rand }));
  }

  const rockMesh = rocks.build(flatMat, { cast: true, receive: true });
  rockMesh.name = 'island-underside';
  group.add(rockMesh);

  // ---- floating islets -----------------------------------------------------
  const islets = [];
  const isletDefs = [
    { a: 0.5, d: 58, y: -6, s: 1.0, tree: true },
    { a: 1.9, d: 62, y: 4, s: 0.6, tree: false },
    { a: 2.9, d: 56, y: -14, s: 0.85, tree: true },
    { a: 4.0, d: 64, y: -2, s: 0.5, tree: false },
    { a: 4.9, d: 57, y: -9, s: 0.75, tree: true },
    { a: 5.7, d: 66, y: 7, s: 0.45, tree: false },
  ];
  for (const [i, def] of isletDefs.entries()) {
    const b = new Builder(rng(100 + i));
    const R = 3.2 * def.s;
    const topG = cyl(R, R * 0.92, 0.5, 9);
    transform(topG, { p: [0, -0.25, 0] });
    b.push(paint(topG, 0x7ab64a, { jitter: 0.05, rand }));
    const body = cone(R * 0.95, R * 3.2, 8);
    transform(body, { p: [0, -0.5 - R * 1.6, 0], r: [Math.PI, 0, 0] });
    b.push(paint(body, (x, y) => rockColor(x, y, 0, 0), { jitter: 0.08, rand }));
    if (def.tree) {
      const trunk = cyl(0.12, 0.18, 1.2, 5);
      transform(trunk, { p: [0.3, 0.6, 0] });
      b.push(paint(trunk, 0x7a5232, {}));
      for (let k = 0; k < 3; k++) {
        const blob = ico(0.7 - k * 0.12, 0);
        transform(blob, { p: [0.3 + (k - 1) * 0.3, 1.5 + k * 0.35, (k % 2) * 0.2] });
        b.push(paint(blob, k % 2 ? 0x5f9e3d : 0x74b04a, { jitter: 0.08, rand }));
      }
    } else {
      const stone = ico(0.5 * def.s + 0.2, 0);
      transform(stone, { p: [0.4, 0.2, -0.3], s: [1, 0.7, 1] });
      b.push(paint(stone, 0x9a8b7b, { jitter: 0.08, rand }));
    }
    const mesh = b.build(flatMat);
    mesh.position.set(Math.cos(def.a) * def.d, def.y, Math.sin(def.a) * def.d);
    group.add(mesh);
    islets.push({ mesh, def, base: mesh.position.y, phase: i / isletDefs.length });
  }

  function update(t) {
    for (const it of islets) {
      it.mesh.position.y = it.base + osc(t, 20, it.phase) * 0.8 + osc(t, 12, it.phase * 2) * 0.25;
      it.mesh.rotation.y = osc(t, 30, it.phase) * 0.12;
      it.mesh.rotation.z = osc(t, 15, it.phase) * 0.03;
    }
  }

  return { group, update };
}

// ---------------------------------------------------------------------------
// Placement helpers used by other modules
// ---------------------------------------------------------------------------

const blockers = [];
/** Register a circular no-scatter zone (buildings, props) so vegetation avoids it. */
export function block(x, z, r) {
  blockers.push([x, z, r]);
}

/** True if (x,z) is open grass: not path, plaza, water, field, castle or registered blocker. */
export function isFreeGround(x, z, margin = 0.6) {
  const r = Math.hypot(x, z);
  if (r > rimRadius(Math.atan2(z, x)) - 1.2) return false;
  if (inCastle(x, z) || (Math.abs(x - KEEP.x) < 6 && Math.abs(z - KEEP.z) < 6)) return false;
  if (pathInfo(x, z) < margin) return false;
  if (streamInfo(x, z) < margin + 0.6) return false;
  if (Math.hypot(x - PLAZA.x, z - PLAZA.z) < PLAZA.r + margin) return false;
  if (Math.hypot(x - POND.x, z - POND.z) < POND.r + 1.4 + margin) return false;
  if (x > FIELD.x0 - margin && x < FIELD.x1 + margin && z > FIELD.z0 - margin && z < FIELD.z1 + margin) return false;
  for (const [bx, bz, br] of blockers) if (Math.hypot(x - bx, z - bz) < br + margin) return false;
  // keep the castle hill slope mostly clear near the walls
  const dC = Math.hypot(x - CASTLE.x, z - CASTLE.z);
  if (dC < CASTLE.plateauR + 1.5) return false;
  return true;
}
