import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { beam, box, cone, cyl, place } from '../core/geo.js';
import { TAU } from '../core/math.js';
import { LOOP } from '../config.js';
import { groundHeight, WIND, WINDMILL } from './layout.js';
import { PAL } from './palette.js';

const TURNS_PER_LOOP = 5;

/** A stone tower mill whose sails turn a whole number of times per loop. */
export function createWindmill(ctx) {
  const { x, z } = WINDMILL;
  const y = groundHeight(x, z);
  const face = Math.atan2(-WIND.x, -WIND.z); // sails face into the wind
  const parts = [
    cyl(1.7, 2.1, 0.6, 8, PAL.stoneDark, { y: 0.1 }),
    cyl(1.25, 1.75, 5.2, 8, PAL.plaster, { y: 2.9 }),
    cyl(1.3, 1.3, 0.18, 8, PAL.timber, { y: 1.9 }),
    cyl(1.42, 1.3, 0.25, 8, PAL.timber, { y: 5.55 }),
    box(0.8, 1.35, 0.1, PAL.door, { y: 0.95, z: 1.72, rx: -0.07 }),
    box(1.0, 0.1, 0.5, PAL.wood, { y: 0.35, z: 1.95 }),
  ];
  const cap = [
    cone(1.55, 1.9, 8, PAL.thatch, { y: 6.6, ry: Math.PI / 8 }),
    box(0.9, 0.9, 1.0, PAL.thatchDark, { y: 6.0, z: 0.95 }),
    cyl(0.12, 0.12, 0.8, 6, PAL.timberDark, { y: 6.2, z: 1.4, rx: Math.PI / 2 }),
  ];
  place(cap, { ry: face });
  parts.push(...cap);
  ctx.buckets.solid.add(place(parts, { x, y, z }));
  ctx.buckets.glow.add(place([box(0.4, 0.5, 0.08, '#fff', { y: 3.6, z: 1.52, rx: -0.07 }), box(0.08, 0.5, 0.4, '#fff', { x: 1.42, y: 3.0, rx: 0 })], { x, y, z, ry: face }));

  const blades = [];
  blades.push(cyl(0.22, 0.22, 0.3, 8, PAL.timberDark, { rx: Math.PI / 2 }));
  for (let k = 0; k < 4; k++) {
    const a = (k / 4) * TAU;
    const blade = [
      box(0.14, 3.9, 0.1, PAL.timber, { y: 2.05 }),
      box(0.72, 3.0, 0.04, '#f2e6cf', { x: 0.42, y: 2.4, z: -0.04 }),
    ];
    for (let r = 0; r < 6; r++) blade.push(box(0.8, 0.05, 0.06, PAL.timber, { x: 0.38, y: 0.95 + r * 0.6, z: 0.02 }));
    blade.push(beam([0.78, 0.9, 0.02], [0.78, 3.9, 0.02], 0.05, 0.05, PAL.timber));
    place(blade, { rz: a });
    blades.push(...blade);
  }
  const sails = new THREE.Mesh(mergeGeometries(blades, false), ctx.materials.solid);
  sails.castShadow = true;
  sails.receiveShadow = true;
  sails.name = 'windmill-sails';
  const hub = new THREE.Group();
  hub.position.set(x + Math.sin(face) * 1.85, y + 6.2, z + Math.cos(face) * 1.85);
  hub.rotation.y = face;
  hub.rotation.x = -0.08;
  hub.add(sails);
  ctx.scene.add(hub);

  return {
    update(t) {
      sails.rotation.z = -(TURNS_PER_LOOP * TAU * t) / LOOP;
    },
  };
}
