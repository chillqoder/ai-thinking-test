// Low-poly animals built from vertex-coloured primitives, each exposing a few
// pose controls (walk, head, tail, wings) that the behaviours drive.

import * as THREE from 'three';
import { Builder, box, cyl, cone, ico, sphere, capsule } from '../core/geo.js';
import { charMat } from '../core/materials.js';
import { TAU } from '../core/loop.js';

function mesh(fn) {
  const b = new Builder();
  fn(b);
  const m = new THREE.Mesh(b.geometry(), charMat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function grp(parent, x = 0, y = 0, z = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  parent.add(g);
  return g;
}

/** Four-legged walk: diagonal pairs move together. */
function quadWalk(legs, phase, amt, swing = 0.5) {
  const s = Math.sin(TAU * phase) * swing * amt;
  legs[0].rotation.x = s; // front-left
  legs[3].rotation.x = s; // back-right
  legs[1].rotation.x = -s; // front-right
  legs[2].rotation.x = -s; // back-left
}

// ---------------------------------------------------------------------------

export class Pig {
  constructor({ scale = 1, color = 0xf4aaa2, spots = false } = {}) {
    this.root = new THREE.Group();
    this.root.userData.rig = true;
    this.root.scale.setScalar(scale);
    this.body = grp(this.root, 0, 0.5, 0);
    const dark = new THREE.Color(color).multiplyScalar(0.82);
    this.body.add(
      mesh((b) => {
        b.add(sphere(0.36, 10, 8), color, { s: [1, 0.86, 1.35] });
        if (spots) b.add(sphere(0.16, 7, 5), 0x6a4a3a, { p: [0.18, 0.15, -0.1], s: [1, 0.6, 1.2] });
      }),
    );
    this.head = grp(this.body, 0, 0.06, 0.42);
    this.head.add(
      mesh((b) => {
        b.add(sphere(0.24, 9, 7), color, { p: [0, 0, 0.1] });
        b.add(cyl(0.11, 0.12, 0.1, 9), dark, { p: [0, -0.03, 0.33], r: [Math.PI / 2, 0, 0] });
        for (const s of [-1, 1]) {
          b.add(sphere(0.022, 4, 3), 0x5a3030, { p: [s * 0.045, -0.03, 0.385] });
          b.add(sphere(0.03, 5, 4), 0x22181a, { p: [s * 0.1, 0.08, 0.28] });
          b.add(cone(0.08, 0.14, 4), dark, { p: [s * 0.14, 0.2, 0.06], r: [0.5, 0, s * -0.4] });
        }
      }),
    );
    this.snout = this.head;
    this.tail = grp(this.body, 0, 0.1, -0.47);
    this.tail.add(
      mesh((b) => {
        b.add(new THREE.TorusGeometry(0.06, 0.018, 4, 9, Math.PI * 1.6), color, { p: [0, 0.03, -0.04], r: [0, Math.PI / 2, 0] });
      }),
    );
    this.legs = [];
    for (const [x, z] of [
      [0.17, 0.25],
      [-0.17, 0.25],
      [0.17, -0.27],
      [-0.17, -0.27],
    ]) {
      const leg = grp(this.body, x, -0.18, z);
      leg.add(
        mesh((b) => {
          b.add(cyl(0.07, 0.065, 0.3, 6), color, { p: [0, -0.15, 0] });
          b.add(cyl(0.068, 0.068, 0.05, 6), 0x5a3a30, { p: [0, -0.3, 0] });
        }),
      );
      this.legs.push(leg);
    }
  }
  reset() {
    this.body.position.set(0, 0.5, 0);
    this.body.rotation.set(0, 0, 0);
    this.head.rotation.set(0, 0, 0);
    this.head.scale.set(1, 1, 1);
    this.tail.rotation.set(0, 0, 0);
    this.legs.forEach((l) => l.rotation.set(0, 0, 0));
    return this;
  }
  walk(phase, amt) {
    quadWalk(this.legs, phase, amt, 0.55);
    this.body.position.y += Math.abs(Math.sin(TAU * phase)) * 0.03 * amt;
  }
  /** Lie on one side in the mud; k 0..1. */
  flop(k, side = 1) {
    this.body.rotation.z = side * k * 1.35;
    this.body.position.y = 0.5 - k * 0.2;
    this.legs.forEach((l, i) => (l.rotation.x = k * (i < 2 ? -0.5 : 0.5)));
  }
}

export class Cow {
  constructor({ scale = 1, patches = 0x2a2420 } = {}) {
    this.root = new THREE.Group();
    this.root.userData.rig = true;
    this.root.scale.setScalar(scale);
    this.body = grp(this.root, 0, 1.0, 0);
    this.body.add(
      mesh((b) => {
        b.add(capsule(0.42, 0.8, 4, 9), 0xf7f3ea, { r: [Math.PI / 2, 0, 0], s: [1, 1, 0.95] });
        b.add(sphere(0.2, 7, 5), patches, { p: [0.3, 0.15, 0.2], s: [0.6, 1, 1.3] });
        b.add(sphere(0.24, 7, 5), patches, { p: [-0.28, 0.05, -0.35], s: [0.6, 1.1, 1.4] });
        b.add(sphere(0.18, 7, 5), patches, { p: [0.05, 0.38, -0.1], s: [1.4, 0.5, 1.2] });
        b.add(sphere(0.14, 7, 5), 0xf2a6b0, { p: [0, -0.38, -0.35], s: [1, 0.7, 1] });
      }),
    );
    this.head = grp(this.body, 0, 0.22, 0.72);
    this.head.add(
      mesh((b) => {
        b.add(box(0.36, 0.36, 0.5), 0xf7f3ea, { p: [0, 0, 0.18] });
        b.add(box(0.38, 0.22, 0.18), 0xf2b8b0, { p: [0, -0.09, 0.45] });
        b.add(box(0.37, 0.16, 0.2), patches, { p: [0, 0.12, 0.08] });
        for (const s of [-1, 1]) {
          b.add(sphere(0.035, 5, 4), 0x1d1614, { p: [s * 0.16, 0.06, 0.32] });
          b.add(cone(0.045, 0.2, 5), 0xf0e2c0, { p: [s * 0.19, 0.24, 0.12], r: [0, 0, s * -0.6] });
          b.add(box(0.18, 0.05, 0.1), 0xf7f3ea, { p: [s * 0.25, 0.1, 0.08], r: [0, 0, s * 0.3] });
          b.add(sphere(0.02, 4, 3), 0x5a3030, { p: [s * 0.07, -0.1, 0.545] });
        }
      }),
    );
    this.jaw = this.head;
    this.tail = grp(this.body, 0, 0.25, -0.82);
    this.tail.add(
      mesh((b) => {
        b.add(cyl(0.025, 0.02, 0.7, 4), 0xf7f3ea, { p: [0, -0.35, 0] });
        b.add(sphere(0.06, 5, 4), patches, { p: [0, -0.72, 0], s: [1, 1.6, 1] });
      }),
    );
    this.legs = [];
    for (const [x, z] of [
      [0.24, 0.48],
      [-0.24, 0.48],
      [0.24, -0.5],
      [-0.24, -0.5],
    ]) {
      const leg = grp(this.body, x, -0.25, z);
      leg.add(
        mesh((b) => {
          b.add(cyl(0.09, 0.08, 0.72, 6), 0xf7f3ea, { p: [0, -0.36, 0] });
          b.add(cyl(0.085, 0.09, 0.09, 6), 0x3a302a, { p: [0, -0.73, 0] });
        }),
      );
      this.legs.push(leg);
    }
  }
  reset() {
    this.body.position.set(0, 1.0, 0);
    this.body.rotation.set(0, 0, 0);
    this.head.rotation.set(0, 0, 0);
    this.tail.rotation.set(0, 0, 0);
    this.legs.forEach((l) => l.rotation.set(0, 0, 0));
    return this;
  }
  walk(phase, amt) {
    quadWalk(this.legs, phase, amt, 0.38);
    this.body.rotation.z = Math.sin(TAU * phase) * 0.03 * amt;
  }
}

export class Chicken {
  constructor({ color = 0xfaf6ee, scale = 1 } = {}) {
    this.root = new THREE.Group();
    this.root.userData.rig = true;
    this.root.scale.setScalar(scale);
    this.body = grp(this.root, 0, 0.24, 0);
    this.body.add(
      mesh((b) => {
        b.add(sphere(0.16, 8, 6), color, { s: [0.88, 0.9, 1.15] });
        b.add(cone(0.09, 0.2, 5), color, { p: [0, 0.1, -0.17], r: [-0.8, 0, 0] });
      }),
    );
    this.head = grp(this.body, 0, 0.12, 0.13);
    this.head.add(
      mesh((b) => {
        b.add(sphere(0.075, 7, 5), color, { p: [0, 0.06, 0.02] });
        b.add(box(0.025, 0.06, 0.09), 0xd8333a, { p: [0, 0.14, 0.02] });
        b.add(cone(0.028, 0.07, 4), 0xf4b13a, { p: [0, 0.05, 0.11], r: [Math.PI / 2, 0, 0] });
        b.add(sphere(0.022, 4, 3), 0xd8333a, { p: [0, 0.0, 0.08], s: [1, 1.5, 1] });
        for (const s of [-1, 1]) b.add(sphere(0.014, 4, 3), 0x1d1614, { p: [s * 0.05, 0.08, 0.06] });
      }),
    );
    this.wings = [1, -1].map((s) => {
      const w = grp(this.body, s * 0.13, 0.03, 0);
      w.add(mesh((b) => b.add(sphere(0.1, 6, 4), new THREE.Color(color).multiplyScalar(0.92), { p: [s * 0.01, -0.02, -0.02], s: [0.35, 0.7, 1.2] })));
      w.userData.s = s;
      return w;
    });
    this.legs = [1, -1].map((s) => {
      const l = grp(this.body, s * 0.06, -0.1, 0);
      l.add(
        mesh((b) => {
          b.add(cyl(0.012, 0.012, 0.14, 3), 0xf4b13a, { p: [0, -0.07, 0] });
          b.add(box(0.06, 0.01, 0.07), 0xf4b13a, { p: [0, -0.14, 0.02] });
        }),
      );
      return l;
    });
  }
  reset() {
    this.body.position.set(0, 0.24, 0);
    this.body.rotation.set(0, 0, 0);
    this.head.rotation.set(0, 0, 0);
    this.head.position.set(0, 0.12, 0.13);
    this.wings.forEach((w) => w.rotation.set(0, 0, 0));
    this.legs.forEach((l) => l.rotation.set(0, 0, 0));
    return this;
  }
  /** Peck: k 0..1 dips the head to the ground. */
  peck(k) {
    this.body.rotation.x = k * 0.55;
    this.head.rotation.x = k * 0.7;
  }
  walk(phase, amt, run = 0) {
    const s = Math.sin(TAU * phase);
    this.legs[0].rotation.x = s * 0.6 * amt;
    this.legs[1].rotation.x = -s * 0.6 * amt;
    this.body.position.y += Math.abs(s) * 0.03 * amt;
    this.head.position.z = 0.13 + Math.sin(TAU * phase * 2) * 0.025 * amt;
    this.body.rotation.x += run * 0.25;
  }
  flap(k, phase) {
    for (const w of this.wings) w.rotation.z = -w.userData.s * k * (0.4 + 0.6 * Math.abs(Math.sin(TAU * phase)));
  }
}

export class Dog {
  constructor({ color = 0xb07a45, dark = 0x7a4f2a } = {}) {
    this.root = new THREE.Group();
    this.root.userData.rig = true;
    this.body = grp(this.root, 0, 0.42, 0);
    this.body.add(
      mesh((b) => {
        b.add(capsule(0.15, 0.42, 3, 8), color, { r: [Math.PI / 2, 0, 0] });
        b.add(sphere(0.13, 7, 5), 0xf2e6d0, { p: [0, -0.04, 0.2], s: [0.9, 0.9, 1] });
      }),
    );
    this.head = grp(this.body, 0, 0.14, 0.32);
    this.head.add(
      mesh((b) => {
        b.add(sphere(0.14, 8, 6), color, { p: [0, 0.06, 0.04] });
        b.add(box(0.12, 0.1, 0.16), 0xf2e6d0, { p: [0, 0.01, 0.17] });
        b.add(sphere(0.03, 5, 4), 0x1d1614, { p: [0, 0.05, 0.26] });
        for (const s of [-1, 1]) {
          b.add(sphere(0.022, 4, 3), 0x1d1614, { p: [s * 0.065, 0.1, 0.13] });
          b.add(box(0.05, 0.15, 0.09), dark, { p: [s * 0.12, 0.08, -0.01], r: [0, 0, s * 0.35] });
        }
      }),
    );
    this.tongue = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.015, 0.08), new THREE.MeshStandardMaterial({ color: 0xe86a7a }));
    this.tongue.position.set(0, -0.04, 0.24);
    this.head.add(this.tongue);
    this.tail = grp(this.body, 0, 0.08, -0.34);
    this.tail.add(mesh((b) => b.add(capsule(0.03, 0.2, 2, 5), color, { p: [0, 0.12, 0] })));
    this.legs = [];
    for (const [x, z] of [
      [0.09, 0.2],
      [-0.09, 0.2],
      [0.09, -0.2],
      [-0.09, -0.2],
    ]) {
      const leg = grp(this.body, x, -0.08, z);
      leg.add(mesh((b) => b.add(capsule(0.045, 0.24, 2, 5), color, { p: [0, -0.17, 0] })));
      this.legs.push(leg);
    }
  }
  reset() {
    this.body.position.set(0, 0.42, 0);
    this.body.rotation.set(0, 0, 0);
    this.head.rotation.set(0, 0, 0);
    this.tail.rotation.set(-0.5, 0, 0);
    this.legs.forEach((l) => l.rotation.set(0, 0, 0));
    this.tongue.visible = false;
    return this;
  }
  /** Gallop: front pair and back pair move together, body rocks. */
  run(phase, amt) {
    const s = Math.sin(TAU * phase);
    const c = Math.cos(TAU * phase);
    this.legs[0].rotation.x = this.legs[1].rotation.x = s * 0.9 * amt;
    this.legs[2].rotation.x = this.legs[3].rotation.x = -s * 0.9 * amt;
    this.body.rotation.x = c * 0.12 * amt;
    this.body.position.y += Math.abs(c) * 0.08 * amt;
    this.tongue.visible = amt > 0.3;
  }
  /** Sit (k 0..1): rump down, front legs straight. */
  sit(k) {
    this.body.rotation.x -= k * 0.55;
    this.body.position.y -= k * 0.12;
    this.body.position.z -= k * 0.05;
    this.legs[2].rotation.x = this.legs[3].rotation.x = -k * 1.1;
    this.legs[0].rotation.x = this.legs[1].rotation.x = k * 0.5;
    this.head.rotation.x += k * 0.45;
  }
  /** Lie down (k 0..1). */
  down(k) {
    this.body.position.y -= k * 0.28;
    this.legs.forEach((l, i) => (l.rotation.x = (i < 2 ? -1.3 : 1.3) * k));
  }
}

