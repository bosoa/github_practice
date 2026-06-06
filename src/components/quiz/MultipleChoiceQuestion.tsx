import type { QuizQuestion } from '@/types';
import { cn } from '@/lib/utils';

interface MultipleChoiceQuestionProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  onSelect: (answer: string) => void;
}

export function MultipleChoiceQuestion({ question, selectedAnswer, onSelect }: MultipleChoiceQuestionProps) {
  const answered = selectedAnswer !== null;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-semibold text-gray-900 leading-snug">{question.question}</p>
      <div className="flex flex-col gap-2.5">
        {question.choices?.map((choice, i) => {
          const isCorrect = choice === question.correctAnswer;
          const isSelected = choice === selectedAnswer;
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => onSelect(choice)}
              className={cn(
                'w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-colors touch-manipulation',
                !answered && 'border-gray-200 bg-white hover:bg-gray-50 active:bg-gray-100',
                answered && isCorrect && 'border-green-400 bg-green-50 text-green-800',
                answered && isSelected && !isCorrect && 'border-red-400 bg-red-50 text-red-800',
                answered && !isSelected && !isCorrect && 'border-gray-100 bg-gray-50 text-gray-400'
              )}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}
