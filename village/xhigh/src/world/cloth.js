// Waving cloth: flags, hanging banners and laundry. Vertices are displaced on
// the CPU each frame (tiny meshes), using only loop-safe periods.

import * as THREE from 'three';
import { TAU, phase } from '../core/loop.js';

export const WIND_DIR = new THREE.Vector3(1, 0, 0.32).normalize();
export const WIND_YAW = -Math.atan2(WIND_DIR.z, WIND_DIR.x);

const textureCache = new Map();

/** Heraldic crown emblem on a coloured field. */
export function emblemTexture(field = '#c8343a', charge = '#f4c542', { w = 128, h = 80, border = true } = {}) {
  const key = `${field}|${charge}|${w}|${h}|${border}`;
  if (textureCache.has(key)) return textureCache.get(key);
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = field;
  g.fillRect(0, 0, w, h);
  if (border) {
    g.strokeStyle = charge;
    g.lineWidth = Math.max(3, w * 0.04);
    g.strokeRect(g.lineWidth * 0.5, g.lineWidth * 0.5, w - g.lineWidth, h - g.lineWidth);
  }
  // crown
  const cx = w * 0.5;
  const cy = h * 0.55;
  const s = Math.min(w, h) * 0.32;
  g.fillStyle = charge;
  g.beginPath();
  g.moveTo(cx - s, cy + s * 0.55);
  g.lineTo(cx - s, cy - s * 0.35);
  g.lineTo(cx - s * 0.5, cy + s * 0.1);
  g.lineTo(cx, cy - s * 0.6);
  g.lineTo(cx + s * 0.5, cy + s * 0.1);
  g.lineTo(cx + s, cy - s * 0.35);
  g.lineTo(cx + s, cy + s * 0.55);
  g.closePath();
  g.fill();
  for (const [x, y] of [
    [cx - s, cy - s * 0.42],
    [cx, cy - s * 0.68],
    [cx + s, cy - s * 0.42],
  ]) {
    g.beginPath();
    g.arc(x, y, s * 0.13, 0, TAU);
    g.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  textureCache.set(key, tex);
  return tex;
}

/**
 * A rectangular cloth. mode:
 *  - 'flag'   : attached along its left edge (x = 0), flies along +x
 *  - 'banner' : hangs from its top edge (y = 0), extends to -y
 */
export class Cloth {
  constructor({ w = 1.4, h = 0.9, segX = 10, segY = 5, mode = 'flag', map = null, color = 0xffffff, amp = 0.16, period = 1.2, offset = 0, waves = 1.4 }) {
    const g = new THREE.PlaneGeometry(w, h, segX, segY);
    if (mode === 'flag') g.translate(w / 2, -h / 2, 0);
    else g.translate(0, -h / 2, 0);
    this.geom = g;
    this.base = Float32Array.from(g.attributes.position.array);
    this.mat = new THREE.MeshStandardMaterial({ map, color, side: THREE.DoubleSide, roughness: 0.85, metalness: 0 });
    this.mesh = new THREE.Mesh(g, this.mat);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    Object.assign(this, { w, h, mode, amp, period, offset, waves });
  }

  update(t) {
    const pos = this.geom.attributes.position.array;
    const base = this.base;
    const ph = TAU * phase(t, this.period, this.offset);
    const ph2 = TAU * phase(t, this.period * 2.5, this.offset);
    const { w, h, amp, waves } = this;
    for (let i = 0; i < pos.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      if (this.mode === 'flag') {
        const u = x / w; // 0 at the pole
        const v = -y / h;
        const k = TAU * waves * u;
        pos[i + 2] = Math.sin(k - ph + v * 0.8) * amp * u + Math.sin(k * 0.5 - ph2) * amp * 0.5 * u;
        pos[i + 1] = y - u * u * 0.06 * (1 + Math.sin(ph2));
        pos[i] = x - Math.abs(pos[i + 2]) * 0.15;
      } else {
        const v = -y / h; // 0 at the top
        pos[i + 2] = Math.sin(ph + v * 2.2 + x * 1.3) * amp * v * v + Math.sin(ph2 + x) * amp * 0.4 * v;
      }
    }
    this.geom.attributes.position.needsUpdate = true;
    this.geom.computeVertexNormals();
  }
}
