'use client'

import Link from "next/link";
import dynamic from "next/dynamic";

const GravityReversalDemo = dynamic(() => import("@/experiments/weird-001/demo"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="text-white text-xl">Loading weird experiment...</div>
    </div>
  )
});

export default function Weird001Page() {
  return (
    <main className="min-h-screen">
      <nav className="fixed top-4 right-4 z-10">
        <Link
          href="/experiments"
          className="px-4 py-2 bg-slate-900/50 dark:bg-slate-100/50 backdrop-blur-sm text-white dark:text-slate-900 rounded-lg hover:bg-slate-900/70 dark:hover:bg-slate-100/70 transition-colors"
        >
          ← Back to Experiments
        </Link>
      </nav>

      <GravityReversalDemo />
    </main>
  );
}
