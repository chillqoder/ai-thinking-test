// Shared materials. Almost everything uses vertex colours on one flat-shaded
// standard material, which keeps state changes and shader variants minimal.

import * as THREE from 'three';
import { TAU, phase } from './loop.js';

/** Uniforms driven once per frame from loop time (see updateMaterials). */
export const shared = {
  swayA: { value: 0 },
  swayB: { value: 0 },
};

export const flatMat = new THREE.MeshStandardMaterial({
  vertexColors: true,
  flatShading: true,
  roughness: 0.92,
  metalness: 0,
});

export const charMat = new THREE.MeshStandardMaterial({
  vertexColors: true,
  flatShading: true,
  roughness: 0.82,
  metalness: 0,
});

/** Inject a gentle wind sway into a vertex-coloured material. */
function addSway(material, { amp, instanced }) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uSwayA = shared.swayA;
    shader.uniforms.uSwayB = shared.swayB;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uSwayA;
        uniform float uSwayB;`,
      )
      .replace(
        '#include <begin_vertex>',
        instanced
          ? `#include <begin_vertex>
          #ifdef USE_INSTANCING
            vec2 swayOrigin = instanceMatrix[3].xz;
          #else
            vec2 swayOrigin = vec2(0.0);
          #endif
          float swayK = max(position.y, 0.0) * ${amp.toFixed(3)};
          transformed.x += sin(uSwayA + swayOrigin.x * 0.31 + swayOrigin.y * 0.17) * swayK;
          transformed.z += sin(uSwayB + swayOrigin.y * 0.29) * swayK * 0.6;`
          : `#include <begin_vertex>
          float swayK = ${amp.toFixed(3)};
          transformed.x += sin(uSwayA + position.x * 0.35 + position.z * 0.21) * swayK;
          transformed.z += sin(uSwayB + position.z * 0.31 + position.y * 0.5) * swayK * 0.7;
          transformed.y += sin(uSwayB * 2.0 + position.x * 0.5) * swayK * 0.25;`,
      );
  };
  material.customProgramCacheKey = () => `sway-${instanced}-${amp}`;
  return material;
}

/** Tree canopies — merged world-space geometry that breathes in the wind. */
export const foliageMat = addSway(
  new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.9, metalness: 0 }),
  { amp: 0.06, instanced: false },
);

/** Instanced grass tufts & crops — sway grows with height above the root. */
export const grassMat = addSway(
  new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1, metalness: 0, side: THREE.DoubleSide }),
  { amp: 0.25, instanced: true },
);

/** Windows: dark glass by day, warm glow as the light fades. */
export const windowMat = new THREE.MeshStandardMaterial({
  color: 0x3b4658,
  emissive: 0xffb45a,
  emissiveIntensity: 0,
  roughness: 0.4,
  metalness: 0,
  flatShading: true,
});

/** Always-lit glowing bits: forge coals, torch flames, oven mouth. */
export const glowMat = new THREE.MeshBasicMaterial({ color: 0xffa040, toneMapped: false });
export const emberMat = new THREE.MeshBasicMaterial({ color: 0xffd27a, toneMapped: false });

export function updateMaterials(t) {
  shared.swayA.value = TAU * phase(t, 5);
  shared.swayB.value = TAU * phase(t, 3.75);
}
