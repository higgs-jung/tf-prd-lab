'use client'

import dynamic from "next/dynamic";
import { ExperimentPageActions } from '@/components/ExperimentPageActions'

const JsonFormatterDemo = dynamic(() => import("@/experiments/tool-002/demo"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-gray-600 text-xl">Loading JSON formatter...</div>
    </div>
  )
});

export default function Tool002Page() {
  return (
    <main className="min-h-screen">
      <ExperimentPageActions
        backClassName="px-4 py-2 bg-gray-900/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-800 transition-colors"
        copyClassName="px-4 py-2 bg-gray-900/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-800 transition-colors"
      />

      <JsonFormatterDemo />
    </main>
  );
}
