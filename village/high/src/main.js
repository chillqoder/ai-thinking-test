import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { LOOP, osc } from './core/util.js';
import { windowMat } from './core/kit.js';
import { buildTerrain } from './world/terrain.js';
import { buildSkyDome, buildClouds, buildBirds } from './world/sky.js';
import { buildEnvironment } from './world/env.js';
import { buildCastle } from './world/castle.js';
import { buildVillage } from './world/village.js';
import { buildFlags, buildSmoke, buildWater } from './fx/effects.js';
import { buildCastleFolk } from './characters/castleFolk.js';
import { buildVillagers } from './characters/villagers.js';
import { buildAnimals } from './characters/animals.js';
import { createCameraRig } from './camera.js';

// URL options (handy for inspection; the scene itself needs no input):
//   ?t=12      start at loop time 12 s      ?speed=2   play faster
//   ?freeze    hold at ?t                   ?free      free orbit camera
//   ?hud=0     hide the loop indicator
const params = new URLSearchParams(location.search);
const startT = parseFloat(params.get('t') || '0') % LOOP;
const speed = parseFloat(params.get('speed') || '1');
const frozen = params.has('freeze');
const free = params.has('free');

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
document.getElementById('app').appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.3, 1500);

// ---------- world ----------
const sky = buildSkyDome();
scene.add(sky.dome);
const env = buildEnvironment(scene, sky);
scene.add(buildTerrain());
const castle = buildCastle();
scene.add(castle.group);
const village = buildVillage();
scene.add(village.root);
const water = buildWater();
scene.add(water.root);
const clouds = buildClouds();
scene.add(clouds.root);
const birds = buildBirds();
scene.add(birds.root);
const flags = buildFlags(castle.flags);
scene.add(flags.root);
const smoke = buildSmoke([...castle.smoke, ...village.smoke]);
scene.add(smoke.mesh);

// ---------- life ----------
const castleFolk = buildCastleFolk();
scene.add(castleFolk.root);
const villagers = buildVillagers(village.anchors);
scene.add(villagers.root);
const animals = buildAnimals();
scene.add(animals.root);

// ---------- camera ----------
const rig = createCameraRig(camera);
let controls = null;
if (free) {
  camera.position.set(60, 50, 70);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 4, 8);
  controls.enableDamping = true;
}

// ---------- loop ----------
const hud = document.getElementById('hud');
const bar = document.getElementById('bar');
const clock = document.getElementById('clock');
if (params.get('hud') === '0') hud.style.display = 'none';

function update(t) {
  env.update(t);
  const dusk = env.state.dusk;
  windowMat.emissiveIntensity = env.state.glow * 1.8;
  clouds.update(t);
  birds.update(t);
  flags.update(t);
  smoke.update(t);
  water.update(t, 1 - 0.28 * dusk);
  village.updateTrees(t);
  const flicker = 0.75 + 0.15 * osc(t, 97) + 0.1 * osc(t, 151, 0.3);
  castle.fire.material.emissiveIntensity = 2.2 * flicker;
  castle.forgeLight.intensity = 6 * flicker;
  village.ovenGlow.material.emissiveIntensity = 1.4 + 0.3 * osc(t, 83);
  castleFolk.update(t);
  villagers.update(t);
  animals.update(t);
  if (!controls) rig.update(t);
}

const t0 = performance.now();
let manualT = null;
function loopTime() {
  if (manualT !== null) return manualT;
  if (frozen) return startT;
  const s = ((performance.now() - t0) / 1000) * speed + startT;
  return ((s % LOOP) + LOOP) % LOOP;
}

let lastSec = -1;
renderer.setAnimationLoop(() => {
  const t = loopTime();
  update(t);
  if (controls) controls.update();
  renderer.render(scene, camera);
  bar.style.transform = `scaleX(${t / LOOP})`;
  const sec = Math.floor(t);
  if (sec !== lastSec) {
    lastSec = sec;
    clock.textContent = `0:${String(sec).padStart(2, '0')} / 1:00`;
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Test hooks: jump to an exact loop time (used for seam / screenshot checks).
window.__sky = {
  setTime(t) {
    manualT = t === null ? null : ((t % LOOP) + LOOP) % LOOP;
    if (manualT !== null) {
      update(manualT);
      renderer.render(scene, camera);
    }
  },
  renderer,
  scene,
  camera,
  controls,
};
document.body.classList.add('ready');
