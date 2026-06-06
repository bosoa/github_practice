import type { MedicalTerm, QuizConfig, QuizQuestion, QuizType } from '@/types';
import { allTerms, filterTerms } from './data';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateChoices(correct: string, pool: MedicalTerm[], excludeId: string): string[] {
  const distractors = pool
    .filter((t) => t.id !== excludeId)
    .map((t) => t.definition.ko)
    .filter((d) => d !== correct);
  return shuffle([correct, ...shuffle(distractors).slice(0, 3)]);
}

function buildQuestion(term: MedicalTerm, pool: MedicalTerm[], quizType: QuizType): QuizQuestion {
  const correct = term.definition.ko;
  if (quizType === 'multiple-choice') {
    return {
      termId: term.id,
      question: `"${term.term}"의 뜻은?`,
      correctAnswer: correct,
      choices: generateChoices(correct, pool, term.id),
      quizType,
    };
  }
  return {
    termId: term.id,
    question: `"${term.term}"의 뜻을 입력하세요.`,
    correctAnswer: correct,
    quizType,
  };
}

export function generateQuestions(config: QuizConfig): QuizQuestion[] {
  const pool = filterTerms(config.category, config.difficulty);
  const selected = shuffle(pool).slice(0, config.questionCount);
  return selected.map((term) => buildQuestion(term, pool, config.quizType));
}

export function generateQuestionsFromIds(termIds: string[], quizType: QuizType): QuizQuestion[] {
  const terms = termIds.map((id) => allTerms.find((t) => t.id === id)).filter(Boolean) as MedicalTerm[];
  return terms.map((term) => buildQuestion(term, allTerms, quizType));
}

export function isCorrectAnswer(userAnswer: string, correctAnswer: string, quizType: QuizType): boolean {
  if (quizType === 'multiple-choice') return userAnswer === correctAnswer;
  return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
}

export function calcScore(questions: QuizQuestion[], answers: Record<number, string>): number {
  const correct = questions.filter((q, i) =>
    isCorrectAnswer(answers[i] ?? '', q.correctAnswer, q.quizType)
  ).length;
  return Math.round((correct / questions.length) * 100);
}

export function getIncorrectTermIds(questions: QuizQuestion[], answers: Record<number, string>): string[] {
  return questions
    .filter((q, i) => !isCorrectAnswer(answers[i] ?? '', q.correctAnswer, q.quizType))
    .map((q) => q.termId);
}
