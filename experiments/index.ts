/**
 * Auto-collected experiments
 * This file automatically imports and registers all experiments
 */

export interface Experiment {
  id: string
  slug: string
  title: string
  description: string
  status: 'ready' | 'draft'
  createdAt: string
  category: 'viz' | 'tool' | 'weird'
  tags: string[]
  demoComponent: () => Promise<any>
}

export const experiments: Experiment[] = [
  {
    id: 'viz-001',
    slug: 'viz-001',
    title: 'Interactive Particle System',
    description: 'Engaging particle visualization that reacts to mouse/touch input',
    status: 'ready',
    createdAt: '2026-02-03',
    category: 'viz',
    tags: ['interactive', 'animation', 'canvas', 'physics'],
    demoComponent: () => import('./viz-001/demo')
  },
  {
    id: 'viz-002',
    slug: 'viz-002',
    title: 'Mandelbrot Fractal',
    description: 'Explore the infinite complexity of the Mandelbrot set',
    status: 'ready',
    createdAt: '2026-02-04',
    category: 'viz',
    tags: ['math', 'fractal', 'canvas', 'interactive'],
    demoComponent: () => import('./viz-002/demo')
  },
  {
    id: 'tool-001',
    slug: 'tool-001',
    title: 'Color Picker & Gradient Generator',
    description: 'Create beautiful CSS gradients with ease - pick colors and generate gradients',
    status: 'ready',
    createdAt: '2026-02-03',
    category: 'tool',
    tags: ['utility', 'color', 'generator', 'css'],
    demoComponent: () => import('./tool-001/demo')
  },
  {
    id: 'tool-002',
    slug: 'tool-002',
    title: 'JSON Formatter / Minifier',
    description: 'Format, minify, and validate JSON data with drag-and-drop support',
    status: 'ready',
    createdAt: '2026-02-04',
    category: 'tool',
    tags: ['utility', 'json', 'formatter', 'developer'],
    demoComponent: () => import('./tool-002/demo')
  },
  {
    id: 'weird-001',
    slug: 'weird-001',
    title: 'Gravity Reversal',
    description: 'Gravity follows your movement - reverse it for chaos',
    status: 'ready',
    createdAt: '2026-02-03',
    category: 'weird',
    tags: ['physics', 'interactive', 'simulation', 'chaos'],
    demoComponent: () => import('./weird-001/demo')
  },
  {
    id: 'weird-002',
    slug: 'weird-002',
    title: 'Glitch Effect Generator',
    description: 'Apply digital glitch effects to text with RGB split and pixel sorting',
    status: 'ready',
    createdAt: '2026-02-04',
    category: 'weird',
    tags: ['effect', 'glitch', 'image-processing', 'art'],
    demoComponent: () => import('./weird-002/demo')
  }
]

// Extract unique categories
export const categories = ['all', ...Array.from(new Set(experiments.map(e => e.category)))] as const

// Extract unique tags
export const allTags = Array.from(new Set(experiments.flatMap(e => e.tags)))
