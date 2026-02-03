/**
 * Auto-collected experiments
 * This file automatically imports and registers all experiments
 */

export const experiments = [
  {
    id: 'viz-001',
    slug: 'viz-001',
    title: 'Interactive Particle System',
    description: 'Engaging particle visualization that reacts to mouse/touch input',
    status: 'ready',
    createdAt: '2026-02-03',
    demoComponent: () => import('./viz-001/demo')
  },
  {
    id: 'tool-001',
    slug: 'tool-001',
    title: 'Color Picker & Gradient Generator',
    description: 'Create beautiful CSS gradients with ease - pick colors and generate gradients',
    status: 'ready',
    createdAt: '2026-02-03',
    demoComponent: () => import('./tool-001/demo')
  },
  {
    id: 'tool-002',
    slug: 'tool-002',
    title: 'JSON Formatter / Minifier',
    description: 'Format, minify, and validate JSON data with drag-and-drop support',
    status: 'ready',
    createdAt: '2026-02-04',
    demoComponent: () => import('./tool-002/demo')
  },
  {
    id: 'weird-001',
    slug: 'weird-001',
    title: 'Gravity Reversal',
    description: 'Gravity follows your movement - reverse it for chaos',
    status: 'ready',
    createdAt: '2026-02-03',
    demoComponent: () => import('./weird-001/demo')
  },
  {
    id: 'weird-002',
    slug: 'weird-002',
    title: 'Glitch Effect Generator',
    description: 'Apply digital glitch effects to text with RGB split and pixel sorting',
    status: 'ready',
    createdAt: '2026-02-04',
    demoComponent: () => import('./weird-002/demo')
  }
]
