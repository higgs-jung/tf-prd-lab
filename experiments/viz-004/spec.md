# viz-004: Moiré Grid Warp Playground

## Purpose
Create visually rich moiré patterns by layering two simple line grids and warping one grid interactively.

## Method
- Render two grids (base + warped overlay) on a Canvas.
- Apply a lightweight displacement field to the overlay grid.
- The displacement field is edited by pointer drag (adds a warp impulse), with gentle decay over time.

## Input / Output
- Input: drag on canvas to warp, sliders for spacing/rotation/warp strength, reset.
- Output: real-time moiré patterns.

## Constraints
- Client-side only (no external APIs).
- Keep demo small and fast.
