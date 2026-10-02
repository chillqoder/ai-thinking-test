import * as THREE from 'three';
import { addWalk, gaitAmp, GaitTracker } from '../../core/gait.js';
import { angleDelta, rng, wave } from '../../core/math.js';
import { Clip } from '../../core/track.js';
import { Actor, buildHuman } from '../human.js';
import { breathe } from './common.js';

// Archers patrol the curtain wall in pairs: tower → tower, turn, walk back to the
// middle, stop at the parapet to look out over the kingdom, then return and chat.

const PERIOD = 30;
const WALK_LIFT = 0.06;

const LOOKS = [
  { shirt: '#4f7a3a', pants: '#5a4632', hat: 'hood', hatColor: '#3f6e34' },
  { shirt: '#7a5a3a', pants: '#4a3f36', hat: 'hood', hatColor: '#6b4a2e' },
  { shirt: '#3f6b5a', pants: '#5a4a3a', hat: 'hood', hatColor: '#2f5a4a' },
];

export function createArchers(ctx, walkways) {
  const rand = rng(11);
  const plan = [
    { wall: 1, offset: 0 },
    { wall: 0, offset: 7 },
    { wall: 2, offset: 15.5 },
    { wall: 5, offset: 22.5 },
    { wall: 3, offset: 11 },
  ];
  const archers = [];

  for (const g of plan) {
    const w = walkways.find((ww) => ww.index === g.wall);
    const A = new THREE.Vector3(...w.a);
    const B = new THREE.Vector3(...w.b);
    const len = A.distanceTo(B);
    const dir = new THREE.Vector3().subVectors(B, A).normalize();
    const hAB = Math.atan2(dir.x, dir.z);
    const hOut = Math.atan2(w.out[0], w.out[1]);
    const outTurn = Math.PI + angleDelta(hAB + Math.PI, hOut);
    const P = Math.PI;
    const clip = new Clip(
      PERIOD,
      [
        [0.0, { s: 0, turn: 0, look: 0, act: 0, chat: 0 }],
        [1.0, { s: 0 }],
        [7.4, { s: 1, turn: 0 }],
        [8.8, { turn: P }],
        [9.2, { s: 1 }],
        [12.4, { s: 0.5, turn: P }],
        [13.4, { turn: outTurn, look: 0, act: 0 }],
        [14.2, { act: 1, look: 0.15 }],
        [15.6, { look: 0.55 }],
        [16.6, { look: 0.55 }],
        [17.6, { look: -0.45 }],
        [18.4, { look: -0.45, act: 1 }],
        [19.0, { look: 0, act: 0, turn: outTurn }],
        [19.8, { turn: P, s: 0.5 }],
        [23.4, { s: 0, turn: P }],
        [24.8, { turn: 0, chat: 0 }],
        [25.8, { chat: 1 }],
        [28.4, { chat: 1 }],
        [29.3, { chat: 0 }],
      ],
      { label: 'archer patrol' },
    );
    const sTrack = clip.tracks[clip.names.indexOf('s')];
    const left = new THREE.Vector3(Math.cos(hAB), 0, -Math.sin(hAB));

    for (let m = 0; m < 2; m++) {
      const lat = m === 0 ? 0.27 : -0.27;
      const delay = m * 0.25 + rand.next() * 0.1;
      const look = LOOKS[Math.floor(rand.next() * LOOKS.length)];
      const actor = new Actor(
        ctx,
        buildHuman({ ...look, skin: rand.pick(['#f2c7a5', '#e8b48f', '#d9a079']), hair: rand.pick(['#4a3222', '#8a5a33', '#2e2420']), quiver: true, boots: '#4a3020', tools: { left: 'bow' } }, ctx.materials.solid),
        'archer',
      );
      const posAt = (tc, out) => out.copy(A).addScaledVector(dir, sTrack.sample(tc) * len).addScaledVector(left, lat);
      const gait = new GaitTracker(PERIOD, posAt, 0.82);
      const chatSign = lat > 0 ? -1 : 1;
      const pos = new THREE.Vector3();
      const sample = {};
      archers.push({
        update(t) {
          const tc = t + g.offset - delay;
          clip.sample(tc, sample);
          posAt(tc, pos);
          actor.place(pos.x, pos.y + WALK_LIFT, pos.z, hAB + sample.turn);
          const amp = gaitAmp(gait.speed(tc), 0.55);
          const p = {
            'armL.rx': -0.32,
            'armL.rz': 0.12,
            'foreL.rx': -1.25,
            'handL.rx': 0.2,
            'armR.rz': -0.1,
            'foreR.rx': -0.15,
          };
          addWalk(p, gait.phase(tc), amp, { lockArmL: true });
          breathe(p, t, 0.03, m * 0.3 + g.offset);
          const act = sample.act;
          p['head.ry'] = (p['head.ry'] ?? 0) + sample.look * (m === 0 ? 1 : 0.8) + sample.chat * chatSign * 0.75;
          p['chest.ry'] = (p['chest.ry'] ?? 0) + sample.look * 0.22 + sample.chat * chatSign * 0.18;
          p['spine.rx'] = (p['spine.rx'] ?? 0) + 0.16 * act;
          p['hips.pz'] = (p['hips.pz'] ?? 0) - 0.02 * act;
          if (m === 0) {
            // shade the eyes and scan the horizon
            p['armR.rx'] = -2.15 * act + (p['armR.rx'] ?? 0) * (1 - act);
            p['armR.rz'] = -0.1 + 0.62 * act;
            p['foreR.rx'] = -0.15 - 1.75 * act;
            p['head.rx'] = -0.12 * act;
          } else {
            // point toward something far away
            p['armR.rx'] = -1.5 * act + (p['armR.rx'] ?? 0) * (1 - act);
            p['armR.rz'] = -0.1 - 0.25 * act;
            p['foreR.rx'] = -0.15 + 0.1 * act;
            p['head.rx'] = -0.08 * act;
          }
          // a little chatter while waiting at the tower
          p['armR.rx'] += -0.45 * sample.chat * (m === 0 ? 1 : 0.3) * (0.6 + 0.4 * wave(t, 75));
          p['head.rx'] = (p['head.rx'] ?? 0) + 0.06 * sample.chat * wave(t, 150);
          actor.setPose(p);
        },
      });
    }
  }
  return archers;
}
