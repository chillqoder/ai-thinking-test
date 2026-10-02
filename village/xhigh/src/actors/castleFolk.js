// Castle inhabitants: archer patrols on the wall walks, the king on his
// balcony, the gate guards and the courtyard blacksmith.

import * as THREE from 'three';
import { Humanoid, makeBow, makeSpear, makeShield, makeHammer, makeTongs, SKIN } from './humanoid.js';
import { Script } from '../core/script.js';
import { TAU, LOOP, osc, cosc, phase, local, track, ramp, hold, hump, smooth, lerp, clamp, lerpAngle, mod, easeIn } from '../core/loop.js';
import { rng } from '../core/random.js';
import { WALKWAYS, BALCONY, SMITHY, GUARD_SPOTS } from '../world/castle.js';
import { CASTLE, GATE } from '../world/layout.js';
import { heightAt } from '../world/island.js';
import { BAKER_AT_GATE } from './schedule.js';
import { keyed } from '../core/keys.js';

const _v = new THREE.Vector3();
const _w = new THREE.Vector3();

// ---------------------------------------------------------------------------
// Archers
// ---------------------------------------------------------------------------

const ARCHER_LOOKS = [
  { shirt: 0x5d8a3c, pants: 0x6b5236, hatColor: 0x4f6e33, skin: SKIN[0] },
  { shirt: 0x6f9a48, pants: 0x5a4632, hatColor: 0x3f5c2c, skin: SKIN[2] },
  { shirt: 0x557f3a, pants: 0x6e5a3e, hatColor: 0x5b7a38, skin: SKIN[1] },
  { shirt: 0x6a8c42, pants: 0x4f3f2e, hatColor: 0x47652f, skin: SKIN[3] },
];

function patrolScript(w, { pauseA = 0.38, pauseB = 0.66, speed = 0.74 } = {}) {
  const ax = w.a[0];
  const az = w.a[1];
  const bx = w.b[0];
  const bz = w.b[1];
  const P = (f) => [ax + (bx - ax) * f, az + (bz - az) * f];
  const toB = Math.atan2(bx - ax, bz - az);
  const toA = Math.atan2(ax - bx, az - bz);
  const outYaw = Math.atan2(w.out[0], w.out[1]);
  return new Script(P(0), toB, { stride: 1.05 })
    .walk([P(pauseA)], speed)
    .turn(outYaw, 0.9, { look: 'in' })
    .wait(5, 'lookout')
    .turn(toB, 0.9, { look: 'out' })
    .walk([P(1)], speed)
    .turn(toA, 1.3)
    .wait(2.5, 'chat')
    .walk([P(pauseB)], speed)
    .turn(outYaw, 0.9, { look: 'in' })
    .wait(5, 'lookout')
    .turn(toA, 0.9, { look: 'out' })
    .walk([P(0)], speed)
    .turn(toB, 1.3)
    .close('chat');
}

