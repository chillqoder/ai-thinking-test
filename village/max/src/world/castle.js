import { beam, box, cone, cyl, ico, place, prism } from '../core/geo.js';
import { rng, TAU } from '../core/math.js';
import { CASTLE, FORGE } from './layout.js';
import { PAL } from './palette.js';

// The castle: a hexagonal curtain wall with six round towers, a gatehouse facing the
// village, and a keep with the king's balcony. Static geometry goes into the shared
// buckets; the function returns anchors for animated things (flags, torches, archers…).

const C = CASTLE;
const TOP = C.top;
const WALK_Y = TOP + C.wallH;

export const BALCONY = { x: C.x, z: C.z - 2.8 + 2.3 + 0.62, floor: TOP + 4.4, railZ: C.z - 2.8 + 2.3 + 1.24, railY: TOP + 4.4 + 0.67 };
export const GATE = { x: C.x, z: C.z + C.wallR * Math.cos(Math.PI / 6) + 1.76 };

export function towerPositions() {
  const list = [];
  for (let i = 0; i < 6; i++) {
    const a = (i * TAU) / 6;
    list.push({ x: C.x + Math.cos(a) * C.wallR, z: C.z + Math.sin(a) * C.wallR, a });
  }
  return list;
}

function stoneSpeckles(rand, list, len, height, t, faceZ, color) {
  const n = Math.floor((len * height) / 1.6);
  for (let i = 0; i < n; i++) {
    const w = 0.35 + rand.next() * 0.45;
    const h = 0.2 + rand.next() * 0.18;
    const x = (rand.next() - 0.5) * (len - 0.8);
    const y = 0.3 + rand.next() * (height - 0.8);
    const col = rand.next() < 0.5 ? color.light : color.dark;
    list.push(box(w, h, 0.08, col, { x, y, z: faceZ }));
  }
  return place(list, t);
}

function buildWalls(ctx, rand, anchors) {
  const towers = towerPositions();
  const out = [];
  for (let i = 0; i < 6; i++) {
    const A = towers[i];
    const B = towers[(i + 1) % 6];
    const dx = B.x - A.x;
    const dz = B.z - A.z;
    const L = Math.hypot(dx, dz);
    const mx = (A.x + B.x) / 2;
    const mz = (A.z + B.z) / 2;
    const ry = Math.atan2(-dz, dx);
    // outward normal (away from castle centre)
    let nx = dz / L;
    let nz = -dx / L;
    if (nx * (mx - C.x) + nz * (mz - C.z) < 0) {
      nx = -nx;
      nz = -nz;
    }
    // The wall's local +Z is (sin ry, cos ry); merlons go on whichever side faces out.
    const outSign = Math.sign(Math.sin(ry) * nx + Math.cos(ry) * nz) || 1;
    const T = C.wallT;
    const H = C.wallH;
    const base = TOP - 1.4;
    const parts = [];
    parts.push(box(L, H + 1.4, T, PAL.stone, { y: (H + 1.4) / 2 }));
    parts.push(box(L + 0.02, 0.5, T + 0.12, PAL.stoneDark, { y: 1.2 + 0.25 }));
    parts.push(box(L - 0.4, 0.06, T - 0.35, PAL.stoneMid, { y: H + 1.4 + 0.03 }));
    // merlons on the outer edge, low parapet inside
    const usable = L - 2 * (C.towerR + 0.2);
    const count = Math.floor(usable / 0.95);
    for (let k = 0; k <= count; k++) {
      const x = -usable / 2 + (k * usable) / count;
      parts.push(box(0.52, 0.6, 0.32, k % 2 ? PAL.stone : PAL.stoneMid, { x, y: H + 1.4 + 0.3, z: outSign * (T / 2 - 0.16) }));
    }
    parts.push(box(usable, 0.32, 0.2, PAL.stoneMid, { y: H + 1.4 + 0.16, z: -outSign * (T / 2 - 0.1) }));
    stoneSpeckles(rand, parts, L - 2.6, H + 1.4, {}, outSign * (T / 2 + 0.02), { light: '#e6ddcc', dark: '#c2b59f' });
    // arrow slits
    for (let k = -1; k <= 1; k++) parts.push(box(0.12, 0.7, 0.1, '#3b3530', { x: k * 1.6, y: 1.4 + H * 0.55, z: outSign * (T / 2 + 0.01) }));
    place(parts, { x: mx, y: base, z: mz, ry });
    ctx.buckets.solid.add(parts);

    // walkway between the tower faces (used by patrolling archers)
    const ux = dx / L;
    const uz = dz / L;
    const inset = C.towerR + 0.45;
    anchors.walkways.push({
      a: [A.x + ux * inset, WALK_Y, A.z + uz * inset],
      b: [B.x - ux * inset, WALK_Y, B.z - uz * inset],
      out: [nx, nz],
      index: i,
    });
  }
}

