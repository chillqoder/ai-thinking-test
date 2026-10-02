import * as THREE from 'three';
import { LOOP } from './config.js';

// Developer tooling: an optional overlay (?debug) and a loop-continuity checker that
// steps through the whole loop and reports anything that jumps, pops or teleports.

export function createOverlay(renderer) {
  const el = document.createElement('div');
  el.id = 'debug';
  document.body.appendChild(el);
  let frames = 0;
  let last = performance.now();
  let fps = 0;
  return {
    update(t) {
      frames++;
      const now = performance.now();
      if (now - last > 500) {
        fps = (frames * 1000) / (now - last);
        frames = 0;
        last = now;
      }
      const info = renderer.info.render;
      el.textContent = `loop ${t.toFixed(2).padStart(5)} / ${LOOP}s\nfps  ${fps.toFixed(0)}\ncalls ${info.calls}  tris ${(info.triangles / 1000).toFixed(0)}k\ndpr  ${renderer.getPixelRatio().toFixed(2)}`;
    },
  };
}

const _m = new THREE.Matrix4();
const _p = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();

function ownerName(o) {
  let root = o;
  while (root.parent && root.parent.type !== 'Scene') root = root.parent;
  const owner = root.name || root.type;
  return root === o ? owner : `${owner}/${o.name || o.type}`;
}

function isHidden(o) {
  for (let p = o; p; p = p.parent) if (!p.visible) return true;
  return false;
}

function collect(scene) {
  const rigid = [];
  const pools = [];
  scene.traverse((o) => {
    if (o.userData.pool) {
      const list = [];
      if (!o.userData.alphaFade && !isHidden(o)) {
        // particle size in world units, so tiny sparks may appear instantly but big puffs may not
        if (!o.geometry.boundingSphere) o.geometry.computeBoundingSphere();
        const radius = o.geometry.boundingSphere.radius;
        for (let i = 0; i < o.count; i++) {
          o.getMatrixAt(i, _m);
          _m.decompose(_p, _q, _s);
          const size = _s.x * radius;
          if (size > 0.03) list.push([_p.x, _p.y, _p.z, size]);
        }
      }
      pools.push({ name: o.name || 'pool', list });
      return;
    }
    if (o.isInstancedMesh) {
      for (let i = 0; i < o.count; i++) {
        o.getMatrixAt(i, _m);
        _m.premultiply(o.matrixWorld);
        rigid.push({ name: `${o.name || 'instanced'}[${i}]`, e: _m.elements.slice(), sym: o.userData.loopSymmetric });
      }
      return;
    }
    if (o.isBone || o.isMesh || o.isSprite || o.isPoints || o.isLine || o.isCamera) {
      const e = o.matrixWorld.elements.slice();
      if (isHidden(o) && !o.isBone) e[0] = e[5] = e[10] = 0; // hidden objects count as zero-scale
      rigid.push({ name: ownerName(o), e, sym: o.userData.loopSymmetric || o.parent?.userData.loopSymmetric });
    }
  });
  return { rigid, pools };
}

const scaleOf = (e) => Math.min(Math.hypot(e[0], e[1], e[2]), Math.hypot(e[4], e[5], e[6]), Math.hypot(e[8], e[9], e[10]));

/**
 * Steps through the loop (dt seconds) and reports the largest frame-to-frame jumps.
 * update(t) must pose the whole scene for time t.
 */
export function checkContinuity(scene, update, { dt = 1 / 120, moveLimit = 0.3, turnLimit = 0.5 } = {}) {
  const issues = [];
  let prev = null;
  const steps = Math.round(LOOP / dt);
  for (let i = 0; i <= steps; i++) {
    const t = (i * dt) % LOOP;
    update(t);
    scene.updateMatrixWorld(true);
    const cur = collect(scene);
    if (prev && prev.rigid.length === cur.rigid.length) {
      const wrap = i === steps;
      for (let k = 0; k < cur.rigid.length; k++) {
        const a = prev.rigid[k].e;
        const b = cur.rigid[k].e;
        if (wrap && cur.rigid[k].sym) continue;
        if (scaleOf(a) < 0.02 || scaleOf(b) < 0.02) continue;
        const move = Math.hypot(b[12] - a[12], b[13] - a[13], b[14] - a[14]);
        let turn = 0;
        for (const j of [0, 1, 2, 4, 5, 6, 8, 9, 10]) turn = Math.max(turn, Math.abs(b[j] - a[j]));
        if (move > moveLimit || turn > turnLimit) issues.push({ t: +t.toFixed(3), name: `${cur.rigid[k].name}#${k}`, move: +move.toFixed(3), turn: +turn.toFixed(3) });
      }
      for (let k = 0; k < cur.pools.length; k++) {
        const before = prev.pools[k]?.list ?? [];
        for (const q of cur.pools[k].list) {
          let best = Infinity;
          for (const r of before) best = Math.min(best, Math.hypot(q[0] - r[0], q[1] - r[1], q[2] - r[2]) + Math.abs(q[3] - r[3]));
          if (best > moveLimit && q[3] > 0.06) issues.push({ t: +t.toFixed(3), name: `${cur.pools[k].name} pop-in`, move: Number.isFinite(best) ? +best.toFixed(3) : 999, scale: +q[3].toFixed(2) });
        }
        for (const r of before) {
          let best = Infinity;
          for (const q of cur.pools[k].list) best = Math.min(best, Math.hypot(q[0] - r[0], q[1] - r[1], q[2] - r[2]) + Math.abs(q[3] - r[3]));
          if (best > moveLimit && r[3] > 0.06) issues.push({ t: +t.toFixed(3), name: `${cur.pools[k].name} pop-out`, move: Number.isFinite(best) ? +best.toFixed(3) : 999, scale: +r[3].toFixed(2) });
        }
      }
    } else if (prev) {
      issues.push({ t, name: 'object count changed', move: prev.rigid.length - cur.rigid.length });
    }
    prev = cur;
  }
  const byName = new Map();
  for (const it of issues) {
    const key = it.name.replace(/\[\d+\]/, '[]').replace(/#\d+$/, '');
    if (!byName.has(key) || byName.get(key).move < it.move) byName.set(key, { ...it, count: (byName.get(key)?.count ?? 0) + 1 });
    else byName.get(key).count++;
  }
  return { checkedObjects: prev?.rigid.length ?? 0, issues: issues.length, worst: [...byName.values()].sort((x, y) => y.move - x.move).slice(0, 25) };
}

/** Closest approach between walking characters over the loop (collision sanity check). */
export function checkProximity(scene, update, { dt = 0.1, limit = 0.45 } = {}) {
  const actors = scene.children.filter((o) => o.isGroup && o.children.some((c) => c.isSkinnedMesh) && !['bird', 'archer', 'duck'].includes(o.name));
  const close = new Map();
  for (let t = 0; t < LOOP; t += dt) {
    update(t);
    for (let i = 0; i < actors.length; i++) {
      for (let j = i + 1; j < actors.length; j++) {
        const a = actors[i].position;
        const b = actors[j].position;
        const d = Math.hypot(a.x - b.x, a.z - b.z);
        if (d < limit && Math.abs(a.y - b.y) < 1.5) {
          const key = `${actors[i].name}#${i} ~ ${actors[j].name}#${j}`;
          if (!close.has(key) || close.get(key).d > d) close.set(key, { d: +d.toFixed(2), t: +t.toFixed(1) });
        }
      }
    }
  }
  return [...close.entries()].map(([k, v]) => ({ pair: k, ...v })).sort((x, y) => x.d - y.d);
}
