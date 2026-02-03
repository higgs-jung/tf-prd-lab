import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to TF PRD Lab 2026
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          A product research sandbox for rapid experimentation
        </p>

        <nav className="flex gap-4">
          <Link
            href="/experiments"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Experiments
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">Quick Start</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Browse the <Link href="/experiments" className="text-blue-600 dark:text-blue-400 hover:underline">Experiments</Link> page</li>
            <li>Learn more <Link href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">About</Link> this project</li>
            <li>Check the <Link href="/experiments" className="text-blue-600 dark:text-blue-400 hover:underline">latest experiments</Link></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
