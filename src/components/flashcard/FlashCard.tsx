import type { MedicalTerm, Category } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { EtymologyBreakdown } from '@/components/etymology/EtymologyBreakdown';
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/lib/data';

const CATEGORY_GRADIENT: Record<Category, string> = {
  cardiovascular:  'from-rose-500 to-pink-600',
  respiratory:     'from-sky-500 to-blue-600',
  digestive:       'from-emerald-500 to-green-600',
  musculoskeletal: 'from-orange-400 to-amber-500',
  neurological:    'from-violet-500 to-purple-600',
  endocrine:       'from-yellow-400 to-amber-500',
  renal:           'from-indigo-500 to-blue-700',
  hematology:      'from-red-500 to-rose-600',
  immunology:      'from-teal-400 to-cyan-600',
  general:         'from-slate-500 to-gray-600',
};

interface FlashCardProps {
  term: MedicalTerm;
  isFlipped: boolean;
  onFlip: () => void;
}

export function FlashCard({ term, isFlipped, onFlip }: FlashCardProps) {
  const gradient = CATEGORY_GRADIENT[term.category];

  return (
    <div
      className="w-full cursor-pointer touch-manipulation select-none"
      style={{ perspective: '1200px' }}
      onClick={onFlip}
      role="button"
      aria-pressed={isFlipped}
    >
      <div
        className="relative w-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: '340px',
        }}
      >
        {/* 앞면 */}
        <div
          className="absolute inset-0 bg-white rounded-3xl shadow-md border border-gray-100 flex flex-col items-center justify-center p-7 gap-4"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="flex gap-2 flex-wrap justify-center">
            <Badge variant="category">{CATEGORY_LABELS[term.category]}</Badge>
            <Badge variant="difficulty" difficulty={term.difficulty}>{DIFFICULTY_LABELS[term.difficulty]}</Badge>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">{term.term}</h2>
            <p className="text-gray-400 text-sm mt-2 font-mono">{term.pronunciation}</p>
          </div>
          <div className="flex gap-1.5 mt-2">
            {term.etymology.map((el, i) => (
              <span
                key={i}
                className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                  el.role === 'prefix' ? 'bg-blue-50 text-blue-600' :
                  el.role === 'root'   ? 'bg-green-50 text-green-600' :
                                         'bg-amber-50 text-amber-600'
                }`}
              >
                {el.part}
              </span>
            ))}
          </div>
          <p className="text-gray-300 text-xs mt-3">탭하여 정의 확인</p>
        </div>

        {/* 뒷면 */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl shadow-md flex flex-col justify-start p-6 gap-4 overflow-y-auto`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex gap-2 flex-wrap">
            <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {CATEGORY_LABELS[term.category]}
            </span>
            <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {DIFFICULTY_LABELS[term.difficulty]}
            </span>
          </div>

          <div>
            <p className="text-white font-bold text-lg leading-snug">{term.definition.ko}</p>
            <p className="text-white/70 text-sm mt-2 leading-relaxed">{term.definition.en}</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-3">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">어원 분석</p>
            <div className="flex flex-wrap gap-2">
              {term.etymology.map((el, i) => (
                <div key={i} className="bg-white/20 rounded-xl px-3 py-1.5 text-center">
                  <p className="text-white font-bold text-sm">{el.part}</p>
                  <p className="text-white/60 text-[10px]">{el.meaning.split('(')[0].trim()}</p>
                </div>
              ))}
            </div>
          </div>

          {term.mnemonics && (
            <div className="bg-white/15 rounded-2xl p-3 border border-white/20">
              <p className="text-white/60 text-xs font-semibold mb-1">암기 팁</p>
              <p className="text-white text-sm">{term.mnemonics.ko}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
