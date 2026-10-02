import * as THREE from 'three';
import { cyclePhase, lerp, mod, smoothstep, TAU, wave, windowed } from '../../core/math.js';
import { Clip } from '../../core/track.js';
import { POND } from '../../world/layout.js';
import { DOCK } from '../../world/village.js';
import { buildDuck, buildFish } from '../animals.js';
import { Actor, buildHuman } from '../human.js';
import { breathe } from './common.js';

// The fisherman dozes on the dock until a fish bites, yanks it out, admires it,
// tosses it back with a splash and casts again. Ducks paddle round the far side.

const PERIOD = 20;

export function createFisherman(ctx, effects) {
  const actor = new Actor(
    ctx,
    buildHuman({ shirt: '#3f6b8a', sleeves: '#3f6b8a', pants: '#6a5a4a', hat: 'bucket', hatColor: '#7a8a4a', beard: '#9a8a7a', hair: '#9a8a7a', skin: '#e8b48f', boots: '#4a3020', tools: { right: 'rod' } }, ctx.materials.solid),
    'fisherman',
  );
  const heading = -Math.PI / 2;
  actor.place(DOCK.endX + 0.12, DOCK.y, DOCK.z, heading);
  const fish = buildFish(ctx.materials.solid);
  ctx.scene.add(fish);
  const lineGeo = new THREE.BufferGeometry();
  const linePos = new Float32Array(9);
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
  const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: '#2a2a2a', transparent: true, opacity: 0.7 }));
  line.frustumCulled = false;
  ctx.scene.add(line);
  const bobber = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), new THREE.MeshStandardMaterial({ color: '#e8453a', roughness: 0.5 }));
  bobber.castShadow = false;
  ctx.scene.add(bobber);

  const clip = new Clip(
    PERIOD,
    [
      [0, { jerk: 0, admire: 0, doze: 1 }],
      [10.6, { doze: 1 }],
      [11.2, { doze: 0 }],
      [12.1, { jerk: 0 }],
      [12.45, { jerk: 1 }],
      [13.2, { jerk: 0.8, admire: 0 }],
      [13.8, { admire: 1 }],
      [15.2, { admire: 1, jerk: 0.8 }],
      [15.7, { admire: 0, jerk: 0.55 }],
      [16.7, { jerk: 0.9 }],
      [17.3, { jerk: -0.2 }],
      [18.0, { jerk: 0 }],
      [19.0, { doze: 1 }],
    ],
    { label: 'fisherman' },
  );
  const k = {};
  const tip = new THREE.Vector3();
  const tipLocal = new THREE.Vector3(0, -2.15, 0);
  const spot = new THREE.Vector3(DOCK.endX - 2.35, POND.level, DOCK.z - 0.1);
  const splash = new THREE.Vector3(DOCK.endX - 1.3, POND.level, DOCK.z + 0.9);
  const dangle = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  const fishDeep = new THREE.Vector3(spot.x, POND.level - 0.7, spot.z);

  return {
    update(t) {
      clip.sample(t, k);
      const tau = mod(t, PERIOD);
      const p = {
        'hips.py': -0.47,
        'legL.rx': -1.5,
        'legR.rx': -1.45,
        'shinL.rx': 1.45 + 0.15 * wave(t, 12),
        'shinR.rx': 1.4 - 0.15 * wave(t, 12, 0.3),
        'footL.rx': -0.2,
        'footR.rx': -0.2,
        'spine.rx': 0.15 - 0.1 * k.jerk,
        'armR.rx': -0.9 - 0.55 * k.jerk,
        'armR.rz': 0.15,
        'foreR.rx': -0.6 - 0.15 * k.jerk,
        'handR.rx': -0.45 - 0.35 * k.jerk,
        'armL.rx': -0.75 - 0.4 * k.jerk,
        'armL.rz': -0.42,
        'foreL.rx': -0.95,
        'head.rx': 0.1 + 0.22 * k.doze * (0.5 + 0.5 * wave(t, 6)) - 0.25 * k.admire,
        'head.ry': -0.35 * k.admire,
      };
      breathe(p, t, 0.035, 0.6);
      actor.setPose(p);
      actor.worldOf('handR', tipLocal, tip);

      // bobber: floating, nibbles, plunge, out of the water with the catch, recast
      let bob = POND.level + 0.012 * wave(t, 30);
      bob -= 0.035 * windowed(tau, 10.9, 11.0, 11.05, 11.2) + 0.03 * windowed(tau, 11.4, 11.5, 11.55, 11.7) + 0.09 * windowed(tau, 11.95, 12.05, 12.2, 12.35);
      dangle.copy(tip).add(tmp.set(0, -0.42, 0));
      const out = smoothstep(12.25, 12.9, tau) * (1 - smoothstep(16.8, 17.9, tau));
      const castArc = windowed(tau, 16.8, 17.3, 17.3, 17.9);
      bobber.position.set(lerp(spot.x, dangle.x, out), lerp(bob, dangle.y + 0.15, out) + castArc * 0.9, lerp(spot.z, dangle.z, out));
      const sag = 0.15 * (1 - out);
      linePos.set([tip.x, tip.y, tip.z, (tip.x + bobber.position.x) / 2, (tip.y + bobber.position.y) / 2 - sag, (tip.z + bobber.position.z) / 2, bobber.position.x, bobber.position.y, bobber.position.z]);
      lineGeo.attributes.position.needsUpdate = true;

      // the fish
      let fs = 0;
      if (tau >= 12.2 && tau < 15.6) {
        const u = smoothstep(12.25, 12.9, tau);
        fish.position.copy(spot).lerp(dangle, u);
        fish.position.y = lerp(POND.level - 0.25, dangle.y - 0.1, u) + Math.sin(u * Math.PI) * 0.4;
        fs = smoothstep(12.2, 12.35, tau);
        fish.rotation.set(Math.PI / 2 + 0.4 * wave(t, 180), heading + 1.2 * wave(t, 90), 0.3 * wave(t, 120));
      } else if (tau >= 15.6 && tau < 16.9) {
        const u = smoothstep(15.6, 16.4, tau);
        fish.position.copy(dangle).lerp(splash, u);
        fish.position.y = lerp(dangle.y - 0.1, POND.level, u) + Math.sin(u * Math.PI) * 0.8 - 0.6 * smoothstep(16.4, 16.9, tau);
        fs = 1 - smoothstep(16.45, 16.9, tau);
        fish.rotation.set(Math.PI / 2 + 0.4 * wave(t, 180) + u * TAU * 1.5, heading + 1.2 * wave(t, 90) * (1 - u), 0.3 * wave(t, 120) * (1 - u));
      } else {
        fish.position.copy(fishDeep);
      }
      fish.scale.setScalar(Math.max(fs, 1e-4));

      // ripples and drops
      for (const [ts, at] of [[11.0, spot], [11.5, spot], [12.05, spot], [12.3, spot], [16.42, splash], [17.85, spot]]) {
        const age = (tau - ts) / 1.6;
        if (age >= 0 && age < 1) effects.ripples.push(at.x, POND.level + 0.012, at.z, age, ts > 12 ? 0.75 : 0.4, 0.75);
      }
      for (const [ts, at] of [[12.3, spot], [16.42, splash]]) {
        const age = tau - ts;
        if (age < 0 || age > 0.5) continue;
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * TAU;
          effects.drops.push(at.x + Math.cos(a) * age * 0.7, POND.level + 1.8 * age - 4.9 * age * age, at.z + Math.sin(a) * age * 0.7, 1.2 * Math.min(1, age / 0.05) * (1 - age / 0.5));
        }
      }
      // ripples around the bobber while waiting
      effects.ripples.push(spot.x, POND.level + 0.012, spot.z, cyclePhase(t, 4), 0.28, 0.35 * (1 - out));
    },
  };
}