export class Bird {
  constructor({ color = 0xffffff, wing = 0xe8eef4, tip = 0x4a4f58, scale = 1 } = {}) {
    this.root = new THREE.Group();
    this.root.userData.rig = true;
    this.root.scale.setScalar(scale);
    this.root.add(
      mesh((b) => {
        b.add(capsule(0.08, 0.22, 2, 6), color, { r: [Math.PI / 2, 0, 0] });
        b.add(sphere(0.07, 6, 5), color, { p: [0, 0.03, 0.2] });
        b.add(cone(0.025, 0.09, 4), 0xf4b13a, { p: [0, 0.02, 0.29], r: [Math.PI / 2, 0, 0] });
        b.add(cone(0.06, 0.14, 4), color, { p: [0, 0, -0.22], r: [-Math.PI / 2, 0, 0], s: [1.6, 1, 0.3] });
      }),
    );
    this.wings = [1, -1].map((s) => {
      const w = grp(this.root, s * 0.05, 0.03, 0.02);
      w.add(
        mesh((b) => {
          b.add(box(0.36, 0.02, 0.18), wing, { p: [s * 0.18, 0, 0] });
          b.add(box(0.24, 0.018, 0.13), tip, { p: [s * 0.46, 0, -0.03], r: [0, s * 0.15, 0] });
        }),
      );
      w.userData.s = s;
      return w;
    });
  }
  flap(angle) {
    for (const w of this.wings) w.rotation.z = w.userData.s * angle;
  }
}

