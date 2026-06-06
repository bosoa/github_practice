'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useProgressStore } from '@/stores/progressStore';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { allTerms, CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/lib/data';
import type { MedicalTerm } from '@/types';
import { Bookmark } from 'lucide-react';

export default function ProgressPage() {
  const { initialize, progress, getStats } = useProgressStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const stats = getStats();

  const bookmarkedTerms = allTerms.filter((t) => progress.terms[t.id]?.bookmarked);
  const weakTerms = allTerms
    .filter((t) => {
      const p = progress.terms[t.id];
      return p && p.quizAttemptCount > 0 && p.quizCorrectCount / p.quizAttemptCount < 0.5;
    })
    .sort((a, b) => {
      const pa = progress.terms[a.id];
      const pb = progress.terms[b.id];
      return pa.quizCorrectCount / pa.quizAttemptCount - pb.quizCorrectCount / pb.quizAttemptCount;
    });

  return (
    <div className="px-4 pt-6 flex flex-col gap-5">
      <h1 className="text-xl font-bold text-gray-900">학습 통계</h1>

      <Card>
        <p className="text-sm font-semibold text-gray-700 mb-3">마스터 진도</p>
        <ProgressBar value={stats.masteredCount} max={stats.totalTerms} color="green" showLabel />
        <div className="grid grid-cols-2 gap-3 mt-4">
          <StatBox label="마스터" value={stats.masteredCount} color="text-green-600" />
          <StatBox label="학습 중" value={stats.learningCount} color="text-amber-500" />
          <StatBox label="퀴즈 횟수" value={stats.totalQuizzesTaken} color="text-blue-600" />
          <StatBox label="평균 점수" value={`${stats.averageScore}점`} color="text-violet-600" />
        </div>
      </Card>

      {weakTerms.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2.5">취약 용어 (정답률 50% 미만)</p>
          <div className="flex flex-col gap-2">
            {weakTerms.slice(0, 5).map((term) => (
              <WeakTermRow key={term.id} term={term} correctCount={progress.terms[term.id].quizCorrectCount} attemptCount={progress.terms[term.id].quizAttemptCount} />
            ))}
          </div>
        </div>
      )}

      {bookmarkedTerms.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2.5 flex items-center gap-1.5">
            <Bookmark size={14} className="fill-blue-500 text-blue-500" />
            북마크 ({bookmarkedTerms.length})
          </p>
          <div className="flex flex-col gap-2">
            {bookmarkedTerms.map((term) => (
              <Link
                key={term.id}
                href={`/browse/${term.id}`}
                className="flex items-center justify-between bg-white rounded-xl border border-gray-100 px-4 py-3 touch-manipulation"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{term.term}</p>
                  <p className="text-xs text-gray-400">{CATEGORY_LABELS[term.category]}</p>
                </div>
                <span className="text-xs text-gray-400">{DIFFICULTY_LABELS[term.difficulty]}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {progress.quizHistory.length > 0 && (
        <div className="pb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2.5">최근 퀴즈 기록</p>
          <div className="flex flex-col gap-2">
            {progress.quizHistory.slice(0, 5).map((session) => (
              <div key={session.id} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{session.questions.length}문제</p>
                  <p className="text-xs text-gray-400">
                    {new Date(session.completedAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
                <p className={`text-lg font-bold ${session.score >= 70 ? 'text-green-600' : 'text-red-500'}`}>
                  {session.score}점
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}

function WeakTermRow({ term, correctCount, attemptCount }: { term: MedicalTerm; correctCount: number; attemptCount: number }) {
  const pct = Math.round((correctCount / attemptCount) * 100);
  return (
    <Link
      href={`/browse/${term.id}`}
      className="flex items-center gap-3 bg-white rounded-xl border border-red-100 px-4 py-3 touch-manipulation"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{term.term}</p>
        <ProgressBar value={correctCount} max={attemptCount} color="amber" className="mt-1.5" />
      </div>
      <span className="text-sm font-bold text-red-500">{pct}%</span>
    </Link>
  );
}
