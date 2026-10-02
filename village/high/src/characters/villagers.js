// Village folk: woodcutter, well peasant, sleeper, mud-wallower, children,
// farmer, maid, baker, market chatter and the fisherman.
import * as THREE from 'three';
import { TAU, ph, osc, track, walkEase, smooth, range, bump, clamp, lerp } from '../core/util.js';
import { geo, mesh, group } from '../core/kit.js';
import { createHumanoid, resetPose, walkPose, breathe, sitPose, hold, props, enableShadows } from './rig.js';
import { place, segmentMover, loopMover, localPos, stretchBetween } from './common.js';
import { getHeight } from '../world/terrain.js';
import { WELL, NAP_TREE, MUD, PLAYGROUND, FIELDS, STALL } from '../world/layout.js';

const easeIn = (x) => clamp(x) * clamp(x);
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();

/** Lying-down helper: frame (yaw/pos) → lie (tips the body flat) → rig (roll about body axis). */
function lieDown(parent, rig, x, z, yaw, lift = 0.24) {
  const frame = group(parent, [x, getHeight(x, z), z], [0, yaw, 0]);
  const lie = group(frame, [0, lift, 0], [-Math.PI / 2, 0, 0]);
  lie.add(rig.root);
  return { frame, lie };
}

export function buildVillagers(anchors) {
  const root = new THREE.Group();
  const ups = [];

  // ---------------- woodcutter ----------------
  {
    const { x, z, yaw, g } = anchors.wood;
    const frame = group(root, [x, g, z], [0, yaw, 0]);
    const r = createHumanoid({ shirt: '#b8433a', pants: '#4f4436', hat: 'cap', hatColor: '#6b4a2b', beard: '#7a4a26', hair: '#7a4a26', skin: '#e8b48a', scale: 1.05 });
    r.chest.add(mesh(geo.box(0.46, 0.05, 0.36), '#3a2a20', [0, 0.42, 0.02], [0, 0, 0.7]));
    hold(r.handR, props.axe(), [0, 0, 0.02], [Math.PI, 0, 0]);
    enableShadows(r.root);
    frame.add(r.root);

    const whole = props.log();
    frame.add(whole);
    const halves = [1, -1].map((s) => {
      const pivot = group(frame);
      const half = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.48, 8, 1, false, s > 0 ? 0 : Math.PI, Math.PI), whole.material);
      half.position.set(-s * 0.16, 0.24, 0);
      const face = mesh(geo.box(0.01, 0.47, 0.3), '#e2c08a', [-s * 0.16, 0.24, 0]);
      pivot.add(half, face);
      half.castShadow = true;
      return { pivot, s };
    });

    const CYC = 8; // 7.5 s per log
    const PILE = new THREE.Vector3(1.55, 0.3, 0.1);
    const BLOCK = new THREE.Vector3(0, 0.455 + 0.24, 1.05);
    const posKeys = [[0, [0, -0.4]], [0.02, [0, -0.4]], [0.09, [0.72, -0.2]], [0.27, [0.72, -0.2]], [0.34, [0, -0.4]]];
    const yawKeys = [[0, 0], [0.02, 0], [0.09, Math.PI / 2], [0.27, Math.PI / 2], [0.34, 0]];
    const torsoKeys = [[0, 0], [0.09, 0], [0.13, 0.85], [0.17, 0.85], [0.22, 0.1], [0.34, 0.1], [0.38, 0.55], [0.42, 0.55], [0.46, 0], [0.6, -0.12, easeIn], [0.655, 0.4], [0.72, 0.4], [0.86, 0]];
    const lArm = [[0, -0.1], [0.09, -0.1], [0.13, -1.35], [0.17, -1.35], [0.22, -1.0], [0.34, -1.0], [0.38, -1.3], [0.42, -1.3], [0.46, -0.25], [0.6, -3.3, easeIn], [0.655, -1.65], [0.72, -1.65], [0.86, -0.25], [0.89, -0.25], [0.92, -2.6], [0.95, -2.6], [0.98, -0.1]];
    const rArm = [[0, -0.1], [0.09, -0.1], [0.13, 0.5], [0.17, 0.5], [0.22, -0.1], [0.34, -0.1], [0.38, 0.3], [0.42, 0.3], [0.46, -0.25], [0.6, -3.3, easeIn], [0.655, -1.65], [0.72, -1.65], [0.86, -0.25], [0.95, -0.1]];
    const hands = new THREE.Vector3();
    ups.push((t) => {
      const u = ph(t, CYC);
      resetPose(r);
      const [px, pz] = track(u, posKeys);
      const ry = track(u, yawKeys);
      const stepping = bump(u, 0.02, 0.09, 0.02) + bump(u, 0.27, 0.34, 0.02);
      walkPose(r, (px + pz) / 0.45, stepping * 0.6, { arms: false });
      r.torso.rotation.x = track(u, torsoKeys);
      const chop = bump(u, 0.46, 0.86, 0.04);
      const wipe = bump(u, 0.89, 0.98, 0.03);
      r.armL.rotation.x = track(u, lArm);
      r.armR.rotation.x = track(u, rArm);
      r.armL.rotation.z = -0.08 + 0.33 * chop + 0.55 * wipe;
      r.armR.rotation.z = 0.08 - 0.33 * chop;
      r.head.rotation.x = 0.25 * chop - 0.1 * wipe;
      breathe(r, osc(t, 16), 0.03);
      r.root.position.set(px, 0, pz);
      r.root.rotation.y = ry;

      // the log: hidden in the pile → lifted → carried → stood on the block → split
      frame.updateMatrixWorld(true);
      localPos(r.handL, frame, hands);
      const lift = range(u, 0.12, 0.17);
      const place = range(u, 0.36, 0.42);
      whole.visible = u >= 0.11 && u < 0.66;
      if (u < 0.36) {
        whole.position.lerpVectors(PILE, hands, smooth(lift));
        whole.rotation.set(0, u < 0.12 ? Math.PI / 2 : ry, Math.PI / 2);
      } else {
        whole.position.lerpVectors(hands, BLOCK, smooth(place));
        whole.rotation.set(0, 0, (Math.PI / 2) * (1 - smooth(place)));
      }
      // halves: topple outwards, drop onto the chip heaps, then settle into them
      const fall = range(u, 0.66, 0.72);
      const drop = range(u, 0.72, 0.8);
      const sink = range(u, 0.9, 0.98);
      for (const h of halves) {
        h.pivot.visible = u >= 0.66 && u < 0.98;
        const sx = h.s * 0.16;
        h.pivot.position.set(
          lerp(sx, h.s * 0.92, smooth(drop)),
          lerp(0.455, 0.12, drop * drop) + Math.sin(drop * Math.PI) * 0.15 - 0.42 * smooth(sink),
          lerp(1.05, 1.12, drop)
        );
        h.pivot.rotation.set(0, 0, -h.s * (Math.PI / 2) * Math.min(1, easeIn(fall) + drop));
      }
    });
  }

  // ---------------- well peasant ----------------
  {
    const w = anchors.well;
    const r = createHumanoid({ shirt: '#8a6fae', robe: '#6d5a8e', hat: 'kerchief', hatColor: '#e9e2cf', skin: '#f0c8a0', apron: '#efe8d8' });
    enableShadows(r.root);
    root.add(r.root);
    const bucket = props.bucket();
    bucket.g.rotation.order = 'YXZ';
    enableShadows(bucket.g);
    root.add(bucket.g);
    const rope = mesh(geo.cyl(0.015, 0.015, 1, 4), '#c8b48a');
    rope.castShadow = false;
    root.add(rope);
    const stream = new THREE.Mesh(geo.cyl(0.05, 0.035, 1, 6), new THREE.MeshStandardMaterial({ color: '#7fc4e8', transparent: true, opacity: 0.8, roughness: 0.2 }));
    root.add(stream);
    const SX = WELL.x + 1.8;
    const SZ = WELL.z;
    const drum = new THREE.Vector3(WELL.x, w.drumY, WELL.z);
    const trough = new THREE.Vector3(anchors.trough.x, anchors.trough.y, anchors.trough.z);
    const CYC = 5; // 12 s
    const depthKeys = [[0, 0, walkEase], [0.3, 1], [0.36, 1, walkEase], [0.62, 0]];
    const yawKeys = [[0, -Math.PI / 2], [0.7, -Math.PI / 2], [0.76, 0], [0.88, 0], [0.94, -Math.PI / 2]];
    const holdKeys = [[0, 0], [0.62, 0], [0.7, 1], [0.94, 1], [1, 0]];
    const hp = new THREE.Vector3();
    ups.push((t) => {
      const u = ph(t, CYC);
      resetPose(r);
      const d = track(u, depthKeys);
      const phi = -d * TAU * 3;
      w.crank.rotation.x = phi;
      const holdA = track(u, holdKeys);
      const reach = bump(u, 0.6, 0.72, 0.04) + bump(u, 0.93, 1.0, 0.03);
      const pour = bump(u, 0.77, 0.88, 0.03);
      const yaw = track(u, yawKeys);
      const crankA = 1 - smooth(range(u, 0.6, 0.64)) + smooth(range(u, 0.97, 1.0));
      const cA = clamp(crankA);
      // arms on the crank (circle in front of the body) vs holding the bucket
      const crankX = -1.2 + 0.35 * Math.sin(phi);
      const crankZ = 0.3 * Math.cos(phi);
      const carryX = -0.95 - 0.35 * reach - 0.3 * pour;
      r.armL.rotation.x = lerp(carryX, crankX, cA);
      r.armR.rotation.x = lerp(carryX, crankX, cA);
      r.armL.rotation.z = lerp(0.42, 0.28 + crankZ, cA);
      r.armR.rotation.z = lerp(-0.42, -0.28 + crankZ, cA);
      r.torso.rotation.x = 0.08 + 0.06 * Math.sin(phi) * cA + 0.35 * reach + 0.2 * pour;
      r.head.rotation.x = 0.15 + 0.2 * pour;
      breathe(r, osc(t, 18), 0.03);
      place(r, SX, SZ, yaw);
      r.root.updateMatrixWorld(true);

      // bucket: on the rope (depth d), or in her hands
      const hang = _a.set(WELL.x, w.drumY - 0.4 - d * (w.drumY - 0.4 - (w.rimY - 1.4)), WELL.z);
      r.handL.getWorldPosition(hp);
      r.handR.getWorldPosition(_b);
      hp.add(_b).multiplyScalar(0.5);
      hp.y += 0.08;
      bucket.g.position.lerpVectors(hang, hp, smooth(holdA));
      bucket.g.rotation.y = yaw * smooth(holdA);
      bucket.g.rotation.x = 1.7 * pour;
      bucket.water.visible = u > 0.33 && u < 0.84;
      stretchBetween(rope, drum, bucket.g.position);
      // pouring stream
      const s = bump(u, 0.79, 0.87, 0.015);
      stream.visible = s > 0.01;
      if (stream.visible) {
        bucket.g.updateMatrixWorld(true);
        const lip = _b.set(0, -0.1, 0.18).applyMatrix4(bucket.g.matrixWorld);
        stretchBetween(stream, lip, trough);
        stream.scale.x = stream.scale.z = s;
      }
    });
  }

  // ---------------- napping peasant ----------------
  {
    const r = createHumanoid({ shirt: '#c9a24a', pants: '#6b5640', hair: '#a0522d', skin: '#f0c8a0' });
    const hat = mesh(geo.cyl(0.4, 0.4, 0.03, 10), '#d8b45a', [0, 0.3, 0.3], [Math.PI / 2, 0, 0]);
    hat.add(mesh(geo.cyl(0.16, 0.2, 0.16, 8), '#d8b45a', [0, 0.08, 0]));
    r.chest.add(hat);
    enableShadows(r.root);
    const dir = new THREE.Vector3(1, 0, 0.75).normalize();
    const fx = NAP_TREE.x + dir.x * 3.0;
    const fz = NAP_TREE.z + dir.z * 3.0;
    lieDown(root, r, fx, fz, Math.atan2(dir.x, dir.z), 0.24);
    // floating "Z"s
    const zTex = (() => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const x = c.getContext('2d');
      x.font = 'bold 52px Georgia, serif';
      x.textAlign = 'center';
      x.textBaseline = 'middle';
      x.lineWidth = 6;
      x.strokeStyle = '#3b5b8a';
      x.strokeText('Z', 32, 34);
      x.fillStyle = '#ffffff';
      x.fillText('Z', 32, 34);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    })();
    const zs = [0, 1, 2].map(() => {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: zTex, transparent: true, depthWrite: false }));
      root.add(s);
      return s;
    });
    const rollKeys = [[0, 0], [0.28, 0], [0.34, 1.25], [0.62, 1.25], [0.68, 0.0], [0.82, 0], [0.86, -0.35], [0.94, -0.35]];
    const hpos = new THREE.Vector3();
    ups.push((t) => {
      resetPose(r);
      const u = ph(t, 1);
      const roll = track(u, rollKeys);
      r.root.rotation.y = roll;
      const br = osc(t, 15);
      breathe(r, br, 0.07);
      r.armL.rotation.x = -0.55 + 0.05 * br;
      r.armR.rotation.x = -0.55 + 0.05 * br;
      r.armL.rotation.z = 0.35;
      r.armR.rotation.z = -0.35 - 0.6 * smooth(roll / 1.25);
      r.legR.rotation.x = -0.3 - 0.25 * smooth(roll / 1.25);
      r.head.rotation.y = 0.35 * roll;
      r.head.rotation.x = -0.08 * br;
      r.head.getWorldPosition(hpos);
      zs.forEach((s, i) => {
        const life = ph(t, 12, i / 3);
        const env = smooth(life / 0.15) * (1 - smooth((life - 0.6) / 0.4));
        s.position.set(hpos.x + 0.3 + life * 0.7 + 0.12 * Math.sin(life * 8), hpos.y + 0.45 + life * 1.5, hpos.z + 0.1 * Math.cos(life * 6));
        s.scale.setScalar(0.22 + life * 0.35);
        s.material.opacity = env * 0.95;
      });
    });
  }

  // ---------------- peasant wallowing in the mud ----------------
  {
    const r = createHumanoid({ shirt: '#9b7a55', pants: '#5d4733', hair: '#3b2a1e', skin: '#e3b18c', boots: '#3b2a1e' });
    r.chest.add(mesh(geo.box(0.3, 0.2, 0.05), '#6b4a2e', [0.05, 0.25, 0.235]));
    enableShadows(r.root);
    lieDown(root, r, MUD.x - 0.9, MUD.z + 0.5, 2.2, 0.12);
    ups.push((t) => {
      resetPose(r);
      r.root.rotation.y = 0.32 * osc(t, 4) + 0.12 * osc(t, 9, 0.2);
      r.armL.rotation.z = -1.25 - 0.18 * osc(t, 8);
      r.armR.rotation.z = 1.25 + 0.18 * osc(t, 8, 0.15);
      r.armL.rotation.x = -0.2;
      r.armR.rotation.x = -0.2;
      r.legL.rotation.z = -0.22 - 0.06 * osc(t, 6);
      r.legR.rotation.z = 0.22 + 0.06 * osc(t, 6, 0.3);
      r.head.rotation.y = 0.35 * osc(t, 4, 0.25);
      breathe(r, osc(t, 15), 0.05);
    });
  }

  // ---------------- children ----------------
  {
    const looks = [
      { shirt: '#e05a47', pants: '#5a6fa8', hair: '#f2c94c' },
      { shirt: '#4fa36b', pants: '#6b5640', hair: '#6b4226' },
      { shirt: '#f2a43a', robe: '#e07a9a', hair: '#3b2a1e' },
      { shirt: '#5a8fd6', pants: '#4f4436', hair: '#a0522d', hat: 'cap', hatColor: '#c8443b' },
    ];
    const kids = looks.map((l, i) => {
      const r = createHumanoid({ ...l, scale: 0.6, skin: ['#f0c8a0', '#d9a77c', '#f5d0b0', '#c68b5e'][i] });
      r.head.scale.setScalar(1.3);
      enableShadows(r.root);
      root.add(r.root);
      return r;
    });
    const P = PLAYGROUND;
    const R1 = 2.2;
    const R2 = 3.5;
    const LAPS = 8;
    const strides1 = Math.round((TAU * R1) / 0.55);
    const strides2 = Math.round((TAU * R2) / 0.55);
    const pA = new THREE.Vector3();
    ups.push((t) => {
      const base = (TAU * LAPS * t) / 60;
      const lag = 0.85 + 0.45 * osc(t, 3);
      const close = 1 - smooth(range(lag, 0.45, 0.8));
      // A: runs away (counter-clockwise); B: chases; C: jumps in the middle; D: outer ring the other way
      const ring = (r, ang, radius, strides, laps, dir, hop) => {
        resetPose(r);
        const x = P.x + Math.sin(ang) * radius;
        const z = P.z + Math.cos(ang) * radius;
        walkPose(r, (ang / TAU) * strides * dir, 1, { run: 1 });
        place(r, x, z, ang + (dir * Math.PI) / 2);
        r.root.position.y += hop;
        return [x, z];
      };
      const A = kids[0];
      const hopA = 0.25 * Math.max(0, osc(t, 16)) ** 3;
      const [ax, az] = ring(A, base, R1, strides1, LAPS, 1, hopA);
      pA.set(ax, 0, az);
      A.armL.rotation.z = -0.1 - 2.2 * close;
      A.armR.rotation.z = 0.1 + 2.2 * close;
      A.head.rotation.y = -0.6 * close;
      const B = kids[1];
      ring(B, base - lag, R1, strides1, LAPS, 1, 0.12 * Math.max(0, osc(t, 24)) ** 3);
      B.armR.rotation.x = lerp(B.armR.rotation.x, -1.5, close);
      B.armR.rotation.z = 0.2;

      const C = kids[2];
      resetPose(C);
      const jp = ph(t, 30);
      const jump = Math.sin(Math.PI * jp) ** 2;
      C.armL.rotation.z = -(2.3 + 0.4 * osc(t, 60));
      C.armR.rotation.z = 2.3 + 0.4 * osc(t, 60, 0.5);
      C.legL.rotation.x = -0.4 * jump;
      C.legR.rotation.x = -0.4 * jump;
      C.head.rotation.x = -0.2;
      place(C, P.x, P.z, Math.atan2(pA.x - P.x, pA.z - P.z));
      C.root.position.y += 0.45 * jump;

      const D = kids[3];
      const angD = -(TAU * 5 * t) / 60 + 1.3;
      const hopD = 0.35 * Math.max(0, osc(t, 10, 0.1)) ** 3;
      ring(D, angD, R2, strides2, 5, -1, hopD);
      const wave = Math.max(0, osc(t, 10, 0.1)) ** 2;
      D.armL.rotation.z = -0.1 - 2.4 * wave;
      D.armR.rotation.z = 0.1 + 2.4 * wave;
    });
  }

  // ---------------- farmer ----------------
  {
    const r = createHumanoid({ shirt: '#d9c79a', pants: '#5a6fa8', hat: 'straw', hatColor: '#e2c25d', skin: '#d9a77c', beard: '#8a8378', hair: '#8a8378' });
    hold(r.handR, props.hoe(), [0, -0.2, 0.08], [0.1, 0, 0]);
    enableShadows(r.root);
    root.add(r.root);
    const rows = anchors.fieldRows;
    const fx = (rows[2] + rows[3]) / 2;
    const z0 = FIELDS.z - 5.5;
    const z1 = FIELDS.z + 5.5;
    const sKeys = [[0, 0], [0.1, 0, walkEase], [0.27, 0.5], [0.43, 0.5, walkEase], [0.6, 1], [0.72, 1, walkEase], [0.97, 0]];
    const yawKeys = [[0, Math.PI], [0.05, 0], [0.72, 0], [0.76, Math.PI]];
    const mover = segmentMover(fx, z0, fx, z1, 2, sKeys, { cruise: 0.6 });
    ups.push((t) => {
      const st = mover(t);
      resetPose(r);
      walkPose(r, st.dist / 1.2, st.amt, { arms: false });
      const hoe = 1 - smooth(st.amt * 3);
      const hp = ph(t, 40);
      const chop = hp < 0.55 ? smooth(hp / 0.55) : 1 - easeIn((hp - 0.55) / 0.2);
      const armX = lerp(-0.9, lerp(-0.7, -1.7, clamp(chop)), hoe);
      r.armR.rotation.x = armX;
      r.armL.rotation.x = armX + 0.1;
      r.armL.rotation.z = 0.35;
      r.armR.rotation.z = -0.2;
      r.torso.rotation.x = 0.1 + 0.25 * hoe * (1 - clamp(chop) * 0.6);
      r.head.rotation.x = 0.2 * hoe;
      breathe(r, osc(t, 16), 0.03);
      place(r, st.x, st.z, track(st.u, yawKeys));
    });
  }

  // ---------------- maid with basket ----------------
  {
    const r = createHumanoid({ shirt: '#4f7fbf', robe: '#3f669e', hat: 'kerchief', hatColor: '#f4efe4', apron: '#f4efe4', skin: '#f5d0b0', hair: '#c27a3a' });
    hold(r.handL, props.basket(), [0, -0.05, 0.05], [0, 0, 0]);
    enableShadows(r.root);
    root.add(r.root);
    const mover = loopMover([[5, 25.8], [8.3, 31.5], [6.2, 36.2], [1.5, 37.6], [-3.5, 36.8], [-5.2, 31], [-4.6, 26.4], [0.5, 26.6]], 1, { stride: 1.05 });
    ups.push((t) => {
      const m = mover(t);
      resetPose(r);
      walkPose(r, m.phase, 0.8);
      r.armL.rotation.x = -0.3;
      r.armL.rotation.z = -0.25;
      r.head.rotation.y = 0.3 * osc(t, 3);
      place(r, m.x, m.z, m.yaw);
    });
  }

  // ---------------- baker carrying bread ----------------
  {
    const r = createHumanoid({ shirt: '#f4efe4', pants: '#6b5640', hat: 'chef', hatColor: '#ffffff', apron: '#ffffff', skin: '#f0c8a0', hair: '#5a3a22', scale: 1.04 });
    r.chest.add(mesh(geo.box(0.5, 0.1, 0.36), '#a7774a', [0, 0.22, 0.42]));
    const bread = props.bread();
    bread.position.set(0, 0.32, 0.42);
    r.chest.add(bread);
    enableShadows(r.root);
    root.add(r.root);
    const a = anchors.bakeryDoor;
    const sy = STALL.yaw;
    const b = { x: STALL.x + 1.9 * Math.cos(sy) + 1.3 * Math.sin(sy), z: STALL.z - 1.9 * Math.sin(sy) + 1.3 * Math.cos(sy) };
    const go = Math.atan2(b.x - a.x, b.z - a.z);
    const faceStall = Math.atan2(STALL.x - b.x, STALL.z - b.z);
    const sKeys = [[0, 0, walkEase], [0.35, 1], [0.5, 1, walkEase], [0.85, 0]];
    const yawKeys = unwrapKeys([
      [0, go], [0.35, go], [0.38, faceStall], [0.47, faceStall], [0.5, go + Math.PI],
      [0.85, go + Math.PI], [0.88, anchors.bakeryYaw + Math.PI], [0.97, anchors.bakeryYaw + Math.PI],
    ]);
    const mover = segmentMover(a.x, a.z, b.x, b.z, 2, sKeys, { cruise: 0.6 });
    ups.push((t) => {
      const st = mover(t);
      resetPose(r);
      walkPose(r, st.dist / 1.2, st.amt, { arms: false });
      const bend = bump(st.u, 0.38, 0.47, 0.03);
      r.armL.rotation.x = -1.0 - 0.3 * bend;
      r.armR.rotation.x = -1.0 - 0.3 * bend;
      r.armL.rotation.z = 0.5;
      r.armR.rotation.z = -0.5;
      r.torso.rotation.x = 0.35 * bend;
      breathe(r, osc(t, 16), 0.03);
      place(r, st.x, st.z, track(st.u, yawKeys));
    });
  }

  // ---------------- market chatter: merchant + customer ----------------
  {
    const merchant = createHumanoid({ shirt: '#c8443b', pants: '#4f4436', hat: 'cap', hatColor: '#2f4f9a', beard: '#5a3a22', hair: '#5a3a22', skin: '#e3b18c', apron: '#e9dcc0' });
    const customer = createHumanoid({ shirt: '#7aa35a', robe: '#5c8a45', hat: 'kerchief', hatColor: '#d8402f', skin: '#c68b5e', hair: '#2a1d16' });
    hold(customer.handL, props.basket('#a07a45'), [0, -0.05, 0.05]);
    enableShadows(merchant.root);
    enableShadows(customer.root);
    root.add(merchant.root, customer.root);
    const sb = anchors.stallBack;
    const sf = anchors.stallFront;
    ups.push((t) => {
      const u = ph(t, 6);
      const mTalk = bump(u, 0.02, 0.48, 0.05);
      const cTalk = bump(u, 0.52, 0.98, 0.05);
      for (const [r, talk, listen, i] of [[merchant, mTalk, cTalk, 0], [customer, cTalk, mTalk, 1]]) {
        resetPose(r);
        const g1 = 0.5 + 0.5 * osc(t, 42, i * 0.3);
        const g2 = 0.5 + 0.5 * osc(t, 30, i * 0.6 + 0.2);
        r.armR.rotation.x = -0.25 - talk * (0.5 + 0.6 * g1);
        r.armR.rotation.z = -0.1 - talk * 0.3 * g2;
        if (i === 0) {
          r.armL.rotation.x = -0.2 - talk * 0.6 * g2;
          r.armL.rotation.z = talk * 0.3;
        } else {
          r.armL.rotation.x = -0.3;
          r.armL.rotation.z = -0.25;
        }
        r.head.rotation.x = listen * 0.12 * Math.sin(TAU * ph(t, 36, i * 0.4)) ** 2 + talk * 0.05 * osc(t, 50);
        r.head.rotation.z = talk * 0.08 * osc(t, 20, i);
        r.torso.rotation.y = talk * 0.12 * osc(t, 12, i);
        r.hips.rotation.z = 0.02 * osc(t, 4, i * 0.5);
        breathe(r, osc(t, 16, i * 0.4), 0.03);
      }
      place(merchant, sb.x, sb.z, STALL.yaw);
      place(customer, sf.x, sf.z, STALL.yaw + Math.PI);
    });
  }

  // ---------------- fisherman on the dock ----------------
  {
    const r = createHumanoid({ shirt: '#5a7a8f', pants: '#4f4436', hat: 'straw', hatColor: '#c9a24a', beard: '#cfc8bc', hair: '#cfc8bc', skin: '#e3b18c' });
    const rod = props.rod();
    hold(r.handR, rod.g, [0, 0, 0.02], [1.87, 0, 0]);
    enableShadows(r.root);
    root.add(r.root);
    const dock = anchors.dock;
    const fx = dock.x + 0.35;
    const fz = dock.z;
    // a bucket for the catch
    root.add(mesh(geo.cyl(0.17, 0.14, 0.3, 8), '#8a5a35', [fx + 0.3, dock.y + 0.15, fz - 0.55]));
    const bobber = new THREE.Group();
    bobber.add(mesh(geo.sphere(0.06, 8, 5), '#e03a2f', [0, 0.02, 0]));
    bobber.add(mesh(geo.sphere(0.055, 8, 5), '#ffffff', [0, -0.03, 0]));
    root.add(bobber);
    const W = new THREE.Vector3(fx - 3.6, anchors.waterY + 0.02, fz + 0.4);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(Array.from({ length: 12 }, () => new THREE.Vector3()));
    const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: '#f4efe4', transparent: true, opacity: 0.8 }));
    line.frustumCulled = false;
    root.add(line);
    const rings = [0, 1].map(() => {
      const m = new THREE.Mesh(new THREE.RingGeometry(0.9, 1, 24), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0, depthWrite: false }));
      m.rotation.x = -Math.PI / 2;
      root.add(m);
      return m;
    });
    const tip = new THREE.Vector3();
    const hangP = new THREE.Vector3();
    const CYC = 4; // 15 s
    const armKeys = [[0, -0.9], [0.68, -0.9], [0.73, -1.75], [0.8, -2.3], [0.86, -2.3], [0.9, -0.7, easeIn], [0.95, -0.9]];
    ups.push((t) => {
      const u = ph(t, CYC);
      resetPose(r);
      sitPose(r, 0.0);
      r.legL.rotation.x = -1.35 + 0.15 * osc(t, 6);
      r.legR.rotation.x = -1.35 + 0.15 * osc(t, 6, 0.5);
      const ax = track(u, armKeys) + 0.04 * osc(t, 24) * (u < 0.66 ? 1 : 0);
      r.armR.rotation.x = ax;
      r.armL.rotation.x = ax + 0.1;
      r.armL.rotation.z = 0.35;
      r.armR.rotation.z = -0.1;
      r.torso.rotation.x = 0.15 - 0.15 * bump(u, 0.7, 0.9, 0.04);
      r.head.rotation.x = 0.12;
      breathe(r, osc(t, 15), 0.03);
      place(r, fx, fz, -Math.PI / 2, dock.y);
      r.root.updateMatrixWorld(true);
      rod.tip.getWorldPosition(tip);

      // bobber: floats (with a nibble), is yanked out, swings, then cast back out
      const out = track(u, [[0, 0], [0.68, 0], [0.74, 1], [0.86, 1], [0.92, 0, linearEase]]);
      hangP.copy(tip).add(_a.set(0, -0.55, 0));
      const nibble = bump(u, 0.45, 0.6, 0.02) * Math.max(0, Math.sin(TAU * ph(t, 48))) * 0.06;
      const float = W.clone();
      float.y += 0.02 * osc(t, 30) - nibble;
      bobber.position.lerpVectors(float, hangP, out);
      if (u > 0.86 && u < 0.92) bobber.position.y += Math.sin(out * Math.PI) * 1.2;
      // line: from the rod tip to the bobber, sagging when slack
      const pts = lineGeo.attributes.position;
      const sag = 0.35 * (1 - out);
      for (let i = 0; i < 12; i++) {
        const f = i / 11;
        _b.lerpVectors(tip, bobber.position, f);
        _b.y -= Math.sin(f * Math.PI) * sag;
        pts.setXYZ(i, _b.x, _b.y, _b.z);
      }
      pts.needsUpdate = true;
      // ripples while the bobber is in the water
      const inWater = 1 - smooth(clamp(out * 4));
      rings.forEach((m, i) => {
        const life = ph(t, 16, i / 2);
        m.position.set(W.x, anchors.waterY + 0.03, W.z);
        m.scale.setScalar(0.08 + life * 0.7);
        m.material.opacity = 0.55 * (1 - life) * smooth(life / 0.1) * inWater;
      });
    });
  }

  return {
    root,
    update(t) {
      for (const u of ups) u(t);
    },
  };
}

function linearEase(x) {
  return clamp(x);
}

/**
 * Make a periodic yaw track take the shortest way round: each key is shifted by
 * multiples of 2π to sit nearest its predecessor, and a closing key at u=1 lands
 * on the equivalent of the first value, so total rotation per cycle is a whole turn.
 */
function unwrapKeys(keys) {
  const near = (v, ref) => v + TAU * Math.round((ref - v) / TAU);
  const out = [[keys[0][0], keys[0][1]]];
  for (let i = 1; i < keys.length; i++) out.push([keys[i][0], near(keys[i][1], out[i - 1][1])]);
  out.push([1, near(keys[0][1], out[out.length - 1][1])]);
  return out;
}

