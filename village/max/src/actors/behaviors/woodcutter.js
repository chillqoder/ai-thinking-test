import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { addWalk, gaitAmp, GaitTracker } from '../../core/gait.js';
import { box, cyl, ico, place } from '../../core/geo.js';
import { mod, rng, smoothstep } from '../../core/math.js';
import { Clip, pose } from '../../core/track.js';
import { groundHeight, WOODCUTTER } from '../../world/layout.js';
import { PAL } from '../../world/palette.js';
import { Actor, bendOver, buildHuman, crouch } from '../human.js';
import { breathe } from './common.js';

// The woodcutter: raise the axe, chop, the log splits and the halves tumble onto the
// woodpile / into the barrow, then he fetches a new log from the stack and sets it on
// the block. Spent halves settle into the piles and the fresh log is drawn out of the
// stack, so the piles never grow and the loop is seamless.

const PERIOD = 6;
const CHOP_T = 1.25;
const STUMP = { x: 0, z: 0.95, top: 0.32 };
const LOG_H = 0.34;
const LOG_R = 0.15;
const PILE = { x: 1.45, z: -0.1 };
const CORE = new THREE.Vector3(PILE.x, 0.36, PILE.z);
const PICK_TURN = 1.63;

function staticProps(rand) {
  const parts = [];
  // chopping block
  parts.push(cyl(0.3, 0.36, 0.34, 9, PAL.woodDark, { x: STUMP.x, y: 0.15, z: STUMP.z }));
  parts.push(cyl(0.29, 0.29, 0.02, 9, '#d9b07a', { x: STUMP.x, y: 0.325, z: STUMP.z }));
  // split-wood heap (right side)
  const heap = [ico(0.42, 0, '#b98a52', { y: 0.06, sy: 0.6 }, { wobble: 0.04 })];
  for (let i = 0; i < 12; i++) {
    const a = rand.next() * Math.PI * 2;
    const r = rand.next() * 0.38;
    heap.push(box(0.3, 0.11, 0.13, rand.next() < 0.5 ? '#d9b07a' : '#8a5a33', { x: Math.cos(a) * r, y: 0.08 + rand.next() * 0.22 * (1 - r), z: Math.sin(a) * r, rx: rand.next() * 0.6, ry: rand.next() * 3, rz: rand.next() * 0.5 }));
  }
  parts.push(...place(heap, { x: -0.85, z: 1.0 }));
  // wheelbarrow full of firewood (left side)
  const barrow = [
    box(0.72, 0.06, 0.56, PAL.wood, { y: 0.28 }),
    box(0.72, 0.3, 0.05, PAL.woodDark, { y: 0.43, z: 0.28 }),
    box(0.72, 0.3, 0.05, PAL.woodDark, { y: 0.43, z: -0.28 }),
    box(0.05, 0.3, 0.56, PAL.woodDark, { x: 0.36, y: 0.43 }),
    box(0.05, 0.3, 0.56, PAL.woodDark, { x: -0.36, y: 0.43 }),
    cyl(0.18, 0.18, 0.06, 8, PAL.timberDark, { x: 0.5, y: 0.18, rx: Math.PI / 2 }),
    box(0.05, 0.25, 0.05, PAL.timberDark, { x: -0.3, y: 0.13, z: 0.2 }),
    box(0.05, 0.25, 0.05, PAL.timberDark, { x: -0.3, y: 0.13, z: -0.2 }),
    box(0.55, 0.04, 0.04, PAL.timberDark, { x: -0.55, y: 0.33, z: 0.22, rz: 0.15 }),
    box(0.55, 0.04, 0.04, PAL.timberDark, { x: -0.55, y: 0.33, z: -0.22, rz: 0.15 }),
    box(0.62, 0.22, 0.46, '#a87a48', { y: 0.38 }),
  ];
  for (let i = 0; i < 7; i++) barrow.push(box(0.26, 0.1, 0.12, rand.next() < 0.5 ? '#d9b07a' : '#8a5a33', { x: -0.22 + (i % 4) * 0.15, y: 0.5 + (i > 3 ? 0.05 : 0), z: -0.13 + Math.floor(i / 4) * 0.22, ry: rand.next() * 0.8 - 0.4, rx: rand.next() * 0.4 }));
  parts.push(...place(barrow, { x: 0.95, z: 1.08, ry: Math.PI / 2 }));
  // stack of fresh logs (rounds lying along Z)
  const stack = [box(0.9, 0.62, 0.62, '#5a3a22', { y: 0.33 })];
  const layers = [[-0.46, -0.15, 0.16, 0.47], [-0.3, 0.0, 0.31], [-0.15, 0.16]];
  layers.forEach((xs, li) => {
    for (const x of xs) {
      for (const z of [-0.18, 0.18]) {
        stack.push(cyl(LOG_R, LOG_R, LOG_H, 8, PAL.woodDark, { x, y: 0.15 + li * 0.27, z, rx: Math.PI / 2 }));
        stack.push(cyl(LOG_R - 0.02, LOG_R - 0.02, LOG_H + 0.01, 8, '#d9b07a', { x, y: 0.15 + li * 0.27, z, rx: Math.PI / 2, sx: 1, sy: 1, sz: 1 }, { jitter: 0.02 }));
      }
    }
  });
  parts.push(...place(stack, { x: PILE.x, z: PILE.z }));
  return parts;
}

