// Single source of truth for where everything lives on the island.
// +X = east, +Z = south (towards the village), Y = up. 1 unit ≈ 1 metre.

export const CASTLE = {
  x: 0,
  z: -10,
  y: 5, // courtyard / plateau height
  half: 9, // wall centre-lines at ±half
  wallT: 2, // wall thickness
  wallTop: 9, // walkway height
  towerR: 2.2,
  plateauR: 13.6,
  hillR: 22.5,
};

export const KEEP = { x: 0, z: -13.6, w: 9, d: 7, top: 17, balconyY: 13 };
export const GATE = { x: 0, z: -1, halfW: 1.2, h: 3.4 };

export const PLAZA = { x: 2, z: 18, r: 5.2 };
export const WELL = { x: 2, z: 18 };
export const TROUGH = { x: 2, z: 19.85 };
export const STALL = { x: -3.6, z: 12.4 };

export const POND = { x: 24, z: 9, r: 4.6, water: -0.22 };
export const MUD = { x: -15, z: 26, r: 2.5 };
export const PEN = { x: -15, z: 26, w: 7.5, d: 6.5 };
export const WOODCUT = { x: -18, z: 19.2 }; // chopping stump; the woodcutter faces +X
export const FIELD = { x0: -33, x1: -22, z0: -8, z1: 7 };
export const PASTURE = { x0: 12.5, x1: 28, z0: -22, z1: -9.5 };
export const YARD = { x: 17, z: 31 };
export const OAK = { x: -6, z: 35 };
export const KIDS = { x: 9, z: 28.4, r: 2.7 };
export const BAKERY = { x: 13.4, z: 20.5, yaw: -Math.PI / 2 };
export const SPRING = { x: -19, z: -27 };
export const LINE = { x: -8.2, z: 13.1, yaw: 0.12 }; // clothesline centre
export const DOCK = { x0: 18.2, x1: 21.4, z: 9.2, w: 1.2 };
export const BARN = { x: 24.5, z: -4.5 };

/** Dirt paths as polylines of [x, z]; `w` is half-width. */
export const PATHS = [
  // castle gate down the hill to the plaza
  { w: 1.35, pts: [[0, 0.5], [0.4, 4], [-1.4, 7.5], [-0.6, 10.5], [1.2, 13]] },
  // plaza → pond / fisherman dock
  { w: 1.0, pts: [[6.5, 16.5], [11, 15.3], [15, 12.6], [18.6, 10]] },
  // plaza → woodcutter → fields
  { w: 1.0, pts: [[-2.6, 16.5], [-8, 15.4], [-14, 15.2], [-19.5, 14.6], [-22.5, 11], [-24, 6]] },
  // plaza → south green → chicken yard
  { w: 0.95, pts: [[5.8, 21.4], [9.5, 23.2], [13.5, 26.5], [15.5, 29]] },
  // plaza → pig pen
  { w: 0.9, pts: [[-1.4, 21.6], [-6, 23.6], [-10.6, 25.2]] },
  // plaza → bakery
  { w: 0.8, pts: [[6.8, 19.6], [10.1, 19.4]] },
  // hillside lane from the gate road round to the pasture
  { w: 0.85, pts: [[0.6, 6.5], [6, 6.2], [11, 2.6], [14.5, -3], [16.5, -8.2]] },
];

/** Streams carved into the terrain: pond outflow (east) and a spring (north-west). */
export const STREAMS = [
  { w: 0.85, pts: [[26.5, 10.2], [30, 11.8], [34, 11.2], [38, 12.6], [42, 13.4], [47, 14]] },
  { w: 0.7, pts: [[-19, -27], [-22.5, -28.8], [-26, -29], [-29.5, -31], [-33, -32.5], [-38, -34.5]] },
];

/** Extra cliff-face waterfall that gushes from a cave under the south-west rim. */
export const CLIFF_FALL = { angle: 2.45, drop: 3.2 };
