// Water: streams, waterfalls spilling into the clouds, the pond, mist and ripples.
// All flow patterns scroll by whole noise periods per loop, so they are seamless.

import * as THREE from 'three';
import { Builder, paint, ico, transform } from '../core/geo.js';
import { flatMat } from '../core/materials.js';
import { LOOP, TAU, phase, osc, easeOut, smooth, clamp } from '../core/loop.js';
import { rng } from '../core/random.js';
import { heightAt, rimRadius } from './island.js';
import { STREAMS, POND, CLIFF_FALL } from './layout.js';

const NOISE_PERIOD = 16;

const flowVertex = /* glsl */ `
  varying vec2 vUv;
  #include <fog_pars_vertex>
  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }`;

const flowFragment = /* glsl */ `
  uniform float uScrollA, uScrollB, uRows, uCols, uOpacity, uFadeStart, uTopFoam, uEdge;
  uniform vec3 uDeep, uLight, uFoam;
  varying vec2 vUv;
  #include <fog_pars_fragment>
  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  // value noise, periodic in y with period P (so whole-period scrolling is seamless)
  float noiseP(vec2 p, float P) {
    vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
    float y0 = mod(i.y, P), y1 = mod(i.y + 1.0, P);
    float a = hash(vec2(i.x, y0)), b = hash(vec2(i.x + 1.0, y0));
    float c = hash(vec2(i.x, y1)), d = hash(vec2(i.x + 1.0, y1));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  void main() {
    float P = ${NOISE_PERIOD.toFixed(1)};
    float n1 = noiseP(vec2(vUv.x * uCols, vUv.y * uRows - uScrollA), P);
    float n2 = noiseP(vec2(vUv.x * uCols * 2.3 + 7.0, vUv.y * uRows * 1.7 - uScrollB), P);
    float s = n1 * 0.62 + n2 * 0.38;
    vec3 col = mix(uDeep, uLight, smoothstep(0.25, 0.75, s));
    float foam = smoothstep(0.6, 0.8, s);
    foam = max(foam, (1.0 - smoothstep(0.0, uTopFoam, vUv.y)) * 0.85);
    col = mix(col, uFoam, foam);
    float edge = smoothstep(0.0, uEdge, vUv.x) * smoothstep(1.0, 1.0 - uEdge, vUv.x);
    float fade = 1.0 - smoothstep(uFadeStart, 1.0, vUv.y);
    float alpha = uOpacity * edge * fade * mix(0.82, 1.0, foam);
    gl_FragColor = vec4(col, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }`;

/**
 * Scrolling-noise water material. `cyclesA/B` are whole noise periods scrolled
 * per loop (integers keep the loop seamless).
 */
export function makeFlowMaterial({
  rows = 4,
  cols = 9,
  cyclesA = 3,
  cyclesB = 5,
  opacity = 0.9,
  fadeStart = 2,
  topFoam = 0.0001,
  edge = 0.12,
  deep = 0x3ea8d8,
  light = 0x8fdcf5,
  foam = 0xf2fdff,
} = {}) {
  const mat = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uScrollA: { value: 0 },
        uScrollB: { value: 0 },
        uRows: { value: rows },
        uCols: { value: cols },
        uOpacity: { value: opacity },
        uFadeStart: { value: fadeStart },
        uTopFoam: { value: topFoam },
        uEdge: { value: edge },
        uDeep: { value: new THREE.Color(deep) },
        uLight: { value: new THREE.Color(light) },
        uFoam: { value: new THREE.Color(foam) },
      },
    ]),
    vertexShader: flowVertex,
    fragmentShader: flowFragment,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    fog: true,
  });
  mat.userData.update = (t) => {
    mat.uniforms.uScrollA.value = (t / LOOP) * cyclesA * NOISE_PERIOD;
    mat.uniforms.uScrollB.value = (t / LOOP) * cyclesB * NOISE_PERIOD;
  };
  return mat;
}

// ---------------------------------------------------------------------------

