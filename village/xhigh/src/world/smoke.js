// Chimney smoke: each emitter owns a ring of puffs on a 6 s lifecycle — they
// rise, drift downwind, swell and shrink away. Pure function of loop time.

import * as THREE from 'three';
import { phase, osc, smooth, lerp } from '../core/loop.js';
import { rng } from '../core/random.js';
import { WIND_DIR } from './cloth.js';

const PUFFS = 6;
const PERIOD = 6;

export function buildSmoke(emitters) {
  const rand = rng(909);
  const geom = new THREE.IcosahedronGeometry(1, 1);
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true, roughness: 1, transparent: true, opacity: 0.72, depthWrite: false, emissive: 0xffffff, emissiveIntensity: 0.18 });
  const mesh = new THREE.InstancedMesh(geom, mat, emitters.length * PUFFS);
  mesh.frustumCulled = false;
  mesh.renderOrder = 5;
  const seeds = emitters.map(() => ({ off: rand(), size: 0.85 + rand() * 0.4, rise: 3 + rand() * 1.2 }));
  const dummy = new THREE.Object3D();
  const grey = new THREE.Color();

  function update(t) {
    let k = 0;
    emitters.forEach((e, ei) => {
      const sd = seeds[ei];
      for (let i = 0; i < PUFFS; i++, k++) {
        const u = phase(t, PERIOD, sd.off + i / PUFFS);
        const drift = u * u * 2.6;
        dummy.position.set(
          e.x + WIND_DIR.x * drift + osc(t, 3, sd.off + i * 0.37) * 0.12 * u,
          e.y + u * sd.rise,
          e.z + WIND_DIR.z * drift + osc(t, 2, sd.off + i * 0.21) * 0.1 * u,
        );
        const s = sd.size * lerp(0.1, 0.42, u) * smooth(u / 0.12) * (1 - smooth((u - 0.7) / 0.3));
        dummy.scale.setScalar(s + 0.0001);
        dummy.rotation.set(u * 2 + i, u * 1.5 + i * 2, 0);
        dummy.updateMatrix();
        mesh.setMatrixAt(k, dummy.matrix);
        grey.setScalar(lerp(0.86, 1.0, u));
        mesh.setColorAt(k, grey);
      }
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor.needsUpdate = true;
  }
  update(0);
  return { mesh, update };
}
