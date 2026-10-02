// Animals: grazing cows, chickens (and the dog that chases them round the
// haystack), birds circling the island, and ducks paddling on the pond.

import * as THREE from 'three';
import { Cow, Chicken, Dog, Bird, Duck } from './animals.js';
import { TAU, LOOP, osc, phase, local, track, lin, hold, hump, smooth, smoother, lerp, lerpAngle } from '../core/loop.js';
import { heightAt } from '../world/island.js';
import { PASTURE, YARD, POND, CASTLE } from '../world/layout.js';
import { makeRipple } from '../world/water.js';
import { CHASE } from './schedule.js';

// ---------------------------------------------------------------------------
// Cows
// ---------------------------------------------------------------------------

function buildCows(group) {
  const { x0, x1, z0, z1 } = PASTURE;
  const grazers = [
    { x: 15.6, z: -12.4, yaw: 0.2, off: 0, lift: [[0, 0], [9, 0], [10.5, 1], [15, 1], [16.5, 0], [40, 0], [41.5, 1], [44, 1], [45.5, 0]] },
    { x: 16.0, z: -19.2, yaw: 2.3, off: 0.4, lift: [[0, 0], [24, 0], [25.5, 1], [31, 1], [32.5, 0]] },
    { x: x1 - 2.5, z: z0 + 3.35, yaw: Math.PI, off: 0.7, lift: [[0, 0], [4, 0], [5.5, 1], [12, 1], [13.5, 0], [48, 0], [49.5, 1], [53, 1], [54.5, 0]] },
  ].map((d) => {
    const c = new Cow({ scale: 0.95 });
    group.add(c.root);
    return { c, ...d, liftT: track(d.lift) };
  });
  const walker = new Cow({ scale: 1.0, patches: 0x6a4028 });
  group.add(walker.root);
  const ecx = 21;
  const ecz = -15;
  const ea = 3.6;
  const eb = 2.6;

  return (t) => {
    for (const g of grazers) {
      const c = g.c.reset();
      c.root.position.set(g.x, heightAt(g.x, g.z), g.z);
      c.root.rotation.y = g.yaw;
      const up = g.liftT(t);
      // head down grazing (chewing), or raised to look about
      c.head.rotation.x = lerp(0.95 + osc(t, 1.2, g.off) * 0.06, -0.1, up);
      c.head.rotation.y = up * osc(t, 7.5, g.off) * 0.45;
      c.body.rotation.x = lerp(0.06, 0, up);
      c.tail.rotation.z = osc(t, 2, g.off) * 0.45 + osc(t, 0.75, g.off) * 0.1;
      c.tail.rotation.x = 0.15;
    }
    // one cow ambles a slow loop round the pasture
    const th = TAU * (t / LOOP) + 1.3;
    const c = walker.reset();
    const x = ecx + Math.cos(th) * ea;
    const z = ecz + Math.sin(th) * eb;
    c.root.position.set(x, heightAt(x, z), z);
    c.root.rotation.y = Math.atan2(-ea * Math.sin(th), eb * Math.cos(th));
    c.walk(((th - 1.3) / TAU) * 16, 1);
    c.head.rotation.x = 0.35 + osc(t, 60 / 16 / 2) * 0.06;
    c.tail.rotation.z = osc(t, 2.5) * 0.4;
  };
}

// ---------------------------------------------------------------------------
// Chickens and the dog
// ---------------------------------------------------------------------------

const RING = 2.45; // chase circle radius round the haystack

