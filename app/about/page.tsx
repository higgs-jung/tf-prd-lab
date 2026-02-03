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

        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          {/* Project Purpose */}
          <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3 text-blue-900 dark:text-blue-100">
              🎯 Project Purpose
            </h2>
            <p className="leading-relaxed mb-4">
              <strong>TF PRD Lab 2026</strong> is a <strong>Team Workflow Sandbox</strong> designed for 
              rapid experimentation and validation. It serves as a safe space where teams can test 
              ideas, validate hypotheses, and iterate quickly without the overhead of full production systems.
            </p>
            <p className="leading-relaxed">
              This sandbox demonstrates modern AI-assisted development workflows, where experiments 
              are small, focused, and independently deployable. Each experiment can be developed, 
              tested, and showcased in isolation.
            </p>
          </section>

          {/* Team Workflow */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">👥 OpenClaw Team Structure</h2>
            <p className="leading-relaxed mb-6">
              Our team follows a structured workflow inspired by the OpenClaw framework, 
              with clear roles and responsibilities:
            </p>
            
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">Planner</h3>
                <p className="text-sm mt-1">Defines tickets, sets priorities, and plans milestones</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">Captain</h3>
                <p className="text-sm mt-1">Orchestrates work, assigns tasks to Workers</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold text-green-900 dark:text-green-100">Worker</h3>
                <p className="text-sm mt-1">Implements features, writes code, creates PRs</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">✅</div>
                <h3 className="font-semibold text-orange-900 dark:text-orange-100">Judge</h3>
                <p className="text-sm mt-1">Reviews PRs, provides feedback, approves merges</p>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 text-2xl mb-4">
              <span>📋</span>
              <span>→</span>
              <span>🎯</span>
              <span>→</span>
              <span>⚡</span>
              <span>→</span>
              <span>✅</span>
            </div>
            <p className="text-center text-sm text-gray-500">
              Planner → Captain → Worker → Judge workflow
            </p>
          </section>

          {/* PR-Based Workflow */}
          <section className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">🔄 PR-Based Workflow</h2>
            <p className="leading-relaxed mb-4">
              We follow a strict <strong>branch + PR workflow</strong> to ensure code quality and collaboration:
            </p>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Create Branch:</strong> Each feature or experiment gets its own branch 
                (e.g., <code>feature/experiment-name</code>)
              </li>
              <li>
                <strong>Develop:</strong> Implement the feature with small, focused commits
              </li>
              <li>
                <strong>Verify:</strong> Run <code>pnpm build</code> to ensure no errors
              </li>
              <li>
                <strong>Draft PR:</strong> Open a Draft PR for early feedback
              </li>
              <li>
                <strong>Review:</strong> Judge reviews the PR, provides feedback
              </li>
              <li>
                <strong>Merge:</strong> After approval, PR is merged to main
              </li>
            </ol>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border-l-4 border-yellow-400">
              <p className="text-sm">
                <strong>⚠️ Rule:</strong> Direct push to main is strictly prohibited. 
                All changes must go through the PR workflow.
              </p>
            </div>
          </section>

          {/* Experiments Overview */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">🧪 Current Experiments</h2>
            <p className="leading-relaxed mb-4">
              Our lab contains a growing collection of experiments across three categories:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-purple-200 dark:border-purple-800 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">📊 Viz</h3>
                <p className="text-sm">Visualizations, animations, and graphics experiments</p>
                <ul className="text-sm mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• Interactive Particle System</li>
                  <li>• Mandelbrot Fractal</li>
                </ul>
              </div>
              <div className="border border-green-200 dark:border-green-800 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">🛠️ Tool</h3>
                <p className="text-sm">Utilities, generators, and helper tools</p>
                <ul className="text-sm mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• Color Picker & Gradient</li>
                  <li>• JSON Formatter</li>
                </ul>
              </div>
              <div className="border border-orange-200 dark:border-orange-800 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">👾 Weird</h3>
                <p className="text-sm">Unusual, experimental, artistic creations</p>
                <ul className="text-sm mt-2 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• Gravity Reversal</li>
                  <li>• Glitch Effect Generator</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link 
                href="/experiments" 
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse All Experiments →
              </Link>
            </div>
          </section>

          {/* Technology Stack */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">🛠️ Technology Stack</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Next.js 15</strong> with App Router for modern React development</li>
              <li><strong>TypeScript</strong> for type safety and better developer experience</li>
              <li><strong>Tailwind CSS</strong> for rapid, responsive styling</li>
              <li><strong>Vercel</strong> for seamless deployment and hosting</li>
            </ul>
          </section>

          {/* Get Started */}
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3">🚀 Get Started</h2>
            <p className="leading-relaxed mb-4">
              Ready to explore? Browse our experiments to see what we're working on, 
              or check the project documentation for contribution guidelines.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/experiments" 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Experiments
              </Link>
              <Link 
                href="/" 
                className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
