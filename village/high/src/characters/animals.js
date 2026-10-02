// Pigs, cows, chickens and the dog that chases them.
import * as THREE from 'three';
import { TAU, LOOP, ph, osc, track, walkEase } from '../core/util.js';
import { geo, mesh, group } from '../core/kit.js';
import { enableShadows } from './rig.js';
import { place, loopMover, segmentMover } from './common.js';
import { getHeight } from '../world/terrain.js';
import { MUD, PIGPEN, MEADOW, CHASE, COOP } from '../world/layout.js';

// ---------- builders ----------
function legs4(parent, color, hoof, w, l, y, len, r = 0.07) {
  return [[-1, 1], [1, 1], [-1, -1], [1, -1]].map(([sx, sz]) => {
    const g = group(parent, [sx * w, y, sz * l]);
    g.add(mesh(geo.cyl(r, r * 0.85, len, 6), color, [0, -len / 2, 0]));
    if (hoof) g.add(mesh(geo.cyl(r * 0.9, r, 0.06, 6), hoof, [0, -len + 0.03, 0]));
    return g;
  });
}

function makePig() {
  const root = new THREE.Group();
  const body = group(root, [0, 0.42, 0]);
  body.add(mesh(geo.ico(0.5, 1), '#f2a9a0', [0, 0, 0], [0, 0, 0], [0.78, 0.66, 1.1]));
  const head = group(body, [0, 0.08, 0.5]);
  head.add(mesh(geo.ico(0.27, 1), '#f2a9a0', [0, 0, 0.05]));
  head.add(mesh(geo.cyl(0.12, 0.13, 0.12, 8), '#e8857c', [0, -0.03, 0.31], [Math.PI / 2, 0, 0]));
  for (const s of [-1, 1]) {
    head.add(mesh(geo.box(0.03, 0.04, 0.02), '#5a2d2a', [s * 0.045, -0.03, 0.375]));
    head.add(mesh(geo.box(0.04, 0.05, 0.02), '#2a1d16', [s * 0.12, 0.08, 0.27]));
    head.add(mesh(geo.cone(0.08, 0.16, 4), '#e8938a', [s * 0.15, 0.24, 0.0], [-0.4, 0, s * 0.5]));
  }
  const legs = legs4(body, '#eb9a90', '#6b4a3a', 0.2, 0.3, -0.15, 0.3);
  const tail = group(body, [0, 0.14, -0.55]);
  tail.add(mesh(geo.torus(0.06, 0.022, 4, 8), '#eb9a90', [0, 0.04, -0.03], [0, Math.PI / 2, 0]));
  enableShadows(root);
  return { root, body, head, legs, tail };
}

function makeCow(spots = '#2a2522') {
  const root = new THREE.Group();
  const body = group(root, [0, 1.0, 0]);
  body.add(mesh(geo.box(0.78, 0.72, 1.55), '#f4f1ea'));
  const spotDefs = [[0.395, 0.1, 0.3, 0.3, 0.42], [-0.395, -0.05, -0.25, 0.36, 0.3], [0.2, 0.365, -0.4, 0.3, 0.32], [-0.395, 0.18, 0.45, 0.22, 0.28], [0.395, -0.12, -0.45, 0.26, 0.24]];
  for (const [x, y, z, a, b] of spotDefs) {
    const isTop = Math.abs(y) > 0.3;
    body.add(mesh(geo.box(isTop ? a : 0.02, isTop ? 0.02 : a, b), spots, [x, y, z]));
  }
  body.add(mesh(geo.sphere(0.16, 8, 5), '#f2a9b4', [0, -0.38, -0.35], [0, 0, 0], [1.2, 0.8, 1]));
  const neck = group(body, [0, 0.18, 0.75]);
  const head = group(neck);
  head.add(mesh(geo.box(0.42, 0.42, 0.52), '#f4f1ea', [0, 0, 0.24]));
  head.add(mesh(geo.box(0.4, 0.26, 0.2), '#f2b8b0', [0, -0.08, 0.55]));
  head.add(mesh(geo.box(0.44, 0.14, 0.2), spots, [0, 0.15, 0.12]));
  for (const s of [-1, 1]) {
    head.add(mesh(geo.cone(0.05, 0.22, 5), '#efe6c8', [s * 0.18, 0.28, 0.1], [0, 0, -s * 0.5]));
    head.add(mesh(geo.box(0.2, 0.08, 0.12), '#f4f1ea', [s * 0.3, 0.12, 0.08], [0, 0, s * 0.4]));
    head.add(mesh(geo.box(0.04, 0.06, 0.02), '#2a1d16', [s * 0.15, 0.06, 0.505]));
  }
  const legs = legs4(body, '#f4f1ea', '#3b302a', 0.27, 0.6, -0.3, 0.7, 0.09);
  const tail = group(body, [0, 0.3, -0.78]);
  tail.add(mesh(geo.cyl(0.025, 0.025, 0.75, 4), '#f4f1ea', [0, -0.375, 0]));
  tail.add(mesh(geo.ico(0.07), spots, [0, -0.77, 0]));
  enableShadows(root);
  return { root, body, neck, head, legs, tail };
}

