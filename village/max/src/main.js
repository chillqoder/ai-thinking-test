import * as THREE from 'three';
import { LOOP, SETTINGS } from './config.js';
import { mod } from './core/math.js';
import { Bucket } from './core/geo.js';
import { createMaterials } from './world/materials.js';
import { createSky } from './world/sky.js';
import { createTerrain } from './world/terrain.js';
import { createCastle } from './world/castle.js';
import { createVillage } from './world/village.js';
import { createNature } from './world/nature.js';
import { createWater } from './world/water.js';
import { createClouds } from './world/clouds.js';
import { createEffects } from './world/effects.js';
import { createWindmill } from './world/windmill.js';
import { groundHeight, POND, SPRING } from './world/layout.js';
import { createActors } from './actors/index.js';
import { createLineup } from './actors/lineup.js';
import { createCinematicCamera, createDevCamera } from './camera.js';
import { checkContinuity, checkProximity, createOverlay } from './debug.js';

// ---------------------------------------------------------------- renderer & scene

const container = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
let pixelRatio = Math.min(window.devicePixelRatio, SETTINGS.maxPixelRatio);
renderer.setPixelRatio(pixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = SETTINGS.shadows;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.3, 4000);

const materials = createMaterials();
const ctx = {
  scene,
  renderer,
  camera,
  materials,
  buckets: { solid: new Bucket('static'), foliage: new Bucket('foliage'), glow: new Bucket('windows') },
};

// ---------------------------------------------------------------- world

const sky = createSky(ctx);
const terrain = createTerrain(ctx);
const castle = createCastle(ctx);
const village = createVillage(ctx);
createNature(ctx);
const water = createWater(ctx);
const clouds = createClouds(ctx);
const windmill = createWindmill(ctx);
const effects = createEffects(ctx, {
  smoke: [...castle.smoke, ...village.chimneys],
  flags: castle.flags,
  banners: castle.banners,
  torches: castle.torches,
  lanterns: village.lanterns,
  coals: castle.coals,
  ovens: village.ovens,
  fireflyZones: [
    { x: POND.x, z: POND.z, r: 5, y: POND.level },
    { x: SPRING.x, z: SPRING.z, r: 4, y: groundHeight(SPRING.x + 3, SPRING.z) },
    { x: -2, z: 30, r: 4, y: groundHeight(-2, 30) },
    { x: 8, z: -24, r: 6, y: groundHeight(8, -24) },
  ],
});
const actors = createActors(ctx, { castle, village, effects });
if (new URLSearchParams(window.location.search).has('lineup')) createLineup(ctx);

// Static geometry is merged into a few big meshes once everything has been placed.
for (const [bucket, material] of [
  [ctx.buckets.solid, materials.solid],
  [ctx.buckets.foliage, materials.foliage],
  [ctx.buckets.glow, materials.glow],
]) {
  const mesh = bucket.build(material);
  if (mesh) scene.add(mesh);
}

// ---------------------------------------------------------------- camera

const cinematic = createCinematicCamera(camera);
let devCamera = null;
if (SETTINGS.camera !== 'cinematic') createDevCamera(SETTINGS.camera, camera, renderer).then((c) => (devCamera = c));

// ---------------------------------------------------------------- loop

/** Poses the entire world for loop time t ∈ [0, LOOP). Pure function of t. */
function update(t) {
  if (!devCamera) cinematic.update(t);
  else devCamera.update(t);
  const o = window.__camOverride;
  if (o) {
    camera.position.set(...o.p);
    camera.lookAt(...o.target);
  }
  sky.update(t, camera);
  materials.update(t, t / LOOP);
  terrain.update(t);
  water.update(t);
  clouds.update(t);
  windmill.update(t);
  effects.update(t);
  actors.update(t, camera);
}

let frozen = SETTINGS.freeze;
const start = performance.now();
const loopTime = (now) => (frozen !== null ? mod(frozen, LOOP) : mod(((now - start) / 1000) * SETTINGS.speed + SETTINGS.startTime, LOOP));
const overlay = SETTINGS.debug ? createOverlay(renderer) : null;

// Drop the resolution a notch if the device cannot keep up (never raise it again).
let slowFrames = 0;
let lastFrame = performance.now();
function adapt(now) {
  const dtMs = now - lastFrame;
  lastFrame = now;
  if (dtMs > 26 && dtMs < 250) slowFrames++;
  else slowFrames = Math.max(0, slowFrames - 1);
  if (slowFrames > 90 && pixelRatio > 1) {
    pixelRatio = Math.max(1, pixelRatio - 0.25);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    slowFrames = 0;
  }
}

renderer.setAnimationLoop((now) => {
  const t = loopTime(now);
  update(t);
  renderer.render(scene, camera);
  overlay?.update(t);
  if (frozen === null) adapt(now);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---------------------------------------------------------------- test hooks

window.__village = {
  scene,
  camera,
  renderer,
  actors: actors.count,
  setTime(t) {
    frozen = t;
    update(mod(t, LOOP));
    renderer.render(scene, camera);
  },
  info: () => renderer.info,
  checkContinuity: (opts) => checkContinuity(scene, (t) => update(t), opts),
  checkProximity: (opts) => checkProximity(scene, (t) => update(t), opts),
};