function buildTowers(ctx, rand, anchors) {
  const towers = towerPositions();
  towers.forEach((tw, i) => {
    const parts = [];
    const r = C.towerR;
    const h = C.towerH + 1.4;
    const outA = Math.atan2(tw.z - C.z, tw.x - C.x);
    parts.push(cyl(r, r + 0.12, h, 8, PAL.stone, { y: h / 2 }));
    parts.push(cyl(r + 0.16, r + 0.16, 0.5, 8, PAL.stoneDark, { y: 1.4 }));
    parts.push(cyl(r + 0.2, r, 0.45, 8, PAL.stoneMid, { y: h + 0.15 }));
    parts.push(cone(r + 0.42, 3.1, 8, i % 2 ? PAL.slate : PAL.slateDark, { y: h + 0.38 + 1.55, ry: Math.PI / 8 }));
    parts.push(cyl(0.05, 0.05, 1.4, 4, PAL.timberDark, { y: h + 0.38 + 3.1 + 0.55 }));
    parts.push(cone(0.09, 0.2, 6, PAL.gold, { y: h + 0.38 + 3.1 + 1.32 }));
    // doors to the walkways and a few windows / arrow slits
    for (const side of [-1, 1]) {
      const a = outA + side * (Math.PI / 2 + Math.PI / 6);
      parts.push(box(0.72, 1.25, 0.22, '#3a2c22', { x: Math.cos(a) * (r - 0.02), y: 1.4 + C.wallH + 0.62, z: Math.sin(a) * (r - 0.02), ry: Math.atan2(Math.cos(a), Math.sin(a)) }));
    }
    for (const [dy, da] of [[3.2, 0], [5.6, 0.5], [2.0, -0.6]]) {
      const a = outA + da;
      parts.push(box(0.14, 0.62, 0.12, '#3b3530', { x: Math.cos(a) * (r + 0.04), y: dy, z: Math.sin(a) * (r + 0.04), ry: Math.atan2(Math.cos(a), Math.sin(a)) }));
    }
    place(parts, { x: tw.x, y: TOP - 1.4, z: tw.z });
    ctx.buckets.solid.add(parts);

    // a glowing window under the roof
    const wa = outA + 0.25;
    ctx.buckets.glow.add(place([box(0.32, 0.5, 0.1, '#ffffff', { x: Math.cos(wa) * (r + 0.07), y: h - 0.9, z: Math.sin(wa) * (r + 0.07), ry: Math.atan2(Math.cos(wa), Math.sin(wa)) })], { x: tw.x, y: TOP - 1.4, z: tw.z }));

    anchors.flags.push({ x: tw.x, y: TOP - 1.4 + h + 0.38 + 3.1 + 1.15, z: tw.z, w: 1.0, h: 0.55, colors: ['#2f57a6', '#f2c94c'], seed: i });
  });
}

