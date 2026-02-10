'use client'

import dynamic from 'next/dynamic'
import { ExperimentPageActions } from '@/components/ExperimentPageActions'

const LissajousDemo = dynamic(() => import('@/experiments/viz-003/demo'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="text-white text-xl">Loading visualization...</div>
    </div>
  )
})

export default function Viz003Page() {
  return (
    <main className="min-h-screen">
      <ExperimentPageActions
        backClassName="px-4 py-2 bg-slate-950/80 backdrop-blur-sm text-white rounded-lg hover:bg-slate-900 transition-colors"
        copyClassName="px-4 py-2 bg-slate-950/80 backdrop-blur-sm text-white rounded-lg hover:bg-slate-900 transition-colors"
      />

      <LissajousDemo />
    </main>
  )
}
