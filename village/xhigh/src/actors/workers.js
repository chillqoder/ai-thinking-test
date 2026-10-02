// Working villagers: the woodcutter, the well peasant, the farmer, the
// fisherman and the market vendor. Each runs its own short work cycle whose
// period divides the 60 s loop.

import * as THREE from 'three';
import { Humanoid, makeAxe, makeHoe, makeRod, makeBucket, SKIN } from './humanoid.js';
import { makeFish } from './animals.js';
import { Script } from '../core/script.js';
import { keyed, keyedQuat, span } from '../core/keys.js';
import { TAU, osc, phase, local, track, ramp, lin, hold, hump, smooth, lerp, clamp, lerpAngle, easeIn, easeOut, mod } from '../core/loop.js';
import { charMat } from '../core/materials.js';
import { Builder, cyl, box, sphere } from '../core/geo.js';
import { heightAt } from '../world/island.js';
import { WOODCUT, WELL, TROUGH, FIELD, DOCK, POND } from '../world/layout.js';
import { WELL_RIG, TROUGH_RIG } from '../world/village.js';
import { makeRipple } from '../world/water.js';
import { MAID_AT_STALL } from './schedule.js';

const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _c = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const Y = new THREE.Vector3(0, 1, 0);

function partMesh(fn) {
  const b = new Builder();
  fn(b);
  const m = new THREE.Mesh(b.geometry(), charMat);
  m.castShadow = true;
  return m;
}

/** Blend two hand targets by their weights and reach with the combined weight. */
function reachBlend(h, side, ta, wa, tb, wb) {
  const w = clamp(wa + wb);
  if (w <= 0.001) return;
  const k = wa + wb > 0 ? wb / (wa + wb) : 0;
  _c.copy(ta).lerp(tb, k);
  h.reach(side, _c, w);
}

// ---------------------------------------------------------------------------
// Woodcutter — 7.5 s: swing, split, fetch a log, set it on the block, repeat.
// ---------------------------------------------------------------------------

