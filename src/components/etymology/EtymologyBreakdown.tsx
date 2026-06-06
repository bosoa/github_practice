'use client';

import { useState } from 'react';
import type { EtymologyElement } from '@/types';
import { EtymologyChip } from './EtymologyChip';
import { X } from 'lucide-react';

interface EtymologyBreakdownProps {
  etymology: EtymologyElement[];
}

export function EtymologyBreakdown({ etymology }: EtymologyBreakdownProps) {
  const [selected, setSelected] = useState<EtymologyElement | null>(null);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {etymology.map((el, i) => (
          <EtymologyChip key={i} element={el} onClick={() => setSelected(el)} />
        ))}
      </div>

      {selected && (
        <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-200 relative">
          <button
            onClick={() => setSelected(null)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 touch-manipulation"
          >
            <X size={16} />
          </button>
          <p className="font-bold text-gray-900">{selected.part}</p>
          <p className="text-sm text-gray-600 mt-0.5">{selected.meaning}</p>
          <p className="text-xs text-gray-400 mt-0.5">출처: {selected.origin}</p>
          {selected.examples && selected.examples.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              관련 용어: {selected.examples.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
