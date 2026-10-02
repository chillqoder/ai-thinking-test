// All living things on the island. Each builder adds its meshes to `group`
// and returns an update(t) closure driven by loop time.

import * as THREE from 'three';
import { buildCastleFolk } from './castleFolk.js';
import { buildWorkers } from './workers.js';
import { buildTownsfolk } from './townsfolk.js';
import { buildFauna } from './fauna.js';
import { skinify } from '../core/skin.js';
import { charMat } from '../core/materials.js';

export function buildActors({ village, castle }) {
  const group = new THREE.Group();
  group.name = 'actors';
  const ctx = { village, castle };
  const updates = [buildCastleFolk(group, ctx), buildWorkers(group, ctx), buildTownsfolk(group, ctx), buildFauna(group)];
  // one skinned draw call per creature (props attached to joints included)
  for (const child of group.children) if (child.userData.rig) skinify(child, charMat);
  return {
    group,
    update(t) {
      for (const u of updates) u(t);
    },
  };
}
