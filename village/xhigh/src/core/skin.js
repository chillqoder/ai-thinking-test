// Collapse a rig built from groups + rigid part meshes into ONE skinned mesh.
//
// Every vertex is bound with full weight to the group that held its mesh, so
// the joints keep working exactly as before (they become the skeleton), but a
// character costs one draw call instead of a dozen — in the colour pass and in
// the shadow pass.

import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const _rel = new THREE.Matrix4();
const _inv = new THREE.Matrix4();

/**
 * @param {THREE.Object3D} root   rig root (its current pose becomes the bind pose)
 * @param {THREE.Material} material  only meshes using this material are merged
 */
export function skinify(root, material) {
  root.updateMatrixWorld(true);
  _inv.copy(root.matrixWorld).invert();
  const meshes = [];
  root.traverse((o) => {
    if (o.isMesh && !o.isSkinnedMesh && o.material === material && o.parent && o.visible) meshes.push(o);
  });
  if (meshes.length < 2) return null;

  const bones = [];
  const boneIndex = new Map();
  const parts = [];
  for (const m of meshes) {
    const joint = m.parent;
    if (!boneIndex.has(joint)) {
      boneIndex.set(joint, bones.length);
      bones.push(joint);
    }
    const g = (m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone());
    _rel.multiplyMatrices(_inv, m.matrixWorld);
    g.applyMatrix4(_rel);
    for (const name of Object.keys(g.attributes)) if (!['position', 'normal', 'color'].includes(name)) g.deleteAttribute(name);
    const n = g.attributes.position.count;
    const idx = new Uint16Array(n * 4).fill(0);
    const wts = new Float32Array(n * 4);
    const bi = boneIndex.get(joint);
    for (let i = 0; i < n; i++) {
      idx[i * 4] = bi;
      wts[i * 4] = 1;
    }
    g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(idx, 4));
    g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(wts, 4));
    parts.push(g);
    joint.remove(m);
  }
  const merged = mergeGeometries(parts, false);
  const skinned = new THREE.SkinnedMesh(merged, material);
  skinned.castShadow = true;
  skinned.receiveShadow = true;
  skinned.frustumCulled = false; // poses (lying, sitting) leave the bind-pose bounds
  root.add(skinned);
  root.updateMatrixWorld(true);
  skinned.bind(new THREE.Skeleton(bones), skinned.matrixWorld);
  return skinned;
}
