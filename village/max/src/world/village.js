import * as THREE from 'three';
import { beam, box, cone, cyl, ico, place, prism, sphere, torus, polygon } from '../core/geo.js';
import { noise2, rng, TAU } from '../core/math.js';
import { CHICKEN_YARD, groundHeight, HOUSES, MARKET, MAYPOLE, PASTURE, PIGPEN, POND, SQUARE } from './layout.js';
import { PAL } from './palette.js';

export const DOCK = { x: POND.x + POND.r - 0.4, z: POND.z + 0.6, len: 2.6 };

/** A timber-framed cottage in local space (door facing +Z). */
function cottage(spec, rand) {
  const { w, d, h } = spec;
  const parts = [];
  const glow = [];
  const base = 0.2;
  const thatch = spec.roof === 'thatch';
  const wall = rand.next() < 0.5 ? PAL.plaster : PAL.plasterWarm;
  parts.push(box(w + 0.3, 0.7, d + 0.3, PAL.stoneDark, { y: -0.15 }));
  parts.push(box(w, h, d, wall, { y: base + h / 2 }));
  // timber frame
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) parts.push(box(0.17, h, 0.17, PAL.timber, { x: (sx * w) / 2, y: base + h / 2, z: (sz * d) / 2 }));
  for (const y of [base + 0.08, base + h * 0.52, base + h - 0.05]) {
    for (const sz of [-1, 1]) parts.push(box(w + 0.05, 0.12, 0.07, PAL.timber, { y, z: sz * (d / 2 + 0.02) }));
    for (const sx of [-1, 1]) parts.push(box(0.07, 0.12, d + 0.05, PAL.timber, { x: sx * (w / 2 + 0.02), y }));
  }
  for (const sx of [-1, 1]) {
    parts.push(beam([sx * (w / 2 - 0.08), base + 0.1, d / 2 + 0.03], [sx * (w / 2 - 0.62), base + h * 0.52, d / 2 + 0.03], 0.09, 0.06, PAL.timber));
    parts.push(beam([sx * (w / 2 - 0.08), base + h * 0.52, -d / 2 - 0.03], [sx * (w / 2 - 0.62), base + h - 0.06, -d / 2 - 0.03], 0.09, 0.06, PAL.timber));
  }

  // roof (ridge along X)
  const over = 0.38;
  const rh = d * (thatch ? 0.62 : 0.5);
  const run = d / 2 + over;
  const slope = Math.hypot(run, rh + over * (rh / (d / 2)));
  const pitch = Math.atan2(rh, d / 2);
  const thick = thatch ? 0.3 : 0.16;
  const eaveY = base + h - over * Math.tan(pitch);
  for (const s of [-1, 1]) {
    const cz = (s * run) / 2;
    const cy = eaveY + (run / 2) * Math.tan(pitch) + thick / 2;
    if (thatch) {
      parts.push(box(w + over * 1.6, thick, slope, PAL.thatch, { y: cy, z: cz, rx: s * pitch }, { jitter: 0.08 }));
      parts.push(box(w + over * 1.6 + 0.05, thick * 0.7, 0.28, PAL.thatchDark, { y: eaveY + 0.02, z: s * (run - 0.08), rx: s * pitch }));
    } else {
      const strips = 5;
      for (let k = 0; k < strips; k++) {
        const u = (k + 0.5) / strips - 0.5;
        parts.push(
          box(w + over * 1.6, thick, slope / strips + 0.02, k % 2 ? PAL.terracotta : PAL.terracottaDark, {
            y: cy - u * slope * Math.sin(pitch),
            z: cz + s * u * slope * Math.cos(pitch),
            rx: s * pitch,
          }),
        );
      }
    }
  }
  parts.push(box(w + over * 1.6 + 0.04, 0.16, 0.24, thatch ? PAL.thatchDark : PAL.terracottaDark, { y: base + h + rh + thick * 0.8, z: 0 }));
  for (const sx of [-1, 1]) {
    parts.push(prism(d, rh, 0.12, wall, { x: (sx * w) / 2, y: base + h, ry: Math.PI / 2 }));
    parts.push(beam([sx * (w / 2 + 0.07), base + h, 0], [sx * (w / 2 + 0.07), base + h + rh * 0.92, 0], 0.08, 0.08, PAL.timber));
  }

  // chimney
  const chx = (w / 2 - 0.55) * (rand.next() < 0.5 ? 1 : -1);
  const chz = -d / 4;
  const chTop = base + h + rh * 0.55 + 1.0;
  parts.push(box(0.46, chTop - base - h + 0.2, 0.46, PAL.stoneMid, { x: chx, y: (chTop + base + h - 0.2) / 2, z: chz }));
  parts.push(box(0.56, 0.14, 0.56, PAL.stoneDark, { x: chx, y: chTop, z: chz }));

  // door, step, windows with shutters and flower boxes
  const doorX = spec.doorX ?? (rand.next() - 0.5) * (w - 1.6) * 0.6;
  parts.push(box(0.78, 1.32, 0.08, PAL.door, { x: doorX, y: base + 0.66, z: d / 2 + 0.04 }));
  parts.push(box(0.92, 0.1, 0.1, PAL.timberDark, { x: doorX, y: base + 1.37, z: d / 2 + 0.06 }));
  parts.push(box(0.04, 0.08, 0.05, PAL.gold, { x: doorX + 0.26, y: base + 0.66, z: d / 2 + 0.1 }));
  parts.push(box(0.95, 0.12, 0.42, PAL.stoneMid, { x: doorX, y: base - 0.04, z: d / 2 + 0.24 }));
  const shutter = rand.pick(['#4f7fae', '#5f8f4a', '#b5523d', '#7a5a9a']);
  const winX = [];
  for (const x of [-w / 2 + 0.55, w / 2 - 0.55]) if (Math.abs(x - doorX) > 0.85) winX.push(x);
  for (const x of winX) {
    parts.push(box(0.62, 0.56, 0.06, PAL.timber, { x, y: base + h * 0.6, z: d / 2 + 0.03 }));
    glow.push(box(0.46, 0.4, 0.05, '#ffffff', { x, y: base + h * 0.6, z: d / 2 + 0.05 }));
    parts.push(box(0.04, 0.4, 0.06, PAL.timber, { x, y: base + h * 0.6, z: d / 2 + 0.07 }));
    for (const s of [-1, 1]) parts.push(box(0.22, 0.48, 0.04, shutter, { x: x + s * 0.4, y: base + h * 0.6, z: d / 2 + 0.06 }));
    if (rand.next() < 0.7) {
      parts.push(box(0.6, 0.12, 0.16, PAL.wood, { x, y: base + h * 0.6 - 0.34, z: d / 2 + 0.11 }));
      for (let k = 0; k < 4; k++) parts.push(ico(0.06, 0, rand.pick(['#e8574a', '#f2cf55', '#f7f3ea', '#d971a8']), { x: x - 0.22 + k * 0.15, y: base + h * 0.6 - 0.24, z: d / 2 + 0.12 }));
    }
  }
  for (const sx of [-1, 1]) {
    parts.push(box(0.06, 0.52, 0.58, PAL.timber, { x: sx * (w / 2 + 0.03), y: base + h * 0.6, z: 0.15 }));
    glow.push(box(0.05, 0.38, 0.42, '#ffffff', { x: sx * (w / 2 + 0.05), y: base + h * 0.6, z: 0.15 }));
  }
  return { parts, glow, chimney: [chx, chTop + 0.25, chz] };
}

