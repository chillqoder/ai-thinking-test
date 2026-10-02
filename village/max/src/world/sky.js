import * as THREE from 'three';
import { CyclicTrack } from '../core/track.js';
import { LOOP, SETTINGS } from '../config.js';

// A subtle day → golden hour → moonlit night → dawn cycle that lasts exactly one loop.
// All values are keyed on the loop and interpolated with periodic splines, so the
// last frame flows seamlessly into the first one.
const KEYS = [
  { t: 0, sunAz: 40, sunEl: 34, lAz: 40, lEl: 34, lI: 2.7, lCol: '#fff0d8', hemiI: 1.25, hSky: '#d8ecff', hGround: '#b39270', sky: '#5ea9e8', hor: '#cfe7f7', bot: '#e7f0f4', fog: '#cfe4f1', night: 0, gold: 0.1 },
  { t: 12, sunAz: 70, sunEl: 50, lAz: 70, lEl: 50, lI: 3.0, lCol: '#fff4e2', hemiI: 1.3, hSky: '#d8ecff', hGround: '#b39270', sky: '#4d9fe6', hor: '#cde6f8', bot: '#eaf3f8', fog: '#d2e7f4', night: 0, gold: 0 },
  { t: 24, sunAz: 112, sunEl: 48, lAz: 112, lEl: 48, lI: 3.0, lCol: '#fff1dc', hemiI: 1.3, hSky: '#dcecfb', hGround: '#b59372', sky: '#539fe0', hor: '#d6e8f2', bot: '#eef2f2', fog: '#d6e8f2', night: 0, gold: 0.05 },
  { t: 31, sunAz: 148, sunEl: 26, lAz: 148, lEl: 26, lI: 2.7, lCol: '#ffd9a0', hemiI: 1.1, hSky: '#f3dcc0', hGround: '#a8805e', sky: '#6b9bd8', hor: '#f6d7b0', bot: '#f3e2cc', fog: '#efd9bd', night: 0, gold: 0.6 },
  { t: 36, sunAz: 172, sunEl: 8, lAz: 172, lEl: 10, lI: 1.8, lCol: '#ffae6a', hemiI: 0.85, hSky: '#ffc9a0', hGround: '#94664f', sky: '#7d86c4', hor: '#ffb07a', bot: '#f1b59a', fog: '#e9b292', night: 0.15, gold: 1 },
  { t: 39, sunAz: 185, sunEl: -4, lAz: 192, lEl: 16, lI: 0.55, lCol: '#e8907e', hemiI: 0.78, hSky: '#b094be', hGround: '#6a5a6e', sky: '#45549a', hor: '#cf8790', bot: '#9585a6', fog: '#857aa0', night: 0.55, gold: 0.5 },
  { t: 42.5, sunAz: 220, sunEl: -30, lAz: 235, lEl: 42, lI: 0.95, lCol: '#a9bdff', hemiI: 0.9, hSky: '#7085c4', hGround: '#4a5574', sky: '#1b2b58', hor: '#405690', bot: '#3c4c7e', fog: '#374a78', night: 1, gold: 0 },
  { t: 48, sunAz: 290, sunEl: -36, lAz: 265, lEl: 48, lI: 0.95, lCol: '#a9bdff', hemiI: 0.9, hSky: '#7085c4', hGround: '#4a5574', sky: '#1b2b58', hor: '#405690', bot: '#3c4c7e', fog: '#374a78', night: 1, gold: 0 },
  { t: 52, sunAz: 345, sunEl: -6, lAz: 330, lEl: 15, lI: 0.55, lCol: '#f0a6a0', hemiI: 0.8, hSky: '#c4a6c6', hGround: '#6a5a6e', sky: '#56669f', hor: '#f0aaa4', bot: '#b8a0b6', fog: '#ad98b0', night: 0.5, gold: 0.4 },
  { t: 55.5, sunAz: 8, sunEl: 10, lAz: 8, lEl: 12, lI: 1.7, lCol: '#ffc58a', hemiI: 0.95, hSky: '#ffd8b0', hGround: '#a07a5c', sky: '#6f9ad6', hor: '#ffd2a6', bot: '#f6dcc6', fog: '#f0d6bd', night: 0.1, gold: 0.8 },
];

