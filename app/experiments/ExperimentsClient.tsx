'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { experiments } from '../../experiments/index'

const SEARCH_PARAM = 'q'
const TAG_PARAM = 'tag'

const normalizeTags = (tags: string[]) => Array.from(new Set(tags)).sort((a, b) => a.localeCompare(b))

const areEqualArrays = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false
  return a.every((value, index) => value === b[index])
}

export default function ExperimentsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const validTags = useMemo(() => new Set(experiments.flatMap((experiment) => experiment.tags)), [])

  const urlSearchInput = useMemo(() => searchParams.get(SEARCH_PARAM) ?? '', [searchParams])
  const urlSelectedTags = useMemo(
    () =>
      normalizeTags(
        searchParams
          .getAll(TAG_PARAM)
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0 && validTags.has(tag))
      ),
    [searchParams, validTags]
  )

  const [searchInput, setSearchInput] = useState(urlSearchInput)
  const [selectedTags, setSelectedTags] = useState<string[]>(urlSelectedTags)
  const updateModeRef = useRef<'push' | 'replace'>('push')
  const lastTagInteractionAtRef = useRef(0)

  const deferredSearch = useDeferredValue(searchInput)

  const normalizedExperiments = useMemo(
    () =>
      experiments.map((experiment) => ({
        ...experiment,
        searchable: `${experiment.title} ${experiment.slug}`.toLowerCase(),
      })),
    []
  )

  useEffect(() => {
    if (searchInput !== urlSearchInput) {
      setSearchInput(urlSearchInput)
    }

    if (!areEqualArrays(selectedTags, urlSelectedTags)) {
      setSelectedTags(urlSelectedTags)
    }
  }, [searchInput, selectedTags, urlSearchInput, urlSelectedTags])

  useEffect(() => {
    const normalizedSelectedTags = normalizeTags(selectedTags)
    const trimmedSearch = searchInput.trim()

    const currentSearch = searchParams.get(SEARCH_PARAM) ?? ''
    const currentTags = normalizeTags(
      searchParams
        .getAll(TAG_PARAM)
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0 && validTags.has(tag))
    )

    if (trimmedSearch === currentSearch && areEqualArrays(normalizedSelectedTags, currentTags)) {
      return
    }

    const nextParams = new URLSearchParams(searchParams.toString())

    nextParams.delete(SEARCH_PARAM)
    nextParams.delete(TAG_PARAM)

    if (trimmedSearch.length > 0) {
      nextParams.set(SEARCH_PARAM, trimmedSearch)
    }

    normalizedSelectedTags.forEach((tag) => nextParams.append(TAG_PARAM, tag))

    const queryString = nextParams.toString()
    const nextUrl = queryString.length > 0 ? `${pathname}?${queryString}` : pathname

    if (updateModeRef.current === 'replace') {
      router.replace(nextUrl, { scroll: false })
    } else {
      router.push(nextUrl, { scroll: false })
    }

    updateModeRef.current = 'push'
  }, [pathname, router, searchInput, searchParams, selectedTags, validTags])

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>()

    experiments.forEach((experiment) => {
      experiment.tags.forEach((tag) => {
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
      })
    })

    return Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0]))
  }, [])

  const filteredExperiments = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase()

    return normalizedExperiments.filter((experiment) => {
      const matchesQuery = query.length === 0 || experiment.searchable.includes(query)
      // Multi-tag behavior is AND on purpose: users can narrow to experiments
      // that include every selected tag.
      const matchesTags =
        selectedTags.length === 0 || selectedTags.every((tag) => experiment.tags.includes(tag))

      return matchesQuery && matchesTags
    })
  }, [deferredSearch, normalizedExperiments, selectedTags])

  const toggleTag = (tag: string) => {
    const now = Date.now()
    updateModeRef.current = now - lastTagInteractionAtRef.current < 800 ? 'replace' : 'push'
    lastTagInteractionAtRef.current = now

    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((selected) => selected !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    updateModeRef.current = 'push'
    setSearchInput('')
    setSelectedTags([])
  }

  const hasActiveFilters = searchInput.trim().length > 0 || selectedTags.length > 0
  const currentQueryString = searchParams.toString()

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-5xl">
        <nav className="mb-6 sm:mb-8">
          <Link href="/" className="text-blue-600 hover:underline dark:text-blue-400">
            ← Back to Home
          </Link>
        </nav>

        <section className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Experiments</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
            Showing {filteredExperiments.length} of {experiments.length}
          </p>
        </section>

        <section className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:mb-8 sm:p-5">
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="experiment-search" className="mb-2 block text-sm font-medium">
                Quick search (title + slug)
              </label>
              <input
                id="experiment-search"
                type="text"
                placeholder="e.g. lissajous, viz-005"
                value={searchInput}
                onChange={(event) => {
                  updateModeRef.current = 'replace'
                  setSearchInput(event.target.value)
                }}
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none ring-blue-500 transition focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
              <svg
                className="pointer-events-none absolute left-3 top-[42px] h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Filter tags (AND)</p>
              <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
                {tagCounts.map(([tag, count]) => {
                  const selected = selectedTags.includes(tag)

                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`shrink-0 rounded-full border px-3 py-1.5 text-sm transition ${
                        selected
                          ? 'border-blue-500 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                          : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                      aria-pressed={selected}
                      aria-label={`${tag} tag (${count} experiments)`}
                    >
                      {tag}
                      <span className="ml-1 opacity-75">({count})</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex w-fit items-center rounded-md border border-transparent px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                Clear search & tags
              </button>
            )}
          </div>
        </section>

        {filteredExperiments.length === 0 ? (
          <section className="rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
            <h2 className="text-lg font-semibold">No matching experiments</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Try a different keyword or remove one of the selected tags.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Reset filters
              </button>
            )}
          </section>
        ) : (
          <section className="grid gap-4">
            {filteredExperiments.map((experiment) => (
              <Link
                key={experiment.id}
                href={
                  currentQueryString.length > 0
                    ? `/experiments/${experiment.slug}?${currentQueryString}`
                    : `/experiments/${experiment.slug}`
                }
                className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold sm:text-2xl">{experiment.title}</h2>
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium uppercase text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {experiment.category}
                      </span>
                    </div>
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                      {experiment.description}
                    </p>

                    <div className="mb-3 flex flex-wrap gap-2">
                      {experiment.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                      <span>{experiment.slug}</span>
                      <span>•</span>
                      <span>{experiment.createdAt}</span>
                      <span>•</span>
                      <span>{experiment.status}</span>
                    </div>
                  </div>

                  <svg
                    className="mt-1 h-5 w-5 shrink-0 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  )
}
