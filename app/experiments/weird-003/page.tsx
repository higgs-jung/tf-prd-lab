'use client'

import Link from "next/link";
import dynamic from "next/dynamic";

const Weird003Demo = dynamic(() => import("@/experiments/weird-003/demo"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white text-xl font-mono">Loading...</div>
    </div>
  )
});

export default function Weird003Page() {
  return (
    <main className="min-h-screen">
      <nav className="fixed top-4 right-4 z-10">
        <Link
          href="/experiments"
          className="px-4 py-2 bg-gray-900/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-800 transition-colors font-mono"
        >
          ← Back to Experiments
        </Link>
      </nav>

      <Weird003Demo />
    </main>
  );
}
