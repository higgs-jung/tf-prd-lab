"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import the demo component to ensure client-side only rendering
const ParticleDemo = dynamic(() => import("../../../experiments/viz-001/demo"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white text-xl">Loading experiment...</div>
    </div>
  )
});

export default function Viz001Page() {
  return (
    <>
      <ParticleDemo />
      <nav className="fixed top-4 right-4 z-10">
        <Link
          href="/experiments"
          className="px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors"
        >
          ← Back to Experiments
        </Link>
      </nav>
    </>
  );
}