function buildArchers(group) {
  const actors = [];
  const plan = [
    { wall: 'south', n: 2, offset: 0 },
    { wall: 'east', n: 2, offset: 17 },
    { wall: 'north', n: 2, offset: 33 },
    { wall: 'west', n: 1, offset: 46 },
  ];
  let look = 0;
  for (const p of plan) {
    const w = WALKWAYS[p.wall];
    const script = patrolScript(w, p.wall === 'west' ? { pauseA: 0.5, pauseB: 0.5 } : {});
    const out = new THREE.Vector3(w.out[0], 0, w.out[1]);
    const along = new THREE.Vector3(w.b[0] - w.a[0], 0, w.b[1] - w.a[1]).normalize();
    for (let i = 0; i < p.n; i++) {
      const L = ARCHER_LOOKS[look++ % ARCHER_LOOKS.length];
      const h = new Humanoid({ ...L, hat: 'hood', hair: 0x4a3020, quiver: true, belt: 0x5a3a22, shoes: 0x4a3426 });
      const bow = makeBow();
      bow.rotation.set(0, Math.PI / 2, 0);
      bow.position.set(0, -0.02, 0.02);
      h.arms.L.hand.add(bow);
      group.add(h.root);
      const side = p.n === 1 ? 0 : i === 0 ? -1 : 1;
      actors.push({ h, script, out, along, side, offset: p.offset + i * 0.15, role: i, s: {} });
    }
  }

  return (t) => {
    for (const a of actors) {
      const s = a.script.sample(t + a.offset, a.s);
      // side-by-side while walking; shoulder-to-shoulder at the battlements when looking out
      let look = 0;
      if (s.action === 'lookout') look = 1;
      else if (s.step.look === 'in') look = smooth(s.u);
      else if (s.step.look === 'out') look = 1 - smooth(s.u);
      const x = s.x + a.out.x * (a.side * 0.3 * (1 - look) + 0.28 * look) + a.along.x * a.side * 0.42 * look;
      const z = s.z + a.out.z * (a.side * 0.3 * (1 - look) + 0.28 * look) + a.along.z * a.side * 0.42 * look;
      const h = a.h.reset().place(x, CASTLE.wallTop, z, s.yaw);
      h.walk(s.phase, s.moving);
      h.breathe(osc(t, 4, a.offset * 0.1));
      // bow arm carries the bow forward a little
      h.arms.L.shoulder.rotation.x += -0.15;
      h.arms.L.elbow.rotation.x += -0.35;
      if (s.action === 'lookout') {
        const k = smooth(s.local / 0.8) * (1 - smooth((s.local - s.step.dur + 0.8) / 0.8));
        const scan = osc(t + a.offset, 7.5, a.role * 0.3) * 0.45;
        h.look(scan * k, -0.08 * k);
        h.torso.rotation.x += 0.05 * k;
        h.sync();
        if (a.role === 0) {
          // shade the eyes with the right hand
          h.head.localToWorld(_v.set(-0.04, 0.33, 0.27));
          h.reach('R', _v, k, _w.set(-0.6, -0.2, -0.4));
        } else {
          // point out over the land
          const pk = hold(s.local, 1.2, 1.8, 3.4, 4.2);
          h.root.localToWorld(_v.set(-0.35 + scan * 0.5, 1.75, 0.75));
          h.reach('R', _v, pk * k);
        }
      } else if (s.action === 'chat') {
        const k = smooth(s.local / 0.6) * (1 - smooth((s.local - s.step.dur + 0.6) / 0.6));
        h.look(-a.side * 0.5 * k, 0, 0);
        h.arms.R.shoulder.rotation.x += -0.3 * k * (0.5 + 0.5 * osc(t, 1.5, a.role * 0.5));
        h.arms.R.elbow.rotation.x += -0.6 * k;
      }
    }
  };
}

// ---------------------------------------------------------------------------
// King
// ---------------------------------------------------------------------------

