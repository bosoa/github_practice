import { create } from 'zustand';
import type { QuizConfig, QuizQuestion, QuizType } from '@/types';
import { generateQuestions, generateQuestionsFromIds, calcScore, getIncorrectTermIds } from '@/lib/quiz';

interface QuizState {
  config: QuizConfig | null;
  questions: QuizQuestion[];
  answers: Record<number, string>;
  currentIndex: number;
  isComplete: boolean;
  score: number;
  incorrectTermIds: string[];

  setConfig: (config: QuizConfig) => void;
  startQuiz: () => void;
  startQuizFromIds: (termIds: string[], quizType: QuizType) => void;
  submitAnswer: (answer: string) => void;
  complete: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  config: null,
  questions: [],
  answers: {},
  currentIndex: 0,
  isComplete: false,
  score: 0,
  incorrectTermIds: [],

  setConfig: (config) => set({ config }),

  startQuiz: () => {
    const { config } = get();
    if (!config) return;
    const questions = generateQuestions(config);
    set({ questions, answers: {}, currentIndex: 0, isComplete: false, score: 0, incorrectTermIds: [] });
  },

  startQuizFromIds: (termIds, quizType) => {
    const questions = generateQuestionsFromIds(termIds, quizType);
    set({ questions, answers: {}, currentIndex: 0, isComplete: false, score: 0, incorrectTermIds: [] });
  },

  submitAnswer: (answer) => {
    const { currentIndex, answers, questions } = get();
    const newAnswers = { ...answers, [currentIndex]: answer };
    const isLast = currentIndex >= questions.length - 1;
    if (isLast) {
      const score = calcScore(questions, newAnswers);
      const incorrectTermIds = getIncorrectTermIds(questions, newAnswers);
      set({ answers: newAnswers, isComplete: true, score, incorrectTermIds });
    } else {
      set({ answers: newAnswers, currentIndex: currentIndex + 1 });
    }
  },

  complete: () => {
    const { questions, answers } = get();
    const score = calcScore(questions, answers);
    const incorrectTermIds = getIncorrectTermIds(questions, answers);
    set({ isComplete: true, score, incorrectTermIds });
  },

  reset: () => set({ config: null, questions: [], answers: {}, currentIndex: 0, isComplete: false, score: 0, incorrectTermIds: [] }),
}));
