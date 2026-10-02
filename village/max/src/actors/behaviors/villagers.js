import * as THREE from 'three';
import { addWalk, gaitAmp, GaitTracker } from '../../core/gait.js';
import { mod, wave, windowed } from '../../core/math.js';
import { Clip } from '../../core/track.js';
import { FIELDS, groundHeight, MARKET, MAYPOLE } from '../../world/layout.js';
import { Actor, buildHuman, crouch, mixPose } from '../human.js';
import { breathe, GroundPath, travelHeading, walkKeys } from './common.js';

const lerpPose = (a, b, t) => mixPose(a, b, t);

// ------------------------------------------------------------------ farmer

export function createFarmer(ctx, effects) {
  const f = FIELDS.find((x) => x.id === 'cabbage');
  const c = Math.cos(f.ry);
  const s = Math.sin(f.ry);
  const toWorld = (lx, lz) => [f.x + lx * c + lz * s, f.z - lx * s + lz * c];
  const A = toWorld(0.65, -2.5);
  const B = toWorld(0.65, 2.5);
  const hAB = Math.atan2(B[0] - A[0], B[1] - A[1]);
  const actor = new Actor(
    ctx,
    buildHuman({ shirt: '#e8dcc4', sleeves: '#e8dcc4', pants: '#6a7a9a', hat: 'straw', hairStyle: 'short', hair: '#6b4128', beard: '#6b4128', skin: '#d9a079', boots: '#5a3c27', tools: { right: 'hoe' } }, ctx.materials.solid),
    'farmer',
  );
  const P = Math.PI;
  const clip = new Clip(
    30,
    [
      [0, { s: 0, turn: 0, work: 0, lift: 0, wipe: 0 }],
      [1.0, { s: 0 }],
      [4.5, { s: 0.36 }],
      [4.6, { work: 0 }],
      [5.2, { work: 1, lift: 0 }],
      [5.6, { lift: 1 }], [6.1, { lift: 0 }], [6.9, { lift: 1 }], [7.4, { lift: 0 }], [8.2, { lift: 1 }], [8.7, { lift: 0 }],
      [9.0, { work: 1 }],
      [9.5, { work: 0, s: 0.36 }],
      [13.0, { s: 0.72, work: 0 }],
      [13.6, { work: 1, lift: 0 }],
      [14.0, { lift: 1 }], [14.5, { lift: 0 }], [15.3, { lift: 1 }], [15.8, { lift: 0 }], [16.6, { lift: 1 }], [17.1, { lift: 0 }],
      [17.4, { work: 1 }],
      [17.9, { work: 0, s: 0.72 }],
      [18.2, { wipe: 0 }],
      [18.7, { wipe: 1 }],
      [19.4, { wipe: 1 }],
      [19.9, { wipe: 0 }],
      [20.4, { s: 1, turn: 0 }],
      [21.6, { s: 1, turn: P }],
      ...walkKeys(21.6, 28.4, 1, 0, 0.8).slice(1, 3).map(([tt, v]) => [tt, { s: v }]),
      [28.4, { s: 0, turn: P }],
      [29.6, { turn: 0 }],
    ],
    { label: 'farmer' },
  );
  const sT = clip.tracks[clip.names.indexOf('s')];
  const posAt = (t, out) => out.set(A[0] + (B[0] - A[0]) * sT.sample(t), 0, A[1] + (B[1] - A[1]) * sT.sample(t));
  const gait = new GaitTracker(30, posAt, 0.85);
  const CARRY = { 'armR.rx': -0.5, 'armR.rz': -0.15, 'foreR.rx': -2.3, 'handR.rx': -0.8 };
  const RAISED = { 'armR.rx': -1.9, 'armR.rz': 0.15, 'foreR.rx': -0.8, 'handR.rx': 0.3, 'armL.rx': -1.7, 'armL.rz': -0.3, 'foreL.rx': -0.9, 'spine.rx': 0.05 };
  const STRIKE = { 'armR.rx': -0.75, 'armR.rz': 0.2, 'foreR.rx': -0.3, 'handR.rx': 0.2, 'armL.rx': -0.6, 'armL.rz': -0.35, 'foreL.rx': -0.45, 'spine.rx': 0.42, ...crouch(0.05) };
  const STRIKES = [6.1, 7.4, 8.7, 14.5, 15.8, 17.1];
  const pos = new THREE.Vector3();
  const blade = new THREE.Vector3();
  const local = new THREE.Vector3(0, -1.05, -0.07);
  const dirt = new THREE.Color('#8d603d');
  const k = {};
  return {
    update(t) {
      clip.sample(t, k);
      posAt(t, pos);
      actor.place(pos.x, groundHeight(pos.x, pos.z), pos.z, hAB + k.turn);
      const work = lerpPose(STRIKE, RAISED, k.lift);
      const p = lerpPose(CARRY, work, k.work);
      addWalk(p, gait.phase(t), gaitAmp(gait.speed(t), 0.5), { lockArmR: true });
      breathe(p, t, 0.035, 0.7);
      p['armL.rx'] = (p['armL.rx'] ?? 0) - 2.3 * k.wipe;
      p['armL.rz'] = (p['armL.rz'] ?? 0) - 0.55 * k.wipe;
      p['foreL.rx'] = (p['foreL.rx'] ?? 0) - 1.6 * k.wipe;
      p['head.rx'] = (p['head.rx'] ?? 0) - 0.15 * k.wipe;
      actor.setPose(p);
      const tau = mod(t, 30);
      for (const ts of STRIKES) {
        const age = tau - ts;
        if (age < 0 || age > 0.6) continue;
        actor.worldOf('handR', local, blade);
        for (let i = 0; i < 4; i++) {
          const a = i * 1.7 + ts;
          const x = blade.x + Math.cos(a) * age * 0.5;
          const z = blade.z + Math.sin(a) * age * 0.5;
          const id = effects.dust.push(x, groundHeight(x, z) + 0.05 + age * 0.6 - age * age * 0.9, z, 0.9 * (1 - age / 0.6) * Math.min(1, age * 20), a, a, 0);
          effects.dust.setColor(id, dirt);
        }
      }
    },
  };
}

