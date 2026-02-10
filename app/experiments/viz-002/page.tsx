'use client'

import dynamic from "next/dynamic";
import { ExperimentPageActions } from '@/components/ExperimentPageActions'

const FractalDemo = dynamic(() => import("@/experiments/viz-002/demo"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-white text-xl">Loading fractal visualization...</div>
    </div>
  )
});

export default function Viz002Page() {
  return (
    <main className="min-h-screen">
      <ExperimentPageActions
        backClassName="px-4 py-2 bg-gray-900/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-800 transition-colors"
        copyClassName="px-4 py-2 bg-gray-900/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-800 transition-colors"
      />

      <FractalDemo />
    </main>
  );
}
