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
  }
]
