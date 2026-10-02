import { cone, cyl, dodeca, ico, withAttribute } from '../core/geo.js';
import { rng, TAU } from '../core/math.js';
import {
  CASTLE, CHICKEN_YARD, FIELDS, groundHeight, groundInfo, HOUSES, islandRadius, MARKET, MAYPOLE, PASTURE, PIGPEN, POND,
  SLEEPER_TREE, SPRING, SQUARE, WELL, WINDMILL, WOODCUTTER,
} from './layout.js';
import { PAL } from './palette.js';

const info = {};

/** True when nothing important occupies the spot (paths, buildings, water, fields…). */
export function isFree(x, z, margin = 0.6) {
  const rr = Math.hypot(x, z);
  if (rr > islandRadius(Math.atan2(z, x)) - 2.2 - margin * 0.5) return false;
  const cd = Math.hypot(x - CASTLE.x, z - CASTLE.z);
  const southness = Math.max(0, (z - CASTLE.z) / (cd + 1e-6));
  if (cd < CASTLE.slopeR + 0.5 + (CASTLE.rampR - CASTLE.slopeR + 1) * Math.pow(southness, 3)) return false;
  groundInfo(x, z, info);
  if (info.path < margin + 0.3 || info.square < margin + 0.6 || info.field || info.water < margin + 0.6) return false;
  if (info.pen < margin + 0.5 || info.yard < margin + 0.5) return false;
  for (const h of HOUSES) if (Math.hypot(x - h.x, z - h.z) < Math.max(h.w, h.d) * 0.75 + 0.9 + margin) return false;
  for (const m of MARKET) if (Math.hypot(x - m.x, z - m.z) < 2.2 + margin) return false;
  const spots = [
    [MAYPOLE.x, MAYPOLE.z, 3.6], [WELL.x, WELL.z, 3], [WOODCUTTER.x, WOODCUTTER.z, 3.4], [SLEEPER_TREE.x, SLEEPER_TREE.z, 3.2],
    [PASTURE.x, PASTURE.z, PASTURE.r + 1], [WINDMILL.x, WINDMILL.z, 4.5], [SQUARE.x, SQUARE.z, SQUARE.r + 1],
  ];
  for (const [sx, sz, r] of spots) if (Math.hypot(x - sx, z - sz) < r + margin) return false;
  return true;
}

const sway = (g, baseY, height, amount = 1) => withAttribute(g, 'aSway', (x, y) => Math.max(0, (y - baseY) / height) * amount);
const still = (g) => withAttribute(g, 'aSway', () => 0);

function roundTree(rand, x, z, s = 1, palette = null) {
  const y = groundHeight(x, z);
  const trunkH = (1.4 + rand.next() * 0.8) * s;
  const solid = [cyl(0.14 * s, 0.24 * s, trunkH + 0.3, 6, PAL.trunk, { x, y: y + trunkH / 2 - 0.1, z, rz: (rand.next() - 0.5) * 0.12 })];
  const leaves = [];
  const apple = palette === 'apple';
  const cols = Array.isArray(palette) ? palette : [PAL.leafA, PAL.leafB, PAL.leafC, PAL.leafD];
  const blobs = 3 + Math.floor(rand.next() * 2);
  const top = y + trunkH;
  for (let i = 0; i < blobs; i++) {
    const a = rand.next() * TAU;
    const off = i === 0 ? 0 : (0.45 + rand.next() * 0.35) * s;
    const r = (i === 0 ? 1.15 : 0.75 + rand.next() * 0.35) * s;
    const g = ico(r, 1, rand.pick(cols), {
      x: x + Math.cos(a) * off,
      y: top + (i === 0 ? 0.55 : 0.25 + rand.next() * 0.7) * s,
      z: z + Math.sin(a) * off,
      sy: 0.85,
    }, { wobble: 0.12 * s, seed: Math.floor(x * 13 + z * 7 + i) });
    leaves.push(sway(g, top - 0.6 * s, 2.6 * s));
  }
  if (apple || rand.next() < 0.12) {
    for (let k = 0; k < 7; k++) {
      const a = rand.next() * TAU;
      leaves.push(sway(ico(0.09 * s, 0, '#d8453a', { x: x + Math.cos(a) * 1.0 * s, y: top + (0.2 + rand.next() * 0.9) * s, z: z + Math.sin(a) * 1.0 * s }), top - 0.6 * s, 2.6 * s));
    }
  }
  return { solid, leaves };
}

