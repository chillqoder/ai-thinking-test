import * as THREE from 'three';
import { piece } from '../../core/geo.js';
import { mod, rng, smoothstep, wave } from '../../core/math.js';
import { Clip, pose } from '../../core/track.js';
import { BALCONY, GATE } from '../../world/castle.js';
import { CASTLE, FORGE, groundHeight } from '../../world/layout.js';
import { Actor, buildHuman, crouch } from '../human.js';
import { reachIK } from '../rig.js';
import { breathe } from './common.js';

// ------------------------------------------------------------------ the king

export function createKing(ctx) {
  const actor = new Actor(
    ctx,
    buildHuman({ shirt: '#2f4f9a', pants: '#efe6d6', hat: 'crown', cape: '#b2302e', collar: '#f7f3ea', beard: '#ece6dc', hair: '#ece6dc', hairStyle: 'short', build: 'big', boots: '#3a2a20', belt: '#d9a83a', skin: '#f2c7a5' }, ctx.materials.solid),
    'king',
  );
  const z = BALCONY.railZ - 0.43;
  actor.place(BALCONY.x, BALCONY.floor, z, 0);
  const clip = new Clip(
    20,
    [
      [0, { yaw: 0, nod: 0, lean: 0.05, twist: 0 }],
      [2.5, { yaw: 0.55, twist: 0.14 }],
      [5.0, { yaw: 0.55, twist: 0.14 }],
      [6.4, { yaw: 0, twist: 0 }],
      [7.0, { nod: 0 }],
      [7.35, { nod: 0.24 }],
      [7.7, { nod: 0 }],
      [8.05, { nod: 0.2 }],
      [8.45, { nod: 0 }],
      [9.6, { yaw: -0.55, twist: -0.14 }],
      [12.4, { yaw: -0.55, twist: -0.14 }],
      [13.4, { yaw: 0, twist: 0, lean: 0.05, nod: 0 }],
      [14.5, { lean: 0.42, nod: 0.32 }],
      [15.6, { yaw: 0.2, twist: 0.05 }],
      [16.4, { yaw: -0.15, twist: -0.04 }],
      [16.8, { lean: 0.42, nod: 0.32 }],
      [17.8, { lean: 0.05, nod: 0, yaw: 0, twist: 0 }],
    ],
    { label: 'king' },
  );
  const s = {};
  const target = new THREE.Vector3();
  return {
    update(t) {
      clip.sample(t, s);
      const p = {
        'head.ry': s.yaw,
        'chest.ry': s.twist,
        'head.rx': s.nod + s.lean * 0.2,
        'spine.rx': s.lean * 0.6,
        'chest.rx': s.lean * 0.4,
        'hips.pz': -s.lean * 0.1,
        'legL.rz': 0.04,
        'legR.rz': -0.04,
      };
      breathe(p, t, 0.045);
      p['cape.rx'] = -(p['spine.rx'] + p['chest.rx']) + 0.1 + 0.03 * wave(t, 6);
      actor.setPose(p);
      const b = actor.bones;
      for (const [side, sx] of [['L', 1], ['R', -1]]) {
        target.set(BALCONY.x + sx * 0.2, BALCONY.railY + 0.04, BALCONY.railZ - 0.02);
        reachIK(actor.root, b[`arm${side}`], b[`fore${side}`], target, 0.2, 0.215);
        b[`hand${side}`].rotation.x = 0.4;
      }
    },
  };
}

// ------------------------------------------------------------------ gate guards

export function createGuards(ctx) {
  const guards = [];
  const looks = [
    { tabard: ['#2f57a6', '#f2c94c'], shirt: '#8d8c95', pants: '#4a4f5a', hat: 'helmet', beard: '#6b4128', tools: { right: 'spear' } },
    { tabard: ['#2f57a6', '#f2c94c'], shirt: '#8d8c95', pants: '#4a4f5a', hat: 'helmet', hair: '#c9873f', tools: { right: 'spear' }, build: 'big' },
  ];
  const clips = [
    new Clip(15, [
      [0, { yaw: 0, shift: 0, check: 0 }],
      [3.0, { yaw: 0.6 }],
      [5.0, { yaw: 0.6 }],
      [6.2, { yaw: 0 }],
      [8.4, { shift: 0, check: 0 }],
      [9.4, { shift: 1, check: 1 }],
      [11.2, { shift: 1, check: 1 }],
      [12.2, { shift: 0, check: 0, yaw: 0 }],
      [13.0, { yaw: -0.3 }],
      [14.2, { yaw: 0 }],
    ], { label: 'guard A' }),
    new Clip(20, [
      [0, { yaw: 0, yawn: 0 }],
      [3.0, { yaw: -0.5 }],
      [5.5, { yaw: -0.5 }],
      [6.5, { yaw: 0 }],
      [8.0, { yawn: 0 }],
      [9.0, { yawn: 1 }],
      [10.6, { yawn: 1 }],
      [11.6, { yawn: 0 }],
      [14.0, { yaw: 0 }],
      [15.0, { yaw: -0.65 }],
      [17.5, { yaw: -0.65 }],
      [18.5, { yaw: 0 }],
    ], { label: 'guard B' }),
  ];
  [-1, 1].forEach((side, i) => {
    const actor = new Actor(ctx, buildHuman(looks[i], ctx.materials.solid), 'guard');
    const x = GATE.x + side * 1.5;
    const z = GATE.z + 0.8;
    actor.place(x, groundHeight(x, z), z, 0);
    const clip = clips[i];
    const s = {};
    guards.push({
      update(t) {
        clip.sample(t, s);
        const p = {
          'armR.rx': -0.28,
          'armR.rz': -0.12,
          'foreR.rx': -1.3,
          'handR.rx': -0.02,
          'armL.rz': 0.12,
          'foreL.rx': -0.2,
          'head.ry': s.yaw,
          'chest.ry': s.yaw * 0.15,
          'legL.rz': 0.05,
          'legR.rz': -0.05,
        };
        breathe(p, t, 0.035, i * 0.4);
        if (s.shift !== undefined) {
          p['hips.px'] = 0.03 * s.shift;
          p['hips.rz'] = 0.04 * s.shift;
          p['legL.rz'] += 0.05 * s.shift;
          p['legR.rz'] += 0.03 * s.shift;
          // glance down at the spear tip, then back
          p['head.rx'] = -0.18 * s.check;
          p['head.ry'] += 0.25 * s.check;
        }
        if (s.yawn !== undefined) {
          const y = s.yawn;
          p['head.rx'] = -0.38 * y;
          p['armL.rx'] = -1.85 * y;
          p['armL.rz'] = 0.12 - 0.42 * y;
          p['foreL.rx'] = -0.2 - 1.9 * y;
          p['spine.rx'] = -0.1 * y;
          p['chest.rx'] = (p['chest.rx'] ?? 0) - 0.1 * y;
        }
        actor.setPose(p);
      },
    });
  });
  return guards;
}

