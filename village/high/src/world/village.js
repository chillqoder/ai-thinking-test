// Village: cottages, bakery, barn, well, market stall, pig pen, coop, fields,
// pond, woodcutter's yard, trees and ground scatter.
import * as THREE from 'three';
import { rng, osc, TAU } from '../core/util.js';
import { Batch, geo, mesh, mat, vary, group, windowMat } from '../core/kit.js';
import { getHeight, edgeRadius, pathAmount, streamDist } from './terrain.js';
import {
  HOUSES, BAKERY, BARN, WELL, TROUGH, STALL, PIGPEN, MUD, COOP, FIELDS, POND, WOODCUT, NAP_TREE,
  CLEAR_ZONES, CASTLE, HILL_R,
} from './layout.js';

const PLASTER = ['#f1e6cc', '#ece0c0', '#f5ead6', '#e8d9b8'];
const TIMBER = '#6b4528';
const THATCH = '#d4ac62';
const TILE = '#b5523b';
const WOOD = '#8a5a35';
const WOOD_DARK = '#5e3c24';
const STONE = '#a8a092';

const groundAt = (x, z, w = 1, d = 1) =>
  Math.min(getHeight(x - w / 2, z - d / 2), getHeight(x + w / 2, z - d / 2), getHeight(x - w / 2, z + d / 2), getHeight(x + w / 2, z + d / 2), getHeight(x, z));

/** A cottage in batch `b`. Returns world-space chimney top (for smoke). */
function cottage(b, win, rand, x, z, yaw, w, d, h, roof, { chimney = true, plaster } = {}) {
  const g = groundAt(x, z, w, d);
  const wallCol = plaster || PLASTER[Math.floor(rand() * PLASTER.length)];
  const roofCol = vary(roof === 'thatch' ? THATCH : TILE, rand, 0.08);
  b.push([x, g, z], yaw);
  win.push([x, g, z], yaw);
  const top = 0.2 + h;
  b.box(STONE, [0, -0.25, 0], [w + 0.3, 0.9, d + 0.3]);
  b.box(wallCol, [0, 0.2 + h / 2, 0], [w, h, d]);
  // timber framing
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(TIMBER, [sx * (w / 2), 0.2 + h / 2, sz * (d / 2)], [0.16, h, 0.16]);
  for (const sz of [-1, 1]) {
    b.box(TIMBER, [0, top - 0.06, sz * (d / 2 + 0.01)], [w, 0.14, 0.06]);
    b.box(TIMBER, [0, 0.2 + h * 0.5, sz * (d / 2 + 0.01)], [w, 0.1, 0.05]);
  }
  for (const sx of [-1, 1]) {
    b.box(TIMBER, [sx * (w / 2 + 0.01), top - 0.06, 0], [0.06, 0.14, d]);
    b.add(geo.box(0.05, 0.1, Math.hypot(h * 0.5, d / 2) * 0.95), TIMBER, [sx * (w / 2 + 0.01), 0.2 + h * 0.25, -d / 4], [Math.atan2(h * 0.5, d / 2), 0, 0]);
  }
  // roof: gable prism + two slabs
  const rh = w * 0.48;
  const hw = w / 2 + 0.4;
  b.add(geo.prism(w, rh * (w / 2) / hw + 0.02, d), wallCol, [0, top, 0]);
  const L = Math.hypot(hw, rh);
  const a = Math.atan2(rh, hw);
  for (const s of [-1, 1]) {
    b.add(geo.box(L + 0.12, roof === 'thatch' ? 0.32 : 0.2, d + 0.6), roofCol, [(s * hw) / 2, top + rh / 2 - 0.05, 0], [0, 0, -s * a]);
  }
  b.add(geo.box(0.26, 0.26, d + 0.7), vary(roofCol, rand, 0.1), [0, top + rh - 0.02, 0], [0, 0, Math.PI / 4]);
  // door, step, windows, shutters, flower box
  const dx = w > 3.3 ? -w * 0.18 : 0;
  b.box(WOOD_DARK, [dx, 0.85, d / 2 + 0.04], [0.8, 1.35, 0.08]);
  b.box(TIMBER, [dx, 1.56, d / 2 + 0.06], [0.95, 0.1, 0.08]);
  b.box(STONE, [dx, 0.12, d / 2 + 0.35], [1.0, 0.18, 0.5]);
  b.box('#c7a24a', [dx + 0.25, 0.85, d / 2 + 0.09], [0.06, 0.06, 0.04]);
  const wins = [];
  if (dx !== 0) wins.push([w * 0.22, 1.3, d / 2 + 0.03, 0]);
  wins.push([w / 2 + 0.03, 1.3, 0, Math.PI / 2], [-w / 2 - 0.03, 1.3, 0, Math.PI / 2], [0, 1.3, -d / 2 - 0.03, 0]);
  for (const [wx, wy, wz, wr] of wins) {
    win.add(geo.box(0.55, 0.55, 0.05), '#fff', [wx, wy, wz], [0, wr, 0]);
    const ox = Math.cos(wr);
    const oz = -Math.sin(wr);
    b.add(geo.box(0.68, 0.08, 0.08), TIMBER, [wx, wy - 0.32, wz], [0, wr, 0]);
    b.add(geo.box(0.68, 0.08, 0.08), TIMBER, [wx, wy + 0.32, wz], [0, wr, 0]);
    b.add(geo.box(0.26, 0.6, 0.05), '#4f7a3a', [wx + ox * 0.44, wy, wz + oz * 0.44], [0, wr, 0]);
    b.add(geo.box(0.26, 0.6, 0.05), '#4f7a3a', [wx - ox * 0.44, wy, wz - oz * 0.44], [0, wr, 0]);
  }
  if (dx !== 0) {
    b.box(WOOD, [w * 0.22, 0.92, d / 2 + 0.15], [0.7, 0.16, 0.22]);
    for (let i = 0; i < 4; i++) b.add(geo.ico(0.08), ['#e0475a', '#f2c94c', '#ffffff', '#d16ad9'][i], [w * 0.22 - 0.24 + i * 0.16, 1.05, d / 2 + 0.16]);
  }
  let smoke = null;
  if (chimney) {
    const cxl = w / 2 - 0.6;
    const roofY = top + rh * (1 - cxl / hw);
    b.box('#9c8f80', [cxl, (top + roofY + 0.9) / 2, -d / 4], [0.5, roofY + 0.9 - top, 0.5]);
    b.box('#7d7266', [cxl, roofY + 0.92, -d / 4], [0.6, 0.12, 0.6]);
    smoke = b.world([cxl, roofY + 1.0, -d / 4]);
  }
  b.pop();
  win.pop();
  return smoke;
}

