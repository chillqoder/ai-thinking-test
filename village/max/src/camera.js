import * as THREE from 'three';
import { LOOP } from './config.js';
import { wave } from './core/math.js';
import { CyclicTrack } from './core/track.js';

// One slow orbit per loop. The camera starts wide over the forest, glides past the
// castle walls and their archers, sinks into the village, skims the pond and drops
// below the rim to watch a waterfall pour into the clouds, then climbs back out to the
// opening shot. Every channel is a periodic spline, so the path has no seam.
const KEYS = [
  // t,   θ°,  radius, height, target x, y, z
  [0, -50, 58, 26, 2, 3, -4],
  [6, -22, 47, 18, 4, 7, -5],
  [12, 6, 38, 13, 5, 7.5, -3],
  [18, 36, 39, 11, 3, 6, 3],
  [24, 64, 41, 9.5, 5, 2.2, 19],
  [30, 92, 40, 9.5, 0, 1.8, 21],
  [36, 120, 41, 8.5, -8, 1.6, 22],
  [41, 150, 46, 12, -16, 0.6, 5],
  [46, 179, 52, 0.5, -26, -5.5, 1],
  [50.5, 223, 56, 9, -8, 0, -8],
  [55, 268, 58, 19, 0, 2, -6],
];
const DEG = Math.PI / 180;
const channel = (i, wrap = 0) => new CyclicTrack(LOOP, KEYS.map((k) => [k[0], k[i]]), wrap);
const theta = channel(1, 360);
const radius = channel(2);
const height = channel(3);
const tx = channel(4);
const ty = channel(5);
const tz = channel(6);

const BASE_FOV = 38;

export function createCinematicCamera(camera) {
  const target = new THREE.Vector3();
  return {
    update(t) {
      const a = theta.sample(t) * DEG;
      const r = radius.sample(t);
      const aspect = camera.aspect;
      // narrow (portrait) screens get a wider lens so the island still fits
      const widen = Math.max(1, 1.25 / aspect);
      const fov = (2 * Math.atan(Math.tan((BASE_FOV * DEG) / 2) * widen)) / DEG;
      if (Math.abs(camera.fov - fov) > 1e-3) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
      // a gentle hand-held drift
      const dx = 0.35 * wave(t, 3, 0.1) + 0.12 * wave(t, 7, 0.4);
      const dy = 0.25 * wave(t, 4, 0.6) + 0.08 * wave(t, 9, 0.2);
      camera.position.set(Math.cos(a) * r + dx, height.sample(t) + dy, Math.sin(a) * r - dx * 0.6);
      target.set(tx.sample(t) + 0.15 * wave(t, 5, 0.3), ty.sample(t), tz.sample(t));
      camera.lookAt(target);
    },
  };
}

export async function createDevCamera(mode, camera, renderer) {
  if (mode === 'top') {
    camera.position.set(0, 95, 0.01);
    camera.lookAt(0, 0, 0);
    return { update() {} };
  }
  const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(40, 30, 55);
  controls.target.set(0, 2, 2);
  controls.enableDamping = true;
  return { update: () => controls.update() };
}
