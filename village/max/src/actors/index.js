import { createArchers } from './behaviors/archers.js';
import { createBirds } from './behaviors/birds.js';
import { createBlacksmith, createGuards, createKing } from './behaviors/castlefolk.js';
import { createChildren } from './behaviors/children.js';
import { createChickenYard, createCows } from './behaviors/farmyard.js';
import { createDucks, createFisherman } from './behaviors/pond.js';
import { createMudBath, createSleeper } from './behaviors/resting.js';
import { createBaker, createFarmer, createGossips, createMaid, createVendor } from './behaviors/villagers.js';
import { createWell } from './behaviors/well.js';
import { createWoodcutter } from './behaviors/woodcutter.js';

/** Creates every inhabitant of the island and returns a single update(t) for all of them. */
export function createActors(ctx, { castle, village, effects }) {
  const maid = createMaid(ctx);
  const all = [
    ...createArchers(ctx, castle.walkways),
    createKing(ctx),
    ...createGuards(ctx),
    createBlacksmith(ctx, castle.anvil, effects),
    createWoodcutter(ctx, effects),
    createWell(ctx, effects),
    createSleeper(ctx, effects),
    ...createMudBath(ctx, effects, village.mud),
    ...createChildren(ctx),
    createFarmer(ctx, effects),
    maid,
    createBaker(ctx, village.bakeryDoor),
    ...createGossips(ctx),
    createVendor(ctx, maid.stops),
    createFisherman(ctx, effects),
    ...createDucks(ctx, effects),
    ...createChickenYard(ctx),
    ...createCows(ctx),
    ...createBirds(ctx),
  ];
  const pools = [effects.sparks, effects.drops, effects.dust, effects.zs, effects.ripples];
  return {
    count: all.length,
    update(t, camera) {
      for (const p of pools) p.begin();
      for (const a of all) a.update(t, camera);
      for (const p of pools) p.end();
    },
  };
}
