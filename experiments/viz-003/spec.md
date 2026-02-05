# viz-003: Lissajous Curve Playground

## Purpose
Interactive exploration of Lissajous curves (parametric curves formed by two perpendicular oscillations).

## Method
- Render on an HTML Canvas 2D context
- Animate with `requestAnimationFrame`
- Plot the parametric curve using:
  - `x(t) = sin(A · t + φ)`
  - `y(t) = sin(B · t)`

## Parameters
- **A frequency (A)**: Oscillation frequency on the X axis. Integer values create clean repeating patterns.
- **B frequency (B)**: Oscillation frequency on the Y axis. The A:B ratio controls the curve’s symmetry and complexity.
- **Phase shift (φ)**: Horizontal phase offset (radians). Changes the curve’s rotation/shape without changing frequencies.
- **Trail length**: Number of recent points kept and rendered. Higher values show more history (longer trail).

## Constraints
- Client-side only (Canvas API)
- Responsive canvas sizing
- Minimal UI: a few controls for real-time tuning
