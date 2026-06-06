import type { MedicalTerm, Category, Difficulty } from '@/types';
import { allTerms } from './data';

function extractChosung(char: string): string {
  const code = char.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return char;
  const chosungIndex = Math.floor(code / 28 / 21);
  const chosungs = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  return chosungs[chosungIndex];
}

function toChosung(str: string): string {
  return str
    .split('')
    .map((c) => extractChosung(c))
    .join('');
}

function normalize(str: string): string {
  return str.toLowerCase().trim();
}

function matchesChosung(text: string, query: string): boolean {
  const textChosung = toChosung(text);
  return textChosung.includes(query);
}

function isChosungOnly(str: string): boolean {
  return /^[ㄱ-ㅎ]+$/.test(str);
}

export interface SearchFilters {
  category: Category | 'all';
  difficulty: Difficulty | 'all';
}

export function searchTerms(query: string, filters: SearchFilters): MedicalTerm[] {
  const q = normalize(query);
  const chosungOnly = isChosungOnly(query);

  return allTerms.filter((term) => {
    const catMatch = filters.category === 'all' || term.category === filters.category;
    const diffMatch = filters.difficulty === 'all' || term.difficulty === filters.difficulty;
    if (!catMatch || !diffMatch) return false;
    if (!q) return true;

    if (chosungOnly) {
      return (
        matchesChosung(term.term, query) ||
        matchesChosung(term.definition.ko, query) ||
        (term.tags ?? []).some((tag) => matchesChosung(tag, query))
      );
    }

    const searchableText = [
      term.term,
      term.definition.ko,
      term.definition.en,
      ...(term.tags ?? []),
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(q);
  });
}
