// Low-poly humanoid rig built from primitives, with procedural pose helpers.
// Local +z is "forward" (the face), feet at y = 0.
import * as THREE from 'three';
import { TAU } from '../core/util.js';
import { geo, mesh, group } from '../core/kit.js';

const HIP_Y = 0.72;

/**
 * opts: skin, shirt, pants, boots, hair, hat ('none'|'hood'|'helmet'|'cap'|'crown'|'chef'|'kerchief'|'straw'),
 *       hatColor, beard, robe (skirt colour), apron, belt, scale, child
 */
export function createHumanoid(opts = {}) {
  const o = {
    skin: '#f0c8a0',
    shirt: '#6a8fbf',
    pants: '#6b5640',
    boots: '#4a3526',
    hair: '#6b4226',
    hat: 'none',
    hatColor: '#7a5a3a',
    belt: '#4a3526',
    scale: 1,
    ...opts,
  };
  const root = new THREE.Group();
  const body = group(root); // carries the scale so root transforms stay clean
  body.scale.setScalar(o.scale);
  const hips = group(body, [0, HIP_Y, 0]);

  // legs
  const legs = [-1, 1].map((s) => {
    const leg = group(hips, [s * 0.12, 0, 0]);
    leg.add(mesh(geo.box(0.17, 0.62, 0.2), o.pants, [0, -0.31, 0]));
    leg.add(mesh(geo.box(0.19, 0.14, 0.27), o.boots, [0, -0.65, 0.035]));
    return leg;
  });

  const torso = group(hips);
  const chest = group(torso);
  chest.add(mesh(geo.cyl(0.21, 0.25, 0.64, 8), o.shirt, [0, 0.31, 0]));
  chest.add(mesh(geo.cyl(0.255, 0.255, 0.08, 8), o.belt, [0, 0.04, 0]));
  if (o.apron) chest.add(mesh(geo.box(0.36, 0.5, 0.04), o.apron, [0, 0.12, 0.235], [-0.08, 0, 0]));
  if (o.robe) {
    const skirt = mesh(geo.cyl(0.25, 0.4, 0.68, 10), o.robe, [0, -0.32, 0]);
    hips.add(skirt);
  }

  // arms
  const arms = [-1, 1].map((s) => {
    const arm = group(torso, [s * 0.29, 0.56, 0]);
    arm.add(mesh(geo.cyl(0.07, 0.06, 0.5, 6), o.shirt, [0, -0.23, 0]));
    arm.add(mesh(geo.ico(0.075, 0), o.skin, [0, -0.5, 0]));
    const hand = group(arm, [0, -0.52, 0]);
    return { arm, hand };
  });

  // head
  const neck = group(torso, [0, 0.62, 0]);
  const head = group(neck);
  head.add(mesh(geo.ico(0.22, 1), o.skin, [0, 0.2, 0]));
  head.add(mesh(geo.box(0.045, 0.06, 0.03), '#2a1d16', [-0.08, 0.23, 0.2]));
  head.add(mesh(geo.box(0.045, 0.06, 0.03), '#2a1d16', [0.08, 0.23, 0.2]));
  head.add(mesh(geo.box(0.06, 0.08, 0.08), shade(o.skin, -0.06), [0, 0.18, 0.22]));
  if (o.hat !== 'hood' && o.hat !== 'helmet') {
    const hair = mesh(geo.sphere(0.235, 8, 5), o.hair, [0, 0.24, -0.03], [0, 0, 0], [1, 0.8, 1]);
    head.add(hair);
    head.add(mesh(geo.box(0.36, 0.2, 0.12), o.hair, [0, 0.2, -0.15]));
  }
  if (o.beard) head.add(mesh(geo.cone(0.16, 0.32, 6), o.beard, [0, 0.03, 0.12], [Math.PI, 0, 0]));
  addHat(head, o);

  root.userData.rig = true;
  const rig = {
    root, body, hips, torso, chest, neck, head,
    legL: legs[0], legR: legs[1],
    armL: arms[0].arm, armR: arms[1].arm,
    handL: arms[0].hand, handR: arms[1].hand,
    hipY: HIP_Y,
  };
  return rig;
}

function shade(hex, d) {
  const c = new THREE.Color(hex);
  const hsl = {};
  c.getHSL(hsl);
  c.setHSL(hsl.h, hsl.s, Math.max(0, Math.min(1, hsl.l + d)));
  return '#' + c.getHexString();
}