function fence(points, closed, rand, { height = 0.75, spacing = 1.1, color = PAL.wood, skip = [] } = {}) {
  const parts = [];
  const pts = points.map(([x, z]) => [x, groundHeight(x, z), z]);
  const n = closed ? pts.length : pts.length - 1;
  for (let i = 0; i < n; i++) {
    if (skip.includes(i)) continue;
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    const len = Math.hypot(b[0] - a[0], b[2] - a[2]);
    const steps = Math.max(1, Math.round(len / spacing));
    for (let k = 0; k <= steps; k++) {
      const u = k / steps;
      const x = a[0] + (b[0] - a[0]) * u;
      const z = a[2] + (b[2] - a[2]) * u;
      const y = groundHeight(x, z);
      parts.push(box(0.11, height + 0.25, 0.11, PAL.woodDark, { x, y: y + (height + 0.25) / 2 - 0.2, z, ry: rand.next() * 0.4 }));
    }
    for (const fy of [height * 0.45, height * 0.85]) {
      parts.push(beam([a[0], a[1] + fy, a[2]], [b[0], b[1] + fy, b[2]], 0.06, 0.08, color));
    }
  }
  return parts;
}

function circlePoints(cx, cz, r, n, start = 0) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = start + (i / n) * TAU;
    pts.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r]);
  }
  return pts;
}

