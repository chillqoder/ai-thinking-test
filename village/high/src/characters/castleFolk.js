// Archers on the walls, the king on his balcony, gate guards and the blacksmith.
import * as THREE from 'three';
import { ph, osc, track, walkEase, smooth, range, bump, lerp, rng } from '../core/util.js';
import { geo, mesh } from '../core/kit.js';
import { createHumanoid, resetPose, walkPose, breathe, hold, props, enableShadows } from './rig.js';
import { place, segmentMover } from './common.js';
import { CASTLE, WALL, BALCONY, GATE, PLATEAU_Y, FORGE } from '../world/layout.js';

const angleDiff = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

// ---------- archers ----------
const ARCHER_LOOKS = [
  { shirt: '#3f6b3a', hat: 'hood', hatColor: '#4d7a45', pants: '#5a4a38' },
  { shirt: '#6b4f2f', hat: 'helmet', hatColor: '#9aa0a8', pants: '#4a4036' },
  { shirt: '#3a5a7a', hat: 'hood', hatColor: '#2f4d6b', pants: '#5a4a38' },
  { shirt: '#7a3a32', hat: 'helmet', hatColor: '#8a9098', pants: '#4a4036' },
];

function makeArcher(i) {
  const r = createHumanoid({ ...ARCHER_LOOKS[i % ARCHER_LOOKS.length], skin: ['#f0c8a0', '#d9a77c', '#c68b5e'][i % 3] });
  hold(r.handL, props.bow(), [0, 0, 0.02], [0, 0, 0]);
  const q = props.quiver();
  q.position.set(0.1, 0.38, -0.27);
  q.rotation.set(0.25, 0, -0.35);
  r.chest.add(q);
  enableShadows(r.root);
  return r;
}

/**
 * A group of archers patrolling one wall walkway between two towers.
 * Timeline per cycle: walk part-way, stop and look out over the parapet,
 * finish the walk, look out at the far tower, turn and walk all the way back,
 * turn at the near tower. Yaw keys rotate through "outward" at every stop, so
 * total rotation over a cycle is exactly zero.
 */
function patrol(root, { a, b, out, members, cycles = 1, offset = 0, idx0 = 0 }) {
  const yawAB = Math.atan2(b[0] - a[0], b[1] - a[1]);
  const dOut = Math.sign(angleDiff(yawAB, out)) * (Math.PI / 2);
  const sKeys = [
    [0, 0, walkEase],
    [0.24, 0.5],
    [0.36, 0.5, walkEase],
    [0.5, 1],
    [0.62, 1, walkEase],
    [0.92, 0],
  ];
  const yawKeys = [
    [0, 0], [0.24, 0], [0.265, dOut], [0.335, dOut], [0.36, 0],
    [0.5, 0], [0.525, dOut], [0.595, dOut], [0.62, 2 * dOut],
    [0.92, 2 * dOut], [0.945, dOut], [0.975, dOut], [1, 0],
  ];
  const lateral = [-Math.cos(yawAB), Math.sin(yawAB)]; // local +x of a walker facing A→B
  const mover = segmentMover(a[0], a[1], b[0], b[1], cycles, sKeys, { offset, cruise: 0.55 });
  const archers = members.map((m, i) => ({ rig: makeArcher(idx0 + i), ...m }));
  for (const ar of archers) root.add(ar.rig.root);
  return (t) => {
    for (const ar of archers) {
      const st = mover(t, ar.lag || 0);
      const r = ar.rig;
      const yawRel = track(st.u, yawKeys);
      const look = 1 - Math.abs(Math.cos(yawRel)); // 1 when facing outward
      resetPose(r);
      walkPose(r, st.dist / 1.25, st.amt);
      // bow held low and forward; raised a little while scanning the horizon
      r.armL.rotation.x = -0.35 - 0.55 * look + (r.armL.rotation.x + 0.35) * 0.4;
      r.armL.rotation.z = -0.15;
      r.head.rotation.y = 0.55 * osc(t, 20, ar.lat) * look;
      r.head.rotation.x = -0.12 * look;
      r.torso.rotation.x += 0.1 * look;
      breathe(r, osc(t, 15, ar.lat), 0.03);
      place(r, st.x + lateral[0] * ar.lat, st.z + lateral[1] * ar.lat, yawAB + yawRel, WALL.top + 0.05);
    }
  };
}