const SCALARS = ['sunAz', 'sunEl', 'lAz', 'lEl', 'lI', 'hemiI', 'night', 'gold'];
const COLORS = ['lCol', 'hSky', 'hGround', 'sky', 'hor', 'bot', 'fog'];
const WRAPS = { sunAz: 360, lAz: 360 };

const tracks = {};
for (const name of SCALARS) tracks[name] = new CyclicTrack(LOOP, KEYS.map((k) => [k.t, k[name]]), WRAPS[name] ?? 0);
for (const name of COLORS) {
  const cols = KEYS.map((k) => new THREE.Color(k[name]));
  tracks[name] = ['r', 'g', 'b'].map((ch) => new CyclicTrack(LOOP, KEYS.map((k, i) => [k.t, cols[i][ch]])));
}

const DEG = Math.PI / 180;
const dirFrom = (az, el, out) => out.set(Math.cos(el * DEG) * Math.cos(az * DEG), Math.sin(el * DEG), Math.cos(el * DEG) * Math.sin(az * DEG));

/** Environment state shared with every system that reacts to the time of day. */
export const env = {
  night: 0,
  gold: 0,
  sunDir: new THREE.Vector3(),
  lightDir: new THREE.Vector3(),
  lightColor: new THREE.Color(),
  lightIntensity: 1,
  ambient: new THREE.Color(1, 1, 1),
  fog: new THREE.Color(),
};

const SKY_VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * p;
  gl_Position.z = gl_Position.w; // keep the dome at the far plane
}`;

const SKY_FRAG = /* glsl */ `
uniform vec3 uTop;
uniform vec3 uHorizon;
uniform vec3 uBottom;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uMoonDir;
uniform float uSunVis;
uniform float uMoonVis;
uniform float uStars;
uniform float uPhase;
varying vec3 vDir;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

