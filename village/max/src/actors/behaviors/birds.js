import { rng, smoothstep, TAU, wave } from '../../core/math.js';
import { LOOP } from '../../config.js';
import { CASTLE } from '../../world/layout.js';
import { buildBird } from '../animals.js';
import { Actor } from '../human.js';

// Birds circle slowly – gulls high over the island, swallows round the castle towers
// and a few below the rim by the waterfalls. Each completes whole laps per loop and
// alternates flapping with long glides.

export function createBirds(ctx) {
  const rand = rng(4040);
  const flocks = [
    { n: 5, cx: 2, cz: 4, r: 30, h: 21, laps: 1, dir: 1, color: '#f7f7f2', tips: '#4a4f5a', scale: 1.5 },
    { n: 4, cx: CASTLE.x, cz: CASTLE.z, r: 10.5, h: 17, laps: 2, dir: -1, color: '#4a4f62', tips: '#2a2d38', scale: 1.1 },
    { n: 3, cx: -6, cz: -2, r: 42, h: -5, laps: 1, dir: -1, color: '#f2efe6', tips: '#6a6f7a', scale: 1.4 },
  ];
  const birds = [];
  for (const f of flocks) {
    for (let i = 0; i < f.n; i++) {
      const actor = new Actor(ctx, buildBird(ctx.materials.solid, { color: f.color, tips: f.tips, scale: f.scale }), 'bird');
      actor.root.rotation.order = 'YXZ';
      const a0 = (i / f.n) * TAU * 0.35 + rand.next() * 0.3;
      const rr = f.r + (rand.next() - 0.5) * 4;
      const hh = f.h + (rand.next() - 0.5) * 3;
      const ph = rand.next();
      const flapCycles = 240 + Math.floor(rand.next() * 40);
      birds.push({
        update(t) {
          const a = a0 + (f.dir * f.laps * TAU * t) / LOOP;
          const r = rr + 1.5 * wave(t, 3, ph);
          const y = hh + 0.9 * wave(t, 2, ph + 0.3);
          const x = f.cx + Math.cos(a) * r;
          const z = f.cz + Math.sin(a) * r;
          const vx = -Math.sin(a) * f.dir;
          const vz = Math.cos(a) * f.dir;
          const climb = (0.9 * TAU * 2 * Math.cos(TAU * (2 * t / LOOP + ph + 0.3))) / LOOP;
          actor.root.position.set(x, y, z);
          actor.root.rotation.set(-climb * 2.2, Math.atan2(vx, vz), -f.dir * 0.32);
          // flap for a while, then glide on outstretched wings
          const env = smoothstep(0.1, 0.7, 0.5 + 0.5 * wave(t, 6, ph));
          const flap = Math.sin(TAU * ((flapCycles * t) / LOOP + ph));
          const lag = Math.sin(TAU * ((flapCycles * t) / LOOP + ph - 0.12));
          actor.setPose({
            'wingL.rz': 0.08 + env * 0.75 * flap,
            'tipL.rz': 0.05 + env * 0.45 * lag,
            'wingR.rz': -(0.08 + env * 0.75 * flap),
            'tipR.rz': -(0.05 + env * 0.45 * lag),
            'body.py': -0.04 * env * flap,
          });
        },
      });
    }
  }
  return birds;
}
