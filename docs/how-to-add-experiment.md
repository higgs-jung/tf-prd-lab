# How to Add a New Experiment

This guide explains how to add a new experiment to the TF PRD Lab sandbox.

## Prerequisites

- Node.js & pnpm installed
- Basic knowledge of React and TypeScript
- Understanding of the experiment structure

## File Structure

When adding a new experiment, you need to create/modify these files:

```
experiments/
├── {experiment-id}/
│   ├── demo.tsx       # Main experiment component (required)
│   └── spec.md        # Experiment specification (required)
app/experiments/
└── {experiment-id}/
    └── page.tsx       # Route page (required)
experiments/index.ts   # Registration (modify)
```

## Step-by-Step Guide

### 1. Create Experiment Directory

```bash
mkdir -p experiments/my-experiment app/experiments/my-experiment
```

### 2. Write spec.md

Create `experiments/{experiment-id}/spec.md`:

```markdown
# {experiment-id}: Experiment Title

## Purpose
Brief description of what this experiment demonstrates.

## Method
Technical approach and technologies used.

## Input/Output
- Input: User interactions, parameters
- Output: Visual/audio/technical result

## Constraints
- Client-side only (no external APIs)
- Performance requirements
- Accessibility notes
```

### 3. Create demo.tsx

Create `experiments/{experiment-id}/demo.tsx`:

```tsx
'use client';

import { useState } from 'react';

export default function MyExperimentDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Experiment</h1>
      <button
        onClick={() => setCount(c => c + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Count: {count}
      </button>
    </div>
  );
}
```

**Important:**
- Always include `'use client'` at the top
- Export default the component
- Keep it focused and small
- No external API calls (client-side only)

### 4. Create page.tsx

Create `app/experiments/{experiment-id}/page.tsx`:

```tsx
'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const MyDemo = dynamic(() => import('@/experiments/my-experiment/demo'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div>Loading experiment...</div>
    </div>
  ),
});

export default function MyExperimentPage() {
  return (
    <main className="min-h-screen">
      <nav className="fixed top-4 right-4 z-10">
        <Link
          href="/experiments"
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          ← Back to Experiments
        </Link>
      </nav>

      <MyDemo />
    </main>
  );
}
```

### 5. Register in experiments/index.ts

Add to `experiments/index.ts`:

```typescript
export const experiments = [
  // ... existing experiments
  {
    id: 'my-experiment',
    slug: 'my-experiment',
    title: 'My Experiment Title',
    description: 'Brief description of my experiment',
    status: 'ready',
    createdAt: '2026-02-04',
    demoComponent: () => import('./my-experiment/demo'),
  },
];
```

## Build Verification Checklist

Before submitting your PR, verify:

- [ ] `pnpm install` completes without errors
- [ ] `pnpm build` succeeds (no TypeScript errors)
- [ ] All files are created (demo.tsx, spec.md, page.tsx)
- [ ] Experiment appears in `/experiments` list
- [ ] Individual experiment page loads
- [ ] No console errors in browser

### Verification Commands

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Start development server (optional)
pnpm dev
```

Expected output after build:
```
✓ Generating static pages (X/X)
○  (Static)  prerendered as static content
```

## Experiment Categories

Choose appropriate category for your experiment:

- **viz**: Visualizations, animations, graphics (e.g., particles, fractals)
- **tool**: Utilities, generators, helpers (e.g., color picker, JSON formatter)
- **weird**: Unusual, experimental, artistic (e.g., glitch effects, gravity reversal)

## Complete Minimal Template

### spec.md

```markdown
# exp-XXX: My Experiment

## Purpose
One sentence description.

## Method
Brief technical approach.

## Input/Output
Input: Mouse/keyboard
Output: Visual result

## Constraints
Client-side only. 60fps target.
```

### demo.tsx

```tsx
'use client';

export default function MinimalDemo() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Minimal Experiment
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your experiment content here
        </p>
      </div>
    </div>
  );
}
```

### page.tsx

```tsx
'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const Demo = dynamic(() => import('@/experiments/exp-XXX/demo'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div>Loading...</div>
    </div>
  ),
});

export default function Page() {
  return (
    <main className="min-h-screen">
      <nav className="fixed top-4 right-4 z-10">
        <Link href="/experiments" className="px-4 py-2 bg-gray-800 text-white rounded">
          ← Back
        </Link>
      </nav>

      <Demo />
    </main>
  );
}
```

## PR Guidelines

1. **Create branch**: `git checkout -b feature/my-experiment`
2. **Implement**: Follow the structure above
3. **Verify**: Run `pnpm build` successfully
4. **Commit**: Clear commit message
5. **Open Draft PR** with:
   - Clear title: `feat: add my-experiment (category)`
   - Acceptance criteria checklist
   - Build verification notes

## Troubleshooting

### Build Error: "Module not found"
- Check import path uses `@/` alias (e.g., `@/experiments/...`)
- Verify file exists at expected location

### TypeScript Errors
- Ensure `'use client'` is at top of demo.tsx and page.tsx
- Check `useRef` generic types if used

### Experiment Not Showing in List
- Verify registration in `experiments/index.ts`
- Check `demoComponent` uses correct import path

### Hydration Mismatch
- Use `suppressHydrationWarning` in layout.tsx if needed
- Ensure client-side only code is marked with `'use client'`

## Example Experiments

Reference these completed experiments for patterns:

| ID | Category | Description |
|----|----------|-------------|
| viz-001 | viz | Interactive Particle System (Canvas) |
| viz-002 | viz | Mandelbrot Fractal Visualization |
| tool-001 | tool | Color Picker & Gradient Generator |
| tool-002 | tool | JSON Formatter / Minifier |
| weird-001 | weird | Gravity Reversal Physics |
| weird-002 | weird | Glitch Effect Generator |

## Questions?

- Check existing experiments for reference
- Review PRD guidelines in `docs/PRD.md`
- Open an issue for discussion
