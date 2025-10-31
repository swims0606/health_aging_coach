import type { Metadata } from 'next';
import './globals.css';
import BottomNav from '@/components/layout/BottomNav';

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
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-gray-50">
          {/* Fixed centered layout container */}
          <div className="max-w-[1200px] mx-auto bg-white shadow-sm">
            <main className="pb-16">
              {children}
            </main>
            <BottomNav />
          </div>
        </div>
      </body>
    </html>
  );
}
