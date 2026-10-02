// Village life: the napping peasant under the oak, the peasant wallowing with
// the pigs, children playing tag, the maid's errands and the baker's delivery.

import * as THREE from 'three';
import { Humanoid, makeBasket, SKIN } from './humanoid.js';
import { Pig } from './animals.js';
import { Script } from '../core/script.js';
import { TAU, LOOP, osc, cosc, phase, local, track, ramp, lin, hold, hump, smooth, lerp, clamp, mod } from '../core/loop.js';
import { charMat } from '../core/materials.js';
import { Builder, cone, cyl } from '../core/geo.js';
import { heightAt } from '../world/island.js';
import { OAK, MUD, PEN, KIDS, LINE } from '../world/layout.js';
import { makeRipple } from '../world/water.js';
import { WIND_DIR } from '../world/cloth.js';
import { BAKER_AT_GATE, MAID_AT_STALL } from './schedule.js';

const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _c = new THREE.Vector3();

// ---------------------------------------------------------------------------
// Sleeper under the big oak
// ---------------------------------------------------------------------------

let zTexture = null;
function zzzTexture() {
  if (zTexture) return zTexture;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  g.font = 'bold 54px ui-rounded, system-ui, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.lineWidth = 6;
  g.strokeStyle = 'rgba(60,70,110,0.55)';
  g.strokeText('z', 32, 34);
  g.fillStyle = '#ffffff';
  g.fillText('z', 32, 34);
  zTexture = new THREE.CanvasTexture(c);
  zTexture.colorSpace = THREE.SRGBColorSpace;
  return zTexture;
}

function buildSleeper(group) {
  const h = new Humanoid({ skin: SKIN[1], shirt: 0x6f8fc0, pants: 0x7a6a52, hair: 0xc89a4a, shoes: 0x4a3426 });
  const hat = new Builder();
  hat.add(cone(0.2, 0.2, 9), 0xe0c068, { p: [0, 0.1, 0] });
  hat.add(cyl(0.4, 0.42, 0.03, 12), 0xe0c068, {});
  hat.add(cyl(0.205, 0.205, 0.035, 9), 0xb5523c, { p: [0, 0.03, 0] });
  const hatMesh = new THREE.Mesh(hat.geometry(), charMat);
  hatMesh.castShadow = true;
  hatMesh.position.set(0, 0.2, 0.3);
  hatMesh.rotation.x = Math.PI / 2;
  h.torso.add(hatMesh);
  group.add(h.root);

  const zs = [0, 1, 2].map(() => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: zzzTexture(), transparent: true, depthWrite: false }));
    group.add(s);
    return s;
  });

  const x = OAK.x + 1.45;
  const z = OAK.z - 0.55;
  const y = heightAt(x, z);
  const yaw = Math.atan2(-(OAK.x - x), -(OAK.z - z)); // head towards the trunk
  const roll = track([
    [0, 0],
    [20, 0],
    [22.5, 1.15],
    [48, 1.15],
    [50.5, 0],
  ]);

  return (t) => {
    const r = roll(t);
    const side = r / 1.15;
    h.reset().place(x, y, z, yaw);
    h.lie(r, 0.17);
    h.breathe(osc(t, 5), 2.2);
    // a knee propped up on his back; curled up on his side
    h.legs.L.hip.rotation.x = lerp(-0.55, -0.7, side);
    h.legs.L.knee.rotation.x = lerp(1.0, 1.2, side);
    h.legs.R.hip.rotation.x = lerp(0, -0.5, side);
    h.legs.R.knee.rotation.x = lerp(0.1, 0.9, side);
    h.look(lerp(0.25, 0, side) + osc(t, 30) * 0.05, -0.1);
    h.sync();
    // hands folded over the hat on his tummy
    h.reach('L', h.torso.localToWorld(_a.set(0.12, 0.22, 0.34)));
    h.reach('R', h.torso.localToWorld(_a.set(-0.12, 0.18, 0.34)));

    h.head.localToWorld(_b.set(0, 0.45, 0.1));
    zs.forEach((s, i) => {
      const u = phase(t, 3, i / 3);
      s.position.set(_b.x + WIND_DIR.x * u * 0.4 + Math.sin(u * TAU) * 0.08, _b.y + u * 0.9, _b.z + WIND_DIR.z * u * 0.4);
      s.scale.setScalar(0.12 + u * 0.22);
      s.material.opacity = Math.sin(Math.PI * u) * 0.95;
    });
  };
}

