'use client'

import Link from "next/link";
import dynamic from "next/dynamic";

const GravityReversalDemo = dynamic(() => import("@/experiments/weird-001/demo"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="text-white text-xl">Loading gravity reversal demo...</div>
    </div>
  )
});

export default function Weird001Page() {
  return (
    <main className="min-h-screen">
      <nav className="fixed top-4 right-4 z-10">
        <Link
          href="/experiments"
          className="px-4 py-2 bg-slate-900/80 backdrop-blur-sm text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          ← Back to Experiments
        </Link>
      </nav>

      <GravityReversalDemo />
    </main>
  );
}