export function buildVillage() {
  const root = new THREE.Group();
  const b = new Batch();
  const win = new Batch();
  const rand = rng(1234);
  const smoke = [];
  const anchors = {};

  // ---------- houses ----------
  for (const [x, z, yaw, w, d, h, roof] of HOUSES) {
    const s = cottage(b, win, rand, x, z, yaw, w, d, h, roof);
    if (s && rand() < 0.8) smoke.push({ pos: s });
  }

  // bakery: bigger, with an outdoor oven and a sign
  {
    const { x, z, yaw } = BAKERY;
    smoke.push({ pos: cottage(b, win, rand, x, z, yaw, 4.2, 3.6, 2.5, 'tile', { plaster: '#f3dfb5' }) });
    const g = groundAt(x, z, 4, 4);
    b.push([x, g, z], yaw);
    b.add(geo.cyl(0.04, 0.04, 0.9, 4), TIMBER, [1.6, 2.05, 2.2], [Math.PI / 2, 0, 0]);
    b.box(WOOD, [1.6, 1.7, 2.6], [0.75, 0.5, 0.06]);
    b.add(geo.sphere(0.2, 8, 5), '#c58a3e', [1.6, 1.7, 2.65], [0, 0, 0], [1.4, 0.7, 0.4]);
    // dome oven beside the bakery
    b.add(geo.sphere(0.95, 10, 6, 0), '#c9a07a', [-3.0, 0.2, 0.7], [0, 0, 0], [1, 0.85, 1]);
    b.box('#9c8f80', [-3.0, 0.1, 0.7], [2.1, 0.3, 2.1]);
    b.box('#2b1d16', [-3.0, 0.55, 1.6], [0.6, 0.5, 0.12]);
    // bread display table
    b.box(WOOD, [1.4, 0.75, 3.0], [1.4, 0.1, 0.7]);
    for (const [px, pz] of [[-0.6, -0.25], [0.6, -0.25], [-0.6, 0.25], [0.6, 0.25]]) b.box(WOOD_DARK, [1.4 + px, 0.37, 3.0 + pz], [0.08, 0.75, 0.08]);
    for (let i = 0; i < 5; i++) b.add(geo.sphere(0.13, 7, 5), '#c98a3c', [0.9 + i * 0.25, 0.86, 3.0 + (i % 2) * 0.15 - 0.07], [0, 0.4 * i, 0], [1.5, 0.75, 1]);
    anchors.ovenGlow = b.world([-3.0, 0.55, 1.67]);
    anchors.bakeryDoor = b.world([-4.2 * 0.18, 0, 2.6]);
    anchors.bakeryYaw = yaw;
    b.pop();
  }

  // barn by the fields
  {
    const { x, z, yaw } = BARN;
    cottage(b, win, rand, x, z, yaw, 5.6, 6.5, 3.2, 'tile', { chimney: false, plaster: '#a5452f' });
    const g = groundAt(x, z, 5, 6);
    b.push([x, g, z], yaw);
    b.box('#7a3322', [0, 1.4, 3.27], [2.2, 2.4, 0.06]);
    b.box('#f0e6d0', [0, 1.4, 3.31], [2.2, 0.12, 0.03], [0, 0, 0.83]);
    b.box('#f0e6d0', [0, 1.4, 3.31], [2.2, 0.12, 0.03], [0, 0, -0.83]);
    b.add(geo.cyl(0.7, 0.8, 0.9, 8), '#e2c25d', [3.6, 0.45, 1.5]);
    b.add(geo.cyl(0.7, 0.8, 0.9, 8), '#d9b94f', [3.4, 0.45, -0.2]);
    b.pop();
  }

  // ---------- well + trough ----------
  {
    const g = getHeight(WELL.x, WELL.z);
    b.push([WELL.x, g, WELL.z], 0);
    b.add(geo.cyl(0.95, 1.0, 0.9, 12), '#a59c8d', [0, 0.45, 0]);
    b.add(geo.cyl(1.02, 1.02, 0.12, 12), '#8e8678', [0, 0.92, 0]);
    b.add(geo.cyl(0.78, 0.78, 0.02, 12), '#1f2a33', [0, 0.97, 0]);
    for (const s of [-1, 1]) b.box(WOOD, [s * 0.95, 1.45, 0], [0.16, 1.9, 0.16]);
    b.add(geo.cyl(0.07, 0.07, 2.1, 6), WOOD_DARK, [0, 1.45, 0], [0, 0, Math.PI / 2]);
    b.add(geo.cyl(0.17, 0.17, 0.7, 8), '#b08a5a', [0, 1.45, 0], [0, 0, Math.PI / 2]);
    b.add(geo.prism(2.5, 0.8, 1.6), '#8c5a3c', [0, 2.35, 0], [0, Math.PI / 2, 0]);
    b.pop();
    const crank = group(root, [WELL.x + 1.08, g + 1.45, WELL.z]);
    crank.add(mesh(geo.box(0.06, 0.06, 0.42), WOOD_DARK, [0.02, 0, 0.21]));
    crank.add(mesh(geo.cyl(0.035, 0.035, 0.3, 5), WOOD, [0.15, 0, 0.4], [0, 0, Math.PI / 2]));
    anchors.well = { crank, drumY: g + 1.45, rimY: g + 0.97, g };

    const tg = getHeight(TROUGH.x, TROUGH.z);
    b.push([TROUGH.x, tg, TROUGH.z], 0);
    b.box(WOOD, [0, 0.3, 0], [1.7, 0.55, 0.65]);
    b.box('#3f87b5', [0, 0.52, 0], [1.5, 0.06, 0.45]);
    for (const s of [-1, 1]) b.box(WOOD_DARK, [s * 0.75, 0.15, 0], [0.12, 0.3, 0.8]);
    b.pop();
    anchors.trough = { x: TROUGH.x, y: tg + 0.55, z: TROUGH.z };
  }

  // ---------- market stall ----------
  {
    const { x, z, yaw } = STALL;
    const g = getHeight(x, z);
    b.push([x, g, z], yaw);
    b.box(WOOD, [0, 0.5, 0], [2.4, 0.95, 0.9]);
    b.box('#a7774a', [0, 1.0, 0.05], [2.6, 0.08, 1.05]);
    for (const sx of [-1.2, 1.2]) {
      b.box(WOOD_DARK, [sx, 1.3, 0.45], [0.1, 2.6, 0.1]);
      b.box(WOOD_DARK, [sx, 1.2, -0.5], [0.1, 2.4, 0.1]);
    }
    for (let i = 0; i < 6; i++) {
      b.add(geo.box(0.45, 0.06, 1.5), i % 2 ? '#f4efe4' : '#c8443b', [-1.125 + i * 0.45, 2.55, 0.0], [0.35, 0, 0]);
    }
    const goods = [['#d8402f', 0.09], ['#7fbf3f', 0.12], ['#f0a03a', 0.1], ['#9b3fb0', 0.08]];
    for (let i = 0; i < 4; i++) {
      b.box(WOOD_DARK, [-0.9 + i * 0.6, 1.1, 0.1], [0.5, 0.12, 0.5]);
      for (let k = 0; k < 4; k++) b.add(geo.ico(goods[i][1]), goods[i][0], [-0.98 + i * 0.6 + (k % 2) * 0.16, 1.22 + Math.floor(k / 2) * 0.08, 0.04 + (k % 2) * 0.14]);
    }
    b.add(geo.cyl(0.3, 0.25, 0.55, 8), '#b07c43', [1.7, 0.27, 0.6]);
    b.add(geo.cyl(0.3, 0.25, 0.55, 8), '#a6733d', [1.6, 0.27, -0.2]);
    anchors.stallFront = b.world([0, 0, 1.6]);
    anchors.stallBack = b.world([0.2, 0, -1.0]);
    b.pop();
  }

  // ---------- pig pen + mud ----------
  {
    const { x, z, w, d } = PIGPEN;
    const posts = [];
    const edge = (ax, az, bx, bz) => {
      const len = Math.hypot(bx - ax, bz - az);
      const n = Math.ceil(len / 1.3);
      for (let i = 0; i <= n; i++) posts.push([ax + ((bx - ax) * i) / n, az + ((bz - az) * i) / n]);
      const yaw = Math.atan2(bx - ax, bz - az);
      const mx = (ax + bx) / 2;
      const mz = (az + bz) / 2;
      const gy = getHeight(mx, mz);
      b.add(geo.box(0.07, 0.1, len), '#9b7149', [mx, gy + 0.45, mz], [0, yaw, 0]);
      b.add(geo.box(0.07, 0.1, len), '#9b7149', [mx, gy + 0.85, mz], [0, yaw, 0]);
    };
    const x0 = x - w / 2, x1 = x + w / 2, z0 = z - d / 2, z1 = z + d / 2;
    edge(x0, z0, x1, z0);
    edge(x1, z0, x1, z1);
    edge(x1, z1, x0 + 2.2, z1);
    edge(x0, z1, x0, z0);
    b.add(geo.box(0.07, 0.1, 1.2), '#9b7149', [x0 + 0.9, getHeight(x0 + 1, z1) + 0.5, z1 + 0.35], [0, 1.1, 0]);
    for (const [px, pz] of posts) b.add(geo.box(0.14, 1.1, 0.14), '#7a5434', [px, getHeight(px, pz) + 0.45, pz]);
    const tg = getHeight(x1 - 1.2, z0 + 0.8);
    b.box(WOOD, [x1 - 1.2, tg + 0.18, z0 + 0.8], [1.3, 0.35, 0.5]);
    b.box('#c8a050', [x1 - 1.2, tg + 0.33, z0 + 0.8], [1.1, 0.06, 0.32]);
    b.add(geo.cyl(0.8, 0.95, 0.7, 8), '#e2c25d', [x0 + 1.2, getHeight(x0 + 1.2, z0 + 1.2) + 0.35, z0 + 1.2]);

    // mud: irregular, glossy puddle
    const mg = new THREE.CircleGeometry(MUD.r, 20);
    const p = mg.attributes.position;
    for (let i = 1; i < p.count; i++) {
      const a = Math.atan2(p.getY(i), p.getX(i));
      const k = 1 + 0.16 * Math.sin(3 * a + 1) + 0.1 * Math.sin(5 * a + 2);
      p.setXY(i, p.getX(i) * k * 1.15, p.getY(i) * k * 0.9);
    }
    const mud = new THREE.Mesh(mg, new THREE.MeshStandardMaterial({ color: '#6b4a2e', roughness: 0.35, metalness: 0.05, flatShading: true }));
    mud.rotation.x = -Math.PI / 2;
    mud.position.set(MUD.x, getHeight(MUD.x, MUD.z) + 0.06, MUD.z);
    mud.receiveShadow = true;
    root.add(mud);
  }

  // ---------- chicken coop ----------
  {
    const { x, z } = COOP;
    const g = getHeight(x, z);
    b.push([x, g, z], -0.6);
    for (const [px, pz] of [[-0.7, -0.6], [0.7, -0.6], [-0.7, 0.6], [0.7, 0.6]]) b.box(WOOD_DARK, [px, 0.35, pz], [0.1, 0.7, 0.1]);
    b.box('#d7b98a', [0, 1.2, 0], [1.6, 1.0, 1.4]);
    b.add(geo.prism(1.9, 0.75, 1.7), '#a8432f', [0, 1.7, 0], [0, Math.PI / 2, 0]);
    b.box('#3b2a20', [0, 1.05, 0.71], [0.4, 0.45, 0.04]);
    b.add(geo.box(0.45, 0.05, 1.1), '#9b7149', [0, 0.38, 1.15], [0.65, 0, 0]);
    b.pop();
  }

  // ---------- fields ----------
  const crops = [];
  {
    const { x, z, w, d } = FIELDS;
    const rows = 9;
    const pg = new THREE.PlaneGeometry(w, d, rows * 4, 34);
    pg.rotateX(-Math.PI / 2);
    const p = pg.attributes.position;
    const cols = [];
    const ca = new THREE.Color('#7a5232');
    const cb = new THREE.Color('#946640');
    for (let i = 0; i < p.count; i++) {
      const lx = p.getX(i);
      const lz = p.getZ(i);
      const wx = x + lx;
      const wz = z + lz;
      const rowF = ((lx + w / 2) / (w / rows)) % 1;
      const ridge = Math.sin(rowF * Math.PI);
      p.setY(i, getHeight(wx, wz) + 0.06 + ridge * 0.12);
      const c = ca.clone().lerp(cb, ridge);
      cols.push(c.r, c.g, c.b);
    }
    pg.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    pg.computeVertexNormals();
    const soil = new THREE.Mesh(pg, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true }));
    soil.position.set(x, 0, z);
    soil.receiveShadow = true;
    root.add(soil);
    const kinds = ['wheat', 'wheat', 'cabbage', 'carrot', 'wheat', 'cabbage', 'wheat', 'carrot', 'wheat'];
    for (let r = 0; r < rows; r++) {
      const rx = x - w / 2 + (r + 0.5) * (w / rows);
      for (let zz = z - d / 2 + 0.5; zz < z + d / 2 - 0.3; zz += 0.62) {
        const cx = rx + (rand() - 0.5) * 0.15;
        crops.push({ kind: kinds[r], x: cx, z: zz, y: getHeight(cx, zz) + 0.16, s: 0.8 + rand() * 0.4, row: r });
      }
    }
    anchors.fieldRows = Array.from({ length: rows }, (_, r) => x - w / 2 + (r + 0.5) * (w / rows));
    // fence posts around the field + a scarecrow
    for (let i = 0; i <= 16; i++) {
      const fz = z - d / 2 - 0.6 + (i / 16) * (d + 1.2);
      for (const fx of [x - w / 2 - 0.6, x + w / 2 + 0.6]) b.box('#7a5434', [fx, getHeight(fx, fz) + 0.4, fz], [0.12, 0.9, 0.12]);
    }
    for (const fx of [x - w / 2 - 0.6, x + w / 2 + 0.6]) {
      b.add(geo.box(0.06, 0.08, d + 1.2), '#9b7149', [fx, getHeight(fx, z) + 0.6, z]);
    }
    const sx = x + w / 2 - 2.9;
    const sz = z - 3.5;
    const sg = getHeight(sx, sz);
    b.box(WOOD_DARK, [sx, sg + 1.0, sz], [0.1, 2.1, 0.1]);
    b.box(WOOD_DARK, [sx, sg + 1.55, sz], [1.5, 0.08, 0.08]);
    b.box('#5c7fa8', [sx, sg + 1.4, sz], [0.6, 0.65, 0.35]);
    b.add(geo.ico(0.24), '#e3c98b', [sx, sg + 2.0, sz]);
    b.add(geo.cone(0.38, 0.35, 8), '#b8862e', [sx, sg + 2.25, sz]);
    b.add(geo.cyl(0.42, 0.42, 0.04, 8), '#b8862e', [sx, sg + 2.1, sz]);
  }
  const cropMeshes = [
    { kind: 'wheat', g: (() => { const g = new THREE.ConeGeometry(0.17, 0.75, 5); g.translate(0, 0.37, 0); return g; })(), color: '#e8c25a' },
    { kind: 'cabbage', g: geo.ico(0.22, 0), color: '#6fbf4a' },
    { kind: 'carrot', g: (() => { const g = new THREE.ConeGeometry(0.12, 0.38, 4); g.translate(0, 0.19, 0); return g; })(), color: '#4f9e3a' },
  ];
  const cropIMs = [];
  for (const cm of cropMeshes) {
    const list = crops.filter((c) => c.kind === cm.kind);
    const im = new THREE.InstancedMesh(cm.g, mat('#ffffff'), list.length);
    const m4 = new THREE.Matrix4();
    const col = new THREE.Color();
    list.forEach((c, i) => {
      m4.compose(new THREE.Vector3(c.x, c.y, c.z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, c.s * 7, 0)), new THREE.Vector3(c.s, c.s, c.s));
      im.setMatrixAt(i, m4);
      im.setColorAt(i, col.set(vary(cm.color, rand, 0.12)));
    });
    im.castShadow = true;
    im.receiveShadow = true;
    root.add(im);
    cropIMs.push({ im, list });
  }

  // ---------- pond ----------
  {
    const water = new THREE.Mesh(
      new THREE.CircleGeometry(POND.r + 0.9, 28),
      new THREE.MeshStandardMaterial({ color: '#4aa3c9', roughness: 0.12, metalness: 0.1, transparent: true, opacity: 0.85, flatShading: true })
    );
    water.rotation.x = -Math.PI / 2;
    water.position.set(POND.x, -0.32, POND.z);
    water.receiveShadow = true;
    root.add(water);
    anchors.waterY = -0.32;
    for (let i = 0; i < 7; i++) {
      const a = rand() * TAU;
      const r = POND.r * (0.35 + rand() * 0.5);
      b.add(geo.cyl(0.32, 0.32, 0.03, 7), '#5c9e3c', [POND.x + Math.cos(a) * r, -0.29, POND.z + Math.sin(a) * r]);
      if (i % 3 === 0) b.add(geo.ico(0.08), '#f6b5d0', [POND.x + Math.cos(a) * r, -0.22, POND.z + Math.sin(a) * r]);
    }
    for (let i = 0; i < 46; i++) {
      const a = rand() * TAU;
      if (Math.cos(a) > 0.75 && Math.abs(Math.sin(a)) < 0.4) continue; // keep the dock side open
      const r = POND.r + 0.2 + rand() * 0.9;
      const rx = POND.x + Math.cos(a) * r;
      const rz = POND.z + Math.sin(a) * r;
      const hgt = 0.7 + rand() * 0.6;
      b.add(geo.cone(0.05, hgt, 3), vary('#5f8f3a', rand, 0.1), [rx, getHeight(rx, rz) + hgt / 2 - 0.1, rz]);
      if (rand() < 0.3) b.add(geo.cyl(0.05, 0.05, 0.18, 5), '#6b4226', [rx, getHeight(rx, rz) + hgt - 0.05, rz]);
    }
    // little dock for the fisherman
    const dx0 = POND.x + POND.r + 1.4;
    const dz = POND.z + 0.6;
    for (let i = 0; i < 6; i++) b.box(vary('#9b7149', rand, 0.1), [dx0 - i * 0.5, 0.12, dz], [0.45, 0.08, 1.3]);
    for (const [px, pz] of [[0.5, 0.6], [0.5, -0.6], [2.6, 0.6], [2.6, -0.6]]) b.box(WOOD_DARK, [dx0 - px, -0.4, dz + pz], [0.12, 1.2, 0.12]);
    anchors.dock = { x: dx0 - 2.6, y: 0.16, z: dz };
  }

  // ---------- woodcutter's yard ----------
  {
    const { x, z, yaw } = WOODCUT;
    const g = getHeight(x, z);
    b.push([x, g, z], yaw);
    b.add(geo.cyl(0.36, 0.42, 0.45, 9), '#8b6239', [0, 0.22, 1.05]);
    b.add(geo.cyl(0.34, 0.34, 0.02, 9), '#d8b27a', [0, 0.455, 1.05]);
    // log pile on his right
    for (let row = 0; row < 3; row++) {
      for (let i = 0; i < 4 - row; i++) {
        b.add(geo.cyl(0.17, 0.17, 1.2, 7), vary('#8b5e34', rand, 0.1), [1.55 + (i + row * 0.5 - 1.5) * 0.34, 0.17 + row * 0.29, 0.1], [Math.PI / 2, 0, 0]);
      }
    }
    for (const s of [-1, 1]) b.box(WOOD_DARK, [1.55 + s * 0.78, 0.4, 0.1], [0.08, 0.8, 0.08]);
    // split-wood heaps either side of the block (the split halves come to rest here)
    for (const s of [-1, 1]) {
      b.add(geo.ico(0.55, 0), '#b9874f', [s * 0.95, 0.0, 1.15], [0, s, 0], [1.1, 0.42, 0.9]);
      for (let i = 0; i < 5; i++) b.add(geo.box(0.12, 0.12, 0.5), vary('#d2a46a', rand, 0.1), [s * (0.8 + rand() * 0.4), 0.18 + rand() * 0.06, 0.95 + rand() * 0.4], [0, rand() * 3, 0.2]);
    }
    // woodshed behind
    b.box(WOOD_DARK, [-2.2, 1.0, -1.2], [0.12, 2.0, 0.12]);
    b.box(WOOD_DARK, [0.2, 1.0, -1.2], [0.12, 2.0, 0.12]);
    b.add(geo.box(3, 0.12, 1.6), '#8c5a3c', [-1.0, 2.0, -1.6], [-0.25, 0, 0]);
    for (let i = 0; i < 6; i++) b.add(geo.cyl(0.16, 0.16, 0.6, 6), vary('#c99a5f', rand, 0.1), [-2 + i * 0.35, 0.18 + (i % 2) * 0.3, -1.7], [Math.PI / 2, 0, 0]);
    b.pop();
    anchors.wood = { x, z, yaw, g };
  }

  // ---------- trees ----------
  const trees = [];
  const nearHouse = (x, z) => HOUSES.some(([hx, hz]) => Math.hypot(hx - x, hz - z) < 3.6);
  const clear = (x, z) => CLEAR_ZONES.some((c) => Math.hypot(c.x - x, c.z - z) < c.r);
  // the napping tree first
  trees.push({ x: NAP_TREE.x, z: NAP_TREE.z, kind: 'round', s: 1.7 });
  let tries = 0;
  while (trees.length < 190 && tries++ < 6000) {
    const a = rand() * TAU;
    const er = edgeRadius(a);
    const r = Math.sqrt(rand()) * er * 0.95;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    if (clear(x, z) || nearHouse(x, z) || pathAmount(x, z) > 0.05 || streamDist(x, z) < 1.6) continue;
    if (Math.hypot(x - BAKERY.x, z - BAKERY.z) < 6 || Math.hypot(x - STALL.x, z - STALL.z) < 3) continue;
    if (Math.hypot(x - NAP_TREE.x, z - NAP_TREE.z) < 4.5) continue;
    if (trees.some((t) => Math.hypot(t.x - x, t.z - z) < 2.1)) continue;
    // denser forest on the west and north, sparse elsewhere
    const forest = Math.max(Math.min(1, (-x - 14) / 14), Math.min(1, (-z - 26) / 10), r / er > 0.85 ? 0.7 : 0);
    if (rand() > 0.12 + 0.88 * forest) continue;
    const dc = Math.hypot(x - CASTLE.x, z - CASTLE.z);
    trees.push({ x, z, kind: rand() < (dc < HILL_R + 6 ? 0.4 : 0.6) ? 'pine' : 'round', s: 0.75 + rand() * 0.6 });
  }
  const trunkIM = new THREE.InstancedMesh(geo.cyl(0.16, 0.24, 1.6, 6), mat('#7a5232'), trees.length);
  const pineGeo = (() => {
    const parts = [new THREE.ConeGeometry(1.25, 2.0, 7).translate(0, 1.0, 0), new THREE.ConeGeometry(0.95, 1.7, 7).translate(0, 2.0, 0), new THREE.ConeGeometry(0.6, 1.3, 7).translate(0, 2.9, 0)];
    const merged = new THREE.BufferGeometry();
    const pos = [];
    for (const p of parts) {
      const q = p.toNonIndexed();
      pos.push(...q.attributes.position.array);
    }
    merged.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    merged.computeVertexNormals();
    return merged;
  })();
  const roundGeo = (() => {
    const parts = [new THREE.IcosahedronGeometry(1.25, 0).translate(0, 1.1, 0), new THREE.IcosahedronGeometry(0.85, 0).translate(0.6, 1.6, 0.2), new THREE.IcosahedronGeometry(0.8, 0).translate(-0.5, 1.5, -0.3)];
    const pos = [];
    for (const p of parts) pos.push(...p.toNonIndexed().attributes.position.array);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.computeVertexNormals();
    return g;
  })();
  const pines = trees.filter((t) => t.kind === 'pine');
  const rounds = trees.filter((t) => t.kind === 'round');
  const pineIM = new THREE.InstancedMesh(pineGeo, mat('#ffffff'), pines.length);
  const roundIM = new THREE.InstancedMesh(roundGeo, mat('#ffffff'), rounds.length);
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const v = new THREE.Vector3();
  const sc = new THREE.Vector3();
  const col = new THREE.Color();
  trees.forEach((t, i) => {
    t.y = getHeight(t.x, t.z) - 0.1;
    t.phase = rand();
    t.yaw = rand() * TAU;
    m4.compose(v.set(t.x, t.y + 0.8 * t.s, t.z), q.identity(), sc.set(t.s, t.s, t.s));
    trunkIM.setMatrixAt(i, m4);
  });
  pines.forEach((t, i) => pineIM.setColorAt(i, col.set(vary('#3f8a4a', rand, 0.12))));
  rounds.forEach((t, i) => roundIM.setColorAt(i, col.set(vary(i === 0 ? '#5fae45' : '#68b24a', rand, 0.14))));
  for (const im of [trunkIM, pineIM, roundIM]) {
    im.castShadow = true;
    im.receiveShadow = true;
    root.add(im);
  }
  const setFoliage = (t) => {
    // sway about the trunk base; the wind cycle repeats 6× per loop
    const sway = 0.035 * osc(t.time, 6, t.phase) + 0.015 * osc(t.time, 15, t.phase * 2);
    e.set(sway, t.yaw, sway * 0.6);
    q.setFromEuler(e);
    m4.compose(v.set(t.x, t.y + 1.4 * t.s, t.z), q, sc.set(t.s, t.s, t.s));
  };
  const updateTrees = (time) => {
    pines.forEach((t, i) => {
      t.time = time;
      setFoliage(t);
      pineIM.setMatrixAt(i, m4);
    });
    rounds.forEach((t, i) => {
      t.time = time;
      setFoliage(t);
      roundIM.setMatrixAt(i, m4);
    });
    pineIM.instanceMatrix.needsUpdate = true;
    roundIM.instanceMatrix.needsUpdate = true;
  };
  updateTrees(0);

  // ---------- scatter: rocks, bushes, flowers, grass ----------
  {
    const okSpot = (x, z) => !nearHouse(x, z) && pathAmount(x, z) < 0.2 && Math.hypot(x - POND.x, z - POND.z) > POND.r + 0.8 &&
      !(Math.abs(x - FIELDS.x) < FIELDS.w / 2 + 1 && Math.abs(z - FIELDS.z) < FIELDS.d / 2 + 1) &&
      !(Math.abs(x - CASTLE.x) < 11.5 && Math.abs(z - CASTLE.z) < 11.5) &&
      Math.hypot(x - MUD.x, z - MUD.z) > MUD.r + 0.4;
    const spots = (n, fn) => {
      for (let i = 0, k = 0; i < n && k < n * 8; k++) {
        const a = rand() * TAU;
        const r = Math.sqrt(rand()) * edgeRadius(a) * 0.95;
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;
        if (!okSpot(x, z)) continue;
        fn(x, z, getHeight(x, z));
        i++;
      }
    };
    spots(45, (x, z, y) => b.add(geo.dode(0.3 + rand() * 0.5), vary('#9a958c', rand, 0.1), [x, y + 0.05, z], [rand(), rand(), rand()], [1, 0.6 + rand() * 0.4, 1]));
    spots(70, (x, z, y) => b.add(geo.ico(0.45 + rand() * 0.3, 0), vary('#4f9a3c', rand, 0.12), [x, y + 0.2, z], [rand(), rand(), 0], [1, 0.75, 1]));
    const flowerCols = ['#f7f3e8', '#f2c94c', '#e0475a', '#b77fe0', '#ff9f4a'];
    spots(520, (x, z, y) => {
      if (rand() < 0.55) b.add(geo.cone(0.09, 0.4, 3), vary('#5aa33e', rand, 0.15), [x, y + 0.15, z], [0, rand() * 3, 0]);
      else {
        b.add(geo.ico(0.07), flowerCols[Math.floor(rand() * flowerCols.length)], [x, y + 0.18, z]);
        b.add(geo.cone(0.03, 0.2, 3), '#4f8f36', [x, y + 0.08, z]);
      }
    });
  }

  root.add(b.build());
  root.add(win.build(windowMat, { castShadow: false }));

  // oven glow
  const ovenGlow = mesh(geo.box(0.5, 0.4, 0.04), '#ff8a3a', [anchors.ovenGlow.x, anchors.ovenGlow.y, anchors.ovenGlow.z], [0, BAKERY.yaw, 0], 1, {
    emissive: '#ff6a1a',
    emissiveIntensity: 1.6,
  });
  root.add(ovenGlow);

  return { root, smoke, anchors, updateTrees, ovenGlow };
}
