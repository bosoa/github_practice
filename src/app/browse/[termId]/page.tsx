'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import { notFound } from 'next/navigation';
import { getTermById } from '@/lib/data';
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/lib/data';
import { getTermProgress, toggleBookmark } from '@/lib/storage';
import { EtymologyBreakdown } from '@/components/etymology/EtymologyBreakdown';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { TermCard } from '@/components/browse/TermCard';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TermDetailPage({ params }: { params: Promise<{ termId: string }> }) {
  const { termId } = use(params);
  const term = getTermById(termId);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const p = getTermProgress(termId);
    setBookmarked(p.bookmarked);
  }, [termId]);

  if (!term) return notFound();

  const relatedTerms = (term.relatedTerms ?? [])
    .map(getTermById)
    .filter(Boolean) as NonNullable<ReturnType<typeof getTermById>>[];

  const handleBookmark = () => {
    const next = toggleBookmark(termId);
    setBookmarked(next);
  };

  return (
    <div>
      <PageHeader
        title={term.term}
        right={
          <button onClick={handleBookmark} className="p-1 touch-manipulation">
            <Bookmark
              size={22}
              className={cn(bookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-400')}
            />
          </button>
        }
      />

      <div className="px-4 pt-4 pb-6 flex flex-col gap-5">
        <div className="flex gap-2 flex-wrap">
          <Badge variant="category">{CATEGORY_LABELS[term.category]}</Badge>
          <Badge variant="difficulty" difficulty={term.difficulty}>{DIFFICULTY_LABELS[term.difficulty]}</Badge>
        </div>

        <div>
          <p className="text-2xl font-bold text-gray-900">{term.term}</p>
          <p className="text-gray-400 text-sm mt-1">{term.pronunciation}</p>
        </div>

        <Section title="한국어 정의">
          <p className="text-gray-700 text-base leading-relaxed">{term.definition.ko}</p>
        </Section>

        <Section title="English Definition">
          <p className="text-gray-500 text-sm leading-relaxed">{term.definition.en}</p>
        </Section>

        <Section title="어원 분석">
          <EtymologyBreakdown etymology={term.etymology} />
        </Section>

        {term.mnemonics && (
          <Section title="암기 팁">
            <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-100">
              <p className="text-sm text-yellow-800">{term.mnemonics.ko}</p>
              <p className="text-xs text-yellow-600 mt-1">{term.mnemonics.en}</p>
            </div>
          </Section>
        )}

        {relatedTerms.length > 0 && (
          <Section title="관련 용어">
            <div className="flex flex-col gap-2">
              {relatedTerms.map((t) => (
                <TermCard key={t.id} term={t} />
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{title}</p>
      {children}
    </div>
  );
}