// ---------- the king ----------
function makeKing() {
  const r = createHumanoid({
    shirt: '#7b2d8c',
    robe: '#6a2479',
    pants: '#4a1f55',
    hair: '#e8e4dc',
    beard: '#f1ede6',
    hat: 'crown',
    scale: 1.06,
    belt: '#e9b934',
  });
  r.chest.add(mesh(geo.torus(0.24, 0.07, 5, 10), '#f7f3ec', [0, 0.6, 0], [Math.PI / 2, 0, 0]));
  r.chest.add(mesh(geo.box(0.55, 1.2, 0.06), '#a32a2a', [0, 0.05, -0.27], [0.12, 0, 0]));
  r.chest.add(mesh(geo.box(0.08, 0.08, 0.02), '#e9b934', [0, 0.45, 0.24]));
  enableShadows(r.root);
  return r;
}

export function buildCastleFolk() {
  const root = new THREE.Group();
  const updates = [];
  const h = WALL.half;
  const { x: cx, z: cz } = CASTLE;
  const inset = WALL.towerR + 0.25;

  // south wall (faces the village): a pair walking side by side
  updates.push(patrol(root, {
    a: [cx - h + inset, cz + h - 0.2], b: [cx + h - inset, cz + h - 0.2], out: 0,
    members: [{ lat: -0.27 }, { lat: 0.27, lag: 0.004 }], offset: 0.0, idx0: 0,
  }));
  // east wall pair
  updates.push(patrol(root, {
    a: [cx + h - 0.1, cz + h - inset], b: [cx + h - 0.1, cz - h + inset], out: Math.PI / 2,
    members: [{ lat: -0.27 }, { lat: 0.27, lag: 0.005 }], offset: 0.45, idx0: 2,
  }));
  // west wall trio
  updates.push(patrol(root, {
    a: [cx - h + 0.1, cz - h + inset], b: [cx - h + 0.1, cz + h - inset], out: -Math.PI / 2,
    members: [{ lat: -0.28 }, { lat: 0.28, lag: 0.003 }, { lat: 0, lag: 0.016 }], offset: 0.2, idx0: 1,
  }));
  // north wall pair
  updates.push(patrol(root, {
    a: [cx + h - inset, cz - h + 0.1], b: [cx - h + inset, cz - h + 0.1], out: Math.PI,
    members: [{ lat: -0.27 }, { lat: 0.27, lag: 0.004 }], offset: 0.7, idx0: 3,
  }));

  // ---------- king ----------
  {
    const k = makeKing();
    root.add(k.root);
    const headKeys = [
      [0, 0], [0.07, 0.55], [0.17, 0.6], [0.26, -0.15], [0.3, -0.55], [0.42, -0.5], [0.5, 0.05],
      [0.58, 0.35], [0.66, 0.4], [0.72, -0.3], [0.84, -0.35], [0.93, 0.05],
    ];
    const nods = [[0.18, 0.24], [0.47, 0.53], [0.86, 0.92]];
    updates.push((t) => {
      const u = ph(t, 1);
      resetPose(k);
      const lean = bump(u, 0.3, 0.45, 0.04) * 0.9 + bump(u, 0.7, 0.8, 0.03) * 0.6;
      let nod = 0;
      for (const [a, b] of nods) {
        const f = range(u, a, b);
        nod += f > 0 && f < 1 ? 0.18 * Math.sin(f * Math.PI * 2 * 2) ** 2 : 0;
      }
      k.torso.rotation.x = 0.06 + 0.22 * lean;
      k.head.rotation.y = track(u, headKeys) + 0.05 * osc(t, 7);
      k.head.rotation.x = nod + 0.18 * lean - 0.04;
      k.head.rotation.z = -0.05 * track(u, headKeys);
      // hands rest on the railing; arms compensate for the lean so the hands stay put
      k.armL.rotation.x = -0.85 - 0.2 * lean;
      k.armR.rotation.x = -0.85 - 0.2 * lean;
      k.armL.rotation.z = 0.12;
      k.armR.rotation.z = -0.12;
      k.hips.rotation.z = 0.025 * osc(t, 3);
      k.hips.position.x = 0.02 * osc(t, 3);
      breathe(k, osc(t, 14), 0.035);
      place(k, BALCONY.x, BALCONY.z + 0.27 - 0.08 * lean, 0, BALCONY.y);
    });
  }

  // ---------- gate guards ----------
  {
    const guards = [-1, 1].map((s, i) => {
      const r = createHumanoid({
        shirt: '#2f4f9a',
        pants: '#3b3b44',
        hat: 'helmet',
        hatColor: '#a8adb5',
        skin: i ? '#d9a77c' : '#f0c8a0',
        belt: '#6b4226',
      });
      r.chest.add(mesh(geo.box(0.44, 0.42, 0.06), '#e9c04a', [0, 0.36, 0.22]));
      r.chest.add(mesh(geo.box(0.12, 0.3, 0.07), '#2f4f9a', [0, 0.38, 0.235]));
      const outer = s > 0 ? r.handR : r.handL;
      const inner = s > 0 ? r.handL : r.handR;
      hold(outer, props.spear(), [0, 0, 0], [0.45, 0, 0]);
      hold(inner, props.shield(), [-s * 0.05, 0.1, 0.12], [0, 0, 0]);
      enableShadows(r.root);
      root.add(r.root);
      return { r, s };
    });
    const look = [
      [[0, 0], [0.12, 0], [0.16, 0.7], [0.3, 0.7], [0.34, 0], [0.6, 0], [0.63, -0.5], [0.72, -0.5], [0.76, 0]],
      [[0, 0], [0.14, 0], [0.18, -0.75], [0.3, -0.75], [0.34, 0], [0.45, 0], [0.49, 0.6], [0.58, 0.6], [0.62, 0], [0.85, 0], [0.88, -0.4], [0.95, -0.4]],
    ];
    updates.push((t) => {
      const u = ph(t, 1);
      guards.forEach(({ r, s }, i) => {
        resetPose(r);
        const outerArm = s > 0 ? r.armR : r.armL;
        const innerArm = s > 0 ? r.armL : r.armR;
        outerArm.rotation.x = -0.45;
        outerArm.rotation.z = s * 0.12;
        innerArm.rotation.x = -0.5;
        innerArm.rotation.z = -s * 0.25;
        r.head.rotation.y = track(u, look[i]);
        // the two guards turn to each other around u≈0.16–0.3 and one nods
        if (i === 1) r.head.rotation.x = 0.15 * Math.sin(range(u, 0.2, 0.28) * Math.PI * 4) ** 2;
        r.hips.rotation.z = 0.03 * osc(t, 4, i * 0.3);
        r.hips.position.x = 0.02 * osc(t, 4, i * 0.3);
        breathe(r, osc(t, 16, i * 0.5), 0.03);
        place(r, GATE.x + s * 1.05, GATE.z + 3.6, 0, PLATEAU_Y + 0.02);
      });
    });
  }

  // ---------- blacksmith ----------
  {
    const r = createHumanoid({
      shirt: '#8a6a4a',
      pants: '#3b3028',
      apron: '#4a3426',
      hair: '#2a1d16',
      beard: '#2a1d16',
      skin: '#d9a77c',
      scale: 1.08,
    });
    hold(r.handR, props.hammer(), [0, 0, 0.02], [Math.PI / 2 + 0.25, 0, 0]);
    hold(r.handL, props.tongs(), [0, 0, 0], [Math.PI / 2 + 0.1, 0, 0]);
    enableShadows(r.root);
    root.add(r.root);

    // sparks
    const SPARKS = 10;
    const sparkMesh = new THREE.InstancedMesh(
      geo.box(0.035, 0.035, 0.035),
      new THREE.MeshBasicMaterial({ color: '#ffb347' }),
      SPARKS
    );
    sparkMesh.frustumCulled = false;
    root.add(sparkMesh);
    const rand = rng(31);
    const dirs = Array.from({ length: SPARKS }, () => new THREE.Vector3((rand() - 0.5) * 2.4, 1 + rand() * 1.6, (rand() - 0.5) * 2.4));
    const anvil = new THREE.Vector3(FORGE.x, PLATEAU_Y + 0.92, FORGE.z + 1.1);
    const m4 = new THREE.Matrix4();
    const v = new THREE.Vector3();
    const qq = new THREE.Quaternion();
    const sv = new THREE.Vector3();

    const CYCLES = 10; // 6 s per routine
    const forgeYaw = Math.atan2(2.2, -0.6);
    updates.push((t) => {
      const u = ph(t, CYCLES);
      resetPose(r);
      // 4 strikes in the first half of the routine
      const hamU = range(u, 0, 0.48);
      const sp = (hamU * 4) % 1;
      let armA;
      if (sp < 0.6) armA = lerp(-0.85, -2.5, smooth(sp / 0.6));
      else if (sp < 0.78) armA = lerp(-2.5, -0.85, ((sp - 0.6) / 0.18) ** 2);
      else armA = -0.85 + 0.12 * Math.sin(((sp - 0.78) / 0.22) * Math.PI);
      const yaw = track(u, [[0, 0], [0.5, 0], [0.57, forgeYaw], [0.82, forgeYaw], [0.89, 0]]);
      const hb = bump(u, 0, 0.48, 0.03);
      const atForge = bump(u, 0.55, 0.85, 0.05);
      const wipe = bump(u, 0.9, 0.995, 0.03);
      let arm = lerp(-0.6, armA, hb);
      arm = lerp(arm, -0.9, atForge);
      r.armR.rotation.x = lerp(arm, -0.25, wipe);
      r.armR.rotation.z = -0.15;
      r.armL.rotation.x = -0.95 * (1 - wipe) - 2.5 * wipe;
      r.armL.rotation.z = 0.2 + 0.25 * wipe;
      r.head.rotation.x = 0.25 * (1 - wipe) - 0.1 * wipe;
      r.torso.rotation.x = 0.12 + (sp > 0.6 && sp < 0.85 ? 0.08 : 0) * hb + 0.1 * atForge;
      r.head.rotation.y = 0.15 * atForge * osc(t, 20);
      breathe(r, osc(t, 18), 0.04);
      place(r, FORGE.x, FORGE.z, yaw, PLATEAU_Y + 0.02);

      // sparks fly for a moment after each impact
      const since = sp - 0.78;
      const active = hb > 0.99 && since > 0 && since < 0.2;
      for (let i = 0; i < SPARKS; i++) {
        const tau = active ? since / 0.2 : 0;
        const d = dirs[i];
        v.set(anvil.x + d.x * tau * 0.5, anvil.y + d.y * tau * 0.45 - tau * tau * 0.6, anvil.z + d.z * tau * 0.5);
        const s = active ? (1 - tau) * 1.2 : 0;
        m4.compose(v, qq, sv.set(s, s, s));
        sparkMesh.setMatrixAt(i, m4);
      }
      sparkMesh.instanceMatrix.needsUpdate = true;
    });
  }

  return {
    root,
    update(t) {
      for (const u of updates) u(t);
    },
  };
}