function pineTree(rand, x, z, s = 1) {
  const y = groundHeight(x, z);
  const solid = [cyl(0.12 * s, 0.2 * s, 1.2 * s, 5, PAL.trunk, { x, y: y + 0.5 * s, z })];
  const leaves = [];
  const tiers = 3;
  for (let i = 0; i < tiers; i++) {
    const r = (1.25 - i * 0.3) * s;
    const h = (1.5 - i * 0.18) * s;
    const g = cone(r, h, 7, i % 2 ? PAL.pine : PAL.pineDark, { x, y: y + (1.2 + i * 0.85) * s + h / 2, z, ry: rand.next() }, { wobble: 0.08 * s, seed: Math.floor(x * 5 + z * 3 + i) });
    leaves.push(sway(g, y + 1.2 * s, 3.5 * s, 0.8));
  }
  return { solid, leaves };
}

function bush(rand, x, z, s = 1) {
  const y = groundHeight(x, z);
  const leaves = [];
  const n = 2 + Math.floor(rand.next() * 2);
  for (let i = 0; i < n; i++) {
    const g = ico((0.38 + rand.next() * 0.22) * s, 0, rand.pick([PAL.leafA, PAL.leafB, PAL.leafC]), { x: x + (rand.next() - 0.5) * 0.6 * s, y: y + 0.25 * s, z: z + (rand.next() - 0.5) * 0.6 * s, sy: 0.75 }, { wobble: 0.06 });
    leaves.push(sway(g, y, 1.2 * s, 0.6));
  }
  if (rand.next() < 0.35) for (let k = 0; k < 4; k++) leaves.push(sway(ico(0.06, 0, rand.pick(['#f2cf55', '#f7f3ea', '#e07b8c']), { x: x + (rand.next() - 0.5) * 0.7 * s, y: y + 0.45 * s, z: z + (rand.next() - 0.5) * 0.7 * s }), y, 1.2 * s, 0.6));
  return leaves;
}

