'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useProgressStore } from '@/stores/progressStore';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BookOpen, ClipboardList, Search, BookMarked, Activity } from 'lucide-react';

const QUICK_LINKS = [
  { href: '/flashcard', label: '플래시카드', desc: '카드 뒤집으며 암기', Icon: BookOpen, from: 'from-blue-500', to: 'to-blue-600' },
  { href: '/quiz', label: '퀴즈', desc: '실력 테스트', Icon: ClipboardList, from: 'from-violet-500', to: 'to-violet-600' },
  { href: '/browse', label: '용어 검색', desc: '한글·영어·초성', Icon: Search, from: 'from-teal-500', to: 'to-emerald-600' },
  { href: '/etymology', label: '어원 사전', desc: '접두사·어근·접미사', Icon: BookMarked, from: 'from-amber-500', to: 'to-orange-500' },
];

export default function HomePage() {
  const { initialize, getStats } = useProgressStore();

  useEffect(() => { initialize(); }, [initialize]);

  const stats = getStats();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-5 pt-12 pb-8 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Activity size={20} className="opacity-80" />
          <span className="text-blue-200 text-sm font-medium tracking-wide">Medical Terminology</span>
        </div>
        <h1 className="text-3xl font-bold">의학 용어 학습</h1>
        <p className="text-blue-200 text-sm mt-1">어원으로 이해하고, 퀴즈로 완성하세요</p>

        {/* Stats strip */}
        <div className="flex gap-3 mt-5">
          {[
            { label: '전체', value: stats.totalTerms },
            { label: '마스터', value: stats.masteredCount },
            { label: '학습 중', value: stats.learningCount },
            { label: '평균점수', value: `${stats.averageScore}점` },
          ].map(({ label, value }) => (
            <div key={label} className="flex-1 bg-white/10 backdrop-blur rounded-xl px-2 py-2 text-center">
              <p className="text-lg font-bold leading-tight">{value}</p>
              <p className="text-[10px] text-blue-200 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 -mt-4 pb-6 flex flex-col gap-5">
        {/* Progress card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-sm font-semibold text-gray-700">마스터 진도</p>
            <p className="text-xs text-gray-400">{stats.masteredCount} / {stats.totalTerms}</p>
          </div>
          <ProgressBar value={stats.masteredCount} max={stats.totalTerms} color="green" showLabel />
          {stats.bookmarkedCount > 0 && (
            <p className="text-xs text-gray-400 mt-2">북마크 {stats.bookmarkedCount}개 · 퀴즈 {stats.totalQuizzesTaken}회</p>
          )}
        </div>

        {/* Quick links */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">학습 메뉴</p>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_LINKS.map(({ href, label, desc, Icon, from, to }) => (
              <Link
                key={href}
                href={href}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 active:scale-95 transition-transform touch-manipulation overflow-hidden relative"
              >
                <div className={`bg-gradient-to-br ${from} ${to} w-11 h-11 rounded-xl flex items-center justify-center shadow-sm`}>
                  <Icon size={21} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
