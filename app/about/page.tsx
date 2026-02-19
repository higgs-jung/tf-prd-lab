import Link from "next/link";

const principles = [
  "Start small: every idea ships as a focused experiment.",
  "Learn fast: measure what users do, not what we hope.",
  "Keep it transparent: work happens in issues and PRs.",
  "Ship safely: iterate behind clear review gates.",
];

const links = [
  { label: "Browse experiments", href: "/experiments" },
  { label: "Project repository", href: "https://github.com/higgs-jung/tf-prd-lab" },
  { label: "Open issues", href: "https://github.com/higgs-jung/tf-prd-lab/issues" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-3xl space-y-10">
        <nav>
          <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
            ← Back to Home
          </Link>
        </nav>

        <header className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            About
          </p>
          <h1 className="text-4xl font-bold">Geek Lab</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            TF PRD Lab is a product-facing Geek Lab where we test ideas quickly, validate what creates value,
            and turn strong signals into production-ready features.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Operating principles</h2>
          <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
            {principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Useful links</h2>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
