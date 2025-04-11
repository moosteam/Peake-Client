import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Sidebar from '@components/common/sidebar/sidebar';
import SidebarWrapper from '@components/common/right-sidebar/SidebarWrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Peake',
  description: '모의 유튜버 채널 주식 투자 서비스',
};

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <div className="flex min-h-screen bg-white">
          <div className="w-[250px] shrink-0">
            <Sidebar />
          </div>
          <div className="flex-1"> {/* Space for right sidebar */}
            {children}
            <SidebarWrapper/>
          </div>
          {/* The RightSidebar is now included in individual pages */}
        </div>
      </body>
    </html>
  );
}