function marketStall(rand, ry) {
  const parts = [];
  const W = 1.8;
  const D = 0.9;
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) parts.push(box(0.09, sz > 0 ? 1.55 : 1.85, 0.09, PAL.timber, { x: (sx * W) / 2, y: sz > 0 ? 0.78 : 0.92, z: (sz * D) / 2 }));
  parts.push(box(W, 0.12, D, PAL.wood, { y: 0.8 }));
  parts.push(box(W - 0.1, 0.65, 0.06, PAL.woodDark, { y: 0.45, z: D / 2 - 0.05 }));
  const stripes = 6;
  const pitch = 0.32;
  for (let k = 0; k < stripes; k++) {
    const x = -W / 2 - 0.1 + ((k + 0.5) * (W + 0.2)) / stripes;
    parts.push(box((W + 0.2) / stripes, 0.04, D + 0.5, k % 2 ? '#f7efe0' : rand.pick(['#c8453a', '#3f6fb5', '#4f8a3a']), { x, y: 1.72, z: 0.05, rx: pitch }));
  }
  const goods = rand.next() < 0.5 ? ['#d8453a', '#e86a3a', '#9cc24a'] : ['#c98a3e', '#e2b265', '#f2cf55'];
  for (let k = 0; k < 9; k++) {
    const x = -W / 2 + 0.25 + (k % 5) * 0.32;
    const z = -0.15 + Math.floor(k / 5) * 0.3;
    const c = goods[k % goods.length];
    if (goods[0] === '#c98a3e') parts.push(sphere(0.13, 6, 4, c, { x, y: 0.92, z, sx: 1.5, sy: 0.7 }));
    else for (let m = 0; m < 3; m++) parts.push(ico(0.07, 0, c, { x: x + (m - 1) * 0.08, y: 0.92 + (m === 1 ? 0.06 : 0), z }));
  }
  parts.push(cyl(0.16, 0.2, 0.3, 7, PAL.woodLight, { x: W / 2 + 0.35, y: 0.15, z: 0.3 }));
  return place(parts, { ry });
}

function bakeryOven() {
  const parts = [
    box(1.6, 0.5, 1.5, PAL.stoneDark, { y: 0.25 }),
    sphere(0.82, 8, 5, '#b8613f', { y: 0.5 }, { thetaLength: Math.PI / 2 }),
    box(0.55, 0.45, 0.2, '#3a2420', { y: 0.72, z: 0.72 }),
    box(0.3, 0.7, 0.3, '#a5553a', { y: 1.45, z: -0.25 }),
  ];
  return parts;
}

function maypole(rand) {
  const parts = [cyl(0.07, 0.09, 3.7, 6, '#efe2c4', { y: 1.85 }), torus(0.32, 0.08, 4, 10, TAU, '#5f9e3c', { y: 3.45, rx: Math.PI / 2 })];
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * TAU;
    parts.push(ico(0.07, 0, rand.pick(['#e8574a', '#f2cf55', '#f7f3ea', '#d971a8']), { x: Math.cos(a) * 0.34, y: 3.5, z: Math.sin(a) * 0.34 }));
  }
  const ribbons = ['#e8574a', '#3f6fb5', '#f2cf55', '#4f8a3a', '#d971a8', '#f7f3ea'];
  ribbons.forEach((c, k) => {
    const a = (k / ribbons.length) * TAU + 0.3;
    parts.push(beam([0, 3.5, 0], [Math.cos(a) * 1.05, 0.15, Math.sin(a) * 1.05], 0.05, 0.015, c));
  });
  parts.push(cone(0.12, 0.3, 6, PAL.gold, { y: 3.85 }));
  return parts;
}

