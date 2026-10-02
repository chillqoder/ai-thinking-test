import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { clamp, fbm2, noise2, rng, smoothstep, TAU, wave } from '../core/math.js';
import { cone, cyl, dodeca, ico } from '../core/geo.js';
import { LOOP } from '../config.js';
import { CASTLE, groundHeight, groundInfo, islandRadius, POND } from './layout.js';
import { PAL } from './palette.js';

const RINGS = 62;
const OUTER = 372;

const _c = new THREE.Color();
const _c2 = new THREE.Color();

/**
 * Stitches two concentric rings (angles increasing from 0) into triangles.
 * flip = false → faces point up (top surface); flip = true → outward/down (underside).
 */
function zip(inner, outer, emit, flip) {
  const ni = inner.length;
  const no = outer.length;
  const ang = (ring, idx) => ring[idx % ring.length].a + Math.floor(idx / ring.length) * TAU;
  let i = 0;
  let j = 0;
  while (i < ni || j < no) {
    const ai = i < ni ? ang(inner, i + 1) : Infinity;
    const ao = j < no ? ang(outer, j + 1) : Infinity;
    const I = inner[i % ni];
    const O = outer[j % no];
    if (ao <= ai) {
      const O2 = outer[(j + 1) % no];
      if (flip) emit(I, O, O2);
      else emit(I, O2, O);
      j++;
    } else {
      const I2 = inner[(i + 1) % ni];
      if (flip) emit(I, O, I2);
      else emit(I, I2, O);
      i++;
    }
  }
}

function toGeometry(pos) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.computeVertexNormals();
  return geo;
}

function setFaceColor(colors, i, k) {
  for (let j = 0; j < 3; j++) {
    colors[(i + j) * 3] = _c.r * k;
    colors[(i + j) * 3 + 1] = _c.g * k;
    colors[(i + j) * 3 + 2] = _c.b * k;
  }
}

/** The grassy top of the island: a jittered polar mesh with one colour per face. */
function buildTop() {
  const rand = rng(42);
  const rings = [[{ x: 0, z: 0, a: 0 }]];
  for (let k = 1; k <= RINGS; k++) {
    const n = k === RINGS ? OUTER : Math.max(6, Math.round((OUTER * k) / RINGS));
    const ring = [];
    for (let j = 0; j < n; j++) {
      let a = (j / n) * TAU;
      let f = k / RINGS;
      if (k < RINGS && j > 0) {
        a += (rand.next() - 0.5) * 0.7 * (TAU / n);
        f += ((rand.next() - 0.5) * 0.6) / RINGS;
      }
      const R = islandRadius(a);
      ring.push({ x: Math.cos(a) * R * f, z: Math.sin(a) * R * f, a });
    }
    rings.push(ring);
  }
  for (const ring of rings) for (const p of ring) p.y = groundHeight(p.x, p.z);

  const pos = [];
  const tri = (p, q, r) => pos.push(p.x, p.y, p.z, q.x, q.y, q.z, r.x, r.y, r.z);
  const centre = rings[0][0];
  const first = rings[1];
  for (let j = 0; j < first.length; j++) tri(centre, first[(j + 1) % first.length], first[j]);
  for (let k = 1; k < RINGS; k++) zip(rings[k], rings[k + 1], tri, false);

  const geo = toGeometry(pos);
  colorTop(geo);
  return { geo, rim: rings[RINGS] };
}

