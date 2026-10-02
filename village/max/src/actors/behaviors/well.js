import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { addWalk, gaitAmp, GaitTracker } from '../../core/gait.js';
import { box, cyl, piece, place, prism, torus } from '../../core/geo.js';
import { fract, mod, smoothstep, wave } from '../../core/math.js';
import { Clip } from '../../core/track.js';
import { groundHeight, WELL } from '../../world/layout.js';
import { PAL } from '../../world/palette.js';
import { Actor, buildHuman } from '../human.js';
import { reachIK } from '../rig.js';
import { breathe } from './common.js';

// A peasant cranks the bucket down the well, winds it back up full, unhooks it,
// turns around to pour it into the trough and hangs it back on the rope.

const PERIOD = 15;
const AXLE_Y = 0.95;
const AXLE_R = 0.1;
const CRANK_R = 0.18;
const CRANK_X = 0.8;
const COIL_X = 0.3;
const ROPE_UP = 0.25;
const ROPE_DOWN = 1.3;
const CRANK_SPOT = [0.88, -0.28];
const POUR_SPOT = [0.9, -0.58];
const TROUGH = [0.95, -1.3];

function wellStatic() {
  const parts = [];
  for (let i = 0; i < 11; i++) {
    const a = (i / 11) * Math.PI * 2;
    parts.push(box(0.36, 0.68, 0.17, i % 2 ? PAL.stone : PAL.stoneMid, { x: Math.cos(a) * 0.58, y: 0.34, z: Math.sin(a) * 0.58, ry: -a + Math.PI / 2 }));
  }
  parts.push(torus(0.58, 0.075, 4, 11, Math.PI * 2, PAL.stoneDark, { y: 0.7, rx: Math.PI / 2 }));
  parts.push(cyl(0.52, 0.52, 0.02, 11, '#16202b', { y: 0.5 }));
  for (const s of [-1, 1]) parts.push(box(0.1, 1.32, 0.1, PAL.timber, { x: s * 0.66, y: 0.66 }));
  parts.push(prism(0.95, 0.42, 1.6, PAL.terracotta, { y: 1.3, ry: Math.PI / 2 }));
  parts.push(box(1.62, 0.06, 0.1, PAL.timberDark, { y: 1.3 }));
  return parts;
}

function troughStatic() {
  return [
    box(1.25, 0.08, 0.5, PAL.woodDark, { y: 0.06 }),
    box(1.25, 0.36, 0.06, PAL.wood, { y: 0.24, z: 0.24 }),
    box(1.25, 0.36, 0.06, PAL.wood, { y: 0.24, z: -0.24 }),
    box(0.06, 0.36, 0.5, PAL.wood, { x: 0.6, y: 0.24 }),
    box(0.06, 0.36, 0.5, PAL.wood, { x: -0.6, y: 0.24 }),
    box(1.14, 0.03, 0.42, PAL.water, { y: 0.33 }),
  ];
}