function buildYard(group) {
  const [c0, c1] = CHASE;
  const hens = [0xfaf6ee, 0xc9853c, 0xfaf6ee, 0x8a5a33, 0xf2e6d0].map((color, i) => {
    const c = new Chicken({ color, scale: i === 3 ? 1.1 : 1 });
    group.add(c.root);
    return { c, base: (i / 5) * TAU + 0.3, off: i * 0.19 };
  });
  const dog = new Dog();
  group.add(dog.root);
  const dogBase = hens[0].base - 1.0;

  // shared chase progress: two laps, easing in and out
  const progress = (t) => smoother(lin(t, c0, c1)) * 2 * TAU;
  const at = (th, r) => [YARD.x + Math.cos(th) * r, YARD.z + Math.sin(th) * r];

  return (t) => {
    const p = progress(t);
    const chasing = hold(t, c0 - 0.3, c0 + 0.6, c1 - 0.8, c1 + 0.2);
    const speed = Math.sin(Math.PI * lin(t, c0, c1)); // 0..1..0
    // idle wander is faded out around the chase so positions meet exactly
    const idle = 1 - hold(t, c0 - 1.5, c0, c1, c1 + 1.5);

    for (const hn of hens) {
      const c = hn.c.reset();
      const jitter = Math.sin(p * 3 + hn.off * 9) * 0.35 * speed;
      const th = hn.base + p;
      let [x, z] = at(th, RING + jitter);
      // pottering about: a small closed loop round the home spot
      x += Math.cos(TAU * phase(t, 20, hn.off) + hn.off) * 0.45 * idle - Math.cos(hn.off) * 0.45 * idle;
      z += Math.sin(TAU * phase(t, 20, hn.off) + hn.off) * 0.45 * idle - Math.sin(hn.off) * 0.45 * idle;
      c.root.position.set(x, heightAt(x, z), z);
      const runYaw = Math.atan2(-Math.sin(th), Math.cos(th));
      const a = TAU * phase(t, 20, hn.off) + hn.off;
      const idleYaw = Math.atan2(-Math.sin(a), Math.cos(a));
      c.root.rotation.y = lerpAngle(idleYaw, runYaw, smooth(chasing));
      c.walk(chasing > 0.5 ? phase(t, 0.3, hn.off) : phase(t, 1, hn.off), Math.max(chasing, 0.6 * idle), chasing);
      if (chasing > 0.01) {
        c.flap(chasing, phase(t, 0.2, hn.off));
        c.head.rotation.x = -0.3 * chasing;
      }
      if (chasing < 0.99) {
        const pk = Math.max(hump(local(t, 2.5, hn.off), 0, 0.3), hump(local(t, 2.5, hn.off), 0.35, 0.6));
        c.peck(pk * (1 - chasing));
      }
    }

    // the dog: dozing → alert → the chase (gaining a little mid-way) → panting
    const d = dog.reset();
    const gain = Math.sin(Math.PI * lin(t, c0, c1)) * 0.55;
    const th = dogBase + p + gain;
    const [x, z] = at(th, RING + 0.1);
    d.root.position.set(x, heightAt(x, z), z);
    const runYaw = Math.atan2(-Math.sin(th), Math.cos(th));
    const restYaw = Math.atan2(YARD.x - x, YARD.z - z) + 0.6;
    const run = hold(t, c0 - 0.2, c0 + 0.5, c1 - 0.6, c1);
    d.root.rotation.y = lerpAngle(restYaw, runYaw, smooth(run));
    const down = 1 - hold(t, c0 - 3, c0 - 1.6, c1 + 2, c1 + 6);
    const sit = hold(t, c0 - 3, c0 - 1.6, c0 - 0.5, c0) + hold(t, c1, c1 + 0.8, c1 + 5, c1 + 6);
    if (down > 0.01) d.down(down);
    if (sit > 0.01) d.sit(sit);
    if (run > 0.01) d.run(phase(t, 0.4), run);
    d.head.rotation.y = (1 - run) * osc(t, 6) * 0.4;
    d.head.rotation.x += down * 0.25;
    d.tongue.visible = run > 0.3 || hold(t, c1, c1 + 0.5, c1 + 8, c1 + 9) > 0.5;
    d.tail.rotation.y = osc(t, down > 0.5 ? 1.5 : 0.3) * (down > 0.5 ? 0.3 : 0.7);
    // little scratch behind the ear while lying about
    const scratch = hold(t, 8, 8.4, 10.2, 10.6);
    d.legs[2].rotation.x -= scratch * (1.4 + osc(t, 0.2) * 0.3);
    d.head.rotation.z = scratch * 0.3;
  };
}

/** Two free-range hens pottering near the cottages south of the plaza. */
function buildStrayHens(group) {
  const spots = [
    [-1.4, 25.6],
    [-0.4, 26.6],
  ];
  const hens = spots.map(([x, z], i) => {
    const c = new Chicken({ color: i ? 0xc9853c : 0xfaf6ee });
    group.add(c.root);
    return { c, x, z, off: i * 0.4 };
  });
  return (t) => {
    for (const h of hens) {
      const c = h.c.reset();
      const a = TAU * phase(t, 15, h.off);
      const x = h.x + Math.cos(a) * 0.7;
      const z = h.z + Math.sin(a) * 0.5;
      c.root.position.set(x, heightAt(x, z), z);
      c.root.rotation.y = Math.atan2(-0.7 * Math.sin(a), 0.5 * Math.cos(a));
      const L = local(t, 3, h.off);
      const pk = Math.max(hump(L, 0, 0.3), hump(L, 0.4, 0.7), hump(L, 1.6, 1.9));
      c.walk(phase(t, 0.75, h.off), 0.6 * (1 - pk));
      c.peck(pk);
    }
  };
}