function buildGatehouse(ctx, anchors) {
  const parts = [];
  const gz = C.z + C.wallR * Math.cos(Math.PI / 6);
  const H = C.wallH + 1.4;
  const W = 3.8;
  const D = 2.6;
  parts.push(box(W, H, D, PAL.stone, { y: H / 2, z: 0.45 }));
  parts.push(box(W + 0.1, 0.5, D + 0.1, PAL.stoneDark, { y: 1.45, z: 0.45 }));
  for (let k = 0; k < 5; k++) {
    const x = -W / 2 + 0.3 + (k * (W - 0.6)) / 4;
    parts.push(box(0.5, 0.6, 0.34, PAL.stoneMid, { x, y: H + 0.3, z: 0.45 + D / 2 - 0.17 }));
  }
  for (const s of [-1, 1]) parts.push(box(0.34, 0.6, 0.5, PAL.stoneMid, { x: s * (W / 2 - 0.17), y: H + 0.3, z: 1.05 }));
  // archway
  const archZ = 0.45 + D / 2 + 0.01;
  parts.push(box(1.9, 2.2, 0.12, '#2a211b', { y: 1.4 + 1.1, z: archZ }));
  parts.push(cyl(0.95, 0.95, 0.12, 10, '#2a211b', { y: 1.4 + 2.2, z: archZ, rx: Math.PI / 2 }, { thetaStart: -Math.PI / 2, thetaLength: Math.PI }));
  parts.push(cyl(1.18, 1.18, 0.16, 12, PAL.stoneMid, { y: 1.4 + 2.2, z: archZ - 0.02, rx: Math.PI / 2 }, { thetaStart: -Math.PI / 2, thetaLength: Math.PI }));
  // portcullis (raised) and open wooden doors
  for (let k = -3; k <= 3; k++) parts.push(box(0.06, 1.2, 0.06, PAL.iron, { x: k * 0.26, y: 1.4 + 2.6, z: archZ + 0.06 }));
  for (let k = 0; k < 3; k++) parts.push(box(1.8, 0.06, 0.06, PAL.iron, { y: 1.4 + 2.15 + k * 0.4, z: archZ + 0.06 }));
  for (const s of [-1, 1]) parts.push(box(0.95, 2.6, 0.12, PAL.door, { x: s * 1.3, y: 1.4 + 1.3, z: archZ + 0.45, ry: s * 1.2 }));
  // stone step / bridge apron
  parts.push(box(2.6, 0.2, 1.6, PAL.stoneMid, { y: 1.35, z: archZ + 0.8 }));
  place(parts, { x: C.x, y: TOP - 1.4, z: gz });
  ctx.buckets.solid.add(parts);

  // gate banners and torches
  const y0 = TOP - 1.4;
  for (const s of [-1, 1]) {
    anchors.banners.push({ x: C.x + s * 1.45, y: y0 + H - 0.2, z: gz + archZ + 0.04, w: 0.6, h: 1.7, ry: 0, colors: ['#b73a33', '#f2c94c'], seed: 10 + s });
    anchors.torches.push({ x: C.x + s * 1.05, y: TOP + 2.75, z: gz + archZ + 0.25, wall: true, ry: 0 });
  }
}