// ------------------------------------------------------------------ maid with a basket

export function createMaid(ctx) {
  const pts = [[2.6, 17.2], [0.4, 17.0], [-3.6, 16.0], [-6.4, 19.0], [-5.2, 26.2], [-1.5, 28.4], [3.0, 27.4], [6.6, 25.9], [9.6, 21.4], [8.6, 16.9], [4.6, 17.3]];
  const path = new GroundPath(pts, true);
  const s2 = path.nearest(9.5, 21.6);
  const t2 = 5 + 52 * s2;
  const clip = new Clip(
    60,
    [
      [0, { s: 0 }],
      ...walkKeys(5, t2, 0, s2, 0.9).map(([tt, v]) => [tt, { s: v }]),
      ...walkKeys(t2 + 3, 60, s2, 1, 0.9).slice(0, 3).map(([tt, v]) => [tt, { s: v }]),
    ],
    { wraps: { s: 1 }, label: 'maid' },
  );
  const actor = new Actor(
    ctx,
    buildHuman({ shirt: '#efe4cf', sleeves: '#efe4cf', dress: '#5a7ab8', apron: '#f7f3ea', hat: 'bonnet', hatColor: '#f7f3ea', hairStyle: 'long', hair: '#c9873f', skin: '#f5d0b5', boots: '#6a4a32', belt: false, tools: { left: 'basket' } }, ctx.materials.solid),
    'maid',
  );
  const sT = clip.tracks[0];
  const posAt = (t, out) => path.point(sT.sample(t), out);
  const gait = new GaitTracker(60, posAt, 0.78);
  const hStall = Math.PI;
  const hKids = Math.atan2(MAYPOLE.x - 9.5, MAYPOLE.z - 21.6);
  const pos = new THREE.Vector3();
  return {
    update(t) {
      posAt(t, pos);
      const idle = t > t2 - 6 && t < t2 + 9 ? hKids : hStall;
      const heading = travelHeading(posAt, t, idle, 0.3);
      actor.place(pos.x, pos.y, pos.z, heading);
      const p = { 'armL.rx': -0.1, 'armL.rz': 0.2, 'foreL.rx': -0.35 };
      addWalk(p, gait.phase(t), gaitAmp(gait.speed(t), 0.5), { lockArmL: true, leg: 0.4 });
      breathe(p, t, 0.03, 0.4);
      // shopping at the stall: point at the goods, nod
      const shop = windowed(mod(t + 3, 60), 3.3, 4.0, 7.0, 7.8);
      p['armR.rx'] = (p['armR.rx'] ?? 0) * (1 - shop) - 1.15 * shop;
      p['foreR.rx'] = (p['foreR.rx'] ?? 0) - 0.3 * shop;
      p['head.rx'] = 0.18 * shop * (0.5 + 0.5 * wave(t, 40));
      // waving at the children
      const hi = windowed(t, t2 + 0.2, t2 + 0.7, t2 + 2.4, t2 + 3.0);
      p['armR.rz'] = (p['armR.rz'] ?? -0.05) - 2.5 * hi;
      p['foreR.rx'] = (p['foreR.rx'] ?? 0) - 0.4 * hi + 0.35 * hi * wave(t, 90);
      p['head.ry'] = (p['head.ry'] ?? 0) + 0.15 * hi;
      actor.setPose(p);
    },
    stops: { stall: [0, 5], kids: [t2, t2 + 3] },
  };
}

