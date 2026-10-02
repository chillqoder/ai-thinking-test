// Floating island terrain: grassy top (height field) + craggy rock underside.
import * as THREE from 'three';
import { clamp, smooth, range, rng, TAU } from '../core/util.js';
import {
  ISLAND_R, CASTLE, PLATEAU_Y, PLATEAU_R, HILL_R, POND, PATHS, SQUARE, WALL, WOODCUT, MUD, STREAM,
} from './layout.js';

/** Island outline radius at angle theta (radians, atan2(z, x)). Integer harmonics → closed curve. */
export function edgeRadius(theta) {
  return (
    ISLAND_R +
    3.2 * Math.sin(3 * theta + 0.5) +
    2.1 * Math.sin(5 * theta + 1.3) +
    1.1 * Math.sin(9 * theta + 2.0)
  );
}

function segDist(px, pz, ax, az, bx, bz) {
  const dx = bx - ax;
  const dz = bz - az;
  const f = clamp(((px - ax) * dx + (pz - az) * dz) / (dx * dx + dz * dz));
  return Math.hypot(px - (ax + dx * f), pz - (az + dz * f));
}

/** 0..1 dirt-path coverage at (x, z). */
export function pathAmount(x, z) {
  let best = 0;
  for (const p of PATHS) {
    for (let i = 0; i < p.pts.length - 1; i++) {
      const [ax, az] = p.pts[i];
      const [bx, bz] = p.pts[i + 1];
      const d = segDist(x, z, ax, az, bx, bz);
      const a = 1 - smooth(range(d, p.w * 0.5 - 0.25, p.w * 0.5 + 0.35));
      if (a > best) best = a;
    }
  }
  const ds = Math.hypot(x - SQUARE.x, z - SQUARE.z);
  best = Math.max(best, 1 - smooth(range(ds, SQUARE.r - 1.2, SQUARE.r + 0.4)));
  const dw = Math.hypot(x - WOODCUT.x, z - WOODCUT.z - 0.8);
  best = Math.max(best, 0.85 * (1 - smooth(range(dw, 1.6, 3))));
  return best;
}

export function streamDist(x, z) {
  let d = Infinity;
  for (let i = 0; i < STREAM.length - 1; i++) {
    d = Math.min(d, segDist(x, z, ...STREAM[i], ...STREAM[i + 1]));
  }
  return d;
}

/** Ground height at (x, z). Cheap enough to call every frame for every walker. */
export function getHeight(x, z) {
  const dc = Math.hypot(x - CASTLE.x, z - CASTLE.z);
  const hill = PLATEAU_Y * (1 - smooth(range(dc, PLATEAU_R, HILL_R)));
  const rough = smooth(range(dc, PLATEAU_R, PLATEAU_R + 6));
  const n =
    0.32 * Math.sin(x * 0.21 + z * 0.13) +
    0.22 * Math.sin(x * 0.07 - z * 0.17 + 1.3) +
    0.12 * Math.sin(x * 0.45 + z * 0.39 + 0.7);
  // keep the village square and mud flat-ish
  const ds = Math.hypot(x - SQUARE.x, z - SQUARE.z);
  const flat = 0.35 + 0.65 * smooth(range(ds, 6, 14));
  const dp = Math.hypot(x - POND.x, z - POND.z);
  const pond = -1.4 * (1 - smooth(range(dp, POND.r - 2, POND.r + 0.8)));
  const dm = Math.hypot(x - MUD.x, z - MUD.z);
  const mud = -0.12 * (1 - smooth(range(dm, MUD.r - 0.5, MUD.r + 0.5)));
  const stream = -0.35 * (1 - smooth(range(streamDist(x, z), 0.6, 1.6))) * smooth(range(dp, POND.r - 1, POND.r + 2));
  const r = Math.hypot(x, z);
  const er = edgeRadius(Math.atan2(z, x));
  const rim = -1.0 * smooth(range(r / er, 0.93, 1.0));
  return hill + n * rough * flat + pond + mud + stream + rim;
}

const C = {
  grassA: new THREE.Color('#86c34f'),
  grassB: new THREE.Color('#6aab3e'),
  grassDark: new THREE.Color('#5b9437'),
  dirt: new THREE.Color('#c9a26a'),
  court: new THREE.Color('#bfb29a'),
  sand: new THREE.Color('#d8c48f'),
  soil: new THREE.Color('#6b4a30'),
  rockA: new THREE.Color('#9a8670'),
  rockB: new THREE.Color('#7a6b5c'),
  rockC: new THREE.Color('#b19b7e'),
  rockDark: new THREE.Color('#5a4f47'),
  moss: new THREE.Color('#6f8a45'),
};

const SEGS = 192;
const RINGS = 72;

