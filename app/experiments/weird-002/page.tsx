'use client'

import dynamic from "next/dynamic";
import { ExperimentPageActions } from '@/components/ExperimentPageActions'

const GlitchGenerator = dynamic(() => import("@/experiments/weird-002/demo"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white text-xl font-mono">Loading glitch generator...</div>
    </div>
  )
});

export default function Weird002Page() {
  return (
    <main className="min-h-screen">
      <ExperimentPageActions
        backClassName="px-4 py-2 bg-gray-900/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-800 transition-colors font-mono"
        copyClassName="px-4 py-2 bg-gray-900/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-800 transition-colors font-mono"
      />

      <GlitchGenerator />
    </main>
  );
}
