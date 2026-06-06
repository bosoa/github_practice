import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-sm border border-gray-100 p-4',
        onClick && 'cursor-pointer active:scale-[0.98] transition-transform touch-manipulation',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
