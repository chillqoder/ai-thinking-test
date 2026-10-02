// Procedural low-poly humanoid: a small hierarchy of groups (pelvis, torso,
// head, two-segment arms and legs) whose meshes are vertex-coloured merges.
// Poses are set every frame from loop time; arms can be solved with a
// two-bone IK so hands land exactly on cranks, rails, tools and buckets.

import * as THREE from 'three';
import { Builder, paint, box, cyl, cone, ico, sphere, capsule, transform } from '../core/geo.js';
import { charMat } from '../core/materials.js';
import { TAU, lerp, clamp } from '../core/loop.js';

export const DIM = {
  foot: 0.06,
  shin: 0.3,
  thigh: 0.31,
  hip: 0.67, // pelvis (hip joint) height when standing
  torsoY: 0.06,
  torso: 0.5,
  shoulderX: 0.265,
  shoulderY: 0.45,
  upper: 0.29,
  fore: 0.27,
  headR: 0.21,
};

const SKIN = [0xf2c7a0, 0xe8b48a, 0xd39a6e, 0xa8714c, 0x7d5236];

function part(fn) {
  const b = new Builder();
  fn(b);
  const mesh = new THREE.Mesh(b.geometry(), charMat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function addHair(b, o) {
  const R = DIM.headR;
  const hy = 0.23;
  if (o.hairStyle === 'bald') {
    // just a fringe round the back of the head
    b.add(new THREE.SphereGeometry(R + 0.012, 10, 4, Math.PI * 0.6, Math.PI * 0.8, 1.2, 0.55), o.hair, { p: [0, hy, 0] });
    return;
  }
  b.add(new THREE.SphereGeometry(R + 0.018, 11, 7, 0, TAU, 0, 1.4), o.hair, { p: [0, hy + 0.005, -0.012], r: [-0.42, 0, 0] });
  if (o.hairStyle === 'long') b.add(box(0.36, 0.34, 0.12), o.hair, { p: [0, hy - 0.14, -0.13] });
  if (o.hairStyle === 'bun') b.add(sphere(0.09, 7, 5), o.hair, { p: [0, hy + 0.13, -0.17] });
  if (o.hairStyle === 'pigtails') for (const s of [-1, 1]) b.add(sphere(0.075, 6, 5), o.hair, { p: [s * 0.21, hy - 0.04, -0.06], s: [1, 1.5, 1] });
}

function addHat(b, o) {
  const hy = 0.23;
  const c = o.hatColor;
  switch (o.hat) {
    case 'hood':
      b.add(new THREE.SphereGeometry(0.25, 11, 7, 0, TAU, 0, 1.75), c, { p: [0, hy + 0.01, -0.03], r: [-0.62, 0, 0] });
      b.add(cone(0.1, 0.24, 6), c, { p: [0, hy + 0.06, -0.27], r: [-2.1, 0, 0] });
      b.add(cyl(0.25, 0.27, 0.1, 10), c, { p: [0, -0.02, -0.01] });
      break;
    case 'helmet':
      b.add(new THREE.SphereGeometry(0.235, 11, 6, 0, TAU, 0, 1.5), c, { p: [0, hy + 0.01, 0] });
      b.add(cyl(0.33, 0.33, 0.03, 12), c, { p: [0, hy + 0.04, 0] });
      b.add(box(0.04, 0.16, 0.04), c, { p: [0, hy + 0.0, 0.22] });
      break;
    case 'crown':
      b.add(cyl(0.18, 0.17, 0.11, 10), 0xf4c542, { p: [0, hy + 0.2, 0] });
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * TAU;
        b.add(cone(0.035, 0.1, 4), 0xf4c542, { p: [Math.sin(a) * 0.17, hy + 0.3, Math.cos(a) * 0.17] });
      }
      b.add(ico(0.035, 0), 0xd23c3c, { p: [0, hy + 0.2, 0.18] });
      b.add(cyl(0.17, 0.17, 0.05, 10), 0xb02a3a, { p: [0, hy + 0.17, 0] });
      break;
    case 'straw':
      b.add(cone(0.2, 0.2, 9), c, { p: [0, hy + 0.27, 0] });
      b.add(cyl(0.4, 0.42, 0.03, 12), c, { p: [0, hy + 0.17, 0] });
      b.add(cyl(0.205, 0.205, 0.035, 9), 0xb5523c, { p: [0, hy + 0.2, 0] });
      break;
    case 'chef':
      b.add(cyl(0.16, 0.17, 0.2, 9), 0xffffff, { p: [0, hy + 0.25, 0] });
      b.add(sphere(0.2, 9, 6), 0xffffff, { p: [0, hy + 0.38, 0], s: [1, 0.7, 1] });
      break;
    case 'cap':
      b.add(new THREE.SphereGeometry(0.228, 10, 6, 0, TAU, 0, 1.25), c, { p: [0, hy + 0.01, -0.01], r: [-0.25, 0, 0] });
      b.add(ico(0.05, 0), c, { p: [0, hy + 0.23, -0.05] });
      break;
    case 'bonnet':
      b.add(new THREE.SphereGeometry(0.245, 11, 7, 0, TAU, 0, 1.6), c, { p: [0, hy + 0.0, -0.035], r: [-0.75, 0, 0] });
      b.add(new THREE.TorusGeometry(0.2, 0.025, 4, 12), c, { p: [0, hy + 0.04, 0.09], r: [0.6, 0, 0] });
      break;
    case 'bucket':
      b.add(cyl(0.19, 0.22, 0.15, 10), c, { p: [0, hy + 0.2, 0] });
      b.add(cyl(0.31, 0.31, 0.025, 12), c, { p: [0, hy + 0.13, 0] });
      break;
    case 'kerchief':
      b.add(new THREE.SphereGeometry(0.232, 10, 6, 0, TAU, 0, 1.35), c, { p: [0, hy + 0.01, -0.02], r: [-0.4, 0, 0] });
      b.add(cone(0.07, 0.14, 4), c, { p: [0, hy - 0.05, -0.22], r: [-2.4, 0, 0] });
      break;
    default:
      break;
  }
}

/**
 * opts: { skin, shirt, pants, shoes, hair, hairStyle, beard, hat, hatColor,
 *         dress, apron, belt, sleeves: 'long'|'short', belly, scale, headScale,
 *         robe (king), cape }
 */
export class Humanoid {
  constructor(o = {}) {
    o = {
      skin: SKIN[1],
      shirt: 0x8a6a4a,
      pants: 0x5a4a3a,
      shoes: 0x4a3426,
      hair: 0x5a3a22,
      hairStyle: 'short',
      beard: null,
      hat: 'none',
      hatColor: 0x7a5a3a,
      dress: null,
      apron: null,
      belt: 0x4a3426,
      sleeves: 'long',
      belly: 0,
      scale: 1,
      headScale: 1,
      ...o,
    };
    this.o = o;
    const D = DIM;

    this.root = new THREE.Group();
    this.root.userData.rig = true;
    this.body = new THREE.Group();
    this.root.add(this.body);
    this.root.scale.setScalar(o.scale);

    // pelvis + skirt
    this.pelvis = new THREE.Group();
    this.pelvis.position.y = D.hip;
    this.body.add(this.pelvis);
    this.pelvis.add(
      part((b) => {
        b.add(cyl(0.19, 0.2, 0.16, 9), o.dress ?? o.pants, { p: [0, 0.02, 0], s: [1, 1, 0.85] });
        if (o.dress) {
          const len = o.skirtLen ?? 0.52;
          b.add(cyl(0.2, o.robe ? 0.36 : 0.33, len, 11), o.dress, { p: [0, 0.06 - len / 2, 0], s: [1, 1, 0.88] });
          if (o.robe) b.add(cyl(0.37, 0.37, 0.07, 11), 0xf6f1e6, { p: [0, 0.06 - len + 0.02, 0], s: [1, 1, 0.88] });
        }
        if (o.apron) b.add(box(0.3, 0.42, 0.02), o.apron, { p: [0, -0.12, 0.2] });
      }),
    );

    // torso
    this.torso = new THREE.Group();
    this.torso.position.y = D.torsoY;
    this.pelvis.add(this.torso);
    const chestMesh = part((b) => {
      const top = o.dress && !o.robe ? o.dress : o.shirt;
      b.add(cyl(0.235, 0.205, D.torso, 9), top, { p: [0, D.torso / 2, 0], s: [1, 1, 0.8] });
      if (o.belly) b.add(sphere(0.2 + o.belly * 0.06, 9, 7), top, { p: [0, 0.2, 0.05 + o.belly * 0.04], s: [1.05, 1, 0.9] });
      b.add(cyl(0.212, 0.212, 0.06, 9), o.belt, { p: [0, 0.04, 0], s: [1, 1, 0.82] });
      b.add(cyl(0.075, 0.08, 0.1, 7), o.skin, { p: [0, D.torso + 0.02, 0] });
      if (o.apron) b.add(box(0.3, 0.32, 0.02), o.apron, { p: [0, 0.22, 0.18 + o.belly * 0.08] });
      if (o.robe) {
        b.add(cyl(0.27, 0.27, 0.08, 10), 0xf6f1e6, { p: [0, D.torso - 0.04, 0], s: [1, 1, 0.82] });
        for (let i = 0; i < 5; i++) b.add(ico(0.018, 0), 0x222222, { p: [-0.18 + i * 0.09, D.torso - 0.04, 0.21] });
      }
      if (o.tabard) b.add(box(0.3, 0.55, 0.03), o.tabard, { p: [0, 0.2, 0.185] });
      if (o.quiver) {
        b.add(cyl(0.07, 0.06, 0.55, 7), 0x7a5232, { p: [0.08, 0.32, -0.21], r: [0.25, 0, -0.35] });
        for (let i = 0; i < 3; i++) b.add(cone(0.035, 0.1, 3), 0xf2ead8, { p: [0.17 + i * 0.03, 0.62, -0.28 + i * 0.015], r: [0.25, 0, -0.35] });
      }
    });
    // breathing scales this joint, so it wraps the mesh
    this.chest = new THREE.Group();
    this.chest.add(chestMesh);
    this.torso.add(this.chest);

    if (o.cape) {
      this.cape = part((b) => {
        const g = new THREE.CylinderGeometry(0.26, 0.48, 1.25, 12, 1, true, Math.PI * 0.62, Math.PI * 0.76);
        b.add(g, o.cape, { p: [0, -0.18, -0.02] });
        const inner = new THREE.CylinderGeometry(0.255, 0.475, 1.25, 12, 1, true, Math.PI * 0.62, Math.PI * 0.76);
        inner.scale(-1, 1, 1);
        b.add(inner, 0xf6f1e6, { p: [0, -0.18, -0.02], r: [0, Math.PI, 0] });
      });
      this.capeGroup = new THREE.Group();
      this.capeGroup.position.set(0, D.torso - 0.02, -0.04);
      this.capeGroup.add(this.cape);
      this.cape.position.y = -0.4;
      this.torso.add(this.capeGroup);
    }

    // head
    this.neck = new THREE.Group();
    this.neck.position.y = D.torso + 0.02;
    this.torso.add(this.neck);
    const headMesh = part((b) => {
      const R = D.headR;
      b.add(sphere(R, 11, 9), o.skin, { p: [0, 0.23, 0], s: [1, 1.03, 0.95] });
      b.add(sphere(0.048, 6, 5), new THREE.Color(o.skin).multiplyScalar(0.9), { p: [0, 0.21, 0.2] });
      for (const s of [-1, 1]) {
        b.add(sphere(0.028, 5, 4), 0x2a1d18, { p: [s * 0.075, 0.26, 0.182] });
        b.add(sphere(0.05, 5, 4), o.skin, { p: [s * 0.205, 0.23, 0] });
        b.add(sphere(0.04, 5, 4), 0xf09a8a, { p: [s * 0.12, 0.19, 0.155] });
      }
      if (o.beard) {
        b.add(sphere(0.13, 8, 6), o.beard, { p: [0, 0.075, 0.1], s: [1.1, 1.0, 0.7] });
        b.add(box(0.15, 0.035, 0.05), o.beard, { p: [0, 0.165, 0.195] });
      }
      if (o.hat !== 'helmet' && o.hat !== 'hood' && o.hat !== 'bonnet') addHair(b, o);
      else if (o.hat === 'bonnet') b.add(sphere(0.05, 5, 4), o.hair, { p: [0, 0.38, 0.12] });
      addHat(b, o);
    });
    this.head = new THREE.Group();
    this.head.add(headMesh);
    this.head.scale.setScalar(o.headScale);
    this.neck.add(this.head);

    // arms
    const sleeve = o.robe ? o.dress : o.dress && !o.robe ? o.dress : o.shirt;
    this.arms = {};
    for (const [side, sx] of [
      ['L', 1],
      ['R', -1],
    ]) {
      const shoulder = new THREE.Group();
      shoulder.position.set(sx * D.shoulderX, D.shoulderY, 0);
      const elbow = new THREE.Group();
      elbow.position.y = -D.upper;
      const hand = new THREE.Group();
      hand.position.y = -D.fore;
      shoulder.add(
        part((b) => {
          b.add(sphere(0.085, 7, 5), sleeve, {});
          b.add(capsule(0.07, 0.17), sleeve, { p: [0, -0.14, 0] });
        }),
      );
      elbow.add(
        part((b) => {
          b.add(capsule(0.06, 0.15), o.sleeves === 'long' ? sleeve : o.skin, { p: [0, -0.1, 0] });
          if (o.sleeves === 'long') b.add(cyl(0.072, 0.072, 0.05, 7), new THREE.Color(sleeve).multiplyScalar(0.85), { p: [0, -0.19, 0] });
          b.add(sphere(0.066, 7, 5), o.skin, { p: [0, -D.fore + 0.01, 0.01] });
        }),
      );
      elbow.add(hand);
      shoulder.add(elbow);
      this.torso.add(shoulder);
      this.arms[side] = { shoulder, elbow, hand, sx };
    }

    // legs
    this.legs = {};
    for (const [side, sx] of [
      ['L', 1],
      ['R', -1],
    ]) {
      const hip = new THREE.Group();
      hip.position.set(sx * 0.105, -0.02, 0);
      const knee = new THREE.Group();
      knee.position.y = -D.thigh;
      hip.add(
        part((b) => {
          b.add(capsule(0.085, 0.2), o.pants, { p: [0, -0.15, 0] });
        }),
      );
      knee.add(
        part((b) => {
          b.add(capsule(0.072, 0.17), o.pants, { p: [0, -0.13, 0] });
          b.add(box(0.13, 0.1, 0.25), o.shoes, { p: [0, -D.shin + 0.02, 0.045] });
        }),
      );
      hip.add(knee);
      this.pelvis.add(hip);
      this.legs[side] = { hip, knee, sx };
    }

    this.reset();
  }

  /** Neutral standing pose. Call at the start of every update. */
  reset() {
    const D = DIM;
    this.body.position.set(0, 0, 0);
    this.body.rotation.set(0, 0, 0);
    this.pelvis.position.set(0, D.hip, 0);
    this.pelvis.rotation.set(0, 0, 0);
    this.torso.rotation.set(0, 0, 0);
    this.neck.rotation.set(0, 0, 0);
    this.chest.scale.set(1, 1, 1);
    for (const a of Object.values(this.arms)) {
      a.shoulder.rotation.set(0, 0, a.sx * 0.1);
      a.elbow.rotation.set(-0.18, 0, 0);
      a.hand.rotation.set(0, 0, 0);
    }
    for (const l of Object.values(this.legs)) {
      l.hip.rotation.set(0, 0, 0);
      l.knee.rotation.set(0, 0, 0);
    }
    if (this.capeGroup) this.capeGroup.rotation.set(0, 0, 0);
    return this;
  }

  place(x, y, z, yaw = 0) {
    this.root.position.set(x, y, z);
    this.root.rotation.set(0, yaw, 0);
    return this;
  }

  /** Breathing: chest swells slightly. b in [-1, 1]. */
  breathe(b, amount = 1) {
    this.chest.scale.set(1 + 0.025 * b * amount, 1 + 0.012 * b * amount, 1 + 0.05 * b * amount);
  }

  /**
   * Walk / run cycle. phase 0..1, amt 0..1 (blends from standing),
   * run 0..1 for a bouncier, more bent stride.
   */
  walk(phase, amt = 1, run = 0) {
    if (amt <= 0) return;
    const s = Math.sin(TAU * phase);
    const c = Math.cos(TAU * phase);
    const A = amt * (0.42 + run * 0.28);
    const { L, R } = this.legs;
    L.hip.rotation.x = -s * A;
    R.hip.rotation.x = s * A;
    L.knee.rotation.x = amt * (0.08 + (0.55 + run * 0.6) * Math.max(0, c) + run * 0.25);
    R.knee.rotation.x = amt * (0.08 + (0.55 + run * 0.6) * Math.max(0, -c) + run * 0.25);
    this.pelvis.position.y = DIM.hip - amt * (0.045 + run * 0.04) * s * s + run * amt * 0.07 * Math.abs(c);
    this.pelvis.rotation.y = s * 0.06 * amt;
    this.torso.rotation.y = -s * 0.1 * amt;
    this.torso.rotation.x += amt * (0.04 + run * 0.22);
    this.neck.rotation.x -= amt * run * 0.12;
    const aA = A * (0.85 + run * 0.4);
    this.arms.L.shoulder.rotation.x = s * aA;
    this.arms.R.shoulder.rotation.x = -s * aA;
    this.arms.L.elbow.rotation.x = -0.25 * amt - run * amt * 1.1 - Math.max(0, -s) * 0.3 * amt;
    this.arms.R.elbow.rotation.x = -0.25 * amt - run * amt * 1.1 - Math.max(0, s) * 0.3 * amt;
  }

  /** Sit on a ledge: thighs forward, shins hanging by `knee` radians. */
  sit(seatY, knee = Math.PI / 2, spread = 0.08) {
    this.pelvis.position.y = seatY + 0.09;
    for (const l of Object.values(this.legs)) {
      l.hip.rotation.set(-Math.PI / 2 + 0.06, 0, l.sx * spread);
      l.knee.rotation.x = knee;
    }
  }

  /** Lie on the back (head toward local -Z); `roll` turns onto a side. */
  lie(roll = 0, lift = 0.17) {
    this.body.rotation.set(-Math.PI / 2, roll, 0, 'XYZ');
    this.body.position.set(0, lift + Math.abs(Math.sin(roll)) * 0.08, DIM.hip);
  }

  /** Bend at the waist with knees giving a little. k ≥ 0. */
  bend(k, kneeK = 0.5) {
    this.torso.rotation.x += k;
    const kb = k * kneeK;
    for (const l of Object.values(this.legs)) {
      l.hip.rotation.x -= kb;
      l.knee.rotation.x += kb * 2;
    }
    this.pelvis.position.y -= DIM.thigh * (1 - Math.cos(kb)) * 2;
    this.pelvis.position.z -= Math.sin(kb) * 0.12;
  }

  look(yaw = 0, pitch = 0, roll = 0) {
    this.neck.rotation.y += yaw;
    this.neck.rotation.x += pitch;
    this.neck.rotation.z += roll;
  }

  /** Update matrices from the root down (needed before IK / world queries). */
  sync() {
    this.root.updateMatrixWorld(true);
  }

  /**
   * Two-bone IK: put the hand of `side` ('L'|'R') at world point `target`.
   * `pole` (torso space) is where the elbow should point. weight blends with
   * the current FK pose. Call sync() after posing the body and before IK.
   */
  reach(side, target, weight = 1, pole = null) {
    if (weight <= 0) return;
    const arm = this.arms[side];
    const s = this.o.scale;
    const a = DIM.upper;
    const bLen = DIM.fore;
    this.torso.worldToLocal(_t.copy(target));
    _d.copy(_t).sub(arm.shoulder.position);
    let L = _d.length();
    const maxL = (a + bLen) * 0.999;
    const minL = Math.abs(a - bLen) + 0.02;
    L = clamp(L, minL, maxL);
    _dir.copy(_d).normalize();
    _pole.copy(pole ?? _defPole.set(arm.sx * 0.45, -0.55, -0.7));
    _perp.copy(_pole).addScaledVector(_dir, -_pole.dot(_dir));
    if (_perp.lengthSq() < 1e-6) _perp.set(0, -1, 0).addScaledVector(_dir, -_dir.y);
    _perp.normalize();
    const cosA = clamp((a * a + L * L - bLen * bLen) / (2 * a * L), -1, 1);
    const sinA = Math.sqrt(1 - cosA * cosA);
    _u.copy(_dir).multiplyScalar(cosA).addScaledVector(_perp, sinA);
    _x.crossVectors(_dir, _perp).normalize();
    _y.copy(_u).negate();
    _z.crossVectors(_x, _y);
    _m.makeBasis(_x, _y, _z);
    _q.setFromRotationMatrix(_m);
    // forearm direction in the upper-arm frame
    _e.copy(_dir).multiplyScalar(L).sub(_u.clone().multiplyScalar(a)).normalize();
    const fy = _e.dot(_y);
    const fz = _e.dot(_z);
    const theta = Math.atan2(-fz, -fy);
    if (weight >= 1) {
      arm.shoulder.quaternion.copy(_q);
      arm.elbow.rotation.set(theta, 0, 0);
    } else {
      arm.shoulder.quaternion.slerp(_q, weight);
      arm.elbow.rotation.set(lerp(arm.elbow.rotation.x, theta, weight), 0, 0);
    }
    void s;
  }
}

const _t = new THREE.Vector3();
const _d = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _pole = new THREE.Vector3();
const _defPole = new THREE.Vector3();
const _perp = new THREE.Vector3();
const _u = new THREE.Vector3();
const _x = new THREE.Vector3();
const _y = new THREE.Vector3();
const _z = new THREE.Vector3();
const _e = new THREE.Vector3();
const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();

export { SKIN };

// ---------------------------------------------------------------------------
// Props (each returns a Group with its pivot at the grip unless noted)
// ---------------------------------------------------------------------------

function propMesh(fn, cast = true) {
  const b = new Builder();
  fn(b);
  const m = new THREE.Mesh(b.geometry(), charMat);
  m.castShadow = cast;
  return m;
}

/** Axe: grip at origin, handle along +Y (0.85), blade at the top facing +Z. */
export function makeAxe() {
  const g = new THREE.Group();
  g.add(
    propMesh((b) => {
      b.add(cyl(0.028, 0.032, 0.9, 6), 0x9c6d42, { p: [0, 0.42, 0] });
      b.add(box(0.05, 0.16, 0.24), 0x8c939e, { p: [0, 0.8, 0.1] });
      b.add(box(0.04, 0.22, 0.06), 0xc8ced6, { p: [0, 0.8, 0.24] });
    }),
  );
  return g;
}

/** Hoe: grip at origin, handle along +Y (1.3), blade at the top pointing +Z. */
export function makeHoe() {
  const g = new THREE.Group();
  g.add(
    propMesh((b) => {
      b.add(cyl(0.025, 0.028, 1.35, 6), 0x9c6d42, { p: [0, 0.62, 0] });
      b.add(box(0.2, 0.05, 0.16), 0x8c939e, { p: [0, 1.28, 0.08] });
    }),
  );
  return g;
}

/** Hammer: grip at origin, head along +Y. */
export function makeHammer() {
  const g = new THREE.Group();
  g.add(
    propMesh((b) => {
      b.add(cyl(0.022, 0.025, 0.42, 6), 0x7a5232, { p: [0, 0.16, 0] });
      b.add(box(0.1, 0.1, 0.2), 0x4b4f58, { p: [0, 0.38, 0] });
    }),
  );
  return g;
}

/** Tongs holding a glowing work-piece; returns { group, piece }. */
export function makeTongs() {
  const g = new THREE.Group();
  g.add(
    propMesh((b) => {
      b.add(box(0.025, 0.025, 0.55), 0x3e4148, { p: [0.02, 0, 0.27], r: [0, 0.04, 0] });
      b.add(box(0.025, 0.025, 0.55), 0x3e4148, { p: [-0.02, 0, 0.27], r: [0, -0.04, 0] });
    }),
  );
  const piece = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.3), new THREE.MeshStandardMaterial({ color: 0x55585e, emissive: 0xff6a1a, emissiveIntensity: 1, roughness: 0.5 }));
  piece.position.z = 0.66;
  g.add(piece);
  return { group: g, piece };
}

