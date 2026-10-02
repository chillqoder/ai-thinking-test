import * as THREE from 'three';
import { beam, box, cone, cyl, ico, place, sphere, torus } from '../core/geo.js';
import { clamp } from '../core/math.js';
import { PAL } from '../world/palette.js';
import { PoseBinder, Rig } from './rig.js';

// Chunky, big-headed villagers. One skinned mesh each: hips → spine → chest → head,
// two-segment arms ending in hands that hold tools, and legs with feet.

const EYE = '#2b2018';
const BOOTS = '#5a3c27';

const darker = (hex, k = 0.85) => new THREE.Color(hex).multiplyScalar(k);

/** Tools are modelled in hand space, extending from the fist along −Y (or Z for poles). */
const TOOLS = {
  axe: (s) => [
    cyl(0.024 * s, 0.03 * s, 0.74 * s, 5, PAL.woodLight, { y: -0.36 * s }),
    box(0.04 * s, 0.13 * s, 0.22 * s, PAL.ironLight, { y: -0.66 * s, z: -0.08 * s }),
    box(0.05 * s, 0.1 * s, 0.07 * s, PAL.iron, { y: -0.66 * s, z: 0.05 * s }),
  ],
  hammer: (s) => [
    cyl(0.022 * s, 0.026 * s, 0.36 * s, 5, PAL.wood, { y: -0.17 * s }),
    box(0.085 * s, 0.09 * s, 0.2 * s, PAL.iron, { y: -0.35 * s }),
  ],
  tongs: (s) => [
    box(0.018 * s, 0.42 * s, 0.018 * s, PAL.iron, { x: 0.015 * s, y: -0.22 * s, rz: 0.04 }),
    box(0.018 * s, 0.42 * s, 0.018 * s, PAL.iron, { x: -0.015 * s, y: -0.22 * s, rz: -0.04 }),
  ],
  hoe: (s) => [
    cyl(0.022 * s, 0.024 * s, 1.3 * s, 5, PAL.woodLight, { y: -0.4 * s }),
    box(0.2 * s, 0.035 * s, 0.16 * s, PAL.ironLight, { y: -1.05 * s, z: -0.07 * s }),
  ],
  spear: (s) => [
    cyl(0.022 * s, 0.022 * s, 2.0 * s, 5, PAL.woodDark, { z: 0.45 * s, rx: Math.PI / 2 }),
    cone(0.05 * s, 0.22 * s, 5, PAL.ironLight, { z: 1.55 * s, rx: Math.PI / 2 }),
    box(0.16 * s, 0.05 * s, 0.03 * s, PAL.iron, { z: 1.42 * s }),
  ],
  bow: (s) => {
    // stave arcs along hand-space Z (vertical when the forearm is held forward), belly toward −Y
    const R = 0.62 * s;
    const parts = [];
    let prev = null;
    for (let i = 0; i <= 6; i++) {
      const phi = -0.7 + (1.4 * i) / 6;
      const p = [0, R * (1 - Math.cos(phi)), R * Math.sin(phi)];
      if (prev) parts.push(beam(prev, p, 0.034 * s, 0.03 * s, PAL.woodDark));
      prev = p;
    }
    const yEnd = R * (1 - Math.cos(0.7));
    const zEnd = R * Math.sin(0.7);
    parts.push(beam([0, yEnd, -zEnd], [0, yEnd, zEnd], 0.008 * s, 0.008 * s, '#efe6d0'));
    parts.push(box(0.05 * s, 0.05 * s, 0.11 * s, '#8a5a33', {}));
    return place(parts, { y: -0.035 * s });
  },
  rod: (s) => [
    cyl(0.012 * s, 0.026 * s, 2.3 * s, 5, '#8a6a42', { y: -1.0 * s }),
    cyl(0.04 * s, 0.04 * s, 0.06 * s, 6, PAL.iron, { y: 0.08 * s, z: 0.03 * s, rx: Math.PI / 2 }),
  ],
  // flat tray of loaves balanced on a raised hand (hand space −Y points up then)
  breadTray: (s) => [
    box(0.56 * s, 0.035 * s, 0.34 * s, PAL.woodLight, { y: -0.075 * s }),
    ...[[-0.18, -0.07], [0, 0.06], [0.17, -0.05], [-0.08, 0.1], [0.12, 0.1]].map(([x, z]) => ico(0.075 * s, 0, '#c98a3e', { x: x * s, y: -0.12 * s, z: z * s, sx: 1.6, sy: 0.75 })),
  ],
  basket: (s) => [
    torus(0.13 * s, 0.014 * s, 3, 8, Math.PI, '#9a6a3a', { y: -0.18 * s }),
    cyl(0.17 * s, 0.13 * s, 0.17 * s, 8, '#b98a52', { y: -0.27 * s }),
    cyl(0.175 * s, 0.175 * s, 0.03 * s, 8, '#8a5f34', { y: -0.19 * s }),
    ico(0.06 * s, 0, '#d8453a', { x: 0.06 * s, y: -0.17 * s }),
    ico(0.06 * s, 0, '#9cc24a', { x: -0.05 * s, y: -0.17 * s, z: 0.04 * s }),
    ico(0.06 * s, 0, '#d8453a', { x: -0.02 * s, y: -0.16 * s, z: -0.06 * s }),
  ],
};