// ------------------------------------------------------------------ baker

export function createBaker(ctx, door) {
  const path = new GroundPath([[door.x, door.z], [-2.6, 14.3], [1.25, 14.05]], false);
  const clip = new Clip(
    30,
    [
      [0, { s: 0, wave: 0 }],
      ...walkKeys(5.5, 14, 0, 1, 1).map(([tt, v]) => [tt, { s: v }]),
      [14.6, { wave: 0 }],
      [15.4, { wave: 1 }],
      [18, { wave: 1 }],
      [18.8, { wave: 0 }],
      ...walkKeys(19.5, 27.5, 1, 0, 1).map(([tt, v]) => [tt, { s: v }]),
    ],
    { label: 'baker' },
  );
  const actor = new Actor(
    ctx,
    buildHuman({ shirt: '#f7f3ea', sleeves: '#f7f3ea', pants: '#e8e0d0', hat: 'chef', apron: '#f7f3ea', build: 'big', hairStyle: 'short', hair: '#4a3222', beard: false, skin: '#f2c7a5', boots: '#5a3c27', tools: { right: 'breadTray' } }, ctx.materials.solid),
    'baker',
  );
  const sT = clip.tracks[clip.names.indexOf('s')];
  const posAt = (t, out) => path.point(sT.sample(t), out);
  const gait = new GaitTracker(30, posAt, 0.8);
  const pos = new THREE.Vector3();
  const hDoor = door.ry + Math.PI; // fetching bread: facing into the bakery
  const hStall = Math.PI / 2;
  const k = {};
  return {
    update(t) {
      clip.sample(t, k);
      posAt(t, pos);
      const tt = mod(t, 30);
      const idle = tt > 10 && tt < 24 ? hStall : hDoor;
      const heading = travelHeading(posAt, t, idle, 0.3);
      actor.place(pos.x, pos.y, pos.z, heading);
      // tray of loaves held high on the right hand
      const p = { 'armR.rx': -2.85, 'armR.rz': -0.32, 'foreR.rx': -0.35, 'handR.rx': 0.25, 'armL.rz': 0.12, 'foreL.rx': -0.25 };
      addWalk(p, gait.phase(t), gaitAmp(gait.speed(t), 0.5), { lockArmR: true });
      breathe(p, t, 0.04, 0.9);
      // proudly presenting the bread at the stall, a friendly wave
      p['armL.rx'] = (p['armL.rx'] ?? 0) - 1.2 * k.wave;
      p['foreL.rx'] += -0.6 * k.wave + 0.3 * k.wave * wave(t, 75);
      p['head.ry'] = (p['head.ry'] ?? 0) + 0.3 * k.wave;
      actor.setPose(p);
    },
  };
}

// ------------------------------------------------------------------ gossips & vendor

