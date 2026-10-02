import { clamp, fbm2, lerp, noise2, polylineDistance, smoothstep, TAU } from '../core/math.js';

// The island is laid out in world units (~1 unit = 1 m). +X = east, +Z = south.
// The castle sits on a hill north of the centre; the village spreads below its gate
// to the south, fields and a windmill lie east, a pond with a fisherman west, and a
// forest with a spring north. Three streams spill off the rim as waterfalls.

export function islandRadius(theta) {
  return 36 + 2.0 * Math.sin(3 * theta + 0.5) + 1.3 * Math.sin(5 * theta + 1.3) + 0.7 * Math.sin(9 * theta + 2.1);
}

export const CASTLE = {
  x: 0,
  z: -6,
  top: 5.2,
  plateauR: 10.4,
  slopeR: 15,
  rampR: 22,
  wallR: 8.3,
  wallH: 3.4,
  wallT: 1.3,
  towerR: 1.35,
  towerH: 6.6,
};

export const SQUARE = { x: 1, z: 21, r: 5.8 };
export const WELL = { x: -0.6, z: 21.4 };
export const TROUGH = { x: -0.6, z: 23.35, ry: 0 };
export const MAYPOLE = { x: 5.6, z: 20.6 };
export const WOODCUTTER = { x: -12.0, z: 20.6, ry: 2.35 };
export const SLEEPER_TREE = { x: -2.2, z: 29.6 };
export const PIGPEN = { x: 14.2, z: 24.6, r: 3.3 };
export const CHICKEN_YARD = { x: -13.2, z: 27.0, r: 3.6 };
export const POND = { x: -20.5, z: -0.5, r: 4.3, level: -0.22 };
export const SPRING = { x: 12.5, z: -24.2, r: 1.8, level: -0.18 };
export const PASTURE = { x: -19.5, z: -14.5, r: 5.0 };
export const WINDMILL = { x: 25.5, z: -13.2 };
export const FORGE = { x: 4.1, z: -4.4 };

export const HOUSES = [
  { id: 'bakery', x: -6.6, z: 15.4, w: 3.6, d: 3.0, h: 2.2, roof: 'tile', face: [1, 21] },
  { id: 'h2', x: -9.4, z: 22.8, w: 3.2, d: 2.8, h: 2.0, roof: 'thatch', face: [1, 21] },
  { id: 'h3', x: -5.6, z: 28.6, w: 3.0, d: 2.6, h: 1.9, roof: 'thatch', face: [1, 21] },
  { id: 'h4', x: 3.8, z: 29.4, w: 3.4, d: 2.8, h: 2.1, roof: 'tile', face: [1, 21] },
  { id: 'h5', x: 9.0, z: 28.4, w: 2.8, d: 2.6, h: 1.9, roof: 'thatch', face: [5, 22] },
  { id: 'h6', x: 11.2, z: 15.4, w: 3.4, d: 2.8, h: 2.1, roof: 'thatch', face: [1, 21] },
  { id: 'h7', x: 16.4, z: 18.4, w: 3.0, d: 2.6, h: 2.0, roof: 'tile', face: [8, 22] },
  { id: 'woodhouse', x: -16.6, z: 17.6, w: 3.2, d: 2.8, h: 2.0, roof: 'thatch', face: [-10, 20] },
  { id: 'farm', x: 18.2, z: 10.6, w: 3.8, d: 3.0, h: 2.2, roof: 'thatch', face: [12, 18] },
  { id: 'fisher', x: -14.6, z: 6.8, w: 2.8, d: 2.4, h: 1.8, roof: 'thatch', face: [-19, 1] },
  { id: 'h11', x: -10.4, z: 10.6, w: 3.0, d: 2.6, h: 2.0, roof: 'tile', face: [-2, 16] },
];

export const MARKET = [
  { x: 2.6, z: 15.4, ry: 0.05 },
  { x: 6.2, z: 16.2, ry: -0.35 },
];

export const FIELDS = [
  { id: 'cabbage', x: 23.6, z: 5.6, w: 9.5, d: 6.0, ry: 0.06, crop: 'cabbage' },
  { id: 'wheat', x: 20.6, z: -8.0, w: 6.4, d: 4.6, ry: -0.08, crop: 'wheat' },
  { id: 'pumpkin', x: 28.2, z: -6.6, w: 5.0, d: 4.4, ry: 0.15, crop: 'pumpkin' },
];