/** Ribbon geometry along a list of centre points (Vector3) with side vectors and widths. */
function ribbon(centers, sides, widths, { across = 6, bulge = 0, normals = null } = {}) {
  const N = centers.length;
  const pos = [];
  const uv = [];
  const idx = [];
  let total = 0;
  const along = [0];
  for (let i = 1; i < N; i++) {
    total += centers[i].distanceTo(centers[i - 1]);
    along.push(total);
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j <= across; j++) {
      const u = j / across;
      const p = centers[i].clone().addScaledVector(sides[i], (u - 0.5) * 2 * widths[i]);
      if (bulge && normals) p.addScaledVector(normals[i], Math.sin(Math.PI * u) * bulge * widths[i]);
      pos.push(p.x, p.y, p.z);
      uv.push(u, along[i] / total);
    }
  }
  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < across; j++) {
      const a = i * (across + 1) + j;
      const b = a + across + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  g.userData.length = total;
  return g;
}

/** Resample a 2D polyline every `step` units. */
function resample(pts, step) {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i];
    const [bx, bz] = pts[i + 1];
    const L = Math.hypot(bx - ax, bz - az);
    const n = Math.max(1, Math.ceil(L / step));
    for (let k = 0; k < n; k++) out.push([ax + ((bx - ax) * k) / n, az + ((bz - az) * k) / n]);
  }
  out.push(pts[pts.length - 1]);
  return out;
}

const UP = new THREE.Vector3(0, 1, 0);

function buildStream(def, { startLevel = Infinity } = {}) {
  const pts = resample(def.pts, 0.6);
  const centers = [];
  let level = startLevel;
  let brink = null;
  for (const [x, z] of pts) {
    const R = rimRadius(Math.atan2(z, x));
    if (Math.hypot(x, z) > R - 0.4) {
      brink = new THREE.Vector3(x, level, z);
      break;
    }
    level = Math.min(level, heightAt(x, z) + 0.3);
    centers.push(new THREE.Vector3(x, level, z));
  }
  if (!brink) brink = centers[centers.length - 1].clone();
  centers.push(brink.clone());
  const sides = centers.map((c, i) => {
    const a = centers[Math.max(0, i - 1)];
    const b = centers[Math.min(centers.length - 1, i + 1)];
    const tan = b.clone().sub(a).setY(0).normalize();
    return new THREE.Vector3().crossVectors(tan, UP).normalize();
  });
  const widths = centers.map((_, i) => def.w * (i === 0 ? 1.1 : 1));
  const geom = ribbon(centers, sides, widths, { across: 4 });
  const mat = makeFlowMaterial({
    rows: geom.userData.length / 2.2,
    cols: 5,
    cyclesA: 4,
    cyclesB: 6,
    opacity: 0.9,
    edge: 0.18,
    deep: 0x3a9fcf,
    light: 0x7fd2f0,
  });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.renderOrder = 2;
  mesh.receiveShadow = true;
  const out = new THREE.Vector3(brink.x, 0, brink.z).normalize();
  return { mesh, mat, brink, out };
}

function buildFall(top, out, { width = 1.0, drop = 56, arc = 1 } = {}) {
  const ctrl = [
    top.clone().addScaledVector(out, -0.6),
    top.clone().addScaledVector(out, 0.5 * arc).add(new THREE.Vector3(0, -0.2, 0)),
    top.clone().addScaledVector(out, 1.5 * arc).add(new THREE.Vector3(0, -1.5, 0)),
    top.clone().addScaledVector(out, 2.3 * arc).add(new THREE.Vector3(0, -5, 0)),
    top.clone().addScaledVector(out, 2.9 * arc).add(new THREE.Vector3(0, -13, 0)),
    top.clone().addScaledVector(out, 3.3 * arc).add(new THREE.Vector3(0, -27, 0)),
    top.clone().addScaledVector(out, 3.5 * arc).add(new THREE.Vector3(0, -drop, 0)),
  ];
  const curve = new THREE.CatmullRomCurve3(ctrl, false, 'centripetal');
  const N = 64;
  const centers = [];
  const sides = [];
  const normals = [];
  const widths = [];
  const side = new THREE.Vector3().crossVectors(out, UP).normalize();
  for (let i = 0; i <= N; i++) {
    const s = i / N;
    const c = curve.getPointAt(s);
    const tan = curve.getTangentAt(s);
    centers.push(c);
    sides.push(side);
    normals.push(new THREE.Vector3().crossVectors(side, tan).normalize());
    widths.push(width * (1 + s * 0.9));
  }
  const geom = ribbon(centers, sides, widths, { across: 8, bulge: 0.35, normals });
  const mat = makeFlowMaterial({
    rows: geom.userData.length / 3.5,
    cols: 7,
    cyclesA: 9,
    cyclesB: 13,
    opacity: 0.93,
    fadeStart: 0.62,
    topFoam: 0.045,
    edge: 0.2,
    deep: 0x56b8e2,
    light: 0xa8e6fa,
  });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.renderOrder = 3;
  return { mesh, mat, bottom: centers[N], top };
}

