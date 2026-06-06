'use client';

import { create } from 'zustand';
import type { UserProgress, FlashcardStatus, QuizSession, ProgressStats } from '@/types';
import {
  loadProgress,
  saveProgress,
  updateFlashcardStatus,
  toggleBookmark as storageToggleBookmark,
  recordQuizResult,
  saveQuizSession,
} from '@/lib/storage';
import { allTerms } from '@/lib/data';

interface ProgressStoreState {
  progress: UserProgress;
  initialize: () => void;
  updateFlashcard: (termId: string, status: FlashcardStatus) => void;
  toggleBookmark: (termId: string) => void;
  recordAnswer: (termId: string, correct: boolean) => void;
  addQuizSession: (session: QuizSession) => void;
  getStats: () => ProgressStats;
}

export const useProgressStore = create<ProgressStoreState>((set, get) => ({
  progress: { version: 1, terms: {}, quizHistory: [] },

  initialize: () => set({ progress: loadProgress() }),

  updateFlashcard: (termId, status) => {
    updateFlashcardStatus(termId, status);
    set({ progress: loadProgress() });
  },

  toggleBookmark: (termId) => {
    storageToggleBookmark(termId);
    set({ progress: loadProgress() });
  },

  recordAnswer: (termId, correct) => {
    recordQuizResult(termId, correct);
    set({ progress: loadProgress() });
  },

  addQuizSession: (session) => {
    saveQuizSession(session);
    set({ progress: loadProgress() });
  },

  getStats: (): ProgressStats => {
    const { progress } = get();
    const termEntries = Object.values(progress.terms);
    const masteredCount = termEntries.filter((t) => t.flashcardStatus === 'mastered').length;
    const learningCount = termEntries.filter((t) => t.flashcardStatus === 'learning').length;
    const bookmarkedCount = termEntries.filter((t) => t.bookmarked).length;
    const quizHistory = progress.quizHistory;
    const averageScore =
      quizHistory.length > 0
        ? Math.round(quizHistory.reduce((sum, s) => sum + s.score, 0) / quizHistory.length)
        : 0;
    return {
      totalTerms: allTerms.length,
      masteredCount,
      learningCount,
      bookmarkedCount,
      totalQuizzesTaken: quizHistory.length,
      averageScore,
    };
  },
}));