function buildKeep(ctx, anchors) {
  const parts = [];
  const kx = C.x;
  const kz = C.z - 2.8;
  const W = 6.4;
  const D = 4.6;
  const H = 8.2;
  parts.push(box(W, H + 1, D, PAL.stone, { y: (H + 1) / 2 - 1 }));
  parts.push(box(W + 0.12, 0.5, D + 0.12, PAL.stoneDark, { y: 0.0 }));
  parts.push(box(W + 0.3, 0.3, D + 0.3, PAL.stoneMid, { y: H - 0.15 }));
  // crenellations around the roof
  const merl = (x, z) => parts.push(box(0.46, 0.55, 0.46, PAL.stoneMid, { x, y: H + 0.27, z }));
  for (let k = 0; k <= 6; k++) {
    const x = -W / 2 + 0.1 + (k * (W - 0.2)) / 6;
    merl(x, D / 2 + 0.05);
    merl(x, -D / 2 - 0.05);
  }
  for (let k = 1; k < 4; k++) {
    const z = -D / 2 + (k * D) / 4;
    merl(W / 2 + 0.05, z);
    merl(-W / 2 - 0.05, z);
  }
  // corner turrets
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      parts.push(cyl(0.62, 0.5, 4.2, 8, PAL.stone, { x: sx * W / 2, y: H - 1.2, z: sz * D / 2 }));
      parts.push(cone(0.82, 1.9, 8, PAL.slate, { x: sx * W / 2, y: H + 0.9 + 0.95, z: sz * D / 2, ry: Math.PI / 8 }));
    }
  }
  // central tower
  parts.push(cyl(1.45, 1.55, 4.2, 10, PAL.stone, { y: H + 2.1 }));
  parts.push(cyl(1.62, 1.45, 0.4, 10, PAL.stoneMid, { y: H + 4.25 }));
  parts.push(cone(1.85, 3.6, 10, PAL.slateDark, { y: H + 4.45 + 1.8 }));
  parts.push(cyl(0.06, 0.06, 1.8, 4, PAL.timberDark, { y: H + 4.45 + 3.6 + 0.7 }));
  parts.push(cone(0.1, 0.22, 6, PAL.gold, { y: H + 4.45 + 3.6 + 1.66 }));
  // balcony on the south face
  const fy = BALCONY.floor - TOP;
  const fz = D / 2;
  parts.push(box(2.8, 0.24, 1.35, PAL.stoneMid, { y: fy - 0.12, z: fz + 0.66 }));
  for (const x of [-1.0, 0, 1.0]) parts.push(prism(0.36, 0.7, 1.2, PAL.stoneDark, { x, y: fy - 0.25, z: fz + 0.6, rx: Math.PI }));
  for (let k = 0; k <= 6; k++) parts.push(box(0.09, 0.58, 0.09, PAL.stone, { x: -1.3 + (k * 2.6) / 6, y: fy + 0.29, z: fz + 1.24 }));
  for (const s of [-1, 1]) for (let k = 0; k < 3; k++) parts.push(box(0.09, 0.58, 0.09, PAL.stone, { x: s * 1.3, y: fy + 0.29, z: fz + 0.35 + k * 0.4 }));
  parts.push(box(2.8, 0.1, 0.18, PAL.stoneMid, { y: fy + 0.62, z: fz + 1.24 }));
  for (const s of [-1, 1]) parts.push(box(0.16, 0.1, 1.3, PAL.stoneMid, { x: s * 1.3, y: fy + 0.62, z: fz + 0.62 }));
  parts.push(box(1.15, 1.9, 0.1, '#2f241d', { y: fy + 0.95, z: fz + 0.02 }));
  parts.push(cyl(0.575, 0.575, 0.1, 10, '#2f241d', { y: fy + 1.9, z: fz + 0.02, rx: Math.PI / 2 }, { thetaStart: -Math.PI / 2, thetaLength: Math.PI }));
  // main door at ground level (west side so the courtyard stays open)
  parts.push(box(1.3, 2.1, 0.1, PAL.door, { y: 1.05, z: fz + 0.03 }));
  place(parts, { x: kx, y: TOP, z: kz });
  ctx.buckets.solid.add(parts);

  // windows (emissive at night)
  const wins = [];
  for (const x of [-2.2, 2.2]) for (const y of [2.6, 5.4]) wins.push(box(0.5, 0.85, 0.08, '#fff', { x, y, z: D / 2 + 0.03 }));
  for (const z of [-1.1, 1.1]) for (const s of [-1, 1]) wins.push(box(0.08, 0.85, 0.5, '#fff', { x: s * (W / 2 + 0.03), y: 5.4, z }));
  wins.push(box(0.4, 0.7, 0.08, '#fff', { y: H + 2.6, z: 1.52 }));
  place(wins, { x: kx, y: TOP, z: kz });
  ctx.buckets.glow.add(wins);

  anchors.flags.push({ x: kx, y: TOP + H + 4.45 + 3.6 + 1.4, z: kz, w: 1.7, h: 0.95, colors: ['#2f57a6', '#f2c94c'], royal: true, seed: 20 });
  for (const s of [-1, 1]) {
    anchors.banners.push({ x: kx + s * 2.25, y: TOP + H - 0.6, z: kz + D / 2 + 0.06, w: 0.95, h: 3.2, ry: 0, colors: ['#2f57a6', '#f2c94c'], seed: 30 + s });
  }
  anchors.torches.push({ x: kx - 0.95, y: TOP + 1.9, z: kz + D / 2 + 0.25, wall: true, ry: 0 });
  anchors.torches.push({ x: kx + 0.95, y: TOP + 1.9, z: kz + D / 2 + 0.25, wall: true, ry: 0 });
}