export class Duck {
  constructor({ drake = true } = {}) {
    this.root = new THREE.Group();
    this.root.userData.rig = true;
    this.body = grp(this.root, 0, 0.08, 0);
    this.body.add(
      mesh((b) => {
        b.add(sphere(0.18, 8, 6), drake ? 0xd9d2c4 : 0xa98563, { s: [0.85, 0.7, 1.25] });
        b.add(cone(0.08, 0.16, 4), drake ? 0x3a3a3a : 0x8a6a4a, { p: [0, 0.06, -0.24], r: [-1.1, 0, 0] });
        for (const s of [-1, 1]) b.add(sphere(0.1, 6, 4), drake ? 0x8a8a8a : 0x8a6a4a, { p: [s * 0.1, 0.04, -0.02], s: [0.4, 0.6, 1.3] });
      }),
    );
    this.head = grp(this.body, 0, 0.14, 0.16);
    this.head.add(
      mesh((b) => {
        b.add(sphere(0.08, 7, 5), drake ? 0x2f7a4a : 0xa98563, { p: [0, 0.04, 0] });
        b.add(box(0.06, 0.025, 0.1), 0xf4a03a, { p: [0, 0.02, 0.1] });
        for (const s of [-1, 1]) b.add(sphere(0.012, 4, 3), 0x111111, { p: [s * 0.05, 0.07, 0.04] });
      }),
    );
  }
}

/** A small fish (for the fisherman's catch). */
export function makeFish() {
  return mesh((b) => {
    b.add(sphere(0.08, 7, 5), 0xe8a050, { s: [0.6, 1, 2.2] });
    b.add(cone(0.08, 0.1, 4), 0xd0803a, { p: [0, 0, -0.22], r: [-Math.PI / 2, 0, 0], s: [0.3, 1, 1] });
    for (const s of [-1, 1]) b.add(sphere(0.015, 4, 3), 0x111111, { p: [s * 0.04, 0.02, 0.13] });
  });
}
