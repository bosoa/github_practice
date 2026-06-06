import { cn } from '@/lib/utils';
import type { Category, Difficulty } from '@/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'category' | 'difficulty' | 'default';
  difficulty?: Difficulty;
  className?: string;
}

export function Badge({ children, variant = 'default', difficulty, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        variant === 'default' && 'bg-gray-100 text-gray-700',
        variant === 'category' && 'bg-blue-50 text-blue-700',
        difficulty === 'beginner' && 'bg-green-100 text-green-700',
        difficulty === 'intermediate' && 'bg-amber-100 text-amber-700',
        difficulty === 'advanced' && 'bg-red-100 text-red-700',
        className
      )}
    >
      {children}
    </span>
  );
}