/** Dirt paths (polylines in x,z) with widths. */
export const PATHS = [
  { w: 1.5, pts: [[0, 1.0], [0.2, 4.6], [1.2, 9.4], [0.6, 13.4], [1.0, 16.8]] },
  { w: 1.2, pts: [[-4.2, 20.0], [-9.0, 19.4], [-13.4, 15.6], [-15.8, 10.8], [-17.6, 5.0]] },
  { w: 1.2, pts: [[6.6, 22.6], [11.0, 21.8], [15.0, 15.6], [17.0, 8.6], [19.0, 1.6], [21.5, -3.5]] },
  { w: 1.0, pts: [[0.4, 26.0], [-1.0, 28.6]] },
  { w: 1.0, pts: [[-4.4, 24.4], [-8.8, 25.8], [-10.6, 26.6]] },
  { w: 1.0, pts: [[6.4, 24.4], [11.0, 24.6]] },
  { w: 1.0, pts: [[-15.8, 10.8], [-12.4, 9.0], [-10.4, 10.6]] },
  { w: 0.9, pts: [[-17.6, 5.0], [-17.4, 0.6], [-17.0, -6.0], [-17.4, -10.0]] },
];

/** Streams: they flow from a source to the rim and become waterfalls. */
export const RIVERS = [
  { id: 'west', width: 1.5, pts: [[-24.6, -0.4], [-27.6, 0.6], [-30.4, 1.4], [-34.5, 2.2]], level0: POND.level },
  { id: 'east', width: 1.3, pts: [[15.6, -2.6], [20.0, -2.0], [25.5, -1.6], [30.5, -2.4], [40.0, -2.6]], level0: -0.2 },
  { id: 'north', width: 1.1, pts: [[13.6, -25.4], [16.0, -27.4], [18.4, -29.2], [23.0, -33.0]], level0: SPRING.level },
];

// Clip rivers at the island rim so each one ends exactly on the edge.
for (const r of RIVERS) {
  const pts = [];
  for (let i = 0; i < r.pts.length; i++) {
    const [x, z] = r.pts[i];
    const R = islandRadius(Math.atan2(z, x));
    if (Math.hypot(x, z) < R - 0.4) {
      pts.push([x, z]);
      continue;
    }
    // binary search the crossing between previous point and this one
    const [px, pz] = pts[pts.length - 1];
    let lo = 0;
    let hi = 1;
    for (let k = 0; k < 30; k++) {
      const m = (lo + hi) / 2;
      const qx = lerp(px, x, m);
      const qz = lerp(pz, z, m);
      if (Math.hypot(qx, qz) < islandRadius(Math.atan2(qz, qx)) - 0.15) lo = m;
      else hi = m;
    }
    pts.push([lerp(px, x, lo), lerp(pz, z, lo)]);
    break;
  }
  r.pts = pts;
  const [ex, ez] = pts[pts.length - 1];
  const [qx, qz] = pts[pts.length - 2];
  const len = Math.hypot(ex - qx, ez - qz);
  r.dir = [(ex - qx) / len, (ez - qz) / len];
  r.mouth = [ex, ez];
}

// Flattened pads under buildings and play areas (height is taken from the natural ground).
const PADS = [
  { x: SQUARE.x, z: SQUARE.z, r: SQUARE.r + 0.6, blend: 3.5 },
  ...HOUSES.map((h) => ({ x: h.x, z: h.z, r: Math.max(h.w, h.d) * 0.62 + 0.6, blend: 1.8 })),
  ...MARKET.map((m) => ({ x: m.x, z: m.z, r: 1.6, blend: 1.5 })),
  { x: WOODCUTTER.x, z: WOODCUTTER.z, r: 2.6, blend: 1.8 },
  { x: PIGPEN.x, z: PIGPEN.z, r: PIGPEN.r + 0.6, blend: 2 },
  { x: CHICKEN_YARD.x, z: CHICKEN_YARD.z, r: CHICKEN_YARD.r + 0.8, blend: 2 },
  { x: SLEEPER_TREE.x, z: SLEEPER_TREE.z, r: 2.4, blend: 2 },
  { x: WINDMILL.x, z: WINDMILL.z, r: 2.6, blend: 2 },
  { x: PASTURE.x, z: PASTURE.z, r: PASTURE.r + 0.5, blend: 3 },
  ...FIELDS.map((f) => ({ x: f.x, z: f.z, r: Math.max(f.w, f.d) * 0.55, blend: 2.5 })),
];
for (const p of PADS) p.h = naturalHeight(p.x, p.z) * 0.4;

function naturalHeight(x, z) {
  return 0.5 * fbm2(x * 0.055 + 3.1, z * 0.055 - 1.7, 3) + 0.25 * noise2(x * 0.17, z * 0.17, 9);
}

const _pd = {};