function makeChicken(color = '#fbf7ef') {
  const root = new THREE.Group();
  const body = group(root, [0, 0.27, 0]);
  body.add(mesh(geo.ico(0.17, 1), color, [0, 0, 0], [0, 0, 0], [0.9, 0.85, 1.2]));
  body.add(mesh(geo.cone(0.1, 0.22, 4), color, [0, 0.1, -0.2], [-0.8, 0, 0]));
  const head = group(body, [0, 0.12, 0.15]);
  head.add(mesh(geo.ico(0.085, 0), color, [0, 0.07, 0.03]));
  head.add(mesh(geo.box(0.025, 0.07, 0.1), '#d8352a', [0, 0.16, 0.03]));
  head.add(mesh(geo.cone(0.03, 0.08, 4), '#f0a92e', [0, 0.06, 0.13], [Math.PI / 2, 0, 0]));
  head.add(mesh(geo.box(0.02, 0.05, 0.03), '#d8352a', [0, 0.01, 0.1]));
  const wings = [-1, 1].map((s) => {
    const w = group(body, [s * 0.13, 0.03, 0]);
    w.add(mesh(geo.box(0.03, 0.12, 0.22), color, [s * 0.01, -0.04, -0.02]));
    return w;
  });
  const legs = [-1, 1].map((s) => {
    const g = group(root, [s * 0.06, 0.16, 0]);
    g.add(mesh(geo.cyl(0.015, 0.015, 0.16, 4), '#f0a92e', [0, -0.08, 0]));
    g.add(mesh(geo.box(0.06, 0.015, 0.08), '#f0a92e', [0, -0.155, 0.02]));
    return g;
  });
  enableShadows(root);
  return { root, body, head, wings, legs };
}

function makeDog() {
  const root = new THREE.Group();
  const body = group(root, [0, 0.46, 0]);
  body.add(mesh(geo.box(0.3, 0.3, 0.72), '#b07a45'));
  body.add(mesh(geo.box(0.26, 0.12, 0.5), '#f1e3c8', [0, -0.12, 0.05]));
  const head = group(body, [0, 0.2, 0.38]);
  head.add(mesh(geo.box(0.28, 0.26, 0.26), '#b07a45', [0, 0.02, 0.06]));
  head.add(mesh(geo.box(0.16, 0.13, 0.18), '#f1e3c8', [0, -0.04, 0.24]));
  head.add(mesh(geo.box(0.07, 0.06, 0.04), '#2a1d16', [0, 0.0, 0.34]));
  for (const s of [-1, 1]) {
    head.add(mesh(geo.box(0.06, 0.18, 0.1), '#6b4226', [s * 0.15, 0.04, 0.0], [0, 0, s * 0.25]));
    head.add(mesh(geo.box(0.035, 0.04, 0.02), '#2a1d16', [s * 0.07, 0.08, 0.19]));
  }
  const legs = legs4(body, '#b07a45', null, 0.1, 0.27, -0.12, 0.34, 0.05);
  const tail = group(body, [0, 0.1, -0.36]);
  tail.add(mesh(geo.cyl(0.03, 0.02, 0.32, 4), '#b07a45', [0, 0.16, 0]));
  tail.rotation.x = -0.6;
  enableShadows(root);
  return { root, body, head, legs, tail };
}

/** Diagonal-pair walk for quadrupeds: phase in cycles. */
function trot(legs, phase, amt, amp = 0.5) {
  const s = Math.sin(TAU * phase) * amp * amt;
  legs[0].rotation.x = s;
  legs[3].rotation.x = s;
  legs[1].rotation.x = -s;
  legs[2].rotation.x = -s;
}

