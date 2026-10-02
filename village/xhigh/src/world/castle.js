// The castle on the hill: curtain walls with walkways, corner towers, gatehouse,
// keep with the royal balcony, and a courtyard smithy. Static stone is merged
// into one mesh; flags, banners, torches and forge glow animate.

import * as THREE from 'three';
import { Builder, paint, box, cyl, cone, ico, transform } from '../core/geo.js';
import { flatMat, windowMat, glowMat } from '../core/materials.js';
import { TAU, osc, phase, clamp } from '../core/loop.js';
import { rng } from '../core/random.js';
import { CASTLE, KEEP, GATE } from './layout.js';
import { Cloth, emblemTexture, WIND_YAW } from './cloth.js';

const STONE = 0xd9cdb6;
const STONE_DARK = 0xbcae96;
const STONE_TOP = 0xcbbd9f;
const ROOF = 0x4a6db3;
const WOOD = 0x8a5a33;
const WOOD_DARK = 0x5e3b22;
const IRON = 0x4b4f58;

const { x: CX, z: CZ, y: GY, half: H, wallT: T, wallTop: TOP, towerR: TR } = CASTLE;

/** Walkway lines for archer patrols: endpoints (x,z), outward normal, y. */
export const WALKWAYS = (() => {
  const inset = TR + 0.55;
  const c = T / 2 - 0.62; // walk-line offset from wall centre towards the courtyard
  return {
    south: { a: [CX - H + inset, CZ + H - c], b: [CX + H - inset, CZ + H - c], out: [0, 1], y: TOP },
    north: { a: [CX + H - inset, CZ - H + c], b: [CX - H + inset, CZ - H + c], out: [0, -1], y: TOP },
    east: { a: [CX + H - c, CZ + H - inset], b: [CX + H - c, CZ - H + inset], out: [1, 0], y: TOP },
    west: { a: [CX - H + c, CZ - H + inset], b: [CX - H + c, CZ + H - inset], out: [-1, 0], y: TOP },
  };
})();

export const BALCONY = { x: KEEP.x, z: KEEP.z + KEEP.d / 2 + 0.75, y: KEEP.balconyY, railZ: KEEP.z + KEEP.d / 2 + 1.55, railY: KEEP.balconyY + 0.95 };

export const SMITHY = {
  stand: [CX - 5, CZ + 3.55],
  anvil: [CX - 5, CZ + 4.35],
  anvilTop: GY + 0.82,
  forge: [CX - 5, CZ + 1.35],
  coalY: GY + 1.02,
  barrel: [CX - 3.6, CZ + 2.6],
  chimneyTop: [CX - 5, GY + 5.2, CZ + 0.95],
};

export const GUARD_SPOTS = [
  [GATE.x - 1.85, GATE.z + 3.3],
  [GATE.x + 1.85, GATE.z + 3.3],
];

