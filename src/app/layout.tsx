import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BottomNav } from '@/components/ui/BottomNav';

export const metadata: Metadata = {
  title: '의학 용어 학습',
  description: '의학 용어를 플래시카드, 퀴즈, 어원 분석으로 학습하세요.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-[100dvh] bg-gray-50 antialiased">
        <main className="max-w-lg mx-auto pb-[calc(4rem+env(safe-area-inset-bottom))]">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
