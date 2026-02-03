import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Home
          </Link>
        </nav>

        <h1 className="text-4xl font-bold mb-6">About TF PRD Lab 2026</h1>

        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Purpose</h2>
            <p className="leading-relaxed">
              TF PRD Lab 2026 is a product research sandbox designed for rapid experimentation and validation.
              This space allows us to test ideas quickly without the overhead of full production systems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Experiments are created as independent, focused features</li>
              <li>Each experiment has a clear hypothesis and success metrics</li>
              <li>We iterate quickly based on user feedback</li>
              <li>Successful experiments graduate to production features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Technology Stack</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Next.js 15 with App Router</li>
              <li>TypeScript for type safety</li>
              <li>Tailwind CSS for styling</li>
              <li>Vercel for deployment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Get Started</h2>
            <p className="leading-relaxed mb-4">
              Browse our <Link href="/experiments" className="text-blue-600 dark:text-blue-400 hover:underline">experiments</Link> to see what we're working on,
              or check the project documentation for more details.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
