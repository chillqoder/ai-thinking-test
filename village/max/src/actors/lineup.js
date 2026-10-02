// Developer aid (?lineup): shows the cast in rest poses next to the square.
import { groundHeight } from '../world/layout.js';
import { Actor, buildHuman } from './human.js';
import { buildBird, buildChicken, buildCow, buildDog, buildDuck, buildPig } from './animals.js';

export function createLineup(ctx) {
  const m = ctx.materials.solid;
  const specs = [
    { shirt: '#3f6b3a', pants: '#5a4a3a', hat: 'hood', hatColor: '#4f8a3a', quiver: true, tools: { left: 'bow' } },
    { shirt: '#2f4f9a', pants: '#e8e0d0', hat: 'crown', cape: '#b2302e', collar: '#f7f3ea', beard: '#e6e0d6', hair: '#e6e0d6', build: 'big' },
    { shirt: '#8a8f99', tabard: ['#2f57a6', '#f2c94c'], hat: 'helmet', tools: { right: 'spear' } },
    { shirt: '#6a4a3a', apron: '#4a3020', build: 'big', hairStyle: 'bald', beard: '#4a3222', shortSleeves: true, tools: { right: 'hammer', left: 'tongs' } },
    { shirt: '#b5453a', pants: '#4a4f5a', hat: 'beanie', hatColor: '#a3352e', beard: '#6b4128', tools: { right: 'axe' } },
    { shirt: '#e8dcc4', dress: '#5a7ab8', apron: '#f7f3ea', hat: 'bonnet', hatColor: '#f7f3ea', hairStyle: 'long', hair: '#c9873f', tools: { left: 'basket' } },
    { shirt: '#f7f3ea', pants: '#e8e0d0', hat: 'chef', apron: '#f7f3ea', build: 'big' },
    { shirt: '#d9a03c', child: true, hairStyle: 'messy' },
    { shirt: '#e07b8c', dress: '#e07b8c', child: true, hairStyle: 'pigtails', hair: '#8a5a33' },
  ];
  const x0 = -4;
  specs.forEach((spec, i) => {
    const a = new Actor(ctx, buildHuman(spec, m), 'lineup');
    const x = x0 + i * 0.9;
    const z = 25.5;
    a.place(x, groundHeight(x, z), z, 0);
    a.setPose({ 'armL.rz': 0.1, 'armR.rz': -0.1, 'foreR.rx': spec.tools?.right === 'spear' ? -1.5 : -0.2, 'foreL.rx': spec.tools?.left === 'bow' ? -1.5 : -0.2 });
  });
  const animals = [buildPig(m, { muddy: 0.3 }), buildChicken(m), buildChicken(m, { color: '#b5653a' }), buildCow(m, { seed: 1 }), buildDog(m), buildBird(m), buildDuck(m, { drake: true })];
  animals.forEach((b, i) => {
    const a = new Actor(ctx, b, 'lineup-animal');
    const x = -4 + i * 1.3;
    const z = 27.2;
    a.place(x, groundHeight(x, z) + (i === 5 ? 0.8 : 0), z, 0.4);
    a.setPose({});
  });
}
