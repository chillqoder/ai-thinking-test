// Cinematic camera: a closed spline through hand-placed shots. It starts on
// the castle walls, glides down into the village, swings wide around the
// island (underside, waterfalls, fields, pasture, pond) and climbs back to the
// walls — returning exactly to its first frame at the end of the loop.

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { LOOP, osc } from './core/loop.js';

// Each shot is 1/N of the loop. Closer keys = slower glide.
const SHOTS = [
  { p: [-7.5, 15.5, 9.5], t: [1.5, 10.5, -4.5] }, // castle walls: archers, gate, the king
  { p: [5, 11.5, 19], t: [1, 5, 6] }, // gliding down the gate road
  { p: [13.5, 6.5, 32.5], t: [4, 1.2, 20] }, // children at play, the well, the baker
  { p: [0, 11, 39.5], t: [-12.5, 0.6, 23.5] }, // the pig wallow, woodcutter, sleeper
  { p: [-30, 7, 50], t: [-20, -6, 18] }, // south-west: the cliff waterfall
  { p: [-60, 8, 22], t: [-18, -6, 4] }, // west: fields above, rocky underside below
  { p: [-58, 16, -30], t: [-14, -3, -12] }, // north-west: the spring fall
  { p: [-8, 22, -62], t: [0, 2, -14] }, // north: the castle from behind
  { p: [36, 15, -44], t: [17, 0, -14] }, // north-east: the pasture
  { p: [60, 6, 22], t: [30, -5, 10] }, // east: the pond waterfall spilling into cloud
  { p: [31, 5.5, 16], t: [21, 0.4, 8.5] }, // the fisherman and the ducks
  { p: [16, 17, 14], t: [-1, 10, -4] }, // rising back towards the walls
];

export function buildCamera(renderer) {
  const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.3, 2400);
  const posCurve = new THREE.CatmullRomCurve3(SHOTS.map((s) => new THREE.Vector3(...s.p)), true, 'centripetal');
  const tgtCurve = new THREE.CatmullRomCurve3(SHOTS.map((s) => new THREE.Vector3(...s.t)), true, 'centripetal');
  const target = new THREE.Vector3();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = false;
  controls.enableDamping = true;
  controls.maxDistance = 400;

  const state = { free: false };

  function update(t) {
    if (state.free) {
      controls.update();
      return;
    }
    const u = t / LOOP;
    posCurve.getPoint(u, camera.position);
    tgtCurve.getPoint(u, target);
    // a barely-there breathing drift keeps static moments alive
    camera.position.y += osc(t, 12) * 0.12;
    camera.lookAt(target);
  }

  function setFree(on) {
    state.free = on;
    controls.enabled = on;
    if (on) {
      controls.target.copy(target);
      controls.update();
    }
  }

  function resize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }

  return { camera, update, setFree, state, resize, shots: SHOTS };
}
