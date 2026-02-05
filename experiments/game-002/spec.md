# game-002: Aim Trainer Mini-Game

## Purpose
Fast 30-second aim/tap trainer to measure click/tap speed and accuracy.

## Mechanics
- A single circular target appears on the canvas.
- Tap/click the target to score +1 and spawn a new target.
- 30-second countdown; when time reaches 0 the round ends.
- Best score is stored locally (localStorage).

## Controls
- Start: begin or resume the round.
- Stop: pause the round.
- Restart: start a fresh 30-second round.
- Tap/click on the target to score.

## Constraints
- Client-side only (`'use client'`)
- Canvas rendering with `requestAnimationFrame`
- Responsive canvas sizing via CSS scaling
- Touch support for mobile