const HATS = {
  straw: (s) => [
    cyl(0.31 * s, 0.31 * s, 0.025 * s, 10, PAL.thatch, { y: 0.3 * s }),
    cyl(0.15 * s, 0.17 * s, 0.13 * s, 8, PAL.thatch, { y: 0.37 * s }),
    cyl(0.172 * s, 0.172 * s, 0.03 * s, 8, '#a3452e', { y: 0.32 * s }),
  ],
  hood: (s, c) => [
    ico(0.198 * s, 1, c, { y: 0.19 * s, z: -0.03 * s, sz: 1.04 }),
    cone(0.12 * s, 0.32 * s, 6, c, { y: 0.27 * s, z: -0.2 * s, rx: -1.1 }),
  ],
  beanie: (s, c) => [sphere(0.19 * s, 8, 4, c, { y: 0.2 * s }, { thetaLength: Math.PI / 2 }), ico(0.05 * s, 0, PAL.white, { y: 0.4 * s })],
  chef: (s) => [cyl(0.15 * s, 0.135 * s, 0.22 * s, 8, PAL.white, { y: 0.4 * s }), ico(0.17 * s, 1, PAL.white, { y: 0.54 * s, sy: 0.75 })],
  helmet: (s) => [
    sphere(0.198 * s, 8, 4, PAL.ironLight, { y: 0.2 * s }, { thetaLength: Math.PI / 2 }),
    cyl(0.205 * s, 0.205 * s, 0.035 * s, 8, PAL.iron, { y: 0.21 * s }),
    box(0.035 * s, 0.13 * s, 0.03 * s, PAL.iron, { y: 0.16 * s, z: 0.19 * s }),
    cone(0.03 * s, 0.07 * s, 4, PAL.iron, { y: 0.41 * s }),
  ],
  crown: (s) => {
    const parts = [cyl(0.13 * s, 0.12 * s, 0.09 * s, 8, PAL.gold, { y: 0.37 * s })];
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2;
      parts.push(cone(0.03 * s, 0.09 * s, 4, PAL.gold, { x: Math.cos(a) * 0.12 * s, y: 0.455 * s, z: Math.sin(a) * 0.12 * s }));
    }
    parts.push(ico(0.028 * s, 0, '#d0323a', { y: 0.38 * s, z: 0.13 * s }));
    parts.push(ico(0.022 * s, 0, '#3f6fd5', { x: 0.1 * s, y: 0.38 * s, z: 0.085 * s }));
    parts.push(ico(0.022 * s, 0, '#3f6fd5', { x: -0.1 * s, y: 0.38 * s, z: 0.085 * s }));
    return parts;
  },
  bonnet: (s, c) => [ico(0.2 * s, 1, c, { y: 0.2 * s, z: -0.045 * s, sy: 0.9 }), box(0.3 * s, 0.03 * s, 0.03 * s, c, { y: 0.06 * s, z: 0.12 * s })],
  kerchief: (s, c) => [ico(0.197 * s, 1, c, { y: 0.21 * s, z: -0.03 * s, sy: 0.85 }), cone(0.06 * s, 0.12 * s, 4, c, { y: 0.12 * s, z: -0.19 * s, rx: -2.2 })],
  bucket: (s, c) => [cyl(0.17 * s, 0.205 * s, 0.13 * s, 8, c, { y: 0.335 * s }), cyl(0.26 * s, 0.26 * s, 0.02 * s, 10, c, { y: 0.275 * s })],
};