/** Bow held at the grip; string drawn as a thin bar. */
export function makeBow() {
  const g = new THREE.Group();
  g.add(
    propMesh((b) => {
      const arc = new THREE.TorusGeometry(0.5, 0.022, 4, 12, 1.9);
      b.add(arc, 0x7a4a2a, { p: [-0.42, 0, 0], r: [0, 0, -0.95] });
      b.add(box(0.008, 0.78, 0.008), 0xf2ead8, { p: [-0.24, 0, 0] });
    }),
  );
  return g;
}

/** Spear: grip at origin, shaft along +Y. */
export function makeSpear() {
  const g = new THREE.Group();
  g.add(
    propMesh((b) => {
      b.add(cyl(0.025, 0.025, 2.3, 6), 0x7a5232, { p: [0, 0.6, 0] });
      b.add(cone(0.06, 0.26, 5), 0xc8ced6, { p: [0, 1.88, 0] });
    }),
  );
  return g;
}

/** Kite shield facing +Z. */
export function makeShield(color = 0x2f57a5) {
  const g = new THREE.Group();
  g.add(
    propMesh((b) => {
      b.add(cyl(0.3, 0.3, 0.05, 10), color, { r: [Math.PI / 2, 0, 0], s: [1, 1, 1.25] });
      b.add(cyl(0.31, 0.31, 0.04, 10), 0xd9c27a, { p: [0, 0, -0.005], r: [Math.PI / 2, 0, 0], s: [1, 1, 1.25] });
      b.add(ico(0.07, 0), 0xf4c542, { p: [0, 0, 0.04] });
    }),
  );
  return g;
}

