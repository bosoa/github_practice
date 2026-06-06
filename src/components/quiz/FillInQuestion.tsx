'use client';

import { useState } from 'react';
import type { QuizQuestion } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface FillInQuestionProps {
  question: QuizQuestion;
  submitted: boolean;
  isCorrect: boolean | null;
  onSubmit: (answer: string) => void;
}

export function FillInQuestion({ question, submitted, isCorrect, onSubmit }: FillInQuestionProps) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSubmit(input.trim());
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-semibold text-gray-900 leading-snug">{question.question}</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && !submitted && handleSubmit()}
        disabled={submitted}
        placeholder="정의를 입력하세요..."
        className={cn(
          'w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors',
          'focus:border-blue-400 focus:ring-2 focus:ring-blue-100',
          submitted && isCorrect && 'border-green-400 bg-green-50',
          submitted && !isCorrect && 'border-red-400 bg-red-50'
        )}
        style={{ fontSize: '16px' }}
      />
      {submitted && (
        <div className={cn('text-sm rounded-xl px-4 py-3', isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
          {isCorrect ? '정답입니다!' : `정답: ${question.correctAnswer}`}
        </div>
      )}
      {!submitted && (
        <Button onClick={handleSubmit} disabled={!input.trim()}>제출</Button>
      )}
    </div>
  );
}
