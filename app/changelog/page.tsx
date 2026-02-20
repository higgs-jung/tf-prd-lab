import Link from "next/link";

type ChangelogItem = {
  date: string;
  summary: string;
  links: Array<{ label: string; href: string }>;
};

const changelogItems: ChangelogItem[] = [
  {
    date: "2026-02-20",
    summary: "커스텀 404(not-found) 페이지를 추가해 잘못된 경로 접근 시 복귀 경로를 명확히 안내합니다.",
    links: [
      { label: "PR #137", href: "https://github.com/higgs-jung/tf-prd-lab/pull/137" },
      { label: "Issue #136", href: "https://github.com/higgs-jung/tf-prd-lab/issues/136" },
    ],
  },
  {
    date: "2026-02-19",
    summary: "About 페이지를 간결하게 정리해 프로젝트 정체성과 운영 맥락을 빠르게 파악할 수 있게 개선했습니다.",
    links: [{ label: "PR #131", href: "https://github.com/higgs-jung/tf-prd-lab/pull/131" }],
  },
  {
    date: "2026-02-19",
    summary: "next-actions / ideation 문서를 실제 GitHub 상태와 맞추어 업데이트해 작업 추적 가독성을 높였습니다.",
    links: [{ label: "PR #129", href: "https://github.com/higgs-jung/tf-prd-lab/pull/129" }],
  },
  {
    date: "2026-02-19",
    summary: "오늘의 실험을 날짜 기반 seed로 결정해 하루 동안 일관된 실험 카드가 노출되도록 했습니다.",
    links: [{ label: "PR #128", href: "https://github.com/higgs-jung/tf-prd-lab/pull/128" }],
  },
  {
    date: "2026-02-18",
    summary: "문서 흐름(STATUS/next-actions)을 정리해 Planner→Captain→Worker 운영 루프와 최신 상태를 동기화했습니다.",
    links: [
      { label: "PR #126", href: "https://github.com/higgs-jung/tf-prd-lab/pull/126" },
      { label: "PR #124", href: "https://github.com/higgs-jung/tf-prd-lab/pull/124" },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">Project updates</p>
          <h1 className="text-4xl font-bold">Changelog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            날짜 · 요약 · 링크 중심으로 최근 변경사항을 빠르게 스캔할 수 있도록 정리했습니다.
          </p>
        </header>

        <section className="space-y-4">
          {changelogItems.map((item, index) => (
            <article
              key={`${item.date}-${index}`}
              className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800/40"
            >
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{item.date}</p>
              <p className="mt-2 text-base leading-relaxed text-gray-800 dark:text-gray-100">{item.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </section>

        <div>
          <Link
            href="/"
            className="text-sm text-gray-600 underline underline-offset-2 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
