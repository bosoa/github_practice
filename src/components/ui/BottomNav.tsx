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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors touch-manipulation',
                active ? 'text-blue-600' : 'text-gray-400'
              )}
            >
              <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
