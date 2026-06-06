import { create } from 'zustand';
import type { MedicalTerm, FlashcardStatus } from '@/types';
import { getTermsByIds } from '@/lib/data';

interface FlashcardResult {
  termId: string;
  status: FlashcardStatus;
}

interface FlashcardState {
  sessionTerms: MedicalTerm[];
  currentIndex: number;
  isFlipped: boolean;
  results: Record<string, FlashcardStatus>;
  isComplete: boolean;

  startSession: (terms: MedicalTerm[]) => void;
  startSessionFromIds: (termIds: string[]) => void;
  flip: () => void;
  markResult: (termId: string, status: FlashcardStatus) => void;
  next: () => void;
  reset: () => void;
  getResults: () => FlashcardResult[];
}

export const useFlashcardStore = create<FlashcardState>((set, get) => ({
  sessionTerms: [],
  currentIndex: 0,
  isFlipped: false,
  results: {},
  isComplete: false,

  startSession: (terms) => set({ sessionTerms: terms, currentIndex: 0, isFlipped: false, results: {}, isComplete: false }),
  startSessionFromIds: (termIds) => {
    const terms = getTermsByIds(termIds);
    set({ sessionTerms: terms, currentIndex: 0, isFlipped: false, results: {}, isComplete: false });
  },
  flip: () => set((s) => ({ isFlipped: !s.isFlipped })),
  markResult: (termId, status) => set((s) => ({ results: { ...s.results, [termId]: status } })),
  next: () =>
    set((s) => {
      const nextIndex = s.currentIndex + 1;
      if (nextIndex >= s.sessionTerms.length) return { isComplete: true, isFlipped: false };
      return { currentIndex: nextIndex, isFlipped: false };
    }),
  reset: () => set({ sessionTerms: [], currentIndex: 0, isFlipped: false, results: {}, isComplete: false }),
  getResults: () => {
    const { results } = get();
    return Object.entries(results).map(([termId, status]) => ({ termId, status }));
  },
}));
