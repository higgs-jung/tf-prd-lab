import Link from "next/link";

type ChangelogLink = {
  type: "PR" | "Issue";
  number: number;
};

type ChangelogItem = {
  date: string;
  title: string;
  summary: string;
  links?: ChangelogLink[];
};

const changelogItems: ChangelogItem[] = [
  {
    date: "2026-02-20",
    title: "404 복귀 동선 보강",
    summary: "커스텀 404(not-found) 페이지를 추가해 잘못된 경로 접근 시 복귀 경로를 명확히 안내합니다.",
    links: [
      { type: "PR", number: 137 },
      { type: "Issue", number: 136 },
    ],
  },
  {
    date: "2026-02-19",
    title: "About 페이지 정보 구조 개선",
    summary: "About 페이지를 간결하게 정리해 프로젝트 정체성과 운영 맥락을 빠르게 파악할 수 있게 개선했습니다.",
    links: [{ type: "PR", number: 131 }],
  },
  {
    date: "2026-02-19",
    title: "문서 상태 동기화",
    summary: "next-actions / ideation 문서를 실제 GitHub 상태와 맞추어 업데이트해 작업 추적 가독성을 높였습니다.",
    links: [{ type: "PR", number: 129 }],
  },
  {
    date: "2026-02-19",
    title: "실험 노출 일관성 강화",
    summary: "오늘의 실험을 날짜 기반 seed로 결정해 하루 동안 일관된 실험 카드가 노출되도록 했습니다.",
    links: [{ type: "PR", number: 128 }],
  },
  {
    date: "2026-02-18",
    title: "운영 문서 흐름 정리",
    summary: "문서 흐름(STATUS/next-actions)을 정리해 Planner→Captain→Worker 운영 루프와 최신 상태를 동기화했습니다.",
    links: [
      { type: "PR", number: 126 },
      { type: "PR", number: 124 },
    ],
  },
];

function buildGithubLink(link: ChangelogLink) {
  const base = "https://github.com/higgs-jung/tf-prd-lab";

  if (link.type === "PR") {
    return {
      href: `${base}/pull/${link.number}`,
      label: `PR #${link.number}`,
    };
  }

  return {
    href: `${base}/issues/${link.number}`,
    label: `Issue #${link.number}`,
  };
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${year}.${month}.${day}`;
}

export default function ChangelogPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">Project updates</p>
          <h1 className="text-4xl font-bold">Changelog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            날짜 · 요약 · 관련 링크를 같은 카드 구조로 고정해 최근 변경사항을 빠르게 읽을 수 있게 정리했습니다.
          </p>
          <p>
            <a
              href="https://github.com/higgs-jung/tf-prd-lab/blob/main/docs/changelog-entry-guide.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
            >
              changelog 작성 가이드 보기
            </a>
          </p>
        </header>

        <section aria-label="최근 변경 이력">
          <ol className="space-y-4">
            {changelogItems.map((item, index) => (
              <li key={`${item.date}-${index}`}>
                <article className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800/40">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <time
                      dateTime={item.date}
                      className="rounded-full bg-gray-100 px-2.5 py-1 font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {formatDate(item.date)}
                    </time>
                    <span className="text-gray-500 dark:text-gray-400">업데이트</span>
                  </div>

                  <h2 className="mt-3 text-lg font-semibold text-gray-900 dark:text-gray-50">{item.title}</h2>
                  <p className="mt-2 text-base leading-relaxed text-gray-800 dark:text-gray-100">{item.summary}</p>

                  {item.links && item.links.length > 0 ? (
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="관련 PR 및 이슈">
                      {item.links.map((link) => {
                        const githubLink = buildGithubLink(link);
                        return (
                          <li key={`${link.type}-${link.number}`}>
                            <a
                              href={githubLink.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700 transition hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                            >
                              {githubLink.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>
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