const HAIR = {
  short: (s, c) => [ico(0.186 * s, 1, c, { y: 0.215 * s, z: -0.035 * s, sy: 0.78 })],
  messy: (s, c) => [ico(0.188 * s, 1, c, { y: 0.22 * s, z: -0.03 * s, sy: 0.8 }), ico(0.07 * s, 0, c, { x: 0.06 * s, y: 0.36 * s }), ico(0.06 * s, 0, c, { x: -0.07 * s, y: 0.35 * s, z: 0.04 * s })],
  long: (s, c) => [ico(0.188 * s, 1, c, { y: 0.215 * s, z: -0.035 * s, sy: 0.8 }), box(0.3 * s, 0.34 * s, 0.1 * s, c, { y: 0.07 * s, z: -0.13 * s })],
  bun: (s, c) => [ico(0.186 * s, 1, c, { y: 0.215 * s, z: -0.035 * s, sy: 0.78 }), ico(0.085 * s, 0, c, { y: 0.3 * s, z: -0.15 * s })],
  pigtails: (s, c) => [ico(0.186 * s, 1, c, { y: 0.215 * s, z: -0.035 * s, sy: 0.78 }), ico(0.06 * s, 0, c, { x: 0.18 * s, y: 0.12 * s, z: -0.04 * s }), ico(0.06 * s, 0, c, { x: -0.18 * s, y: 0.12 * s, z: -0.04 * s })],
  bald: (s, c) => [ico(0.18 * s, 1, c, { y: 0.15 * s, z: -0.05 * s, sy: 0.55, sz: 0.95 })],
  none: () => [],
};

/**
 * spec: { skin, hair, hairStyle, hat, hatColor, shirt, sleeves, pants, boots, dress, apron,
 *         beard, build: 'normal'|'big'|'slim', child, tools: {right, left}, cape, tabard, quiver,
 *         collar, belt }
 */
