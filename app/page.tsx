'use client'
import Sidebar from './sidebar/sidebar';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [searchTime, setSearchTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('1시간');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.altKey && event.key === 'k') {
      event.preventDefault();
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-lg w-[1200px] min-h-[640px] ml-[250px] mt-[-10]">
          <div className="p-6 mt-2">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-sm">i</span>
                </div>
                <span className="text-blue-900 font-bold text-lg">구매하실 유튜버 채널명을 입력하세요.</span>
              </div>
              <p className="text-sm text-gray-600 ml-8">
                구독자 150만 이상 한국인 유튜버만 시장에 존재합니다. 
              </p>
              <div className="mt-4 flex justify-between items-center">
                <div className="relative w-[50%]">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-gray-500"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                  
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-xs px-1.5 py-0.5 rounded border border-gray-300 bg-gray-50">Ctrl+Alt+K</span>
                  </div>
                  
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTime}
                    onChange={(e) => setSearchTime(e.target.value)}
                    placeholder="채널명을 검색해주세요."
                    className="border border-blue-200 bg-white rounded-lg p-3 pl-10 pr-24 w-full text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-200 placeholder:text-[#9CA0A9]"
                  />
                </div>
                
                <div className="flex space-x-2">
                  {['1시간', '6시간', '1일', '1주일', '1달'].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setSelectedDuration(duration)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out transform ${
                        selectedDuration === duration
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-blue-200 text-gray-700'
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}