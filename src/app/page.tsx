'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useProgressStore } from '@/stores/progressStore';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Card } from '@/components/ui/Card';
import { BookOpen, ClipboardList, Search, BookMarked } from 'lucide-react';

const QUICK_LINKS = [
  { href: '/flashcard', label: '플래시카드', Icon: BookOpen, color: 'bg-blue-500' },
  { href: '/quiz', label: '퀴즈', Icon: ClipboardList, color: 'bg-violet-500' },
  { href: '/browse', label: '용어 검색', Icon: Search, color: 'bg-teal-500' },
  { href: '/etymology', label: '어원 사전', Icon: BookMarked, color: 'bg-amber-500' },
];

export default function HomePage() {
  const { initialize, getStats } = useProgressStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const stats = getStats();

  return (
    <div className="px-4 pt-6 pb-4 flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">의학 용어 학습</h1>
        <p className="text-gray-500 text-sm mt-1">Medical Terminology</p>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-700">학습 진도</p>
          <p className="text-sm text-gray-500">{stats.masteredCount} / {stats.totalTerms} 마스터</p>
        </div>
        <ProgressBar value={stats.masteredCount} max={stats.totalTerms} color="green" showLabel />
        <div className="flex gap-4 mt-4 text-center">
          <StatItem label="학습 중" value={stats.learningCount} />
          <StatItem label="북마크" value={stats.bookmarkedCount} />
          <StatItem label="퀴즈 수" value={stats.totalQuizzesTaken} />
          <StatItem label="평균 점수" value={`${stats.averageScore}점`} />
        </div>
      </Card>

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">빠른 시작</p>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_LINKS.map(({ href, label, Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 active:scale-95 transition-transform touch-manipulation"
            >
              <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center`}>
                <Icon size={20} className="text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-800">{label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex-1">
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}
