// The village below the castle: timber-framed cottages, the well and trough,
// a market stall, bakery oven, pens and fences, the woodcutter's yard, crops,
// trees, grass and flowers. Static pieces are merged; laundry sways.

import * as THREE from 'three';
import { Builder, paint, box, cyl, cone, ico, sphere, transform, gablePrism, addGableRoof, placeMatrix, addPlaced } from '../core/geo.js';
import { flatMat, foliageMat, grassMat, windowMat, glowMat } from '../core/materials.js';
import { TAU, osc, phase } from '../core/loop.js';
import { rng } from '../core/random.js';
import { heightAt, isFreeGround, block, pathInfo, rimRadius } from './island.js';
import { PLAZA, WELL, TROUGH, STALL, POND, MUD, PEN, WOODCUT, FIELD, PASTURE, YARD, OAK, KIDS, BAKERY, LINE, DOCK, BARN, CASTLE } from './layout.js';
import { Cloth } from './cloth.js';

const WOOD = 0x8a5a33;
const WOOD_DARK = 0x5e3b22;
const WOOD_LIGHT = 0xa8784a;
const TIMBER = 0x6b4428;
const STONE = 0xa9a092;
const PLASTER = [0xf3e6c8, 0xecd9b4, 0xf6eedc, 0xe9d2ad];
const SHUTTERS = [0x4f7fb0, 0x5f9a5a, 0xb54a3c, 0x3f6f6a];

/** Anchors for the animated well rig (relative to the well's ground point). */
export const WELL_RIG = { axleY: 1.32, postX: 0.95, crankX: 1.1, crankR: 0.2, drumR: 0.1, ringR: 0.74, innerR: 0.56, ringH: 0.8 };
export const TROUGH_RIG = { w: 1.5, d: 0.46, h: 0.46, waterY: 0.38 };

const HOUSES = [
  { x: -9.6, z: 9.0, yaw: 0.05, w: 4.4, d: 3.6, h: 2.5, roof: 'thatch' },
  { x: -9.2, z: 20.2, yaw: Math.PI / 2 + 0.1, w: 4.2, d: 3.4, h: 2.4, roof: 'tile' },
  { x: -3.6, z: 28.0, yaw: Math.PI - 0.35, w: 4.0, d: 3.4, h: 2.3, roof: 'thatch' },
  { x: 2.6, z: 28.6, yaw: Math.PI, w: 4.0, d: 3.2, h: 2.4, roof: 'tile' },
  { x: BAKERY.x, z: BAKERY.z, yaw: BAKERY.yaw, w: 5.0, d: 3.8, h: 2.7, roof: 'tile', bakery: true },
  { x: 10.6, z: 9.6, yaw: 0.25, w: 4.2, d: 3.4, h: 2.4, roof: 'thatch' },
  { x: 18.8, z: 19.0, yaw: -Math.PI / 2 - 0.2, w: 4.0, d: 3.2, h: 2.3, roof: 'thatch' },
  { x: 23.6, z: 29.2, yaw: -Math.PI / 2 - 0.4, w: 4.6, d: 3.6, h: 2.5, roof: 'tile' },
  { x: -13.4, z: 9.2, yaw: 0.2, w: 3.8, d: 3.2, h: 2.3, roof: 'tile' },
  { x: -25.0, z: 22.6, yaw: Math.PI / 2, w: 4.2, d: 3.4, h: 2.4, roof: 'thatch' },
  { x: -14.0, z: 34.0, yaw: Math.PI - 0.2, w: 3.8, d: 3.2, h: 2.3, roof: 'thatch' },
];

const _v = new THREE.Vector3();

function footprintY(x, z, w, d, yaw) {
  let min = Infinity;
  let max = -Infinity;
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  for (const [lx, lz] of [
    [-w / 2, -d / 2],
    [w / 2, -d / 2],
    [-w / 2, d / 2],
    [w / 2, d / 2],
    [0, 0],
  ]) {
    const h = heightAt(x + lx * c + lz * s, z - lx * s + lz * c);
    min = Math.min(min, h);
    max = Math.max(max, h);
  }
  return { min, max };
}

function checkSite(name, x, z, w, d, yaw) {
  if (!import.meta.env?.DEV) return;
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  for (let i = -1; i <= 1; i += 0.5)
    for (let j = -1; j <= 1; j += 0.5) {
      const px = x + ((i * w) / 2) * c + ((j * d) / 2) * s;
      const pz = z - ((i * w) / 2) * s + ((j * d) / 2) * c;
      if (pathInfo(px, pz) < 0) return console.warn(`[village] ${name} overlaps a path at`, px.toFixed(1), pz.toFixed(1));
      if (Math.hypot(px, pz) > rimRadius(Math.atan2(pz, px)) - 1.5) return console.warn(`[village] ${name} hangs off the rim`);
    }
}

