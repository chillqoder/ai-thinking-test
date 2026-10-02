import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { box, cyl, piece } from '../core/geo.js';
import { clamp, cyclePhase, rng, smoothstep, TAU, wave } from '../core/math.js';
import { LOOP } from '../config.js';
import { env } from './sky.js';
import { WIND } from './layout.js';
import { PAL } from './palette.js';

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _p = new THREE.Vector3();
const _s = new THREE.Vector3();
const _e = new THREE.Euler();
const ZERO = new THREE.Matrix4().makeScale(0, 0, 0);
const WHITE = new THREE.Color(1, 1, 1);

/** Soft radial gradient texture used for glows. */
function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * A pool of instanced particles rebuilt every frame from pure functions of time.
 * push() places one instance; anything not pushed is hidden.
 */
export class ParticlePool {
  constructor(geometry, material, capacity, { shadows = false } = {}) {
    this.mesh = new THREE.InstancedMesh(geometry, material, capacity);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.mesh.castShadow = shadows;
    this.mesh.userData.pool = true;
    this.capacity = capacity;
    this.n = 0;
    this.color = null;
  }

  enableColor() {
    this.mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(this.capacity * 3).fill(1), 3);
    this.mesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
    return this;
  }

  begin() {
    this.n = 0;
  }

  push(x, y, z, s, rx = 0, ry = 0, rz = 0, sy = s) {
    if (this.n >= this.capacity || s <= 1e-4) return -1;
    _e.set(rx, ry, rz);
    _q.setFromEuler(_e);
    _m.compose(_p.set(x, y, z), _q, _s.set(s, sy, s));
    this.mesh.setMatrixAt(this.n, _m);
    if (this.mesh.instanceColor) this.mesh.setColorAt(this.n, WHITE);
    return this.n++;
  }

  pushQ(x, y, z, s, quaternion) {
    if (this.n >= this.capacity || s <= 1e-4) return -1;
    _m.compose(_p.set(x, y, z), quaternion, _s.set(s, s, s));
    this.mesh.setMatrixAt(this.n, _m);
    return this.n++;
  }

  setColor(i, color) {
    if (i >= 0 && this.mesh.instanceColor) this.mesh.setColorAt(i, color);
  }

  end() {
    for (let i = this.n; i < this.capacity; i++) this.mesh.setMatrixAt(i, ZERO);
    this.mesh.count = Math.max(this.n, 1);
    if (this.n === 0) this.mesh.setMatrixAt(0, ZERO);
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }
}

/** A cloth flag on a pole, waving in the wind (vertex animation on the CPU). */
class Flag {
  constructor(spec, material) {
    const { w, h, colors } = spec;
    const geo = new THREE.PlaneGeometry(w, h, 12, 5).toNonIndexed();
    geo.translate(w / 2, -h / 2, 0);
    const pos = geo.attributes.position;
    const col = new Float32Array(pos.count * 3);
    const a = new THREE.Color(colors[0]);
    const b = new THREE.Color(colors[1]);
    for (let i = 0; i < pos.count; i += 3) {
      const cx = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3 / w;
      const cy = -(pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3 / h;
      const stripe = Math.abs(cy - 0.5) < 0.16 || (spec.royal && Math.abs(cx - 0.32) < 0.08);
      const c = stripe ? b : a;
      for (let j = 0; j < 3; j++) col.set([c.r, c.g, c.b], (i + j) * 3);
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    this.base = Float32Array.from(pos.array);
    this.geo = geo;
    this.mesh = new THREE.Mesh(geo, material);
    this.mesh.castShadow = true;
    this.mesh.position.set(spec.x, spec.y, spec.z);
    this.mesh.rotation.y = Math.atan2(-WIND.z, WIND.x);
    this.spec = spec;
    this.w = w;
    this.h = h;
  }

  update(t) {
    const pos = this.geo.attributes.position;
    const { w, base, spec } = this;
    const ph = (spec.seed ?? 0) * 0.137;
    const k = 2 * Math.PI * (1.15 / w);
    const a1 = TAU * (68 * t / LOOP + ph);
    const a2 = TAU * (113 * t / LOOP + ph * 1.7);
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      const u = Math.max(0, x / w);
      const amp = 0.16 * w * Math.pow(u, 1.1);
      const z = amp * Math.sin(k * x - a1) + 0.25 * amp * Math.sin(1.9 * k * x - a2 + y * 3.0);
      pos.setXYZ(i, x * (1 - 0.06 * u * (0.6 + 0.4 * Math.sin(a1))), y - 0.05 * w * u * u * (0.7 + 0.3 * Math.sin(a2)), z);
    }
    pos.needsUpdate = true;
  }
}

/** A long banner hanging from a facade, swaying slowly. */
class Banner {
  constructor(spec, material) {
    const { w, h, colors } = spec;
    const geo = new THREE.PlaneGeometry(w, h, 3, 8).toNonIndexed();
    geo.translate(0, -h / 2, 0);
    // swallow-tail bottom
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      if (y < -h + 0.01 && Math.abs(x) < 0.01) pos.setY(i, y + 0.28 * w);
    }
    paintBanner(geo, w, h, colors);
    this.base = Float32Array.from(pos.array);
    this.geo = geo;
    this.mesh = new THREE.Mesh(geo, material);
    this.mesh.castShadow = true;
    this.mesh.position.set(spec.x, spec.y, spec.z);
    this.mesh.rotation.y = spec.ry ?? 0;
    this.spec = spec;
  }

