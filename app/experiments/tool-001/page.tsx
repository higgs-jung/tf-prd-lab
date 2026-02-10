'use client'

import dynamic from "next/dynamic";
import { ExperimentPageActions } from '@/components/ExperimentPageActions'

const ColorPickerDemo = dynamic(() => import("@/experiments/tool-001/demo"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-gray-900 dark:text-white text-xl">Loading tool...</div>
    </div>
  )
});

export default function Tool001Page() {
  return (
    <main className="min-h-screen">
      <ExperimentPageActions
        backClassName="px-4 py-2 bg-gray-900/50 dark:bg-gray-100/50 backdrop-blur-sm text-white dark:text-gray-900 rounded-lg hover:bg-gray-900/70 dark:hover:bg-gray-100/70 transition-colors"
        copyClassName="px-4 py-2 bg-gray-900/50 dark:bg-gray-100/50 backdrop-blur-sm text-white dark:text-gray-900 rounded-lg hover:bg-gray-900/70 dark:hover:bg-gray-100/70 transition-colors"
      />

      <ColorPickerDemo />
    </main>
  );
}
