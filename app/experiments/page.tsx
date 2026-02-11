import { Suspense } from 'react'
import ExperimentsClient from './ExperimentsClient'

export default function ExperimentsPage() {
  return (
    <Suspense fallback={<ExperimentsClientFallback />}>
      <ExperimentsClient />
    </Suspense>
  )
}

function ExperimentsClientFallback() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-5xl">
        <section className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Experiments</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">Loading…</p>
        </section>
      </div>
    </main>
  )
}
