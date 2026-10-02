# Skyhold Village

A Three.js build of `village.md`: a low-poly castle and village on a floating sky island that loops every 60 seconds.

```bash
npm install
npm run dev
```

Keys: Space pauses, ←/→ scrub, C switches to a free orbit camera, D cycles the day mode (off, golden hour, dusk), H hides the HUD.
URL parameters: `?t=12&pause` freezes at 12 s. `?cam=x,y,z,tx,ty,tz` sets a fixed debug camera.

## How the loop stays seamless
Everything on screen is a pure function of loop time `t ∈ [0, 60)` (`src/core/loop.js`). Every periodic motion uses a period that divides 60, and `phase()` warns in the console when one doesn't. Walkers follow closed `Script` timelines (`src/core/script.js`).

## Status (work in progress)
Done:
- Island: top surface, layered underside, hanging roots, bobbing islets.
- Water: streams, three waterfalls falling into a cloud sea, mist, pond.
- Clouds: a cloud sea below the island and drifting clouds.
- Sky and day cycle.
- Castle: waving flags and banners, torches, forge glow.
- Village: houses, well, market stall, pens, fields, trees, grass, chimney smoke.
- Characters: procedural humanoid rig with two-bone IK, plus animal models.
- Castle folk: archer patrols, the king on his balcony, gate guards, the blacksmith.

Still to do:
- Villager behaviours: woodcutter, well peasant, sleeper, mud peasant with pigs, children, farmer, maid, baker, fisherman, vendor. Times shared between characters are already defined in `src/actors/schedule.js`.
- Animal behaviours: cows, chickens with the dog chase, birds, ducks.
- Tune the camera shots in `src/camera.js`. The first shot currently sits too close to the south-east tower.
