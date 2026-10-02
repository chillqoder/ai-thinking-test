import * as THREE from 'three';
import { addQuadWalk, gaitAmp, GaitTracker } from '../../core/gait.js';
import { box, place } from '../../core/geo.js';
import { cyclePhase, smoothstep, wave } from '../../core/math.js';
import { Clip } from '../../core/track.js';
import { groundHeight, PIGPEN } from '../../world/layout.js';
import { PAL } from '../../world/palette.js';
import { buildPig } from '../animals.js';
import { Actor, buildHuman } from '../human.js';
import { GroundPath, pulse } from './common.js';

// ------------------------------------------------------------------ the sleeper

export function createSleeper(ctx, effects) {
  const F = { x: -0.35, z: 30.5 };
  const heading = 1.07;
  const y = groundHeight(F.x, F.z);
  // a bed of hay under the tree
  ctx.buckets.solid.add(place([box(1.7, 0.12, 0.75, PAL.thatch, { x: 0, y: 0.04, z: -0.62, ry: 0 }, { wobble: 0.03, jitter: 0.1 })], { x: F.x, y, z: F.z, ry: heading }));
  const actor = new Actor(
    ctx,
    buildHuman({ shirt: '#8a9a3a', sleeves: '#8a9a3a', pants: '#7a5a3a', hat: 'straw', hairStyle: 'messy', hair: '#c9873f', skin: '#f2c7a5', boots: '#5a3c27' }, ctx.materials.solid),
    'sleeper',
  );
  actor.place(F.x, y, F.z, heading);
  actor.mesh.rotation.x = -Math.PI / 2;
  const clip = new Clip(60, [[0, { roll: 0 }], [20, { roll: 0 }], [22.6, { roll: 1.35 }], [41, { roll: 1.35 }], [43.6, { roll: 0 }]], { label: 'sleeper' });
  const s = {};
  const head = new THREE.Vector3();
  const local = new THREE.Vector3(0, 0.16, 0.04);
  return {
    update(t, camera) {
      clip.sample(t, s);
      const w = s.roll / 1.35;
      const breath = 0.5 + 0.5 * wave(t, 15);
      const p = {
        'hips.ry': s.roll,
        'belly.s': 0.09 * breath,
        'chest.rx': -0.04 * breath,
        'head.rx': -0.15 * (1 - w) + 0.1 * w,
        'head.ry': 0.25 * (1 - w),
        // on the back: hands folded on the belly, one knee up
        'armL.rx': -0.35 * (1 - w) - 0.9 * w,
        'armL.rz': -0.38 * (1 - w),
        'foreL.rx': -1.45 * (1 - w) - 0.9 * w,
        'armR.rx': -0.35 * (1 - w) - 0.7 * w,
        'armR.rz': 0.38 * (1 - w),
        'foreR.rx': -1.45 * (1 - w) - 1.1 * w,
        'legR.rx': -0.75 * (1 - w) - 0.5 * w,
        'shinR.rx': 1.35 * (1 - w) + 0.9 * w,
        'legL.rx': -0.7 * w,
        'shinL.rx': 1.1 * w,
        'footL.rx': 0.5,
        'footR.rx': 0.5 * w,
      };
      actor.setPose(p);
      actor.mesh.position.y = 0.17 + 0.03 * w;
      // snoring Zs drift up from his head
      actor.worldOf('head', local, head);
      for (let k = 0; k < 3; k++) {
        const age = cyclePhase(t, 3, k);
        const sc = smoothstep(0, 0.15, age) * (1 - smoothstep(0.72, 1, age)) * (0.55 + 0.6 * age);
        effects.zs.pushQ(head.x + 0.12 * Math.sin(age * 6.283 + k) + age * 0.25, head.y + 0.25 + age * 1.0, head.z + age * 0.1, sc, camera.quaternion);
      }
    },
  };
}

// ------------------------------------------------------------------ mud bath: peasant + pigs