export function buildCastle() {
  const rand = rng(5150);
  const group = new THREE.Group();
  group.name = 'castle';
  const b = new Builder(rand);
  const win = new Builder(rand);
  const J = { jitter: 0.04 };

  const add = (g, color, xf, opts = J) => b.add(g, color, xf, opts);

  // ---- curtain walls -------------------------------------------------------
  const base = GY - 3.2;
  const wallH = TOP - base;
  const walls = [
    { cx: CX, cz: CZ - H, len: H * 2, alongX: true, out: -1 },
    { cx: CX, cz: CZ + H, len: H * 2, alongX: true, out: 1, gate: true },
    { cx: CX + H, cz: CZ, len: H * 2, alongX: false, out: 1 },
    { cx: CX - H, cz: CZ, len: H * 2, alongX: false, out: -1 },
  ];
  for (const w of walls) {
    const segs = w.gate
      ? [
          [-H, GATE.x - GATE.halfW],
          [GATE.x + GATE.halfW, H],
        ]
      : [[-H, H]];
    for (const [s0, s1] of segs) {
      const L = s1 - s0;
      const mid = (s0 + s1) / 2;
      const pos = (along, y, across) => (w.alongX ? [w.cx + along, y, w.cz + across] : [w.cx + across, y, w.cz + along]);
      const dims = (along, h, across) => (w.alongX ? [along, h, across] : [across, h, along]);
      add(box(...dims(L, wallH, T)), STONE, { p: pos(mid, base + wallH / 2, 0) });
      add(box(...dims(L, 2.6, T + 0.35)), STONE_DARK, { p: pos(mid, base + 1.3, 0) });
      add(box(...dims(L, 0.06, T - 0.1)), STONE_TOP, { p: pos(mid, TOP + 0.03, 0) });
      // inner lip
      add(box(...dims(L, 0.32, 0.18)), STONE_DARK, { p: pos(mid, TOP + 0.16, -w.out * (T / 2 - 0.09)) });
      // merlons along the outer edge
      const step = 1.25;
      for (let s = s0 + 0.5; s <= s1 - 0.4; s += step) {
        if (Math.abs(s) > H - TR - 0.1) continue;
        add(box(...dims(0.72, 0.9, 0.45)), STONE, { p: pos(s + 0.36, TOP + 0.45, w.out * (T / 2 - 0.225)) });
      }
    }
  }
  // lintel over the gate passage
  add(box(GATE.halfW * 2 + 0.2, TOP - (GY + GATE.h), T), STONE, { p: [GATE.x, (TOP + GY + GATE.h) / 2, CZ + H] });

  // ---- corner towers -------------------------------------------------------
  const flags = [];
  const redFlag = emblemTexture('#c8343a', '#f4c542');
  const blueFlag = emblemTexture('#2f57a5', '#f4c542');
  const towerTop = TOP + 2.6;
  for (const [sx, sz] of [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]) {
    const x = CX + sx * H;
    const z = CZ + sz * H;
    add(cyl(TR, TR + 0.15, towerTop - base, 12), STONE, { p: [x, (towerTop + base) / 2, z] });
    add(cyl(TR + 0.38, TR + 0.38, 2.6, 12), STONE_DARK, { p: [x, base + 1.3, z] });
    add(cyl(TR + 0.12, TR + 0.12, 0.28, 12), STONE_DARK, { p: [x, TOP + 0.1, z] });
    add(cone(TR + 0.55, 4.4, 12), ROOF, { p: [x, towerTop + 2.2, z] }, { jitter: 0.05 });
    add(cyl(TR + 0.58, TR + 0.5, 0.25, 12), 0x3c5a98, { p: [x, towerTop + 0.05, z] });
    add(cyl(0.05, 0.05, 2.1, 5), 0x6b4a2e, { p: [x, towerTop + 4.9, z] });
    add(ico(0.12, 0), 0xf4c542, { p: [x, towerTop + 5.95, z] });
    // doors onto both walkways + arrow slits
    for (const [dx, dz] of [
      [-sx, 0],
      [0, -sz],
    ]) {
      const ang = Math.atan2(dx, dz);
      const dpx = x + dx * (TR - 0.05);
      const dpz = z + dz * (TR - 0.05);
      win.add(box(0.95, 1.75, 0.3), 0x2b2420, { p: [dpx, TOP + 0.88, dpz], r: [0, ang, 0] });
    }
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * TAU + Math.PI / 4;
      const px = x + Math.sin(a) * (TR + 0.05);
      const pz = z + Math.cos(a) * (TR + 0.05);
      if ((px - CX) * sx < 0 && (pz - CZ) * sz < 0) continue; // skip slits facing the courtyard
      win.add(box(0.16, 0.8, 0.2), 0x2b2a30, { p: [px, TOP - 2.2, pz], r: [0, a, 0] });
    }
    const f = new Cloth({ w: 1.5, h: 0.95, map: sz > 0 ? redFlag : blueFlag, offset: rand(), period: 1.2 });
    const fg = new THREE.Group();
    fg.position.set(x, towerTop + 5.8, z);
    fg.rotation.y = WIND_YAW;
    fg.add(f.mesh);
    group.add(fg);
    flags.push(f);
  }

  // ---- gatehouse -----------------------------------------------------------
  const gz0 = CZ + H + T / 2; // outer face of the south wall
  const gDepth = 1.9;
  const ghTop = TOP + 1.9;
  // gatehouse towers stand in front of the walkway so the archers can pass behind them
  const gBack = gz0 - 0.45;
  const gD = gz0 + gDepth - gBack;
  const gMid = (gBack + gz0 + gDepth) / 2;
  for (const sx of [-1, 1]) {
    const x = GATE.x + sx * (GATE.halfW + 1.25);
    add(box(2.5, ghTop - base, gD), STONE, { p: [x, (ghTop + base) / 2, gMid] });
    add(box(2.9, 2.6, gD + 0.4), STONE_DARK, { p: [x, base + 1.3, gMid + 0.2] });
    for (const [mx, mz] of [
      [-0.9, 1],
      [0, 1],
      [0.9, 1],
      [-0.9, -1],
      [0.9, -1],
    ]) {
      add(box(0.6, 0.8, 0.4), STONE, { p: [x + mx, ghTop + 0.4, gMid + mz * (gD / 2 - 0.2)] });
    }
    add(box(0.4, 0.8, 0.6), STONE, { p: [x + sx * 1.05, ghTop + 0.4, gMid] });
    // arrow slits facing the road
    win.add(box(0.18, 0.9, 0.12), 0x2b2a30, { p: [x, GY + 4.6, gz0 + gDepth + 0.01] });
    // small pennant
    add(cyl(0.04, 0.04, 1.8, 5), 0x6b4a2e, { p: [x, ghTop + 1.7, gz0 + 0.2] });
    const f = new Cloth({ w: 0.95, h: 0.55, map: redFlag, offset: rand(), period: 1.2, amp: 0.12 });
    const fg = new THREE.Group();
    fg.position.set(x, ghTop + 2.55, gz0 + 0.2);
    fg.rotation.y = WIND_YAW;
    fg.add(f.mesh);
    group.add(fg);
    flags.push(f);
  }
  // bridge block over the passage
  add(box(GATE.halfW * 2, ghTop - (GY + GATE.h), gDepth), STONE, { p: [GATE.x, (ghTop + GY + GATE.h) / 2, gz0 + gDepth / 2] });
  // passage shadow + raised portcullis
  win.add(box(GATE.halfW * 2, 0.1, T + gDepth), 0x3b3530, { p: [GATE.x, GY + GATE.h - 0.05, gz0 - T / 2 + gDepth / 2] });
  for (let i = -3; i <= 3; i++) add(box(0.07, 0.75, 0.07), IRON, { p: [GATE.x + i * 0.32, GY + GATE.h - 0.35, gz0 + gDepth - 0.2] });
  add(box(GATE.halfW * 2, 0.07, 0.07), IRON, { p: [GATE.x, GY + GATE.h - 0.55, gz0 + gDepth - 0.2] });
  // open gate leaves
  for (const sx of [-1, 1]) {
    add(box(0.12, GATE.h - 0.2, GATE.halfW), WOOD, { p: [GATE.x + sx * (GATE.halfW - 0.08), GY + (GATE.h - 0.2) / 2, CZ + H - T / 2 + 0.7] });
    add(box(0.16, 0.12, GATE.halfW - 0.1), IRON, { p: [GATE.x + sx * (GATE.halfW - 0.08), GY + 0.8, CZ + H - T / 2 + 0.7] });
    add(box(0.16, 0.12, GATE.halfW - 0.1), IRON, { p: [GATE.x + sx * (GATE.halfW - 0.08), GY + 2.6, CZ + H - T / 2 + 0.7] });
  }

  // gate banners + torches
  const banners = [];
  for (const sx of [-1, 1]) {
    const bn = new Cloth({ w: 0.95, h: 2.3, segX: 4, segY: 8, mode: 'banner', map: emblemTexture('#c8343a', '#f4c542', { w: 64, h: 160 }), amp: 0.05, period: 3, offset: sx * 0.3 });
    bn.mesh.position.set(GATE.x + sx * (GATE.halfW + 1.25), ghTop - 0.55, gz0 + gDepth + 0.04);
    group.add(bn.mesh);
    banners.push(bn);
  }
  const torches = [];
  for (const sx of [-1, 1]) {
    const tx = GATE.x + sx * (GATE.halfW + 0.3);
    const tz = gz0 + gDepth + 0.25;
    add(box(0.1, 0.1, 0.35), IRON, { p: [tx, GY + 2.5, tz - 0.12] });
    add(cyl(0.07, 0.05, 0.45, 5), WOOD_DARK, { p: [tx, GY + 2.65, tz] });
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.38, 6), glowMat);
    flame.position.set(tx, GY + 3.05, tz);
    group.add(flame);
    torches.push(flame);
  }

  // ---- keep ----------------------------------------------------------------
  const kx = KEEP.x;
  const kz = KEEP.z;
  const kBase = GY - 1;
  add(box(KEEP.w, KEEP.top - kBase, KEEP.d), STONE, { p: [kx, (KEEP.top + kBase) / 2, kz] });
  add(box(KEEP.w + 0.4, 1.6, KEEP.d + 0.4), STONE_DARK, { p: [kx, GY + 0.3, kz] });
  add(box(KEEP.w + 0.25, 0.3, KEEP.d + 0.25), STONE_DARK, { p: [kx, KEEP.top - 0.1, kz] });
  // merlons around the keep top
  for (let i = 0; i < 8; i++) {
    const s = -KEEP.w / 2 + 0.45 + i * ((KEEP.w - 0.9) / 7);
    add(box(0.65, 0.8, 0.4), STONE, { p: [kx + s, KEEP.top + 0.4, kz + KEEP.d / 2 - 0.2] });
    add(box(0.65, 0.8, 0.4), STONE, { p: [kx + s, KEEP.top + 0.4, kz - KEEP.d / 2 + 0.2] });
  }
  for (let i = 0; i < 6; i++) {
    const s = -KEEP.d / 2 + 0.45 + i * ((KEEP.d - 0.9) / 5);
    add(box(0.4, 0.8, 0.65), STONE, { p: [kx + KEEP.w / 2 - 0.2, KEEP.top + 0.4, kz + s] });
    add(box(0.4, 0.8, 0.65), STONE, { p: [kx - KEEP.w / 2 + 0.2, KEEP.top + 0.4, kz + s] });
  }
  // pyramid roof
  const roof = new THREE.ConeGeometry(Math.hypot(KEEP.w, KEEP.d) / 2 - 0.55, 5.4, 4);
  transform(roof, { p: [kx, KEEP.top + 2.7, kz], r: [0, Math.PI / 4, 0], s: [1, 1, KEEP.d / KEEP.w] });
  b.push(paint(roof, ROOF, { jitter: 0.05, rand }));
  add(cyl(0.05, 0.05, 1.8, 5), 0x6b4a2e, { p: [kx, KEEP.top + 6.2, kz] });

  // turrets with flags
  const turrets = [
    { x: kx + KEEP.w / 2, z: kz - KEEP.d / 2, r: 1.55, top: KEEP.top + 4.5, roofH: 4.6, map: blueFlag, fw: 2.3, fh: 1.4 },
    { x: kx - KEEP.w / 2, z: kz - KEEP.d / 2, r: 1.2, top: KEEP.top + 2.4, roofH: 3.6, map: redFlag, fw: 1.6, fh: 1.0 },
  ];
  for (const tu of turrets) {
    add(cyl(tu.r, tu.r, tu.top - (GY + 4), 10), STONE, { p: [tu.x, (tu.top + GY + 4) / 2, tu.z] });
    add(cone(tu.r * 0.7, 1.4, 10), STONE_DARK, { p: [tu.x, GY + 3.3, tu.z], r: [Math.PI, 0, 0] });
    add(cone(tu.r + 0.45, tu.roofH, 10), ROOF, { p: [tu.x, tu.top + tu.roofH / 2, tu.z] }, { jitter: 0.05 });
    add(cyl(0.05, 0.05, 2.4, 5), 0x6b4a2e, { p: [tu.x, tu.top + tu.roofH + 1.0, tu.z] });
    add(ico(0.13, 0), 0xf4c542, { p: [tu.x, tu.top + tu.roofH + 2.2, tu.z] });
    for (let k = 0; k < 3; k++) {
      const a = (k / 3) * TAU + 0.6;
      win.add(box(0.35, 0.7, 0.2), 0x3b4658, { p: [tu.x + Math.sin(a) * tu.r, tu.top - 1.6, tu.z + Math.cos(a) * tu.r], r: [0, a, 0] });
    }
    const f = new Cloth({ w: tu.fw, h: tu.fh, map: tu.map, offset: rand(), period: 1.5, amp: 0.2, waves: 1.6 });
    const fg = new THREE.Group();
    fg.position.set(tu.x, tu.top + tu.roofH + 2.1, tu.z);
    fg.rotation.y = WIND_YAW;
    fg.add(f.mesh);
    group.add(fg);
    flags.push(f);
  }

  // keep windows (glow at dusk)
  const winRow = (y, n, face) => {
    for (let i = 0; i < n; i++) {
      const s = (i - (n - 1) / 2) * 2.1;
      if (face === 's' && Math.abs(s) < 1.5 && y > GY + 6) continue; // balcony door instead
      if (face === 's') win.add(box(0.6, 1.0, 0.15), 0x3b4658, { p: [kx + s, y, kz + KEEP.d / 2 + 0.02] });
      if (face === 'e') win.add(box(0.15, 1.0, 0.6), 0x3b4658, { p: [kx + KEEP.w / 2 + 0.02, y, kz + s * 0.7] });
      if (face === 'w') win.add(box(0.15, 1.0, 0.6), 0x3b4658, { p: [kx - KEEP.w / 2 - 0.02, y, kz + s * 0.7] });
    }
  };
  winRow(GY + 4.2, 4, 's');
  winRow(GY + 8.6, 4, 's');
  winRow(GY + 5.5, 3, 'e');
  winRow(GY + 5.5, 3, 'w');
  winRow(GY + 9.6, 3, 'e');
  winRow(GY + 9.6, 3, 'w');
  // great door at ground level
  win.add(box(1.6, 2.4, 0.2), 0x4a3426, { p: [kx, GY + 1.2, kz + KEEP.d / 2 + 0.05] });
  add(box(2.2, 0.25, 0.9), STONE_DARK, { p: [kx, GY + 0.1, kz + KEEP.d / 2 + 0.45] });

  // ---- royal balcony -------------------------------------------------------
  const by = KEEP.balconyY;
  const front = BALCONY.railZ;
  const back = kz + KEEP.d / 2;
  const bw = 3.6;
  add(box(bw, 0.35, front - back + 0.15), STONE_DARK, { p: [kx, by - 0.175, (front + back) / 2 + 0.05] });
  for (const sx of [-1.3, 0, 1.3]) add(cone(0.35, 1.1, 4), STONE_DARK, { p: [kx + sx, by - 0.85, back + 0.4], r: [Math.PI, Math.PI / 4, 0] });
  for (let i = 0; i <= 8; i++) add(box(0.09, 0.85, 0.09), STONE, { p: [kx - bw / 2 + 0.12 + i * ((bw - 0.24) / 8), by + 0.43, front] });
  for (const sx of [-1, 1]) for (let i = 0; i <= 3; i++) add(box(0.09, 0.85, 0.09), STONE, { p: [kx + sx * (bw / 2 - 0.12), by + 0.43, back + 0.25 + i * ((front - back - 0.25) / 3)] });
  add(box(bw, 0.12, 0.2), STONE_TOP, { p: [kx, BALCONY.railY - 0.02, front] });
  for (const sx of [-1, 1]) add(box(0.2, 0.12, front - back), STONE_TOP, { p: [kx + sx * (bw / 2 - 0.12), BALCONY.railY - 0.02, (front + back) / 2] });
  win.add(box(1.2, 2.1, 0.15), 0x3b4658, { p: [kx, by + 1.05, back + 0.02] });
  // royal banners flanking the balcony
  for (const sx of [-1, 1]) {
    const bn = new Cloth({ w: 1.1, h: 3.4, segX: 4, segY: 10, mode: 'banner', map: emblemTexture('#2f57a5', '#f4c542', { w: 64, h: 180 }), amp: 0.06, period: 3, offset: 0.5 + sx * 0.2 });
    bn.mesh.position.set(kx + sx * 2.8, by + 2.6, back + 0.06);
    group.add(bn.mesh);
    banners.push(bn);
  }

  // ---- courtyard -----------------------------------------------------------
  // smithy: forge with hood + chimney, anvil on a stump, quench barrel, rack
  const [fx, fz] = SMITHY.forge;
  add(box(1.9, 0.95, 1.3), STONE_DARK, { p: [fx, GY + 0.47, fz] });
  add(box(1.5, 0.12, 0.9), 0x3a2f2a, { p: [fx, GY + 0.98, fz] });
  add(box(0.7, 3.4, 0.7), STONE, { p: [fx, GY + 3.5, fz - 0.4] });
  add(cone(1.1, 1.0, 4), STONE, { p: [fx, GY + 2.2, fz - 0.2], r: [0, Math.PI / 4, 0] });
  add(box(0.9, 0.2, 0.9), STONE_DARK, { p: [fx, GY + 5.25, fz - 0.4] });
  const coals = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 0.7), glowMat.clone());
  coals.position.set(fx, GY + 1.03, fz);
  group.add(coals);
  // bellows on the east side of the forge
  add(box(0.5, 0.25, 0.8), 0x6b4a2e, { p: [fx + 1.25, GY + 0.75, fz] });
  add(cyl(0.05, 0.05, 0.75, 5), WOOD_DARK, { p: [fx + 1.25, GY + 0.38, fz] });
  const [ax, az] = SMITHY.anvil;
  add(cyl(0.32, 0.36, 0.5, 8), WOOD, { p: [ax, GY + 0.25, az] });
  add(box(0.32, 0.18, 0.5), IRON, { p: [ax, GY + 0.59, az] });
  add(box(0.42, 0.14, 0.75), IRON, { p: [ax, GY + 0.75, az] });
  add(cone(0.09, 0.3, 4), IRON, { p: [ax, GY + 0.75, az + 0.5], r: [Math.PI / 2, 0, 0] });
  const [qx, qz] = SMITHY.barrel;
  add(cyl(0.38, 0.33, 0.8, 9), WOOD, { p: [qx, GY + 0.4, qz] });
  add(cyl(0.33, 0.33, 0.04, 9), 0x3c6a86, { p: [qx, GY + 0.75, qz] });
  for (let i = 0; i < 4; i++) {
    add(box(0.06, 1.3, 0.06), 0xa9b0bb, { p: [CX - H + T / 2 + 0.35, GY + 0.75, CZ + 2.3 + i * 0.35], r: [0, 0, 0.18] });
    add(box(0.32, 0.06, 0.06), 0x6b4a2e, { p: [CX - H + T / 2 + 0.47, GY + 0.35, CZ + 2.3 + i * 0.35] });
  }
  add(box(0.15, 0.12, 1.6), WOOD_DARK, { p: [CX - H + T / 2 + 0.25, GY + 1.35, CZ + 2.8] });

  // stores: barrels, crates, hay
  const props = [
    ['barrel', CX + 6.5, CZ + 6.6],
    ['barrel', CX + 7.1, CZ + 5.9],
    ['barrel', CX + 6.2, CZ + 5.6],
    ['crate', CX + 6.9, CZ + 4.6],
    ['crate', CX + 6.9, CZ + 4.6, 0.75],
    ['hay', CX + 6.5, CZ + 1.8],
    ['hay', CX + 7.2, CZ + 2.9],
    ['crate', CX - 6.8, CZ + 6.8],
    ['barrel', CX - 6.3, CZ + 7.2],
  ];
  for (const [kind, x, z, y = 0] of props) {
    if (kind === 'barrel') {
      add(cyl(0.36, 0.33, 0.85, 9), WOOD, { p: [x, GY + 0.43, z] });
      add(cyl(0.37, 0.37, 0.06, 9), IRON, { p: [x, GY + 0.62, z] });
      add(cyl(0.37, 0.37, 0.06, 9), IRON, { p: [x, GY + 0.22, z] });
    } else if (kind === 'crate') add(box(0.75, 0.75, 0.75), 0xa87a4a, { p: [x, GY + 0.38 + y, z], r: [0, y ? 0.4 : 0.1, 0] });
    else add(box(1.1, 0.6, 0.7), 0xe0c068, { p: [x, GY + 0.3, z], r: [0, 0.3, 0] });
  }
  // archery butt on the east side
  add(cyl(0.6, 0.6, 0.25, 12), 0xe8d6a0, { p: [CX + 5.2, GY + 1.2, CZ + 7.0], r: [Math.PI / 2 - 0.15, 0, 0] });
  add(cyl(0.38, 0.38, 0.27, 12), 0xd23c3c, { p: [CX + 5.2, GY + 1.2, CZ + 7.0], r: [Math.PI / 2 - 0.15, 0, 0] });
  add(cyl(0.16, 0.16, 0.29, 10), 0xf4c542, { p: [CX + 5.2, GY + 1.2, CZ + 7.0], r: [Math.PI / 2 - 0.15, 0, 0] });
  add(box(0.08, 1.4, 0.08), WOOD_DARK, { p: [CX + 4.8, GY + 0.6, CZ + 6.8], r: [0.2, 0, 0.2] });
  add(box(0.08, 1.4, 0.08), WOOD_DARK, { p: [CX + 5.6, GY + 0.6, CZ + 6.8], r: [0.2, 0, -0.2] });

  // stable lean-to along the east wall
  for (const dz of [-6.5, -3.5]) add(box(0.15, 2.2, 0.15), WOOD_DARK, { p: [CX + H - T / 2 - 2.3, GY + 1.1, CZ + dz] });
  add(box(2.6, 0.15, 4.0), 0x9a5b3a, { p: [CX + H - T / 2 - 1.2, GY + 2.25, CZ - 5], r: [0, 0, -0.3] });
  add(box(0.7, 0.45, 1.6), 0xe0c068, { p: [CX + H - T / 2 - 0.6, GY + 0.22, CZ - 5] });

  const stone = b.build(flatMat);
  stone.name = 'castle-stone';
  group.add(stone);
  const windows = win.build(windowMat, { cast: false });
  group.add(windows);

  // forge light
  const forgeLight = new THREE.PointLight(0xff7a2a, 8, 7, 1.8);
  forgeLight.position.set(fx, GY + 1.6, fz + 0.6);
  group.add(forgeLight);

  const coalBase = new THREE.Color(0xff8a30);
  const state = { pump: 0 };

  function update(t, dusk) {
    for (const f of flags) f.update(t);
    for (const bn of banners) bn.update(t);
    const flick = (k) => 1 + osc(t, 0.4, k) * 0.12 + osc(t, 0.75, k * 2) * 0.1 + osc(t, 1.2, k * 3) * 0.06;
    torches.forEach((fl, i) => {
      const f = flick(i * 0.37);
      fl.scale.set(1 / Math.sqrt(f), f * (1 + dusk * 0.2), 1 / Math.sqrt(f));
    });
    const glow = flick(0.11) * (0.85 + state.pump * 0.5);
    coals.material.color.copy(coalBase).multiplyScalar(0.8 + 0.4 * glow);
    forgeLight.intensity = (6 + dusk * 8) * glow;
  }

  return { group, update, state };
}