function buildWoodcutter(group, village) {
  const P = 7.5;
  const gy = village.anchors.woodY;
  const S = new THREE.Vector3(WOODCUT.x, gy, WOODCUT.z); // stump base
  const TOP = 0.45;
  const h = new Humanoid({ skin: SKIN[1], shirt: 0xb8423a, pants: 0x46587a, hat: 'cap', hatColor: 0x3f5f3a, beard: 0x8a4a22, hair: 0x8a4a22, shoes: 0x4a3426 });
  const axe = makeAxe();

  const logMesh = partMesh((b) => {
    b.add(cyl(0.18, 0.18, 0.5, 8), 0x8a5a33, {});
    b.add(cyl(0.165, 0.165, 0.505, 8), 0xd9b98a, {});
  });
  const log = new THREE.Group();
  log.add(logMesh);
  const halves = [1, -1].map((side) => {
    const pivot = new THREE.Group();
    const m = partMesh((b) => {
      b.add(new THREE.CylinderGeometry(0.18, 0.18, 0.5, 8, 1, false, side > 0 ? -Math.PI / 2 : Math.PI / 2, Math.PI), 0x8a5a33, {});
      b.add(box(0.34, 0.5, 0.01), 0xe2c497, {});
    });
    m.position.set(0, 0.25, -side * 0.18);
    pivot.add(m);
    return { pivot, side };
  });
  group.add(h.root, axe, log, ...halves.map((x) => x.pivot));

  const chopX = S.x - 0.95;
  const pileX = S.x - 1.45;
  const stumpPos = new THREE.Vector3(S.x, gy + TOP + 0.25, S.z);
  const pile = village.anchors.logPile;
  const pileRest = new THREE.Vector3(pile.x, pile.y, pile.z);
  const pileHidden = pileRest.clone().add(new THREE.Vector3(0, -0.42, 0));
  const qUp = new THREE.Quaternion();
  const qPile = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
  const carryPos = new THREE.Vector3();
  const qCarry = new THREE.Quaternion();
  const logKeys = [
    [1.55, pileHidden],
    [2.9, pileRest],
    [3.75, pileRest],
    [4.5, carryPos],
    [5.3, carryPos],
    [6.0, stumpPos],
  ];
  const logQuatKeys = [
    [1.55, qPile],
    [3.75, qPile],
    [4.5, qCarry],
    [5.3, qCarry],
    [6.0, qUp],
  ];

  // axe poses in body space: grip position + swing angle φ (0 = handle up, π/2 = forward)
  const POSE = {
    ready: { g: new THREE.Vector3(-0.03, 1.0, 0.2), phi: 1.6 },
    raised: { g: new THREE.Vector3(-0.05, 1.88, -0.05), phi: -0.6 },
    impact: { g: new THREE.Vector3(-0.03, 1.05, 0.25), phi: 1.83 },
  };
  const restPos = S.clone().add(new THREE.Vector3(-0.62, 0.5, 0.62));
  const restQuat = new THREE.Quaternion().setFromUnitVectors(Y, new THREE.Vector3(0.55, -0.5, 0.12).normalize());
  const grip = new THREE.Vector3();
  const heldPos = new THREE.Vector3();
  const heldQuat = new THREE.Quaternion();

  const lean = track(
    [
      [0, 0.12],
      [0.3, 0.12],
      [1.3, -0.15],
      [1.5, 0.42],
      [1.75, 0.42],
      [2.35, 0.08],
      [3.15, 0.08],
      [3.7, 0.62],
      [3.85, 0.62],
      [4.5, 0.08],
      [5.3, 0.08],
      [5.8, 0.42],
      [6.05, 0.42],
      [6.6, 0.4],
      [7.2, 0.12],
    ],
    P,
  );

  return (t) => {
    const T = local(t, P);
    const toPile = ramp(T, 2.35, 3.15);
    const back = ramp(T, 4.5, 5.3);
    const x = lerp(chopX, pileX, toPile * (1 - back));
    const yaw = Math.PI / 2 + Math.PI * toPile + Math.PI * back;
    h.reset().place(x, gy, S.z, yaw);
    const shuffle = hump(T, 2.35, 3.15) + hump(T, 4.5, 5.3);
    h.walk(lin(T, 2.35, 3.15) + lin(T, 4.5, 5.3), shuffle * 0.6);
    h.breathe(osc(t, 2.5));
    h.bend(lean(T), 0.45);
    h.look(0, 0.25);
    h.sync();

    // ---- axe
    let pose;
    let k = 0;
    if (T < 0.3) pose = [POSE.ready, POSE.ready, 0];
    else if (T < 1.3) pose = [POSE.ready, POSE.raised, smooth(lin(T, 0.3, 1.3))];
    else if (T < 1.55) pose = [POSE.raised, POSE.impact, easeIn(lin(T, 1.3, 1.55))];
    else if (T < 6.6) pose = [POSE.impact, POSE.impact, 0];
    else pose = [POSE.ready, POSE.ready, 0];
    k = pose[2];
    grip.copy(pose[0].g).lerp(pose[1].g, k);
    h.root.localToWorld(heldPos.copy(grip));
    _e.set(lerp(pose[0].phi, pose[1].phi, k), yaw, 0, 'YXZ');
    heldQuat.setFromEuler(_e);
    const held = 1 - ramp(T, 1.75, 2.35) + ramp(T, 6.7, 7.2);
    axe.position.copy(restPos).lerp(heldPos, held);
    axe.quaternion.copy(restQuat).slerp(heldQuat, held);

    // ---- the log and its two halves
    const split = T >= 1.55 && T < 5.2;
    if (T >= 1.55) {
      h.root.localToWorld(carryPos.set(0, 1.0, 0.42));
      _e.set(0, yaw, Math.PI / 2, 'YXZ');
      qCarry.setFromEuler(_e);
      keyed(T, logKeys, log.position);
      keyedQuat(T, logQuatKeys, log.quaternion);
    } else {
      log.position.copy(stumpPos);
      log.quaternion.identity();
    }
    log.visible = !(T >= 1.55 && T < 1.62);
    for (const hv of halves) {
      hv.pivot.visible = split;
      if (!split) continue;
      const fall = easeIn(lin(T, 1.55, 1.85));
      const slide = smooth(lin(T, 1.8, 2.25));
      const sink = lin(T, 2.4, 5.1);
      hv.pivot.position.set(S.x + slide * 0.12, gy + TOP + slide * (0.12 - TOP) - sink * 0.42, S.z + hv.side * lerp(0.18, 1.02, slide));
      hv.pivot.rotation.set(hv.side * (fall * 1.45 + slide * 0.2), 0, 0);
    }

    // ---- hands: axe grips, or log ends
    h.sync();
    const wAxe = 1 - ramp(T, 2.35, 2.6) + ramp(T, 6.0, 6.6);
    const wLog = ramp(T, 3.2, 3.7) * (1 - ramp(T, 5.95, 6.25));
    axe.updateMatrixWorld();
    log.updateMatrixWorld();
    const axL = axe.localToWorld(_a.set(0, 0.04, 0));
    const lgL = log.localToWorld(_b.set(0, -0.23, 0));
    reachBlend(h, 'L', axL.clone(), wAxe, lgL.clone(), wLog);
    const axR = axe.localToWorld(_a.set(0, 0.24, 0));
    const lgR = log.localToWorld(_b.set(0, 0.23, 0));
    reachBlend(h, 'R', axR.clone(), wAxe, lgR.clone(), wLog);
  };
}