function halfLog(side) {
  const parts = [
    cyl(LOG_R, LOG_R, LOG_H, 8, '#8a5a33', {}, { thetaStart: side > 0 ? 0 : Math.PI, thetaLength: Math.PI }),
    box(0.012, LOG_H, LOG_R * 2 - 0.01, '#e3c08a', { x: side * 0.006 }),
  ];
  return mergeGeometries(parts, false);
}

export function createWoodcutter(ctx, effects) {
  const rand = rng(1212);
  const W = WOODCUTTER;
  const heading = Math.PI / 2;
  const y0 = groundHeight(W.x, W.z);
  const base = new THREE.Matrix4().compose(new THREE.Vector3(W.x, y0, W.z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), heading), new THREE.Vector3(1, 1, 1));
  const baseInv = base.clone().invert();
  ctx.buckets.solid.add(staticProps(rand).map((g) => g.applyMatrix4(base)));

  const actor = new Actor(
    ctx,
    buildHuman({ shirt: '#b5453a', sleeves: '#b5453a', pants: '#4a4f5a', hat: 'beanie', hatColor: '#a3352e', beard: '#6b4128', hair: '#6b4128', build: 'big', boots: '#4a3020', tools: { right: 'axe' } }, ctx.materials.solid),
    'woodcutter',
  );

  const READY = { 'armR.rx': -0.55, 'armR.rz': 0.28, 'foreR.rx': -0.35, 'handR.rx': -0.55, 'armL.rx': -0.62, 'armL.rz': -0.32, 'foreL.rx': -0.45, 'spine.rx': 0.12 };
  const RAISE = { 'armR.rx': -2.75, 'armR.rz': 0.15, 'foreR.rx': -0.55, 'handR.rx': 0.35, 'armL.rx': -2.65, 'armL.rz': -0.2, 'foreL.rx': -0.65, 'spine.rx': -0.16, 'chest.rx': -0.1, 'head.rx': -0.08 };
  const PEAK = { ...RAISE, 'armR.rx': -2.92, 'armL.rx': -2.82, 'spine.rx': -0.22 };
  const CHOP = pose({ 'armR.rx': -1.05, 'armR.rz': 0.22, 'foreR.rx': -0.08, 'handR.rx': -0.15, 'armL.rx': -1.0, 'armL.rz': -0.26, 'foreL.rx': -0.12, 'spine.rx': 0.38, 'chest.rx': 0.12, 'head.rx': 0.25 }, crouch(0.06));
  const RECOVER = { 'armR.rx': -0.6, 'armR.rz': 0.1, 'foreR.rx': -0.3, 'handR.rx': -0.7, 'armL.rx': -0.35, 'armL.rz': 0.05, 'foreL.rx': -0.35, 'spine.rx': 0.2 };
  const HOLD = { 'armR.rx': -0.25, 'armR.rz': -0.08, 'foreR.rx': -0.45, 'handR.rx': -1.1, 'armL.rz': 0.1, 'foreL.rx': -0.2, 'spine.rx': 0.05 };
  const REACH = pose(HOLD, bendOver(0.8), crouch(0.15), { 'armL.rx': -1.05, 'armL.rz': 0.05, 'foreL.rx': -0.25, 'head.rx': 0.05 });
  const CARRY = pose(HOLD, { 'armL.rx': -0.55, 'armL.rz': -0.08, 'foreL.rx': -1.35, 'spine.rx': 0.06 });
  const PLACE = pose(HOLD, bendOver(0.45), crouch(0.06), { 'armL.rx': -1.2, 'armL.rz': -0.1, 'foreL.rx': -0.5 });
  const AT_BLOCK = { turn: 0, px: 0, pz: 0 };
  const AT_PILE = { turn: PICK_TURN, px: 0.62, pz: -0.05 };
  const clip = new Clip(
    PERIOD,
    [
      [0, pose(READY, AT_BLOCK)],
      [0.85, RAISE],
      [1.08, PEAK],
      [CHOP_T, CHOP],
      [1.6, RECOVER],
      [2.0, pose(HOLD, AT_BLOCK)],
      [2.6, pose(HOLD, AT_PILE)],
      [3.0, pose(REACH, AT_PILE)],
      [3.25, REACH],
      [3.65, pose(CARRY, AT_PILE)],
      [4.2, pose(CARRY, AT_BLOCK)],
      [4.45, PLACE],
      [4.75, PLACE],
      [5.3, pose(READY, AT_BLOCK)],
    ],
    { label: 'woodcutter' },
  );
  const trackOf = (name) => clip.tracks[clip.names.indexOf(name)];
  const pxT = trackOf('px');
  const pzT = trackOf('pz');
  const gait = new GaitTracker(PERIOD, (tc, out) => out.set(pxT.sample(tc), 0, pzT.sample(tc)), 0.6);

  // falling halves: [x, y, z, rz] keys in the woodcutter frame
  const fallKeys = (side) =>
    side > 0
      ? [[CHOP_T, 0, 0.49, 0.95, 0], [1.42, 0.25, 0.47, 0.97, -0.8], [1.62, 0.68, 0.6, 1.02, -1.5], [1.75, 0.8, 0.56, 1.05, -1.62], [2.55, 0.86, 0.4, 1.06, -1.62]]
      : [[CHOP_T, 0, 0.49, 0.95, 0], [1.42, -0.25, 0.47, 0.96, 0.8], [1.62, -0.62, 0.42, 0.98, 1.5], [1.75, -0.7, 0.38, 0.99, 1.6], [2.55, -0.78, 0.04, 1.0, 1.6]];
  const halves = [1, -1].map((side) => {
    const mesh = new THREE.Mesh(halfLog(side), ctx.materials.solid);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.matrixAutoUpdate = false;
    mesh.name = 'log-half';
    ctx.scene.add(mesh);
    return { mesh, side, keys: fallKeys(side) };
  });

  const q = new THREE.Quaternion();
  const qCarry = new THREE.Quaternion();
  const qUp = new THREE.Quaternion();
  const qPile = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
  const qZ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
  const qY = new THREE.Quaternion();
  const yAxis = new THREE.Vector3(0, 1, 0);
  const pos = new THREE.Vector3();
  const hand = new THREE.Vector3();
  const stumpPos = new THREE.Vector3(STUMP.x, STUMP.top + LOG_H / 2, STUMP.z);
  const m = new THREE.Matrix4();
  const scale = new THREE.Vector3(1, 1, 1);
  const zAxis = new THREE.Vector3(0, 0, 1);
  const chips = Array.from({ length: 7 }, () => ({ a: rand.next() * Math.PI * 2, v: 0.6 + rand.next() * 1.2, up: 1 + rand.next() * 1.4 }));
  const s = {};
  const local = new THREE.Vector3();

  const sampleKeys = (keys, tau, out) => {
    let i = 0;
    while (i < keys.length - 2 && tau > keys[i + 1][0]) i++;
    const a = keys[i];
    const b = keys[i + 1];
    const u = smoothstep(a[0], b[0], tau);
    out.set(a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u, a[3] + (b[3] - a[3]) * u);
    return a[4] + (b[4] - a[4]) * u;
  };

  return {
    update(t) {
      const tau = mod(t, PERIOD);
      clip.sample(t, s);
      const turn = s.turn;
      local.set(s.px, 0, s.pz).applyMatrix4(base);
      actor.place(local.x, groundHeight(local.x, local.z), local.z, heading + turn);
      const p = { ...s };
      addWalk(p, gait.phase(t), gaitAmp(gait.speed(t), 0.5), { lockArmL: true, lockArmR: true, leg: 0.35, arm: 0 });
      breathe(p, t, 0.035, 0.6);
      actor.setPose(p);

      // where the left hand is, expressed in the woodcutter's base frame
      actor.root.updateMatrixWorld(true);
      hand.set(0, -0.07, 0.07).applyMatrix4(actor.bones.handL.matrixWorld).applyMatrix4(baseInv);
      qY.setFromAxisAngle(yAxis, turn);
      qCarry.copy(qY).multiply(qZ);

      for (const h of halves) {
        scale.setScalar(1);
        if (tau >= CHOP_T && tau < 2.65) {
          // tumble off the block, settle on the pile and sink into it (shrinking out of sight)
          q.setFromAxisAngle(zAxis, sampleKeys(h.keys, tau, pos));
          scale.setScalar(1 - smoothstep(1.9, 2.6, tau));
        } else if (tau >= 2.65 && tau < 4.45) {
          // hidden in the stack → drawn out by the hand → carried
          const w = smoothstep(2.95, 3.25, tau);
          pos.copy(CORE).lerp(hand, w);
          q.copy(qPile).slerp(qCarry, w);
          scale.setScalar(smoothstep(2.65, 2.95, tau));
        } else {
          // being set down on the block, then resting there
          const w = tau >= 4.45 ? smoothstep(4.45, 4.75, tau) : 1;
          pos.copy(hand).lerp(stumpPos, w);
          q.copy(qCarry).slerp(qUp, w);
        }
        m.compose(pos, q, scale);
        h.mesh.matrix.multiplyMatrices(base, m);
        h.mesh.matrixWorldNeedsUpdate = true;
      }

      // wood chips fly when the axe bites
      const age = tau - CHOP_T;
      if (age >= 0 && age < 0.45) {
        for (const c of chips) {
          local.set(STUMP.x + Math.cos(c.a) * c.v * age, STUMP.top + LOG_H + c.up * age - 4.9 * age * age, STUMP.z + Math.sin(c.a) * c.v * age).applyMatrix4(base);
          const i = effects.dust.push(local.x, local.y, local.z, 0.8 * Math.min(1, age / 0.05) * (1 - age / 0.45), c.a, c.a * 2, 0);
          effects.dust.setColor(i, CHIP);
        }
      }
    },
  };
}

const CHIP = new THREE.Color('#e3c08a');
