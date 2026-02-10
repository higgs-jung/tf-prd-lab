import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeToggle } from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'TF PRD Lab 2026',
  description: 'Product research sandbox for rapid experimentation',
}

const repoUrl = 'https://github.com/higgs-jung/tf-prd-lab'
const commitSha = process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_GIT_SHA
const shortCommitSha = commitSha ? commitSha.slice(0, 7) : null
const buildDate = process.env.BUILD_DATE ?? new Date().toISOString().slice(0, 10)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 transition-colors dark:bg-gray-900 dark:text-white">
        <div className="flex min-h-screen flex-col">
          <header className="fixed right-4 top-4 z-50">
            <ThemeToggle />
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-gray-200 bg-white/90 px-4 py-3 text-xs text-gray-600 backdrop-blur dark:border-gray-800 dark:bg-gray-900/90 dark:text-gray-400 sm:px-6">
            <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-3 gap-y-1">
              <span>
                Build {shortCommitSha ? `#${shortCommitSha}` : 'local'}
                <span className="mx-1">·</span>
                {buildDate}
              </span>
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-2 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Repository
              </a>
            </div>
          </footer>
        </div>

        <Analytics />
      </body>
    </html>
  )
}