export function buildHuman(spec, material) {
  const s = spec.child ? 0.66 : 1;
  const hs = spec.child ? 1.22 : 1;
  const w = spec.build === 'big' ? 1.2 : spec.build === 'slim' ? 0.92 : 1;
  const fat = spec.build === 'big' ? 1.14 : 1;
  const D = {
    hipY: 0.56 * s,
    spine: 0.06 * s,
    chest: 0.16 * s,
    neck: 0.17 * s,
    shX: 0.19 * s * w,
    shY: 0.12 * s,
    upper: 0.2 * s,
    fore: 0.18 * s,
    hipX: 0.085 * s * w,
    thigh: 0.25 * s,
    shin: 0.22 * s,
  };
  const skin = spec.skin ?? '#f2c7a5';
  const shirt = spec.shirt ?? '#c8453a';
  const sleeves = spec.sleeves ?? shirt;
  const pants = spec.pants ?? '#6a5a4a';
  const boots = spec.boots ?? BOOTS;
  const hair = spec.hair ?? '#4a3222';

  const rig = new Rig();
  rig
    .bone('hips', null, 0, D.hipY, 0)
    .bone('spine', 'hips', 0, D.spine, 0)
    .bone('belly', 'spine', 0, 0, 0)
    .bone('chest', 'spine', 0, D.chest, 0)
    .bone('head', 'chest', 0, D.neck, 0)
    .bone('armL', 'chest', D.shX, D.shY, 0)
    .bone('foreL', 'armL', 0, -D.upper, 0)
    .bone('handL', 'foreL', 0, -D.fore, 0)
    .bone('armR', 'chest', -D.shX, D.shY, 0)
    .bone('foreR', 'armR', 0, -D.upper, 0)
    .bone('handR', 'foreR', 0, -D.fore, 0)
    .bone('legL', 'hips', D.hipX, -0.03 * s, 0)
    .bone('shinL', 'legL', 0, -D.thigh, 0)
    .bone('footL', 'shinL', 0, -D.shin, 0)
    .bone('legR', 'hips', -D.hipX, -0.03 * s, 0)
    .bone('shinR', 'legR', 0, -D.thigh, 0)
    .bone('footR', 'shinR', 0, -D.shin, 0);
  if (spec.cape) rig.bone('cape', 'chest', 0, 0.13 * s, -0.16 * s * w);

  // torso
  rig.add('hips', cyl(0.15 * s * w, 0.16 * s * w, 0.17 * s, 8, spec.dress ? spec.dress : pants, {}));
  rig.add('belly', ico(0.165 * s, 1, shirt, { y: 0.07 * s, sx: w * fat, sy: 0.92, sz: 0.9 * fat }));
  rig.add('chest', cyl(0.17 * s * w, 0.155 * s * w, 0.22 * s, 8, shirt, { y: 0.05 * s }));
  for (const sx of [-1, 1]) rig.add('chest', ico(0.068 * s, 0, sleeves, { x: sx * 0.175 * s * w, y: 0.11 * s }));
  if (spec.belt !== false) {
    rig.add('hips', cyl(0.158 * s * w * fat, 0.158 * s * w * fat, 0.045 * s, 8, spec.belt ?? '#5a3a22', { y: 0.075 * s }));
    rig.add('hips', box(0.05 * s, 0.045 * s, 0.02 * s, PAL.gold, { y: 0.075 * s, z: 0.158 * s * w * fat }));
  }
  if (spec.dress) {
    rig.add('hips', cyl(0.17 * s, 0.3 * s, 0.42 * s, 8, spec.dress, { y: -0.14 * s }));
  }
  if (spec.apron) rig.add('spine', box(0.27 * s * w, 0.44 * s, 0.025 * s, spec.apron, { y: -0.04 * s, z: 0.165 * s * w * fat }));
  if (spec.tabard) {
    rig.add('chest', box(0.26 * s * w, 0.3 * s, 0.03 * s, spec.tabard[0], { y: 0.04 * s, z: 0.16 * s * w }));
    rig.add('chest', box(0.08 * s, 0.12 * s, 0.035 * s, spec.tabard[1], { y: 0.06 * s, z: 0.165 * s * w }));
    rig.add('spine', box(0.24 * s * w, 0.2 * s, 0.03 * s, spec.tabard[0], { y: -0.02 * s, z: 0.155 * s * w * fat }));
  }
  if (spec.collar) rig.add('chest', cyl(0.2 * s * w, 0.21 * s * w, 0.08 * s, 8, spec.collar, { y: 0.16 * s }));
  if (spec.quiver) {
    rig.add('chest', cyl(0.06 * s, 0.05 * s, 0.44 * s, 6, '#7a4a2a', { x: 0.06 * s, y: 0.04 * s, z: -0.19 * s, rz: -0.4 }));
    for (let k = 0; k < 3; k++) rig.add('chest', box(0.04 * s, 0.08 * s, 0.012 * s, k === 1 ? '#f7f3ea' : '#c8453a', { x: -0.02 * s + k * 0.03 * s, y: 0.28 * s, z: -0.19 * s, rz: -0.4 }));
  }
  if (spec.cape) {
    rig.add('cape', box(0.4 * s * w, 0.78 * s, 0.035 * s, spec.cape, { y: -0.37 * s, z: -0.03 * s }));
    rig.add('cape', box(0.42 * s * w, 0.06 * s, 0.05 * s, darker(spec.cape, 0.8), { y: -0.75 * s, z: -0.03 * s }));
  }

  // head
  rig.add('head', cyl(0.05 * s, 0.056 * s, 0.09 * s, 6, skin, { y: 0.01 * s }));
  const H = s * hs;
  rig.add('head', ico(0.175 * H, 1, skin, { y: 0.17 * H }));
  for (const sx of [-1, 1]) {
    rig.add('head', box(0.034 * H, 0.052 * H, 0.02 * H, EYE, { x: sx * 0.064 * H, y: 0.19 * H, z: 0.163 * H }));
    rig.add('head', ico(0.04 * H, 0, skin, { x: sx * 0.172 * H, y: 0.165 * H }));
    rig.add('head', ico(0.03 * H, 0, '#f0a59c', { x: sx * 0.105 * H, y: 0.135 * H, z: 0.142 * H, sz: 0.5 }));
  }
  rig.add('head', ico(0.034 * H, 0, darker(skin, 0.9), { y: 0.145 * H, z: 0.177 * H }));
  rig.add('head', box(0.06 * H, 0.014 * H, 0.012 * H, '#8a4a3a', { y: 0.098 * H, z: 0.166 * H }));
  rig.add('head', HAIR[spec.hairStyle ?? 'short'](H, hair));
  if (spec.beard) {
    rig.add('head', ico(0.13 * H, 1, spec.beard, { y: 0.075 * H, z: 0.09 * H, sx: 1.05, sy: 1.12, sz: 0.75 }));
    rig.add('head', box(0.17 * H, 0.04 * H, 0.035 * H, spec.beard, { y: 0.118 * H, z: 0.168 * H }));
  }
  if (spec.hat) rig.add('head', HATS[spec.hat](H, spec.hatColor ?? '#4f8a3a'));

  // arms
  for (const [side, sx] of [['L', 1], ['R', -1]]) {
    rig.add(`arm${side}`, cyl(0.054 * s, 0.047 * s, 0.21 * s, 6, sleeves, { y: -0.1 * s }));
    rig.add(`fore${side}`, cyl(0.047 * s, 0.042 * s, 0.18 * s, 6, spec.shortSleeves ? skin : sleeves, { y: -0.09 * s }));
    rig.add(`hand${side}`, ico(0.054 * s, 0, spec.gloves ?? skin, { y: -0.035 * s }));
    const tool = spec.tools?.[side === 'L' ? 'left' : 'right'];
    if (tool) rig.add(`hand${side}`, TOOLS[tool](s));
    void sx;
  }

  // legs
  for (const side of ['L', 'R']) {
    rig.add(`leg${side}`, cyl(0.076 * s * w, 0.066 * s, 0.26 * s, 6, spec.dress ?? pants, { y: -0.125 * s }));
    rig.add(`shin${side}`, cyl(0.064 * s, 0.054 * s, 0.23 * s, 6, spec.stockings ?? pants, { y: -0.11 * s }));
    rig.add(`shin${side}`, cyl(0.066 * s, 0.062 * s, 0.1 * s, 6, boots, { y: -0.18 * s }));
    rig.add(`foot${side}`, box(0.1 * s, 0.075 * s, 0.19 * s, boots, { y: -0.025 * s, z: 0.035 * s }));
  }

  const built = rig.build(material);
  built.scale = s;
  built.dims = D;
  return built;
}