function colorTop(geo) {
  const pos = geo.attributes.position;
  const nor = geo.attributes.normal;
  const colors = new Float32Array(pos.count * 3);
  const info = {};
  const rand = rng(7);
  for (let i = 0; i < pos.count; i += 3) {
    const x = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3;
    const y = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3;
    const z = (pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3;
    const steep = 1 - nor.getY(i);
    groundInfo(x, z, info);
    const n = fbm2(x * 0.09, z * 0.09, 2, 5);
    const spot = noise2(x * 0.35, z * 0.35, 11);

    _c.set(PAL.grassA).lerp(_c2.set(PAL.grassB), smoothstep(-0.2, 0.4, n));
    if (spot > 0.45) _c.lerp(_c2.set(PAL.grassC), 0.5);
    const rr = Math.hypot(x, z);
    const R = islandRadius(Math.atan2(z, x));
    if (rr > R - 2.5) _c.lerp(_c2.set(PAL.grassDark), 0.35 * smoothstep(R - 2.5, R, rr));

    const castleD = Math.hypot(x - CASTLE.x, z - CASTLE.z);
    if (info.courtyard) {
      _c.set(PAL.courtyard).lerp(_c2.set(PAL.cobbleDark), (spot + 1) * 0.25);
    } else if (steep > 0.3 && castleD < CASTLE.rampR + 1) {
      _c.set(PAL.rockLight).lerp(_c2.set(PAL.rock), smoothstep(0.3, 0.7, steep) * 0.8 + 0.2 * spot);
      if (info.path < 0.2) _c.lerp(_c2.set(PAL.dirt), 0.75);
    } else if (info.water < 0.35) {
      _c.set(y < POND.level - 0.05 ? PAL.underwater : PAL.sand);
    } else if (info.water < 1.1) {
      _c.lerp(_c2.set(PAL.sand), 0.75 * (1 - smoothstep(0.35, 1.1, info.water)));
    } else if (info.field) {
      const [lx] = info.fieldLocal;
      const row = Math.floor((lx + info.field.w / 2) / 0.9);
      _c.set(row % 2 ? PAL.soil : PAL.soilDark);
    } else if (info.pen < -0.2) {
      _c.set(PAL.dirtDark).lerp(_c2.set(PAL.mud), 0.4);
    } else if (info.yard < -0.2) {
      _c.set(PAL.dirt).lerp(_c2.set(PAL.grassB), 0.35 + 0.3 * spot);
    } else if (info.square < 0) {
      _c.set(PAL.cobble).lerp(_c2.set(PAL.cobbleDark), (spot + 1) * 0.35);
      if (info.square > -0.6) _c.lerp(_c2.set(PAL.dirt), 0.4);
    } else if (info.path < 0) {
      _c.set(PAL.dirt).lerp(_c2.set(PAL.dirtDark), (spot + 1) * 0.3);
    } else if (info.path < 0.5) {
      _c.lerp(_c2.set(PAL.dirt), 0.45);
    }
    setFaceColor(colors, i, 1 + (rand.next() - 0.5) * 0.07);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

function rockColor(y) {
  const d = clamp((-y - 3.2) / 22);
  return _c.set(PAL.rockLight).lerp(_c2.set(PAL.rock), smoothstep(0, 0.4, d)).lerp(_c2.set(PAL.rockDeep), smoothstep(0.35, 1, d));
}

/** Layered rocky underside: grass lip → earth band → warm rock fading darker with depth. */
function buildUnderside(rim) {
  const rand = rng(99);
  const rings = [rim];
  const profile = [
    { dy: -0.38, f: 1.004, n: OUTER },
    { dy: -1.05, f: 0.985, n: OUTER / 2 },
    { dy: -2.3, f: 0.94, n: OUTER / 4 },
    { y: -4.6, f: 0.86, n: 62 },
    { y: -7.4, f: 0.75, n: 54 },
    { y: -10.6, f: 0.61, n: 46 },
    { y: -14.0, f: 0.46, n: 38 },
    { y: -17.6, f: 0.32, n: 30 },
    { y: -21.0, f: 0.19, n: 20 },
    { y: -24.2, f: 0.08, n: 10 },
  ];
  profile.forEach((pr, idx) => {
    const ring = [];
    const depth = idx / profile.length;
    const absolute = pr.y !== undefined;
    const sx = absolute ? 2.6 * depth * depth : 0;
    const sz = absolute ? -1.8 * depth * depth : 0;
    for (let j = 0; j < pr.n; j++) {
      let a = (j / pr.n) * TAU;
      if (j > 0 && idx > 0) a += (rand.next() - 0.5) * 0.5 * (TAU / pr.n);
      const R = islandRadius(a);
      const lobe = 1 + depth * (0.16 * Math.sin(2 * a + 0.8) + 0.1 * Math.sin(3 * a + 2.4) + 0.07 * Math.sin(5 * a + 0.3));
      const jag = idx > 1 ? 1 + (rand.next() - 0.5) * 0.12 * (0.4 + depth) : 1;
      const f = pr.f * lobe * jag;
      const top = groundHeight(Math.cos(a) * R * 0.999, Math.sin(a) * R * 0.999);
      const y = absolute ? pr.y + (rand.next() - 0.5) * 1.6 * (0.5 + depth) : top + pr.dy + (idx > 1 ? (rand.next() - 0.5) * 0.4 : 0);
      ring.push({ x: Math.cos(a) * R * f + sx, y, z: Math.sin(a) * R * f + sz, a });
    }
    rings.push(ring);
  });
  const tip = { x: 2.6, y: -27.5, z: -1.8, a: 0 };

  const pos = [];
  const tri = (p, q, r) => pos.push(p.x, p.y, p.z, q.x, q.y, q.z, r.x, r.y, r.z);
  let grassBandVerts = 0;
  for (let k = 0; k < rings.length - 1; k++) {
    zip(rings[k + 1], rings[k], tri, true);
    if (k === 0) grassBandVerts = pos.length / 3;
  }
  const last = rings[rings.length - 1];
  for (let j = 0; j < last.length; j++) tri(tip, last[j], last[(j + 1) % last.length]);

  const geo = toGeometry(pos);
  const p = geo.attributes.position;
  const colors = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i += 3) {
    const y = (p.getY(i) + p.getY(i + 1) + p.getY(i + 2)) / 3;
    const x = (p.getX(i) + p.getX(i + 1) + p.getX(i + 2)) / 3;
    const z = (p.getZ(i) + p.getZ(i + 1) + p.getZ(i + 2)) / 3;
    const band = Math.sin(y * 1.7 + noise2(x * 0.2, z * 0.2) * 1.5);
    if (i < grassBandVerts) _c.set(PAL.grassSide);
    else if (y > -2.0) _c.set(PAL.earth);
    else if (y > -3.4) _c.set(PAL.earthDark).lerp(_c2.set(PAL.rock), 0.3);
    else {
      rockColor(y);
      if (band > 0.55) _c.multiplyScalar(0.9);
      if (band < -0.7) _c.lerp(_c2.set(PAL.earth), 0.25);
    }
    setFaceColor(colors, i, 1 + (rand.next() - 0.5) * 0.1);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geo;
}

function recolorByDepth(g, offsetY = 0) {
  const p = g.attributes.position;
  const col = g.attributes.color;
  for (let i = 0; i < p.count; i += 3) {
    const y = (p.getY(i) + p.getY(i + 1) + p.getY(i + 2)) / 3 + offsetY;
    rockColor(y);
    const k = 0.94 + 0.12 * (((i * 7919) % 13) / 13);
    for (let j = 0; j < 3; j++) col.setXYZ(i + j, _c.r * k, _c.g * k, _c.b * k);
  }
  return g;
}

/** Stalactite lumps and hanging roots for a more interesting silhouette. */
function buildUndersideDetails() {
  const rand = rng(5);
  const list = [];
  const lumps = [
    [10, -8, 3.6, 9, -6.5],
    [-12, 6, 3.2, 8, -6.0],
    [-6, -14, 3.0, 10, -9.0],
    [16, 12, 2.6, 7, -5.0],
    [-18, -6, 2.4, 6, -4.6],
    [4, 16, 2.8, 8, -7.0],
    [20, -4, 2.2, 6, -4.2],
  ];
  for (const [x, z, r, len, y] of lumps) {
    list.push(recolorByDepth(cone(r, len, 7, PAL.rock, { x, y: y - len / 2, z, rx: Math.PI }, { wobble: 0.45, seed: x * 3 + z })));
  }
  for (let i = 0; i < 80; i++) {
    const a = rand.next() * TAU;
    const R = islandRadius(a) * (0.99 - rand.next() * 0.015);
    const top = groundHeight(Math.cos(a) * R * 0.99, Math.sin(a) * R * 0.99) - 0.5;
    const len = 0.8 + rand.next() * 2.8;
    const color = rand.next() < 0.55 ? '#6b4a2e' : '#5d7d36';
    list.push(cyl(0.04, 0.012, len, 4, color, { x: Math.cos(a) * R, y: top - len / 2, z: Math.sin(a) * R, rz: (rand.next() - 0.5) * 0.3, rx: (rand.next() - 0.5) * 0.3 }));
  }
  return list;
}

/** A few small islets that float around the island, bobbing and slowly turning. */
function buildFloatingRocks(material) {
  const rand = rng(77);
  const group = new THREE.Group();
  const rocks = [];
  const spots = [
    [-0.45, 45, -3, 1.6], [0.5, 48, 2, 1.1], [1.25, 44, -7, 1.3], [1.95, 47, 4, 0.9], [2.65, 45, -1, 1.7],
    [3.25, 49, 6, 1.0], [3.95, 44, -9, 1.4], [4.65, 47, 1, 1.2], [5.3, 46, -5, 0.8], [5.95, 50, 3, 1.5],
  ];
  spots.forEach(([a, r, y, s], i) => {
    const parts = [
      recolorByDepth(dodeca(s, PAL.rock, { sy: 0.9 }, { wobble: s * 0.18, seed: i }), y),
      recolorByDepth(cone(s * 0.85, s * 2.2, 6, PAL.rockDark, { y: -s * 1.4, rx: Math.PI }, { wobble: s * 0.12, seed: i + 50 }), y),
      cyl(s * 0.95, s * 0.98, s * 0.25, 7, PAL.grassA, { y: s * 0.62 }, { wobble: s * 0.05, seed: i + 90 }),
    ];
    if (s > 1.2) parts.push(ico(s * 0.45, 0, PAL.leafB, { y: s * 1.05, x: s * 0.2 }, { wobble: 0.05, seed: i }));
    const mesh = new THREE.Mesh(mergeGeometries(parts, false), material);
    mesh.name = 'floating-rock';
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData = { a, r, y, phase: rand.next(), spin: i % 2 ? 1 : -1, bob: 0.35 + rand.next() * 0.35, cycles: 2 + (i % 3) };
    group.add(mesh);
    rocks.push(mesh);
  });
  const update = (t) => {
    for (const m of rocks) {
      const u = m.userData;
      m.position.set(Math.cos(u.a) * u.r, u.y + u.bob * wave(t, u.cycles, u.phase), Math.sin(u.a) * u.r);
      m.rotation.set(0.08 * wave(t, 1, u.phase + 0.25), (u.spin * TAU * t) / LOOP + u.phase * TAU, 0.06 * wave(t, 2, u.phase));
    }
  };
  return { group, update };
}

export function createTerrain(ctx) {
  const { geo: topGeo, rim } = buildTop();
  const top = new THREE.Mesh(topGeo, ctx.materials.solid);
  top.name = 'island-top';
  top.receiveShadow = true;
  top.castShadow = true;
  top.matrixAutoUpdate = false;

  const under = new THREE.Mesh(buildUnderside(rim), ctx.materials.solid);
  under.name = 'island-underside';
  under.castShadow = true;
  under.receiveShadow = true;
  under.matrixAutoUpdate = false;

  ctx.buckets.solid.add(buildUndersideDetails());

  const floating = buildFloatingRocks(ctx.materials.solid);
  ctx.scene.add(top, under, floating.group);
  return { update: floating.update, rim };
}
