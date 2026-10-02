import * as THREE from 'three';
import { piece } from '../core/geo.js';
import { lerp, rng, TAU } from '../core/math.js';
import { LOOP } from '../config.js';

// Two cloud layers:
//  • a sea of clouds far below the island, built from SECTORS identical wedges and
//    rotated by exactly one wedge per loop – so it drifts forever yet loops perfectly;
//  • a ring of puffy clouds around the island. Each cloud travels to the next slot
//    while morphing into that slot's shape, so after one loop every cloud has become
//    its neighbour and the scene is back to its first frame.

const SECTORS = 6;
const RING_SLOTS = 12;
const PUFFS = 8;

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _p = new THREE.Vector3();
const _s = new THREE.Vector3();
const _c = new THREE.Color();

function cloudSea(material, rand) {
  const clusters = [];
  const wedge = TAU / SECTORS;
  for (let i = 0; i < 70; i++) {
    const r = 10 + Math.pow(rand.next(), 0.8) * 250;
    const a = rand.next() * wedge;
    const big = r > 110 ? 1.7 : r > 60 ? 1.3 : 1;
    const n = 4 + Math.floor(rand.next() * 4);
    const cy = -27.5 + (rand.next() - 0.5) * 3 - Math.max(0, r - 140) * 0.05;
    for (let k = 0; k < n; k++) {
      const off = rand.next() * 4.5 * big;
      const oa = rand.next() * TAU;
      clusters.push({
        r: Math.hypot(r + Math.cos(oa) * off, Math.sin(oa) * off),
        a: a + Math.atan2(Math.sin(oa) * off, r + Math.cos(oa) * off),
        y: cy + (rand.next() - 0.3) * 1.6 * big,
        s: (2.4 + rand.next() * 3.2) * big,
        tint: rand.next(),
      });
    }
  }
  const count = clusters.length * SECTORS;
  const geo = piece(new THREE.IcosahedronGeometry(1, 1), '#ffffff', null, { jitter: 0.03 });
  const mesh = new THREE.InstancedMesh(geo, material, count);
  mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
  let i = 0;
  for (let sct = 0; sct < SECTORS; sct++) {
    for (const c of clusters) {
      const a = c.a + sct * wedge;
      _q.setFromAxisAngle(_p.set(0, 1, 0), c.tint * 6);
      _m.compose(_p.set(Math.cos(a) * c.r, c.y, Math.sin(a) * c.r), _q, _s.set(c.s, c.s * 0.62, c.s));
      mesh.setMatrixAt(i, _m);
      _c.setRGB(1, 1, 1).lerp(new THREE.Color(c.tint < 0.5 ? '#e6edff' : '#fff1ea'), Math.abs(c.tint - 0.5));
      mesh.setColorAt(i, _c);
      i++;
    }
  }
  mesh.frustumCulled = false;
  mesh.name = 'cloud-sea';
  mesh.userData.loopSymmetric = true; // rotates by one identical wedge per loop
  return mesh;
}

function makeShape(rand) {
  const puffs = [];
  const len = 5 + rand.next() * 5;
  for (let k = 0; k < PUFFS; k++) {
    const u = (k / (PUFFS - 1)) * 2 - 1;
    const centre = 1 - Math.abs(u);
    puffs.push({
      x: u * len * 0.5 + (rand.next() - 0.5) * 1.2,
      y: centre * (1.2 + rand.next() * 1.2) + (rand.next() - 0.5) * 0.4,
      z: (rand.next() - 0.5) * 2.2,
      s: 1.3 + centre * (1.4 + rand.next() * 1.2) + rand.next() * 0.5,
    });
  }
  return puffs;
}

export function createClouds(ctx) {
  const rand = rng(9001);
  const sea = cloudSea(ctx.materials.cloud, rand);
  const seaGroup = new THREE.Group();
  seaGroup.add(sea);
  ctx.scene.add(seaGroup);

  // Ring slots with irregular spacing, radius and height.
  const slots = [];
  for (let i = 0; i < RING_SLOTS; i++) {
    slots.push({
      a: ((i + (rand.next() - 0.5) * 0.5) / RING_SLOTS) * TAU,
      r: 72 + rand.next() * 55,
      y: rand.next() < 0.35 ? -16 + rand.next() * 7 : 4 + rand.next() * 20,
      scale: 0.8 + rand.next() * 0.8,
      shape: makeShape(rand),
    });
  }
  const geo = piece(new THREE.IcosahedronGeometry(1, 1), '#ffffff', null, { jitter: 0.03 });
  const ring = new THREE.InstancedMesh(geo, ctx.materials.cloud, RING_SLOTS * PUFFS);
  ring.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  ring.frustumCulled = false;
  ring.name = 'cloud-ring';
  ring.userData.loopSymmetric = true; // each cloud becomes its neighbour over one loop
  ctx.scene.add(ring);

  const update = (t) => {
    const phase = t / LOOP;
    seaGroup.rotation.y = -(phase * TAU) / SECTORS;
    let n = 0;
    for (let i = 0; i < RING_SLOTS; i++) {
      const A = slots[i];
      const B = slots[(i + 1) % RING_SLOTS];
      const aB = B.a + (i + 1 === RING_SLOTS ? TAU : 0);
      const a = lerp(A.a, aB, phase);
      const r = lerp(A.r, B.r, phase);
      const y = lerp(A.y, B.y, phase);
      const sc = lerp(A.scale, B.scale, phase);
      const cx = Math.cos(a) * r;
      const cz = Math.sin(a) * r;
      // the cloud's long axis follows its direction of travel
      const yaw = -a;
      _q.setFromAxisAngle(_p.set(0, 1, 0), yaw);
      for (let k = 0; k < PUFFS; k++) {
        const pa = A.shape[k];
        const pb = B.shape[k];
        const lx = lerp(pa.x, pb.x, phase) * sc;
        const ly = lerp(pa.y, pb.y, phase) * sc;
        const lz = lerp(pa.z, pb.z, phase) * sc;
        const s = lerp(pa.s, pb.s, phase) * sc;
        const c = Math.cos(yaw);
        const sn = Math.sin(yaw);
        _m.compose(_p.set(cx + lx * c + lz * sn, y + ly, cz - lx * sn + lz * c), _q, _s.set(s, s * 0.8, s));
        ring.setMatrixAt(n++, _m);
      }
    }
    ring.instanceMatrix.needsUpdate = true;
  };

  return { update };
}
