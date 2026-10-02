import * as THREE from 'three';
import { piece } from '../core/geo.js';
import { cyclePhase, rng, smoothstep, TAU } from '../core/math.js';
import { LOOP } from '../config.js';
import { env } from './sky.js';
import { POND, RIVERS, riverLevel, SPRING } from './layout.js';
import { ParticlePool } from './effects.js';

// Stylised water: pond and spring surfaces, streams that flow to the rim, and
// waterfalls that pour off the island into the sea of clouds below. All scrolling
// patterns advance by whole cycles per loop so the water flows seamlessly forever.

const WATER_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorld;
#include <common>
#include <fog_pars_vertex>
void main() {
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xyz;
  vec4 mvPosition = viewMatrix * wp;
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`;

const WATER_FRAG = /* glsl */ `
uniform float uPhase;
uniform float uFlow;
uniform float uOpacity;
uniform vec3 uDeep;
uniform vec3 uShallow;
uniform vec3 uFoam;
uniform vec3 uLight;
varying vec2 vUv;
varying vec3 vWorld;
#include <common>
#include <fog_pars_fragment>
void main() {
  float a = uPhase * 6.2831853;
  vec2 p = vWorld.xz;
  float r1 = sin(p.x * 1.7 + p.y * 0.9 + a * 9.0);
  float r2 = sin(-p.x * 1.1 + p.y * 1.9 - a * 13.0);
  float r3 = sin(p.x * 0.6 - p.y * 2.3 + a * 7.0);
  float rip = r1 * r2 + 0.5 * r3;
  vec3 col = mix(uDeep, uShallow, 0.55 + 0.16 * rip);
  if (uFlow > 0.5) {
    float lane = floor(vUv.x * 5.0);
    float h = fract(sin(lane * 91.7 + 1.3) * 4375.85);
    float st = fract(vUv.y * (0.55 + 0.3 * h) - uPhase * 48.0 + h);
    float streak = smoothstep(0.0, 0.08, st) * smoothstep(0.4, 0.12, st);
    col = mix(col, uFoam, streak * 0.32 * (0.35 + 0.65 * sin(vUv.x * 3.14159)));
    col = mix(col, uFoam, smoothstep(0.36, 0.5, abs(vUv.x - 0.5)) * 0.35);
  }
  col += uFoam * smoothstep(0.86, 1.0, rip) * 0.18;
  col *= uLight;
  gl_FragColor = vec4(col, uOpacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}`;

const FALL_FRAG = /* glsl */ `
uniform float uPhase;
uniform vec3 uDeep;
uniform vec3 uShallow;
uniform vec3 uFoam;
uniform vec3 uLight;
varying vec2 vUv;
varying vec3 vWorld;
#include <common>
#include <fog_pars_fragment>
void main() {
  float v = vUv.y;
  float w = sqrt(v) * 7.0;
  float lane = floor(vUv.x * 7.0);
  float h = fract(sin(lane * 127.1 + 3.0) * 43758.5);
  float s1 = fract(w * (1.0 + 0.6 * h) - uPhase * 50.0 + h);
  float streak = smoothstep(0.0, 0.1, s1) * smoothstep(0.55, 0.18, s1);
  float s2 = fract(w * 2.6 - uPhase * 83.0 + h * 3.0);
  float fine = smoothstep(0.0, 0.05, s2) * smoothstep(0.3, 0.1, s2);
  vec3 col = mix(uDeep, uShallow, 0.3 + 0.45 * streak + 0.2 * fine);
  float edge = abs(vUv.x - 0.5) * 2.0;
  col = mix(col, uFoam, smoothstep(0.72, 1.0, edge) * 0.45);
  col = mix(col, uFoam, (1.0 - smoothstep(0.0, 0.07, v)) * 0.75);
  col = mix(col, uFoam, smoothstep(0.62, 1.0, v) * 0.75);
  col *= uLight;
  float alpha = 0.93 * (1.0 - smoothstep(0.8, 1.0, v)) * (1.0 - 0.55 * smoothstep(0.88, 1.0, edge));
  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}`;

function waterMaterial(flow, opacity, frag = WATER_FRAG) {
  return new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uPhase: { value: 0 },
        uFlow: { value: flow },
        uOpacity: { value: opacity },
        uDeep: { value: new THREE.Color('#2f93bf') },
        uShallow: { value: new THREE.Color('#62c9e0') },
        uFoam: { value: new THREE.Color('#f2fdff') },
        uLight: { value: new THREE.Color(1, 1, 1) },
      },
    ]),
    vertexShader: WATER_VERT,
    fragmentShader: frag,
    transparent: true,
    depthWrite: false,
    side: frag === FALL_FRAG ? THREE.DoubleSide : THREE.FrontSide,
    fog: true,
  });
}

/** Ribbon along a horizontal curve: uv.x across, uv.y = distance along (world units). */
function riverRibbon(rv) {
  const pts = rv.pts.map(([x, z]) => new THREE.Vector3(x, 0, z));
  // extend the start slightly back into the pond / spring so they overlap
  const d0 = new THREE.Vector3().subVectors(pts[0], pts[1]).normalize();
  pts.unshift(pts[0].clone().addScaledVector(d0, 1.2));
  const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
  const len = curve.getLength();
  const steps = Math.max(8, Math.round(len / 0.35));
  const half = rv.width * 0.48;
  const pos = [];
  const uv = [];
  const idx = [];
  const tan = new THREE.Vector3();
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const p = curve.getPointAt(u);
    curve.getTangentAt(u, tan);
    const nx = -tan.z;
    const nz = tan.x;
    const s = Math.max(0, (u * len - 1.2) / (len - 1.2));
    const y = riverLevel(rv, s) + 0.01;
    pos.push(p.x + nx * half, y, p.z + nz * half, p.x - nx * half, y, p.z - nz * half);
    uv.push(0, u * len, 1, u * len);
    if (i < steps) {
      const a = i * 2;
      idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  // make sure faces point up
  geo.computeVertexNormals();
  if (geo.attributes.normal.getY(0) < 0) {
    for (let i = 0; i < idx.length; i += 3) [idx[i + 1], idx[i + 2]] = [idx[i + 2], idx[i + 1]];
    geo.setIndex(idx);
  }
  return geo;
}

/** A sheet of water falling off the rim: projectile arc, slightly convex, widening. */
function waterfallGeometry(rv) {
  const [mx, mz] = rv.mouth;
  const [dx, dz] = rv.dir;
  const top = riverLevel(rv, 1) + 0.01;
  const drop = 24 + top;
  const T = Math.sqrt((2 * drop) / 9.8);
  const v0 = 1.5;
  const rows = 48;
  const cols = 6;
  const w0 = rv.width * 0.48;
  const pos = [];
  const uv = [];
  const idx = [];
  for (let i = 0; i <= rows; i++) {
    const v = i / rows;
    const time = T * Math.pow(v, 0.85);
    const out = v0 * time;
    const y = top - 0.5 * 9.8 * time * time;
    const half = w0 * (1 + 0.9 * v);
    for (let j = 0; j <= cols; j++) {
      const u = j / cols;
      const across = (u - 0.5) * 2 * half;
      const bulge = (1 - (2 * u - 1) ** 2) * 0.18 * (0.3 + v);
      pos.push(mx + dx * (out + bulge) - dz * across, y, mz + dz * (out + bulge) + dx * across);
      uv.push(u, v);
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const a = i * (cols + 1) + j;
      const b = a + cols + 1;
      idx.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const bottom = new THREE.Vector3(mx + dx * v0 * T, top - drop, mz + dz * v0 * T);
  return { geo, bottom, top: new THREE.Vector3(mx + dx * 0.2, top, mz + dz * 0.2) };
}

export function createWater(ctx) {
  const { scene } = ctx;
  const mats = [];
  const rand = rng(515);

  const still = waterMaterial(0, 0.86);
  const flowing = waterMaterial(1, 0.9);
  const falling = waterMaterial(0, 1, FALL_FRAG);
  mats.push(still, flowing, falling);

  for (const w of [POND, SPRING]) {
    const geo = new THREE.CircleGeometry(w.r + 0.35, 40);
    geo.rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(geo, still);
    m.position.set(w.x, w.level, w.z);
    m.name = 'pond';
    m.renderOrder = 1;
    scene.add(m);
  }

  const mistSources = [];
  for (const rv of RIVERS) {
    const r = new THREE.Mesh(riverRibbon(rv), flowing);
    r.name = `river-${rv.id}`;
    r.renderOrder = 1;
    scene.add(r);
    const fall = waterfallGeometry(rv);
    const f = new THREE.Mesh(fall.geo, falling);
    f.name = `waterfall-${rv.id}`;
    f.renderOrder = 2;
    scene.add(f);
    mistSources.push({ ...fall, seed: rand.next(), width: rv.width });
  }

  // Mist where each waterfall meets the clouds, and foam at the lip.
  const MIST = 9;
  const FOAM = 4;
  const mistGeo = piece(new THREE.IcosahedronGeometry(1, 1), '#ffffff', null, { jitter: 0.03 });
  const mist = new ParticlePool(mistGeo, ctx.materials.cloud, mistSources.length * (MIST + FOAM));
  mist.mesh.name = 'mist';
  scene.add(mist.mesh);

  const update = (t) => {
    const phase = t / LOOP;
    for (const m of mats) {
      m.uniforms.uPhase.value = phase;
      m.uniforms.uLight.value.copy(env.ambient).multiplyScalar(1.05);
    }
    mist.begin();
    for (const s of mistSources) {
      for (let k = 0; k < MIST; k++) {
        const age = cyclePhase(t, 6, (k * 6) / MIST + s.seed * 6);
        const a = k * 2.4 + s.seed * TAU;
        const r = (0.6 + age * 2.4) * (0.7 + s.width * 0.2);
        const scale = (0.6 + 1.9 * smoothstep(0, 0.6, age)) * (1 - smoothstep(0.65, 1, age)) * smoothstep(0, 0.12, age) * (0.7 + 0.25 * s.width);
        mist.push(s.bottom.x + Math.cos(a) * r, s.bottom.y + 0.8 + age * 3.2, s.bottom.z + Math.sin(a) * r, scale, age, a, 0, scale * 0.75);
      }
      for (let k = 0; k < FOAM; k++) {
        const a = k * 1.7 + s.seed * 5;
        const pulse = 0.22 + 0.06 * Math.sin(TAU * (30 * phase + k * 0.25 + s.seed));
        mist.push(s.top.x + Math.cos(a) * 0.35 * s.width, s.top.y - 0.15 - k * 0.12, s.top.z + Math.sin(a) * 0.35 * s.width, pulse * s.width, a, a, 0);
      }
    }
    mist.end();
  };

  return { update, falls: mistSources };
}

