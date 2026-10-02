import * as THREE from 'three';
import { addQuadWalk, gaitAmp, GaitTracker } from '../../core/gait.js';
import { lerp, rng, TAU, wave, windowed } from '../../core/math.js';
import { Clip } from '../../core/track.js';
import { CHICKEN_YARD, groundHeight, PASTURE } from '../../world/layout.js';
import { buildChicken, buildCow, buildDog } from '../animals.js';
import { Actor } from '../human.js';
import { GroundPath, pulse, steeredHeading, walkKeys } from './common.js';

// ------------------------------------------------------------------ dog & chickens

const YARD_PERIOD = 30;

export function createChickenYard(ctx) {
  const Y = CHICKEN_YARD;
  const y0 = groundHeight(Y.x, Y.z);
  const rand = rng(303);
  const list = [];

  // The dog naps by the fence facing the hens, gets up, dashes once round the yard
  // after them, trots back out to his spot, turns round and lies down again.
  const restOff = [2.3, -1.5];
  const thR = Math.atan2(restOff[1], restOff[0]);
  const hIn = Math.atan2(-restOff[0], -restOff[1]);
  const hOut = hIn + Math.PI;
  const dogClip = new Clip(
    YARD_PERIOD,
    [
      [0, { w: 0, th: thR, lie: 1, face: 0, h: hIn }],
      [10.6, { lie: 1 }],
      [11.2, { lie: 0, w: 0 }],
      [11.5, { face: 0 }],
      [12.3, { face: 1, w: 1, th: thR }],
      [12.4, { h: hIn }],
      [20.0, { w: 1 }],
      [20.9, { th: thR + TAU + 0.45 }],
      [21.2, { h: hOut, face: 1 }],
      [21.7, { w: 0 }],
      [21.75, { face: 0 }],
      [22.1, { h: hOut, lie: 0 }],
      [23.0, { h: hOut - Math.PI }],
      [23.6, { lie: 1 }],
      [25.0, { th: thR + TAU + 0.45 }],
    ],
    { wraps: { th: TAU }, label: 'dog' },
  );
  const tW = dogClip.tracks[dogClip.names.indexOf('w')];
  const tTh = dogClip.tracks[dogClip.names.indexOf('th')];
  const DOG_R = 1.9;
  const dogPos = (t, out) => {
    const w = tW.sample(t);
    const th = tTh.sample(t);
    return out.set(lerp(Y.x + restOff[0], Y.x + Math.cos(th) * DOG_R, w), y0, lerp(Y.z + restOff[1], Y.z + Math.sin(th) * DOG_R, w));
  };
  const dog = new Actor(ctx, buildDog(ctx.materials.solid), 'dog');
  const dogGait = new GaitTracker(YARD_PERIOD, dogPos, 0.7);
  const dp = new THREE.Vector3();
  const k = {};
  list.push({
    update(t) {
      dogClip.sample(t, k);
      dogPos(t, dp);
      dog.place(dp.x, groundHeight(dp.x, dp.z), dp.z, steeredHeading(dogPos, t, k.h, k.face));
      const amp = gaitAmp(dogGait.speed(t), 1.4);
      const p = { 'tail.ry': 0.75 * wave(t, 180), 'tail.rx': -0.3 + 0.2 * amp };
      addQuadWalk(p, dogGait.phase(t), amp, 0.85);
      p['body.rx'] = (p['body.rx'] ?? 0) + 0.12 * amp * Math.sin(TAU * dogGait.phase(t) * 2);
      const lie = k.lie;
      p['body.py'] = (p['body.py'] ?? 0) - 0.2 * lie;
      for (const leg of ['legFL', 'legFR']) p[`${leg}.rx`] = (p[`${leg}.rx`] ?? 0) * (1 - lie) - 1.35 * lie;
      for (const leg of ['legBL', 'legBR']) p[`${leg}.rx`] = (p[`${leg}.rx`] ?? 0) * (1 - lie) - 1.2 * lie;
      p['head.rx'] = 0.2 * lie + 0.05 * wave(t, 150) * lie - 0.15 * amp;
      p['head.ry'] = 0.3 * lie * wave(t, 4);
      p['earL.rz'] = 0.3 * amp * wave(t, 160);
      p['earR.rz'] = -0.3 * amp * wave(t, 160, 0.2);
      dog.setPose(p);
    },
  });

  // hens peck around their spots and scatter in front of the dog
  const homes = [[1.0, -0.2], [-0.5, -1.7], [0.3, 1.2], [2.1, 0.7], [-1.7, -0.5], [0.4, -2.6], [1.6, 2.1]];
  homes.forEach(([hx, hz], i) => {
    const color = rand.pick(['#f7f3ea', '#f7f3ea', '#b5653a', '#c98a4a', '#3a3330']);
    const hen = new Actor(ctx, buildChicken(ctx.materials.solid, { color }), 'chicken');
    const ahead = 0.9 + i * 0.32;
    const lane = 1.25 + (i % 4) * 0.42;
    const flee = new Clip(YARD_PERIOD, [[0, { c: 0 }], [11.8 + i * 0.12, { c: 0 }], [12.8 + i * 0.12, { c: 1 }], [20.0 + i * 0.2, { c: 1 }], [22.6 + i * 0.25, { c: 0 }]], { label: 'hen' });
    const cT = flee.tracks[0];
    const wPhase = rand.next();
    const posAt = (t, out) => {
      const c = cT.sample(t);
      const th = tTh.sample(t) + ahead;
      const wx = Y.x + hx + 0.25 * wave(t, 2, wPhase) + 0.1 * wave(t, 5, wPhase * 2);
      const wz = Y.z + hz + 0.25 * wave(t, 2, wPhase + 0.25) + 0.08 * wave(t, 6, wPhase);
      return out.set(lerp(wx, Y.x + Math.cos(th) * lane, c), y0, lerp(wz, Y.z + Math.sin(th) * lane, c));
    };
    const gait = new GaitTracker(YARD_PERIOD, posAt, 0.42);
    const pos = new THREE.Vector3();
    const idleH = rand.next() * TAU;
    list.push({
      update(t) {
        posAt(t, pos);
        const c = cT.sample(t);
        // startled hens turn toward where they run over ~0.8 s, then settle back
        const face = windowed(t % YARD_PERIOD, 11.8 + i * 0.12, 12.6 + i * 0.12, 21.8 + i * 0.25, 22.7 + i * 0.25);
        hen.place(pos.x, groundHeight(pos.x, pos.z), pos.z, steeredHeading(posAt, t, idleH + 0.6 * wave(t, 3, wPhase), face, 0.3));
        const amp = gaitAmp(gait.speed(t), 0.6);
        const ph = Math.sin(TAU * gait.phase(t));
        const peck = pulse(t, 22 + i * 3, wPhase, 0.55) * (1 - c) * (1 - amp);
        const flap = c * (0.55 + 0.5 * wave(t, 360, i * 0.1));
        hen.setPose({
          'legL.rx': 0.6 * amp * ph,
          'legR.rx': -0.6 * amp * ph,
          'body.py': 0.02 * amp * Math.abs(ph),
          'body.rx': 0.45 * peck - 0.15 * c,
          'head.rx': 0.9 * peck + 0.08 * wave(t, 50, i),
          'head.pz': 0.03 * amp * Math.cos(TAU * gait.phase(t) * 2),
          'wingL.rz': flap,
          'wingR.rz': -flap,
        });
      },
    });
  });
  return list;
}

