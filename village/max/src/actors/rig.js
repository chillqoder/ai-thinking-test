import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { clamp } from '../core/math.js';

/**
 * Builds a character as ONE skinned mesh with rigid (single-bone) skinning:
 * every body part is a little low-poly piece glued to a bone. Animating bone
 * rotations moves the parts, while the whole character costs a single draw call.
 */
export class Rig {
  constructor() {
    this.bones = [];
    this.byName = {};
    this.parts = [];
  }

  bone(name, parent, x, y, z) {
    const b = new THREE.Bone();
    b.name = name;
    b.position.set(x, y, z);
    if (parent) this.byName[parent].add(b);
    this.bones.push(b);
    this.byName[name] = b;
    return this;
  }

  /** Attach geometry pieces (defined in the bone's local space). */
  add(boneName, ...geos) {
    if (!this.byName[boneName]) throw new Error(`Unknown bone ${boneName}`);
    for (const g of geos.flat()) if (g) this.parts.push([boneName, g]);
    return this;
  }

  build(material) {
    const root = this.bones[0];
    root.updateMatrixWorld(true);
    const geos = this.parts.map(([name, g]) => {
      const bone = this.byName[name];
      const index = this.bones.indexOf(bone);
      const geo = g.clone().applyMatrix4(bone.matrixWorld);
      const count = geo.attributes.position.count;
      const si = new Uint16Array(count * 4);
      const sw = new Float32Array(count * 4);
      for (let i = 0; i < count; i++) {
        si[i * 4] = index;
        sw[i * 4] = 1;
      }
      geo.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4));
      geo.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
      return geo;
    });
    const merged = mergeGeometries(geos, false);
    const mesh = new THREE.SkinnedMesh(merged, material);
    mesh.add(root);
    mesh.bind(new THREE.Skeleton(this.bones));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    for (const b of this.bones) b.userData.rest = b.position.clone();
    return { mesh, bones: this.byName };
  }
}

/**
 * Applies pose objects ({ "armL.rx": 0.3, "hips.py": -0.1, "belly.s": 0.05 }) to bones.
 * Every frame starts from the rest pose, so a pose fully describes the character.
 */
export class PoseBinder {
  constructor(bones) {
    this.bones = Object.values(bones);
    this.lookup = bones;
    this.cache = new Map();
  }

  _parse(key) {
    let entry = this.cache.get(key);
    if (entry === undefined) {
      const [boneName, prop] = key.split('.');
      const bone = this.lookup[boneName];
      entry = bone && prop ? { bone, kind: prop[0], axis: prop[1] ?? '' } : null;
      this.cache.set(key, entry);
    }
    return entry;
  }

  apply(p) {
    for (const b of this.bones) {
      b.rotation.set(0, 0, 0);
      b.position.copy(b.userData.rest);
      b.scale.set(1, 1, 1);
    }
    for (const key in p) {
      const e = this._parse(key);
      if (!e) continue;
      const v = p[key];
      if (e.kind === 'r') e.bone.rotation[e.axis] = v;
      else if (e.kind === 'p') e.bone.position[e.axis] += v;
      else if (e.kind === 's') {
        if (e.axis) e.bone.scale[e.axis] = 1 + v;
        else e.bone.scale.setScalar(1 + v);
      }
    }
  }
}

const _t = new THREE.Vector3();
const _m = new THREE.Matrix4();

/**
 * Two-bone arm IK: rotates `upper` / `lower` bones (which hang along −Y at rest) so the
 * end of the chain reaches `worldTarget`. Bends like an elbow (forward/up).
 * Call after the rest of the pose is applied; updates the bones' rotations in place.
 */
export function reachIK(root, upper, lower, worldTarget, L1, L2, { side = 1, weight = 1, twist = 0 } = {}) {
  root.updateMatrixWorld(true);
  const parent = upper.parent;
  _m.copy(parent.matrixWorld).invert();
  _t.copy(worldTarget).applyMatrix4(_m).sub(upper.position);
  const dx = _t.x;
  const dy = _t.y;
  const dz = _t.z;
  let d = Math.hypot(dx, dy, dz);
  d = clamp(d, Math.abs(L1 - L2) + 1e-3, L1 + L2 - 1e-3);
  const planar = Math.hypot(dy, dz);
  const gamma = Math.atan2(dx, planar);
  const thetaT = Math.atan2(dz, -dy);
  const beta = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
  const elbow = Math.acos(clamp((L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2), -1, 1));
  const ux = -(thetaT - beta);
  const lx = -(Math.PI - elbow);
  upper.rotation.x += (ux - upper.rotation.x) * weight;
  upper.rotation.z += (gamma * 0.9 - upper.rotation.z) * weight;
  upper.rotation.y += (twist * side - upper.rotation.y) * weight;
  lower.rotation.x += (lx - lower.rotation.x) * weight;
  root.updateMatrixWorld(true);
}
