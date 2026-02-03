import Link from "next/link";
import experimentsData from "../../experiments/index.json";

export default function ExperimentsPage() {
  const experiments = experimentsData as Array<{
    id: string;
    slug: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
  }>;

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

        <h1 className="text-4xl font-bold mb-2">Experiments</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Explore our collection of product experiments
        </p>

        <div className="grid gap-4">
          {experiments.map((experiment) => (
            <div
              key={experiment.id}
              className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">
                    {experiment.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {experiment.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        experiment.status === "ready"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {experiment.status}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {experiment.createdAt}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
