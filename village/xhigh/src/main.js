// Skyhold — a seamlessly looping life simulation on a floating sky island.
//
// Everything visible is a pure function of loop time t ∈ [0, 60): there is no
// accumulated simulation state, so the last frame of the loop flows into the
// first with nothing to reset.

import * as THREE from 'three';
import { LOOP } from './core/loop.js';
import { updateMaterials, windowMat } from './core/materials.js';
import { buildSky } from './world/sky.js';
import { buildIsland } from './world/island.js';
import { buildWater } from './world/water.js';
import { buildClouds } from './world/clouds.js';
import { buildCastle, SMITHY } from './world/castle.js';
import { buildVillage } from './world/village.js';
import { buildSmoke } from './world/smoke.js';
import { buildCamera } from './camera.js';
import { buildActors } from './actors/index.js';

const params = new URLSearchParams(location.search);

// ---- renderer ----------------------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: params.has('capture') });
// pixel ratio is capped: the flat-shaded style gains little above 1.5× and fill rate is the main cost
const MAX_DPR = Number(params.get('dpr')) || 1.5;
renderer.setPixelRatio(Math.min(devicePixelRatio, MAX_DPR));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
document.body.prepend(renderer.domElement);

const scene = new THREE.Scene();

// ---- world -------------------------------------------------------------------
const sky = buildSky(scene);
const island = buildIsland();
const water = buildWater();
const clouds = buildClouds();
const castle = buildCastle();
const village = buildVillage();
scene.add(island.group, water.group, clouds.group, castle.group, village.group);

const smoke = buildSmoke([...village.chimneys, new THREE.Vector3(...SMITHY.chimneyTop)]);
scene.add(smoke.mesh);

const actors = buildActors({ village, castle });
scene.add(actors.group);

const cam = buildCamera(renderer);
const camera = cam.camera;

if (params.has('cycle')) sky.state.mode = Math.max(0, Math.min(2, Number(params.get('cycle'))));

// ---- loop ----------------------------------------------------------------------
let t = ((Number(params.get('t')) || 0) % LOOP + LOOP) % LOOP;
let paused = params.has('pause');
let last = performance.now();

if (params.has('cam')) {
  // debug: ?cam=x,y,z,tx,ty,tz
  const [x, y, z, tx, ty, tz] = params.get('cam').split(',').map(Number);
  camera.position.set(x, y, z);
  camera.lookAt(tx, ty, tz);
  cam.state.lookAt = [tx, ty, tz];
}

function update(t) {
  updateMaterials(t);
  sky.update(t);
  windowMat.emissiveIntensity = Math.max(0, (sky.state.dusk - 0.35) / 0.65) * 1.6;
  island.update(t);
  water.update(t);
  clouds.update(t);
  castle.update(t, sky.state.dusk);
  village.update(t);
  smoke.update(t);
  actors.update(t);
  if (!cam.state.lookAt) cam.update(t);
}

function frame(now) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  if (!paused) t = (t + dt) % LOOP;
  update(t);
  renderer.render(scene, camera);
  hud(t, dt);
  requestAnimationFrame(frame);
}

// ---- HUD + keys ----------------------------------------------------------------
const hudEl = document.getElementById('hud');
const hudTime = document.getElementById('hud-time');
const hudBar = document.getElementById('hud-bar');
let fpsAcc = 0;
let fpsN = 0;
let fps = 60;
if (params.has('nohud')) hudEl.classList.add('hidden');

function hud(t, dt) {
  fpsAcc += dt;
  fpsN++;
  if (fpsAcc > 0.5) {
    fps = fpsN / fpsAcc;
    fpsAcc = 0;
    fpsN = 0;
  }
  hudTime.textContent = `${paused ? '❚❚ ' : ''}${t.toFixed(1)} / ${LOOP}s · ${Math.round(fps)} fps`;
  hudBar.style.width = `${(t / LOOP) * 100}%`;
}

addEventListener('keydown', (e) => {
  if (e.code === 'Space') paused = !paused;
  else if (e.code === 'ArrowRight') t = (t + 2) % LOOP;
  else if (e.code === 'ArrowLeft') t = (t - 2 + LOOP) % LOOP;
  else if (e.code === 'KeyH') hudEl.classList.toggle('hidden');
  else if (e.code === 'KeyC') {
    cam.state.lookAt = null;
    cam.setFree(!cam.state.free);
  } else if (e.code === 'KeyD') sky.cycleMode();
  else return;
  e.preventDefault();
});

addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight);
  cam.resize();
});

// compile every shader up front so nothing hitches when it first comes into view
renderer.compile(scene, camera);
requestAnimationFrame(frame);
window.__skyhold = {
  scene,
  renderer,
  camera,
  setTime: (v) => (t = v),
  get t() {
    return t;
  },
  /** Synchronously pose and draw the world at loop time v (used by tests). */
  renderAt(v) {
    update(((v % LOOP) + LOOP) % LOOP);
    renderer.render(scene, camera);
  },
};
