// Sky dome, fog, sun + hemisphere light, and the optional day cycle.
// The cycle is a closed curve in "how late is it" (0 = noon .. 1 = dusk) so it
// returns exactly to its starting state at the end of each loop.

import * as THREE from 'three';
import { LOOP, TAU, lerp, smooth, clamp } from '../core/loop.js';

const KEYS = [
  // k,   sun colour, sun I, hemi sky, hemi ground, hemi I, sky top, horizon, below, fog, elevation°, azimuth°
  { k: 0, sun: 0xfff0d8, sunI: 2.9, hs: 0xcfe6ff, hg: 0x8f7d5c, hI: 1.2, top: 0x3d8ef0, hor: 0xb9dcf7, low: 0x9cc8ee, fog: 0xb4d6f2, el: 58, az: -38 },
  { k: 0.55, sun: 0xffc98a, sunI: 2.5, hs: 0xf3d2b8, hg: 0x7c6248, hI: 1.0, top: 0x5a86d6, hor: 0xffd2a6, low: 0xc9c2d8, fog: 0xe8cdb8, el: 26, az: -62 },
  { k: 1, sun: 0xff8c5a, sunI: 1.5, hs: 0x9d8fc2, hg: 0x5a4652, hI: 0.75, top: 0x34477f, hor: 0xffa070, low: 0xa996b4, fog: 0xc59a9c, el: 9, az: -80 },
];

/** Day-cycle modes: 0 = off (eternal noon), 1 = subtle golden hour, 2 = full dusk. */
export const DAY_MODES = ['off', 'golden hour', 'dusk'];
const MODE_STRENGTH = [0, 0.55, 1];

const _a = new THREE.Color();
const _b = new THREE.Color();

function sampleKeys(k) {
  let i = 0;
  while (i < KEYS.length - 2 && k > KEYS[i + 1].k) i++;
  const A = KEYS[i];
  const B = KEYS[i + 1];
  const f = smooth((k - A.k) / (B.k - A.k));
  const col = (name, out) => out.copy(_a.set(A[name])).lerp(_b.set(B[name]), f);
  return { A, B, f, col };
}

export function buildSky(scene) {
  const skyUniforms = {
    uTop: { value: new THREE.Color() },
    uHorizon: { value: new THREE.Color() },
    uLow: { value: new THREE.Color() },
    uSunDir: { value: new THREE.Vector3(0, 1, 0) },
    uSunColor: { value: new THREE.Color() },
  };
  const skyMat = new THREE.ShaderMaterial({
    uniforms: skyUniforms,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = p.xyww;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uTop, uHorizon, uLow, uSunDir, uSunColor;
      varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 col = h > 0.0
          ? mix(uHorizon, uTop, pow(smoothstep(0.0, 0.75, h), 0.8))
          : mix(uHorizon, uLow, smoothstep(0.0, -0.25, h));
        float s = max(dot(d, uSunDir), 0.0);
        col += uSunColor * (pow(s, 600.0) * 1.6 + pow(s, 12.0) * 0.22);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1500, 32, 16), skyMat);
  sky.renderOrder = -10;
  sky.frustumCulled = false;
  scene.add(sky);

  scene.fog = new THREE.Fog(0xb4d6f2, 160, 760);
  scene.background = null;

  const hemi = new THREE.HemisphereLight(0xcfe6ff, 0x8f7d5c, 1.2);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xfff0d8, 2.8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const S = 50;
  Object.assign(sun.shadow.camera, { left: -S, right: S, top: S, bottom: -S, near: 10, far: 260 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.04;
  sun.shadow.radius = 2;
  scene.add(sun);
  scene.add(sun.target);
  sun.target.position.set(0, -4, 4);

  const state = { mode: 1, dusk: 0 };

  function update(t) {
    const strength = MODE_STRENGTH[state.mode];
    // 0 at the loop start/end, peaking mid-loop; flat shoulders read as "lingering light"
    const wave = 0.5 - 0.5 * Math.cos((TAU * t) / LOOP);
    const k = clamp(smooth(wave) * strength);
    state.dusk = k;

    const { A, B, f, col } = sampleKeys(k);
    col('sun', sun.color);
    sun.intensity = lerp(A.sunI, B.sunI, f);
    col('hs', hemi.color);
    col('hg', hemi.groundColor);
    hemi.intensity = lerp(A.hI, B.hI, f);
    col('top', skyUniforms.uTop.value);
    col('hor', skyUniforms.uHorizon.value);
    col('low', skyUniforms.uLow.value);
    col('fog', scene.fog.color);
    skyUniforms.uSunColor.value.copy(sun.color);

    const el = THREE.MathUtils.degToRad(lerp(A.el, B.el, f));
    const az = THREE.MathUtils.degToRad(lerp(A.az, B.az, f));
    const dir = new THREE.Vector3(Math.cos(el) * Math.sin(az), Math.sin(el), Math.cos(el) * Math.cos(az));
    skyUniforms.uSunDir.value.copy(dir);
    sun.position.copy(sun.target.position).addScaledVector(dir, 120);
  }

  return {
    update,
    state,
    sun,
    hemi,
    cycleMode() {
      state.mode = (state.mode + 1) % DAY_MODES.length;
      return DAY_MODES[state.mode];
    },
  };
}
