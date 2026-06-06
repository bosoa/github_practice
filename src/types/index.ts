export type EtymologyRole = 'prefix' | 'root' | 'suffix';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Category =
  | 'cardiovascular'
  | 'respiratory'
  | 'digestive'
  | 'musculoskeletal'
  | 'neurological'
  | 'endocrine'
  | 'renal'
  | 'hematology'
  | 'immunology'
  | 'general';

export interface EtymologyElement {
  part: string;
  role: EtymologyRole;
  origin: string;
  meaning: string;
  examples?: string[];
}

export interface MedicalTerm {
  id: string;
  term: string;
  pronunciation: string;
  category: Category;
  difficulty: Difficulty;
  definition: { ko: string; en: string };
  etymology: EtymologyElement[];
  relatedTerms?: string[];
  mnemonics?: { ko: string; en: string };
  tags?: string[];
}

export interface EtymologyDictionaryEntry {
  id: string;
  part: string;
  role: EtymologyRole;
  origin: string;
  meaning: string;
  usedIn: string[];
}

export type FlashcardStatus = 'unseen' | 'learning' | 'mastered';

export interface TermProgress {
  termId: string;
  flashcardStatus: FlashcardStatus;
  quizCorrectCount: number;
  quizAttemptCount: number;
  lastSeenAt: string;
  bookmarked: boolean;
}

export interface UserProgress {
  version: number;
  terms: Record<string, TermProgress>;
  quizHistory: QuizSession[];
}

export type QuizType = 'multiple-choice' | 'fill-in';

export interface QuizConfig {
  category: Category | 'all';
  difficulty: Difficulty | 'all';
  questionCount: number;
  quizType: QuizType;
}

export interface QuizQuestion {
  termId: string;
  question: string;
  correctAnswer: string;
  choices?: string[];
  quizType: QuizType;
}

export interface QuizSession {
  id: string;
  config: QuizConfig;
  questions: QuizQuestion[];
  answers: Record<number, string>;
  score: number;
  incorrectTermIds: string[];
  completedAt: string;
}

export interface ProgressStats {
  totalTerms: number;
  masteredCount: number;
  learningCount: number;
  bookmarkedCount: number;
  totalQuizzesTaken: number;
  averageScore: number;
}