  update(t) {
    const pos = this.geo.attributes.position;
    const { base, spec } = this;
    const h = spec.h;
    const ph = (spec.seed ?? 0) * 0.21;
    const a1 = TAU * (17 * t / LOOP + ph);
    const a2 = TAU * (29 * t / LOOP + ph);
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      const v = -y / h;
      pos.setXYZ(i, x + 0.03 * v * Math.sin(a2 + v * 2), y, 0.02 + 0.12 * v * v * (0.6 * Math.sin(a1 + v * 2.5) + 0.4 * Math.sin(a2 - x * 4)));
    }
    pos.needsUpdate = true;
  }
}

function paintBanner(geo, w, h, colors) {
  const pos = geo.attributes.position;
  const col = new Float32Array(pos.count * 3);
  const a = new THREE.Color(colors[0]);
  const b = new THREE.Color(colors[1]);
  for (let i = 0; i < pos.count; i += 3) {
    const cx = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3 / w;
    const cy = -(pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3 / h;
    const border = Math.abs(cx) > 0.36 || cy < 0.06;
    const emblem = Math.abs(cx) < 0.18 && Math.abs(cy - 0.38) < 0.13 - Math.abs(cx) * 0.4;
    const c = border || emblem ? b : a;
    for (let j = 0; j < 3; j++) col.set([c.r, c.g, c.b], (i + j) * 3);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
}

const ripplesVert = /* glsl */ `
attribute float aAlpha;
varying float vAlpha;
#include <common>
#include <fog_pars_vertex>
void main() {
  vAlpha = aAlpha;
  vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`;
const ripplesFrag = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
#include <common>
#include <fog_pars_fragment>
void main() {
  gl_FragColor = vec4(uColor, vAlpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
}`;

/** Expanding water rings (alpha per instance). */
export class Ripples {
  constructor(capacity) {
    const geo = new THREE.RingGeometry(0.82, 1, 24, 1);
    geo.rotateX(-Math.PI / 2);
    this.alpha = new THREE.InstancedBufferAttribute(new Float32Array(capacity), 1);
    this.alpha.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('aAlpha', this.alpha);
    const mat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uColor: { value: new THREE.Color('#ffffff') } }]),
      vertexShader: ripplesVert,
      fragmentShader: ripplesFrag,
      transparent: true,
      depthWrite: false,
      fog: true,
    });
    this.pool = new ParticlePool(geo, mat, capacity);
    this.pool.mesh.userData.alphaFade = true; // rings fade out by alpha, not by size
    this.mat = mat;
  }

  begin() {
    this.pool.begin();
  }

  /** age ∈ [0,1): ring expands to maxR and fades. */
  push(x, y, z, age, maxR = 0.6, strength = 0.7) {
    if (age < 0 || age >= 1) return;
    const i = this.pool.push(x, y, z, 0.05 + maxR * Math.sqrt(age));
    if (i >= 0) this.alpha.setX(i, strength * (1 - age) * smoothstep(0, 0.08, age));
  }

  end() {
    this.pool.end();
    this.alpha.needsUpdate = true;
    this.mat.uniforms.uColor.value.setRGB(1, 1, 1).lerp(env.ambient, 0.4).multiplyScalar(0.6 + 0.4 * (1 - env.night));
  }
}

/** Z letters floating above a sleeper. */
function zGeometry() {
  const parts = [
    box(0.22, 0.05, 0.03, '#ffffff', { y: 0.12 }),
    box(0.22, 0.05, 0.03, '#ffffff', { y: -0.12 }),
    box(0.05, 0.32, 0.03, '#ffffff', { rz: -0.83 }),
  ];
  return mergeGeometries(parts, false);
}

export function createEffects(ctx, anchors) {
  const { scene } = ctx;
  const glowTex = glowTexture();
  const rand = rng(808);
  const updaters = [];

  // ---------------------------------------------------------------- smoke
  const smokeSources = [...anchors.smoke];
  const PUFFS = 6;
  const SMOKE_PERIOD = 6;
  const smokeGeo = piece(new THREE.IcosahedronGeometry(0.5, 0), '#ffffff', null, { jitter: 0.06 });
  const smokeMat = new THREE.MeshStandardMaterial({ color: '#efebe5', flatShading: true, roughness: 1, vertexColors: true, emissive: '#ffffff', emissiveIntensity: 0.06, transparent: true, opacity: 0.72, depthWrite: false });
  const smoke = new ParticlePool(smokeGeo, smokeMat, smokeSources.length * PUFFS);
  scene.add(smoke.mesh);
  smokeSources.forEach((s, i) => {
    s.offset = rand.next() * SMOKE_PERIOD;
    s.spin = rand.next() * TAU;
    s.seed = i;
  });
  updaters.push((t) => {
    smoke.begin();
    for (const s of smokeSources) {
      for (let k = 0; k < PUFFS; k++) {
        const age = cyclePhase(t, SMOKE_PERIOD, s.offset + (k * SMOKE_PERIOD) / PUFFS);
        const rise = age * 3.4 * s.size + age * age * 0.6;
        const drift = age * age * 2.0 * s.size;
        const wob = 0.18 * Math.sin(TAU * (age * 1.7 + s.seed * 0.3 + k * 0.21));
        const scale = s.size * (0.14 + 0.5 * smoothstep(0, 0.6, age)) * smoothstep(0, 0.08, age) * (1 - smoothstep(0.72, 1, age));
        smoke.push(s.x + WIND.x * drift + wob, s.y + rise, s.z + WIND.z * drift - wob * 0.6, scale, age * 2 + s.spin, k + s.spin, age);
      }
    }
    smoke.end();
    smokeMat.color.setRGB(0.94, 0.92, 0.9).multiplyScalar(1 - 0.35 * env.night);
  });

  // ---------------------------------------------------------------- flags & banners
  const clothMat = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, side: THREE.DoubleSide, roughness: 0.85 });
  const cloths = [];
  for (const spec of anchors.flags) {
    const f = new Flag(spec, clothMat);
    scene.add(f.mesh);
    cloths.push(f);
  }
  for (const spec of anchors.banners) {
    const b = new Banner(spec, clothMat);
    scene.add(b.mesh);
    cloths.push(b);
  }
  updaters.push((t) => {
    for (const c of cloths) c.update(t);
  });

  // ---------------------------------------------------------------- torches, lanterns, glows
  const flameGeo = mergeGeometries([
    piece(new THREE.ConeGeometry(0.11, 0.32, 6), '#ff8a2a', { y: 0.16 }),
    piece(new THREE.ConeGeometry(0.06, 0.2, 6), '#ffe27a', { y: 0.12, z: 0.02 }),
  ], false);
  const flames = new ParticlePool(flameGeo, ctx.materials.fire, anchors.torches.length + anchors.coals.length + 4);
  scene.add(flames.mesh);
  const glows = [];
  const addGlow = (x, y, z, size, color, base, nightGain, seed) => {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false, fog: true }));
    sprite.position.set(x, y, z);
    sprite.userData = { size, base, nightGain, seed };
    scene.add(sprite);
    glows.push(sprite);
  };
  for (const t of anchors.torches) {
    // bracket
    ctx.buckets.solid.add(cyl(0.05, 0.035, 0.45, 5, PAL.timberDark, { x: t.x, y: t.y - 0.2, z: t.z }));
    ctx.buckets.solid.add(cyl(0.08, 0.05, 0.1, 6, PAL.iron, { x: t.x, y: t.y + 0.02, z: t.z }));
    addGlow(t.x, t.y + 0.25, t.z, 1.6, '#ff9a3c', 0.25, 0.75, rand.next());
  }
  for (const l of anchors.lanterns) addGlow(l.x, l.y, l.z, 1.4, '#ffc46b', 0.0, 0.85, rand.next());
  for (const c of anchors.coals) addGlow(c.x, c.y + 0.1, c.z, 1.5, '#ff7a2a', 0.35, 0.55, rand.next());
  for (const o of anchors.ovens) addGlow(o.x, o.y, o.z, 1.3, '#ff8c3a', 0.3, 0.6, rand.next());
  // glowing coals and oven mouths
  const coalGeo = piece(new THREE.BoxGeometry(1.0, 0.08, 0.6), '#ff6a1a', null);
  for (const c of anchors.coals) {
    const m = new THREE.Mesh(coalGeo, ctx.materials.fire);
    m.position.set(c.x, c.y, c.z);
    m.rotation.y = Math.PI / 2;
    scene.add(m);
  }
  for (const o of anchors.ovens) {
    const m = new THREE.Mesh(piece(new THREE.BoxGeometry(0.42, 0.3, 0.06), '#ff7b2e', null), ctx.materials.fire);
    m.position.set(o.x, o.y - 0.04, o.z);
    m.rotation.y = o.ry;
    scene.add(m);
  }
  updaters.push((t) => {
    flames.begin();
    anchors.torches.forEach((tr, i) => {
      const f = 1 + 0.12 * wave(t, 97, i * 0.13) + 0.08 * wave(t, 151, i * 0.31);
      flames.push(tr.x, tr.y + 0.05, tr.z, f, 0.05 * wave(t, 83, i * 0.2), 0, 0.06 * wave(t, 71, i * 0.17), f * (1 + 0.1 * wave(t, 131, i * 0.4)));
    });
    flames.end();
    for (const g of glows) {
      const u = g.userData;
      const flick = 1 + 0.1 * wave(t, 113, u.seed) + 0.06 * wave(t, 173, u.seed * 2);
      const strength = u.base + u.nightGain * env.night;
      g.material.opacity = clamp(strength) * 0.9;
      g.scale.setScalar(u.size * flick * (0.7 + 0.3 * strength));
      g.visible = strength > 0.02;
    }
  });

  // ---------------------------------------------------------------- fireflies at night
  const flyCount = 46;
  const flyGeo = new THREE.BufferGeometry();
  const flyPos = new Float32Array(flyCount * 3);
  flyGeo.setAttribute('position', new THREE.BufferAttribute(flyPos, 3));
  const flyMat = new THREE.PointsMaterial({ color: '#d8ff7a', size: 0.22, map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
  const flies = new THREE.Points(flyGeo, flyMat);
  flies.frustumCulled = false;
  scene.add(flies);
  const flyData = [];
  for (let i = 0; i < flyCount; i++) {
    const zone = anchors.fireflyZones[i % anchors.fireflyZones.length];
    flyData.push({ x: zone.x + (rand.next() - 0.5) * zone.r * 2, z: zone.z + (rand.next() - 0.5) * zone.r * 2, y: zone.y + 0.4 + rand.next() * 1.2, a: 1 + (i % 3), b: 2 + (i % 2), p: rand.next() });
  }
  updaters.push((t) => {
    for (let i = 0; i < flyCount; i++) {
      const d = flyData[i];
      flyPos[i * 3] = d.x + 0.9 * wave(t, d.a, d.p);
      flyPos[i * 3 + 1] = d.y + 0.35 * wave(t, d.b * 2, d.p + 0.3);
      flyPos[i * 3 + 2] = d.z + 0.9 * wave(t, d.b, d.p + 0.6);
    }
    flyGeo.attributes.position.needsUpdate = true;
    flyMat.opacity = smoothstep(0.4, 0.9, env.night) * (0.75 + 0.25 * wave(t, 37));
    flies.visible = flyMat.opacity > 0.01;
  });

  // ---------------------------------------------------------------- shared pools for actors
  smoke.mesh.name = 'smoke';
  flames.mesh.name = 'flames';
  const sparks = new ParticlePool(piece(new THREE.BoxGeometry(0.04, 0.04, 0.04), '#ffd27a', null), ctx.materials.fire, 64);
  const drops = new ParticlePool(piece(new THREE.IcosahedronGeometry(0.035, 0), PAL.waterLight, null), new THREE.MeshBasicMaterial({ color: '#bfefff', toneMapped: false }), 80);
  const dust = new ParticlePool(piece(new THREE.IcosahedronGeometry(0.06, 0), '#ffffff', null), new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1 }), 96).enableColor();
  const zs = new ParticlePool(zGeometry(), new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false, fog: true }), 12);
  const ripples = new Ripples(48);
  sparks.mesh.name = 'sparks';
  drops.mesh.name = 'drops';
  dust.mesh.name = 'dust';
  zs.mesh.name = 'zzz';
  ripples.pool.mesh.name = 'ripples';
  scene.add(sparks.mesh, drops.mesh, dust.mesh, zs.mesh, ripples.pool.mesh);

  return {
    sparks,
    drops,
    dust,
    zs,
    ripples,
    glowTex,
    update: (t) => {
      for (const u of updaters) u(t);
    },
  };
}