// ---------------------------------------------------------------------------
// Well peasant — 15 s: crank the bucket down and up, carry it to the trough,
// pour, hang it back, return to the crank.
// ---------------------------------------------------------------------------

function buildWellPeasant(group, village) {
  const P = 15;
  const R = WELL_RIG;
  const gy = village.anchors.wellY;
  const W = new THREE.Vector3(WELL.x, gy, WELL.z);
  const h = new Humanoid({ skin: SKIN[2], shirt: 0xc9a66b, pants: 0x6a5a48, hat: 'straw', hatColor: 0xe0c068, hair: 0x3a2a1a, shoes: 0x4a3426, sleeves: 'short' });
  group.add(h.root);

  // winch: axle, drum, crank arm and handle — rotates about X
  const winch = new THREE.Group();
  winch.position.set(W.x, gy + R.axleY, W.z);
  winch.add(
    partMesh((b) => {
      b.add(cyl(0.05, 0.05, R.postX * 2 + 0.3, 7), 0x7a5232, { r: [0, 0, Math.PI / 2] });
      b.add(cyl(R.drumR, R.drumR, 0.55, 9), 0x9c6d42, { r: [0, 0, Math.PI / 2] });
      b.add(box(0.05, 0.05, R.crankR + 0.04), 0x4b4f58, { p: [R.crankX, 0, R.crankR / 2] });
      b.add(cyl(0.025, 0.025, 0.2, 6), 0x7a5232, { p: [R.crankX + 0.09, 0, R.crankR], r: [0, 0, Math.PI / 2] });
    }),
  );
  group.add(winch);
  const rope = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 5), new THREE.MeshStandardMaterial({ color: 0xcdb98a, roughness: 1 }));
  rope.castShadow = true;
  group.add(rope);
  const hook = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.01, 4, 8), new THREE.MeshStandardMaterial({ color: 0x4b4f58 }));
  group.add(hook);
  const bucket = makeBucket();
  group.add(bucket.group);
  const stream = new THREE.Mesh(new THREE.CylinderGeometry(1, 0.7, 1, 6, 1, true), new THREE.MeshStandardMaterial({ color: 0x7fd2f0, transparent: true, opacity: 0.8, roughness: 0.1 }));
  group.add(stream);
  const ripple = makeRipple(group);
  const troughY = village.anchors.troughY + TROUGH_RIG.waterY + 0.012;

  const K = new THREE.Vector3(W.x + 1.51, 0, W.z + 0.265);
  const G = new THREE.Vector3(W.x, 0, W.z + 1.0);
  const path = new THREE.CatmullRomCurve3([K, new THREE.Vector3(W.x + 1.08, 0, W.z + 1.05), G], false, 'centripetal');
  const ropeTop = new THREE.Vector3(W.x, gy + R.axleY - 0.02, W.z + R.drumR);
  const hookPos = new THREE.Vector3();
  const pos = new THREE.Vector3();
  const tan = new THREE.Vector3();
  const carryPos = new THREE.Vector3();
  const carryQuat = new THREE.Quaternion();
  const LMIN = 0.15;
  const LMAX = 2.05;

  return (t) => {
    const T = local(t, P);
    // ---- walking between the crank (K) and the grab spot (G)
    let yaw = -Math.PI / 2;
    let moving = 0;
    let ph = 0;
    if (T >= 7.0 && T < 13.0) {
      const u = smooth(lin(T, 7.0, 8.4));
      path.getPointAt(u, pos);
      path.getTangentAt(u, tan);
      const heading = Math.atan2(tan.x, tan.z);
      yaw = lerpAngle(lerpAngle(-Math.PI / 2, heading, ramp(T, 7.0, 7.35)), Math.PI, ramp(T, 8.05, 8.55));
      yaw += Math.PI * ramp(T, 9.3, 10.0) - Math.PI * ramp(T, 11.6, 12.3);
      moving = hump(T, 7.0, 8.4);
      ph = lin(T, 7.0, 8.4) * 3;
    } else if (T >= 13.0 && T < 14.6) {
      const u = 1 - smooth(lin(T, 13.0, 14.2));
      path.getPointAt(u, pos);
      path.getTangentAt(u, tan);
      const heading = Math.atan2(-tan.x, -tan.z);
      yaw = lerpAngle(lerpAngle(Math.PI, heading, ramp(T, 13.0, 13.35)), -Math.PI / 2, ramp(T, 13.9, 14.45));
      moving = hump(T, 13.0, 14.2) + hump(T, 14.1, 14.5) * 0.3;
      ph = lin(T, 13.0, 14.2) * 3 + lin(T, 14.1, 14.5);
    } else pos.copy(K);
    h.reset().place(pos.x, gy, pos.z, yaw);
    h.walk(ph % 1, moving);
    h.breathe(osc(t, 3));

    // ---- crank angle + rope length (three turns down, three up)
    const wind = ramp(T, 0.3, 3.3) - ramp(T, 3.9, 6.9);
    const phi = -TAU * 3 * wind;
    winch.rotation.x = phi;
    const L = LMIN + (LMAX - LMIN) * wind;
    const pull = 0.42 * (ramp(T, 8.3, 8.75) - ramp(T, 9.2, 9.8) + ramp(T, 12.0, 12.4) - ramp(T, 12.75, 13.4));
    hookPos.set(W.x, gy + R.axleY - L, W.z + R.drumR + pull);
    span(rope, ropeTop, hookPos, 0.012);
    hook.position.copy(hookPos).setY(hookPos.y - 0.03);
    hook.rotation.set(0, Math.PI / 2, 0);

    // ---- body pose
    const cranking = 1 - ramp(T, 6.9, 7.2) + ramp(T, 14.4, 14.9);
    h.torso.rotation.x += 0.1 * cranking;
    h.torso.rotation.z += Math.sin(phi) * 0.06 * cranking;
    h.pelvis.position.x += Math.cos(phi) * 0.02 * cranking;
    h.look(-0.25 * cranking, 0.3 * cranking);
    const grabBend = hold(T, 8.3, 8.75, 8.9, 9.3) * 0.38 + hold(T, 12.2, 12.6, 12.8, 13.1) * 0.32;
    const pour = hold(T, 10.0, 10.5, 11.2, 11.6);
    h.bend(grabBend + pour * 0.15, 0.5);
    h.look(0, grabBend * 0.4 + pour * 0.35);
    // left hand on the hip while cranking
    h.arms.L.shoulder.rotation.z += 0.55 * cranking;
    h.arms.L.shoulder.rotation.x += 0.15 * cranking;
    h.arms.L.elbow.rotation.x += -1.5 * cranking;
    h.sync();

    // ---- bucket: hangs from the hook, or is carried and tipped into the trough
    const carry = ramp(T, 8.9, 9.3) - ramp(T, 12.3, 12.8);
    const tilt = 1.85 * pour;
    h.root.localToWorld(carryPos.set(0, lerp(0.8, 0.74, pour), lerp(0.46, 0.56, pour)));
    _e.set(-tilt, yaw + Math.PI, 0, 'YXZ');
    carryQuat.setFromEuler(_e);
    bucket.group.position.set(hookPos.x, hookPos.y - 0.41, hookPos.z).lerp(carryPos, carry);
    bucket.group.quaternion.identity().slerp(carryQuat, carry);
    const level = T < 3.3 ? 0 : T < 10.4 ? 1 : 1 - lin(T, 10.4, 11.2);
    bucket.water.visible = level > 0.02;
    bucket.water.position.y = 0.04 + 0.17 * level;
    bucket.water.scale.setScalar(0.8 + 0.2 * level);

    // pour stream + ripple in the trough
    const flow = hold(T, 10.35, 10.55, 11.0, 11.25);
    bucket.group.updateMatrixWorld();
    const lip = bucket.group.localToWorld(_a.set(0, 0.25, -0.16));
    stream.visible = flow > 0.01;
    if (stream.visible) span(stream, _b.set(lip.x, troughY, lip.z), lip, 0.04 * flow);
    ripple.set(lip.x, troughY + 0.005, lip.z, lin(T, 10.4, 11.6), 0.25, 0.5);

    // ---- hands
    winch.updateMatrixWorld();
    const handle = winch.localToWorld(_a.set(R.crankX + 0.11, 0, R.crankR));
    if (cranking > 0.001) h.reach('R', handle, cranking, _b.set(-0.6, -0.5, -0.4));
    const wBucket = ramp(T, 8.3, 8.8) * (1 - ramp(T, 12.8, 13.15));
    if (wBucket > 0.001) {
      bucket.group.updateMatrixWorld();
      h.reach('R', bucket.group.localToWorld(_a.set(0.15, 0.22, 0)), wBucket);
      h.reach('L', bucket.group.localToWorld(_a.set(-0.15, 0.22, 0)), wBucket);
    }
  };
}

