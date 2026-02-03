'use client';

import { useState, useMemo } from 'react';

// Sample data for the demo
interface Item {
  id: string;
  name: string;
  category: 'electronics' | 'clothing' | 'food';
  tags: string[];
  price: number;
}

const sampleItems: Item[] = [
  { id: '1', name: 'Wireless Headphones', category: 'electronics', tags: ['audio', 'wireless', 'bluetooth'], price: 99 },
  { id: '2', name: 'Cotton T-Shirt', category: 'clothing', tags: ['casual', 'cotton', 'summer'], price: 29 },
  { id: '3', name: 'Organic Apples', category: 'food', tags: ['organic', 'fresh', 'healthy'], price: 5 },
  { id: '4', name: 'Smart Watch', category: 'electronics', tags: ['wearable', 'smart', 'fitness'], price: 199 },
  { id: '5', name: 'Denim Jeans', category: 'clothing', tags: ['casual', 'denim', 'durable'], price: 59 },
  { id: '6', name: 'Green Tea', category: 'food', tags: ['organic', 'beverage', 'healthy'], price: 8 },
  { id: '7', name: 'Bluetooth Speaker', category: 'electronics', tags: ['audio', 'wireless', 'portable'], price: 79 },
  { id: '8', name: 'Winter Jacket', category: 'clothing', tags: ['warm', 'winter', 'waterproof'], price: 129 },
  { id: '9', name: 'Dark Chocolate', category: 'food', tags: ['sweet', 'organic', 'dessert'], price: 12 },
  { id: '10', name: 'Laptop Stand', category: 'electronics', tags: ['accessory', 'ergonomic', 'office'], price: 45 },
];

const categories = ['all', 'electronics', 'clothing', 'food'] as const;
const allTags = Array.from(new Set(sampleItems.flatMap(item => item.tags)));

export default function SearchFilterDemo() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');

  const filteredItems = useMemo(() => {
    let result = sampleItems.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTags.length > 0 && !selectedTags.some(tag => item.tags.includes(tag))) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesName && !matchesTags) {
          return false;
        }
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      }
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [selectedCategory, selectedTags, searchQuery, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTags([]);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedTags.length > 0 || searchQuery !== '';

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search & Filter Demo</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore {filteredItems.length} of {sampleItems.length} items
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {cat}
                  {cat !== 'all' && (
                    <span className="ml-2 text-xs opacity-75">
                      ({sampleItems.filter(i => i.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-2 border-green-500'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price">Price (Low to High)</option>
            </select>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
                  >
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-sm flex items-center gap-1 hover:bg-green-200"
                  >
                    {tag} ×
                  </button>
                ))}
                {searchQuery && (
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-sm"
                  >
                    Search: "{searchQuery}"
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-800 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No items found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${item.price}
                  </span>
                </div>

                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium capitalize mb-3 ${
                    item.category === 'electronics'
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                      : item.category === 'clothing'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                  }`}
                >
                  {item.category}
                </span>

                <div className="flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Demo Info */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100">
            How it works
          </h2>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
            <li>Real-time filtering with useMemo for performance</li>
            <li>Multi-select tags with AND logic</li>
            <li>Category filter with OR logic</li>
            <li>Search across name and tags</li>
            <li>Sort by name or price</li>
            <li>Empty state handling</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
