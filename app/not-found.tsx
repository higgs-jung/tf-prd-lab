import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen px-6 py-16 sm:px-10">
      <section className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white/90 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
        <div className="border-b border-gray-200 bg-gradient-to-r from-violet-50 via-blue-50 to-cyan-50 px-6 py-5 dark:border-gray-800 dark:from-violet-900/20 dark:via-blue-900/20 dark:to-cyan-900/20 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
            TF PRD Lab · 404
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">페이지를 찾을 수 없습니다</h1>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
            요청하신 경로가 이동되었거나 존재하지 않아요. 아래 빠른 링크로 탐색을 이어가세요.
          </p>
        </div>

        <div className="grid gap-4 px-6 py-6 sm:grid-cols-3 sm:px-8">
          <Link
            href="/"
            className="group rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-700 dark:hover:bg-blue-900/30"
          >
            <p className="text-sm font-semibold">홈으로 이동</p>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">오늘의 실험과 프로젝트 소개 보기</p>
          </Link>

          <Link
            href="/about"
            className="group rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:-translate-y-0.5 hover:border-purple-300 hover:bg-purple-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-purple-700 dark:hover:bg-purple-900/30"
          >
            <p className="text-sm font-semibold">About</p>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">Lab 목적과 운영 방식 확인</p>
          </Link>

          <Link
            href="/changelog"
            className="group rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-emerald-700 dark:hover:bg-emerald-900/30"
          >
            <p className="text-sm font-semibold">Changelog</p>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">최근 업데이트 내역 확인</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
