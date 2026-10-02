import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { box, cone, cyl, ico, torus } from '../core/geo.js';
import { noise2 } from '../core/math.js';
import { Rig } from './rig.js';

// Low-poly farm animals and birds, each a single skinned mesh.

const EYE = '#231a14';

export function buildPig(material, { muddy = 0, scale = 1 } = {}) {
  const s = scale;
  const pink = '#f3a9a6';
  const rig = new Rig();
  rig
    .bone('body', null, 0, 0.36 * s, 0)
    .bone('head', 'body', 0, 0.05 * s, 0.34 * s)
    .bone('earL', 'head', 0.1 * s, 0.13 * s, 0.02 * s)
    .bone('earR', 'head', -0.1 * s, 0.13 * s, 0.02 * s)
    .bone('tail', 'body', 0, 0.06 * s, -0.42 * s)
    .bone('legFL', 'body', 0.13 * s, -0.12 * s, 0.22 * s)
    .bone('legFR', 'body', -0.13 * s, -0.12 * s, 0.22 * s)
    .bone('legBL', 'body', 0.13 * s, -0.12 * s, -0.22 * s)
    .bone('legBR', 'body', -0.13 * s, -0.12 * s, -0.22 * s);
  const bodyGeo = ico(0.3 * s, 1, pink, { sx: 0.95, sy: 0.85, sz: 1.4 });
  if (muddy) {
    const col = bodyGeo.attributes.color;
    const pos = bodyGeo.attributes.position;
    for (let i = 0; i < pos.count; i += 3) {
      if (pos.getY(i) < -0.02 * s || noise2(pos.getX(i) * 9, pos.getZ(i) * 9, 2) > 1 - muddy) {
        for (let j = 0; j < 3; j++) col.setXYZ(i + j, 0.42, 0.28, 0.17);
      }
    }
  }
  rig.add('body', bodyGeo);
  rig.add('head', ico(0.2 * s, 1, pink, { z: 0.06 * s, sy: 0.92 }));
  rig.add('head', cyl(0.085 * s, 0.095 * s, 0.1 * s, 8, '#e98f90', { y: -0.03 * s, z: 0.24 * s, rx: Math.PI / 2 }));
  for (const sx of [-1, 1]) {
    rig.add('head', box(0.022 * s, 0.035 * s, 0.01 * s, '#9a4a52', { x: sx * 0.03 * s, y: -0.03 * s, z: 0.292 * s }));
    rig.add('head', box(0.03 * s, 0.035 * s, 0.02 * s, EYE, { x: sx * 0.085 * s, y: 0.06 * s, z: 0.19 * s }));
  }
  rig.add('earL', cone(0.07 * s, 0.13 * s, 3, '#ec9a9a', { y: 0.04 * s, z: 0.03 * s, rx: 0.6, rz: -0.3 }));
  rig.add('earR', cone(0.07 * s, 0.13 * s, 3, '#ec9a9a', { y: 0.04 * s, z: 0.03 * s, rx: 0.6, rz: 0.3 }));
  rig.add('tail', torus(0.045 * s, 0.014 * s, 3, 8, Math.PI * 1.6, '#ec9a9a', { rx: 0.3, ry: Math.PI / 2 }));
  for (const leg of ['legFL', 'legFR', 'legBL', 'legBR']) {
    rig.add(leg, cyl(0.055 * s, 0.05 * s, 0.22 * s, 6, pink, { y: -0.1 * s }));
    rig.add(leg, cyl(0.052 * s, 0.05 * s, 0.05 * s, 6, '#8a5a52', { y: -0.215 * s }));
  }
  return rig.build(material);
}

