**Prompt for an AI code generator:**

Create a single, self-contained `index.html` file that runs a Three.js mini-game called **"The Alchemist's Cauldron"**. The game must be fully playable in a browser without any external assets (no textures, models, or audio files). Use Three.js r160 via an import map from unpkg. The entire game is one level: brew the correct elixir by adding ingredients in the exact order shown in the recipe. There are many ingredients available, but only one correct sequence. Wrong ingredients cause random chaotic effects.

**Core gameplay:**
- A 3D scene shows a cauldron on a wooden table in a dark, magical environment.
- The player sees a recipe of 5 ingredients (e.g., Moonpetal, Elf Ear, Glowcap, Fairy Dust, Crystal Shard) displayed in a UI panel.
- Below the 3D view, a shelf of buttons shows 10–12 ingredients, each with an emoji icon and name. Only 5 of them are part of the recipe; the rest are decoys.
- Clicking an ingredient button either:
  - If it matches the next required recipe step: the ingredient drops into the cauldron (animate a falling mesh + splash particles), the liquid changes color slightly, the step is marked complete, and the next step is highlighted. After the 5th correct ingredient, the elixir is created (win overlay).
  - If it is wrong: trigger a random mishap, increment the mistake counter, show a toast message describing the effect, and apply a visual effect (particle burst, camera shake, liquid color change) for a few seconds. After 3 mistakes, show a game‑over overlay with a restart button.

**Ingredients (at least 12):**
Each ingredient has a name, emoji, base color, and a simple 3D shape for the falling object. Example list:
- Moonpetal 🌸 (sphere, pale blue)
- Elf Ear 🧝 (cone, pink)
- Glowcap 🍄 (mushroom made from sphere + cylinder, red)
- Fairy Dust ✨ (octahedron, gold)
- Crystal Shard 💎 (icosahedron, cyan)
- Dragon Scale 🐉 (tetrahedron, green)
- Phoenix Feather 🪶 (elongated cylinder, orange)
- Toad Eye 👁️ (sphere, yellow‑green)
- Mandrake Root 🌿 (cone, brown)
- Unicorn Hair 🦄 (thin cylinder, white)
- Shadow Moss 🌑 (sphere, dark green)
- Bat Wing 🦇 (box, dark purple)

**Recipe (fixed order):**
Moonpetal → Elf Ear → Glowcap → Fairy Dust → Crystal Shard.

**Mishap effects (randomly chosen when wrong):**
Include at least 6 different effects, each with a unique message, particle color, particle count, speed, camera shake intensity, and temporary liquid color. Examples:
- Green smoke: “💨 The cauldron belches green smoke!” (green particles, 190 count, speed 2.4, shake 0.10, liquid dark green)
- Sparks: “🔥 Sparks fly everywhere!” (orange particles, 220 count, speed 3.8, shake 0.28, liquid dark orange)
- Black sludge: “🫧 The brew turns to black sludge…” (dark purple particles, 90 count, speed 1.1, shake 0.05, liquid black)
- Pink glitter: “🎀 A puff of pink glitter explodes!” (pink particles, 240 count, speed 3.0, shake 0.16, liquid magenta)
- Troll howl: “👹 It howls like a wounded troll!” (red particles, 150 count, speed 2.2, shake 0.48, liquid dark red)
- Frost: “❄️ Frost creeps over the rim!” (light blue particles, 170 count, speed 1.7, shake 0.08, liquid icy blue)
- Vortex: “🌪️ A tiny vortex spins up dust!” (purple particles, 200 count, speed 2.6, shake 0.22, liquid dark purple)

**Visual & technical requirements:**
- Scene: dark purple/blue background with fog. A circular wooden table. A cauldron built with `LatheGeometry`, dark metal material, three legs, a rim, and a glowing liquid surface (emissive material). Add rising bubble particles inside the cauldron (Points with additive blending).
- Lighting: ambient, key directional light with shadows, rim light, a point light inside the cauldron that changes color with the liquid, and a fire light under the cauldron.
- Particle systems: use `BufferGeometry` and `Points` for both rising bubbles and burst particles. Burst particles should be pooled (e.g., 900 particles) with velocity, life, and color attributes. Spawn bursts at the cauldron’s surface.
- Camera: perspective, positioned at a slight angle looking down at the cauldron. Implement a subtle camera shake when a mishap occurs.
- UI: HTML/CSS overlay on top of the canvas. Top‑left panel with title and recipe steps (steps highlight current, strikethrough completed). Mistake counter below recipe. Center toast for messages (fade in/out). Bottom shelf with ingredient buttons (flex wrap, emoji + name). Overlays for win and lose, with a restart button.
- Responsive: adapt to window resize; mobile‑friendly touch targets.
- No external assets: all geometry, materials, and particles are procedural. No sound.
- The code must be clean, well‑structured, and commented. The file should run immediately when opened in a modern browser.

**Deliverable:** A single `index.html` file containing all HTML, CSS, and JavaScript (ES modules with import map). The game starts immediately with the recipe visible and the cauldron idle. Clicking ingredients triggers the described behavior. The player can restart after win or loss.