// ---------------------------------------------------------------------------
// Farmer — works two furrows with a hoe, stopping to chop at the weeds.
// ---------------------------------------------------------------------------

function buildFarmer(group, village) {
  const [fa, fb] = [village.anchors.furrows[1], village.anchors.furrows[2]];
  const z0 = FIELD.z1 - 1.3;
  const z1 = FIELD.z0 + 1.3;
  const stops = 3;
  const s = new Script([fa, z0], Math.PI, { stride: 1.0 });
  s.wait(2.6, 'brow');
  for (let i = 1; i <= stops; i++) s.walk([[fa, lerp(z0, z1, i / stops)]], 0.85).wait(2.4, 'hoe');
  s.walk([[(fa + fb) / 2, z1 - 0.7], [fb, z1]], 0.85).turn(0, 0.8);
  for (let i = 1; i <= stops; i++) s.walk([[fb, lerp(z1, z0, i / stops)]], 0.85).wait(2.4, 'hoe');
  s.walk([[(fa + fb) / 2, z0 + 0.7], [fa, z0]], 0.85);
  s.close('idle');

  const h = new Humanoid({ skin: SKIN[3], shirt: 0x7a9a4a, pants: 0x8a6a42, hat: 'straw', hatColor: 0xe6c86a, hair: 0x2a1a10, shoes: 0x4a3426, sleeves: 'short' });
  const hoe = makeHoe();
  group.add(h.root, hoe);
  const smp = {};
  const g = new THREE.Vector3();

  return (t) => {
    const st = s.sample(t, smp);
    const y = heightAt(st.x, st.z);
    h.reset().place(st.x, y, st.z, st.yaw);
    h.walk(st.phase, st.moving);
    h.breathe(osc(t, 3));
    // hoe pose: over the shoulder while walking; chopping at stops
    let lift = 0; // 0 = blade in the soil, 1 = raised
    let carry = 1;
    let brow = 0;
    if (st.action === 'hoe') {
      const L = st.local;
      carry = 1 - smooth(L / 0.35) * (1 - smooth((L - 2.05) / 0.35));
      const c = (L % 1.2) / 1.2;
      lift = c < 0.55 ? smooth(c / 0.55) : 1 - easeIn((c - 0.55) / 0.2);
      lift = clamp(lift);
      h.bend(lerp(0.12, 0.3, 1 - lift) * (1 - carry), 0.4);
      h.look(0, 0.35 * (1 - carry));
    } else if (st.action === 'brow') {
      brow = hold(st.local, 0.4, 0.9, 1.9, 2.5);
    }
    const phiChop = lerp(2.55, 0.15, lift);
    const gChop = g.set(-0.04, lerp(0.92, 1.25, lift), lerp(0.36, 0.2, lift));
    const phi = lerp(phiChop, -0.35, carry);
    gChop.lerp(_a.set(-0.12, 1.12, 0.28), carry);
    h.sync();
    h.root.localToWorld(hoe.position.copy(gChop));
    _e.set(phi, st.yaw, 0, 'YXZ');
    hoe.quaternion.setFromEuler(_e);
    hoe.updateMatrixWorld();
    h.reach('L', hoe.localToWorld(_a.set(0, 0.06, 0)), 1);
    if (brow > 0) {
      h.reach('R', h.head.localToWorld(_b.set(-0.05, 0.3, 0.24)), brow, _c.set(-0.6, -0.2, -0.3));
      h.look(0, -0.15 * brow);
    } else h.reach('R', hoe.localToWorld(_a.set(0, 0.42, 0)), 1);
  };
}

