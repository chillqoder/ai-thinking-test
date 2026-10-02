Create a small, seamlessly looping life simulation of a medieval castle and its surrounding village, all set on a floating island in the sky. The scene should be designed for a real-time 3D environment such as Three.js, but do not provide any code—only follow this detailed specification.

**Overall Concept**
A stylized, low-poly medieval world on a floating sky island. The island has a rocky underside with waterfalls spilling into clouds, a grassy top with dirt paths, trees, small fields, and a castle on a central hill. A village sits below the castle walls. The entire simulation runs on a continuous, seamless loop with no player input.

**Camera & Lighting**
- Camera slowly orbits the island or performs a gentle cinematic pan, moving from the castle walls down to the village and back.
- Warm daylight with soft shadows. Light clouds drift slowly past the island.
- Optional subtle day/night cycle that returns to the starting state at the end of the loop.
- Flags on castle towers wave gently. Chimneys emit small smoke plumes. Waterfalls animate continuously.

**Castle & Walls**
- Archers patrol the castle wall walkways. They walk in pairs or small groups from one tower to another, turn at the ends, and continue back. They carry bows, occasionally pause at the edge, look outward, then resume walking.
- The king stands on a balcony overlooking the kingdom. He has a slow idle animation: hands on the railing, head turning left and right, occasionally nodding or leaning forward to watch his subjects.
- Guards stand at the gate. A blacksmith works near the castle courtyard.

**Village & Peasants**
- A woodcutter repeatedly swings an axe, splits a log, picks up a new log, and repeats.
- A peasant uses the well: cranks a winch, lowers a bucket, pulls it up, pours water into a trough, and repeats.
- A sleeping peasant lies under a tree or inside a hut. Chest rises and falls, occasionally turns over.
- Another peasant lies in a mud puddle with pigs, rolling slightly, while pigs snort and wag their tails.
- Children run in circles, play tag, jump, and wave their arms in a looping playful routine.
- Additional villagers: a farmer tending crops, a maid carrying a basket, a baker carrying bread, a fisherman near a small pond.
- Animals: pigs, chickens, cows, a dog chasing chickens, birds flying in slow circles.

**Animation & Loop Requirements**
- Every character follows a simple cyclic behavior: patrol, work, idle, sleep, play, or socialize.
- All animations must loop seamlessly. No abrupt jumps, teleporting, or popping.
- The entire simulation should feel alive but calm, with a consistent rhythm.
- The loop length can be around 60 seconds, after which the scene returns exactly to its starting state.
- Use simple geometry, instancing, and lightweight procedural animation. No complex physics or heavy simulations.
- Target smooth 60 FPS performance.

**Style**
Charming, stylized, slightly cartoonish medieval fantasy. Warm colors, soft edges, readable silhouettes. The floating island should feel magical but grounded, with clouds, birds, and waterfalls reinforcing the sky setting.

Do not write any implementation code. Only use this description as the complete prompt for generating the scene.