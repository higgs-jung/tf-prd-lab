'use client'

import dynamic from 'next/dynamic'
import { ExperimentPageActions } from '@/components/ExperimentPageActions'

const Viz005Demo = dynamic(() => import('@/experiments/viz-005/demo'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="text-white text-xl">Loading experiment...</div>
    </div>
  )
})

export default function Viz005Page() {
  return (
    <main className="min-h-screen">
      <ExperimentPageActions
        backClassName="px-4 py-2 bg-slate-950/80 backdrop-blur-sm text-white rounded-lg hover:bg-slate-900 transition-colors"
        copyClassName="px-4 py-2 bg-slate-950/80 backdrop-blur-sm text-white rounded-lg hover:bg-slate-900 transition-colors"
      />

      <Viz005Demo />
    </main>
  )
}
