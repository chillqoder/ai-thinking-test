// Clouds: a soft sea of puffs far below the island, plus light clouds that
// drift past. Drifting clouds are born small, swell, travel, and dissolve, each
// on a loop-length lifecycle — so there is never a wrap-around pop.

import * as THREE from 'three';
import { paint, ico, transform } from '../core/geo.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { TAU, phase, osc, smooth, lerp } from '../core/loop.js';
import { rng } from '../core/random.js';

const cloudMat = new THREE.MeshStandardMaterial({
  vertexColors: true,
  flatShading: true,
  roughness: 1,
  metalness: 0,
  emissive: 0xffffff,
  emissiveIntensity: 0.12,
});

/** One lumpy cloud made from merged icosahedra; bottom shaded slightly blue. */
function cloudGeometry(rand, { blobs = 7, spread = 3.2, size = 1.6, flat = 0.62 } = {}) {
  const parts = [];
  for (let i = 0; i < blobs; i++) {
    const r = size * (0.55 + rand() * 0.6) * (i === 0 ? 1.35 : 1);
    const g = ico(r, 1);
    const x = (rand() - 0.5) * spread * 2;
    const z = (rand() - 0.5) * spread * 0.9;
    const y = rand() * size * 0.5 + (i === 0 ? size * 0.3 : 0);
    transform(g, { p: [x, y, z], r: [rand(), rand(), rand()] });
    parts.push(g);
  }
  const merged = mergeGeometries(parts.map((p) => (p.index ? p.toNonIndexed() : p)), false);
  merged.scale(1, flat, 1);
  return paint(merged, (x, y) => (y < size * 0.1 ? 0xdde6f3 : y < size * 0.6 ? 0xf1f5fb : 0xffffff), { jitter: 0.02, rand });
}

export function buildClouds() {
  const group = new THREE.Group();
  group.name = 'clouds';
  const rand = rng(303);

  // ---- cloud sea below the island ------------------------------------------
  const seaGeoms = [cloudGeometry(rand, { blobs: 6, spread: 4, size: 3, flat: 0.5 }), cloudGeometry(rand, { blobs: 8, spread: 5, size: 3.6, flat: 0.45 })];
  const seaCount = 70;
  const sea = seaGeoms.map((g) => {
    const m = new THREE.InstancedMesh(g, cloudMat, seaCount);
    m.frustumCulled = false;
    group.add(m);
    return m;
  });
  const seaDefs = [];
  for (let i = 0; i < seaCount * 2; i++) {
    const a = rand() * TAU;
    const d = 12 + Math.sqrt(rand()) * 260;
    seaDefs.push({
      x: Math.cos(a) * d,
      z: Math.sin(a) * d,
      y: -58 - rand() * 10 + (d > 120 ? 6 : 0),
      s: 1.6 + rand() * 2.8 + d / 90,
      rot: rand() * TAU,
      ph: rand(),
      sway: 1.5 + rand() * 2,
    });
  }

  // ---- drifting clouds at island altitude -------------------------------------
  const driftGeoms = [cloudGeometry(rand, { blobs: 7 }), cloudGeometry(rand, { blobs: 9, spread: 4.2 }), cloudGeometry(rand, { blobs: 5, spread: 2.4, size: 1.3 })];
  const WIND = new THREE.Vector3(1, 0, 0.32).normalize();
  const CROSS = new THREE.Vector3(-WIND.z, 0, WIND.x);
  const drifters = [];
  const DRIFT_N = 16;
  for (let i = 0; i < DRIFT_N; i++) {
    const mesh = new THREE.Mesh(driftGeoms[i % driftGeoms.length], cloudMat);
    mesh.castShadow = false;
    group.add(mesh);
    // lane across the wind, never through the island itself
    let lane = (rand() - 0.5) * 2 * 150;
    if (Math.abs(lane) < 62) lane = Math.sign(lane || 1) * (62 + rand() * 30);
    drifters.push({
      mesh,
      lane,
      y: -30 + rand() * 62,
      span: 150 + rand() * 60, // distance travelled per lifecycle
      ph: i / DRIFT_N + rand() * 0.04,
      scale: 1.6 + rand() * 1.8,
      rot: rand() * TAU,
    });
  }

  const dummy = new THREE.Object3D();

  function update(t) {
    sea.forEach((mesh, mi) => {
      for (let i = 0; i < seaCount; i++) {
        const d = seaDefs[mi * seaCount + i];
        // gentle bobbing and a small closed drift loop
        const dx = osc(t, 60, d.ph) * d.sway;
        const dz = osc(t, 60, d.ph + 0.25) * d.sway;
        dummy.position.set(d.x + dx, d.y + osc(t, 20, d.ph) * 0.6, d.z + dz);
        dummy.rotation.set(0, d.rot + osc(t, 60, d.ph) * 0.05, 0);
        const breathe = 1 + osc(t, 15, d.ph) * 0.04;
        dummy.scale.set(d.s * breathe, d.s * (1 + osc(t, 12, d.ph) * 0.06), d.s * breathe);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    });

    for (const c of drifters) {
      const u = phase(t, 60, c.ph);
      const along = (u - 0.5) * c.span;
      c.mesh.position.copy(WIND).multiplyScalar(along).addScaledVector(CROSS, c.lane);
      c.mesh.position.y = c.y + Math.sin(u * TAU) * 1.5;
      // swell in, linger, dissolve out
      const life = smooth(u / 0.2) * (1 - smooth((u - 0.78) / 0.22));
      const s = c.scale * life + 0.0001;
      c.mesh.scale.set(s, s * lerp(0.5, 1, life), s);
      c.mesh.visible = life > 0.001;
      c.mesh.rotation.y = c.rot + u * 0.3;
    }
  }

  return { group, update };
}