function buildCourtyard(ctx, rand, anchors) {
  const parts = [];
  const fx = FORGE.x;
  const fz = FORGE.z;
  // forge with a hood and chimney, anvil, quench barrel, rack of swords
  const forge = [];
  forge.push(box(1.5, 0.9, 1.1, PAL.stoneDark, { y: 0.45 }));
  forge.push(box(1.2, 0.1, 0.8, '#3a2e28', { y: 0.92 }));
  forge.push(box(1.6, 0.35, 1.2, PAL.stoneMid, { y: 2.0 }));
  forge.push(cone(0.85, 0.7, 4, PAL.stoneMid, { y: 2.5, ry: Math.PI / 4 }));
  forge.push(box(0.5, 1.6, 0.5, PAL.stoneDark, { y: 3.3 }));
  for (const s of [-1, 1]) forge.push(box(0.15, 1.1, 0.15, PAL.timber, { x: s * 0.65, y: 1.45, z: 0.45 }));
  forge.push(box(0.5, 0.35, 0.35, '#6b4a32', { x: -1.05, y: 0.55, z: 0.1 })); // bellows
  place(forge, { x: fx + 1.25, y: TOP, z: fz - 0.2, ry: -Math.PI / 2 });
  parts.push(...forge);
  anchors.smoke.push({ x: fx + 1.25, y: TOP + 4.15, z: fz - 0.2, size: 0.9 });
  anchors.coals.push({ x: fx + 1.25, y: TOP + 0.98, z: fz - 0.2 });

  // anvil on a stump
  const anvil = [
    cyl(0.28, 0.32, 0.45, 8, PAL.woodDark, { y: 0.225 }),
    box(0.26, 0.16, 0.5, PAL.iron, { y: 0.53 }),
    box(0.34, 0.12, 0.62, PAL.ironLight, { y: 0.66 }),
    cone(0.08, 0.26, 4, PAL.ironLight, { y: 0.66, z: 0.42, rx: Math.PI / 2 }),
  ];
  place(anvil, { x: fx, y: TOP, z: fz + 0.62 });
  parts.push(...anvil);
  anchors.anvil = { x: fx, y: TOP + 0.74, z: fz + 0.62 };

  parts.push(cyl(0.34, 0.3, 0.7, 10, PAL.wood, { x: fx - 1.0, y: TOP + 0.35, z: fz + 1.2 }));
  parts.push(cyl(0.3, 0.3, 0.05, 10, PAL.waterDeep, { x: fx - 1.0, y: TOP + 0.66, z: fz + 1.2 }));
  // weapon rack
  const rack = [box(1.6, 0.1, 0.1, PAL.timber, { y: 1.1 }), box(0.1, 1.2, 0.1, PAL.timber, { x: -0.75, y: 0.6 }), box(0.1, 1.2, 0.1, PAL.timber, { x: 0.75, y: 0.6 })];
  for (let k = 0; k < 4; k++) rack.push(box(0.05, 1.1, 0.05, PAL.ironLight, { x: -0.5 + k * 0.33, y: 0.65, z: 0.08, rz: 0.1 }));
  place(rack, { x: fx - 0.4, y: TOP, z: fz + 2.6, ry: 0.2 });
  parts.push(...rack);

  // hay cart, barrels and crates
  const cart = [
    box(1.6, 0.12, 1.0, PAL.wood, { y: 0.6 }),
    box(1.6, 0.4, 0.06, PAL.woodDark, { y: 0.85, z: 0.5 }),
    box(1.6, 0.4, 0.06, PAL.woodDark, { y: 0.85, z: -0.5 }),
    cyl(0.38, 0.38, 0.08, 8, PAL.woodDark, { x: 0.2, y: 0.38, z: 0.56, rx: Math.PI / 2 }),
    cyl(0.38, 0.38, 0.08, 8, PAL.woodDark, { x: 0.2, y: 0.38, z: -0.56, rx: Math.PI / 2 }),
    box(1.4, 0.5, 0.9, PAL.thatch, { y: 0.95 }, { wobble: 0.05 }),
    beam([-0.8, 0.6, 0], [-1.7, 0.2, 0], 0.07, 0.07, PAL.woodDark),
  ];
  place(cart, { x: C.x - 4.2, y: TOP, z: C.z + 2.2, ry: 0.5 });
  parts.push(...cart);
  for (const [x, z] of [[-5.2, 0.4], [-4.7, -0.2], [-5.4, -0.4], [3.6, 3.6]]) {
    parts.push(cyl(0.3, 0.27, 0.72, 8, PAL.wood, { x: C.x + x, y: TOP + 0.36, z: C.z + z }));
    parts.push(cyl(0.31, 0.31, 0.06, 8, PAL.iron, { x: C.x + x, y: TOP + 0.55, z: C.z + z }));
  }
  for (const [x, z, s] of [[-4.6, -1.6, 0.6], [-4.0, -2.2, 0.5], [-4.4, -2.0, 0.42]]) parts.push(box(s, s, s, PAL.woodLight, { x: C.x + x, y: TOP + s / 2 + (s < 0.45 ? 0.6 : 0), z: C.z + z, ry: s * 3 }));
  // training dummy
  const dummy = [cyl(0.05, 0.05, 1.5, 5, PAL.timber, { y: 0.75 }), box(0.8, 0.08, 0.08, PAL.timber, { y: 1.2 }), cyl(0.2, 0.22, 0.55, 6, PAL.thatch, { y: 1.05 }), ico(0.16, 0, PAL.thatch, { y: 1.5 })];
  place(dummy, { x: C.x - 1.8, y: TOP, z: C.z + 4.6, ry: 0.4 });
  parts.push(...dummy);
  ctx.buckets.solid.add(parts);

  anchors.torches.push({ x: fx + 1.25 + 0.9, y: TOP + 1.6, z: fz - 0.2 + 0.6, wall: false });
}

export function createCastle(ctx) {
  const rand = rng(2024);
  const anchors = { walkways: [], flags: [], banners: [], torches: [], smoke: [], coals: [], anvil: null };
  buildWalls(ctx, rand, anchors);
  buildTowers(ctx, rand, anchors);
  buildGatehouse(ctx, anchors);
  buildKeep(ctx, anchors);
  buildCourtyard(ctx, rand, anchors);
  // a torch on each walkway-facing tower door
  for (const tw of towerPositions()) {
    const outA = Math.atan2(tw.z - C.z, tw.x - C.x);
    anchors.torches.push({ x: tw.x + Math.cos(outA) * (C.towerR + 0.18), y: TOP + 3.1, z: tw.z + Math.sin(outA) * (C.towerR + 0.18), wall: true });
  }
  return anchors;
}
