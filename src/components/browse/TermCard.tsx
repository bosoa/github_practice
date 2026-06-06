import Link from 'next/link';
import type { MedicalTerm, Category } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/lib/data';
import { ChevronRight } from 'lucide-react';

const CATEGORY_COLOR: Record<Category, string> = {
  cardiovascular:  'bg-rose-400',
  respiratory:     'bg-sky-400',
  digestive:       'bg-emerald-400',
  musculoskeletal: 'bg-orange-400',
  neurological:    'bg-violet-400',
  endocrine:       'bg-yellow-400',
  renal:           'bg-indigo-400',
  hematology:      'bg-red-400',
  immunology:      'bg-teal-400',
  general:         'bg-gray-400',
};

interface TermCardProps {
  term: MedicalTerm;
}

export function TermCard({ term }: TermCardProps) {
  return (
    <Link
      href={`/browse/${term.id}`}
      className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden active:scale-[0.98] transition-transform touch-manipulation"
    >
      <div className={`${CATEGORY_COLOR[term.category]} w-1 self-stretch flex-shrink-0`} />
      <div className="flex-1 min-w-0 py-3.5 pr-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-bold text-gray-900">{term.term}</p>
          <Badge variant="difficulty" difficulty={term.difficulty}>{DIFFICULTY_LABELS[term.difficulty]}</Badge>
        </div>
        <p className="text-sm text-gray-500 truncate mt-0.5">{term.definition.ko}</p>
        <p className="text-xs text-gray-400 mt-0.5">{CATEGORY_LABELS[term.category]}</p>
      </div>
      <ChevronRight size={16} className="text-gray-300 flex-shrink-0 mr-3" />
    </Link>
  );
}
