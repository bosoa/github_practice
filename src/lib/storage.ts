import type { UserProgress, TermProgress, QuizSession, FlashcardStatus } from '@/types';

const STORAGE_KEYS = {
  PROGRESS: 'medterm_progress_v1',
} as const;

const SCHEMA_VERSION = 1;

function defaultProgress(): UserProgress {
  return { version: SCHEMA_VERSION, terms: {}, quizHistory: [] };
}

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as UserProgress;
    if (parsed.version !== SCHEMA_VERSION) return defaultProgress();
    return parsed;
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch {
    // localStorage quota exceeded — silently fail
  }
}

export function getTermProgress(termId: string): TermProgress {
  const progress = loadProgress();
  return (
    progress.terms[termId] ?? {
      termId,
      flashcardStatus: 'unseen',
      quizCorrectCount: 0,
      quizAttemptCount: 0,
      lastSeenAt: new Date().toISOString(),
      bookmarked: false,
    }
  );
}

export function updateFlashcardStatus(termId: string, status: FlashcardStatus): void {
  const progress = loadProgress();
  const existing = getTermProgress(termId);
  progress.terms[termId] = { ...existing, flashcardStatus: status, lastSeenAt: new Date().toISOString() };
  saveProgress(progress);
}

export function toggleBookmark(termId: string): boolean {
  const progress = loadProgress();
  const existing = getTermProgress(termId);
  const newBookmarked = !existing.bookmarked;
  progress.terms[termId] = { ...existing, bookmarked: newBookmarked };
  saveProgress(progress);
  return newBookmarked;
}

export function recordQuizResult(termId: string, correct: boolean): void {
  const progress = loadProgress();
  const existing = getTermProgress(termId);
  progress.terms[termId] = {
    ...existing,
    quizCorrectCount: existing.quizCorrectCount + (correct ? 1 : 0),
    quizAttemptCount: existing.quizAttemptCount + 1,
    lastSeenAt: new Date().toISOString(),
  };
  saveProgress(progress);
}

export function saveQuizSession(session: QuizSession): void {
  const progress = loadProgress();
  progress.quizHistory = [session, ...progress.quizHistory].slice(0, 50);
  saveProgress(progress);
}

export function clearProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
}
