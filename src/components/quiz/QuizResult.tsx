'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/stores/quizStore';
import { useFlashcardStore } from '@/stores/flashcardStore';
import { Button } from '@/components/ui/Button';
import { getTermById } from '@/lib/data';
import { Trophy, RotateCcw, BookOpen } from 'lucide-react';

export function QuizResult() {
  const router = useRouter();
  const { score, questions, answers, incorrectTermIds, startQuizFromIds, config, reset } = useQuizStore();
  const { startSessionFromIds } = useFlashcardStore();

  const total = questions.length;
  const correct = Math.round((score / 100) * total);

  const handleRetryWrong = () => {
    if (incorrectTermIds.length === 0) return;
    startQuizFromIds(incorrectTermIds, config?.quizType ?? 'multiple-choice');
    router.push('/quiz/session');
  };

  const handleFlashcardWrong = () => {
    if (incorrectTermIds.length === 0) return;
    startSessionFromIds(incorrectTermIds);
    router.push('/flashcard/review');
  };

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8">
      <Trophy size={64} className={score >= 70 ? 'text-yellow-400' : 'text-gray-300'} />
      <div className="text-center">
        <p className="text-4xl font-bold text-gray-900">{score}점</p>
        <p className="text-gray-500 mt-1">{total}문제 중 {correct}개 정답</p>
      </div>

      {incorrectTermIds.length > 0 && (
        <div className="w-full bg-red-50 rounded-2xl p-4 border border-red-100">
          <p className="text-sm font-semibold text-red-700 mb-3">틀린 용어 ({incorrectTermIds.length}개)</p>
          <ul className="flex flex-col gap-1.5 mb-4">
            {incorrectTermIds.map((id) => {
              const term = getTermById(id);
              return (
                <li key={id} className="text-sm text-red-600 font-medium">
                  • {term?.term ?? id}
                </li>
              );
            })}
          </ul>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={handleFlashcardWrong} className="flex-1">
              <BookOpen size={15} className="mr-1.5" />
              다시 보기
            </Button>
            <Button variant="primary" size="sm" onClick={handleRetryWrong} className="flex-1">
              <RotateCcw size={15} className="mr-1.5" />
              다시 풀기
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2.5 w-full">
        <Button size="lg" onClick={() => router.push('/quiz')}>새 퀴즈 시작</Button>
        <Button variant="ghost" size="lg" onClick={() => router.push('/')}>홈으로</Button>
      </div>
    </div>
  );
}
