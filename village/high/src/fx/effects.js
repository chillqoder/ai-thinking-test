// Flags, chimney smoke, waterfalls and the pond stream.
import * as THREE from 'three';
import { TAU, LOOP, ph, osc, smooth, rng } from '../core/util.js';
import { Batch, geo, vary } from '../core/kit.js';
import { getHeight, edgeRadius } from '../world/terrain.js';
import { STREAM } from '../world/layout.js';

// ---------- flags ----------
function flagTexture(color) {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 80;
  const x = c.getContext('2d');
  x.fillStyle = color;
  x.fillRect(0, 0, 128, 80);
  x.fillStyle = '#f2c94c';
  x.fillRect(0, 0, 128, 7);
  x.fillRect(0, 73, 128, 7);
  // simple crown emblem
  x.beginPath();
  x.moveTo(42, 54);
  x.lineTo(38, 26);
  x.lineTo(52, 40);
  x.lineTo(64, 20);
  x.lineTo(76, 40);
  x.lineTo(90, 26);
  x.lineTo(86, 54);
  x.closePath();
  x.fill();
  x.fillRect(42, 56, 44, 6);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function buildFlags(defs) {
  const root = new THREE.Group();
  const flags = defs.map((d, i) => {
    const g = new THREE.PlaneGeometry(d.w, d.h, 12, 5);
    g.translate(d.w / 2, -d.h / 2, 0);
    const base = Float32Array.from(g.attributes.position.array);
    const m = new THREE.Mesh(
      g,
      new THREE.MeshStandardMaterial({ map: flagTexture(d.color), side: THREE.DoubleSide, roughness: 0.8, flatShading: true })
    );
    m.position.copy(d.pos);
    m.castShadow = true;
    root.add(m);
    return { g, base, w: d.w, phase: i * 0.13 };
  });
  return {
    root,
    update(t) {
      for (const f of flags) {
        const p = f.g.attributes.position;
        const a = p.array;
        const k = TAU / (f.w * 0.85);
        for (let i = 0; i < p.count; i++) {
          const x0 = f.base[i * 3];
          const y0 = f.base[i * 3 + 1];
          const along = x0 / f.w;
          // travelling wave, 70 periods per loop (~1.2 Hz), amplitude grows towards the fly end
          const w = TAU * ((t * 70) / LOOP + f.phase) - k * x0;
          a[i * 3 + 2] = Math.sin(w) * 0.22 * along * f.w * 0.35 + Math.sin(w * 0.5 + y0) * 0.04 * along;
          a[i * 3 + 1] = y0 - along * along * 0.08 * f.w + Math.cos(w) * 0.03 * along;
          a[i * 3] = x0 * (1 - 0.04 * along * (1 + Math.cos(w)));
        }
        p.needsUpdate = true;
        f.g.computeVertexNormals();
      }
    },
  };
}

// ---------- smoke ----------
export function buildSmoke(emitters) {
  const N = 7;
  const CYCLES = 12; // each puff lives 5 s
  const im = new THREE.InstancedMesh(
    geo.ico(1, 0),
    new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 1, flatShading: true }),
    emitters.length * N
  );
  im.castShadow = false;
  const rand = rng(5);
  const col = new THREE.Color();
  const ems = emitters.map((e, j) => {
    const seed = rand();
    for (let i = 0; i < N; i++) im.setColorAt(j * N + i, col.set(e.dark ? vary('#8d8781', rand, 0.06) : vary('#eeebe6', rand, 0.04)));
    return { ...e, seed, big: e.dark ? 1.3 : 1 };
  });
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const v = new THREE.Vector3();
  const s = new THREE.Vector3();
  return {
    mesh: im,
    update(t) {
      let n = 0;
      for (const em of ems) {
        for (let i = 0; i < N; i++) {
          const life = ph(t, CYCLES, i / N + em.seed);
          const env = smooth(life / 0.12) * (1 - smooth((life - 0.55) / 0.45));
          const sc = (0.18 + 0.6 * life) * env * em.big;
          v.set(
            em.pos.x + life * 2.2 + 0.25 * Math.sin(life * 7 + em.seed * 9),
            em.pos.y + life * 4.2,
            em.pos.z + 0.3 * Math.sin(life * 5 + em.seed * 5)
          );
          q.setFromEuler(e.set(life * 2, em.seed * 6 + life, 0));
          m4.compose(v, q, s.set(sc, sc * 0.85, sc));
          im.setMatrixAt(n++, m4);
        }
      }
      im.instanceMatrix.needsUpdate = true;
    },
  };
}

