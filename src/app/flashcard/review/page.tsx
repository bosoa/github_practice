'use client';

import { useRouter } from 'next/navigation';
import { useFlashcardStore } from '@/stores/flashcardStore';
import { FlashCardDeck } from '@/components/flashcard/FlashCardDeck';
import { PageHeader } from '@/components/layout/PageHeader';
import { useEffect } from 'react';

export default function FlashcardReviewPage() {
  const router = useRouter();
  const { sessionTerms } = useFlashcardStore();

  useEffect(() => {
    if (sessionTerms.length === 0) router.replace('/quiz');
  }, [sessionTerms.length, router]);

  if (sessionTerms.length === 0) return null;

  return (
    <div className="pt-4">
      <PageHeader title="오답 복습" />
      <div className="pt-4">
        <FlashCardDeck terms={sessionTerms} onComplete={() => router.push('/')} />
      </div>
    </div>
  );
}
