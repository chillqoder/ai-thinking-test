import * as THREE from 'three';
import { env } from './sky.js';

/** Shared materials. Most of the world is vertex-coloured, flat-shaded geometry. */
export function createMaterials() {
  const solid = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.92, metalness: 0 });
  solid.name = 'solid';

  // Foliage sways gently in the wind. Frequencies are whole cycles per loop.
  const swayUniforms = { uPhase: { value: 0 } };
  const foliage = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.95, metalness: 0 });
  foliage.name = 'foliage';
  foliage.onBeforeCompile = (shader) => {
    shader.uniforms.uPhase = swayUniforms.uPhase;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aSway;\nuniform float uPhase;')
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          float a = 6.2831853 * uPhase;
          float s1 = sin(a * 14.0 + wp.x * 0.31 + wp.z * 0.17);
          float s2 = sin(a * 23.0 + wp.z * 0.43 - wp.x * 0.11);
          transformed.x += aSway * (0.055 * s1 + 0.02 * s2);
          transformed.z += aSway * (0.04 * s2 + 0.015 * s1);
          transformed.y += aSway * 0.012 * s1 * s2;
        }`,
      );
  };
  foliage.customProgramCacheKey = () => 'foliage-sway';

  // Window panes: dark glass by day, warm lamplight at night.
  const glow = new THREE.MeshStandardMaterial({ color: '#3d3a4a', emissive: '#ffb04a', emissiveIntensity: 0, roughness: 0.35, flatShading: true });
  glow.name = 'windows';

  // Unlit, bright (flames, embers, glowing coals).
  const fire = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false });
  fire.name = 'fire';

  const cloud = new THREE.MeshStandardMaterial({ color: '#ffffff', flatShading: true, roughness: 1, metalness: 0, emissive: '#9aa6c0', emissiveIntensity: 0.32 });
  cloud.name = 'cloud';

  const mud = new THREE.MeshStandardMaterial({ color: '#5e3f24', roughness: 0.35, metalness: 0, flatShading: true });
  mud.name = 'mud';

  const update = (t, phase) => {
    swayUniforms.uPhase.value = phase;
    glow.emissiveIntensity = 0.05 + env.night * 2.2;
    cloud.emissive.copy(env.ambient).multiplyScalar(0.55);
    cloud.emissiveIntensity = 1;
  };

  return { solid, foliage, glow, fire, cloud, mud, update };
}