function buildKing(group) {
  const h = new Humanoid({
    skin: SKIN[0],
    shirt: 0xb02a3a,
    dress: 0xb02a3a,
    robe: true,
    skirtLen: 0.62,
    pants: 0x7a1d2a,
    hair: 0xd8d2c6,
    beard: 0xece6da,
    hat: 'crown',
    belly: 0.6,
    cape: 0x5a2a7a,
    belt: 0xf4c542,
  });
  group.add(h.root);
  const X = BALCONY.x;
  const Z = BALCONY.railZ - 0.48;

  const headYaw = track([
    [0, 0],
    [3, 0],
    [5, 0.65],
    [9.5, 0.65],
    [12, -0.55],
    [16, -0.55],
    [18, 0.05],
    [25, 0.05],
    [27, 0.4],
    [31, 0.4],
    [33, -0.15],
    [38, -0.15],
    [40.5, -0.7],
    [45, -0.7],
    [47, 0.25],
    [52, 0.25],
    [54.5, 0],
  ]);
  const lean = track([
    [0, 0],
    [18, 0],
    [20, 0.26],
    [25, 0.26],
    [27, 0.04],
    [40.5, 0.04],
    [42.5, 0.2],
    [45, 0.2],
    [46.5, 0],
  ]);
  const pitch = track([
    [0, 0],
    [18, 0],
    [20, 0.3],
    [25, 0.3],
    [27, 0],
    [40.5, 0],
    [42.5, 0.26],
    [45, 0.26],
    [46.5, 0],
  ]);
  // occasional nods (two quick dips)
  const nod = (t) => Math.max(hump(t, 9.6, 10.3), hump(t, 10.3, 11), hump(t, 30.8, 31.6), hump(t, 51.6, 52.4) * 0.8) * 0.22;

  return (t) => {
    h.reset().place(X, BALCONY.y, Z, 0);
    h.breathe(osc(t, 5));
    const sway = osc(t, 15) * 0.025;
    h.pelvis.position.x = sway;
    h.pelvis.rotation.z = -sway * 1.5;
    const ln = lean(t);
    h.torso.rotation.x += ln;
    h.pelvis.position.z -= ln * 0.18;
    h.look(headYaw(t), pitch(t) + nod(t) - ln * 0.3, osc(t, 12) * 0.03);
    if (h.capeGroup) h.capeGroup.rotation.x = 0.08 - ln * 0.5 + osc(t, 3, 0.2) * 0.02;

    h.sync();
    const railY = BALCONY.railY + 0.08;
    // left hand on the rail, slides a touch as he shifts
    h.reach('L', _v.set(X + 0.34 + sway, railY, BALCONY.railZ - 0.02));
    // right hand: on the rail, except a royal wave mid-loop
    const wave = hold(t, 33.5, 34.6, 37.2, 38.4);
    const wx = X - 0.42 + osc(t, 0.75) * 0.1 * wave;
    _v.set(lerp(X - 0.34 + sway, wx, wave), lerp(railY, BALCONY.railY + 0.95, wave), lerp(BALCONY.railZ - 0.02, BALCONY.railZ - 0.2, wave));
    h.reach('R', _v, 1, wave > 0.2 ? _w.set(-0.8, -0.4, 0.2) : null);
  };
}

// ---------------------------------------------------------------------------
// Gate guards
// ---------------------------------------------------------------------------

function buildGuards(group) {
  const guards = GUARD_SPOTS.map(([x, z], i) => {
    const h = new Humanoid({
      skin: SKIN[i === 0 ? 1 : 3],
      shirt: 0x8c939e,
      pants: 0x4a4f58,
      tabard: i === 0 ? 0x2f57a5 : 0xc8343a,
      hat: 'helmet',
      hatColor: 0x9aa1ab,
      beard: i === 0 ? 0x5a3a22 : null,
      shoes: 0x3a2e26,
    });
    const spear = makeSpear();
    const shield = makeShield(i === 0 ? 0x2f57a5 : 0xc8343a);
    shield.position.set(0.09, -0.12, 0.05);
    shield.rotation.set(0, Math.PI / 2, 0);
    h.arms.L.elbow.add(shield);
    group.add(h.root, spear);
    return { h, spear, x, z, y: heightAt(x, z), yaw: 0, i };
  });

  const glance = [
    track([
      [0, 0],
      [6, 0],
      [7.5, -0.6],
      [11, -0.6],
      [12.5, 0],
      [33, 0],
      [35, 0.5],
      [38, 0.5],
      [39.5, 0],
    ]),
    track([
      [0, 0],
      [14, 0],
      [15.5, 0.55],
      [19, 0.55],
      [20.5, 0],
      [44, 0],
      [45.5, -0.4],
      [47, -0.4],
      [48.5, 0],
    ]),
  ];
  const [b0, b1] = BAKER_AT_GATE;

  return (t) => {
    const baker = hold(t, b0 - 1.5, b0 + 0.5, b1 - 0.5, b1 + 1);
    for (const g of guards) {
      const h = g.h.reset().place(g.x, g.y, g.z, g.yaw);
      h.breathe(osc(t, 5, g.i * 0.4));
      const shift = osc(t, 20, g.i * 0.5) * 0.02;
      h.pelvis.position.x = shift;
      h.legs.L.hip.rotation.z = shift * 2;
      h.legs.R.hip.rotation.z = shift * 2;
      // glance about; look at the baker when he visits (he stands between them)
      const toBaker = g.i === 0 ? -0.75 : 0.75;
      h.look(lerp(glance[g.i](t), toBaker, baker), 0.1 * baker);
      if (g.i === 0) h.neck.rotation.x += hump(t, b0 + 2.2, b0 + 3.0) * 0.25;
      // the second guard yawns and stretches
      const yawn = g.i === 1 ? hold(t, 50, 51.2, 52.6, 53.8) : 0;
      h.neck.rotation.x -= yawn * 0.4;
      h.arms.L.shoulder.rotation.x -= yawn * 2.4;
      h.arms.L.shoulder.rotation.z += yawn * 0.3;
      h.arms.L.elbow.rotation.x -= yawn * 0.4;
      h.arms.L.shoulder.rotation.x += -0.25 * (1 - yawn);
      h.arms.L.elbow.rotation.x += -0.9 * (1 - yawn);
      h.sync();
      // spear stands by the right foot; a small tap now and then
      const tap = g.i === 0 ? hump(t, 24, 25.2) : hump(t, 41, 42.2);
      h.root.localToWorld(_v.set(-0.36, tap * 0.12, 0.2));
      g.spear.position.copy(_v);
      g.spear.rotation.set(0, g.yaw, 0);
      h.reach('R', _w.set(_v.x, _v.y + 1.02, _v.z));
    }
  };
}