export function createGossips(ctx) {
  const list = [];
  const a = { x: -3.05, z: 19.45 };
  const b = { x: -2.35, z: 18.6 };
  const hA = Math.atan2(b.x - a.x, b.z - a.z);
  const hB = hA + Math.PI;
  const looks = [
    { shirt: '#c8453a', dress: '#8a3a5a', apron: '#efe4cf', hat: 'kerchief', hatColor: '#e8b84a', hairStyle: 'bun', hair: '#4a3222', skin: '#e8b48f', belt: false },
    { shirt: '#4f8a6a', dress: '#3f6a8a', hat: 'bonnet', hatColor: '#efe4cf', hairStyle: 'long', hair: '#8a5a33', skin: '#f2c7a5', belt: false, build: 'big' },
  ];
  [a, b].forEach((spot, i) => {
    const actor = new Actor(ctx, buildHuman(looks[i], ctx.materials.solid), 'gossip');
    actor.place(spot.x, groundHeight(spot.x, spot.z), spot.z, i === 0 ? hA : hB);
    list.push({
      update(t) {
        // speakers alternate every 5 s
        const talk = Math.max(0, wave(t, 6, i * 0.5)) ** 0.6;
        const listen = 1 - talk;
        const p = {
          'armL.rz': 0.35 * listen + 0.1,
          'foreL.rx': -1.4 * listen - 0.2,
          'armL.rx': 0.25 * listen,
          'armR.rx': -0.5 * talk + 0.15 * talk * wave(t, 70, i * 0.3),
          'armR.rz': -0.1 - 0.35 * talk * (0.5 + 0.5 * wave(t, 45, i)),
          'foreR.rx': -0.9 * talk - 0.2,
          'head.rx': 0.1 * listen * (0.5 + 0.5 * wave(t, 40, i * 0.2)) + 0.05 * talk * wave(t, 110),
          'head.ry': 0.12 * talk * wave(t, 20, i),
          'hips.rz': 0.03 * wave(t, 4, i),
        };
        breathe(p, t, 0.035, i * 0.3);
        actor.setPose(p);
      },
    });
  });
  return list;
}

export function createVendor(ctx, maidStops) {
  const stall = MARKET[0];
  const x = stall.x + Math.sin(stall.ry) * -0.75;
  const z = stall.z + Math.cos(stall.ry) * -0.75;
  const actor = new Actor(ctx, buildHuman({ shirt: '#7d5aa6', sleeves: '#7d5aa6', pants: '#5a4a3a', apron: '#efe4cf', hat: 'beanie', hatColor: '#c8453a', hairStyle: 'short', hair: '#2e2420', beard: '#2e2420', build: 'big', skin: '#c68863' }, ctx.materials.solid), 'vendor');
  actor.place(x, groundHeight(x, z), z, stall.ry);
  const [, s1] = maidStops.stall;
  return {
    update(t) {
      const greet = windowed(mod(t + 5, 60), 5.2, 5.8, 7.4, 8.0);
      const hand = windowed(mod(t + 5, 60), 7.6, 8.2, s1 + 4.2, s1 + 4.9);
      const baker = windowed(mod(t, 30), 14.2, 15.0, 18.6, 19.4);
      const arrange = windowed(mod(t, 15), 4, 4.6, 7.5, 8.2) * (1 - greet) * (1 - hand);
      const p = {
        'armR.rz': -0.1 - 2.4 * greet,
        'foreR.rx': -0.2 - 0.3 * greet + 0.35 * greet * wave(t, 90) - 0.4 * hand,
        'armR.rx': -1.1 * hand - 0.9 * arrange,
        'armL.rx': -0.9 * arrange - 0.5 * hand,
        'foreL.rx': -0.4 * arrange - 0.5 * hand - 0.15,
        'spine.rx': 0.25 * arrange + 0.12 * hand,
        'head.rx': 0.25 * arrange,
        'head.ry': -0.9 * baker,
        'chest.ry': -0.3 * baker,
        'armL.rz': 0.1,
      };
      breathe(p, t, 0.04, 0.33);
      actor.setPose(p);
    },
  };
}