// ---------------------------------------------------------------------------
// Mud wallow: a peasant and pigs in the pen
// ---------------------------------------------------------------------------

function pigBasics(p, t, off) {
  p.tail.rotation.z = osc(t, 0.4, off) * 0.7;
  p.tail.rotation.x = osc(t, 0.6, off) * 0.2;
}

/** Two grunts in a row every `period` seconds: returns 0..1. */
function snort(t, period, off) {
  const L = local(t, period, off);
  return Math.max(hump(L, 0, 0.35), hump(L, 0.45, 0.8));
}

function buildMudPeasant(group, village) {
  const mudY = village.anchors.mudY;
  const h = new Humanoid({ skin: SKIN[2], shirt: 0x8a7a50, pants: 0x6a5232, hair: 0x5a3a22, hairStyle: 'short', shoes: 0x4a3426, belly: 0.4 });
  group.add(h.root);
  const px = MUD.x - 0.3;
  const pz = MUD.z + 0.25;
  const yaw = 2.5;

  const lying = new Pig({ scale: 0.95 });
  const standing = new Pig({ scale: 1.0, spots: true });
  const walker = new Pig({ scale: 1.05 });
  const piglet = new Pig({ scale: 0.55 });
  group.add(lying.root, standing.root, walker.root, piglet.root);
  const lx = MUD.x + 1.15;
  const lz = MUD.z - 0.75;
  const sx = MUD.x + 0.6;
  const sz = MUD.z + 1.45;
  const ripples = [makeRipple(group, 0x3a2414), makeRipple(group, 0x3a2414), makeRipple(group, 0x3a2414)];

  const headYaw = track([
    [0, 0.3],
    [8, 0.3],
    [10, -0.6],
    [18, -0.6],
    [20, 0.2],
    [33, 0.2],
    [35, 0.7],
    [44, 0.7],
    [46, 0.3],
  ]);

  const cx = PEN.x + 0.8;
  const cz = PEN.z + 0.3;
  const ea = 2.5;
  const eb = 2.0;

  return (t) => {
    // --- the peasant, rocking happily in the mud, hands behind his head
    h.reset().place(px, mudY - 0.02, pz, yaw);
    h.lie(osc(t, 6) * 0.3 + osc(t, 15, 0.3) * 0.12, 0.05);
    h.breathe(osc(t, 4), 1.5);
    h.legs.L.hip.rotation.x = -0.35;
    h.legs.L.knee.rotation.x = 0.5 + 0.35 * (0.5 + 0.5 * osc(t, 4));
    h.legs.R.hip.rotation.x = -0.05 + osc(t, 4, 0.5) * 0.08;
    h.look(headYaw(t), -0.05);
    h.sync();
    h.reach('L', h.head.localToWorld(_a.set(0.2, 0.3, -0.16)), 1, _b.set(0.9, 0.2, 0));
    h.reach('R', h.head.localToWorld(_a.set(-0.2, 0.3, -0.16)), 1, _b.set(-0.9, 0.2, 0));

    // --- pig lying in the mud beside him, paddling and wallowing
    lying.reset();
    lying.root.position.set(lx, mudY - 0.06, lz);
    lying.root.rotation.y = 0.9;
    lying.flop(1, 1);
    lying.body.rotation.z += osc(t, 5) * 0.18;
    lying.legs.forEach((l, i) => (l.rotation.x += osc(t, 1.5, i * 0.25) * 0.25));
    lying.head.rotation.x = -0.2 + snort(t, 7.5, 0.2) * 0.25;
    pigBasics(lying, t, 0);

    // --- pig standing in the mud, snorting and wagging
    standing.reset();
    standing.root.position.set(sx, mudY - 0.08, sz);
    standing.root.rotation.y = Math.atan2(px - sx, pz - sz) + 0.4;
    const sn = snort(t, 4, 0.5);
    standing.head.rotation.x = -0.15 + sn * 0.3 + osc(t, 12) * 0.1;
    standing.head.rotation.y = osc(t, 10) * 0.3;
    standing.head.scale.set(1, 1, 1 + sn * 0.08);
    pigBasics(standing, t, 0.3);

    // --- pig + piglet trotting round the pen (two laps per loop)
    [
      [walker, 0, 14],
      [piglet, -0.55, 24],
    ].forEach(([p, lag, strides], i) => {
      const th = TAU * 2 * (t / LOOP) + lag + 2.2;
      p.reset();
      p.root.position.set(cx + Math.cos(th) * ea, 0, cz + Math.sin(th) * eb);
      p.root.position.y = heightAt(p.root.position.x, p.root.position.z) - 0.02;
      p.root.rotation.y = Math.atan2(-ea * Math.sin(th), eb * Math.cos(th));
      p.walk((((th - lag - 2.2) / TAU) * strides) % 1, 1);
      p.head.rotation.x = snort(t, 6, i * 0.5) * 0.25 + osc(t, 1.5, i * 0.3) * 0.05;
      pigBasics(p, t, 0.6 + i * 0.2);
    });

    // --- gloopy mud ripples
    ripples[0].set(px + 0.4, mudY + 0.01, pz + 0.2, phase(t, 3), 0.6, 0.45);
    ripples[1].set(lx, mudY + 0.01, lz, phase(t, 3, 0.5), 0.7, 0.4);
    ripples[2].set(sx, mudY + 0.01, sz, phase(t, 4, 0.2), 0.5, 0.35);
  };
}

