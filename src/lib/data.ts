import termsData from '@/data/terms.json';
import etymologyData from '@/data/etymology-elements.json';
import type { MedicalTerm, EtymologyDictionaryEntry, Category, Difficulty } from '@/types';

export const allTerms: MedicalTerm[] = termsData as MedicalTerm[];
export const allEtymologyElements: EtymologyDictionaryEntry[] = etymologyData as EtymologyDictionaryEntry[];

export function getTermById(id: string): MedicalTerm | undefined {
  return allTerms.find((t) => t.id === id);
}

export function getTermsByIds(ids: string[]): MedicalTerm[] {
  return ids.map((id) => getTermById(id)).filter(Boolean) as MedicalTerm[];
}

export function getTermsByCategory(category: Category): MedicalTerm[] {
  return allTerms.filter((t) => t.category === category);
}

export function getTermsByDifficulty(difficulty: Difficulty): MedicalTerm[] {
  return allTerms.filter((t) => t.difficulty === difficulty);
}

export function filterTerms(category: Category | 'all', difficulty: Difficulty | 'all'): MedicalTerm[] {
  return allTerms.filter((t) => {
    const catMatch = category === 'all' || t.category === category;
    const diffMatch = difficulty === 'all' || t.difficulty === difficulty;
    return catMatch && diffMatch;
  });
}

export const CATEGORY_LABELS: Record<Category, string> = {
  cardiovascular: '심혈관계',
  respiratory: '호흡기계',
  digestive: '소화기계',
  musculoskeletal: '근골격계',
  neurological: '신경계',
  endocrine: '내분비계',
  renal: '신장/비뇨기계',
  hematology: '혈액학',
  immunology: '면역학',
  general: '일반',
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: '초급',
  intermediate: '중급',
  advanced: '고급',
};
