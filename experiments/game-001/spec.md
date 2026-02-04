# game-001 — Catch Game

## Purpose
Create a simple, interactive catch game experiment where the player moves a basket to catch falling objects.

## Method
- **Rendering:** HTML `<canvas>` with 2D context (fixed internal resolution `800×600`, responsive display).
- **Game loop:** `requestAnimationFrame` with a delta-time update step.
- **State:** Start screen → Playing → Game over.
- **Events:** Keyboard listeners on `window` and mouse/touch handlers on the canvas.

## Input / Output
- **Input**
  - Keyboard: `ArrowLeft`, `ArrowRight` for movement
  - Mouse / Touch: basket follows cursor / touch position across the canvas
- **Output**
  - On-screen score and lives HUD
  - Game over screen with restart

## Rules
- Start with **3 lives**
- Catching an object: **+10 score**
- Missing an object: **-1 life**
- **Game over** when lives reach 0
- **Progressive difficulty:** fall speed and spawn rate increase as score increases

## Constraints
- Client-side only (`'use client'`)
- Smooth animation target ~60fps
- Single-file React component for the demo

