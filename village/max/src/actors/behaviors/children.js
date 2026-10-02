import * as THREE from 'three';
import { addRun, addWalk, gaitAmp, GaitTracker } from '../../core/gait.js';
import { clamp, wave, windowed } from '../../core/math.js';
import { Clip } from '../../core/track.js';
import { groundHeight, MAYPOLE } from '../../world/layout.js';
import { Actor, buildHuman } from '../human.js';
import { travelHeading } from './common.js';

// Four children chase each other round the maypole: "it" catches up and tags a
// friend, everybody stops to jump and wave, then the game starts over.

const PERIOD = 20;
const R = 2.05;
const PI = Math.PI;

const KIDS = [
  { shirt: '#e8a53c', pants: '#5a6a8a', hairStyle: 'messy', hair: '#8a5a33', child: true, skin: '#f2c7a5' },
  { shirt: '#e07b8c', dress: '#e07b8c', hairStyle: 'pigtails', hair: '#c9873f', child: true, skin: '#f5d0b5' },
  { shirt: '#4f9a6a', pants: '#6a5a4a', hat: 'beanie', hatColor: '#3f6fb5', child: true, skin: '#d9a079', hair: '#2e2420' },
  { shirt: '#9a7ad6', dress: '#7d5aa6', hairStyle: 'bun', hair: '#4a3222', child: true, skin: '#e8b48f' },
];

export function createChildren(ctx) {
  const base = new Clip(
    PERIOD,
    [[0, { th: 0 }], [4.5, { th: 1.25 * PI }], [9.0, { th: 2.45 * PI }], [10.5, { th: 2.75 * PI }], [11.2, { th: 2.8 * PI }], [13.4, { th: 2.8 * PI }], [14.6, { th: 2.95 * PI }]],
    { wraps: { th: 4 * PI }, label: 'children base' },
  );
  const offsets = [
    new Clip(PERIOD, [[0, { d: 0 }], [1.5, { d: 0 }], [8.6, { d: 1.2 }], [13.4, { d: 1.2 }], [19.0, { d: 0 }]], { label: 'kid0' }),
    new Clip(PERIOD, [[0, { d: PI / 2 }], [8.4, { d: PI / 2 }], [10.0, { d: PI / 2 + 0.45 }], [13.4, { d: PI / 2 + 0.45 }], [19.5, { d: PI / 2 }]], { label: 'kid1' }),
    new Clip(PERIOD, [[0, { d: PI }], [6, { d: PI + 0.15 }], [13.4, { d: PI + 0.1 }], [17, { d: PI }]], { label: 'kid2' }),
    new Clip(PERIOD, [[0, { d: 1.5 * PI }], [5, { d: 1.5 * PI - 0.12 }], [13.4, { d: 1.5 * PI - 0.05 }], [18, { d: 1.5 * PI }]], { label: 'kid3' }),
  ];
  const thT = base.tracks[0];
  const y0 = groundHeight(MAYPOLE.x, MAYPOLE.z);

  return KIDS.map((spec, i) => {
    const actor = new Actor(ctx, buildHuman(spec, ctx.materials.solid), 'child');
    const dT = offsets[i].tracks[0];
    const posAt = (t, out) => {
      const a = thT.sample(t) + dT.sample(t);
      const r = R + 0.18 * wave(t, 6, i * 0.25);
      return out.set(MAYPOLE.x + Math.cos(a) * r, y0, MAYPOLE.z + Math.sin(a) * r);
    };
    const gait = new GaitTracker(PERIOD, posAt, 0.95);
    const pos = new THREE.Vector3();
    return {
      update(t) {
        posAt(t, pos);
        const toCentre = Math.atan2(MAYPOLE.x - pos.x, MAYPOLE.z - pos.z);
        const heading = travelHeading(posAt, t, toCentre, 0.5);
        const speed = gait.speed(t);
        const party = windowed(t % PERIOD, 10.9, 11.4, 13.0, 13.5);
        const hop = 0.2 * Math.abs(Math.sin((PI * ((t % PERIOD) - 10.9 + i * 0.12)) / 0.5)) * party;
        actor.place(pos.x, groundHeight(pos.x, pos.z) + hop, pos.z, heading);
        const p = {};
        const run = gaitAmp(speed, 1.5);
        addRun(p, gait.phase(t), clamp(run * 1.3 - 0.3, 0, 1));
        addWalk(p, gait.phase(t), clamp(1 - Math.abs(run - 0.35) * 3, 0, 1) * 0.8);
        // lean into the turn
        p['hips.rz'] = (p['hips.rz'] ?? 0) + 0.12 * run;
        // jump and wave at the party
        p['armL.rz'] = (p['armL.rz'] ?? 0) + party * (2.4 + 0.35 * wave(t, 120, i * 0.2));
        p['armR.rz'] = (p['armR.rz'] ?? 0) - party * (2.4 + 0.35 * wave(t, 120, i * 0.2 + 0.5));
        p['foreL.rx'] = (p['foreL.rx'] ?? 0) * (1 - party) - 0.3 * party;
        p['foreR.rx'] = (p['foreR.rx'] ?? 0) * (1 - party) - 0.3 * party;
        p['armL.rx'] = (p['armL.rx'] ?? 0) * (1 - party);
        p['armR.rx'] = (p['armR.rx'] ?? 0) * (1 - party);
        p['head.rx'] = -0.2 * party;
        p['legL.rx'] = (p['legL.rx'] ?? 0) - 0.3 * party * Math.abs(Math.sin((PI * ((t % PERIOD) - 10.9)) / 0.5));
        p['legR.rx'] = (p['legR.rx'] ?? 0) - 0.3 * party * Math.abs(Math.sin((PI * ((t % PERIOD) - 10.9)) / 0.5));
        // "it" reaches out to tag, the tagged child shrieks with arms up
        if (i === 0) {
          const reach = windowed(t % PERIOD, 7.6, 8.3, 8.8, 9.4);
          p['armR.rx'] = (p['armR.rx'] ?? 0) * (1 - reach) - 1.5 * reach;
          p['foreR.rx'] = (p['foreR.rx'] ?? 0) * (1 - reach) - 0.1 * reach;
        }
        if (i === 1) {
          const eek = windowed(t % PERIOD, 8.7, 9.1, 10.0, 10.6);
          p['armL.rz'] += 2.2 * eek;
          p['armR.rz'] -= 2.2 * eek;
          p['head.rx'] = (p['head.rx'] ?? 0) - 0.25 * eek;
        }
        actor.setPose(p);
      },
    };
  });
}