/** Height of the island surface without the rim falloff (used for placing things). */
export function terrainHeight(x, z) {
  let h = naturalHeight(x, z);

  for (const p of PADS) {
    const d = Math.hypot(x - p.x, z - p.z);
    if (d < p.r + p.blend) h = lerp(h, p.h, 1 - smoothstep(p.r, p.r + p.blend, d));
  }

  // Castle hill: flat plateau with an S-shaped slope, gentle ramp toward the village.
  const dx = x - CASTLE.x;
  const dz = z - CASTLE.z;
  const r = Math.hypot(dx, dz);
  const south = Math.max(0, dz / (r + 1e-6));
  const outer = CASTLE.slopeR + (CASTLE.rampR - CASTLE.slopeR) * Math.pow(south, 3);
  if (r < outer + 0.5) {
    const k = 1 - smoothstep(CASTLE.plateauR, outer, r);
    const rocky = 0.55 * noise2(x * 0.45, z * 0.45, 3) * k * (1 - k) * 4 * (1 - Math.pow(south, 2));
    h = lerp(h, CASTLE.top, k) + rocky;
  }

  // Pond and spring basins with sandy banks.
  for (const w of [POND, SPRING]) {
    const d = Math.hypot(x - w.x, z - w.z);
    if (d < w.r + 3) {
      h = lerp(h, 0.06, 1 - smoothstep(w.r, w.r + 3, d));
      h = lerp(h, w.level - 0.75, 1 - smoothstep(w.r - 1.6, w.r + 0.15, d));
    }
  }

  // Stream channels.
  for (const rv of RIVERS) {
    polylineDistance(x, z, rv.pts, _pd);
    if (_pd.d < rv.width + 2.2) {
      const level = riverLevel(rv, _pd.s);
      const bank = level + 0.16;
      const bed = level - 0.4;
      const wBank = 1 - smoothstep(rv.width * 0.7, rv.width + 2.2, _pd.d);
      const wBed = 1 - smoothstep(rv.width * 0.25, rv.width * 0.72, _pd.d);
      h = lerp(h, Math.min(h, bank), wBank);
      h = lerp(h, bed, wBed);
    }
  }

  return h;
}

/** Final surface height including the rounded rim. */
export function groundHeight(x, z) {
  const rr = Math.hypot(x, z);
  const R = islandRadius(Math.atan2(z, x));
  return terrainHeight(x, z) - 0.9 * smoothstep(R - 3.5, R, rr);
}

export function riverLevel(rv, s) {
  if (rv.level1 === undefined) {
    const [ex, ez] = rv.mouth;
    const rr = Math.hypot(ex, ez);
    const R = islandRadius(Math.atan2(ez, ex));
    rv.level1 = Math.min(rv.level0 - 0.2, naturalHeight(ex, ez) * 0.4 - 0.9 * smoothstep(R - 3.5, R, rr) - 0.25);
  }
  return lerp(rv.level0, rv.level1, Math.pow(clamp(s), 1.6));
}

/** Which ground type is at a point – drives terrain colouring. */
export function groundInfo(x, z, out = {}) {
  out.path = Infinity;
  for (const p of PATHS) {
    polylineDistance(x, z, p.pts, _pd);
    const d = _pd.d - p.w * 0.5;
    if (d < out.path) out.path = d;
  }
  out.square = Math.hypot(x - SQUARE.x, z - SQUARE.z) - SQUARE.r;
  out.field = null;
  for (const f of FIELDS) {
    const c = Math.cos(-f.ry);
    const s = Math.sin(-f.ry);
    const lx = (x - f.x) * c - (z - f.z) * s;
    const lz = (x - f.x) * s + (z - f.z) * c;
    if (Math.abs(lx) < f.w / 2 && Math.abs(lz) < f.d / 2) {
      out.field = f;
      out.fieldLocal = [lx, lz];
    }
  }
  out.water = Infinity;
  for (const w of [POND, SPRING]) out.water = Math.min(out.water, Math.hypot(x - w.x, z - w.z) - w.r);
  for (const rv of RIVERS) {
    polylineDistance(x, z, rv.pts, _pd);
    out.water = Math.min(out.water, _pd.d - rv.width * 0.5);
  }
  const cd = Math.hypot(x - CASTLE.x, z - CASTLE.z);
  out.courtyard = cd < CASTLE.wallR * Math.cos(Math.PI / 6) - 0.4;
  out.pen = Math.hypot(x - PIGPEN.x, z - PIGPEN.z) - PIGPEN.r;
  out.yard = Math.hypot(x - CHICKEN_YARD.x, z - CHICKEN_YARD.z) - CHICKEN_YARD.r;
  return out;
}

/** Island-wide wind direction (flags, smoke, clouds all agree). */
export const WIND = { x: -0.82, z: -0.57 };

export const angleOfPoint = (x, z) => Math.atan2(z, x);
export const pointOnRim = (theta, inset = 0) => {
  const R = islandRadius(theta) - inset;
  return [Math.cos(theta) * R, Math.sin(theta) * R];
};
export { TAU };
