'use client'

import Link from "next/link";
import { useState } from "react";
import { experiments } from "../../experiments/index";
import { useFavorites } from "../../hooks/useFavorites";

export default function ExperimentsPage() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  const filteredExperiments = filter === 'favorites' 
    ? experiments.filter(exp => isFavorite(exp.id))
    : experiments;

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
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Explore our collection of product experiments
        </p>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All ({experiments.length})
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              filter === 'favorites'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            ⭐ Favorites ({favorites.length})
          </button>
        </div>

        {/* Empty State for Favorites */}
        {filter === 'favorites' && favorites.length === 0 && (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-4xl mb-4">⭐</p>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Click the star button on any experiment to add it to your favorites
            </p>
            <button
              onClick={() => setFilter('all')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Experiments
            </button>
          </div>
        )}

        {/* Experiments Grid */}
        <div className="grid gap-4">
          {filteredExperiments.map((experiment) => (
            <div
              key={experiment.id}
              className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <Link
                  href={`/experiments/${experiment.slug}`}
                  className="flex-1"
                >
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
                </Link>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(experiment.id)}
                  className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={isFavorite(experiment.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <svg
                    className={`w-6 h-6 transition-colors ${
                      isFavorite(experiment.id)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-400 hover:text-yellow-400'
                    }`}
                    fill={isFavorite(experiment.id) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