export function createDucks(ctx, effects) {
  const centre = { x: POND.x - 1.5, z: POND.z - 0.3 };
  const R = 1.5;
  const ducks = [];
  for (let i = 0; i < 3; i++) {
    const actor = new Actor(ctx, buildDuck(ctx.materials.solid, { drake: i === 0 }), 'duck');
    const phase0 = -i * 0.85;
    const posAt = (t, out) => {
      const a = phase0 + (TAU * t) / 60;
      return out.set(centre.x + Math.cos(a) * R, POND.level, centre.z + Math.sin(a) * R * 0.8);
    };
    const pos = new THREE.Vector3();
    const prev = new THREE.Vector3();
    ducks.push({
      update(t) {
        posAt(t, pos);
        const a = phase0 + (TAU * t) / 60;
        const heading = Math.atan2(-Math.sin(a), Math.cos(a) * 0.8);
        actor.place(pos.x, pos.y - 0.03 + 0.012 * wave(t, 40, i * 0.3), pos.z, heading);
        const dip = windowed(mod(t + i * 6.5, 20), 12, 12.5, 13.6, 14.2);
        actor.setPose({
          'head.rx': 1.6 * dip + 0.1 * wave(t, 30, i),
          'head.py': -0.06 * dip,
          'body.rx': 0.5 * dip,
          'tail.ry': 0.5 * wave(t, 120, i) * (0.3 + 0.7 * dip),
          'head.ry': 0.2 * wave(t, 8, i * 0.3) * (1 - dip),
        });
        // a little wake behind
        const age = cyclePhase(t, 2, i * 0.7);
        posAt(t - age * 2, prev);
        effects.ripples.push(prev.x, POND.level + 0.012, prev.z, age, 0.45, 0.45);
      },
    });
  }
  return ducks;
}
