'use client';

import { useRouter } from 'next/navigation';
import { useFlashcardStore } from '@/stores/flashcardStore';
import { FlashCardDeck } from '@/components/flashcard/FlashCardDeck';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { useEffect } from 'react';

export default function FlashcardSessionPage() {
  const router = useRouter();
  const { sessionTerms, results, isComplete, reset } = useFlashcardStore();

  useEffect(() => {
    if (sessionTerms.length === 0 && !isComplete) {
      router.replace('/flashcard');
    }
  }, [sessionTerms.length, isComplete, router]);

  if (sessionTerms.length === 0) return null;

  const masteredCount = Object.values(results).filter((s) => s === 'mastered').length;
  const learningCount = Object.values(results).filter((s) => s === 'learning').length;

  const handleComplete = () => {
    // isComplete is already true at this point; just show inline summary
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center gap-6 px-4 py-12">
        <p className="text-2xl font-bold text-gray-900">세션 완료!</p>
        <div className="flex gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-green-600">{masteredCount}</p>
            <p className="text-sm text-gray-500">알겠음</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-amber-500">{learningCount}</p>
            <p className="text-sm text-gray-500">다시 보기</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 w-full">
          {learningCount > 0 && (
            <Button
              size="lg"
              onClick={() => {
                const ids = Object.entries(results)
                  .filter(([, s]) => s === 'learning')
                  .map(([id]) => id);
                useFlashcardStore.getState().startSessionFromIds(ids);
              }}
            >
              틀린 카드 다시 보기 ({learningCount})
            </Button>
          )}
          <Button variant="secondary" size="lg" onClick={() => { reset(); router.push('/flashcard'); }}>
            처음으로
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4">
      <PageHeader title="플래시카드" />
      <div className="pt-4">
        <FlashCardDeck terms={sessionTerms} onComplete={handleComplete} />
      </div>
    </div>
  );
}