function addHat(head, o) {
  const c = o.hatColor;
  switch (o.hat) {
    case 'hood':
      head.add(mesh(geo.sphere(0.26, 8, 6), c, [0, 0.22, -0.03], [0, 0, 0], [1, 1.05, 1.05]));
      head.add(mesh(geo.cone(0.12, 0.25, 6), c, [0, 0.3, -0.2], [-1.9, 0, 0]));
      break;
    case 'helmet':
      head.add(mesh(geo.sphere(0.25, 8, 5), c, [0, 0.25, -0.01], [0, 0, 0], [1, 0.9, 1]));
      head.add(mesh(geo.cyl(0.3, 0.3, 0.03, 10), c, [0, 0.24, 0]));
      head.add(mesh(geo.box(0.04, 0.15, 0.04), c, [0, 0.2, 0.25]));
      break;
    case 'cap':
      head.add(mesh(geo.cyl(0.2, 0.24, 0.12, 8), c, [0, 0.38, -0.02], [-0.15, 0, 0]));
      break;
    case 'straw':
      head.add(mesh(geo.cyl(0.4, 0.4, 0.03, 10), c, [0, 0.36, 0]));
      head.add(mesh(geo.cyl(0.16, 0.2, 0.16, 8), c, [0, 0.44, 0]));
      break;
    case 'chef':
      head.add(mesh(geo.cyl(0.21, 0.19, 0.18, 8), c, [0, 0.4, 0]));
      head.add(mesh(geo.sphere(0.24, 8, 5), c, [0, 0.55, 0], [0, 0, 0], [1, 0.7, 1]));
      break;
    case 'kerchief':
      head.add(mesh(geo.sphere(0.245, 8, 5), c, [0, 0.25, -0.02], [0, 0, 0], [1, 0.82, 1.02]));
      head.add(mesh(geo.cone(0.08, 0.14, 4), c, [0, 0.2, -0.26], [-1.4, 0, 0]));
      break;
    case 'crown': {
      head.add(mesh(geo.cyl(0.2, 0.2, 0.1, 10), '#e9b934', [0, 0.42, 0], [0, 0, 0], 1, { metalness: 0.5, roughness: 0.35 }));
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * TAU;
        head.add(mesh(geo.cone(0.045, 0.14, 4), '#e9b934', [Math.cos(a) * 0.18, 0.53, Math.sin(a) * 0.18], [0, 0, 0], 1, { metalness: 0.5, roughness: 0.35 }));
      }
      head.add(mesh(geo.ico(0.035), '#c8102e', [0, 0.42, 0.2]));
      break;
    }
    default:
  }
}

/** Return every joint to its rest pose (call at the start of each frame's pose). */
export function resetPose(r) {
  for (const j of [r.hips, r.torso, r.chest, r.neck, r.head, r.legL, r.legR, r.armL, r.armR]) j.rotation.set(0, 0, 0);
  r.hips.position.set(0, r.hipY, 0);
  r.chest.scale.set(1, 1, 1);
  r.armL.rotation.z = -0.08;
  r.armR.rotation.z = 0.08;
}

/** Walk cycle. `phase` in cycles (1 = two steps), `amt` 0..1 blends from standing. */
export function walkPose(r, phase, amt = 1, { arms = true, run = 0 } = {}) {
  const s = Math.sin(TAU * phase);
  const c = Math.cos(TAU * phase);
  const legA = (0.55 + run * 0.35) * amt;
  r.legL.rotation.x = s * legA;
  r.legR.rotation.x = -s * legA;
  if (arms) {
    r.armL.rotation.x = -s * (0.45 + run * 0.5) * amt;
    r.armR.rotation.x = s * (0.45 + run * 0.5) * amt;
  }
  r.hips.position.y = r.hipY + (Math.abs(c) * 0.05 - 0.02 + run * Math.abs(c) * 0.06) * amt;
  r.torso.rotation.y = s * 0.08 * amt;
  r.torso.rotation.x = run * 0.25 * amt;
  r.hips.rotation.z = c * 0.03 * amt;
}

/** Chest breathing; `cycles` should be an integer per loop at the call site. */
export function breathe(r, v, depth = 0.03) {
  r.chest.scale.set(1 + v * depth, 1 + v * depth * 0.5, 1 + v * depth);
}

/** Sitting on something `seatH` high (feet on the ground in front). */
export function sitPose(r, seatH = 0.45) {
  r.hips.position.y = seatH + 0.05;
  r.legL.rotation.x = -1.45;
  r.legR.rotation.x = -1.45;
}

/** Attach a prop to a hand. */
export function hold(hand, obj, pos = [0, 0, 0], rot = [0, 0, 0]) {
  obj.position.set(...pos);
  obj.rotation.set(...rot);
  hand.add(obj);
  return obj;
}

export function enableShadows(obj) {
  obj.traverse((m) => {
    if (m.isMesh) {
      m.castShadow = true;
      m.receiveShadow = true;
    }
  });
}

