// Castle: curtain walls, corner towers, gatehouse, keep with the king's balcony,
// and a courtyard with a forge. All static geometry goes into one Batch.
import * as THREE from 'three';
import { rng } from '../core/util.js';
import { Batch, geo, vary, mesh, windowMat } from '../core/kit.js';
import { CASTLE, PLATEAU_Y, WALL, TOWERS, GATE, KEEP, BALCONY, FORGE } from './layout.js';

const STONE = '#c3b9a8';
const STONE_DARK = '#a39886';
const STONE_LIGHT = '#d6cdbc';
const WALK = '#b3a894';
const DARK = '#3b302a';
const WOOD = '#8a5a35';
const WOOD_DARK = '#5e3c24';
const ROOF = '#b9473d';
const ROOF_BLUE = '#4a69a8';

export function buildCastle() {
  const b = new Batch();
  const win = new Batch();
  const rand = rng(42);
  const flags = [];
  const smoke = [];
  const base = PLATEAU_Y - 1;
  const H = WALL.top - base;

  // A straight wall from (x0,z0) to (x1,z1) with walkway and merlons on the outer side.
  function wall(x0, z0, x1, z1, outX, outZ, { merlons = true } = {}) {
    const len = Math.hypot(x1 - x0, z1 - z0);
    const cx = (x0 + x1) / 2;
    const cz = (z0 + z1) / 2;
    const yaw = Math.atan2(x1 - x0, z1 - z0); // local +z along the wall
    b.push([cx, 0, cz], yaw);
    // local +x is the outward side if (outX,outZ) matches; flip sign accordingly
    const side = Math.sign(Math.cos(yaw) * outX - Math.sin(yaw) * outZ) || 1;
    b.box(STONE, [0, base + H / 2, 0], [WALL.thick, H, len]);
    b.box(WALK, [0, WALL.top + 0.02, 0], [WALL.thick - 0.1, 0.06, len]);
    // stone courses for texture
    for (let y = base + 1.2; y < WALL.top - 0.4; y += 1.15) {
      b.box(STONE_DARK, [side * (WALL.thick / 2 + 0.01), y, 0], [0.04, 0.12, len - 0.1]);
    }
    if (merlons) {
      const n = Math.floor(len / 1.3);
      for (let i = 0; i < n; i++) {
        const z = -len / 2 + (i + 0.5) * (len / n);
        b.box(vary(STONE, rand, 0.05), [side * (WALL.thick / 2 - 0.22), WALL.top + 0.42, z], [0.44, 0.85, 0.68]);
      }
      b.box(STONE, [side * (WALL.thick / 2 - 0.22), WALL.top + 0.1, 0], [0.44, 0.2, len]);
      // low inner parapet
      b.box(STONE_DARK, [-side * (WALL.thick / 2 - 0.1), WALL.top + 0.2, 0], [0.2, 0.4, len]);
    }
    b.pop();
  }

  const h = WALL.half;
  const { x: cx, z: cz } = CASTLE;
  const r = WALL.towerR;
  const gw = GATE.width / 2;
  // south wall split by the gate, plus a lintel carrying the walkway over it
  wall(cx - h + r - 0.3, cz + h, cx - gw, cz + h, 0, 1);
  wall(cx + gw, cz + h, cx + h - r + 0.3, cz + h, 0, 1);
  b.box(STONE, [GATE.x, WALL.top - 0.75, GATE.z], [GATE.width + 0.2, 1.5, WALL.thick]);
  b.box(WALK, [GATE.x, WALL.top + 0.02, GATE.z], [GATE.width + 0.2, 0.06, WALL.thick - 0.1]);
  for (let i = 0; i < 3; i++) b.box(STONE, [GATE.x - 1 + i, WALL.top + 0.42, GATE.z + 0.58], [0.68, 0.85, 0.44]);
  b.box(STONE_DARK, [GATE.x, WALL.top + 0.2, GATE.z - 0.7], [GATE.width, 0.4, 0.2]);
  wall(cx + h, cz + h - r + 0.3, cx + h, cz - h + r - 0.3, 1, 0); // east
  wall(cx + h - r + 0.3, cz - h, cx - h + r - 0.3, cz - h, 0, -1); // north
  wall(cx - h, cz - h + r - 0.3, cx - h, cz + h - r + 0.3, -1, 0); // west

  // gate: raised portcullis, open doors, gatehouse towers on the outer face
  for (let i = -3; i <= 3; i++) b.box(DARK, [GATE.x + i * 0.45, WALL.top - 2.0, GATE.z + 0.55], [0.08, 1.2, 0.08]);
  b.box(DARK, [GATE.x, WALL.top - 2.5, GATE.z + 0.55], [GATE.width, 0.08, 0.08]);
  b.box(WOOD, [GATE.x - gw - 0.1, base + 2.6, GATE.z - 1.3], [0.15, 3.2, 1.5], [0, 0.35, 0]);
  b.box(WOOD, [GATE.x + gw + 0.1, base + 2.6, GATE.z - 1.3], [0.15, 3.2, 1.5], [0, -0.35, 0]);
  for (const s of [-1, 1]) {
    const tx = GATE.x + s * (gw + 1.3);
    const tz = GATE.z + 1.7;
    b.box(STONE_LIGHT, [tx, base + 3.7, tz], [2.6, 7.4, 3]);
    for (let i = 0; i < 3; i++) {
      b.box(STONE_LIGHT, [tx - 0.85 + i * 0.85, base + 7.8, tz + 1.3], [0.5, 0.8, 0.4]);
      b.box(STONE_LIGHT, [tx + s * 1.1, base + 7.8, tz - 0.9 + i * 0.9], [0.4, 0.8, 0.5]);
    }
    b.box(STONE, [tx, base + 7.45, tz], [2.6, 0.1, 3]);
    b.box(DARK, [tx, base + 4.8, tz + 1.51], [0.18, 0.9, 0.04]);
    b.box(DARK, [tx, base + 2.8, tz + 1.51], [0.18, 0.7, 0.04]);
    // hanging banner
    b.box('#b8352f', [tx, base + 5.6, tz + 1.53], [1.1, 1.8, 0.05]);
    b.box('#e9c04a', [tx, base + 5.6, tz + 1.56], [0.25, 1.5, 0.03]);
    b.add(geo.prism(1.1, 0.4, 0.05), '#b8352f', [tx, base + 4.7, tz + 1.53], [Math.PI, 0, 0]);
  }
  // archway frame
  b.box(STONE_LIGHT, [GATE.x, WALL.top - 1.3, GATE.z + 0.85], [GATE.width + 0.6, 0.4, 0.3]);

  // corner towers
  for (const [tx, tz] of TOWERS) {
    const top = WALL.top + 3.6;
    b.add(geo.cyl(r, r + 0.15, top - base, 12), STONE, [tx, (top + base) / 2, tz]);
    b.add(geo.cyl(r + 0.35, r, 0.6, 12), STONE_DARK, [tx, top + 0.1, tz]);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      b.add(geo.box(0.6, 0.8, 0.4), vary(STONE, rand, 0.05), [tx + Math.cos(a) * (r + 0.15), top + 0.8, tz + Math.sin(a) * (r + 0.15)], [0, -a + Math.PI / 2, 0]);
    }
    b.add(geo.cyl(r - 0.3, r - 0.3, 0.9, 12), STONE_LIGHT, [tx, top + 0.6, tz]);
    b.add(geo.cone(r + 0.35, 4.2, 12), ROOF, [tx, top + 1.05 + 2.1, tz]);
    b.add(geo.cyl(0.05, 0.05, 2.4, 5), WOOD_DARK, [tx, top + 5.2, tz]);
    flags.push({ pos: new THREE.Vector3(tx, top + 6.35, tz), w: 1.6, h: 0.95, color: '#c8372f' });
    // doors onto adjacent walkways + arrow slits
    const toCx = Math.sign(cx - tx);
    const toCz = Math.sign(cz - tz);
    b.box(DARK, [tx + toCx * (r - 0.05), WALL.top + 0.95, tz], [0.12, 1.9, 1.0]);
    b.box(DARK, [tx, WALL.top + 0.95, tz + toCz * (r - 0.05)], [1.0, 1.9, 0.12]);
    for (const a of [0.4, 2.1, 3.7, 5.2]) {
      b.add(geo.box(0.16, 0.9, 0.1), DARK, [tx + Math.cos(a) * (r + 0.08), WALL.top + 2.2, tz + Math.sin(a) * (r + 0.08)], [0, -a + Math.PI / 2, 0]);
      b.add(geo.box(0.16, 0.9, 0.1), DARK, [tx + Math.cos(a + 0.8) * (r + 0.12), base + 3, tz + Math.sin(a + 0.8) * (r + 0.12)], [0, -a - 0.8 + Math.PI / 2, 0]);
    }
  }

  // ---------- keep ----------
  const kTop = base + KEEP.h;
  const kx = KEEP.x;
  const kz = KEEP.z;
  const hw = KEEP.w / 2;
  const hd = KEEP.d / 2;
  b.box(STONE_LIGHT, [kx, (kTop + base) / 2, kz], [KEEP.w, KEEP.h, KEEP.d]);
  b.box(STONE, [kx, base + 0.6, kz], [KEEP.w + 0.4, 1.2, KEEP.d + 0.4]);
  b.box(STONE, [kx, kTop + 0.15, kz], [KEEP.w + 0.4, 0.3, KEEP.d + 0.4]);
  for (let i = 0; i < 7; i++) {
    const o = -hw + 0.6 + i * ((KEEP.w - 1.2) / 6);
    b.box(STONE_LIGHT, [kx + o, kTop + 0.7, kz + hd + 0.05], [0.65, 0.8, 0.45]);
    b.box(STONE_LIGHT, [kx + o, kTop + 0.7, kz - hd - 0.05], [0.65, 0.8, 0.45]);
    b.box(STONE_LIGHT, [kx + hw + 0.05, kTop + 0.7, kz + o], [0.45, 0.8, 0.65]);
    b.box(STONE_LIGHT, [kx - hw - 0.05, kTop + 0.7, kz + o], [0.45, 0.8, 0.65]);
  }
  // corner bartizans
  for (const [sx, sz] of [[-1, 1], [1, 1], [-1, -1]]) {
    const bx = kx + sx * hw;
    const bz = kz + sz * hd;
    b.add(geo.cyl(0.85, 0.6, 2.4, 8), STONE, [bx, kTop + 0.6, bz]);
    b.add(geo.cone(1.05, 2, 8), ROOF_BLUE, [bx, kTop + 2.8, bz]);
  }
  // great tower on the NE corner
  const gtx = kx + hw - 0.6;
  const gtz = kz - hd + 0.6;
  const gTop = kTop + 6.5;
  b.add(geo.cyl(2.1, 2.2, gTop - base, 12), STONE_LIGHT, [gtx, (gTop + base) / 2, gtz]);
  b.add(geo.cyl(2.45, 2.1, 0.6, 12), STONE, [gtx, gTop + 0.1, gtz]);
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    b.add(geo.box(0.55, 0.75, 0.4), STONE_LIGHT, [gtx + Math.cos(a) * 2.25, gTop + 0.75, gtz + Math.sin(a) * 2.25], [0, -a + Math.PI / 2, 0]);
  }
  b.add(geo.cyl(1.8, 1.8, 0.8, 12), STONE_LIGHT, [gtx, gTop + 0.6, gtz]);
  b.add(geo.cone(2.5, 5.2, 12), ROOF_BLUE, [gtx, gTop + 1 + 2.6, gtz]);
  b.add(geo.cyl(0.06, 0.06, 3, 5), WOOD_DARK, [gtx, gTop + 7.4, gtz]);
  flags.push({ pos: new THREE.Vector3(gtx, gTop + 8.8, gtz), w: 2.6, h: 1.5, color: '#2f4f9a' });
  for (let y = base + 3; y < gTop - 1; y += 3.2) {
    win.box('#fff', [gtx + 1.45, y, gtz + 1.5], [0.4, 0.8, 0.12], [0, Math.PI / 4, 0]);
  }

  // balcony on the south face
  const fz = kz + hd; // south face
  b.box(STONE, [BALCONY.x, BALCONY.y - 0.15, fz + 0.85], [3.8, 0.3, 1.7]);
  for (const s of [-1.3, 0, 1.3]) b.add(geo.box(0.35, 0.7, 1.2), STONE_DARK, [BALCONY.x + s, BALCONY.y - 0.6, fz + 0.5]);
  for (let i = 0; i <= 8; i++) b.box(STONE_LIGHT, [BALCONY.x - 1.75 + i * 0.4375, BALCONY.y + 0.42, fz + 1.62], [0.12, 0.8, 0.12]);
  for (let i = 1; i <= 3; i++) {
    b.box(STONE_LIGHT, [BALCONY.x - 1.82, BALCONY.y + 0.42, fz + i * 0.42], [0.12, 0.8, 0.12]);
    b.box(STONE_LIGHT, [BALCONY.x + 1.82, BALCONY.y + 0.42, fz + i * 0.42], [0.12, 0.8, 0.12]);
  }
  b.box(STONE, [BALCONY.x, BALCONY.y + 0.86, fz + 1.62], [3.8, 0.12, 0.22]);
  b.box(STONE, [BALCONY.x - 1.82, BALCONY.y + 0.86, fz + 0.8], [0.22, 0.12, 1.65]);
  b.box(STONE, [BALCONY.x + 1.82, BALCONY.y + 0.86, fz + 0.8], [0.22, 0.12, 1.65]);
  b.box(DARK, [BALCONY.x, BALCONY.y + 1.05, fz + 0.02], [1.3, 2.1, 0.06]);
  b.box(STONE, [BALCONY.x, BALCONY.y + 2.2, fz + 0.04], [1.7, 0.25, 0.1]);
  // royal banners either side of the balcony
  for (const s of [-1, 1]) {
    b.box('#7b2d8c', [BALCONY.x + s * 3, BALCONY.y + 0.6, fz + 0.04], [1.2, 3, 0.05]);
    b.box('#e9c04a', [BALCONY.x + s * 3, BALCONY.y + 1.1, fz + 0.07], [0.5, 0.5, 0.03], [0, 0, Math.PI / 4]);
    b.add(geo.prism(1.2, 0.5, 0.05), '#7b2d8c', [BALCONY.x + s * 3, BALCONY.y - 0.9, fz + 0.04], [Math.PI, 0, 0]);
    b.add(geo.cyl(0.04, 0.04, 1.5, 5), WOOD_DARK, [BALCONY.x + s * 3, BALCONY.y + 2.1, fz + 0.1], [0, 0, Math.PI / 2]);
  }
  // keep door + windows
  b.box(WOOD_DARK, [kx, base + 2.3, fz + 0.03], [1.8, 2.6, 0.08]);
  b.box(STONE, [kx, base + 3.75, fz + 0.06], [2.3, 0.3, 0.12]);
  b.box(STONE, [kx, base + 1.15, fz + 0.9], [2.4, 0.3, 1.8]);
  for (const s of [-1, 1]) {
    for (const y of [base + 4.4, kTop - 1.5]) {
      win.box('#fff', [kx + s * 2.8, y, fz + 0.03], [0.6, 1.0, 0.08]);
      win.box('#fff', [kx + hw + 0.03, y, kz + s * 2.4], [0.08, 1.0, 0.6]);
      win.box('#fff', [kx - hw - 0.03, y, kz + s * 2.4], [0.08, 1.0, 0.6]);
    }
  }

  // ---------- courtyard ----------
  // flagstone path from gate to keep
  for (let z = GATE.z - 1; z > fz + 1.8; z -= 0.9) {
    b.box(vary('#a99d88', rand, 0.08), [GATE.x + (rand() - 0.5) * 0.2, PLATEAU_Y + 0.03, z], [1.6, 0.06, 0.8]);
  }
  // barracks along the west wall
  {
    const bx = cx - h + 2.6;
    b.box('#e2d6bd', [bx, PLATEAU_Y + 1.2, cz - 2], [3.2, 2.4, 11]);
    b.box(WOOD_DARK, [bx + 1.62, PLATEAU_Y + 1.2, cz - 2], [0.06, 2.4, 0.15]);
    b.add(geo.box(3.9, 0.22, 11.6), '#8c5a3c', [bx + 0.1, PLATEAU_Y + 2.75, cz - 2], [0, 0, -0.32]);
    for (const z of [-6, -2, 2]) {
      b.box(WOOD_DARK, [bx + 1.62, PLATEAU_Y + 0.9, cz + z], [0.06, 1.7, 0.9]);
      win.box('#fff', [bx + 1.62, PLATEAU_Y + 1.5, cz + z + 1.3], [0.06, 0.6, 0.6]);
    }
  }
  // forge: stone hearth, chimney, anvil, quench barrel, rack, awning
  const fx = FORGE.x;
  const fzz = FORGE.z;
  b.box('#8f8577', [fx + 2.2, PLATEAU_Y + 0.55, fzz - 0.6], [1.8, 1.1, 1.4]);
  b.box('#6c6359', [fx + 2.2, PLATEAU_Y + 1.15, fzz - 0.6], [1.9, 0.12, 1.5]);
  b.box('#8f8577', [fx + 2.6, PLATEAU_Y + 2.4, fzz - 1.05], [0.8, 4.8, 0.7]);
  b.box('#6c6359', [fx + 2.6, PLATEAU_Y + 4.9, fzz - 1.05], [0.95, 0.25, 0.85]);
  smoke.push({ pos: new THREE.Vector3(fx + 2.6, PLATEAU_Y + 5.1, fzz - 1.05), dark: true });
  b.box('#4a4a50', [fx, PLATEAU_Y + 0.35, fzz + 1.1], [0.45, 0.7, 0.4]);
  b.box('#55555c', [fx, PLATEAU_Y + 0.78, fzz + 1.1], [0.9, 0.2, 0.36]);
  b.add(geo.cone(0.18, 0.4, 4), '#55555c', [fx + 0.6, PLATEAU_Y + 0.78, fzz + 1.1], [0, 0, -Math.PI / 2]);
  b.add(geo.cyl(0.4, 0.36, 0.8, 10), WOOD, [fx - 1.3, PLATEAU_Y + 0.4, fzz + 0.4]);
  b.add(geo.cyl(0.34, 0.34, 0.02, 10), '#3d6f8f', [fx - 1.3, PLATEAU_Y + 0.75, fzz + 0.4]);
  b.box(WOOD_DARK, [fx - 1.1, PLATEAU_Y + 0.9, fzz - 1.6], [1.8, 0.1, 0.1]);
  for (let i = 0; i < 4; i++) {
    b.add(geo.cyl(0.03, 0.03, 1.8, 4), '#9a9aa2', [fx - 1.8 + i * 0.45, PLATEAU_Y + 0.9, fzz - 1.5], [0.15, 0, 0]);
  }
  for (const [px, pz] of [[-1.2, -2.1], [3.4, -2.1], [-1.2, 1.9], [3.4, 1.9]]) {
    b.add(geo.cyl(0.08, 0.08, 2.8, 5), WOOD_DARK, [fx + px, PLATEAU_Y + 1.4, fzz + pz]);
  }
  b.add(geo.box(5, 0.12, 4.6), '#9b6b44', [fx + 1.1, PLATEAU_Y + 2.85, fzz - 0.1], [0.12, 0, 0]);

  // barrels, crates, hay and a practice dummy
  for (const [px, pz] of [[-5.5, -5.2], [-6.1, -4.6], [5.2, -21.5], [6, -22.2], [-5.8, -22]]) {
    b.add(geo.cyl(0.35, 0.3, 0.75, 8), vary(WOOD, rand, 0.1), [px, PLATEAU_Y + 0.37, pz]);
  }
  b.box('#a8763f', [cx - 3.4, PLATEAU_Y + 0.35, cz + 9.2], [0.7, 0.7, 0.7], [0, 0.4, 0]);
  b.box('#a8763f', [cx - 3.9, PLATEAU_Y + 0.3, cz + 8.5], [0.6, 0.6, 0.6], [0, 0.1, 0]);
  b.add(geo.cyl(0.8, 1.0, 0.9, 8), '#e2c25d', [cx + 7.2, PLATEAU_Y + 0.45, cz - 7.5]);
  b.add(geo.cyl(0.07, 0.07, 1.8, 5), WOOD_DARK, [cx - 4.5, PLATEAU_Y + 0.9, cz - 7]);
  b.box(WOOD, [cx - 4.5, PLATEAU_Y + 1.5, cz - 7], [1.0, 0.1, 0.1]);
  b.add(geo.ico(0.28), '#d9c08a', [cx - 4.5, PLATEAU_Y + 1.95, cz - 7]);
  b.add(geo.cyl(0.25, 0.3, 0.7, 6), '#d9c08a', [cx - 4.5, PLATEAU_Y + 1.35, cz - 7]);

  const group = new THREE.Group();
  group.add(b.build());
  group.add(win.build(windowMat, { castShadow: false }));

  // forge fire (animated glow)
  const fire = mesh(geo.box(1.2, 0.18, 0.9), '#ff7a2a', [fx + 2.2, PLATEAU_Y + 1.25, fzz - 0.6], [0, 0, 0], 1, {
    emissive: '#ff5a10',
    emissiveIntensity: 2,
  });
  fire.castShadow = false;
  group.add(fire);
  const forgeLight = new THREE.PointLight('#ff8a3a', 6, 7, 1.6);
  forgeLight.position.set(fx + 2.2, PLATEAU_Y + 1.9, fzz - 0.2);
  group.add(forgeLight);

  return { group, flags, smoke, fire, forgeLight };
}