// ---------------------------------------------------------------------------
// Ripples — expanding rings driven purely by an "age" in [0, 1].
// ---------------------------------------------------------------------------

const rippleGeom = new THREE.RingGeometry(0.82, 1, 28).rotateX(-Math.PI / 2);

export function makeRipple(parent, color = 0xffffff) {
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false });
  const mesh = new THREE.Mesh(rippleGeom, mat);
  mesh.renderOrder = 4;
  mesh.visible = false;
  parent.add(mesh);
  return {
    mesh,
    /** age ∈ [0,1] (outside → hidden); size = final radius; strength = peak opacity */
    set(x, y, z, age, size = 1, strength = 0.55) {
      if (age <= 0 || age >= 1) {
        mesh.visible = false;
        return;
      }
      mesh.visible = true;
      mesh.position.set(x, y, z);
      const r = 0.08 + easeOut(age) * size;
      mesh.scale.set(r, 1, r);
      mat.opacity = strength * (1 - age) * smooth(age * 6);
    },
  };
}

// ---------------------------------------------------------------------------

export function buildWater() {
  const group = new THREE.Group();
  group.name = 'water';
  const mats = [];
  const rand = rng(77);

  // pond surface
  const pond = new THREE.Mesh(
    new THREE.CircleGeometry(POND.r + 1.7, 48).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x4fb0d8, roughness: 0.12, metalness: 0.05, transparent: true, opacity: 0.86, emissive: 0x0d3b52, emissiveIntensity: 0.25 }),
  );
  pond.position.set(POND.x, POND.water, POND.z);
  pond.receiveShadow = true;
  pond.renderOrder = 1;
  group.add(pond);

  // lily pads
  const lily = new Builder(rand);
  for (let i = 0; i < 9; i++) {
    const a = rand() * TAU;
    const d = 1.5 + rand() * 2.6;
    const g = new THREE.CylinderGeometry(0.32 + rand() * 0.15, 0.32, 0.03, 9, 1, false, 0.3, TAU - 0.5);
    transform(g, { p: [POND.x + Math.cos(a) * d, POND.water + 0.02, POND.z + Math.sin(a) * d], r: [0, rand() * TAU, 0] });
    lily.push(paint(g, 0x5c9e3c, { jitter: 0.1, rand }));
    if (i % 3 === 0) {
      const f = ico(0.09, 0);
      transform(f, { p: [POND.x + Math.cos(a) * d + 0.08, POND.water + 0.08, POND.z + Math.sin(a) * d] });
      lily.push(paint(f, 0xf6b7d2, {}));
    }
  }
  group.add(lily.build(flatMat, { cast: false }));

  // streams + their waterfalls
  const falls = [];
  STREAMS.forEach((def, i) => {
    const s = buildStream(def, { startLevel: i === 0 ? POND.water + 0.01 : heightAt(def.pts[0][0], def.pts[0][1]) + 0.3 });
    group.add(s.mesh);
    mats.push(s.mat);
    const f = buildFall(s.brink, s.out, { width: def.w * 1.05 });
    group.add(f.mesh);
    mats.push(f.mat);
    falls.push(f);
  });

  // spring source: a little rock ring around the stream head
  {
    const b = new Builder(rand);
    const [sx, sz] = STREAMS[1].pts[0];
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * TAU + 0.4;
      const g = ico(0.35 + rand() * 0.3, 0);
      const x = sx + Math.cos(a) * 1.3;
      const z = sz + Math.sin(a) * 1.3;
      if (i === 4) continue; // gap where the stream leaves
      transform(g, { p: [x, heightAt(x, z) + 0.1, z], r: [rand(), rand(), rand()], s: [1, 0.75, 1] });
      b.push(paint(g, 0x9c9184, { jitter: 0.08, rand }));
    }
    group.add(b.build(flatMat));
  }

  // cliff waterfall gushing from a cave under the south-west rim
  {
    const a = CLIFF_FALL.angle;
    const out = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const R = rimRadius(a);
    const rimY = heightAt(Math.cos(a) * (R - 0.5), Math.sin(a) * (R - 0.5));
    const top = new THREE.Vector3(Math.cos(a) * (R - 0.4), rimY - CLIFF_FALL.drop, Math.sin(a) * (R - 0.4));
    const f = buildFall(top, out, { width: 0.75, drop: 52, arc: 1.25 });
    group.add(f.mesh);
    mats.push(f.mat);
    falls.push(f);
    // dark cave mouth + mossy brow
    const b = new Builder(rand);
    const cave = ico(1.0, 1);
    transform(cave, { p: [top.x - out.x * 0.1, top.y + 0.35, top.z - out.z * 0.1], s: [1.3, 0.85, 0.5], r: [0, -a + Math.PI / 2, 0] });
    b.push(paint(cave, 0x2a2622, {}));
    for (let i = 0; i < 6; i++) {
      const m = ico(0.4 + rand() * 0.3, 0);
      const off = (i - 2.5) * 0.45;
      transform(m, { p: [top.x + out.z * off * -1 + out.x * 0.2, top.y + 1.1 + rand() * 0.3, top.z + out.x * off + out.z * 0.2] });
      b.push(paint(m, 0x5f8f3e, { jitter: 0.1, rand }));
    }
    group.add(b.build(flatMat));
  }

  // mist puffs where the falls dissolve into the clouds, and spray at the brinks
  const mistGeom = new THREE.IcosahedronGeometry(1, 1);
  const mistMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: true, emissive: 0xffffff, emissiveIntensity: 0.15 });
  const PER = 10;
  const mist = new THREE.InstancedMesh(mistGeom, mistMat, falls.length * PER * 2);
  mist.frustumCulled = false;
  group.add(mist);
  const mistSeeds = [];
  for (let i = 0; i < falls.length * PER * 2; i++) mistSeeds.push([rand(), rand(), rand(), rand()]);

  const dummy = new THREE.Object3D();
  function update(t) {
    for (const m of mats) m.userData.update(t);
    let k = 0;
    falls.forEach((f) => {
      for (let i = 0; i < PER; i++, k++) {
        // bottom mist: billowing puffs that rise and grow
        const [a, b, c, d] = mistSeeds[k];
        const u = phase(t, 6, a);
        const ang = b * TAU;
        const rad = 1.2 + c * 2.5 + u * 1.5;
        dummy.position.set(f.bottom.x + Math.cos(ang) * rad, f.bottom.y + 6 + u * 5 + d * 2, f.bottom.z + Math.sin(ang) * rad);
        const s = (1.4 + c * 1.8) * smooth(u * 4) * (1 - smooth((u - 0.6) / 0.4)) + 0.001;
        dummy.scale.setScalar(s);
        dummy.rotation.set(a * 3, b * 3, 0);
        dummy.updateMatrix();
        mist.setMatrixAt(k, dummy.matrix);
      }
      for (let i = 0; i < PER; i++, k++) {
        // spray at the brink
        const [a, b, c, d] = mistSeeds[k];
        const u = phase(t, 2, a);
        const lateral = (b - 0.5) * 1.6;
        const side = new THREE.Vector3(-f.top.z, 0, f.top.x).normalize();
        const out = new THREE.Vector3(f.top.x, 0, f.top.z).normalize();
        dummy.position.copy(f.top).addScaledVector(out, 1.1 + u * 0.8).addScaledVector(side, lateral);
        dummy.position.y += -1.0 - u * 2.2 + c * 0.4;
        const s = (0.18 + d * 0.22) * Math.sin(Math.PI * u) + 0.001;
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        mist.setMatrixAt(k, dummy.matrix);
      }
    });
    mist.instanceMatrix.needsUpdate = true;
  }

  return { group, update, falls };
}
