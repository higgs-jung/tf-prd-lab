# Experiments

This directory contains all interactive experiments for the TF PRD Lab sandbox.

## Directory Structure

Each experiment is organized in its own folder with the following structure:

```
experiments/
├── {experiment-id}/
│   ├── demo.tsx       # Main React component (required)
│   └── spec.md        # Experiment specification (required)
```

## Naming Conventions

### Category Prefixes

Experiments are organized by category:

- **viz-***: Visualizations, animations, graphics
  - Examples: `viz-001` (Particle System), `viz-002` (Fractal)
  
- **game-***: Small interactive games
  - Examples: `game-001` (Catch Game), `game-002` (Aim Trainer)

- **tool-***: Utilities, generators, helper tools
  - Examples: `tool-001` (Color Picker), `tool-002` (JSON Formatter)
  
- **weird-***: Experimental, artistic, unusual concepts
  - Examples: `weird-001` (Gravity Reversal), `weird-002` (Glitch Effect)

- **feature-***: Platform features and capabilities
  - Examples: `feature-001` (Search/Filter Demo)

### Registration

All experiments must be registered in `index.ts`:

```typescript
{
  id: 'viz-001',
  slug: 'viz-001',
  title: 'Experiment Title',
  description: 'Brief description',
  status: 'ready',
  createdAt: '2026-02-04',
  category: 'viz',  // 'viz' | 'tool' | 'weird' | 'game'
  tags: ['tag1', 'tag2'],
  demoComponent: () => import('./viz-001/demo')
}
```

## Required Files

### 1. demo.tsx

- Must be a React Client Component (`'use client'`)
- Export default the main component
- Keep it focused and self-contained
- No external API calls (client-side only)

### 2. spec.md

- Purpose: What does this experiment demonstrate?
- Method: Technical approach
- Input/Output: Expected behavior
- Constraints: Limitations and requirements

## Current Experiments

| ID | Category | Title | Tags |
|----|----------|-------|------|
| game-001 | game | Catch Game | game, interactive, canvas |
| game-002 | game | Aim Trainer Mini-Game | game, aim, trainer |
| viz-001 | viz | Interactive Particle System | interactive, animation, canvas |
| viz-002 | viz | Mandelbrot Fractal | math, fractal, canvas |
| viz-003 | viz | Lissajous Curve Playground | viz, interactive, canvas |
| viz-004 | viz | Moiré Grid Warp Playground | viz, moire, canvas |
| tool-001 | tool | Color Picker & Gradient | utility, color, generator |
| tool-002 | tool | JSON Formatter / Minifier | utility, json, formatter |
| weird-001 | weird | Gravity Reversal | physics, interactive, chaos |
| weird-002 | weird | Glitch Effect Generator | effect, glitch, art |
| weird-003 | weird | Audio Feedback Delay Toy | audio, weird, webaudio |
| feature-001 | tool | Search & Filter Demo | utility, search, filter |

## Adding New Experiments

See [docs/how-to-add-experiment.md](../docs/how-to-add-experiment.md) for detailed instructions.

Quick steps:
1. Create directory: `mkdir experiments/your-experiment-id`
2. Add `demo.tsx` and `spec.md`
3. Register in `experiments/index.ts`
4. Create route: `app/experiments/{id}/page.tsx`
5. Run `pnpm build` to verify

## Build Verification

```bash
pnpm build
```

All experiments are statically generated at build time.