// ---------------------------------------------------------------------------
// Children playing tag on the green
// ---------------------------------------------------------------------------

const KID_LOOKS = [
  { shirt: 0xe8a03a, pants: 0x4a6a9a, hair: 0x8a4a22 },
  { dress: 0xd85a7a, shirt: 0xd85a7a, pants: 0xf2e6d0, hair: 0xf0c060, hairStyle: 'pigtails', skirtLen: 0.36 },
  { shirt: 0x5aa0d8, pants: 0x6a4a3a, hair: 0x2a1a10, hat: 'cap', hatColor: 0xd23c3c },
  { dress: 0x8a6ad8, shirt: 0x8a6ad8, pants: 0xf2e6d0, hair: 0x5a3a22, hairStyle: 'bun', skirtLen: 0.36 },
];
const TAGS = [6, 18, 30, 42, 54];
const LAPS = 5;
const STRIDES = 26;

function buildKids(group) {
  const kids = KID_LOOKS.map((look, i) => {
    const h = new Humanoid({ skin: SKIN[[0, 1, 3, 2][i]], shoes: 0x5a3a2a, ...look, scale: 0.6, headScale: 1.28 });
    group.add(h.root);
    return h;
  });
  const gap = (t) => 1.0 + 0.62 * cosc(t, 12); // chaser closes in every 12 s
  const angle = (i, t) => (i < 3 ? (i * TAU) / 3 + TAU * LAPS * (t / LOOP) : angle(0, t) - gap(t));
  const radius = (i, t) => KIDS.r + 0.35 * osc(t, 20, i * 0.3);
  const posAt = (i, t, out) => {
    const th = angle(i, t);
    const r = radius(i, t);
    return out.set(KIDS.x + Math.cos(th) * r, 0, KIDS.z + Math.sin(th) * r);
  };
  const tagged = (t) => Math.max(...TAGS.map((e) => hump(t, e - 0.3, e + 0.5)));
  const cheer = (t, i) => Math.max(...TAGS.map((e) => hold(t, e - 0.2, e + 0.2, e + 1.4, e + 2.0))) * (i === 0 || i === 3 ? 1 : 0.6);

  return (t) => {
    const tag = tagged(t);
    kids.forEach((h, i) => {
      posAt(i, t, _a);
      posAt(i, t + 0.05, _b);
      const yaw = Math.atan2(_b.x - _a.x, _b.z - _a.z);
      const jump = tag * (i === 0 ? 0.45 : i === 3 ? 0.3 : 0.12);
      h.reset().place(_a.x, heightAt(_a.x, _a.z) + jump, _a.z, yaw);
      const travelled = angle(i, t) - angle(i, 0);
      h.walk(mod((travelled / TAU) * STRIDES, 1), 1, 1);
      h.legs.L.knee.rotation.x += jump * 1.5;
      h.legs.R.knee.rotation.x += jump * 1.5;
      // giggling glances back at the chaser
      h.look(i < 3 ? osc(t, 5, i * 0.33) * 0.5 : 0, -0.1);
      const w = cheer(t, i);
      if (w > 0) {
        h.sync();
        const wave = osc(t, 0.5, i * 0.25) * 0.12;
        h.reach('L', h.root.localToWorld(_c.set(0.32 + wave, 2.05, 0.1)), w);
        h.reach('R', h.root.localToWorld(_c.set(-0.32 + wave, 2.05, 0.1)), w);
      }
    });
  };
}