export function createNature(ctx) {
  const rand = rng(4242);
  const { solid, foliage } = ctx.buckets;
  const addTree = (t) => {
    solid.add(t.solid);
    foliage.add(t.leaves);
  };

  // The sleeping peasant's big shade tree.
  addTree(roundTree(rand, SLEEPER_TREE.x, SLEEPER_TREE.z, 1.35));

  // Fruit trees among the cottages.
  for (const [x, z] of [[-12.6, 13.2], [7.6, 31.4], [-9.0, 31.0], [14.4, 12.4], [12.5, 31.0]]) {
    if (Math.hypot(x, z) < islandRadius(Math.atan2(z, x)) - 2.6) addTree(roundTree(rand, x, z, 0.85, 'apple'));
  }

  // Forest belt to the north and groves around the rim.
  let placed = 0;
  for (let tries = 0; tries < 2600 && placed < 150; tries++) {
    const a = rand.next() * TAU;
    const R = islandRadius(a);
    const r = R * Math.sqrt(0.18 + rand.next() * 0.82);
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const north = z < -19;
    const rim = r > R - 7.5;
    const west = x < -24;
    if (!north && !rim && !west && rand.next() < 0.85) continue;
    if (!isFree(x, z, 0.9)) continue;
    if (!north && Math.hypot(x - 0, z - 22) < 14 && rand.next() < 0.75) continue;
    const s = 0.75 + rand.next() * 0.5;
    if (north && rand.next() < 0.55) addTree(pineTree(rand, x, z, s * 1.05));
    else if (rand.next() < 0.12) addTree(roundTree(rand, x, z, s, [PAL.leafAutumn, PAL.leafOrange, PAL.leafB]));
    else addTree(roundTree(rand, x, z, s));
    placed++;
  }

  // Bushes, rocks, grass tufts and flowers.
  for (let i = 0, n = 0; i < 1600 && n < 70; i++) {
    const a = rand.next() * TAU;
    const r = islandRadius(a) * Math.sqrt(rand.next());
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    if (!isFree(x, z, 0.4)) continue;
    foliage.add(bush(rand, x, z, 0.8 + rand.next() * 0.5));
    n++;
  }
  for (let i = 0, n = 0; i < 1500 && n < 55; i++) {
    const a = rand.next() * TAU;
    const r = islandRadius(a) * Math.sqrt(rand.next());
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    if (!isFree(x, z, 0.2)) continue;
    const s = 0.2 + rand.next() * 0.45;
    solid.add(dodeca(s, rand.pick(['#a39a8e', '#b3aa9c', '#958b80']), { x, y: groundHeight(x, z) + s * 0.25, z, ry: rand.next() * 3, sy: 0.7 }, { wobble: s * 0.15 }));
    n++;
  }
  const flowerCols = ['#f7f3ea', '#f2cf55', '#e8574a', '#d971a8', '#8f7ad6', '#f7f3ea'];
  for (let i = 0, n = 0; i < 4000 && n < 260; i++) {
    const a = rand.next() * TAU;
    const r = islandRadius(a) * Math.sqrt(rand.next());
    const cx = Math.cos(a) * r;
    const cz = Math.sin(a) * r;
    if (!isFree(cx, cz, 0.1)) continue;
    const col = rand.pick(flowerCols);
    const count = 3 + Math.floor(rand.next() * 5);
    for (let k = 0; k < count; k++) {
      const x = cx + (rand.next() - 0.5) * 1.2;
      const z = cz + (rand.next() - 0.5) * 1.2;
      const y = groundHeight(x, z);
      foliage.add(still(cyl(0.012, 0.012, 0.18, 3, PAL.leafC, { x, y: y + 0.09, z })));
      foliage.add(sway(ico(0.055, 0, col, { x, y: y + 0.2, z }), y, 0.3, 0.6));
    }
    n++;
  }
  for (let i = 0, n = 0; i < 4000 && n < 420; i++) {
    const a = rand.next() * TAU;
    const r = islandRadius(a) * Math.sqrt(rand.next());
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    if (!isFree(x, z, 0)) continue;
    const y = groundHeight(x, z);
    const h = 0.18 + rand.next() * 0.2;
    foliage.add(sway(cone(0.09, h, 3, rand.pick([PAL.grassDark, PAL.leafC, PAL.grassB]), { x, y: y + h / 2 - 0.02, z, ry: rand.next() * 3, rz: (rand.next() - 0.5) * 0.3 }), y, h, 1.2));
    n++;
  }

  // Mushrooms at the forest edge.
  for (let i = 0, n = 0; i < 600 && n < 14; i++) {
    const x = -20 + rand.next() * 40;
    const z = -21 - rand.next() * 10;
    if (!isFree(x, z, 0.2)) continue;
    const y = groundHeight(x, z);
    solid.add(cyl(0.04, 0.05, 0.16, 5, '#f3ead8', { x, y: y + 0.08, z }));
    solid.add(cone(0.13, 0.12, 6, '#d8453a', { x, y: y + 0.2, z }));
    n++;
  }

  // Crops.
  for (const f of FIELDS) {
    const c = Math.cos(f.ry);
    const s = Math.sin(f.ry);
    const toWorld = (lx, lz) => [f.x + lx * c + lz * s, f.z - lx * s + lz * c];
    const rows = Math.floor(f.w / 0.9);
    for (let row = 0; row < rows; row++) {
      const lx = -f.w / 2 + 0.45 + row * 0.9;
      if (f.crop === 'wheat') {
        for (let lz = -f.d / 2 + 0.2; lz <= f.d / 2 - 0.15; lz += 0.32) {
          for (const off of [-0.22, 0.22]) {
            const [x, z] = toWorld(lx + off + (rand.next() - 0.5) * 0.08, lz + (rand.next() - 0.5) * 0.1);
            const y = groundHeight(x, z);
            const h = 0.75 + rand.next() * 0.2;
            foliage.add(sway(cone(0.1, h, 4, rand.pick(['#e8c45a', '#dcb24a', '#f0d070']), { x, y: y + h / 2, z, ry: rand.next() }), y, h, 1.6));
          }
        }
      } else if (f.crop === 'cabbage') {
        if (row % 2) continue;
        for (let lz = -f.d / 2 + 0.4; lz <= f.d / 2 - 0.3; lz += 0.7) {
          const [x, z] = toWorld(lx + 0.45, lz);
          const y = groundHeight(x, z);
          foliage.add(sway(ico(0.24, 0, '#86b85a', { x, y: y + 0.16, z, sy: 0.75, ry: rand.next() * 3 }, { wobble: 0.03 }), y, 0.5, 0.25));
          foliage.add(sway(ico(0.15, 0, '#b4d986', { x, y: y + 0.27, z, sy: 0.8 }), y, 0.5, 0.25));
        }
      } else if (f.crop === 'pumpkin') {
        if (row % 2) continue;
        for (let lz = -f.d / 2 + 0.5; lz <= f.d / 2 - 0.4; lz += 0.95) {
          const [x, z] = toWorld(lx + 0.45 + (rand.next() - 0.5) * 0.2, lz + (rand.next() - 0.5) * 0.3);
          const y = groundHeight(x, z);
          const r = 0.2 + rand.next() * 0.12;
          solid.add(ico(r, 1, rand.pick(['#e8873a', '#f09a40', '#d9772f']), { x, y: y + r * 0.6, z, sy: 0.72 }));
          solid.add(cyl(0.03, 0.04, 0.12, 4, '#5f7a2e', { x, y: y + r * 1.25, z }));
          foliage.add(sway(ico(0.16, 0, PAL.leafC, { x: x + 0.25, y: y + 0.06, z: z + 0.1, sy: 0.3 }), y, 0.4, 0.3));
        }
      }
    }
  }

  // Reeds and lily pads around the pond and spring.
  for (const w of [POND, SPRING]) {
    const n = w === POND ? 34 : 14;
    for (let i = 0; i < n; i++) {
      const a = rand.next() * TAU;
      if (w === POND && Math.abs(Math.atan2(Math.sin(a), Math.cos(a))) < 0.5) continue; // keep the dock side clear
      const r = w.r - 0.2 + rand.next() * 0.6;
      const x = w.x + Math.cos(a) * r;
      const z = w.z + Math.sin(a) * r;
      const y = Math.max(groundHeight(x, z), w.level - 0.1);
      const h = 0.6 + rand.next() * 0.5;
      foliage.add(sway(cyl(0.018, 0.025, h, 3, PAL.leafC, { x, y: y + h / 2, z, rz: (rand.next() - 0.5) * 0.25 }), y, h, 1.2));
      if (rand.next() < 0.5) foliage.add(sway(cyl(0.04, 0.04, 0.16, 5, '#7a5232', { x, y: y + h - 0.05, z }), y, h, 1.2));
    }
    const pads = w === POND ? 10 : 3;
    for (let i = 0; i < pads; i++) {
      const a = rand.next() * TAU;
      const r = rand.next() * (w.r - 1.4) + 0.6;
      const x = w.x + Math.cos(a) * r;
      const z = w.z + Math.sin(a) * r;
      solid.add(cyl(0.22 + rand.next() * 0.12, 0.22, 0.02, 7, '#5f9e3c', { x, y: w.level + 0.02, z, ry: rand.next() * 3 }));
      if (rand.next() < 0.3) solid.add(ico(0.06, 0, '#f6c3d0', { x, y: w.level + 0.08, z }));
    }
  }

  // A few trees and bushes around the edge of the pig pen and the chicken yard.
  for (const [x, z] of [[PIGPEN.x + 4.2, PIGPEN.z - 1.0], [CHICKEN_YARD.x + 0.6, CHICKEN_YARD.z - 4.6]]) foliage.add(bush(rand, x, z, 1.1));

  return { isFree };
}

