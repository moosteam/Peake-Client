'use client';
import { useState } from 'react';
import RightSidebar from '@components/common/right-sidebar/RightSidebar';
import MyStocks from '@components/common/right-sidebar/tab/MyStock';
import Watchlist from '@components/common/right-sidebar/tab/Watchlist';
import RecentlyViewed from '@components/common/right-sidebar/tab/RecentlyViewed';
import RealTime from '@components/common/right-sidebar/tab/Realtime';

export default function SidebarWrapper() {
  const [activeTab, setActiveTab] = useState<string>('');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId === activeTab ? '' : tabId);
  };

  const renderSidebarContent = () => {
    switch (activeTab) {
      case 'myStocks':
        return <MyStocks />;
      case 'watchlist':
        return <Watchlist />;
      case 'aiPicks':
        return <RecentlyViewed />;
      case 'calculator':
        return <RealTime />;
      default:
        return null;
    }
  };

  // 사이드바 너비 (열림:22rem, 닫힘:4rem)
  const sidebarWidth = activeTab ? '22rem' : '4rem';

  return (
    <div
      className="flex-shrink-0 bg-white text-black transition-all duration-300 overflow-hidden"
      style={{ flexBasis: sidebarWidth }}
    >
      <RightSidebar onTabChange={handleTabChange} activeTab={activeTab}>
        {renderSidebarContent()}
      </RightSidebar>
    </div>
  );
}