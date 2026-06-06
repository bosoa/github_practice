import { useState, useMemo } from 'react';
import type { Category, Difficulty } from '@/types';
import { searchTerms } from '@/lib/search';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');

  const results = useMemo(
    () => searchTerms(query, { category: categoryFilter, difficulty: difficultyFilter }),
    [query, categoryFilter, difficultyFilter]
  );

  return { query, setQuery, categoryFilter, setCategoryFilter, difficultyFilter, setDifficultyFilter, results };
}
