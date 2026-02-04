'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'

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
      <nav className="fixed top-4 right-4 z-10">
        <Link
          href="/experiments"
          className="px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors"
        >
          ← Back to Experiments
        </Link>
      </nav>
      <CatchGameDemo />
    </main>
  )
}