void main() {
  vec3 d = normalize(vDir);
  float h = d.y;
  vec3 col = h > 0.0
    ? mix(uHorizon, uTop, pow(smoothstep(0.0, 1.0, h), 0.6))
    : mix(uHorizon, uBottom, pow(smoothstep(0.0, -0.6, h), 0.7));

  float sd = max(dot(d, uSunDir), 0.0);
  col += uSunColor * (pow(sd, 5.0) * 0.22 + pow(sd, 48.0) * 0.45) * uSunVis;
  col = mix(col, uSunColor * 1.4 + vec3(0.35), smoothstep(0.99925, 0.99955, sd) * uSunVis);

  float md = max(dot(d, uMoonDir), 0.0);
  col += vec3(0.45, 0.55, 0.85) * pow(md, 24.0) * 0.18 * uMoonVis;
  col = mix(col, vec3(0.93, 0.95, 1.0), smoothstep(0.99935, 0.99958, md) * uMoonVis);

  if (uStars > 0.001 && h > 0.0) {
    vec3 p = d * 190.0;
    vec3 c = floor(p);
    float n = hash(c);
    float star = step(0.9965, n) * smoothstep(0.42, 0.05, length(fract(p) - 0.5));
    float tw = 0.65 + 0.35 * sin(6.2831853 * (uPhase * 23.0 + n * 40.0));
    col += vec3(1.0, 0.97, 0.9) * star * tw * uStars * smoothstep(0.02, 0.3, h);
  }

  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export function createSky(ctx) {
  const { scene } = ctx;

  const uniforms = {
    uTop: { value: new THREE.Color() },
    uHorizon: { value: new THREE.Color() },
    uBottom: { value: new THREE.Color() },
    uSunDir: { value: new THREE.Vector3() },
    uSunColor: { value: new THREE.Color('#ffd9a8') },
    uMoonDir: { value: dirFrom(250, 38, new THREE.Vector3()) },
    uSunVis: { value: 1 },
    uMoonVis: { value: 0 },
    uStars: { value: 0 },
    uPhase: { value: 0 },
  };
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(1500, 48, 24),
    new THREE.ShaderMaterial({ uniforms, vertexShader: SKY_VERT, fragmentShader: SKY_FRAG, side: THREE.BackSide, depthWrite: false, fog: false }),
  );
  dome.name = 'sky';
  dome.renderOrder = -10;
  dome.frustumCulled = false;
  scene.add(dome);

  const hemi = new THREE.HemisphereLight('#d8ecff', '#b39270', 1.2);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight('#fff0d8', 2.8);
  sun.castShadow = SETTINGS.shadows;
  sun.shadow.mapSize.set(SETTINGS.shadowMapSize, SETTINGS.shadowMapSize);
  const S = 44;
  Object.assign(sun.shadow.camera, { left: -S, right: S, top: S, bottom: -S, near: 1, far: 220 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.035;
  sun.shadow.radius = 2.5;
  sun.target.position.set(0, 2, -2);
  scene.add(sun, sun.target);

  // Light bouncing up from the sunlit sea of clouds keeps the island's underside readable.
  const bounce = new THREE.DirectionalLight('#fff4e6', 0.6);
  bounce.position.set(-8, -60, 14);
  bounce.target.position.set(0, 0, 0);
  scene.add(bounce, bounce.target);

  scene.fog = new THREE.Fog('#cfe4f1', 90, 360);

  const tmpColor = new THREE.Color();
  const sampleColor = (name, t, out) => out.setRGB(tracks[name][0].sample(t), tracks[name][1].sample(t), tracks[name][2].sample(t));

  function update(t, camera) {
    const tt = SETTINGS.dayNight ? t : 8;
    env.night = Math.max(0, tracks.night.sample(tt));
    env.gold = Math.max(0, tracks.gold.sample(tt));
    dirFrom(tracks.sunAz.sample(tt), tracks.sunEl.sample(tt), env.sunDir);
    dirFrom(tracks.lAz.sample(tt), tracks.lEl.sample(tt), env.lightDir);

    sampleColor('lCol', tt, env.lightColor);
    env.lightIntensity = tracks.lI.sample(tt);
    sun.color.copy(env.lightColor);
    sun.intensity = env.lightIntensity;
    sun.position.copy(sun.target.position).addScaledVector(env.lightDir, 110);

    sampleColor('hSky', tt, hemi.color);
    sampleColor('hGround', tt, hemi.groundColor);
    hemi.intensity = tracks.hemiI.sample(tt);

    sampleColor('sky', tt, uniforms.uTop.value);
    sampleColor('hor', tt, uniforms.uHorizon.value);
    sampleColor('bot', tt, uniforms.uBottom.value);
    sampleColor('fog', tt, env.fog);
    scene.fog.color.copy(env.fog);
    uniforms.uSunDir.value.copy(env.sunDir);
    uniforms.uSunColor.value.copy(tmpColor.set('#ffe2b8').lerp(env.lightColor, 0.5));
    uniforms.uSunVis.value = THREE.MathUtils.smoothstep(env.sunDir.y, -0.08, 0.04);
    uniforms.uMoonVis.value = env.night;
    uniforms.uStars.value = THREE.MathUtils.smoothstep(env.night, 0.35, 1.0);
    uniforms.uPhase.value = tt / LOOP;

    // Approximate light reaching unlit (custom-shaded) surfaces such as water.
    env.ambient
      .copy(hemi.color)
      .multiplyScalar(hemi.intensity * 0.55)
      .add(tmpColor.copy(env.lightColor).multiplyScalar(env.lightIntensity * 0.16));

    bounce.color.copy(env.fog).lerp(tmpColor.set('#ffffff'), 0.4);
    bounce.intensity = 0.55 + 0.25 * (1 - env.night);

    dome.position.copy(camera.position);
  }

  return { update, sun, hemi };
}