// ---------------------------------------------------------------------------
// The maid: market → clothesline → a sit on the bench → home
// ---------------------------------------------------------------------------

function buildMaid(group, village) {
  const A = village.anchors;
  const house = { x: -9.2, z: 20.2, yaw: Math.PI / 2 + 0.1, d: 3.4 };
  const door = [house.x + Math.sin(house.yaw) * (house.d / 2 + 0.8), house.z + Math.cos(house.yaw) * (house.d / 2 + 0.8)];
  const stallFront = new THREE.Vector3(0, 0, 1.3).applyMatrix4(A.stall.M);
  const lineSpot = [LINE.x + Math.sin(LINE.yaw) * 0.32, LINE.z + Math.cos(LINE.yaw) * 0.32];
  const bench = A.benches[0];
  const benchSpot = [bench.x + Math.sin(bench.yaw) * 0.5, bench.z + Math.cos(bench.yaw) * 0.5];
  const [m0, m1] = MAID_AT_STALL;

  const s = new Script(door, house.yaw, { stride: 1.0 });
  s.walk([[-5.2, 17.4], [-3.6, 15.0], [stallFront.x, stallFront.z]], 0, { dur: m0 - 0.6 })
    .turn(A.stall.yaw + Math.PI, 0.6)
    .wait(m1 - m0, 'chat')
    .walk([[-3.9, 14.6], [-6.0, 14.6], lineSpot], 0.95)
    .turn(LINE.yaw + Math.PI, 0.6)
    .wait(8, 'hang')
    .walk([[-6.0, 16.0], [-3.8, 19.0], benchSpot], 1.0)
    .turn(bench.yaw, 0.7)
    .wait(9.5, 'sit')
    .walk([[-4.4, 20.5], door], 0.9)
    .close('idle');

  const h = new Humanoid({ skin: SKIN[0], dress: 0x4f7fc0, shirt: 0x4f7fc0, apron: 0xffffff, hat: 'bonnet', hatColor: 0xffffff, hair: 0xa0522d, shoes: 0x4a3426, skirtLen: 0.58 });
  const basket = makeBasket({ r: 0.2, h: 0.18, fill: 'laundry' });
  basket.position.set(0.33, -0.12, 0.08);
  h.pelvis.add(basket);
  group.add(h.root);
  const smp = {};
  const lineY = A.line.y;

  return (t) => {
    const st = s.sample(t, smp);
    h.reset().place(st.x, heightAt(st.x, st.z), st.z, st.yaw);
    h.walk(st.phase, st.moving);
    h.breathe(osc(t, 4));
    let sit = 0;
    let hang = 0;
    let chat = 0;
    if (st.action === 'sit') sit = hold(st.local, 0, 0.9, st.step.dur - 0.9, st.step.dur);
    if (st.action === 'hang') hang = hold(st.local, 0, 0.5, st.step.dur - 0.5, st.step.dur);
    if (st.action === 'chat') chat = hold(st.local, 0, 0.4, st.step.dur - 0.4, st.step.dur);
    if (sit > 0) {
      h.pelvis.position.z -= 0.42 * sit;
      h.pelvis.position.y = lerp(h.pelvis.position.y, bench.seat + 0.05, sit);
      for (const l of Object.values(h.legs)) {
        l.hip.rotation.x = -1.45 * sit;
        l.knee.rotation.x = 1.5 * sit;
      }
      h.torso.rotation.x -= 0.12 * sit;
      h.look(osc(t, 7.5) * 0.4 * sit, 0);
    }
    if (chat > 0) {
      h.look(0, 0.05 + hump(local(t, 2), 0.3, 1.0) * 0.15 * chat);
      h.arms.R.shoulder.rotation.x += -0.55 * chat * (0.6 + 0.4 * osc(t, 1.5));
      h.arms.R.elbow.rotation.x += -1.0 * chat;
    }
    h.sync();
    // basket hand on the rim
    basket.updateMatrixWorld();
    h.reach('L', basket.localToWorld(_a.set(0.0, 0.2, 0.18)), 1, _b.set(0.9, -0.2, -0.3));
    if (hang > 0) {
      // reach up and pin laundry along the line
      const k = (local(t, 2) / 2) * 0.5 - 0.25;
      h.reach('R', _a.set(LINE.x + Math.cos(LINE.yaw) * k, lineY - 0.05, LINE.z - Math.sin(LINE.yaw) * k), hang);
      h.look(0, -0.35 * hang);
    }
  };
}

