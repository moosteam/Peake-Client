// components/common/sidebar/right-sidebar.tsx
import React, { ReactNode } from 'react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children?: ReactNode;
}

const RightSidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  children,
}) => {
  const tabs = [
    { id: 'myStocks', name: '내 투자' },
    { id: 'watchlist', name: '관심' },
    { id: 'aiPicks', name: '최근 본' },
    { id: 'calculator', name: '실시간' },
  ];

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Horizontal layout for children and tab buttons with nowrap */}
      <div className="flex flex-row justify-between px-4 w-full flex-nowrap">
        <div className="flex-grow overflow-hidden">
          {children}
        </div>
        <div className="flex flex-col items-center py-6 space-y-6 flex-shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`flex flex-col items-center text-xs transition-opacity whitespace-nowrap ${
                activeTab === tab.id ? 'opacity-100' : 'opacity-50 hover:opacity-80'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              {/* SVG icons with black color */}
              <div className="h-6 w-6 mb-1 text-black flex-shrink-0">
                {tab.id === 'myStocks' && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                {tab.id === 'watchlist' && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
                {tab.id === 'aiPicks' && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {tab.id === 'calculator' && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                )}
              </div>
              <span className='text-[0.6rem] text-black whitespace-nowrap'>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
