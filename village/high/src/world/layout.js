// World layout: one place for every important coordinate. +x east, +z south
// (towards the village side the camera starts on), y up. 1 unit ≈ 1 metre.

export const ISLAND_R = 54;

// Castle sits on a flat-topped hill north of the island centre.
export const CASTLE = { x: 0, z: -14 };
export const PLATEAU_Y = 6;
export const PLATEAU_R = 19; // flat radius
export const HILL_R = 29; // hill meets the meadow here

export const WALL = {
  half: 11, // walls form a square of side 22 around CASTLE
  top: 10, // walkway height
  thick: 1.6,
  towerR: 2.4,
};
// Wall corners (tower centres)
export const TOWERS = [
  [CASTLE.x - WALL.half, CASTLE.z + WALL.half], // SW
  [CASTLE.x + WALL.half, CASTLE.z + WALL.half], // SE
  [CASTLE.x + WALL.half, CASTLE.z - WALL.half], // NE
  [CASTLE.x - WALL.half, CASTLE.z - WALL.half], // NW
];
export const GATE = { x: 0, z: CASTLE.z + WALL.half, width: 3.2 };
export const KEEP = { x: 0, z: CASTLE.z, w: 9, d: 9, h: 11 };
export const BALCONY = { x: 0, y: 12, z: KEEP.z + KEEP.d / 2 + 0.85 };
export const FORGE = { x: 6.2, z: -7.2 };

// Village
export const SQUARE = { x: 0, z: 22, r: 6.5 };
export const WELL = { x: -1.2, z: 22 };
export const TROUGH = { x: 0.75, z: 23.35 };
export const STALL = { x: -6, z: 17.5, yaw: 0.55 };
export const BAKERY = { x: 9, z: 15.5, yaw: -0.75 };
export const POND = { x: -30, z: 13, r: 5.6 };
export const STREAM = [
  [-35.2, 14.2],
  [-40, 16.5],
  [-45, 16.2],
  [-49, 17.6],
  [-56, 18.8],
];
export const PIGPEN = { x: 18, z: 31, w: 9, d: 7 };
export const MUD = { x: 18.4, z: 31.4, r: 2.4 };
export const FIELDS = { x: 36, z: -3, w: 13, d: 17 };
export const BARN = { x: 33.5, z: 11.5, yaw: Math.PI };
export const WOODCUT = { x: -16.5, z: 29.5, yaw: 0.3 };
export const NAP_TREE = { x: -23.5, z: 39 };
export const PLAYGROUND = { x: -2, z: 32.5 };
export const COOP = { x: 13.5, z: 43 };
export const CHASE = { x: 9, z: 39, r: 2.8 };
export const MEADOW = { x: 30, z: 26 };

// Dirt paths (polylines) — painted onto the terrain and used by walkers.
export const PATHS = [
  { w: 1.5, pts: [[0, -1.5], [0.4, 6], [-0.6, 12], [0, 16.5]] }, // gate → village
  { w: 1.3, pts: [[-5.5, 23.5], [-11, 26], [-16, 27.5], [-22, 23], [-26, 18.5]] }, // west to pond
  { w: 1.3, pts: [[5.5, 21.5], [12, 23.5], [20, 22], [26, 17], [30, 11], [31, 5]] }, // east to fields
  { w: 1.2, pts: [[0.5, 28], [1.5, 34], [6, 38], [12, 41.5]] }, // south to coop
  { w: 1.0, pts: [[3.5, 1], [14, 4], [24, 8], [29, 10]] }, // hill side track to barn
  { w: 1.0, pts: [[-16, 27.5], [-19.5, 33.5], [-22, 37]] }, // to the nap tree
];

// Houses: [x, z, yaw (door direction), w, d, h, roof]
export const HOUSES = [
  [-11, 15.5, 0.85, 3.6, 3.2, 2.3, 'thatch'],
  [-12.5, 21.5, 1.35, 3.4, 3.4, 2.2, 'tile'],
  [-8.5, 9.5, 0.45, 3.2, 3, 2.1, 'thatch'],
  [11, 24.5, -1.45, 3.6, 3.2, 2.3, 'tile'],
  [7.5, 28.5, -2.4, 3.2, 3, 2.1, 'thatch'],
  [-8, 28.2, 2.6, 3.4, 3.2, 2.2, 'tile'],
  [-11.5, 36, 2.0, 3, 3, 2.1, 'thatch'],
  [3.5, 43, -3.0, 3.2, 3, 2.1, 'tile'],
  [-2.5, 40, 3.0, 3, 2.8, 2.0, 'thatch'],
  [16.5, 17.5, -1.9, 3.2, 3, 2.1, 'thatch'],
  [21, 39, -2.4, 3.2, 3, 2.1, 'tile'],
  [-19, 18.5, 1.0, 3.2, 3, 2.1, 'thatch'],
];

/** Zones kept clear of trees and scatter. */
export const CLEAR_ZONES = [
  { x: CASTLE.x, z: CASTLE.z, r: HILL_R - 3 },
  { x: SQUARE.x, z: SQUARE.z + 6, r: 17 },
  { x: POND.x, z: POND.z, r: POND.r + 2 },
  { x: PIGPEN.x, z: PIGPEN.z, r: 6.5 },
  { x: FIELDS.x, z: FIELDS.z, r: 11.5 },
  { x: BARN.x, z: BARN.z, r: 5 },
  { x: MEADOW.x, z: MEADOW.z, r: 7 },
  { x: CHASE.x, z: CHASE.z, r: 5 },
  { x: COOP.x, z: COOP.z, r: 3.5 },
  { x: WOODCUT.x, z: WOODCUT.z, r: 4.5 },
];
