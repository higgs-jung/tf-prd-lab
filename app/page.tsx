'use client';

import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { experiments, Experiment } from "../experiments/index";
import { getDeterministicExperimentByDate } from "../lib/todays-experiment";

// Get today's experiment based on local date (consistent for 24 hours)
function getTodaysExperiment(): Experiment | null {
  return getDeterministicExperimentByDate(experiments);
}

// Get a random experiment different from current
function getRandomExperiment(currentId: string): Experiment | null {
  const others = experiments.filter((e) => e.id !== currentId);
  if (others.length === 0) return null;
  return others[Math.floor(Math.random() * others.length)];
}

export default function Home() {
  const [todaysExperiment, setTodaysExperiment] = useState<Experiment | null>(null);
  const [isRandom, setIsRandom] = useState(false);

  useEffect(() => {
    setTodaysExperiment(getTodaysExperiment());
  }, []);

  const handleRandomPick = useCallback(() => {
    if (!todaysExperiment) return;

    const nextExperiment = getRandomExperiment(todaysExperiment.id);
    if (!nextExperiment) return;

    setTodaysExperiment(nextExperiment);
    setIsRandom(true);
  }, [todaysExperiment]);

  const handleResetToToday = useCallback(() => {
    setTodaysExperiment(getTodaysExperiment());
    setIsRandom(false);
  }, []);

  const categoryColor = useMemo(() => {
    if (!todaysExperiment) return 'bg-gray-100';
    switch (todaysExperiment.category) {
      case 'viz': return 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700';
      case 'tool': return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700';
      case 'weird': return 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-green-700';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  }, [todaysExperiment]);

  if (!todaysExperiment) {
    return (
      <main className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to TF PRD Lab 2026
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          A product research sandbox for rapid experimentation
        </p>

        {/* 오늘의 실험 - Today's Experiment */}
        <section className={`mb-12 p-8 rounded-2xl border-2 ${categoryColor} relative overflow-hidden`}>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-medium shadow">
              {isRandom ? '🎲 Random Pick' : '📅 Today\'s Experiment'}
            </span>
          </div>

          <div className="mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {todaysExperiment.category}
            </span>
          </div>

          <h2 className="text-3xl font-bold mb-3">
            {todaysExperiment.title}
          </h2>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            {todaysExperiment.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {todaysExperiment.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm shadow"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/experiments/${todaysExperiment.slug}`}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try It Now →
            </Link>

            <Link
              href="/changelog"
              className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              최근 업데이트 보기
            </Link>

            <button
              onClick={handleRandomPick}
              className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              🎲 랜덤 실험 뽑기
            </button>

            {isRandom && (
              <button
                onClick={handleResetToToday}
                className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                ↩️ 오늘의 실험으로 돌아가기
              </button>
            )}
          </div>
        </section>

        {/* Navigation */}
        <nav className="mb-8 flex flex-wrap gap-4">
          <Link
            href="/experiments"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            View All Experiments
          </Link>
          <Link
            href="/about"
            className="rounded-lg bg-gray-200 px-6 py-3 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            About
          </Link>
          <Link
            href="/changelog"
            className="rounded-lg bg-gray-200 px-6 py-3 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Changelog
          </Link>
        </nav>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600">{experiments.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Experiments</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600">{categories.length - 1}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600">{allTags.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Tags</div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">Quick Start</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Try the <strong>오늘의 실험</strong> (Today&apos;s Experiment) above</li>
            <li>Browse all <Link href="/experiments" className="text-blue-600 dark:text-blue-400 hover:underline">Experiments</Link></li>
            <li>Check recent updates in <Link href="/changelog" className="text-blue-600 dark:text-blue-400 hover:underline">Changelog</Link></li>
            <li>Learn more <Link href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">About</Link> this project</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

// Import categories and allTags for stats
import { categories, allTags } from "../experiments/index";