// ---------------------------------------------------------------------------
// The baker: carries a basket of loaves up to the castle gate and back
// ---------------------------------------------------------------------------

function buildBaker(group, village) {
  const doorV = village.anchors.bakeryDoor;
  const door = [doorV.x, doorV.z];
  const up = [[8.6, 19.9], [6.2, 16.6], [3.6, 13.8], [1.2, 13.0], [-0.6, 10.5], [-1.4, 7.5], [0.4, 4.0], [0, 3.35]];
  const down = [...up.slice(0, -1).reverse(), door];
  const [b0, b1] = BAKER_AT_GATE;
  const s = new Script(door, -Math.PI / 2, { stride: 1.05 })
    .walk(up, 0, { dur: b0 - 0.6 })
    .turn(Math.PI, 0.6)
    .wait(b1 - b0, 'offer')
    .walk(down, 0, { dur: 24 })
    .close('rest');

  const h = new Humanoid({ skin: SKIN[1], shirt: 0xf6f1e6, pants: 0x8a7a64, apron: 0xffffff, hat: 'chef', hair: 0x5a3a22, beard: null, belly: 1, shoes: 0x4a3426 });
  const basket = makeBasket({ r: 0.22, h: 0.16, fill: 'bread', handle: false });
  group.add(h.root, basket);
  const smp = {};

  return (t) => {
    const st = s.sample(t, smp);
    h.reset().place(st.x, heightAt(st.x, st.z), st.z, st.yaw);
    h.walk(st.phase, st.moving);
    h.breathe(osc(t, 3));
    const offer = st.action === 'offer' ? hold(st.local, 0.2, 1.0, st.step.dur - 1.2, st.step.dur - 0.3) : 0;
    const bow = st.action === 'offer' ? hump(st.local, 0.4, 1.6) : 0;
    const rest = st.action === 'rest' ? hold(st.local, 0.3, 1.0, st.step.dur - 1.0, st.step.dur - 0.2) : 0;
    h.torso.rotation.x += bow * 0.35 - rest * 0.08;
    h.look(st.action === 'offer' ? osc(t, 5) * 0.35 : 0, 0.05 + bow * 0.3 - rest * 0.15);
    h.sync();
    // basket carried in front of the belly; held out for the guards
    h.torso.localToWorld(basket.position.set(0, lerp(0.12, 0.25, offer), lerp(0.42, 0.62, offer)));
    basket.quaternion.setFromRotationMatrix(h.torso.matrixWorld);
    basket.updateMatrixWorld();
    h.reach('L', basket.localToWorld(_a.set(0.22, 0.14, 0)));
    h.reach('R', basket.localToWorld(_a.set(-0.22, 0.14, 0)));
  };
}

export function buildTownsfolk(group, ctx) {
  const updates = [buildSleeper(group), buildMudPeasant(group, ctx.village), buildKids(group), buildMaid(group, ctx.village), buildBaker(group, ctx.village)];
  return (t) => updates.forEach((u) => u(t));
}
