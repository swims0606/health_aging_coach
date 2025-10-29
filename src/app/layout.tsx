import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/layout/BottomNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '저속노화 플랫폼',
  description: '건강한 습관으로 젊게 살기',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <main className="pb-16">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