/** A character in the world: root group (placement + heading) → skinned mesh. */
export class Actor {
  constructor(ctx, built, name = 'villager') {
    this.mesh = built.mesh;
    this.mesh.name = name;
    this.bones = built.bones;
    this.dims = built.dims;
    this.s = built.scale ?? 1;
    this.root = new THREE.Group();
    this.root.name = name;
    this.root.add(this.mesh);
    ctx.scene.add(this.root);
    this.binder = new PoseBinder(built.bones);
  }

  setPose(p) {
    this.binder.apply(p);
  }

  place(x, y, z, heading = 0) {
    this.root.position.set(x, y, z);
    this.root.rotation.set(0, heading, 0);
  }

  worldOf(boneName, local, out = new THREE.Vector3()) {
    this.root.updateMatrixWorld(true);
    out.copy(local).applyMatrix4(this.bones[boneName].matrixWorld);
    return out;
  }
}

// ------------------------------------------------------------------ poses

export const POSE = {
  relaxed: { 'armL.rz': 0.1, 'armR.rz': -0.1, 'foreL.rx': -0.15, 'foreR.rx': -0.15 },
};

/** Knees bend so the hips drop by d while the feet stay planted. */
export function crouch(d, s = 1) {
  const L = 0.47 * s;
  const a = Math.acos(clamp(1 - d / L, 0.15, 1));
  return {
    'hips.py': -d,
    'legL.rx': -a,
    'legR.rx': -a,
    'shinL.rx': 2 * a,
    'shinR.rx': 2 * a,
    'footL.rx': -a,
    'footR.rx': -a,
  };
}

/** Bend forward at the waist (a in radians) keeping balance. */
export function bendOver(a, s = 1) {
  return { 'spine.rx': a * 0.55, 'chest.rx': a * 0.45, 'hips.pz': -a * 0.08 * s, 'head.rx': -a * 0.25 };
}

/** Blend two pose objects. */
export function mixPose(a, b, t) {
  const out = {};
  for (const k in a) out[k] = a[k] * (1 - t);
  for (const k in b) out[k] = (out[k] ?? 0) + b[k] * t;
  return out;
}

export { TOOLS };
