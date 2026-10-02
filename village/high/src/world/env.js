// Lighting + a gentle day → golden-hour → day cycle that closes exactly on the loop.
import * as THREE from 'three';
import { TAU, LOOP, smooth } from '../core/util.js';

const DAY = {
  skyTop: new THREE.Color('#4f9fe0'),
  skyHorizon: new THREE.Color('#d8eef8'),
  skyBottom: new THREE.Color('#a8d0ec'),
  sun: new THREE.Color('#fff0d4'),
  hemiSky: new THREE.Color('#cfe8ff'),
  hemiGround: new THREE.Color('#8f7d58'),
  fog: new THREE.Color('#cfe6f4'),
};
const DUSK = {
  skyTop: new THREE.Color('#5a6fb0'),
  skyHorizon: new THREE.Color('#ffc59a'),
  skyBottom: new THREE.Color('#e7a38a'),
  sun: new THREE.Color('#ffa463'),
  hemiSky: new THREE.Color('#b9a6d6'),
  hemiGround: new THREE.Color('#6a5040'),
  fog: new THREE.Color('#f2c6a6'),
};

export function buildEnvironment(scene, sky) {
  const hemi = new THREE.HemisphereLight(DAY.hemiSky, DAY.hemiGround, 1.25);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(DAY.sun, 2.8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  const sc = sun.shadow.camera;
  sc.left = -62;
  sc.right = 62;
  sc.top = 62;
  sc.bottom = -62;
  sc.near = 10;
  sc.far = 320;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.04;
  sun.shadow.radius = 3;
  sun.target.position.set(0, 0, 4);
  scene.add(sun, sun.target);

  scene.fog = new THREE.Fog(DAY.fog, 160, 520);

  const tmp = new THREE.Color();
  const dir = new THREE.Vector3();
  const state = { dusk: 0, glow: 0 };

  return {
    state,
    update(t) {
      // 0 at loop start/end, 1 at mid-loop. Squared so most of the loop is bright day.
      const k = 0.5 - 0.5 * Math.cos((TAU * t) / LOOP);
      const dusk = smooth(k) * smooth(k);
      state.dusk = dusk;
      state.glow = smooth((dusk - 0.35) / 0.55);

      const elev = THREE.MathUtils.degToRad(58 - 42 * dusk);
      const azim = THREE.MathUtils.degToRad(35 - 85 * dusk);
      dir.set(Math.cos(elev) * Math.sin(azim), Math.sin(elev), Math.cos(elev) * Math.cos(azim));
      sun.position.copy(sun.target.position).addScaledVector(dir, 160);
      sun.color.copy(DAY.sun).lerp(DUSK.sun, dusk);
      sun.intensity = 2.8 - 0.9 * dusk;

      hemi.color.copy(DAY.hemiSky).lerp(DUSK.hemiSky, dusk);
      hemi.groundColor.copy(DAY.hemiGround).lerp(DUSK.hemiGround, dusk);
      hemi.intensity = 1.25 - 0.35 * dusk;

      scene.fog.color.copy(tmp.copy(DAY.fog).lerp(DUSK.fog, dusk));
      const u = sky.uniforms;
      u.top.value.copy(DAY.skyTop).lerp(DUSK.skyTop, dusk);
      u.horizon.value.copy(DAY.skyHorizon).lerp(DUSK.skyHorizon, dusk);
      u.bottom.value.copy(DAY.skyBottom).lerp(DUSK.skyBottom, dusk);
      u.sunDir.value.copy(dir);
      u.sunColor.value.copy(sun.color);
    },
  };
}
