'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { QuizConfig, Category, Difficulty, QuizType } from '@/types';
import { useQuizStore } from '@/stores/quizStore';
import { Button } from '@/components/ui/Button';
import { CATEGORY_LABELS, DIFFICULTY_LABELS, filterTerms } from '@/lib/data';
import { cn } from '@/lib/utils';

const CATEGORIES: Array<{ value: Category | 'all'; label: string }> = [
  { value: 'all', label: '전체' },
  ...Object.entries(CATEGORY_LABELS).map(([k, v]) => ({ value: k as Category, label: v })),
];

export function QuizSetup() {
  const router = useRouter();
  const { setConfig, startQuiz } = useQuizStore();
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [quizType, setQuizType] = useState<QuizType>('multiple-choice');

  const available = filterTerms(category, difficulty).length;
  const actual = Math.min(questionCount, available);

  const handleStart = () => {
    const config: QuizConfig = { category, difficulty, questionCount: actual, quizType };
    setConfig(config);
    startQuiz();
    router.push('/quiz/session');
  };

  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      <Section title="카테고리">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ value, label }) => (
            <Chip key={value} active={category === value} onClick={() => setCategory(value)}>{label}</Chip>
          ))}
        </div>
      </Section>

      <Section title="난이도">
        <div className="flex gap-2">
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((d) => (
            <Chip key={d} active={difficulty === d} onClick={() => setDifficulty(d)}>
              {d === 'all' ? '전체' : DIFFICULTY_LABELS[d]}
            </Chip>
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

      {/* Summary */}
      <div className="bg-blue-50 rounded-2xl p-4 flex items-center justify-between border border-blue-100">
        <div>
          <p className="text-sm font-semibold text-blue-800">출제 예정</p>
          <p className="text-xs text-blue-500 mt-0.5">선택 조건에 해당하는 용어 {available}개 중</p>
        </div>
        <p className="text-3xl font-extrabold text-blue-700">{actual}<span className="text-base font-semibold ml-0.5">문제</span></p>
      </div>

      <Button size="lg" onClick={handleStart} disabled={available === 0}>
        퀴즈 시작
      </Button>
      {available === 0 && (
        <p className="text-xs text-center text-red-400">해당 조건의 용어가 없습니다</p>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
      <p className="text-sm font-bold text-gray-800">{title}</p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all touch-manipulation',
        active
          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
      )}
    >
      {children}
    </button>
  );
}
