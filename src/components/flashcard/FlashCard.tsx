import type { MedicalTerm } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { EtymologyBreakdown } from '@/components/etymology/EtymologyBreakdown';
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/lib/data';
import { cn } from '@/lib/utils';

interface FlashCardProps {
  term: MedicalTerm;
  isFlipped: boolean;
  onFlip: () => void;
}

export function FlashCard({ term, isFlipped, onFlip }: FlashCardProps) {
  return (
    <div
      className="w-full cursor-pointer touch-manipulation select-none"
      style={{ perspective: '1000px' }}
      onClick={onFlip}
      role="button"
      aria-pressed={isFlipped}
      aria-label={isFlipped ? '앞면 보기' : '뒷면 보기'}
    >
      <div
        className="relative w-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: '320px',
        }}
      >
        {/* 앞면 */}
        <div
          className="absolute inset-0 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center justify-center p-6 gap-3"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="flex gap-2 flex-wrap justify-center">
            <Badge variant="category">{CATEGORY_LABELS[term.category]}</Badge>
            <Badge variant="difficulty" difficulty={term.difficulty}>{DIFFICULTY_LABELS[term.difficulty]}</Badge>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 text-center">{term.term}</h2>
          <p className="text-gray-400 text-sm">{term.pronunciation}</p>
          <p className="text-gray-400 text-xs mt-4">탭하여 뒤집기</p>
        </div>

        {/* 뒷면 */}
        <div
          className="absolute inset-0 bg-blue-50 rounded-3xl shadow-lg border border-blue-100 flex flex-col justify-start p-6 gap-4 overflow-y-auto"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="font-semibold text-gray-900 text-base leading-relaxed">{term.definition.ko}</p>
          <p className="text-gray-500 text-sm leading-relaxed">{term.definition.en}</p>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">어원 분석</p>
            <EtymologyBreakdown etymology={term.etymology} />
          </div>
          {term.mnemonics && (
            <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-100">
              <p className="text-xs font-semibold text-yellow-700 mb-1">암기 팁</p>
              <p className="text-sm text-yellow-800">{term.mnemonics.ko}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
