import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold transition-colors touch-manipulation select-none',
        'disabled:opacity-50 disabled:pointer-events-none active:scale-95',
        {
          'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800': variant === 'primary',
          'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300': variant === 'secondary',
          'text-gray-600 hover:bg-gray-100 active:bg-gray-200': variant === 'ghost',
          'bg-red-500 text-white hover:bg-red-600': variant === 'danger',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2.5 text-base': size === 'md',
          'px-5 py-3.5 text-lg w-full': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