export function buildChicken(material, { color = '#f7f3ea', scale = 1 } = {}) {
  const s = scale;
  const rig = new Rig();
  rig
    .bone('body', null, 0, 0.22 * s, 0)
    .bone('head', 'body', 0, 0.1 * s, 0.1 * s)
    .bone('wingL', 'body', 0.105 * s, 0.03 * s, 0)
    .bone('wingR', 'body', -0.105 * s, 0.03 * s, 0)
    .bone('legL', 'body', 0.045 * s, -0.07 * s, 0)
    .bone('legR', 'body', -0.045 * s, -0.07 * s, 0);
  rig.add('body', ico(0.13 * s, 1, color, { sx: 0.88, sy: 0.88, sz: 1.15 }));
  rig.add('body', cone(0.075 * s, 0.17 * s, 4, color, { y: 0.07 * s, z: -0.15 * s, rx: -0.75 }));
  rig.add('head', ico(0.068 * s, 1, color, { y: 0.06 * s, z: 0.02 * s }));
  rig.add('head', cone(0.024 * s, 0.07 * s, 4, '#f2a33a', { y: 0.05 * s, z: 0.095 * s, rx: Math.PI / 2 }));
  rig.add('head', box(0.022 * s, 0.055 * s, 0.075 * s, '#d8322e', { y: 0.135 * s, z: 0.015 * s }));
  rig.add('head', ico(0.022 * s, 0, '#d8322e', { y: 0.005 * s, z: 0.075 * s }));
  for (const sx of [-1, 1]) rig.add('head', box(0.018 * s, 0.022 * s, 0.01 * s, EYE, { x: sx * 0.05 * s, y: 0.075 * s, z: 0.05 * s }));
  const wingCol = color === '#f7f3ea' ? '#e9e2d4' : new THREE.Color(color).multiplyScalar(0.85);
  rig.add('wingL', ico(0.075 * s, 0, wingCol, { x: 0.012 * s, y: -0.01 * s, z: -0.015 * s, sx: 0.35, sy: 0.75, sz: 1.25 }));
  rig.add('wingR', ico(0.075 * s, 0, wingCol, { x: -0.012 * s, y: -0.01 * s, z: -0.015 * s, sx: 0.35, sy: 0.75, sz: 1.25 }));
  for (const leg of ['legL', 'legR']) {
    rig.add(leg, cyl(0.012 * s, 0.012 * s, 0.13 * s, 4, '#f2a33a', { y: -0.065 * s }));
    rig.add(leg, box(0.05 * s, 0.012 * s, 0.07 * s, '#f2a33a', { y: -0.13 * s, z: 0.02 * s }));
  }
  return rig.build(material);
}