// ---------- props ----------
export const props = {
  bow() {
    const g = new THREE.Group();
    g.add(mesh(geo.torus(0.42, 0.025, 4, 10, Math.PI * 0.95), '#6b4226', [0, 0, 0], [0, Math.PI / 2, Math.PI / 2 + 0.08]));
    g.add(mesh(geo.cyl(0.006, 0.006, 0.82, 3), '#e8e2d0', [0, 0, -0.02]));
    return g;
  },
  quiver() {
    const g = new THREE.Group();
    g.add(mesh(geo.cyl(0.08, 0.07, 0.5, 6), '#7a4e2c'));
    for (let i = 0; i < 4; i++) g.add(mesh(geo.cone(0.035, 0.1, 3), '#e8e2d0', [(i % 2) * 0.05 - 0.025, 0.3, Math.floor(i / 2) * 0.05 - 0.025]));
    return g;
  },
  spear() {
    const g = new THREE.Group();
    g.add(mesh(geo.cyl(0.03, 0.03, 2.3, 5), '#6b4226', [0, 0.55, 0]));
    g.add(mesh(geo.cone(0.07, 0.25, 4), '#b8bcc4', [0, 1.8, 0], [0, 0, 0], 1, { metalness: 0.6, roughness: 0.3 }));
    return g;
  },
  shield(color = '#2f4f9a') {
    const g = new THREE.Group();
    g.add(mesh(geo.cyl(0.3, 0.3, 0.05, 10), color, [0, 0, 0], [Math.PI / 2, 0, 0]));
    g.add(mesh(geo.cyl(0.08, 0.08, 0.08, 8), '#e9c04a', [0, 0, 0.03], [Math.PI / 2, 0, 0]));
    return g;
  },
  axe() {
    const g = new THREE.Group();
    g.add(mesh(geo.cyl(0.025, 0.03, 0.85, 5), '#8a5a35', [0, 0.35, 0]));
    g.add(mesh(geo.box(0.04, 0.16, 0.22), '#9aa0a8', [0, 0.72, 0.09], [0, 0, 0], 1, { metalness: 0.5, roughness: 0.4 }));
    return g;
  },
  hammer() {
    const g = new THREE.Group();
    g.add(mesh(geo.cyl(0.022, 0.022, 0.45, 5), '#6b4226', [0, 0.18, 0]));
    g.add(mesh(geo.box(0.1, 0.1, 0.2), '#55555c', [0, 0.4, 0.02], [0, 0, 0], 1, { metalness: 0.5, roughness: 0.4 }));
    return g;
  },
  tongs() {
    const g = new THREE.Group();
    g.add(mesh(geo.box(0.02, 0.02, 0.5), '#3b3b40', [0, 0, 0.25]));
    g.add(mesh(geo.box(0.06, 0.03, 0.14), '#ff7a2a', [0, 0, 0.52], [0, 0, 0], 1, { emissive: '#ff5a10', emissiveIntensity: 1.4 }));
    return g;
  },
  hoe() {
    const g = new THREE.Group();
    g.add(mesh(geo.cyl(0.022, 0.022, 1.5, 5), '#8a5a35', [0, 0, 0]));
    g.add(mesh(geo.box(0.2, 0.04, 0.16), '#7d828a', [0, -0.74, 0.07], [0.3, 0, 0], 1, { metalness: 0.4, roughness: 0.5 }));
    return g;
  },
  basket(color = '#b0874f') {
    const g = new THREE.Group();
    g.add(mesh(geo.cyl(0.2, 0.15, 0.2, 8), color, [0, -0.1, 0]));
    g.add(mesh(geo.torus(0.17, 0.015, 4, 10, Math.PI), shade(color, -0.1), [0, 0, 0]));
    g.add(mesh(geo.ico(0.07), '#d8402f', [0.06, 0.02, 0.03]));
    g.add(mesh(geo.ico(0.07), '#7fbf3f', [-0.05, 0.02, -0.04]));
    g.add(mesh(geo.box(0.22, 0.03, 0.16), '#f4efe4', [0, 0.0, 0]));
    return g;
  },
  bread() {
    const g = new THREE.Group();
    for (let i = 0; i < 3; i++) g.add(mesh(geo.sphere(0.1, 7, 5), '#c98a3c', [(i - 1) * 0.13, 0.02 * (i % 2), 0], [0, 0, 0.2], [1.6, 0.7, 0.8]));
    g.add(mesh(geo.sphere(0.1, 7, 5), '#b97a30', [0, 0.11, 0], [0, 0.6, 0], [1.6, 0.7, 0.8]));
    return g;
  },
  rod() {
    const g = new THREE.Group();
    g.add(mesh(geo.cyl(0.012, 0.025, 2.6, 4), '#7a5232', [0, 1.3, 0]));
    const tip = group(g, [0, 2.6, 0]);
    return { g, tip };
  },
  bucket() {
    const g = new THREE.Group();
    g.add(mesh(geo.cyl(0.18, 0.14, 0.3, 8), '#8a5a35', [0, -0.25, 0]));
    g.add(mesh(geo.cyl(0.185, 0.185, 0.04, 8), '#55555c', [0, -0.15, 0]));
    g.add(mesh(geo.torus(0.17, 0.012, 3, 8, Math.PI), '#55555c', [0, -0.12, 0]));
    const water = mesh(geo.cyl(0.16, 0.16, 0.02, 8), '#3f87b5', [0, -0.13, 0]);
    g.add(water);
    return { g, water };
  },
  log() {
    return mesh(geo.cyl(0.16, 0.16, 0.48, 8), '#8b5e34');
  },
};
