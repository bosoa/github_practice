import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  color?: 'blue' | 'green' | 'amber';
  showLabel?: boolean;
}

export function ProgressBar({ value, max = 100, className, color = 'blue', showLabel }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <span className="text-sm text-gray-500 mb-1 block text-right">{pct}%</span>
      )}
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className={cn('h-2 rounded-full transition-all duration-300', {
            'bg-blue-500': color === 'blue',
            'bg-green-500': color === 'green',
            'bg-amber-500': color === 'amber',
          })}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
