'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { QuizConfig, Category, Difficulty, QuizType } from '@/types';
import { useQuizStore } from '@/stores/quizStore';
import { Button } from '@/components/ui/Button';
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/lib/data';
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

export function QuizSetup() {
  const router = useRouter();
  const { setConfig, startQuiz } = useQuizStore();
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [quizType, setQuizType] = useState<QuizType>('multiple-choice');

  const handleStart = () => {
    const config: QuizConfig = { category, difficulty, questionCount, quizType };
    setConfig(config);
    startQuiz();
    router.push('/quiz/session');
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-4">
      <Section title="카테고리">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ value, label }) => (
            <Chip key={value} active={category === value} onClick={() => setCategory(value)}>{label}</Chip>
          ))}
        </div>
      </Section>

      <Section title="난이도">
        <div className="flex gap-2">
          {DIFFICULTIES.map(({ value, label }) => (
            <Chip key={value} active={difficulty === value} onClick={() => setDifficulty(value)}>{label}</Chip>
          ))}
        </div>
      </Section>

      <Section title="문제 수">
        <div className="flex gap-2">
          {[5, 10, 20].map((n) => (
            <Chip key={n} active={questionCount === n} onClick={() => setQuestionCount(n)}>{n}문제</Chip>
          ))}
        </div>
      </Section>

      <Section title="퀴즈 유형">
        <div className="flex gap-2">
          <Chip active={quizType === 'multiple-choice'} onClick={() => setQuizType('multiple-choice')}>사지선다</Chip>
          <Chip active={quizType === 'fill-in'} onClick={() => setQuizType('fill-in')}>빈칸 채우기</Chip>
        </div>
      </Section>

      <Button size="lg" onClick={handleStart} className="mt-2">퀴즈 시작</Button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-sm font-semibold text-gray-700">{title}</p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3.5 py-2 rounded-xl text-sm font-medium border transition-colors touch-manipulation',
        active
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
      )}
    >
      {children}
    </button>
  );
}
