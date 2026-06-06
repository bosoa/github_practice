'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/stores/quizStore';
import { useProgressStore } from '@/stores/progressStore';
import { MultipleChoiceQuestion } from '@/components/quiz/MultipleChoiceQuestion';
import { FillInQuestion } from '@/components/quiz/FillInQuestion';
import { QuizResult } from '@/components/quiz/QuizResult';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { isCorrectAnswer } from '@/lib/quiz';
import { nanoid } from 'nanoid';

export default function QuizSessionPage() {
  const router = useRouter();
  const { questions, currentIndex, answers, isComplete, config, score, incorrectTermIds, submitAnswer } = useQuizStore();
  const { recordAnswer, addQuizSession } = useProgressStore();
  const [pendingAnswer, setPendingAnswer] = useState<string | null>(null);
  const [fillSubmitted, setFillSubmitted] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);

  useEffect(() => {
    if (questions.length === 0 && !isComplete) router.replace('/quiz');
  }, [questions.length, isComplete, router]);

  useEffect(() => {
    if (isComplete && !sessionSaved && config) {
      addQuizSession({
        id: nanoid(),
        config,
        questions,
        answers,
        score,
        incorrectTermIds,
        completedAt: new Date().toISOString(),
      });
      setSessionSaved(true);
    }
  }, [isComplete, sessionSaved, config, questions, answers, score, incorrectTermIds, addQuizSession]);

  useEffect(() => {
    setPendingAnswer(null);
    setFillSubmitted(false);
  }, [currentIndex]);

  if (isComplete) return <QuizResult />;
  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const isMultipleChoice = currentQ.quizType === 'multiple-choice';

  const handleSelect = (answer: string) => {
    if (pendingAnswer !== null) return;
    setPendingAnswer(answer);
    const correct = isCorrectAnswer(answer, currentQ.correctAnswer, currentQ.quizType);
    recordAnswer(currentQ.termId, correct);
  };

  const handleFillSubmit = (answer: string) => {
    setPendingAnswer(answer);
    setFillSubmitted(true);
    const correct = isCorrectAnswer(answer, currentQ.correctAnswer, currentQ.quizType);
    recordAnswer(currentQ.termId, correct);
  };

  const handleNext = () => {
    if (pendingAnswer !== null) submitAnswer(pendingAnswer);
  };

  const fillIsCorrect =
    fillSubmitted && pendingAnswer !== null
      ? isCorrectAnswer(pendingAnswer, currentQ.correctAnswer, currentQ.quizType)
      : null;

  return (
    <div>
      <PageHeader title={`${currentIndex + 1} / ${questions.length}`} />
      <div className="px-4 pt-4 pb-6 flex flex-col gap-6">
        <ProgressBar value={currentIndex} max={questions.length} color="blue" />

        {isMultipleChoice ? (
          <MultipleChoiceQuestion
            question={currentQ}
            selectedAnswer={pendingAnswer}
            onSelect={handleSelect}
          />
        ) : (
          <FillInQuestion
            question={currentQ}
            submitted={fillSubmitted}
            isCorrect={fillIsCorrect}
            onSubmit={handleFillSubmit}
          />
        )}

        {pendingAnswer !== null && (
          <Button size="lg" onClick={handleNext}>
            {currentIndex < questions.length - 1 ? '다음 문제' : '결과 보기'}
          </Button>
        )}
      </div>
    </div>
  );
}
