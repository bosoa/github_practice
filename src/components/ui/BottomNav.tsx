'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, ClipboardList, Search, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: '홈', Icon: Home },
  { href: '/flashcard', label: '플래시카드', Icon: BookOpen },
  { href: '/quiz', label: '퀴즈', Icon: ClipboardList },
  { href: '/browse', label: '검색', Icon: Search },
  { href: '/progress', label: '통계', Icon: BarChart2 },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-100 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-1">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all touch-manipulation relative"
            >
              {active && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-blue-600 rounded-full" />
              )}
              <Icon
                size={22}
                strokeWidth={active ? 2.3 : 1.7}
                className={active ? 'text-blue-600' : 'text-gray-400'}
              />
              <span className={cn('text-[10px] font-medium', active ? 'text-blue-600' : 'text-gray-400')}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
