import Link from 'next/link';
import type { MedicalTerm } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/lib/data';
import { ChevronRight } from 'lucide-react';

interface TermCardProps {
  term: MedicalTerm;
}

export function TermCard({ term }: TermCardProps) {
  return (
    <Link
      href={`/browse/${term.id}`}
      className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 px-4 py-3.5 shadow-sm active:scale-[0.98] transition-transform touch-manipulation"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <p className="font-semibold text-gray-900">{term.term}</p>
          <Badge variant="difficulty" difficulty={term.difficulty}>{DIFFICULTY_LABELS[term.difficulty]}</Badge>
        </div>
        <p className="text-sm text-gray-500 truncate">{term.definition.ko}</p>
        <p className="text-xs text-gray-400 mt-0.5">{CATEGORY_LABELS[term.category]}</p>
      </div>
      <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
    </Link>
  );
}