export function buildCow(material, { seed = 0 } = {}) {
  const rig = new Rig();
  rig
    .bone('body', null, 0, 0.82, 0)
    .bone('head', 'body', 0, 0.16, 0.64)
    .bone('tail', 'body', 0, 0.18, -0.66)
    .bone('legFL', 'body', 0.2, -0.18, 0.44)
    .bone('legFR', 'body', -0.2, -0.18, 0.44)
    .bone('legBL', 'body', 0.2, -0.18, -0.44)
    .bone('legBR', 'body', -0.2, -0.18, -0.44);
  const body = cyl(0.36, 0.36, 1.3, 8, '#f6f1e6', { rx: Math.PI / 2, ry: Math.PI / 8, sx: 0.88 });
  const pos = body.attributes.position;
  const col = body.attributes.color;
  for (let i = 0; i < pos.count; i += 3) {
    const x = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3;
    const y = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3;
    const z = (pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3;
    if (noise2(z * 3.1 + seed * 7, y * 3 + x * 2.2, seed + 3) > 0.18) for (let j = 0; j < 3; j++) col.setXYZ(i + j, 0.12, 0.1, 0.09);
  }
  rig.add('body', body);
  rig.add('body', ico(0.14, 0, '#f2b0b0', { y: -0.3, z: -0.32, sy: 0.7 }));
  rig.add('head', box(0.32, 0.32, 0.44, '#f6f1e6', { y: 0.02, z: 0.2 }));
  rig.add('head', box(0.3, 0.2, 0.16, '#f0b8b0', { y: -0.06, z: 0.46 }));
  rig.add('head', box(0.34, 0.12, 0.2, '#2a221c', { y: 0.12, z: 0.14 }));
  for (const sx of [-1, 1]) {
    rig.add('head', cone(0.04, 0.16, 5, '#efe6cf', { x: sx * 0.15, y: 0.22, z: 0.12, rz: -sx * 0.5 }));
    rig.add('head', box(0.16, 0.06, 0.1, '#2a221c', { x: sx * 0.22, y: 0.12, z: 0.08, rz: sx * 0.25 }));
    rig.add('head', box(0.035, 0.05, 0.02, EYE, { x: sx * 0.12, y: 0.07, z: 0.43 }));
    rig.add('head', box(0.03, 0.02, 0.01, '#6a3a3a', { x: sx * 0.06, y: -0.07, z: 0.545 }));
  }
  rig.add('tail', cyl(0.025, 0.02, 0.62, 4, '#f6f1e6', { y: -0.3, z: -0.03 }));
  rig.add('tail', ico(0.06, 0, '#2a221c', { y: -0.62, z: -0.03, sy: 1.5 }));
  for (const leg of ['legFL', 'legFR', 'legBL', 'legBR']) {
    rig.add(leg, cyl(0.08, 0.065, 0.56, 6, '#f6f1e6', { y: -0.26 }));
    rig.add(leg, cyl(0.068, 0.07, 0.09, 6, '#3a2e26', { y: -0.58 }));
  }
  return rig.build(material);
}

export function buildDog(material) {
  const coat = '#b97a42';
  const rig = new Rig();
  rig
    .bone('body', null, 0, 0.36, 0)
    .bone('head', 'body', 0, 0.13, 0.27)
    .bone('earL', 'head', 0.08, 0.1, 0.0)
    .bone('earR', 'head', -0.08, 0.1, 0.0)
    .bone('tail', 'body', 0, 0.07, -0.27)
    .bone('legFL', 'body', 0.08, -0.07, 0.17)
    .bone('legFR', 'body', -0.08, -0.07, 0.17)
    .bone('legBL', 'body', 0.08, -0.07, -0.17)
    .bone('legBR', 'body', -0.08, -0.07, -0.17);
  rig.add('body', ico(0.17, 1, coat, { sx: 0.82, sy: 0.82, sz: 1.55 }));
  rig.add('body', ico(0.1, 0, '#f3e6cf', { y: -0.02, z: 0.17, sx: 1, sy: 1.1 }));
  rig.add('head', ico(0.13, 1, coat, { y: 0.03, z: 0.03 }));
  rig.add('head', box(0.11, 0.09, 0.15, '#f3e6cf', { y: -0.01, z: 0.14 }));
  rig.add('head', ico(0.03, 0, '#1e1712', { y: 0.02, z: 0.22 }));
  rig.add('head', box(0.06, 0.012, 0.02, '#c25050', { y: -0.05, z: 0.2 }));
  for (const sx of [-1, 1]) rig.add('head', box(0.026, 0.03, 0.01, EYE, { x: sx * 0.055, y: 0.07, z: 0.12 }));
  rig.add('earL', box(0.05, 0.13, 0.08, '#7a4a28', { x: 0.02, y: -0.05, rz: 0.3 }));
  rig.add('earR', box(0.05, 0.13, 0.08, '#7a4a28', { x: -0.02, y: -0.05, rz: -0.3 }));
  rig.add('tail', cyl(0.025, 0.015, 0.26, 4, coat, { y: 0.11, z: -0.04, rx: -0.5 }));
  for (const leg of ['legFL', 'legFR', 'legBL', 'legBR']) {
    rig.add(leg, cyl(0.04, 0.035, 0.26, 5, coat, { y: -0.12 }));
    rig.add(leg, cyl(0.04, 0.04, 0.05, 5, '#f3e6cf', { y: -0.25 }));
  }
  return rig.build(material);
}

export function buildBird(material, { color = '#f7f7f2', tips = '#5a5f6a', scale = 1.4 } = {}) {
  const s = scale;
  const rig = new Rig();
  rig
    .bone('body', null, 0, 0, 0)
    .bone('wingL', 'body', 0.04 * s, 0.02 * s, 0)
    .bone('tipL', 'wingL', 0.2 * s, 0, 0)
    .bone('wingR', 'body', -0.04 * s, 0.02 * s, 0)
    .bone('tipR', 'wingR', -0.2 * s, 0, 0);
  rig.add('body', ico(0.07 * s, 0, color, { sx: 0.8, sy: 0.75, sz: 2.0 }));
  rig.add('body', ico(0.05 * s, 0, color, { y: 0.03 * s, z: 0.13 * s }));
  rig.add('body', cone(0.015 * s, 0.06 * s, 4, '#f2b33a', { y: 0.025 * s, z: 0.19 * s, rx: Math.PI / 2 }));
  rig.add('body', box(0.08 * s, 0.015 * s, 0.09 * s, color, { z: -0.16 * s }));
  rig.add('wingL', box(0.21 * s, 0.018 * s, 0.12 * s, color, { x: 0.1 * s }));
  rig.add('tipL', box(0.19 * s, 0.014 * s, 0.09 * s, tips, { x: 0.09 * s, z: -0.015 * s }));
  rig.add('wingR', box(0.21 * s, 0.018 * s, 0.12 * s, color, { x: -0.1 * s }));
  rig.add('tipR', box(0.19 * s, 0.014 * s, 0.09 * s, tips, { x: -0.09 * s, z: -0.015 * s }));
  const built = rig.build(material);
  built.mesh.castShadow = false;
  return built;
}

export function buildDuck(material, { drake = false } = {}) {
  const rig = new Rig();
  rig.bone('body', null, 0, 0.08, 0).bone('head', 'body', 0, 0.1, 0.12).bone('tail', 'body', 0, 0.04, -0.15);
  rig.add('body', ico(0.14, 1, drake ? '#d8d0c4' : '#b08a5a', { sx: 0.9, sy: 0.65, sz: 1.3 }));
  rig.add('body', ico(0.06, 0, drake ? '#7a5a3a' : '#8a6a42', { x: 0.1, y: 0.02, z: -0.02, sx: 0.5, sz: 1.6 }));
  rig.add('body', ico(0.06, 0, drake ? '#7a5a3a' : '#8a6a42', { x: -0.1, y: 0.02, z: -0.02, sx: 0.5, sz: 1.6 }));
  rig.add('head', ico(0.075, 1, drake ? '#2f7a4a' : '#9a7a4a', { y: 0.05 }));
  rig.add('head', box(0.06, 0.025, 0.09, '#f2a33a', { y: 0.03, z: 0.09 }));
  for (const sx of [-1, 1]) rig.add('head', box(0.015, 0.02, 0.01, EYE, { x: sx * 0.055, y: 0.07, z: 0.04 }));
  rig.add('tail', cone(0.05, 0.1, 4, drake ? '#3a3a3a' : '#8a6a42', { y: 0.02, z: -0.02, rx: -1.0 }));
  const built = rig.build(material);
  built.mesh.castShadow = false;
  return built;
}

export function buildFish(material) {
  const parts = [ico(0.07, 0, '#e8873a', { sx: 0.6, sy: 0.9, sz: 1.8 }), cone(0.06, 0.1, 3, '#d9772f', { z: -0.15, rx: -Math.PI / 2, sx: 0.4 })];
  const mesh = new THREE.Mesh(mergeGeometries(parts, false), material);
  mesh.castShadow = true;
  return mesh;
}