export function buildAnimals() {
  const root = new THREE.Group();
  const ups = [];

  // ---------------- pigs ----------------
  {
    const lying = makePig();
    const snorter = makePig();
    const walker = makePig();
    root.add(lying.root, snorter.root, walker.root);
    const lx = MUD.x + 0.9;
    const lz = MUD.z - 0.5;
    const sx = MUD.x - 2.2;
    const sz = MUD.z - 1.4;
    const ex = PIGPEN.x;
    const ez = PIGPEN.z;
    const ellipse = Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * TAU;
      return [ex + Math.cos(a) * 3.4, ez + Math.sin(a) * 2.6];
    });
    const mover = loopMover(ellipse, 2, { stride: 0.55 });
    ups.push((t) => {
      // lying in the mud, rocking and kicking happily
      lying.body.rotation.set(0, 0, 1.35 + 0.18 * osc(t, 5));
      lying.body.position.y = 0.3;
      const kick = Math.max(0, osc(t, 6, 0.3)) ** 2;
      lying.legs.forEach((l, i) => (l.rotation.x = 0.4 * kick * Math.sin(TAU * ph(t, 60, i * 0.25))));
      lying.tail.rotation.z = 0.5 * osc(t, 90);
      place(lying, lx, lz, -0.6, getHeight(lx, lz) - 0.02);

      // snorting at the peasant
      const snort = Math.max(0, osc(t, 12)) ** 10;
      snorter.head.rotation.x = -0.35 * snort + 0.12 * Math.max(0, osc(t, 5, 0.4));
      snorter.head.rotation.y = 0.2 * osc(t, 3);
      snorter.body.position.y = 0.42 + 0.03 * snort;
      snorter.head.scale.set(1, 1, 1 + 0.06 * snort);
      snorter.tail.rotation.z = 0.7 * osc(t, 120);
      place(snorter, sx, sz, 0.75);

      // a pig strolling round the pen
      const m = mover(t);
      trot(walker.legs, m.phase, 1, 0.55);
      walker.body.position.y = 0.42 + 0.02 * Math.abs(Math.sin(TAU * m.phase));
      walker.head.rotation.x = 0.25 + 0.15 * osc(t, 8);
      walker.tail.rotation.z = 0.6 * osc(t, 110, 0.2);
      place(walker, m.x, m.z, m.yaw);
    });
  }

  // ---------------- cows ----------------
  {
    const grazer = makeCow();
    const wanderer = makeCow('#6b4226');
    const rester = makeCow();
    root.add(grazer.root, wanderer.root, rester.root);
    const gx = MEADOW.x;
    const gz = MEADOW.z;
    const graze = (c, u, off) =>
      track((u + off) % 1, [[0, 0.95], [0.3, 0.95], [0.36, 0.05], [0.5, 0.05], [0.56, 0.95], [0.78, 0.95], [0.82, 0.3], [0.9, 0.3], [0.94, 0.95]]);
    const sKeys = [[0, 0, walkEase], [0.3, 1], [0.5, 1, walkEase], [0.8, 0]];
    const wmove = segmentMover(gx + 2.5, gz + 3.2, gx + 6.5, gz + 1.0, 1, sKeys, { cruise: 0.18 });
    const wyaw = Math.atan2(4, -2.2);
    ups.push((t) => {
      const u = ph(t, 1);
      // grazer: head down munching, lifts it now and then
      const n = graze(grazer, u, 0);
      grazer.neck.rotation.x = n * 0.95;
      grazer.head.rotation.z = 0.06 * osc(t, 50) * n;
      grazer.head.rotation.y = 0.08 * osc(t, 25) * (1 - n);
      grazer.tail.rotation.z = 0.35 * osc(t, 24);
      grazer.tail.rotation.x = 0.15 + 0.1 * osc(t, 12);
      place(grazer, gx, gz, 2.4);

      // wanderer: ambles slowly back and forth, grazing at each end
      const st = wmove(t);
      trot(wanderer.legs, st.dist / 1.1, st.amt, 0.35);
      wanderer.neck.rotation.x = 0.25 + 0.6 * (1 - st.amt);
      wanderer.head.rotation.z = 0.05 * osc(t, 45) * (1 - st.amt);
      wanderer.tail.rotation.z = 0.35 * osc(t, 20, 0.3);
      const turn = track(st.u, [[0, 0], [0.3, 0], [0.4, Math.PI], [0.8, Math.PI], [0.9, TAU], [1, TAU]]);
      place(wanderer, st.x, st.z, wyaw + turn);

      // resting cow: lying down, chewing the cud
      rester.body.position.y = 0.55;
      rester.legs.forEach((l, i) => (l.rotation.x = i < 2 ? -1.45 : 1.45));
      rester.neck.rotation.x = -0.1;
      rester.head.rotation.z = 0.07 * osc(t, 70);
      rester.head.rotation.y = 0.35 * osc(t, 2, 0.1);
      rester.tail.rotation.z = 0.25 * osc(t, 15, 0.6);
      place(rester, gx - 3.2, gz + 3.4, 0.6);
    });
  }

  // ---------------- dog chasing chickens ----------------
  {
    const chased = [makeChicken(), makeChicken('#c8743a'), makeChicken()];
    const dog = makeDog();
    root.add(dog.root, ...chased.map((c) => c.root));
    const LAPS = 5;
    const radius = (a) => CHASE.r * (1 + 0.16 * Math.sin(3 * a + 0.5));
    const posAt = (a) => [CHASE.x + Math.sin(a) * radius(a), CHASE.z + Math.cos(a) * radius(a)];
    const circ = TAU * CHASE.r;
    const chickStrides = Math.round(circ / 0.28);
    const dogStrides = Math.round(circ / 0.9);
    const yawAt = (a) => {
      const [x0, z0] = posAt(a - 0.01);
      const [x1, z1] = posAt(a + 0.01);
      return Math.atan2(x1 - x0, z1 - z0);
    };
    ups.push((t) => {
      const lead = (TAU * LAPS * t) / LOOP;
      chased.forEach((c, i) => {
        const a = lead - i * 0.38 + 0.07 * osc(t, 7, i / 3);
        const [x, z] = posAt(a);
        const p = (a / TAU) * chickStrides;
        c.legs[0].rotation.x = 0.8 * Math.sin(TAU * p);
        c.legs[1].rotation.x = -0.8 * Math.sin(TAU * p);
        c.body.position.y = 0.27 + 0.04 * Math.abs(Math.sin(TAU * p));
        c.body.rotation.x = 0.25;
        const flap = 0.7 + 0.5 * osc(t, 240, i * 0.3);
        c.wings[0].rotation.z = -flap;
        c.wings[1].rotation.z = flap;
        c.head.rotation.x = -0.2;
        place(c, x, z, yawAt(a));
      });
      const lag = 1.15 + 0.25 * osc(t, 3);
      const ad = lead - lag;
      const [dx, dz] = posAt(ad);
      const p = (ad / TAU) * dogStrides;
      const s = Math.sin(TAU * p);
      // bounding gallop: front pair and back pair alternate
      dog.legs[0].rotation.x = dog.legs[1].rotation.x = 0.75 * s;
      dog.legs[2].rotation.x = dog.legs[3].rotation.x = -0.75 * s;
      dog.body.rotation.x = 0.12 * Math.cos(TAU * p);
      dog.body.position.y = 0.46 + 0.07 * Math.abs(Math.cos(TAU * p));
      dog.tail.rotation.z = 0.6 * osc(t, 150);
      dog.head.rotation.x = -0.15 + 0.12 * Math.max(0, osc(t, 20)) ** 6;
      place(dog, dx, dz, yawAt(ad));
    });
  }

  // ---------------- chickens pecking by the coop ----------------
  {
    const spots = [[-1.6, -1.8], [1.5, -2.1], [-0.6, -3.1], [2.6, -0.4], [-2.6, -0.2]];
    const hens = spots.map(([ox, oz], i) => ({ c: makeChicken(i % 2 ? '#d98a4a' : '#fbf7ef'), ox, oz, off: i * 0.21 }));
    for (const h of hens) root.add(h.c.root);
    ups.push((t) => {
      for (const h of hens) {
        const peck = Math.max(0, osc(t, 24 + Math.round(h.off * 20), h.off)) ** 6;
        h.c.head.rotation.x = 1.1 * peck;
        h.c.body.rotation.x = 0.35 * peck;
        const wx = 0.5 * Math.sin(TAU * (t / LOOP + h.off));
        const wz = 0.5 * Math.cos(TAU * (t / LOOP + h.off));
        const step = Math.max(0, osc(t, 30, h.off + 0.5));
        h.c.legs[0].rotation.x = 0.4 * Math.sin(TAU * ph(t, 90, h.off)) * step;
        h.c.legs[1].rotation.x = -0.4 * Math.sin(TAU * ph(t, 90, h.off)) * step;
        // facing along its slow wander circle, glancing about
        const yaw = TAU * (t / LOOP + h.off) + Math.PI / 2 + 0.6 * osc(t, 4, h.off);
        place(h.c, COOP.x + h.ox + wx, COOP.z + h.oz + wz, yaw);
      }
    });
  }

  return {
    root,
    update(t) {
      for (const u of ups) u(t);
    },
  };
}