/** Fishing rod: grip at origin, rod along +Y (2.4); tip at userData.tip. */
export function makeRod() {
  const g = new THREE.Group();
  g.add(
    propMesh((b) => {
      b.add(cyl(0.012, 0.03, 2.4, 5), 0x8a5a33, { p: [0, 1.0, 0] });
      b.add(cyl(0.045, 0.045, 0.08, 7), 0x4b4f58, { p: [0, -0.05, 0.04], r: [0, 0, Math.PI / 2] });
    }),
  );
  g.userData.tip = new THREE.Vector3(0, 2.2, 0);
  return g;
}

/** Wicker basket with a handle; origin at the base centre. */
export function makeBasket({ r = 0.2, h = 0.2, fill = null, handle = true } = {}) {
  const g = new THREE.Group();
  g.add(
    propMesh((b) => {
      b.add(cyl(r, r * 0.8, h, 9), 0xb48f60, { p: [0, h / 2, 0] });
      b.add(cyl(r + 0.015, r + 0.015, 0.03, 9), 0x8a6a40, { p: [0, h, 0] });
      if (handle) b.add(new THREE.TorusGeometry(r * 0.9, 0.015, 4, 10, Math.PI), 0x8a6a40, { p: [0, h, 0] });
      if (fill === 'bread') {
        for (let i = 0; i < 3; i++) b.add(capsule(0.05, 0.18, 2, 6), 0xd99a4a, { p: [(i - 1) * 0.1, h + 0.04, 0], r: [Math.PI / 2, 0.3 * (i - 1), Math.PI / 2] });
        b.add(sphere(0.07, 7, 5), 0xc9853c, { p: [0.05, h + 0.07, 0.08] });
      }
      if (fill === 'laundry') {
        b.add(sphere(r * 0.85, 8, 5), 0xf2f0ea, { p: [0, h, 0], s: [1, 0.45, 1] });
        b.add(sphere(r * 0.5, 7, 5), 0x6f9fd8, { p: [r * 0.3, h + 0.04, 0], s: [1, 0.5, 1] });
      }
    }),
  );
  return g;
}

/** Wooden bucket; origin at base centre; returns { group, water }. */
export function makeBucket() {
  const g = new THREE.Group();
  g.add(
    propMesh((b) => {
      b.add(cyl(0.15, 0.12, 0.26, 9, true), 0x9c6d42, { p: [0, 0.13, 0] });
      const inner = cyl(0.14, 0.11, 0.26, 9, true);
      inner.scale(-1, 1, 1);
      b.add(inner, 0x7a5232, { p: [0, 0.13, 0] });
      b.add(cyl(0.12, 0.12, 0.02, 9), 0x7a5232, { p: [0, 0.01, 0] });
      for (const y of [0.05, 0.22]) b.add(cyl(0.152, 0.152, 0.025, 9, true), 0x4b4f58, { p: [0, y, 0] });
      b.add(new THREE.TorusGeometry(0.15, 0.01, 4, 10, Math.PI), 0x4b4f58, { p: [0, 0.26, 0] });
    }),
  );
  const water = new THREE.Mesh(new THREE.CircleGeometry(0.135, 10).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x5ec4e8, roughness: 0.2 }));
  water.position.y = 0.2;
  g.add(water);
  return { group: g, water };
}
