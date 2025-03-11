"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/", label: "모든 주식 목록" },
    { href: "/watchlist", label: "신규 상장 채널", badge: true },
    { href: "/ranking", label: "랭킹" },
    { href: "/portfolio", label: "투자 내역" },
  ];
  
  const recommendedItems = [
    { href: "/saved", label: "골라줘, AI", badge: true },
    { href: "/portfolio", label: "나락 점수 계산기", badge: true },

  ];
  
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 px-2 overflow-y-auto">
      <div className="p-4">
        <Link href="/" className="flex items-center justify-left mt-6 mb-4">
          <Image
            src="/logo.svg"
            alt="logo"
            width={120}
            height={40}
            priority
            className="h-auto"
          />
        </Link>
      </div>
      
      <div className="px-4 py-2 text-sm font-medium text-gray-500">
        메인
      </div>
      
      <nav className="mt-1 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex items-center justify-between py-2.5 px-3 text-[15px] font-medium rounded-lg w-full ${
                isActive 
                  ? "bg-gray-100 text-black" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-blue-500 text-xs font-medium">인기</span>
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="px-4 py-2 mt-4 text-sm font-medium text-gray-500">
        부가
      </div>
      
      <nav className="mt-1 px-2">
        {recommendedItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex items-center justify-between py-2.5 px-3 text-[15px] font-medium rounded-lg w-full ${
                isActive 
                  ? "bg-gray-100 text-black" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-blue-500 text-xs font-medium">인기</span>
              )}
            </Link>
          );
        })}
      </nav>
            
      <div className="absolute bottom-4 left-4 flex items-center p-3 rounded-lg">
        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
          s
        </div>
        <div className="min-w-[160px]">
          <div className="font-medium text-[#4B5563]">siniseong</div>
        </div>
      </div>
    </aside>
  );
}