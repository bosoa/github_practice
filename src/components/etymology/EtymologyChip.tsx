import { cn } from '@/lib/utils';
import type { EtymologyElement } from '@/types';

interface EtymologyChipProps {
  element: EtymologyElement;
  onClick?: () => void;
}

const ROLE_STYLES = {
  prefix: 'bg-blue-50 text-blue-700 border-blue-200',
  root: 'bg-green-50 text-green-700 border-green-200',
  suffix: 'bg-amber-50 text-amber-700 border-amber-200',
};

const ROLE_LABELS = {
  prefix: '접두사',
  root: '어근',
  suffix: '접미사',
};

export function EtymologyChip({ element, onClick }: EtymologyChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center px-3 py-2 rounded-xl border text-left transition-colors touch-manipulation',
        'active:opacity-70',
        ROLE_STYLES[element.role]
      )}
    >
      <span className="font-bold text-base leading-tight">{element.part}</span>
      <span className="text-[10px] opacity-70 mt-0.5">{ROLE_LABELS[element.role]}</span>
    </button>
  );
}