// ---------------------------------------------------------------------------
// Birds circling in slow loops
// ---------------------------------------------------------------------------

function buildBirds(group) {
  const flocks = [
    { cx: CASTLE.x, cy: 27, cz: CASTLE.z, r: 11, n: 5, laps: 2, dir: 1, color: 0xffffff },
    { cx: 4, cy: 17, cz: 20, r: 7.5, n: 4, laps: 3, dir: -1, color: 0xf2efe6 },
    { cx: 38, cy: -14, cz: 18, r: 9, n: 3, laps: 2, dir: 1, color: 0xffffff },
    { cx: -36, cy: 6, cz: -24, r: 8, n: 3, laps: 2, dir: -1, color: 0xe8e8e8 },
  ];
  const birds = [];
  flocks.forEach((f, fi) =>
    Array.from({ length: f.n }).forEach((_, i) => {
      const b = new Bird({ color: f.color, scale: 1.2 });
      group.add(b.root);
      birds.push({ b, f, off: i / f.n + fi * 0.1, rOff: (i % 3) * 1.4 - 1.4, yOff: (i % 2) * 1.6 + i * 0.3 });
    }),
  );
  return (t) => {
    for (const { b, f, off, rOff, yOff } of birds) {
      const th = f.dir * TAU * (f.laps * (t / LOOP) + off);
      const r = f.r + rOff + osc(t, 30, off) * 1.2;
      b.root.position.set(f.cx + Math.cos(th) * r, f.cy + yOff + osc(t, 10, off) * 0.8, f.cz + Math.sin(th) * r);
      const yaw = Math.atan2(-Math.sin(th) * f.dir, Math.cos(th) * f.dir);
      b.root.rotation.set(osc(t, 10, off + 0.25) * 0.08, yaw, f.dir * 0.28, 'YXZ');
      // flap in bursts, glide in between
      const flapping = smooth(0.5 + osc(t, 7.5, off) * 1.2);
      b.flap(0.12 + flapping * 0.55 * Math.sin(TAU * phase(t, 0.4, off)));
    }
  };
}

// ---------------------------------------------------------------------------
// Ducks on the pond
// ---------------------------------------------------------------------------

function buildDucks(group) {
  const ducks = [
    { d: new Duck({ drake: true }), r: 2.2, cx: POND.x + 0.6, cz: POND.z - 0.6, laps: 2, dir: 1, off: 0 },
    { d: new Duck({ drake: false }), r: 2.2, cx: POND.x + 0.6, cz: POND.z - 0.6, laps: 2, dir: 1, off: -0.07 },
    { d: new Duck({ drake: false }), r: 1.3, cx: POND.x + 1.0, cz: POND.z + 1.4, laps: 3, dir: -1, off: 0.3 },
  ];
  const wakes = ducks.map(() => [makeRipple(group), makeRipple(group)]);
  ducks.forEach((d) => group.add(d.d.root));
  return (t) => {
    ducks.forEach((dk, i) => {
      const th = dk.dir * TAU * (dk.laps * (t / LOOP) + dk.off);
      const x = dk.cx + Math.cos(th) * dk.r;
      const z = dk.cz + Math.sin(th) * dk.r;
      dk.d.root.position.set(x, POND.water + osc(t, 2, i * 0.3) * 0.01, z);
      dk.d.root.rotation.y = Math.atan2(-Math.sin(th) * dk.dir, Math.cos(th) * dk.dir);
      dk.d.head.rotation.x = Math.max(0, osc(t, 6, i * 0.3)) ** 8 * 1.6; // occasional dabble
      wakes[i].forEach((w, k) => w.set(x, POND.water + 0.005, z, phase(t, 2, k * 0.5 + i * 0.2), 0.5, 0.3));
    });
  };
}

export function buildFauna(group) {
  const updates = [buildCows(group), buildYard(group), buildStrayHens(group), buildBirds(group), buildDucks(group)];
  return (t) => updates.forEach((u) => u(t));
}
