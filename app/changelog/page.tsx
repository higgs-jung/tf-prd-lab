import Link from "next/link";

const mergedPrs = [
  {
    number: 131,
    title: "feat: add concise About page for Geek Lab",
    mergedAt: "2026-02-19",
    url: "https://github.com/higgs-jung/tf-prd-lab/pull/131",
  },
  {
    number: 129,
    title: "docs: reconcile next-actions/ideation after #125 closure and #127 merge",
    mergedAt: "2026-02-19",
    url: "https://github.com/higgs-jung/tf-prd-lab/pull/129",
  },
  {
    number: 128,
    title: "feat: deterministic 오늘의 실험 selection (date-seeded)",
    mergedAt: "2026-02-19",
    url: "https://github.com/higgs-jung/tf-prd-lab/pull/128",
  },
  {
    number: 126,
    title: "docs: refresh next-actions + ideation index after #123 merge (#125)",
    mergedAt: "2026-02-18",
    url: "https://github.com/higgs-jung/tf-prd-lab/pull/126",
  },
  {
    number: 124,
    title: "docs: reconcile next-actions/STATUS with actual GitHub state (#123)",
    mergedAt: "2026-02-18",
    url: "https://github.com/higgs-jung/tf-prd-lab/pull/124",
  },
];

const operatingNotes = [
  "Ship small PRs and merge frequently.",
  "Keep experiments isolated and easy to roll back.",
  "Prioritize clear docs so contributors can move fast.",
  "Prefer deterministic behavior in user-facing daily picks.",
];

const usefulLinks = [
  { label: "Repository", href: "https://github.com/higgs-jung/tf-prd-lab" },
  { label: "Open Issues", href: "https://github.com/higgs-jung/tf-prd-lab/issues" },
  { label: "Open Pull Requests", href: "https://github.com/higgs-jung/tf-prd-lab/pulls" },
  { label: "Project README", href: "https://github.com/higgs-jung/tf-prd-lab/blob/main/README.md" },
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-10">
        <header>
          <h1 className="mb-3 text-4xl font-bold">Changelog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Lightweight project updates: recent merged pull requests, operating notes, and quick links.
          </p>
        </header>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Recent merged pull requests</h2>
          <ul className="space-y-3">
            {mergedPrs.map((pr) => (
              <li key={pr.number} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  #{pr.number} · {pr.title}
                </a>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Merged: {pr.mergedAt}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Operating notes</h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
            {operatingNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Useful links</h2>
          <ul className="space-y-2">
            {usefulLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div>
          <Link href="/" className="text-sm text-gray-600 underline underline-offset-2 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
