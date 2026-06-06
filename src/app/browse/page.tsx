'use client';

import { useSearch } from '@/hooks/useSearch';
import { SearchBar } from '@/components/browse/SearchBar';
import { TermCard } from '@/components/browse/TermCard';
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/lib/data';
import type { Category, Difficulty } from '@/types';
import { cn } from '@/lib/utils';

const CATEGORIES: Array<{ value: Category | 'all'; label: string }> = [
  { value: 'all', label: '전체' },
  ...Object.entries(CATEGORY_LABELS).map(([k, v]) => ({ value: k as Category, label: v })),
];

const DIFFICULTIES: Array<{ value: Difficulty | 'all'; label: string }> = [
  { value: 'all', label: '전체' },
  { value: 'beginner', label: '초급' },
  { value: 'intermediate', label: '중급' },
  { value: 'advanced', label: '고급' },
];

export default function BrowsePage() {
  const { query, setQuery, categoryFilter, setCategoryFilter, difficultyFilter, setDifficultyFilter, results } =
    useSearch();

  return (
    <div className="flex flex-col gap-0 pt-0">
      {/* Sticky header + search */}
      <div className="sticky top-0 z-10 bg-gray-50 pt-4 pb-3 px-4 border-b border-gray-100 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-3">용어 검색</h1>
        <SearchBar value={query} onChange={setQuery} />
        <div className="flex gap-1.5 mt-2.5 overflow-x-auto pb-0.5 scrollbar-hide">
          {CATEGORIES.map(({ value, label }) => (
            <FilterChip key={value} active={categoryFilter === value} onClick={() => setCategoryFilter(value)}>
              {label}
            </FilterChip>
          ))}
        </div>
        <div className="flex gap-1.5 mt-1.5">
          {DIFFICULTIES.map(({ value, label }) => (
            <FilterChip key={value} active={difficultyFilter === value} onClick={() => setDifficultyFilter(value)}>
              {label}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="px-4 pt-3 pb-4">
        <p className="text-xs text-gray-400 mb-2.5">{results.length}개 결과</p>
        <div className="flex flex-col gap-2">
          {results.map((term) => (
            <TermCard key={term.id} term={term} />
          ))}
          {results.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm">검색 결과가 없습니다</p>
              <p className="text-gray-300 text-xs mt-1">다른 키워드로 검색해 보세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all touch-manipulation flex-shrink-0',
        active
          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
          : 'bg-white text-gray-500 border-gray-200'
      )}
    >
      {children}
    </button>
  );
}