// ---------- flowing water (waterfalls + stream) ----------
function streakTexture(seed) {
  const W = 64;
  const H = 256;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const x = c.getContext('2d');
  const img = x.createImageData(W, H);
  // channels: r = whiteness (foam streaks), g = opacity variation
  const rand = rng(seed);
  const buf = new Float32Array(W * H * 2);
  for (let i = 0; i < W * H; i++) buf[i * 2 + 1] = 0.55;
  for (let s = 0; s < 110; s++) {
    const cx = Math.floor(rand() * W);
    const y0 = Math.floor(rand() * H);
    const len = 20 + rand() * 90;
    const wdt = 1 + Math.floor(rand() * 3);
    const bright = 0.4 + rand() * 0.6;
    for (let yy = 0; yy < len; yy++) {
      const y = (y0 + yy) % H; // wrap → seamless in V
      const f = Math.sin((yy / len) * Math.PI);
      for (let dx = 0; dx < wdt; dx++) {
        const xx = (cx + dx) % W;
        const k = (y * W + xx) * 2;
        buf[k] = Math.min(1, buf[k] + bright * f);
        buf[k + 1] = Math.min(1, buf[k + 1] + 0.4 * f);
      }
    }
  }
  for (let i = 0; i < W * H; i++) {
    img.data[i * 4] = buf[i * 2] * 255;
    img.data[i * 4 + 1] = buf[i * 2 + 1] * 255;
    img.data[i * 4 + 2] = 0;
    img.data[i * 4 + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.NoColorSpace;
  return t;
}

function waterMaterial(map, { color = '#8fd3f5', repeat = 6, opacity = 0.9, fadeEnd = true }) {
  return new THREE.ShaderMaterial({
    uniforms: {
      map: { value: map },
      uOffset: { value: 0 },
      uRepeat: { value: repeat },
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
      uFadeEnd: { value: fadeEnd ? 1 : 0 },
      uLight: { value: 1 },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform sampler2D map;
      uniform float uOffset, uRepeat, uOpacity, uFadeEnd, uLight;
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        vec4 tex = texture2D(map, vec2(vUv.x, vUv.y * uRepeat - uOffset));
        float edge = smoothstep(0.0, 0.16, vUv.x) * smoothstep(1.0, 0.84, vUv.x);
        float fade = smoothstep(0.0, 0.015, vUv.y) * mix(1.0, 1.0 - smoothstep(0.72, 1.0, vUv.y), uFadeEnd);
        vec3 c = mix(uColor, vec3(1.0), tex.r * 0.85) * uLight;
        gl_FragColor = vec4(c, tex.g * edge * fade * uOpacity);
        #include <colorspace_fragment>
      }`,
  });
}

/** Ribbon along a list of centre points; `side` gives the width direction per point. */
function ribbon(points, widths, sides) {
  const pos = [];
  const uv = [];
  const idx = [];
  let total = 0;
  const lens = [0];
  for (let i = 1; i < points.length; i++) {
    total += points[i].distanceTo(points[i - 1]);
    lens.push(total);
  }
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const s = sides[i];
    const w = widths[i] / 2;
    pos.push(p.x - s.x * w, p.y - s.y * w, p.z - s.z * w, p.x + s.x * w, p.y + s.y * w, p.z + s.z * w);
    uv.push(0, lens[i] / total, 1, lens[i] / total);
    if (i > 0) {
      const a = (i - 1) * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return { g, total };
}

export function buildWater() {
  const root = new THREE.Group();
  const rocks = new Batch();
  const rand = rng(77);
  const anims = [];
  const texA = streakTexture(1);
  const texB = streakTexture(2);

  // stream from the pond to the west edge
  const streamPts = [];
  for (let i = 0; i < STREAM.length - 1; i++) {
    const [ax, az] = STREAM[i];
    const [bx, bz] = STREAM[i + 1];
    const steps = Math.ceil(Math.hypot(bx - ax, bz - az) / 0.8);
    for (let k = 0; k < steps; k++) {
      const x = ax + ((bx - ax) * k) / steps;
      const z = az + ((bz - az) * k) / steps;
      if (Math.hypot(x, z) > edgeRadius(Math.atan2(z, x)) * 0.985) break;
      streamPts.push(new THREE.Vector3(x, Math.max(getHeight(x, z), -0.33) + 0.06, z));
    }
  }
  const streamEnd = streamPts[streamPts.length - 1];
  const streamTheta = Math.atan2(streamEnd.z, streamEnd.x);

  const falls = [
    { theta: streamTheta, width: 1.9, fromStream: true },
    { theta: -0.95, width: 2.4 },
    { theta: 0.52, width: 2.0 },
    { theta: -2.25, width: 2.8 },
  ];

  {
    const sides = streamPts.map((p, i) => {
      const a = streamPts[Math.max(0, i - 1)];
      const b = streamPts[Math.min(streamPts.length - 1, i + 1)];
      const d = new THREE.Vector3().subVectors(b, a).setY(0).normalize();
      return new THREE.Vector3(-d.z, 0, d.x);
    });
    const { g, total } = ribbon(streamPts, streamPts.map(() => 1.5), sides);
    const m = waterMaterial(texA, { color: '#5fb7dc', repeat: total / 3, opacity: 1, fadeEnd: false });
    const mesh = new THREE.Mesh(g, m);
    mesh.renderOrder = 2;
    root.add(mesh);
    anims.push({ m, cycles: 14 });
  }

  for (const f of falls) {
    const er = edgeRadius(f.theta);
    const dir = new THREE.Vector3(Math.cos(f.theta), 0, Math.sin(f.theta));
    const side = new THREE.Vector3(-dir.z, 0, dir.x);
    const pts = [];
    const widths = [];
    if (f.fromStream) {
      pts.push(streamEnd.clone().addScaledVector(dir, -0.6));
    } else {
      // spring: water wells up from a rocky outcrop just inland of the rim
      const src = dir.clone().multiplyScalar(er * 0.925);
      const sy = getHeight(src.x, src.z);
      for (let i = 0; i < 7; i++) {
        const o = side.clone().multiplyScalar((i - 3) * 0.55).addScaledVector(dir, -0.6 - rand() * 0.8);
        rocks.add(geo.dode(0.55 + rand() * 0.5), vary('#8f877b', rand, 0.12), [src.x + o.x, sy + 0.1, src.z + o.z], [rand(), rand(), rand()]);
      }
      pts.push(new THREE.Vector3(src.x, sy + 0.12, src.z));
    }
    widths.push(f.width * 0.8);
    const start = pts[0].clone();
    const edge = dir.clone().multiplyScalar(er);
    for (let i = 1; i <= 5; i++) {
      const p = start.clone().lerp(edge, i / 5);
      pts.push(new THREE.Vector3(p.x, Math.max(getHeight(p.x * 0.995, p.z * 0.995), -0.3) + 0.12, p.z));
      widths.push(f.width * (0.8 + 0.2 * (i / 5)));
    }
    const lip = pts[pts.length - 1].clone();
    // free fall: gently arcs outward, widening, into the cloud sea
    const M = 26;
    for (let j = 1; j <= M; j++) {
      const tau = j / M;
      const out = 3.2 * Math.pow(tau, 0.55);
      const y = lip.y - 0.6 * tau - 46 * Math.pow(tau, 1.5);
      pts.push(lip.clone().addScaledVector(dir, out).setY(y));
      widths.push(f.width * (1 + 0.9 * tau));
    }
    const sides = pts.map(() => side);
    for (const layer of [
      { tex: texA, cycles: 44, offset: 0.02, scale: 1, opacity: 0.95, color: '#9ad8f2' },
      { tex: texB, cycles: 31, offset: -0.12, scale: 1.25, opacity: 0.55, color: '#bfe6f7' },
    ]) {
      const lp = pts.map((p) => p.clone().addScaledVector(dir, layer.offset));
      const { g, total } = ribbon(lp, widths.map((w) => w * layer.scale), sides);
      const m = waterMaterial(layer.tex, { color: layer.color, repeat: total / 7, opacity: layer.opacity });
      const mesh = new THREE.Mesh(g, m);
      mesh.renderOrder = 3;
      root.add(mesh);
      anims.push({ m, cycles: layer.cycles });
    }
    // foam at the lip
    for (let i = 0; i < 3; i++) {
      const foam = new THREE.Mesh(geo.ico(0.45, 0), new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 1, flatShading: true, transparent: true, opacity: 0.85 }));
      foam.position.copy(lip).addScaledVector(side, (i - 1) * f.width * 0.35).addScaledVector(dir, 0.5).add(new THREE.Vector3(0, -0.4, 0));
      root.add(foam);
      anims.push({ foam, base: foam.position.y, i });
    }
  }

  root.add(rocks.build());
  return {
    root,
    update(t, light = 1) {
      for (const a of anims) {
        if (a.m) {
          a.m.uniforms.uOffset.value = ph(t, a.cycles);
          a.m.uniforms.uLight.value = light;
        } else {
          const s = 0.8 + 0.25 * osc(t, 40, a.i / 3);
          a.foam.scale.set(s * 1.3, s, s);
          a.foam.position.y = a.base + 0.1 * osc(t, 40, a.i / 3 + 0.25);
        }
      }
    },
  };
}
