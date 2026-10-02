// Cinematic camera: a closed Catmull-Rom path for the eye and another for the
// look-at target, sampled uniformly in time. Closed curves → the end of the
// loop flows straight back into the start with continuous velocity.
import * as THREE from 'three';
import { ph } from './core/util.js';

// [eye], [target] — one key every 7.5 s
const KEYS = [
  [[-15, 21, 24], [0, 9, -7]], // castle walls, gate and the king's balcony
  [[12, 13, 39], [1, 2.5, 21]], // drifting down over the village square
  [[38, 11, 42], [15, 1.5, 28]], // pig pen, chickens, cows
  [[66, 15, 6], [26, 1.5, 0]], // fields, barn, east waterfalls
  [[18, -9, -74], [0, 0, -10]], // round the back, low: the rocky underside
  [[-66, 12, -20], [-16, 1, 4]], // forest, pond and the stream waterfall
  [[-44, 9, 38], [-18, 1, 25]], // woodcutter, fisherman, the napping peasant
  [[-24, 12, 45], [-3, 2, 26]], // children, maid, well — and back up to the walls
];

export function createCameraRig(camera) {
  const eye = new THREE.CatmullRomCurve3(KEYS.map((k) => new THREE.Vector3(...k[0])), true, 'centripetal');
  const target = new THREE.CatmullRomCurve3(KEYS.map((k) => new THREE.Vector3(...k[1])), true, 'centripetal');
  const e = new THREE.Vector3();
  const tg = new THREE.Vector3();
  return {
    update(t) {
      const u = ph(t, 1);
      eye.getPoint(u, e);
      target.getPoint(u, tg);
      camera.position.copy(e);
      camera.lookAt(tg);
    },
  };
}