export function buildTerrain() {
  const out = new THREE.Group();
  const rand = rng(7);

  // ---------- top ----------
  const pos = [];
  const col = [];
  const tmp = new THREE.Color();
  const edgeY = new Float32Array(SEGS);
  const edgeXZ = [];
  for (let k = 0; k <= RINGS; k++) {
    const f = Math.pow(k / RINGS, 0.85);
    for (let i = 0; i < SEGS; i++) {
      const th = (i / SEGS) * TAU;
      const er = edgeRadius(th);
      const x = Math.cos(th) * er * f;
      const z = Math.sin(th) * er * f;
      const y = getHeight(x, z);
      pos.push(x, y, z);
      if (k === RINGS) {
        edgeY[i] = y;
        edgeXZ.push([x, z]);
      }

      // colour
      const g = 0.5 + 0.5 * Math.sin(x * 0.31 + z * 0.17) * Math.sin(x * 0.11 - z * 0.27 + 2);
      tmp.copy(C.grassA).lerp(C.grassB, g);
      const dc = Math.hypot(x - CASTLE.x, z - CASTLE.z);
      if (dc > PLATEAU_R && dc < HILL_R) tmp.lerp(C.grassDark, 0.25 * Math.sin(((dc - PLATEAU_R) / (HILL_R - PLATEAU_R)) * Math.PI));
      tmp.lerp(C.grassDark, smooth(range(f, 0.82, 1)) * 0.6);
      const insideWalls =
        Math.abs(x - CASTLE.x) < WALL.half - 0.4 && Math.abs(z - CASTLE.z) < WALL.half - 0.4 ? 1 : 0;
      tmp.lerp(C.court, insideWalls * 0.9);
      const dp = Math.hypot(x - POND.x, z - POND.z);
      tmp.lerp(C.sand, 1 - smooth(range(dp, POND.r - 0.5, POND.r + 1.4)));
      tmp.lerp(C.sand, 0.8 * (1 - smooth(range(streamDist(x, z), 0.9, 1.8))) * smooth(range(dp, POND.r, POND.r + 2)));
      tmp.lerp(C.dirt, pathAmount(x, z));
      // slight speckle so the low-poly facets read
      const sp = (rand() - 0.5) * 0.04;
      col.push(tmp.r + sp, tmp.g + sp, tmp.b + sp * 0.5);
    }
  }
  const idx = [];
  for (let k = 0; k < RINGS; k++) {
    for (let i = 0; i < SEGS; i++) {
      const a = k * SEGS + i;
      const b = k * SEGS + ((i + 1) % SEGS);
      const c = (k + 1) * SEGS + i;
      const d = (k + 1) * SEGS + ((i + 1) % SEGS);
      idx.push(a, b, c, b, d, c);
    }
  }
  const topGeo = new THREE.BufferGeometry();
  topGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  topGeo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  topGeo.setIndex(idx);
  topGeo.computeVertexNormals();
  const top = new THREE.Mesh(
    topGeo,
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, flatShading: true })
  );
  top.receiveShadow = true;
  top.castShadow = true;
  out.add(top);

  // ---------- underside ----------
  const UR = 15;
  const upos = [];
  const ucol = [];
  const tip = new THREE.Vector3(3, -40, -2);
  for (let k = 0; k <= UR; k++) {
    for (let i = 0; i < SEGS; i++) {
      const th = (i / SEGS) * TAU;
      const [ex, ez] = edgeXZ[i];
      let x, y, z;
      if (k === 0) {
        x = ex;
        z = ez;
        y = edgeY[i];
      } else if (k === UR) {
        x = tip.x;
        y = tip.y;
        z = tip.z;
      } else {
        const f = (k - 1) / (UR - 1);
        const crag =
          1 +
          0.07 * Math.sin(7 * th + k * 1.7) +
          0.05 * Math.sin(13 * th + k * 0.9) +
          (rand() - 0.5) * 0.06;
        const shrink = k === 1 ? 1.01 : Math.pow(1 - f, 1.05) * crag;
        x = tip.x * f + ex * shrink * (1 - f * 0.15);
        z = tip.z * f + ez * shrink * (1 - f * 0.15);
        y = k === 1 ? edgeY[i] - 1.6 : -2 - 36 * Math.pow(f, 1.25) + (rand() - 0.5) * 1.6;
      }
      upos.push(x, y, z);
      // colour bands
      if (k <= 1) tmp.copy(C.soil);
      else {
        const band = 0.5 + 0.5 * Math.sin(y * 0.55 + Math.sin(th * 5) * 0.8);
        tmp.copy(C.rockA).lerp(C.rockB, band);
        if (Math.sin(y * 1.3 + th * 9) > 0.7) tmp.lerp(C.rockC, 0.6);
        tmp.lerp(C.rockDark, smooth(range(-y, 18, 40)) * 0.75);
        if (k === 2 && Math.sin(th * 11) > 0.2) tmp.lerp(C.moss, 0.6);
      }
      const sp = (rand() - 0.5) * 0.05;
      ucol.push(tmp.r + sp, tmp.g + sp, tmp.b + sp);
    }
  }
  const uidx = [];
  for (let k = 0; k < UR; k++) {
    for (let i = 0; i < SEGS; i++) {
      const a = k * SEGS + i;
      const b = k * SEGS + ((i + 1) % SEGS);
      const c = (k + 1) * SEGS + i;
      const d = (k + 1) * SEGS + ((i + 1) % SEGS);
      uidx.push(a, b, c, b, d, c);
    }
  }
  const uGeo = new THREE.BufferGeometry();
  uGeo.setAttribute('position', new THREE.Float32BufferAttribute(upos, 3));
  uGeo.setAttribute('color', new THREE.Float32BufferAttribute(ucol, 3));
  uGeo.setIndex(uidx);
  uGeo.computeVertexNormals();
  const under = new THREE.Mesh(
    uGeo,
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true })
  );
  under.castShadow = true;
  under.receiveShadow = true;
  out.add(under);

  return out;
}
