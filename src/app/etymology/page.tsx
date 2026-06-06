'use client';

import { useState } from 'react';
import { allEtymologyElements } from '@/lib/data';
import type { EtymologyRole } from '@/types';
import { cn } from '@/lib/utils';

const ROLE_LABELS: Record<EtymologyRole, string> = { prefix: '접두사', root: '어근', suffix: '접미사' };
const ROLE_STYLES: Record<EtymologyRole, string> = {
  prefix: 'bg-blue-50 text-blue-700 border-blue-200',
  root: 'bg-green-50 text-green-700 border-green-200',
  suffix: 'bg-amber-50 text-amber-700 border-amber-200',
};

const ROLES: Array<EtymologyRole | 'all'> = ['all', 'prefix', 'root', 'suffix'];

export default function EtymologyPage() {
  const [filter, setFilter] = useState<EtymologyRole | 'all'>('all');

  const filtered = filter === 'all' ? allEtymologyElements : allEtymologyElements.filter((e) => e.role === filter);

  return (
    <div className="px-4 pt-6 flex flex-col gap-4">
      <h1 className="text-xl font-bold text-gray-900">어원 사전</h1>

      <div className="flex gap-2">
        {ROLES.map((r) => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={cn(
              'px-3 py-1.5 rounded-xl text-sm font-medium border transition-colors touch-manipulation',
              filter === r
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200'
            )}
          >
            {r === 'all' ? '전체' : ROLE_LABELS[r]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {filtered.map((el) => (
          <div key={el.id} className={cn('rounded-2xl border p-4', ROLE_STYLES[el.role])}>
            <div className="flex items-start justify-between">
              <div>
                <span className="font-bold text-lg">{el.part}</span>
                <span className="ml-2 text-xs opacity-60">{ROLE_LABELS[el.role]}</span>
              </div>
              <span className="text-xs opacity-50">{el.origin}</span>
            </div>
            <p className="text-sm mt-1">{el.meaning}</p>
            {el.usedIn.length > 0 && (
              <p className="text-xs mt-2 opacity-60">
                사용 예: {el.usedIn.join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
