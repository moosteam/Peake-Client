"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "홈" },
    { href: "/info", icon: "M12 12a4 4 0 100-8 4 4 0 000 8zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", label: "투자 내역" },
    { href: "/new", icon: "M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "신규 상장" },
    { href: "/lank", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", label: "랭킹" },
  ];
  
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-4">
        <Link href="/" className="flex items-center justify-left">
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
      
      <nav className="mt-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const linkStyle = isActive 
            ? "flex items-center text-blue-500 py-3 px-4 text-[14px] font-medium bg-[#F0F7FF] rounded-lg mx-2" 
            : "flex items-center text-gray-700 hover:text-blue-500 py-3 px-4 text-[14px] font-medium mx-2";
          return (
            <Link key={item.href} href={item.href} className={linkStyle}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
              </svg>
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 flex items-center p-3  rounded-lg">
        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
          s
        </div>
        <div className="min-w-[160px]">
          <div className="font-medium text-[#6B7280]">siniseong</div>
        </div>
      </div>
    </aside>
  );
}