// ------------------------------------------------------------------ blacksmith

const STRIKES = [0.35, 1.15, 1.95, 2.75];

export function createBlacksmith(ctx, anvil, effects) {
  const actor = new Actor(
    ctx,
    buildHuman({ shirt: '#7a5a46', sleeves: '#7a5a46', apron: '#4a3020', build: 'big', hairStyle: 'bald', hair: '#4a3222', beard: '#4a3222', shortSleeves: true, pants: '#4a3f36', tools: { right: 'hammer', left: 'tongs' } }, ctx.materials.solid),
    'blacksmith',
  );
  const x = anvil.x - 0.7;
  const z = anvil.z;
  actor.place(x, CASTLE.top, z, Math.PI / 2);
  // glowing workpiece held in the tongs
  const glowing = new THREE.Mesh(piece(new THREE.BoxGeometry(0.05, 0.16, 0.05), '#ff8a2a', null), ctx.materials.fire);
  glowing.position.set(0, -0.47, 0);
  actor.bones.handL.add(glowing);

  const RAISED = { 'armR.rx': -2.05, 'armR.rz': -0.2, 'foreR.rx': -1.1, 'handR.rx': 0.2, 'spine.rx': 0.1 };
  const STRIKE = { 'armR.rx': -0.82, 'armR.rz': -0.06, 'foreR.rx': -0.4, 'handR.rx': -0.15, 'spine.rx': 0.3, ...crouch(0.035) };
  const HOLD = { 'armL.rx': -0.62, 'armL.rz': -0.3, 'foreL.rx': -0.8, 'handL.rx': 0.25 };
  const REST = { 'armR.rx': -0.35, 'armR.rz': -0.1, 'foreR.rx': -0.55, 'handR.rx': -0.6, 'spine.rx': 0.12 };
  const LIFT = { 'armL.rx': -1.05, 'armL.rz': -0.15, 'foreL.rx': -1.3, 'handL.rx': 0.3, 'head.rx': -0.06, 'head.ry': 0.22, 'spine.rx': 0.05 };
  const clip = new Clip(
    6,
    [
      [0, pose(RAISED, HOLD)],
      [0.35, pose(STRIKE, HOLD)],
      [0.75, pose(RAISED, HOLD)],
      [1.15, pose(STRIKE, HOLD)],
      [1.55, pose(RAISED, HOLD)],
      [1.95, pose(STRIKE, HOLD)],
      [2.35, pose(RAISED, HOLD, { 'armR.rx': -1.8 })],
      [2.75, pose(STRIKE, HOLD)],
      [3.2, pose(REST, HOLD)],
      [3.75, pose(REST, LIFT)],
      [4.3, pose(REST, LIFT, { 'handL.ry': 1.3, 'head.ry': 0.1 })],
      [4.8, pose(REST, LIFT, { 'handL.ry': 1.3, 'head.ry': 0.1 })],
      [5.25, pose(REST, HOLD)],
      [5.65, pose(RAISED, HOLD, { 'armR.rx': -1.6 })],
    ],
    { label: 'blacksmith' },
  );
  const rand = rng(66);
  const sparkDirs = Array.from({ length: 9 }, () => ({ a: rand.next() * Math.PI * 2, v: 0.8 + rand.next() * 1.6, up: 1.0 + rand.next() * 1.6 }));
  return {
    update(t) {
      const p = clip.sample(t, {});
      breathe(p, t, 0.04, 0.2);
      actor.setPose(p);
      // sparks fly from the anvil after every strike
      const tau = mod(t, 6);
      for (const ts of STRIKES) {
        const age = tau - ts;
        if (age < 0 || age > 0.5) continue;
        for (const d of sparkDirs) {
          const s = Math.min(1, age / 0.04) * (1 - age / 0.5);
          effects.sparks.push(anvil.x + Math.cos(d.a) * d.v * age, anvil.y + 0.05 + d.up * age - 4.9 * age * age, anvil.z + Math.sin(d.a) * d.v * age, s);
        }
      }
      glowing.scale.setScalar(0.9 + 0.1 * smoothstep(0, 1, wave(t, 10)));
    },
  };
}

export { FORGE };