// ---------------------------------------------------------------------------
// Blacksmith (12 s cycle)
// ---------------------------------------------------------------------------

const SMITH_PERIOD = 12;
const STRIKES = [0.75, 1.65, 2.55, 3.45];

function buildSmith(group, castle) {
  const h = new Humanoid({
    skin: SKIN[2],
    shirt: 0x4f4a46,
    pants: 0x3e3530,
    apron: 0x6b4428,
    sleeves: 'short',
    hairStyle: 'bald',
    hair: 0x3a2618,
    beard: 0x3a2618,
    shoes: 0x2f2620,
    belly: 0.3,
  });
  const hammer = makeHammer();
  const tongs = makeTongs();
  group.add(h.root, hammer, tongs.group);

  const SPARKS = 12;
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffc24a, toneMapped: false });
  const sparks = new THREE.InstancedMesh(new THREE.BoxGeometry(0.03, 0.03, 0.03), sparkMat, SPARKS);
  sparks.frustumCulled = false;
  group.add(sparks);
  const rand = rng(77);
  const sparkVel = Array.from({ length: SPARKS }, () => [(rand() - 0.5) * 2.2, 1.2 + rand() * 1.8, (rand() - 0.5) * 2.2]);
  const dummy = new THREE.Object3D();

  const [sx, sz] = SMITHY.stand;
  const [ax, az] = SMITHY.anvil;
  const gy = CASTLE.y;
  const anvilPt = new THREE.Vector3(ax - 0.02, SMITHY.anvilTop + 0.03, az);
  const forgePt = new THREE.Vector3(SMITHY.forge[0], SMITHY.coalY + 0.02, SMITHY.forge[1] + 0.2);
  const bellows = new THREE.Vector3(SMITHY.forge[0] + 1.25, gy + 0.92, SMITHY.forge[1] + 0.3);
  const restPos = new THREE.Vector3(ax + 0.24, gy + 0.53, az - 0.05);
  const restQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0, 'YXZ'));
  const heldGrip = new THREE.Vector3();
  const heldQuat = new THREE.Quaternion();
  const e = new THREE.Euler();
  const target = new THREE.Vector3();
  const grip = new THREE.Vector3();
  const pInspect = new THREE.Vector3();
  const pCarry = new THREE.Vector3();
  const keys = [
    [0, anvilPt],
    [3.6, anvilPt],
    [4.2, pInspect],
    [4.5, pInspect],
    [5.2, pCarry],
    [5.9, forgePt],
    [8.2, forgePt],
    [9.0, pCarry],
    [9.8, pCarry],
    [10.4, anvilPt],
  ];

  return (t) => {
    const T = local(t, SMITH_PERIOD);
    // ---- where he stands and faces
    const turnOut = ramp(T, 4.6, 5.6);
    const turnBack = ramp(T, 8.8, 9.8);
    const atForge = turnOut * (1 - turnBack);
    const yaw = lerp(0, Math.PI, turnOut) + lerp(0, Math.PI, turnBack);
    h.reset().place(sx, gy, lerp(sz, sz - 0.62, atForge), yaw);
    const stepping = hump(T, 4.6, 5.6) + hump(T, 8.8, 9.8);
    h.walk(phase(T, 1), stepping * 0.5);
    h.breathe(osc(t, 3));

    // ---- hammer swing: lift 0 (resting on the work) .. 1 (raised high)
    let lift = 0;
    let impact = -1;
    for (const s of STRIKES) {
      if (T > s - 0.75 && T <= s) lift = ramp(T, s - 0.72, s - 0.2) * (1 - easeIn((T - (s - 0.15)) / 0.15));
      if (T > s && T <= s + 0.18) lift = hump(T, s, s + 0.18) * 0.1;
      if (T >= s && T < s + 0.6) impact = T - s;
    }
    const phi = lerp(1.85, -0.25, lift);
    const work = 1 - atForge;
    h.torso.rotation.x += lerp(0.18, -0.06, lift) * work;
    const inFire = hold(T, 5.4, 6.0, 8.2, 8.8);
    const inspect = hold(T, 3.7, 4.2, 4.5, 4.9);
    h.torso.rotation.x += inFire * 0.22;
    h.look(0, 0.35 * work * (1 - lift * 0.3) + inFire * 0.15 - inspect * 0.45);
    h.sync();

    // hammer: held in body space, or resting on the anvil stump
    h.root.localToWorld(heldGrip.set(lerp(-0.13, -0.24, lift), lerp(1.0, 1.58, lift), lerp(0.45, 0.12, lift)));
    e.set(phi, yaw, 0, 'YXZ');
    heldQuat.setFromEuler(e);
    const held = 1 - ramp(T, 3.7, 4.15) + ramp(T, 10.4, 10.9);
    hammer.position.copy(restPos).lerp(heldGrip, held);
    hammer.quaternion.copy(restQuat).slerp(heldQuat, held);

    // tongs: the jaws travel anvil → eyes → forge → anvil
    h.root.localToWorld(pInspect.set(0.12, 1.45, 0.48));
    h.root.localToWorld(pCarry.set(0.2, 1.08, 0.5));
    keyed(T, keys, target);
    h.torso.localToWorld(grip.set(0.32, 0.42, -0.05));
    grip.sub(target).normalize().multiplyScalar(0.66).add(target);
    tongs.group.position.copy(grip);
    tongs.group.lookAt(target);
    tongs.group.rotateZ(inspect * osc(t, 1.5) * 0.7);
    tongs.piece.material.emissiveIntensity = clamp(1.8 - Math.min(T, 4.6) * 0.3 + inFire * 2.2 + (T > 8.8 ? ramp(T, 8.8, 12) * -0.3 + 0.9 : 0), 0.35, 2.8);

    // bellows pumping while the piece heats
    const pump = hold(T, 6.0, 6.4, 7.8, 8.2);
    castle.state.pump = pump * (0.6 + 0.4 * osc(t, 0.8));

    h.reach('L', grip);
    const wHammer = 1 - ramp(T, 4.1, 4.6) + ramp(T, 10.0, 10.4);
    if (wHammer > 0.001) h.reach('R', _v.set(0, 0.06, 0).applyQuaternion(hammer.quaternion).add(hammer.position), Math.min(1, wHammer));
    if (pump > 0.001) h.reach('R', _v.copy(bellows).setY(bellows.y + osc(t, 0.8) * 0.12), pump);

    // sparks fly from each strike
    for (let k = 0; k < SPARKS; k++) {
      if (impact < 0) dummy.scale.setScalar(0);
      else {
        const a = impact;
        const [vx, vy, vz] = sparkVel[k];
        dummy.position.set(anvilPt.x + vx * a, anvilPt.y + 0.05 + vy * a - 4.9 * a * a, anvilPt.z + vz * a);
        dummy.scale.setScalar(Math.max(0, 1 - a / 0.6) * (0.8 + (k % 3) * 0.3));
      }
      dummy.updateMatrix();
      sparks.setMatrixAt(k, dummy.matrix);
    }
    sparks.instanceMatrix.needsUpdate = true;
  };
}

export function buildCastleFolk(group, { castle }) {
  const updates = [buildArchers(group), buildKing(group), buildGuards(group), buildSmith(group, castle)];
  return (t) => updates.forEach((u) => u(t));
}
