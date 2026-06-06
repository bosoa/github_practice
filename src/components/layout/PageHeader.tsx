'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  right?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, showBack = true, right, className }: PageHeaderProps) {
  const router = useRouter();
  return (
    <header className={cn('flex items-center h-14 px-4 bg-white border-b border-gray-100 gap-2', className)}>
      {showBack && (
        <button
          onClick={() => router.back()}
          className="p-1 -ml-1 rounded-lg text-gray-500 hover:bg-gray-100 touch-manipulation"
          aria-label="뒤로가기"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      <h1 className="flex-1 text-base font-semibold text-gray-900 truncate">{title}</h1>
      {right && <div className="flex items-center gap-1">{right}</div>}
    </header>
  );
}
