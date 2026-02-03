'use client';

import Link from "next/link";
import dynamic from "next/dynamic";

const SearchFilterDemo = dynamic(() => import("@/experiments/feature-001/demo"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl">Loading demo...</div>
    </div>
  ),
});

export default function Feature001Page() {
  return (
    <main className="min-h-screen">
      <nav className="fixed top-4 right-4 z-10">
        <Link
          href="/experiments"
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          ← Back to Experiments
        </Link>
      </nav>

      <SearchFilterDemo />
    </main>
  );
}
