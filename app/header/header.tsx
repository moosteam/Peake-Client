import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const navLinkStyle = "text-gray-600 hover:text-gray-700 px-3 text-[14px] font-medium";
  
  return (
    <header className="w-full border-b border-gray-200 bg-[#F3F4F6] pt-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Peake Logo"
                width={32}
                height={32}
                priority  
              />
            </Link>
            
            <div className="ml-16 flex items-center space-x-8">
              <Link href="/products" className={navLinkStyle}>인기</Link>
              <Link href="/ranking" className={navLinkStyle}>랭킹</Link>
              <Link href="/investment" className={navLinkStyle}>투자 내역</Link>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <Link 
              href="/signup" 
              className="text-gray-600 hover:text-gray-500 px-3 py-2 text-sm font-semibold"
            >
              Sign up
            </Link>
            <button className="bg-black text-white w-[90px] h-[44px] rounded-[30px] text-[13px] ml-[-14] font-semibold hover:bg-gray-500">
              Log in
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}