// ---------------------------------------------------------------------------
// Fisherman — 20 s: wait, bite, strike, land the fish into the creel, recast.
// ---------------------------------------------------------------------------

function buildFisherman(group, village) {
  const P = 20;
  const dockY = village.anchors.dockY + 0.035;
  const X = DOCK.x1 - 0.12;
  const Z = DOCK.z + 0.12;
  const yaw = Math.PI / 2;
  const h = new Humanoid({ skin: SKIN[0], shirt: 0x5a6f8a, pants: 0x5a4a3a, hat: 'bucket', hatColor: 0x7a8a5a, beard: 0xb0a090, hair: 0xb0a090, shoes: 0x3a2e26 });
  const rod = makeRod();
  const fish = makeFish();
  const bobber = partMesh((b) => {
    b.add(sphere(0.045, 7, 5), 0xd8333a, { p: [0, 0.02, 0] });
    b.add(sphere(0.046, 7, 5), 0xffffff, { p: [0, -0.012, 0], s: [1, 0.5, 1] });
  });
  const lineGeom = new THREE.BufferGeometry().setFromPoints(Array.from({ length: 14 }, () => new THREE.Vector3()));
  const line = new THREE.Line(lineGeom, new THREE.LineBasicMaterial({ color: 0xf2f2f2, transparent: true, opacity: 0.75 }));
  line.frustumCulled = false;
  group.add(h.root, rod, fish, bobber, line);
  const ripples = [makeRipple(group), makeRipple(group), makeRipple(group)];

  const water = POND.water;
  const restBob = new THREE.Vector3(X + 3.0, water + 0.02, Z + 0.35);
  const creel = village.anchors.creel;
  const tip = new THREE.Vector3();
  const end = new THREE.Vector3();
  const pFish = new THREE.Vector3();
  const pHand = new THREE.Vector3();
  const pAir = new THREE.Vector3();
  const pCreel = new THREE.Vector3(creel.x, creel.y, creel.z);
  const pIn = new THREE.Vector3(creel.x, creel.y - 0.25, creel.z);
  const fishKeys = [
    [12.75, restBob],
    [13.4, pAir],
    [14.5, pFish],
    [15.2, pHand],
    [15.8, pCreel],
    [16.1, pIn],
  ];
  const look = track(
    [
      [0, 0],
      [2, 0],
      [3.2, -0.5],
      [5.5, -0.5],
      [6.8, 0.35],
      [9, 0.35],
      [10, 0],
    ],
    P,
  );

  return (t) => {
    const T = local(t, P);
    h.reset().place(X, dockY, Z, yaw);
    h.sit(0, 1.35 + osc(t, 4) * 0.12);
    h.legs.R.knee.rotation.x = 1.35 + osc(t, 4, 0.5) * 0.12;
    h.breathe(osc(t, 4));
    h.torso.rotation.x += 0.12;
    const strike = hold(T, 12.55, 12.8, 13.3, 14.4);
    const swing = hold(T, 14.4, 14.9, 15.3, 15.9);
    const back = hold(T, 16.2, 16.9, 17.0, 17.15);
    h.look(look(T) * (T < 11 ? 1 : 0) - swing * 0.7, 0.15 - strike * 0.15 + swing * 0.35);
    h.sync();

    // rod angle (0 = up, π/2 = forward) and sideways swing towards the creel
    let phi = 0.95 + osc(t, 5) * 0.03;
    phi = lerp(phi, 0.3, strike);
    phi = lerp(phi, 0.55, swing);
    phi = lerp(phi, -0.35, back);
    const side = swing * 0.85;
    h.root.localToWorld(rod.position.set(-0.08 + side * 0.08, 0.62, 0.3));
    _e.set(phi, yaw + side, 0, 'YXZ');
    rod.quaternion.setFromEuler(_e);
    rod.updateMatrixWorld();
    rod.localToWorld(tip.copy(rod.userData.tip));

    // where the line ends: bobber, fish, dangling hook, or flying back out
    h.root.localToWorld(pAir.set(0.0, 1.6, 1.9));
    h.root.localToWorld(pFish.set(0.25, 1.15, 0.75));
    h.root.localToWorld(pHand.set(0.42, 0.75, 0.25));
    const bite = (T > 11.4 && T < 12.7 ? Math.max(hump(T, 11.4, 11.75), hump(T, 12.0, 12.4)) : 0) * 0.07;
    const restY = restBob.y + osc(t, 2.5) * 0.012 - bite;
    let fishOn = 0;
    if (T < 12.75 || T >= 18.0) end.set(restBob.x, restY, restBob.z);
    else if (T < 15.2) {
      keyed(T, fishKeys, end);
      fishOn = 1;
    } else if (T < 17.15) end.copy(tip).add(_a.set(0, -0.55, 0));
    else {
      // cast arc from the tip to the water
      const u = lin(T, 17.15, 18.0);
      _a.copy(tip).add(_b.set(0, -0.55, 0));
      end.copy(_a).lerp(_b.set(restBob.x, restY, restBob.z), easeOut(u));
      end.y += Math.sin(Math.PI * u) * 1.2;
    }
    // fish: in the water (hidden) → on the line → hand → creel
    const fishVis = T > 12.65 && T < 16.1;
    fish.visible = fishVis;
    if (fishVis) {
      if (T < 15.2) fish.position.copy(end).add(_a.set(0, -0.12, 0));
      else keyed(T, fishKeys, fish.position);
      fish.scale.setScalar(smooth(lin(T, 12.65, 12.85)) * (1 - smooth(lin(T, 15.85, 16.1))) + 0.001);
      fish.rotation.set(-Math.PI / 2 + osc(t, 0.4) * 0.4, osc(t, 0.3) * 0.5, 0);
    }
    bobber.position.copy(end);
    if (fishOn) bobber.position.lerp(tip, 0.25);

    // line from tip to end with a gentle sag (taut when a fish is on)
    const pts = lineGeom.attributes.position;
    const sag = fishOn ? 0.05 : T >= 17.15 && T < 18 ? 0.1 : 0.35;
    for (let i = 0; i < pts.count; i++) {
      const u = i / (pts.count - 1);
      _a.copy(tip).lerp(end, u);
      _a.y -= Math.sin(Math.PI * u) * sag * tip.distanceTo(end) * 0.25;
      pts.setXYZ(i, _a.x, _a.y, _a.z);
    }
    pts.needsUpdate = true;

    // ripples: idle bobbing, bites, the strike and the splash-down
    ripples[0].set(restBob.x, water + 0.01, restBob.z, T < 12.6 ? phase(T, 2.5) : -1, 0.35, 0.35);
    ripples[1].set(restBob.x, water + 0.01, restBob.z, lin(T, 11.4, 13.4), 0.7, 0.5);
    ripples[2].set(restBob.x, water + 0.01, restBob.z, lin(T, 18.0, 19.8), 0.8, 0.55);

    // hands on the rod (left hand fetches the fish to the creel)
    h.reach('R', rod.localToWorld(_a.set(0, 0.02, 0)));
    const toFish = hold(T, 14.9, 15.2, 15.7, 16.1);
    rod.localToWorld(_b.set(0, 0.42, 0));
    if (toFish > 0) _b.lerp(fish.position, toFish);
    h.reach('L', _b);
  };
}

