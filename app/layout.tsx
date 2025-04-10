import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Sidebar from '@components/common/sidebar/sidebar';

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen bg-[#FFFFFF]">
          <Sidebar />
          <div className="flex-1 pl-[250px] pt-8">
            <div className="bg-white rounded-lg w-[95%] max-w-[1600px] min-h-[94vh] mx-auto p-6 mt-[-8px]">
              <div className="w-full px-6 sm:px-8 lg:px-10 max-w-[1600px] mx-auto">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}