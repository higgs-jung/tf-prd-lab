'use client'

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'tf-prd-lab-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites:', error);
      }
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = useCallback((experimentId: string) => {
    setFavorites(prev => {
      if (prev.includes(experimentId)) {
        return prev.filter(id => id !== experimentId);
      }
      return [...prev, experimentId];
    });
  }, []);

  const isFavorite = useCallback((experimentId: string) => {
    return favorites.includes(experimentId);
  }, [favorites]);

  const addFavorite = useCallback((experimentId: string) => {
    setFavorites(prev => {
      if (prev.includes(experimentId)) return prev;
      return [...prev, experimentId];
    });
  }, []);

  const removeFavorite = useCallback((experimentId: string) => {
    setFavorites(prev => prev.filter(id => id !== experimentId));
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    isLoaded,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };
}