// ------------------------------------------------------------------ cows

export function createCows(ctx) {
  const P = PASTURE;
  const list = [];

  // grazer wandering slowly round the pasture with long stops
  const loop = new GroundPath([[P.x - 2.6, P.z + 0.4], [P.x - 1.0, P.z + 2.4], [P.x + 1.6, P.z + 1.6], [P.x + 1.9, P.z - 0.6], [P.x - 0.4, P.z - 1.2]], true);
  const roam = new Clip(
    60,
    [
      [0, { s: 0 }],
      ...walkKeys(8, 16, 0, 0.3, 1.5).map(([t, v]) => [t, { s: v }]),
      ...walkKeys(26, 34, 0.3, 0.62, 1.5).map(([t, v]) => [t, { s: v }]),
      ...walkKeys(44, 52, 0.62, 1, 1.5).map(([t, v]) => [t, { s: v }]),
    ],
    { wraps: { s: 1 }, label: 'cow roam' },
  );
  const sT = roam.tracks[0];
  const posAt = (t, out) => loop.point(sT.sample(t), out);
  const gait = new GaitTracker(60, posAt, 1.1);
  const a = new Actor(ctx, buildCow(ctx.materials.solid, { seed: 1 }), 'cow');
  const pa = new THREE.Vector3();
  list.push({
    update(t) {
      posAt(t, pa);
      a.place(pa.x, pa.y, pa.z, loop.heading(sT.sample(t)));
      const amp = gaitAmp(gait.speed(t), 0.35);
      const look = pulse(t, 4, 0.1, 0.5) * (1 - amp);
      const p = { 'head.rx': 0.75 * (1 - look) * (1 - amp * 0.6) + 0.06 * wave(t, 45), 'head.ry': 0.35 * look * wave(t, 8), 'tail.rz': 0.4 * wave(t, 40), 'tail.rx': 0.15 };
      addQuadWalk(p, gait.phase(t), amp, 0.4);
      a.setPose(p);
    },
  });

  // a cow munching at the hay rack
  const b = new Actor(ctx, buildCow(ctx.materials.solid, { seed: 2 }), 'cow');
  const bx = P.x + 0.9;
  const bz = P.z - 1.75;
  b.place(bx, groundHeight(bx, bz), bz, 2.55);
  list.push({
    update(t) {
      const up = pulse(t, 3, 0.6, 0.55);
      b.setPose({ 'head.rx': 0.35 * (1 - up) + 0.08 * wave(t, 60) - 0.25 * up, 'head.ry': 0.15 * wave(t, 5) + 0.4 * up, 'tail.rz': 0.5 * wave(t, 36, 0.3) * (0.4 + 0.6 * pulse(t, 6, 0.2, 0.3)), 'tail.rx': 0.15 });
    },
  });

  // a cow lying in the grass, chewing the cud
  const c = new Actor(ctx, buildCow(ctx.materials.solid, { seed: 3 }), 'cow');
  const cx = P.x - 2.3;
  const cz = P.z - 1.9;
  c.place(cx, groundHeight(cx, cz), cz, 0.9);
  list.push({
    update(t) {
      c.setPose({
        'body.py': -0.43,
        'body.rz': 0.08,
        'legFL.rx': -1.45,
        'legFR.rx': -1.45,
        'legBL.rx': -1.35,
        'legBR.rx': -1.35,
        'head.rx': -0.1 + 0.05 * wave(t, 75),
        'head.ry': 0.4 * wave(t, 3, 0.1),
        'head.rz': 0.03 * wave(t, 90),
        'tail.rz': 0.3 * wave(t, 24),
      });
    },
  });
  return list;
}