function addHouse(b, win, fol, rand, def, chimneys) {
  const { x, z, yaw, w, d, h } = def;
  checkSite('house', x, z, w, d, yaw);
  const { min, max } = footprintY(x, z, w + 0.6, d + 0.6, yaw);
  const floor = max + 0.12;
  const M = placeMatrix(x, floor, z, yaw);
  const wall = def.bakery ? 0xf4e2c0 : PLASTER[Math.floor(rand() * PLASTER.length)];
  const roofColor = def.roof === 'thatch' ? (rand() < 0.5 ? 0xd8b25a : 0xcda24f) : rand() < 0.6 ? 0xc8623f : 0xb4573f;
  const shutter = SHUTTERS[Math.floor(rand() * SHUTTERS.length)];
  const P = (g, color, local, opts) => addPlaced(b, g, color, local, M, { jitter: 0.04, ...opts });
  const W = (g, local) => addPlaced(win, g, 0x3b4658, local, M);

  const found = floor - min + 0.6;
  P(box(w + 0.3, found, d + 0.3), STONE, { p: [0, -found / 2 + 0.12, 0] }, { jitter: 0.08 });
  P(box(w, h, d), wall, { p: [0, h / 2, 0] });
  const pitch = d * (def.roof === 'thatch' ? 0.62 : 0.5);
  P(gablePrism(w - 0.02, d, pitch), wall, { p: [0, h, 0] });
  // timber frame
  for (const sx of [-1, 1])
    for (const sz of [-1, 1]) P(box(0.16, h, 0.16), TIMBER, { p: [(sx * w) / 2, h / 2, (sz * d) / 2] });
  for (const sz of [-1, 1]) {
    P(box(w + 0.04, 0.15, 0.16), TIMBER, { p: [0, h - 0.07, (sz * d) / 2] });
    P(box(w + 0.04, 0.12, 0.12), TIMBER, { p: [0, h * 0.48, (sz * d) / 2 + sz * 0.01] });
  }
  for (const sx of [-1, 1]) {
    P(box(0.14, 0.15, d + 0.04), TIMBER, { p: [(sx * w) / 2, h - 0.07, 0] });
    // diagonal braces on the gable ends
    P(box(0.1, Math.hypot(d / 2, pitch) * 0.95, 0.1), TIMBER, { p: [(sx * w) / 2 + sx * 0.02, h + pitch / 2, -d / 4], r: [Math.atan2(d / 2, pitch), 0, 0] });
    P(box(0.1, Math.hypot(d / 2, pitch) * 0.95, 0.1), TIMBER, { p: [(sx * w) / 2 + sx * 0.02, h + pitch / 2, d / 4], r: [-Math.atan2(d / 2, pitch), 0, 0] });
  }
  addGableRoof(b, roofColor, {
    w,
    d,
    ridgeY: h + pitch,
    pitchH: pitch,
    overhang: def.roof === 'thatch' ? 0.42 : 0.32,
    thick: def.roof === 'thatch' ? 0.34 : 0.16,
    xf: M,
  });
  // door, step, windows with shutters
  const doorX = w > 4.2 ? -w / 4 : 0;
  P(box(0.85, 1.55, 0.1), WOOD_DARK, { p: [doorX, 0.78, d / 2 + 0.04] });
  P(box(1.05, 0.12, 0.14), TIMBER, { p: [doorX, 1.6, d / 2 + 0.05] });
  P(box(1.1, 0.16, 0.55), STONE, { p: [doorX, -0.04, d / 2 + 0.32] });
  const winAt = (lx, ly, lz, ry) => {
    W(box(0.58, 0.58, 0.08), { p: [lx, ly, lz], r: [0, ry, 0] });
    const cs = Math.cos(ry);
    const sn = Math.sin(ry);
    for (const s of [-1, 1]) P(box(0.26, 0.62, 0.05), shutter, { p: [lx + s * 0.44 * cs, ly, lz - s * 0.44 * sn], r: [0, ry, 0] });
    P(box(0.7, 0.07, 0.14), TIMBER, { p: [lx, ly - 0.33, lz], r: [0, ry, 0] });
  };
  const fx = doorX === 0 ? [-w / 3.2, w / 3.2] : [w / 5, w / 2.6];
  for (const lx of fx) winAt(lx, 1.25, d / 2 + 0.03, 0);
  winAt(0, 1.25, -d / 2 - 0.03, 0);
  winAt(w / 2 + 0.03, 1.25, 0, Math.PI / 2);
  winAt(-w / 2 - 0.03, 1.25, 0, Math.PI / 2);
  // window boxes with flowers on the front
  for (const lx of fx) {
    P(box(0.62, 0.14, 0.18), WOOD, { p: [lx, 0.87, d / 2 + 0.12] });
    for (let k = 0; k < 3; k++) P(ico(0.08, 0), [0xf06c8a, 0xf4c542, 0xffffff][k], { p: [lx - 0.2 + k * 0.2, 0.98, d / 2 + 0.13] }, { jitter: 0 });
  }
  // chimney
  if (def.chimney !== false) {
    const cxl = w / 2 - 0.65;
    const czl = -d / 4;
    const topY = h + pitch + 0.75;
    P(box(0.55, topY - h + 0.1, 0.55), 0x9b8f86, { p: [cxl, (topY + h) / 2, czl] }, { jitter: 0.08 });
    P(box(0.68, 0.14, 0.68), 0x857a72, { p: [cxl, topY, czl] });
    _v.set(cxl, topY + 0.15, czl).applyMatrix4(M);
    chimneys.push(_v.clone());
  }
  // a bush or two by the door
  for (const s of [-1, 1]) {
    if (rand() < 0.35) continue;
    const g = ico(0.38 + rand() * 0.15, 0);
    addPlaced(fol, g, rand() < 0.5 ? 0x5f9e3d : 0x6aa845, { p: [doorX + s * 0.95, 0.22, d / 2 + 0.35], s: [1, 0.8, 1] }, M, { jitter: 0.1 });
  }
  block(x, z, Math.hypot(w, d) / 2 + 0.6);
  return { M, floor };
}

// ---------------------------------------------------------------------------

function addTree(trunks, fol, rand, x, z, kind = 'round', s = 1) {
  const y = heightAt(x, z) - 0.1;
  if (kind === 'pine') {
    trunks.add(cyl(0.14 * s, 0.22 * s, 1.2 * s, 6), 0x6e4a2c, { p: [x, y + 0.6 * s, z] });
    const tiers = 3;
    for (let i = 0; i < tiers; i++) {
      const r = (1.35 - i * 0.32) * s;
      const hh = (1.7 - i * 0.2) * s;
      const g = cone(r, hh, 7);
      transform(g, { p: [x, y + (1.3 + i * 0.95) * s + hh / 2 - 0.3, z], r: [0, rand() * TAU, 0] });
      fol.push(paint(g, i % 2 ? 0x3f7d4a : 0x4a8a50, { jitter: 0.07, rand }));
    }
    return;
  }
  const trunkH = (kind === 'oak' ? 2.2 : 1.6) * s;
  trunks.add(cyl(0.16 * s, 0.27 * s, trunkH, 6), 0x7a5232, { p: [x, y + trunkH / 2, z], r: [(rand() - 0.5) * 0.1, 0, (rand() - 0.5) * 0.1] });
  const blobs = kind === 'oak' ? 7 : 3 + Math.floor(rand() * 2);
  const greens = kind === 'autumn' ? [0xd99a3c, 0xe2b04a, 0xc97f33] : [0x5e9e3e, 0x6fb04a, 0x538f38, 0x7cb850];
  for (let i = 0; i < blobs; i++) {
    const r = (kind === 'oak' ? 1.35 : 1.0) * s * (0.75 + rand() * 0.45);
    const a = rand() * TAU;
    const spread = (kind === 'oak' ? 1.6 : 0.65) * s * (i === 0 ? 0 : 1);
    const g = ico(r, kind === 'oak' ? 1 : 0);
    transform(g, { p: [x + Math.cos(a) * spread, y + trunkH + r * 0.55 + rand() * 0.5 * s, z + Math.sin(a) * spread], r: [rand(), rand(), rand()], s: [1, 0.85, 1] });
    fol.push(paint(g, greens[Math.floor(rand() * greens.length)], { jitter: 0.07, rand }));
  }
  if (kind === 'oak') {
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * TAU + 0.4;
      // root flares: low tapered spurs sloping into the ground
      trunks.add(cone(0.16 * s, 0.75 * s, 5), 0x6e4a2c, { p: [x + Math.cos(a) * 0.38 * s, y + 0.12, z + Math.sin(a) * 0.38 * s], r: [0, -a, -Math.PI / 2 + 0.35], order: 'YXZ' });
    }
  }
}

