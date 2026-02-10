'use client'

import dynamic from 'next/dynamic'
import { ExperimentPageActions } from '@/components/ExperimentPageActions'

const CatchGameDemo = dynamic(() => import('@/experiments/game-001/demo'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
      <div className="text-white/80 text-xl">Loading catch game...</div>
    </div>
  )
})

export default function Game001Page() {
  return (
    <main className="min-h-screen">
      <ExperimentPageActions
        backClassName="px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors"
        copyClassName="px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors"
      />
      <CatchGameDemo />
    </main>
  )
}