function lampPost() {
  return [
    cyl(0.06, 0.08, 2.3, 6, PAL.timberDark, { y: 1.15 }),
    box(0.55, 0.06, 0.06, PAL.timberDark, { x: 0.25, y: 2.25 }),
    box(0.26, 0.05, 0.26, PAL.iron, { x: 0.45, y: 2.05 }),
    cone(0.2, 0.18, 4, PAL.iron, { x: 0.45, y: 2.36, ry: Math.PI / 4 }),
  ];
}

function haystack(r, h) {
  return [cyl(r * 0.75, r, h * 0.6, 8, PAL.thatch, { y: h * 0.3 }, { wobble: 0.04 }), cone(r * 0.75, h * 0.55, 8, PAL.thatchDark, { y: h * 0.6 + h * 0.27 }, { wobble: 0.04 })];
}

function barrel(color = PAL.wood) {
  return [cyl(0.28, 0.25, 0.7, 8, color, { y: 0.35 }), cyl(0.29, 0.29, 0.05, 8, PAL.iron, { y: 0.2 }), cyl(0.29, 0.29, 0.05, 8, PAL.iron, { y: 0.52 })];
}

function bench() {
  return [box(1.3, 0.08, 0.34, PAL.wood, { y: 0.42 }), box(0.08, 0.42, 0.3, PAL.woodDark, { x: -0.5, y: 0.21 }), box(0.08, 0.42, 0.3, PAL.woodDark, { x: 0.5, y: 0.21 })];
}

function cart() {
  return [
    box(1.5, 0.1, 0.9, PAL.wood, { y: 0.55 }),
    box(1.5, 0.32, 0.06, PAL.woodDark, { y: 0.76, z: 0.45 }),
    box(1.5, 0.32, 0.06, PAL.woodDark, { y: 0.76, z: -0.45 }),
    box(0.06, 0.32, 0.9, PAL.woodDark, { x: 0.72, y: 0.76 }),
    cyl(0.36, 0.36, 0.07, 9, PAL.woodDark, { y: 0.36, z: 0.5, rx: Math.PI / 2 }),
    cyl(0.36, 0.36, 0.07, 9, PAL.woodDark, { y: 0.36, z: -0.5, rx: Math.PI / 2 }),
    beam([-0.75, 0.55, 0.25], [-1.8, 0.15, 0.25], 0.06, 0.06, PAL.woodDark),
    beam([-0.75, 0.55, -0.25], [-1.8, 0.15, -0.25], 0.06, 0.06, PAL.woodDark),
    ...[0, 1, 2].map((k) => cyl(0.15, 0.15, 0.6, 6, '#e3cfa0', { x: -0.4 + k * 0.4, y: 0.8, rz: Math.PI / 2 })),
  ];
}

function signpost() {
  return [cyl(0.05, 0.06, 1.8, 5, PAL.timber, { y: 0.9 }), box(0.7, 0.18, 0.05, PAL.woodLight, { x: 0.25, y: 1.55, ry: 0.2 }), box(0.6, 0.18, 0.05, PAL.woodLight, { x: -0.2, y: 1.25, ry: 2.6 })];
}

function bridge(len, width) {
  const parts = [];
  const planks = Math.round(len / 0.32);
  for (let k = 0; k < planks; k++) {
    const x = -len / 2 + (k + 0.5) * (len / planks);
    const arch = 0.25 * Math.cos((x / len) * Math.PI);
    parts.push(box(len / planks - 0.03, 0.08, width, k % 2 ? PAL.wood : PAL.woodLight, { x, y: arch, rz: -0.35 * Math.sin((x / len) * Math.PI) * 0.6 }));
  }
  for (const s of [-1, 1]) {
    parts.push(beam([-len / 2, 0.55, (s * width) / 2], [0, 0.82, (s * width) / 2], 0.07, 0.07, PAL.woodDark));
    parts.push(beam([0, 0.82, (s * width) / 2], [len / 2, 0.55, (s * width) / 2], 0.07, 0.07, PAL.woodDark));
    for (const x of [-len / 2, 0, len / 2]) parts.push(box(0.09, 0.8, 0.09, PAL.woodDark, { x, y: 0.4 + (x === 0 ? 0.25 : 0), z: (s * width) / 2 }));
  }
  return parts;
}