// ---------------------------------------------------------------------------
// Market vendor — tidies the stall, calls out, chats with the maid.
// ---------------------------------------------------------------------------

function buildVendor(group, village) {
  const st = village.anchors.stall;
  const h = new Humanoid({ skin: SKIN[1], shirt: 0x6f8f5a, dress: 0x6f8f5a, apron: 0xf2ead8, hat: 'kerchief', hatColor: 0xd8463e, hair: 0x6a3a1a, hairStyle: 'bun', shoes: 0x4a3426, belly: 0.3 });
  group.add(h.root);
  const pos = new THREE.Vector3(0, 0, -0.85).applyMatrix4(st.M);
  const [m0, m1] = MAID_AT_STALL;
  const tidyA = new THREE.Vector3();
  const tidyB = new THREE.Vector3();
  const headYaw = track([
    [0, 0],
    [5, 0],
    [6, 0.5],
    [7.5, 0.5],
    [16, 0.1],
    [21, 0.1],
    [22, -0.6],
    [26, -0.6],
    [27.5, 0.3],
    [33, 0.3],
    [35, -0.2],
    [43, -0.2],
    [44, 0.7],
    [47, 0.7],
    [48.5, 0],
  ]);

  return (t) => {
    h.reset().place(pos.x, st.gy, pos.z, st.yaw);
    h.breathe(osc(t, 4));
    const tidy = hold(mod(t + 8, 60), 0, 0.8, 12.4, 13.2); // 52 s → 5.2 s, across the seam
    const chat = hold(t, m0 - 0.3, m0 + 0.5, m1 - 0.6, m1);
    const call = hold(t, 17.5, 18.1, 19.6, 20.2);
    const wave = hold(t, 44.2, 44.8, 46.4, 47);
    h.bend(tidy * 0.35, 0.3);
    h.look(headYaw(t) * (1 - chat) * (1 - tidy), tidy * 0.4 + chat * (0.05 + hump(local(t, 2.5), 0.2, 0.9) * 0.15) - call * 0.2);
    h.sync();
    if (tidy > 0) {
      const u = local(t, 2.5) / 2.5;
      tidyA.set(-0.35 + Math.sin(u * TAU) * 0.15, 0.97, 0.1).applyMatrix4(st.M);
      tidyB.set(0.35 + Math.cos(u * TAU) * 0.12, 0.97, 0.05).applyMatrix4(st.M);
      h.reach('L', tidyA, tidy);
      h.reach('R', tidyB, tidy);
    }
    if (call > 0) {
      h.reach('L', h.head.localToWorld(_a.set(0.1, 0.17, 0.25)), call);
      h.reach('R', h.head.localToWorld(_a.set(-0.1, 0.17, 0.25)), call);
    }
    if (chat > 0) {
      h.arms.R.shoulder.rotation.x += -0.5 * chat * (0.6 + 0.4 * osc(t, 2));
      h.arms.R.elbow.rotation.x += -0.9 * chat;
      h.arms.L.shoulder.rotation.x += -0.2 * chat;
      h.arms.L.elbow.rotation.x += -1.2 * chat;
    }
    if (wave > 0) h.reach('R', h.root.localToWorld(_a.set(-0.4 + osc(t, 0.6) * 0.12, 1.95, 0.15)), wave);
  };
}

export function buildWorkers(group, ctx) {
  const updates = [buildWoodcutter(group, ctx.village), buildWellPeasant(group, ctx.village), buildFarmer(group, ctx.village), buildFisherman(group, ctx.village), buildVendor(group, ctx.village)];
  return (t) => updates.forEach((u) => u(t));
}
