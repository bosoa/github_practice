'use client';

import { useEffect } from 'react';
import type { MedicalTerm } from '@/types';
import { useFlashcardStore } from '@/stores/flashcardStore';
import { useProgressStore } from '@/stores/progressStore';
import { FlashCard } from './FlashCard';
import { Button } from '@/components/ui/Button';
import { useSwipe } from '@/hooks/useSwipe';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface FlashCardDeckProps {
  terms: MedicalTerm[];
  onComplete: () => void;
}

export function FlashCardDeck({ terms, onComplete }: FlashCardDeckProps) {
  const { sessionTerms, currentIndex, isFlipped, isComplete, startSession, flip, markResult, next } =
    useFlashcardStore();
  const { updateFlashcard } = useProgressStore();

  useEffect(() => {
    startSession(terms);
  }, []);

  const handleMark = (status: 'mastered' | 'learning') => {
    const term = sessionTerms[currentIndex];
    if (!term) return;
    markResult(term.id, status);
    updateFlashcard(term.id, status);
    next();
  };

  const { onTouchStart, onTouchEnd } = useSwipe({
    onSwipeRight: () => handleMark('mastered'),
    onSwipeLeft: () => handleMark('learning'),
  });

  if (isComplete || sessionTerms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-12 px-4">
        <CheckCircle2 size={64} className="text-green-500" />
        <p className="text-xl font-bold text-gray-900">학습 완료!</p>
        <Button onClick={onComplete} size="lg">결과 확인하기</Button>
      </div>
    );
  }

  const currentTerm = sessionTerms[currentIndex];

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="text-center text-sm text-gray-400">
        {currentIndex + 1} / {sessionTerms.length}
      </div>

      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <FlashCard term={currentTerm} isFlipped={isFlipped} onFlip={flip} />
      </div>

      {isFlipped && (
        <div className="flex gap-3 mt-2">
          <Button variant="secondary" size="lg" onClick={() => handleMark('learning')} className="flex-1">
            <RotateCcw size={18} className="mr-2" />
            다시 보기
          </Button>
          <Button variant="primary" size="lg" onClick={() => handleMark('mastered')} className="flex-1">
            <CheckCircle2 size={18} className="mr-2" />
            알겠음
          </Button>
        </div>
      )}

      <p className="text-xs text-center text-gray-400">
        {isFlipped ? '← 다시 보기 | 알겠음 →' : '탭하여 정의 확인'}
      </p>
    </div>
  );
}