export function createMudBath(ctx, effects, mud) {
  const list = [];
  const penLocal = (x, z) => [PIGPEN.x + x, PIGPEN.z + z];

  // the happy peasant wallowing in the mud
  const feet = { x: mud.x + 0.55, z: mud.z + 0.55 };
  const heading = Math.PI / 4; // head points toward the middle of the wallow
  const actor = new Actor(
    ctx,
    buildHuman({ shirt: '#b0a080', sleeves: '#b0a080', pants: '#6a5040', hairStyle: 'messy', hair: '#4a3222', skin: '#e8b48f', boots: '#4a3020', belt: false }, ctx.materials.solid),
    'mud-peasant',
  );
  actor.place(feet.x, groundHeight(feet.x, feet.z), feet.z, heading);
  actor.mesh.rotation.x = -Math.PI / 2;
  const mudColor = new THREE.Color('#5e3f24');
  list.push({
    update(t) {
      const roll = 0.32 * wave(t, 10);
      const p = {
        'hips.ry': roll,
        'belly.s': 0.05 * (0.5 + 0.5 * wave(t, 15)),
        'armL.rx': -2.75,
        'armL.rz': 0.35,
        'foreL.rx': -1.9,
        'armR.rx': -2.75,
        'armR.rz': -0.35,
        'foreR.rx': -1.9,
        'head.rx': -0.25,
        'legL.rx': -0.25 + 0.18 * wave(t, 30),
        'legR.rx': -0.25 - 0.18 * wave(t, 30),
        'shinL.rx': 0.4,
        'shinR.rx': 0.4,
        'footL.rx': 0.6 + 0.3 * wave(t, 30, 0.25),
        'footR.rx': 0.6 - 0.3 * wave(t, 30, 0.25),
      };
      actor.setPose(p);
      actor.mesh.position.y = 0.09;
      // splashes at the end of each roll
      const ph = cyclePhase(t, 6, 6 * 0.25);
      for (const [side, start] of [[1, 0], [-1, 0.5]]) {
        const age = (ph - start + 1) % 1;
        if (age > 0.18) continue;
        const a = age / 0.18;
        for (let k = 0; k < 4; k++) {
          const ang = heading + side * (Math.PI / 2) + (k - 1.5) * 0.4;
          const x = feet.x - Math.sin(heading) * 0.6 + Math.sin(ang) * (0.25 + a * 0.35);
          const z = feet.z - Math.cos(heading) * 0.6 + Math.cos(ang) * (0.25 + a * 0.35);
          const i = effects.dust.push(x, groundHeight(x, z) + 0.05 + a * (0.35 - a * 0.3) * 0.9, z, 0.7 * smoothstep(0, 0.2, a) * (1 - a), k, k * 2, 0);
          effects.dust.setColor(i, mudColor);
        }
      }
    },
  });

  const snort = (pig, t, count, offset, out) => {
    const k = pulse(t, count, offset, 0.82);
    out['head.rx'] = (out['head.rx'] ?? 0) - 0.4 * k;
    if (k > 0.4) {
      pig.root.updateMatrixWorld(true);
      const v = new THREE.Vector3(0, -0.03, 0.34).applyMatrix4(pig.bones.head.matrixWorld);
      const i = effects.dust.push(v.x, v.y, v.z, 0.6 * smoothstep(0.4, 1, k), t * 3, 0, 0);
      effects.dust.setColor(i, SNORT);
    }
  };

  // pig lounging in the mud next to him
  const lounger = new Actor(ctx, buildPig(ctx.materials.solid, { muddy: 0.6 }), 'pig');
  // side by side with the peasant, both enjoying the wallow
  const lx = feet.x - Math.sin(heading) * 0.62 + Math.cos(heading) * 0.62;
  const lz = feet.z - Math.cos(heading) * 0.62 - Math.sin(heading) * 0.62;
  lounger.place(lx, groundHeight(lx, lz) + 0.02, lz, heading + Math.PI);
  list.push({
    update(t) {
      const p = {
        'body.rz': 1.25 + 0.25 * wave(t, 8),
        'body.py': -0.17,
        'legFL.rx': 0.35 * wave(t, 40),
        'legFR.rx': -0.35 * wave(t, 40),
        'legBL.rx': -0.3 * wave(t, 40, 0.3),
        'legBR.rx': 0.3 * wave(t, 40, 0.3),
        'head.rx': 0.15 * wave(t, 6),
        'tail.ry': 0.7 * wave(t, 240),
        'earL.rx': 0.2 * wave(t, 12),
        'earR.rx': -0.2 * wave(t, 12),
      };
      lounger.setPose(p);
    },
  });

  // a sow and her piglet wandering round the pen
  const path = new GroundPath([[-0.9, -2.6], [1.1, -2.6], [2.5, -1.3], [1.3, -1.0], [-0.6, -1.7]].map(([x, z]) => penLocal(x, z)), true);
  const roam = new Clip(30, [[0, { s: 0 }], [6, { s: 0.28 }], [9, { s: 0.28 }], [17, { s: 0.62 }], [20.5, { s: 0.62 }]], { wraps: { s: 1 }, label: 'pig roam' });
  for (const [scale, follow, muddy] of [[1, 0, 0.25], [0.6, 0.11, 0.1]]) {
    const pig = new Actor(ctx, buildPig(ctx.materials.solid, { muddy, scale }), scale < 1 ? 'piglet' : 'pig');
    const sTrack = roam.tracks[0];
    const delay = follow ? 0.8 : 0;
    // the piglet trots a little way behind its mother along the same path
    const posAt = (tc, out) => path.point(sTrack.sample(tc) - follow, out);
    const gait = new GaitTracker(30, posAt, 0.5 * scale);
    const pos = new THREE.Vector3();
    list.push({
      update(t) {
        const tc = t - delay;
        posAt(tc, pos);
        const h = path.heading(sTrack.sample(tc) - follow);
        pig.place(pos.x, pos.y, pos.z, h);
        const p = { 'tail.ry': 0.6 * wave(t, 240, delay) * (0.5 + 0.5 * wave(t, 6)) };
        addQuadWalk(p, gait.phase(tc), gaitAmp(gait.speed(tc), 0.3), 0.55);
        p['head.rx'] = 0.25 * (1 - gaitAmp(gait.speed(tc), 0.3)) + 0.08 * wave(t, 30);
        p['earL.rx'] = 0.15 * wave(t, 30);
        p['earR.rx'] = 0.15 * wave(t, 30, 0.5);
        snort(pig, tc, 8, scale, p);
        pig.setPose(p);
      },
    });
  }

  // a pig busy at the trough
  const eater = new Actor(ctx, buildPig(ctx.materials.solid, { muddy: 0.15 }), 'pig');
  const [ex, ez] = penLocal(-1.55, -0.75);
  eater.place(ex, groundHeight(ex, ez), ez, -2.25);
  list.push({
    update(t) {
      const lift = pulse(t, 5, 0.1, 0.6);
      const p = {
        'head.rx': 0.45 + 0.1 * wave(t, 90) * (1 - lift) - 0.75 * lift,
        'head.ry': 0.3 * lift * wave(t, 10),
        'tail.ry': 0.7 * wave(t, 240, 0.3),
        'body.rx': 0.06,
        'earL.rx': 0.25 * lift,
        'earR.rx': 0.25 * lift,
      };
      snort(eater, t, 5, 0.1, p);
      eater.setPose(p);
    },
  });
  return list;
}

const SNORT = new THREE.Color('#f3efe6');