function fenceRun(b, rand, pts, { post = 1.2, height = 0.85, closed = false, color = WOOD_LIGHT, gaps = [] } = {}) {
  const list = closed ? [...pts, pts[0]] : pts;
  for (let i = 0; i < list.length - 1; i++) {
    const [ax, az] = list[i];
    const [bx, bz] = list[i + 1];
    const L = Math.hypot(bx - ax, bz - az);
    const n = Math.max(1, Math.round(L / post));
    const yaw = Math.atan2(bx - ax, bz - az);
    for (let k = 0; k <= n; k++) {
      const x = ax + ((bx - ax) * k) / n;
      const z = az + ((bz - az) * k) / n;
      if (gaps.some(([gx, gz, gr]) => Math.hypot(x - gx, z - gz) < gr)) continue;
      const y = heightAt(x, z);
      b.add(box(0.12, height + 0.2, 0.12), WOOD_DARK, { p: [x, y + (height + 0.2) / 2 - 0.1, z] }, { jitter: 0.1 });
      if (k < n) {
        const x2 = ax + ((bx - ax) * (k + 1)) / n;
        const z2 = az + ((bz - az) * (k + 1)) / n;
        if (gaps.some(([gx, gz, gr]) => Math.hypot((x + x2) / 2 - gx, (z + z2) / 2 - gz) < gr)) continue;
        const y2 = heightAt(x2, z2);
        const seg = Math.hypot(x2 - x, z2 - z);
        const tilt = Math.atan2(y2 - y, seg);
        for (const hh of [height * 0.45, height * 0.9]) {
          b.add(box(0.07, 0.1, seg + 0.08), color, { p: [(x + x2) / 2, (y + y2) / 2 + hh, (z + z2) / 2], r: [-tilt, yaw, 0], order: 'YXZ' }, { jitter: 0.08 });
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------

export function buildVillage() {
  const rand = rng(4242);
  const group = new THREE.Group();
  group.name = 'village';
  const b = new Builder(rand);
  const win = new Builder(rand);
  const fol = new Builder(rand);
  const trunks = b;
  const chimneys = [];
  const anchors = {};

  // keep vegetation out of busy spots
  block(WELL.x, WELL.z, 2.2);
  block(WOODCUT.x - 1, WOODCUT.z, 3.2);
  block(KIDS.x, KIDS.z, KIDS.r + 1.6);
  block(YARD.x, YARD.z, 4.2);
  block(PEN.x, PEN.z, 4.8);
  block(OAK.x, OAK.z, 3.2);
  block(LINE.x, LINE.z, 2.4);
  block(STALL.x, STALL.z, 2.6);
  block(BARN.x, BARN.z, 3.8);
  block(DOCK.x0 - 1, DOCK.z, 2);

  // ---- houses --------------------------------------------------------------
  for (const def of HOUSES) {
    const r = addHouse(b, win, fol, rand, def, chimneys);
    if (def.bakery) anchors.bakery = r;
  }

  // bakery extras: sign, bread oven, flour sacks
  {
    const M = anchors.bakery.M;
    const P = (g, c, l, o) => addPlaced(b, g, c, l, M, { jitter: 0.04, ...o });
    P(box(0.08, 0.08, 0.9), WOOD_DARK, { p: [1.2, 2.15, 2.35], r: [0, Math.PI / 2, 0] });
    P(box(0.75, 0.45, 0.06), WOOD_LIGHT, { p: [1.25, 1.85, 2.4] });
    P(sphere(0.18, 7, 5), 0xd99a4a, { p: [1.25, 1.86, 2.45], s: [1.4, 0.7, 0.6] });
    // dome oven to the side
    P(sphere(1.0, 10, 6), 0xb7a48c, { p: [-3.4, 0.0, 0.6], s: [1, 0.95, 1] }, { jitter: 0.08 });
    P(box(1.6, 0.4, 1.6), STONE, { p: [-3.4, -0.1, 0.6] });
    P(box(0.25, 0.9, 0.25), 0x8d837a, { p: [-3.6, 1.15, 0.3] });
    for (let i = 0; i < 3; i++) P(sphere(0.25, 7, 5), 0xece3cf, { p: [2.0 + i * 0.25, 0.22, 2.1 + (i % 2) * 0.3], s: [1, 1.3, 1] });
    const mouth = new THREE.Mesh(new THREE.CircleGeometry(0.32, 10), glowMat);
    _v.set(-3.4, 0.25, 1.62).applyMatrix4(M);
    mouth.position.copy(_v);
    mouth.rotation.y = BAKERY.yaw;
    group.add(mouth);
    chimneys.push(new THREE.Vector3(-3.6, 1.65, 0.3).applyMatrix4(M));
    anchors.bakeryDoor = new THREE.Vector3(-5.0 / 4, 0, 3.8 / 2 + 0.8).applyMatrix4(M);
  }

  // ---- well & trough -------------------------------------------------------
  {
    const gy = heightAt(WELL.x, WELL.z);
    const R = WELL_RIG;
    const at = (g, c, p, o = {}) => b.add(g, c, { p: [WELL.x + p[0], gy + p[1], WELL.z + p[2]], r: o.r, s: o.s }, { jitter: o.j ?? 0.06 });
    at(cyl(R.ringR, R.ringR + 0.05, R.ringH, 12, true), 0xb3aa9c, [0, R.ringH / 2, 0]);
    const inner = cyl(R.innerR, R.innerR, R.ringH, 12, true);
    inner.scale(-1, 1, 1);
    at(inner, 0x6f675e, [0, R.ringH / 2, 0]);
    at(new THREE.RingGeometry(R.innerR, R.ringR + 0.06, 12).rotateX(-Math.PI / 2), 0xc6bdae, [0, R.ringH, 0]);
    at(new THREE.CircleGeometry(R.innerR, 12).rotateX(-Math.PI / 2), 0x15222a, [0, 0.12, 0], { j: 0 });
    for (const sx of [-1, 1]) at(box(0.15, 2.05, 0.15), WOOD, [sx * R.postX, 1.02, 0]);
    at(box(2.15, 0.12, 0.14), WOOD_DARK, [0, 2.0, 0]);
    addGableRoof(b, 0xc8623f, { w: 2.2, d: 1.5, ridgeY: 2.62, pitchH: 0.6, overhang: 0.2, thick: 0.12, xf: placeMatrix(WELL.x, gy, WELL.z, 0) });
    anchors.wellY = gy;

    // trough (along X, south of the well)
    const ty = heightAt(TROUGH.x, TROUGH.z);
    const T = TROUGH_RIG;
    const tat = (g, c, p) => b.add(g, c, { p: [TROUGH.x + p[0], ty + p[1], TROUGH.z + p[2]] }, { jitter: 0.08 });
    tat(box(T.w, 0.08, T.d), WOOD, [0, 0.12, 0]);
    for (const s of [-1, 1]) {
      tat(box(T.w, T.h - 0.08, 0.07), WOOD, [0, 0.12 + (T.h - 0.08) / 2, (s * (T.d - 0.07)) / 2]);
      tat(box(0.07, T.h - 0.08, T.d), WOOD, [(s * (T.w - 0.07)) / 2, 0.12 + (T.h - 0.08) / 2, 0]);
      tat(box(0.12, 0.14, T.d + 0.1), WOOD_DARK, [s * (T.w / 2 - 0.25), 0.05, 0]);
    }
    tat(box(T.w - 0.12, 0.02, T.d - 0.12), 0x4fb0d8, [0, T.waterY, 0]);
    anchors.troughY = ty;
  }

  // ---- market stall --------------------------------------------------------
  {
    const yaw = Math.atan2(PLAZA.x - STALL.x, PLAZA.z - STALL.z);
    STALL.yaw = yaw;
    const gy = heightAt(STALL.x, STALL.z);
    const M = placeMatrix(STALL.x, gy, STALL.z, yaw);
    const P = (g, c, l, o) => addPlaced(b, g, c, l, M, { jitter: 0.05, ...o });
    P(box(2.4, 0.1, 1.0), WOOD_LIGHT, { p: [0, 0.9, 0] });
    P(box(2.3, 0.75, 0.9), WOOD, { p: [0, 0.45, 0.02] });
    for (const sx of [-1.15, 1.15]) for (const sz of [-0.45, 0.5]) P(box(0.1, 2.2, 0.1), WOOD_DARK, { p: [sx, 1.1, sz] });
    // striped awning
    for (let i = 0; i < 6; i++) P(box(2.6 / 6, 0.06, 1.5), i % 2 ? 0xffffff : 0xd8463e, { p: [-1.3 + (i + 0.5) * (2.6 / 6), 2.2, 0.2], r: [0.28, 0, 0] }, { jitter: 0.02 });
    for (let i = 0; i < 6; i++) P(cone(0.13, 0.25, 3), i % 2 ? 0xffffff : 0xd8463e, { p: [-1.3 + (i + 0.5) * (2.6 / 6), 1.86, 0.95], r: [Math.PI, 0, 0] }, { jitter: 0 });
    // goods: apples, cabbages, loaves, pumpkins
    for (let i = 0; i < 7; i++) P(ico(0.09, 0), 0xd23c3c, { p: [-0.95 + (i % 4) * 0.17, 1.02 + Math.floor(i / 4) * 0.1, 0.15 + (i % 2) * 0.12] }, { jitter: 0.1 });
    for (let i = 0; i < 3; i++) P(ico(0.17, 0), 0x7fbf4f, { p: [-0.1 + i * 0.3, 1.08, 0.2] }, { jitter: 0.1 });
    for (let i = 0; i < 4; i++) P(capsuleish(), 0xd99a4a, { p: [0.75 + (i % 2) * 0.25, 1.02, -0.05 + Math.floor(i / 2) * 0.3], r: [0, 0, Math.PI / 2] });
    P(sphere(0.32, 8, 6), 0xe8862f, { p: [1.6, 0.25, 0.7], s: [1, 0.75, 1] });
    P(sphere(0.25, 8, 6), 0xe8862f, { p: [1.9, 0.2, 0.25], s: [1, 0.75, 1] });
    P(box(0.6, 0.45, 0.5), 0xa87a4a, { p: [-1.75, 0.22, 0.4], r: [0, 0.3, 0] });
    anchors.stall = { M, yaw, gy };
  }

  // ---- lanterns around the plaza (glow at dusk) -----------------------------
  for (const a of [0.6, 2.4, 4.1, 5.4]) {
    const x = PLAZA.x + Math.cos(a) * (PLAZA.r + 0.6);
    const z = PLAZA.z + Math.sin(a) * (PLAZA.r + 0.6);
    const y = heightAt(x, z);
    b.add(box(0.12, 2.2, 0.12), WOOD_DARK, { p: [x, y + 1.1, z] });
    b.add(box(0.5, 0.08, 0.08), WOOD_DARK, { p: [x + 0.2, y + 2.15, z] });
    win.add(box(0.22, 0.3, 0.22), 0x3b4658, { p: [x + 0.4, y + 1.9, z] });
    b.add(cone(0.2, 0.15, 4), 0x3a3a3a, { p: [x + 0.4, y + 2.12, z], r: [0, Math.PI / 4, 0] });
  }
  // benches + cart by the plaza
  anchors.benches = [];
  for (const [x, z, yaw] of [
    [PLAZA.x - 4.4, PLAZA.z + 2.6, 0.9],
    [PLAZA.x + 4.6, PLAZA.z - 1.8, -1.6],
  ]) {
    anchors.benches.push({ x, z, yaw, y: heightAt(x, z), seat: 0.4 });
    const y = heightAt(x, z);
    const M = placeMatrix(x, y, z, yaw);
    addPlaced(b, box(1.6, 0.08, 0.42), WOOD, { p: [0, 0.36, 0] }, M);
    for (const s of [-0.65, 0.65]) addPlaced(b, box(0.08, 0.36, 0.35), WOOD_DARK, { p: [s, 0.17, 0] }, M);
  }
  {
    const x = PLAZA.x + 5.2;
    const z = PLAZA.z + 3.6;
    const y = heightAt(x, z);
    const M = placeMatrix(x, y, z, 0.5);
    addPlaced(b, box(1.4, 0.12, 2.2), WOOD, { p: [0, 0.75, 0] }, M);
    for (const s of [-1, 1]) {
      addPlaced(b, box(0.08, 0.4, 2.2), WOOD, { p: [s * 0.66, 0.95, 0] }, M);
      addPlaced(b, cyl(0.42, 0.42, 0.1, 10), WOOD_DARK, { p: [s * 0.78, 0.42, 0.3], r: [0, 0, Math.PI / 2] }, M);
    }
    addPlaced(b, box(0.08, 0.08, 1.6), WOOD_DARK, { p: [0, 0.6, 1.8] }, M);
    for (let i = 0; i < 4; i++) addPlaced(b, box(0.5, 0.4, 0.5), 0xe0c068, { p: [(i % 2) * 0.55 - 0.27, 1.02, Math.floor(i / 2) * 0.7 - 0.4], r: [0, i * 0.3, 0] }, M, { jitter: 0.06 });
    block(x, z, 1.8);
  }

  // ---- clothesline (laundry is animated cloth) ------------------------------
  const laundry = [];
  {
    const c = Math.cos(LINE.yaw);
    const s = Math.sin(LINE.yaw);
    const ends = [-1.7, 1.7].map((k) => [LINE.x + k * c, LINE.z - k * s]);
    for (const [x, z] of ends) b.add(box(0.12, 2.0, 0.12), WOOD_DARK, { p: [x, heightAt(x, z) + 1.0, z] });
    const y0 = heightAt(LINE.x, LINE.z) + 1.85;
    const line = cyl(0.015, 0.015, 3.4, 4);
    transform(line, { p: [LINE.x, y0, LINE.z], r: [0, LINE.yaw, Math.PI / 2], order: 'YXZ' });
    b.push(paint(line, 0xe8e0d0, {}));
    const cloths = [
      [0xffffff, 0.7, 0.9],
      [0x6f9fd8, 0.6, 0.75],
      [0xf2d16b, 0.55, 0.6],
      [0xe57b7b, 0.7, 0.85],
    ];
    cloths.forEach(([col, w, h], i) => {
      const k = -1.15 + i * 0.78;
      const cl = new Cloth({ w, h, segX: 3, segY: 4, mode: 'banner', color: col, amp: 0.1, period: 2, offset: i * 0.21 });
      cl.mesh.position.set(LINE.x + k * c, y0, LINE.z - k * s);
      cl.mesh.rotation.y = LINE.yaw;
      group.add(cl.mesh);
      laundry.push(cl);
    });
    anchors.line = { y: y0, ends };
  }

  // ---- pig pen with mud wallow ---------------------------------------------
  {
    const { x, z, w, d } = PEN;
    fenceRun(b, rand, [
      [x - w / 2, z - d / 2],
      [x + w / 2, z - d / 2],
      [x + w / 2, z + d / 2],
      [x - w / 2, z + d / 2],
    ], { closed: true, gaps: [[x + w / 2, z - d / 2 + 1.2, 0.6]] });
    // feeding trough + little shelter
    const ty = heightAt(x - w / 2 + 1, z + d / 2 - 0.7);
    b.add(box(1.3, 0.3, 0.45), WOOD, { p: [x - w / 2 + 1.2, ty + 0.15, z + d / 2 - 0.7] });
    b.add(box(1.1, 0.06, 0.3), 0xb59a5a, { p: [x - w / 2 + 1.2, ty + 0.3, z + d / 2 - 0.7] });
    const sx = x - w / 2 + 1.1;
    const sz = z - d / 2 + 1.1;
    const sy = heightAt(sx, sz);
    for (const [ox, oz] of [
      [-0.8, -0.7],
      [0.8, -0.7],
      [-0.8, 0.7],
      [0.8, 0.7],
    ])
      b.add(box(0.1, 1.2, 0.1), WOOD_DARK, { p: [sx + ox, sy + 0.6, sz + oz] });
    b.add(box(2.0, 0.12, 1.8), 0xcda24f, { p: [sx, sy + 1.25, sz], r: [0.2, 0, 0] });
    // mud surface: glossy, slightly domed
    const mud = new THREE.Mesh(
      new THREE.CircleGeometry(MUD.r + 0.35, 20).rotateX(-Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0x5a3b26, roughness: 0.35, metalness: 0 }),
    );
    mud.position.set(MUD.x, heightAt(MUD.x, MUD.z) + 0.06, MUD.z);
    mud.receiveShadow = true;
    group.add(mud);
    anchors.mudY = mud.position.y;
  }

  // ---- chicken yard: coop, haystack, feed -----------------------------------
  {
    const cx = YARD.x - 1.6;
    const cz = YARD.z + 3.6;
    const cy = heightAt(cx, cz);
    const M = placeMatrix(cx, cy, cz, Math.PI + 0.3);
    for (const [ox, oz] of [
      [-0.6, -0.5],
      [0.6, -0.5],
      [-0.6, 0.5],
      [0.6, 0.5],
    ])
      addPlaced(b, box(0.1, 0.6, 0.1), WOOD_DARK, { p: [ox, 0.3, oz] }, M);
    addPlaced(b, box(1.4, 0.9, 1.2), 0xc0573e, { p: [0, 1.05, 0] }, M, { jitter: 0.05 });
    addPlaced(b, gablePrism(1.4, 1.2, 0.5), 0xc0573e, { p: [0, 1.5, 0] }, M);
    addGableRoof(b, 0x8a5a33, { w: 1.4, d: 1.2, ridgeY: 2.0, pitchH: 0.5, overhang: 0.15, thick: 0.08, xf: M });
    addPlaced(win, box(0.4, 0.45, 0.06), 0x3b4658, { p: [0, 1.0, 0.61] }, M);
    addPlaced(b, box(0.35, 0.05, 1.0), WOOD_LIGHT, { p: [0, 0.35, 1.0], r: [0.6, 0, 0] }, M);
    block(cx, cz, 1.5);
    // haystack the dog chases chickens around
    const hy = heightAt(YARD.x, YARD.z);
    b.add(cone(1.2, 1.9, 9), 0xe2c25e, { p: [YARD.x, hy + 0.9, YARD.z] }, { jitter: 0.08 });
    b.add(cyl(1.25, 1.3, 0.5, 9), 0xd6b553, { p: [YARD.x, hy + 0.2, YARD.z] }, { jitter: 0.08 });
    anchors.haystack = { x: YARD.x, z: YARD.z, y: hy };
    // feed scatter
    for (let i = 0; i < 18; i++) {
      const a = rand() * TAU;
      const r = 2.2 + rand() * 1.5;
      const x = YARD.x + Math.cos(a) * r;
      const z = YARD.z + Math.sin(a) * r;
      b.add(box(0.05, 0.02, 0.05), 0xf2d16b, { p: [x, heightAt(x, z) + 0.01, z] }, { jitter: 0 });
    }
  }

  // ---- woodcutter's yard -----------------------------------------------------
  {
    const gy = heightAt(WOODCUT.x, WOODCUT.z);
    anchors.woodY = gy;
    const W = (g, c, p, r, o) => b.add(g, c, { p: [WOODCUT.x + p[0], gy + p[1], WOODCUT.z + p[2]], r }, { jitter: 0.06, ...o });
    // chopping stump (top at 0.45)
    W(cyl(0.38, 0.45, 0.47, 9), 0x7a5232, [0, 0.22, 0]);
    W(cyl(0.37, 0.37, 0.02, 9), 0xd9b98a, [0, 0.465, 0]);
    // log pile behind the woodcutter (logs lie along Z)
    const px = -2.15;
    const rows = [
      [-0.42, 0, 0.42],
      [-0.21, 0.21],
      [0],
    ];
    rows.forEach((row, ri) =>
      row.forEach((oz, i) => {
        if (ri === 2) return; // top slot is the animated log
        W(cyl(0.2, 0.2, 1.1, 8), 0x8a5a33, [px + oz, 0.2 + ri * 0.36, 0], [Math.PI / 2, 0, 0]);
        W(cyl(0.17, 0.17, 1.12, 8), 0xd9b98a, [px + oz, 0.2 + ri * 0.36, 0], [Math.PI / 2, 0, 0]);
      }),
    );
    anchors.logPile = { x: WOODCUT.x + px, y: gy + 0.2 + 2 * 0.36, z: WOODCUT.z };
    // split-wood heaps either side of the stump
    for (const sz of [-1, 1]) {
      for (let i = 0; i < 9; i++) {
        const half = new THREE.CylinderGeometry(0.17, 0.17, 0.48, 7, 1, false, 0, Math.PI);
        const ox = 0.25 + (rand() - 0.5) * 0.9;
        const oz = sz * (0.85 + rand() * 0.45);
        W(half, 0xd9b98a, [ox, 0.08 + rand() * 0.18, oz], [Math.PI / 2 + (rand() - 0.5) * 0.6, rand() * TAU, (rand() - 0.5) * 0.4]);
      }
    }
    // woodshed lean-to behind the pile, stacked with firewood
    for (const oz of [-1.4, 1.4]) {
      W(box(0.12, 2.2, 0.12), WOOD_DARK, [-3.2, 1.1, oz]);
      W(box(0.12, 1.5, 0.12), WOOD_DARK, [-2.3, 0.75, oz]);
    }
    W(box(1.4, 0.1, 3.2), 0x9a5b3a, [-2.75, 1.85, 0], [0, 0, 0.55]);
    for (let i = 0; i < 4; i++) W(box(0.45, 0.32, 2.6), i % 2 ? 0xc9a676 : 0xb48f60, [-2.95, 0.17 + i * 0.32, 0], undefined, { jitter: 0.1 });
  }

  // ---- fields: wheat, cabbages, pumpkins + scarecrow -------------------------
  const crops = { wheat: [], cabbage: [], pumpkin: [] };
  {
    const ridges = [];
    for (let k = 0; ; k++) {
      const x = FIELD.x0 + 0.625 + 2.5 * k;
      if (x > FIELD.x1 - 0.3) break;
      ridges.push(x);
    }
    ridges.forEach((x, k) => {
      const kind = k < 2 ? 'wheat' : k < 4 ? 'cabbage' : 'pumpkin';
      const step = kind === 'wheat' ? 0.32 : kind === 'cabbage' ? 0.7 : 1.1;
      for (let z = FIELD.z0 + 0.5; z < FIELD.z1 - 0.4; z += step) {
        if (kind === 'wheat') for (const ox of [-0.32, 0, 0.32]) crops.wheat.push([x + ox + (rand() - 0.5) * 0.12, z + (rand() - 0.5) * 0.12, 0.8 + rand() * 0.35]);
        else crops[kind].push([x + (rand() - 0.5) * 0.15, z + (rand() - 0.5) * 0.2, 0.8 + rand() * 0.4]);
      }
    });
    anchors.furrows = ridges.slice(0, -1).map((x) => x + 1.25);
    // scarecrow
    const sx = (FIELD.x0 + FIELD.x1) / 2 + 0.3;
    const sz = FIELD.z0 + 3.2;
    const sy = heightAt(sx, sz);
    b.add(box(0.1, 2.2, 0.1), WOOD_DARK, { p: [sx, sy + 1.1, sz] });
    b.add(box(1.5, 0.08, 0.08), WOOD_DARK, { p: [sx, sy + 1.6, sz] });
    b.add(box(0.5, 0.7, 0.3), 0x7d8f4a, { p: [sx, sy + 1.45, sz] });
    b.add(sphere(0.22, 7, 5), 0xe2c98f, { p: [sx, sy + 2.05, sz] });
    b.add(cone(0.42, 0.35, 8), 0xd8b25a, { p: [sx, sy + 2.3, sz] });
    b.add(cyl(0.5, 0.5, 0.04, 10), 0xd8b25a, { p: [sx, sy + 2.17, sz] });
    for (const s of [-1, 1]) b.add(cone(0.1, 0.25, 5), 0xe0c068, { p: [sx + s * 0.8, sy + 1.6, sz], r: [0, 0, (s * Math.PI) / 2] });
    // field fence on the outer sides
    fenceRun(b, rand, [
      [FIELD.x1 + 0.4, FIELD.z0 - 0.4],
      [FIELD.x0 - 0.4, FIELD.z0 - 0.4],
      [FIELD.x0 - 0.4, FIELD.z1 + 0.4],
    ], { post: 1.6, height: 0.7 });
  }

  // ---- pasture fence, barn, hay ----------------------------------------------
  {
    const { x0, x1, z0, z1 } = PASTURE;
    fenceRun(b, rand, [
      [x0, z0],
      [x1, z0],
      [x1, z1],
      [x0, z1],
    ], { closed: true, post: 1.5, gaps: [[x0 + 4, z1, 1.0]] });
    const bx = BARN.x;
    const bz = BARN.z;
    const { max } = footprintY(bx, bz, 6, 5, 0);
    const M = placeMatrix(bx, max + 0.1, bz, Math.PI);
    const P = (g, c, l, o) => addPlaced(b, g, c, l, M, { jitter: 0.05, ...o });
    P(box(6.2, 1.5, 5.2), STONE, { p: [0, -0.7, 0] });
    P(box(6, 3.2, 5), 0xb5523c, { p: [0, 1.6, 0] });
    P(gablePrism(6, 5, 2.2), 0xb5523c, { p: [0, 3.2, 0] });
    addGableRoof(b, 0x6f5a4a, { w: 6, d: 5, ridgeY: 5.4, pitchH: 2.2, overhang: 0.35, thick: 0.18, xf: M });
    P(box(2.2, 2.4, 0.1), 0x7a3a2a, { p: [0, 1.2, 2.53] });
    P(box(0.12, 2.6, 0.12), 0xf2ead8, { p: [0, 1.25, 2.6], r: [0, 0, 0.74] });
    P(box(0.12, 2.6, 0.12), 0xf2ead8, { p: [0, 1.25, 2.6], r: [0, 0, -0.74] });
    for (let i = 0; i < 3; i++) b.add(cyl(0.55, 0.55, 0.9, 10), 0xe0c068, { p: [x0 + 2 + i * 1.3, heightAt(x0 + 2 + i * 1.3, z1 - 1.5) + 0.55, z1 - 1.5], r: [Math.PI / 2, 0.2 * i, 0] }, { jitter: 0.06 });
    const ty = heightAt(x1 - 2.5, z0 + 2);
    b.add(box(1.6, 0.4, 0.6), WOOD, { p: [x1 - 2.5, ty + 0.2, z0 + 2] });
    b.add(box(1.45, 0.04, 0.45), 0x4fb0d8, { p: [x1 - 2.5, ty + 0.38, z0 + 2] });
  }

  // ---- fisherman's dock ---------------------------------------------------------
  {
    const y = POND.water + 0.32;
    anchors.dockY = y;
    for (let x = DOCK.x0; x <= DOCK.x1 + 0.01; x += 0.32) b.add(box(0.28, 0.07, DOCK.w), x % 0.64 < 0.32 ? WOOD_LIGHT : 0x9c6d42, { p: [x, y, DOCK.z] }, { jitter: 0.06 });
    for (const x of [DOCK.x0 + 0.6, DOCK.x1 - 0.1]) for (const s of [-1, 1]) b.add(cyl(0.07, 0.07, 1.4, 6), WOOD_DARK, { p: [x, y - 0.6, DOCK.z + s * (DOCK.w / 2 - 0.05)] });
    // creel basket beside the fisherman
    b.add(cyl(0.2, 0.16, 0.3, 8), 0xb48f60, { p: [DOCK.x1 - 0.5, y + 0.18, DOCK.z - 0.42] }, { jitter: 0.08 });
    anchors.creel = new THREE.Vector3(DOCK.x1 - 0.5, y + 0.33, DOCK.z - 0.42);
    // reeds round the shore
    for (let i = 0; i < 26; i++) {
      const a = rand() * TAU;
      if (Math.abs(Math.sin(a)) < 0.3 && Math.cos(a) < 0) continue; // keep the dock side clear
      const r = POND.r + 0.3 + rand() * 0.6;
      const x = POND.x + Math.cos(a) * r;
      const z = POND.z + Math.sin(a) * r;
      const h = 0.6 + rand() * 0.6;
      b.add(cyl(0.02, 0.03, h, 3), 0x6f9a3e, { p: [x, POND.water + h / 2, z], r: [(rand() - 0.5) * 0.3, 0, (rand() - 0.5) * 0.3] });
      if (rand() < 0.5) b.add(capsuleish(0.05, 0.16), 0x6b4a2e, { p: [x, POND.water + h, z] });
    }
  }

  // ---- big oak + trees -------------------------------------------------------
  addTree(trunks, fol, rand, OAK.x, OAK.z, 'oak', 1.25);
  const forest = [
    // [x, z, radius, count, pine fraction]
    [0, -31, 9, 22, 0.55],
    [-18, -20, 7, 12, 0.5],
    [20, -29, 6, 9, 0.6],
    [-34, 18, 6, 10, 0.4],
    [-29, 32, 6, 8, 0.3],
    [35, 6, 5, 8, 0.4],
    [33, 22, 5, 7, 0.3],
    [-30, -18, 6, 9, 0.5],
    [-20, 8, 3, 3, 0.2],
    [26, 37, 3, 3, 0.2],
  ];
  for (const [fx, fz, r, n, pine] of forest) {
    let placed = 0;
    for (let tries = 0; tries < n * 8 && placed < n; tries++) {
      const a = rand() * TAU;
      const d = Math.sqrt(rand()) * r;
      const x = fx + Math.cos(a) * d;
      const z = fz + Math.sin(a) * d;
      if (!isFreeGround(x, z, 1.0)) continue;
      const kind = rand() < pine ? 'pine' : rand() < 0.12 ? 'autumn' : 'round';
      addTree(trunks, fol, rand, x, z, kind, 0.8 + rand() * 0.55);
      block(x, z, 1.1);
      placed++;
    }
  }
  // a few lone trees around the village
  for (const [x, z, k] of [
    [-2, 6.5, 'round'],
    [15.5, 16.5, 'round'],
    [-13, 17, 'autumn'],
    [26, 16, 'round'],
    [-19.5, 31, 'pine'],
    [6, -0.5, 'round'],
    [-7.5, 3.5, 'pine'],
  ]) {
    if (!isFreeGround(x, z, 0.4)) continue;
    addTree(trunks, fol, rand, x, z, k, 0.95);
    block(x, z, 1.1);
  }

  // ---- instanced grass, flowers and crops -----------------------------------
  const instanced = buildGroundCover(rand, crops);
  instanced.forEach((m) => group.add(m));

  const stat = b.build(flatMat);
  stat.name = 'village-static';
  group.add(stat);
  const glass = win.build(windowMat, { cast: false });
  group.add(glass);
  const leaves = fol.build(foliageMat);
  leaves.name = 'foliage';
  group.add(leaves);

  function update(t) {
    for (const l of laundry) l.update(t);
  }

  return { group, update, chimneys, anchors };
}

/** Short rounded loaf / cattail shape. */
function capsuleish(r = 0.07, len = 0.22) {
  return new THREE.CapsuleGeometry(r, len, 2, 6);
}

// ---------------------------------------------------------------------------

function tuftGeometry() {
  // three crossed blades with a dark base and light tips (per-vertex colours)
  const pos = [];
  const col = [];
  const base = new THREE.Color(0x4f8a34);
  const tip = new THREE.Color(0xa6d46a);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI + 0.3;
    const c = Math.cos(a) * 0.07;
    const s = Math.sin(a) * 0.07;
    const lean = (i - 1) * 0.06;
    pos.push(-c, 0, -s, c, 0, s, lean, 0.42 + i * 0.05, 0);
    col.push(base.r, base.g, base.b, base.r, base.g, base.b, tip.r, tip.g, tip.b);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.computeVertexNormals();
  return g;
}

function wheatGeometry() {
  const parts = [];
  const stalk = cyl(0.012, 0.018, 0.9, 3);
  transform(stalk, { p: [0, 0.45, 0] });
  parts.push(paint(stalk, 0xc9a94a));
  const ear = new THREE.CapsuleGeometry(0.035, 0.16, 2, 4);
  transform(ear, { p: [0, 0.98, 0] });
  parts.push(paint(ear, 0xe8c45a));
  const g = new Builder();
  parts.forEach((p) => g.push(p));
  return g.geometry();
}

function scatterMatrix(dummy, x, y, z, s, rand, tilt = 0.15) {
  dummy.position.set(x, y, z);
  dummy.rotation.set((rand() - 0.5) * tilt, rand() * TAU, (rand() - 0.5) * tilt);
  dummy.scale.setScalar(s);
  dummy.updateMatrix();
  return dummy.matrix;
}

function buildGroundCover(rand, crops) {
  const out = [];
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  // grass tufts
  const tufts = [];
  for (let i = 0; i < 9000 && tufts.length < 2600; i++) {
    const a = rand() * TAU;
    const r = Math.sqrt(rand()) * 44;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    if (!isFreeGround(x, z, 0.2)) continue;
    tufts.push([x, z]);
  }
  // castle hill slope gets grass too (isFreeGround excludes it)
  for (let i = 0; i < 700; i++) {
    const a = rand() * TAU;
    const r = CASTLE.plateauR + 0.8 + rand() * (CASTLE.hillR - CASTLE.plateauR);
    const x = CASTLE.x + Math.cos(a) * r;
    const z = CASTLE.z + Math.sin(a) * r;
    if (pathInfo(x, z) < 0.3 || Math.hypot(x, z) > rimRadius(Math.atan2(z, x)) - 1.5) continue;
    tufts.push([x, z]);
  }
  const grass = new THREE.InstancedMesh(tuftGeometry(), grassMat, tufts.length);
  tufts.forEach(([x, z], i) => {
    grass.setMatrixAt(i, scatterMatrix(dummy, x, heightAt(x, z) - 0.02, z, 0.7 + rand() * 0.8, rand));
    const v = 0.82 + rand() * 0.36;
    grass.setColorAt(i, color.setRGB(v * (0.92 + rand() * 0.16), v, v * (0.85 + rand() * 0.2)));
  });
  grass.receiveShadow = true;
  out.push(grass);

  // flowers: little blossoms in drifts
  const flowerSpots = [];
  for (let i = 0; i < 4000 && flowerSpots.length < 520; i++) {
    const a = rand() * TAU;
    const r = Math.sqrt(rand()) * 43;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    // drifts: only where low-frequency noise is high
    if (Math.sin(x * 0.21) * Math.cos(z * 0.17) < 0.25) continue;
    if (!isFreeGround(x, z, 0.3)) continue;
    flowerSpots.push([x, z]);
  }
  const flowerGeom = new Builder();
  flowerGeom.add(cyl(0.012, 0.012, 0.26, 3), 0x4f8a34, { p: [0, 0.13, 0] });
  flowerGeom.add(ico(0.065, 0), 0xffffff, { p: [0, 0.28, 0] });
  const flowers = new THREE.InstancedMesh(flowerGeom.geometry(), grassMat, flowerSpots.length);
  const petals = [0xffffff, 0xf7d84a, 0xf28cb1, 0xb48be0, 0xf47a5a];
  flowerSpots.forEach(([x, z], i) => {
    flowers.setMatrixAt(i, scatterMatrix(dummy, x, heightAt(x, z) - 0.02, z, 0.8 + rand() * 0.5, rand, 0.3));
    flowers.setColorAt(i, color.set(petals[Math.floor(rand() * petals.length)]));
  });
  out.push(flowers);

  // wheat (sways)
  const wheat = new THREE.InstancedMesh(wheatGeometry(), grassMat, crops.wheat.length);
  crops.wheat.forEach(([x, z, s], i) => {
    wheat.setMatrixAt(i, scatterMatrix(dummy, x, heightAt(x, z) + 0.05, z, s, rand, 0.12));
    wheat.setColorAt(i, color.setScalar(0.9 + rand() * 0.2));
  });
  wheat.castShadow = true;
  out.push(wheat);

  // cabbages + pumpkins (static instanced)
  const cab = new Builder();
  cab.add(ico(0.22, 0), 0x86c75a, { s: [1, 0.8, 1], p: [0, 0.14, 0] });
  cab.add(ico(0.15, 0), 0xb5e38a, { p: [0, 0.2, 0] });
  const cabbages = new THREE.InstancedMesh(cab.geometry(), flatMat, crops.cabbage.length);
  crops.cabbage.forEach(([x, z, s], i) => cabbages.setMatrixAt(i, scatterMatrix(dummy, x, heightAt(x, z), z, s, rand)));
  cabbages.castShadow = true;
  out.push(cabbages);

  const pum = new Builder();
  pum.add(sphere(0.26, 9, 6), 0xe8862f, { s: [1, 0.72, 1], p: [0, 0.18, 0] });
  pum.add(cyl(0.03, 0.04, 0.12, 4), 0x5e7a2e, { p: [0, 0.38, 0] });
  const pumpkins = new THREE.InstancedMesh(pum.geometry(), flatMat, crops.pumpkin.length);
  crops.pumpkin.forEach(([x, z, s], i) => pumpkins.setMatrixAt(i, scatterMatrix(dummy, x, heightAt(x, z), z, s, rand)));
  pumpkins.castShadow = true;
  out.push(pumpkins);

  return out;
}