function scarecrow() {
  return [
    cyl(0.04, 0.05, 1.9, 5, PAL.timber, { y: 0.95 }),
    beam([-0.55, 1.35, 0], [0.55, 1.35, 0], 0.06, 0.06, PAL.timber),
    box(0.42, 0.55, 0.24, '#8a5a9a', { y: 1.25 }),
    beam([-0.2, 1.4, 0], [-0.6, 1.3, 0], 0.13, 0.13, '#8a5a9a'),
    beam([0.2, 1.4, 0], [0.6, 1.3, 0], 0.13, 0.13, '#8a5a9a'),
    ico(0.17, 1, '#e8d8a8', { y: 1.72 }),
    cyl(0.32, 0.32, 0.04, 8, PAL.thatch, { y: 1.85 }),
    cone(0.18, 0.25, 8, PAL.thatch, { y: 1.97 }),
    ...[-1, 1].map((s) => cone(0.05, 0.18, 4, PAL.thatch, { x: s * 0.65, y: 1.3, rz: s * Math.PI / 2 })),
  ];
}

export function createVillage(ctx) {
  const rand = rng(31337);
  const anchors = { chimneys: [], lanterns: [], ovens: [] };
  const solid = ctx.buckets.solid;

  // Houses
  for (const spec of HOUSES) {
    const { parts, glow, chimney } = cottage(spec, rand);
    const ry = Math.atan2(spec.face[0] - spec.x, spec.face[1] - spec.z);
    const y = groundHeight(spec.x, spec.z);
    const t = { x: spec.x, y, z: spec.z, ry };
    solid.add(place(parts, t));
    ctx.buckets.glow.add(place(glow, t));
    const c = new THREE.Vector3(...chimney).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry);
    anchors.chimneys.push({ x: spec.x + c.x, y: y + c.y, z: spec.z + c.z, size: 0.8 });
    spec.ry = ry;
    spec.y = y;
    if (spec.id === 'bakery') {
      // a domed bread oven beside the bakery
      const ox = spec.x + Math.cos(ry) * (spec.w / 2 + 1.25) + Math.sin(ry) * 0.4;
      const oz = spec.z - Math.sin(ry) * (spec.w / 2 + 1.25) + Math.cos(ry) * 0.4;
      const oy = groundHeight(ox, oz);
      solid.add(place(bakeryOven(), { x: ox, y: oy, z: oz, ry }));
      anchors.ovens.push({ x: ox + Math.sin(ry) * 0.83, y: oy + 0.72, z: oz + Math.cos(ry) * 0.83, ry });
      anchors.chimneys.push({ x: ox - Math.sin(ry) * 0.25, y: oy + 1.9, z: oz - Math.cos(ry) * 0.25, size: 0.65 });
      anchors.bakeryDoor = { x: spec.x + Math.sin(ry) * (spec.d / 2 + 0.7), z: spec.z + Math.cos(ry) * (spec.d / 2 + 0.7), ry };
    }
  }

  // Market stalls
  for (const m of MARKET) solid.add(place(marketStall(rand, 0), { x: m.x, y: groundHeight(m.x, m.z), z: m.z, ry: m.ry }));

  // Maypole on the village green
  solid.add(place(maypole(rand), { x: MAYPOLE.x, y: groundHeight(MAYPOLE.x, MAYPOLE.z), z: MAYPOLE.z }));

  // Lamp posts around the square
  for (const a of [0.4, 2.2, 3.9, 5.3]) {
    const x = SQUARE.x + Math.cos(a) * (SQUARE.r + 0.3);
    const z = SQUARE.z + Math.sin(a) * (SQUARE.r + 0.3);
    const y = groundHeight(x, z);
    const ry = Math.atan2(SQUARE.x - x, SQUARE.z - z) - Math.PI / 2;
    solid.add(place(lampPost(), { x, y, z, ry }));
    const lx = x + Math.cos(-ry) * 0.45;
    const lz = z + Math.sin(-ry) * 0.45;
    ctx.buckets.glow.add(box(0.18, 0.22, 0.18, '#fff', { x: lx, y: y + 2.18, z: lz }));
    anchors.lanterns.push({ x: lx, y: y + 2.18, z: lz });
  }

  // Pig pen: fence, shelter, trough and a glossy mud wallow
  const pen = circlePoints(PIGPEN.x, PIGPEN.z, PIGPEN.r, 11, 0.2);
  solid.add(fence(pen, true, rand, { skip: [6] }));
  const shed = [box(1.6, 0.08, 1.2, PAL.thatch, { y: 1.2, rx: 0.25 }), ...[-1, 1].flatMap((s) => [box(0.08, 1.25, 0.08, PAL.timber, { x: s * 0.7, y: 0.62, z: -0.5 }), box(0.08, 0.95, 0.08, PAL.timber, { x: s * 0.7, y: 0.48, z: 0.5 })]), box(1.5, 0.6, 0.06, PAL.woodDark, { y: 0.35, z: -0.55 })];
  solid.add(place(shed, { x: PIGPEN.x + 1.6, y: groundHeight(PIGPEN.x + 1.6, PIGPEN.z + 1.7), z: PIGPEN.z + 1.7, ry: -2.4 }));
  solid.add(place([box(1.0, 0.25, 0.35, PAL.woodDark, { y: 0.12 }), box(0.9, 0.04, 0.25, '#c9a56b', { y: 0.24 })], { x: PIGPEN.x - 1.9, y: groundHeight(PIGPEN.x - 1.9, PIGPEN.z - 1.2), z: PIGPEN.z - 1.2, ry: 0.9 }));
  const mudPts = [];
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * TAU;
    const r = 1.55 + 0.25 * noise2(Math.cos(a) * 2, Math.sin(a) * 2, 4);
    mudPts.push([Math.cos(a) * r * 1.15, Math.sin(a) * r]);
  }
  const mudCenter = { x: PIGPEN.x - 0.5, z: PIGPEN.z + 0.1 };
  const mud = new THREE.Mesh(polygon(mudPts, '#ffffff', { x: mudCenter.x, y: groundHeight(mudCenter.x, mudCenter.z) + 0.035, z: mudCenter.z }), ctx.materials.mud);
  mud.receiveShadow = true;
  mud.name = 'mud';
  ctx.scene.add(mud);
  anchors.mud = mudCenter;

  // Chicken coop and yard
  const yard = circlePoints(CHICKEN_YARD.x, CHICKEN_YARD.z, CHICKEN_YARD.r, 12, 0.5);
  solid.add(fence(yard, true, rand, { height: 0.55, spacing: 0.8, skip: [8] }));
  const coop = [
    ...[-1, 1].flatMap((sx) => [-1, 1].map((sz) => box(0.09, 0.6, 0.09, PAL.timber, { x: sx * 0.55, y: 0.3, z: sz * 0.42 }))),
    box(1.3, 0.75, 1.0, '#c98d5a', { y: 0.95 }),
    box(1.5, 0.08, 0.7, PAL.terracotta, { y: 1.5, z: 0.28, rx: 0.5 }),
    box(1.5, 0.08, 0.7, PAL.terracottaDark, { y: 1.5, z: -0.28, rx: -0.5 }),
    box(0.3, 0.34, 0.05, '#3a2a20', { y: 0.82, z: 0.51 }),
    beam([0, 0.62, 0.52], [0, 0.02, 1.3], 0.3, 0.04, PAL.woodLight),
    ...haystack(0.35, 0.45).map((g) => place([g], { x: 0.9, z: 0.6 })[0]),
  ];
  solid.add(place(coop, { x: CHICKEN_YARD.x - 1.6, y: groundHeight(CHICKEN_YARD.x - 1.6, CHICKEN_YARD.z + 1.9), z: CHICKEN_YARD.z + 1.9, ry: 2.6 }));

  // Cow pasture
  const pasture = circlePoints(PASTURE.x, PASTURE.z, PASTURE.r, 12, 0.3).map(([x, z], i) => [x + (i % 2) * 0.3, z]);
  solid.add(fence(pasture, true, rand, { skip: [2] }));
  const feeder = [box(1.4, 0.12, 0.5, PAL.woodDark, { y: 0.5 }), box(1.3, 0.35, 0.4, PAL.thatch, { y: 0.72 }, { wobble: 0.04 }), ...[-0.6, 0.6].map((x) => box(0.08, 0.5, 0.45, PAL.timber, { x, y: 0.25 }))];
  solid.add(place(feeder, { x: PASTURE.x + 1.5, y: groundHeight(PASTURE.x + 1.5, PASTURE.z - 2.6), z: PASTURE.z - 2.6, ry: 0.4 }));
  solid.add(place([box(1.2, 0.35, 0.45, PAL.woodDark, { y: 0.17 }), box(1.1, 0.04, 0.36, PAL.water, { y: 0.3 })], { x: PASTURE.x - 2.4, y: groundHeight(PASTURE.x - 2.4, PASTURE.z + 1.4), z: PASTURE.z + 1.4, ry: 1.2 }));

  // Fisherman's dock on the pond
  const dock = [];
  const plankN = 8;
  for (let k = 0; k < plankN; k++) dock.push(box(DOCK.len / plankN - 0.03, 0.07, 1.0, k % 2 ? PAL.wood : PAL.woodLight, { x: -k * (DOCK.len / plankN), y: 0.12 }));
  for (const x of [0, -DOCK.len * 0.5, -DOCK.len + 0.2]) for (const s of [-1, 1]) dock.push(box(0.1, 0.8, 0.1, PAL.woodDark, { x, y: -0.25, z: s * 0.42 }));
  solid.add(place(dock, { x: DOCK.x, y: POND.level, z: DOCK.z }));
  DOCK.y = POND.level + 0.16;
  DOCK.endX = DOCK.x - DOCK.len + 0.25;
  solid.add(place([box(0.5, 0.35, 0.35, PAL.wood, { y: 0.18 }), cyl(0.16, 0.14, 0.3, 7, '#8a7a6a', { x: 0.45, y: 0.15 })], { x: DOCK.x + 0.5, y: groundHeight(DOCK.x + 0.5, DOCK.z + 0.8), z: DOCK.z + 0.8, ry: 0.3 }));

  // Bridge over the east stream
  solid.add(place(bridge(2.8, 1.2), { x: 20.25, y: 0.02, z: -2.0, ry: Math.atan2(-(-3.5 - 1.6), 21.5 - 19.0) }));

  // Props scattered around the village
  const props = [
    [haystack(0.7, 1.4), 19.6, 13.6, 0],
    [haystack(0.55, 1.1), 20.6, 12.8, 0],
    [cart(), -7.8, 12.6, 0.6],
    [barrel(), -4.4, 17.3, 0],
    [barrel(), -4.0, 17.8, 0],
    [barrel(PAL.woodLight), 9.0, 17.8, 0],
    [bench(), -1.6, 17.6, 0.15],
    [bench(), 6.2, 24.6, -2.6],
    [signpost(), 6.8, 22.9, 0.8],
    [signpost(), -4.6, 20.4, -0.6],
    [cart(), 13.6, 20.5, 2.2],
    [barrel(), 12.8, 14.3, 0],
    [scarecrow(), 21.2, -7.6, -0.4],
  ];
  for (const [list, x, z, ry] of props) solid.add(place(list, { x, y: groundHeight(x, z), z, ry }));
  for (const [x, z, s] of [[-3.8, 17.2, 0.5], [9.6, 17.2, 0.45], [10.1, 17.6, 0.38], [13.2, 13.9, 0.5]]) solid.add(box(s, s, s, PAL.woodLight, { x, y: groundHeight(x, z) + s / 2, z, ry: x }));

  return anchors;
}
