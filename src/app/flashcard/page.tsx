'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { allTerms, CATEGORY_LABELS } from '@/lib/data';
import { loadProgress } from '@/lib/storage';
import { useFlashcardStore } from '@/stores/flashcardStore';
import { useProgressStore } from '@/stores/progressStore';
import { Button } from '@/components/ui/Button';
import type { Category, MedicalTerm } from '@/types';
import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';

const CATEGORIES: Array<{ value: Category | 'all'; label: string }> = [
  { value: 'all', label: '전체' },
  ...Object.entries(CATEGORY_LABELS).map(([k, v]) => ({ value: k as Category, label: v })),
];

export default function FlashcardPage() {
  const router = useRouter();
  const { startSession } = useFlashcardStore();
  const { initialize } = useProgressStore();
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const getFilteredTerms = (): MedicalTerm[] => {
    const progress = loadProgress();
    let terms = category === 'all' ? allTerms : allTerms.filter((t) => t.category === category);
    if (bookmarkedOnly) {
      terms = terms.filter((t) => progress.terms[t.id]?.bookmarked);
    }
    return terms;
  };

  const handleStart = () => {
    const terms = getFilteredTerms();
    if (terms.length === 0) return;
    startSession(terms);
    router.push('/flashcard/session');
  };

  const filteredCount = getFilteredTerms().length;

  return (
    <div className="px-4 pt-6 flex flex-col gap-5">
      <h1 className="text-xl font-bold text-gray-900">플래시카드</h1>

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2.5">카테고리</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setCategory(value)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-sm font-medium border transition-colors touch-manipulation',
                category === value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setBookmarkedOnly((v) => !v)}
        className={cn(
          'flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors touch-manipulation w-fit',
          bookmarkedOnly ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-200 text-gray-600'
        )}
      >
        <Bookmark size={16} className={bookmarkedOnly ? 'fill-blue-600 text-blue-600' : ''} />
        북마크만 보기
      </button>

      <div className="bg-gray-100 rounded-xl p-4 text-center">
        <p className="text-3xl font-bold text-gray-900">{filteredCount}</p>
        <p className="text-sm text-gray-500 mt-1">선택된 용어</p>
      </div>

      <Button size="lg" onClick={handleStart} disabled={filteredCount === 0}>
        학습 시작
      </Button>
    </div>
  );
}