export function createWell(ctx, effects) {
  const y0 = groundHeight(WELL.x, WELL.z);
  const at = (x, z, out = new THREE.Vector3()) => out.set(WELL.x + x, y0, WELL.z + z);
  ctx.buckets.solid.add(place(wellStatic(), { x: WELL.x, y: y0, z: WELL.z }));
  ctx.buckets.solid.add(place(troughStatic(), { x: WELL.x + TROUGH[0], y: groundHeight(WELL.x + TROUGH[0], WELL.z + TROUGH[1]), z: WELL.z + TROUGH[1] }));
  const troughWater = at(TROUGH[0], TROUGH[1]);
  troughWater.y = groundHeight(troughWater.x, troughWater.z) + 0.35;

  // winch: axle, rope coil and crank turn together
  const winch = new THREE.Group();
  winch.position.copy(at(0, 0)).y += AXLE_Y;
  const winchGeo = mergeGeometries([
    cyl(0.05, 0.05, 1.42, 6, PAL.woodDark, { rz: Math.PI / 2 }),
    cyl(AXLE_R, AXLE_R, 0.34, 8, '#c9a56b', { x: COIL_X, rz: Math.PI / 2 }),
    box(0.05, CRANK_R + 0.05, 0.05, PAL.iron, { x: CRANK_X, y: CRANK_R / 2 }),
    cyl(0.025, 0.025, 0.16, 5, PAL.timberDark, { x: CRANK_X + 0.08, y: CRANK_R, rz: Math.PI / 2 }),
  ], false);
  const winchMesh = new THREE.Mesh(winchGeo, ctx.materials.solid);
  winchMesh.castShadow = true;
  winch.add(winchMesh);
  ctx.scene.add(winch);

  const ropeGeo = piece(new THREE.CylinderGeometry(0.012, 0.012, 1, 4), '#c9a56b', { y: -0.5 });
  const rope = new THREE.Mesh(ropeGeo, ctx.materials.solid);
  ctx.scene.add(rope);

  const bucket = new THREE.Group();
  const bucketGeo = mergeGeometries([
    cyl(0.13, 0.1, 0.2, 8, PAL.wood, { y: -0.16 }),
    cyl(0.135, 0.135, 0.03, 8, PAL.iron, { y: -0.1 }),
    cyl(0.115, 0.115, 0.03, 8, PAL.iron, { y: -0.22 }),
    torus(0.12, 0.012, 3, 8, Math.PI, PAL.iron, { y: -0.08 }),
  ], false);
  const bucketMesh = new THREE.Mesh(bucketGeo, ctx.materials.solid);
  bucketMesh.castShadow = true;
  bucket.add(bucketMesh);
  const water = new THREE.Mesh(piece(new THREE.CylinderGeometry(0.115, 0.115, 0.01, 8), PAL.water, null), new THREE.MeshStandardMaterial({ color: '#5cc0e0', roughness: 0.2, flatShading: true }));
  water.position.y = -0.1;
  bucket.add(water);
  ctx.scene.add(bucket);

  const actor = new Actor(
    ctx,
    buildHuman({ shirt: '#d9a03c', sleeves: '#d9a03c', pants: '#6a5a4a', hat: 'straw', hairStyle: 'short', hair: '#8a5a33', skin: '#e8b48f', boots: '#5a3c27' }, ctx.materials.solid),
    'well-peasant',
  );

  const clip = new Clip(
    PERIOD,
    [
      [0, { rope: ROPE_UP, grip: 1, x: CRANK_SPOT[0], z: CRANK_SPOT[1], h: 0, reach: 0, attach: 0, pour: 0, full: 0, wipe: 0 }],
      [0.5, { rope: ROPE_UP }],
      [3.4, { rope: ROPE_DOWN }],
      [3.6, { full: 0 }],
      [3.8, { full: 1 }],
      [4.0, { rope: ROPE_DOWN }],
      [7.2, { rope: ROPE_UP, grip: 1 }],
      [7.6, { grip: 0, reach: 0, attach: 0 }],
      [8.0, { reach: 1 }],
      [8.1, { attach: 0, x: CRANK_SPOT[0], z: CRANK_SPOT[1], h: 0 }],
      [8.35, { attach: 1, reach: 1 }],
      [8.6, { reach: 0 }],
      [9.3, { x: POUR_SPOT[0], z: POUR_SPOT[1], h: Math.PI, pour: 0 }],
      [9.6, { full: 1 }],
      [9.75, { pour: 1 }],
      [10.25, { pour: 1 }],
      [10.4, { full: 0 }],
      [10.6, { pour: 0, x: POUR_SPOT[0], z: POUR_SPOT[1], h: Math.PI }],
      [11.5, { x: CRANK_SPOT[0], z: CRANK_SPOT[1], h: 0, reach: 0 }],
      [11.9, { reach: 1, attach: 1 }],
      [12.25, { attach: 0 }],
      [12.5, { reach: 0, wipe: 0 }],
      [13.0, { wipe: 1 }],
      [13.8, { wipe: 1 }],
      [14.3, { wipe: 0, grip: 0 }],
      [14.9, { grip: 1 }],
    ],
    { label: 'well' },
  );
  const tr = (n) => clip.tracks[clip.names.indexOf(n)];
  const xT = tr('x');
  const zT = tr('z');
  const gait = new GaitTracker(PERIOD, (tc, out) => out.set(xT.sample(tc), 0, zT.sample(tc)), 0.6);

  const s = {};
  const target = new THREE.Vector3();
  const coil = new THREE.Vector3();
  const ropeEnd = new THREE.Vector3();
  const hand = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  const qBucket = new THREE.Quaternion();
  const qTilt = new THREE.Quaternion();
  const xAxis = new THREE.Vector3(1, 0, 0);
  const yAxis = new THREE.Vector3(0, 1, 0);
  const qRope = new THREE.Quaternion();
  const down = new THREE.Vector3(0, -1, 0);

  return {
    update(t) {
      clip.sample(t, s);
      const tau = mod(t, PERIOD);
      const angle = -(s.rope - ROPE_UP) / AXLE_R;
      winch.rotation.x = angle;

      at(s.x, s.z, tmp);
      actor.place(tmp.x, groundHeight(tmp.x, tmp.z), tmp.z, s.h);
      const p = { 'armL.rz': 0.1, 'armR.rz': -0.1, 'foreL.rx': -0.2, 'foreR.rx': -0.2, 'spine.rx': 0.12 * s.grip };
      addWalk(p, gait.phase(t), gaitAmp(gait.speed(t), 0.45), { lockArmR: s.attach > 0.5, arm: 0.25 });
      breathe(p, t, 0.035, 0.1);
      // lean toward the rope when reaching for the bucket
      p['spine.rz'] = -0.22 * s.reach;
      p['spine.rx'] += 0.18 * s.reach;
      // pouring: lean over the trough
      p['spine.rx'] += 0.25 * s.pour;
      p['armL.rx'] = (p['armL.rx'] ?? 0) - 0.9 * s.pour;
      p['foreL.rx'] += -0.6 * s.pour;
      // wipe the brow after a job well done
      p['armL.rx'] += -2.3 * s.wipe;
      p['armL.rz'] += -0.55 * s.wipe;
      p['foreL.rx'] += -1.6 * s.wipe;
      p['head.rx'] = -0.12 * s.wipe;
      p['head.ry'] = 0.1 * wave(t, 4);
      // carrying the bucket: right arm slightly forward
      p['armR.rx'] = (p['armR.rx'] ?? 0) - 0.25 * s.attach * (1 - s.reach);
      actor.setPose(p);

      // hands follow the crank handle while winding
      const b = actor.bones;
      coil.copy(at(COIL_X, 0, coil));
      coil.y += AXLE_Y - AXLE_R;
      if (s.grip > 0.01) {
        target.copy(winch.position).add(tmp.set(CRANK_X + 0.08, CRANK_R * Math.cos(angle), CRANK_R * Math.sin(angle)));
        reachIK(actor.root, b.armR, b.foreR, target, 0.2, 0.215, { weight: s.grip });
        target.x += 0.07;
        reachIK(actor.root, b.armL, b.foreL, target, 0.2, 0.215, { weight: s.grip });
      }
      ropeEnd.copy(coil).addScaledVector(down, s.rope);
      ropeEnd.x += 0.012 * wave(t, 12) * (1 - s.grip * 0.5);
      if (s.reach > 0.01) {
        target.copy(ropeEnd);
        reachIK(actor.root, b.armR, b.foreR, target, 0.2, 0.215, { weight: s.reach });
      }

      // bucket: on the rope, or carried in the right hand
      actor.root.updateMatrixWorld(true);
      hand.set(0, -0.06, 0).applyMatrix4(b.handR.matrixWorld);
      const a = smoothstep(0, 1, s.attach);
      bucket.position.copy(ropeEnd).lerp(hand, a);
      qBucket.setFromAxisAngle(yAxis, s.h);
      qTilt.setFromAxisAngle(xAxis, 1.9 * smoothstep(0, 1, s.pour));
      bucket.quaternion.copy(qBucket).multiply(qTilt);
      water.scale.setScalar(Math.max(1e-3, s.full));
      water.visible = s.full > 0.01;

      // rope: from the coil to the bucket (or dangling when the bucket is carried)
      const end = a > 0.5 ? tmp.copy(coil).addScaledVector(down, ROPE_UP) : bucket.position;
      const len = coil.distanceTo(end);
      rope.position.copy(coil);
      qRope.setFromUnitVectors(down, tmp.subVectors(end, coil).normalize());
      rope.quaternion.copy(qRope);
      rope.scale.set(1, Math.max(len, 0.01), 1);

      // water pouring into the trough
      const flow = smoothstep(0.3, 0.95, s.pour) * smoothstep(0.02, 0.4, s.full);
      if (flow > 0.001) {
        for (let i = 0; i < 12; i++) {
          const age = fract(tau * 2.5 + i / 12);
          const fwd = Math.cos(s.h);
          const lip = bucket.position;
          const size = flow * (1.1 - age * 0.4) * smoothstep(0, 0.08, age) * (1 - smoothstep(0.9, 1, age));
          effects.drops.push(lip.x + 0.04 * Math.sin(i * 2.1), lip.y - 0.1 - 2.4 * age * age, lip.z + fwd * (0.18 + 0.1 * age), size);
        }
        effects.ripples.push(troughWater.x, troughWater.y, troughWater.z, fract(tau * 1.6), 0.35, 0.7 * flow);
      }
    },
  };
}
