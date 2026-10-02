// Sky dome, cloud layers and bird flocks.
import * as THREE from 'three';
import { TAU, rng, osc, LOOP } from '../core/util.js';
import { geo, mat, mesh, group } from '../core/kit.js';
import { CASTLE } from './layout.js';

export function buildSkyDome() {
  const uniforms = {
    top: { value: new THREE.Color('#4f9fe0') },
    horizon: { value: new THREE.Color('#d5ecf7') },
    bottom: { value: new THREE.Color('#9fc9e8') },
    sunDir: { value: new THREE.Vector3(0, 1, 0) },
    sunColor: { value: new THREE.Color('#fff2d0') },
  };
  const m = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        vec4 p = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * p;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 top, horizon, bottom, sunDir, sunColor;
      varying vec3 vDir;
      void main() {
        float h = vDir.y;
        vec3 c = h > 0.0 ? mix(horizon, top, pow(smoothstep(0.0, 1.0, h), 0.7))
                         : mix(horizon, bottom, smoothstep(0.0, 0.6, -h));
        float s = max(dot(normalize(vDir), normalize(sunDir)), 0.0);
        c += sunColor * (pow(s, 600.0) * 1.2 + pow(s, 12.0) * 0.18);
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`,
  });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(600, 32, 16), m);
  dome.frustumCulled = false;
  dome.renderOrder = -10;
  return { dome, uniforms };
}

/**
 * A cloud layer built from N identical sectors. Rotating the whole layer by
 * exactly one sector per loop yields a slow continuous drift whose state at the
 * end of the loop is indistinguishable from the start.
 */
function cloudLayer({ sectors, perSector, rMin, rMax, yMin, yMax, sizeMin, sizeMax, seed, flat = 0.55, color = '#ffffff' }) {
  const rand = rng(seed);
  const clusters = [];
  for (let i = 0; i < perSector; i++) {
    const a = rand() * (TAU / sectors);
    const r = rMin + rand() * (rMax - rMin);
    const y = yMin + rand() * (yMax - yMin);
    const s = sizeMin + rand() * (sizeMax - sizeMin);
    const puffs = 3 + Math.floor(rand() * 4);
    const parts = [];
    for (let p = 0; p < puffs; p++) {
      parts.push([
        (rand() - 0.5) * s * 2.2,
        (rand() - 0.3) * s * 0.5,
        (rand() - 0.5) * s * 1.2,
        s * (0.55 + rand() * 0.6),
      ]);
    }
    clusters.push({ a, r, y, parts });
  }
  const count = clusters.reduce((n, c) => n + c.parts.length, 0) * sectors;
  const im = new THREE.InstancedMesh(
    geo.ico(1, 1),
    new THREE.MeshStandardMaterial({ color, roughness: 1, flatShading: true, emissive: '#5b6f8a', emissiveIntensity: 0.18 }),
    count
  );
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  let n = 0;
  for (let s = 0; s < sectors; s++) {
    for (const c of clusters) {
      const ang = c.a + (s * TAU) / sectors;
      const cx = Math.cos(ang) * c.r;
      const cz = Math.sin(ang) * c.r;
      for (const [px, py, pz, ps] of c.parts) {
        // orient cluster tangentially so it stretches along the drift direction
        const ox = px * -Math.sin(ang) + pz * Math.cos(ang);
        const oz = px * Math.cos(ang) + pz * Math.sin(ang);
        q.setFromEuler(e.set(0, n * 0.7, 0));
        m4.compose(new THREE.Vector3(cx + ox, c.y + py, cz + oz), q, new THREE.Vector3(ps * 1.2, ps * flat, ps));
        im.setMatrixAt(n++, m4);
      }
    }
  }
  im.instanceMatrix.needsUpdate = true;
  im.castShadow = false;
  im.receiveShadow = false;
  return { mesh: im, sectors };
}

export function buildClouds() {
  const root = new THREE.Group();
  const layers = [
    // the cloud sea the waterfalls spill into
    { ...cloudLayer({ sectors: 8, perSector: 26, rMin: 8, rMax: 150, yMin: -50, yMax: -41, sizeMin: 5, sizeMax: 11, seed: 3, flat: 0.5 }), dir: 1 },
    // drifting clouds passing the island
    { ...cloudLayer({ sectors: 6, perSector: 4, rMin: 82, rMax: 125, yMin: -4, yMax: 22, sizeMin: 4, sizeMax: 7, seed: 11 }), dir: -1 },
    // high wisps
    { ...cloudLayer({ sectors: 5, perSector: 5, rMin: 70, rMax: 190, yMin: 48, yMax: 70, sizeMin: 6, sizeMax: 12, seed: 23, flat: 0.3 }), dir: 1 },
  ];
  for (const l of layers) root.add(l.mesh);
  return {
    root,
    update(t) {
      for (const l of layers) l.mesh.rotation.y = l.dir * (TAU / l.sectors) * (t / LOOP);
    },
  };
}

function makeBird(color) {
  const b = new THREE.Group();
  const body = mesh(geo.cone(0.14, 0.7, 5), color, [0, 0, 0], [Math.PI / 2, 0, 0]);
  const head = mesh(geo.ico(0.11), color, [0, 0.04, 0.36]);
  const beak = mesh(geo.cone(0.04, 0.14, 4), '#e8a33a', [0, 0.03, 0.5], [Math.PI / 2, 0, 0]);
  const wingGeo = new THREE.BufferGeometry();
  wingGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0.18, 0, 0, -0.18, 0.75, 0, -0.1], 3));
  wingGeo.computeVertexNormals();
  const wm = mat(color, { side: THREE.DoubleSide });
  const wl = new THREE.Group();
  const wr = new THREE.Group();
  const wlm = new THREE.Mesh(wingGeo, wm);
  const wrm = new THREE.Mesh(wingGeo, wm);
  wrm.scale.x = -1;
  wl.add(wlm);
  wr.add(wrm);
  wl.position.x = 0.08;
  wr.position.x = -0.08;
  b.add(body, head, beak, wl, wr);
  b.traverse((o) => (o.castShadow = true));
  return { b, wl, wr };
}

export function buildBirds() {
  const root = new THREE.Group();
  const flocks = [];
  const rand = rng(99);
  const defs = [
    { cx: CASTLE.x, cz: CASTLE.z, r: 22, y: 26, n: 5, laps: 2, color: '#f4f1ea' },
    { cx: 4, cz: 14, r: 40, y: 20, n: 6, laps: -1, color: '#3d3a40' },
    { cx: -10, cz: 20, r: 14, y: 14, n: 3, laps: 3, color: '#8a5a3b' },
  ];
  for (const d of defs) {
    const g = group(root, [d.cx, 0, d.cz]);
    const birds = [];
    for (let i = 0; i < d.n; i++) {
      const bird = makeBird(d.color);
      const beta = (i / d.n) * 0.9 + rand() * 0.15;
      const r = d.r + (rand() - 0.5) * 4;
      const y = d.y + (rand() - 0.5) * 3;
      bird.b.position.set(Math.sin(beta) * r, y, Math.cos(beta) * r);
      // face along the direction of travel (see README: tangent of the circle)
      bird.b.rotation.y = beta + (d.laps > 0 ? Math.PI / 2 : -Math.PI / 2);
      bird.b.scale.setScalar(1.3);
      g.add(bird.b);
      birds.push({ ...bird, y, off: rand(), flaps: 70 + 10 * Math.floor(rand() * 4) });
    }
    flocks.push({ g, birds, laps: d.laps });
  }
  return {
    root,
    update(t) {
      for (const f of flocks) {
        f.g.rotation.y = (TAU * f.laps * t) / LOOP;
        for (const b of f.birds) {
          // alternate flapping and gliding; all frequencies are integer per loop
          const glide = 0.5 + 0.5 * osc(t, 6, b.off);
          const flap = osc(t, b.flaps, b.off) * (0.15 + 0.85 * glide);
          b.wl.rotation.z = flap * 0.9;
          b.wr.rotation.z = -flap * 0.9;
          b.b.position.y = b.y + osc(t, 4, b.off) * 0.8 - flap * 0.05;
          b.b.rotation.z = (f.laps > 0 ? -1 : 1) * 0.25; // bank into the turn
        }
      }
    },
  };
}

