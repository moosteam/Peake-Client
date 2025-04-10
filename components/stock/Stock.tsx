'use client';
import { useState } from 'react';
import List, { Subscriber } from '@components/stock/list/list';
import Category from '@components/stock/category/category';
import SectionHeader from '@components/common/sectionheader/SectionHeader';
import { subscriberData } from '@dummy/data';
import RightSidebar from '@components/common/right-sidebar/RightSidebar'; // 경로 확인
import MyStocks from '@components/common/right-sidebar/tab/MyStock';
import Watchlist from '@components/common/right-sidebar/tab/Watchlist';
import RecentlyViewed from '@components/common/right-sidebar/tab/RecentlyViewed';
import RealTime from '@components/common/right-sidebar/tab/Realtime';

export default function Stock() {
  // ─────────────────────────────────────────────────────────────────────────
  // 메인 상태
  const [selectedPeriod, setSelectedPeriod] = useState('실시간');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minInput, setMinInput] = useState<string>('150');
  const [maxInput, setMaxInput] = useState<string>('640');
  const [appliedMin, setAppliedMin] = useState<number>(150);
  const [appliedMax, setAppliedMax] = useState<number>(0);
  const [minSliderValue, setMinSliderValue] = useState<number>(150);
  const [maxSliderValue, setMaxSliderValue] = useState<number>(640);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(subscriberData);

  const displayedSubscribers = subscribers.filter(item => {
    return (
      (!selectedCategory || item.category === selectedCategory) &&
      item.count >= appliedMin &&
      (appliedMax === 0 || item.count <= appliedMax)
    );
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 사이드바 탭 상태
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

  // 사이드바 너비 (열림:16rem, 닫힘:4rem)
  const sidebarWidth = activeTab ? '22rem' : '4rem';

  return (
    <div className="flex w-full h-screen">
      {/* 메인 영역 */}
      <div
        className="flex-grow p-6 overflow-auto transition-all duration-300"
      >
        <SectionHeader
          title="모든 주식 목록"
          subtitle="상장된 모든 유튜버 목록이에요"
        />

        <Category
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          minSliderValue={minSliderValue}
          setMinSliderValue={setMinSliderValue}
          maxSliderValue={maxSliderValue}
          setMaxSliderValue={setMaxSliderValue}
          minInput={minInput}
          setMinInput={setMinInput}
          maxInput={maxInput}
          setMaxInput={setMaxInput}
          appliedMin={appliedMin}
          setAppliedMin={setAppliedMin}
          appliedMax={appliedMax}
          setAppliedMax={setAppliedMax}
        />

        <div className="overflow-x-auto mt-4">
          <List
            subscribers={subscribers}
            displayedSubscribers={displayedSubscribers}
            setSubscribers={setSubscribers}
          />
        </div>
      </div>

      {/* 사이드바 래퍼 */}
      <div
        className="flex-shrink-0 bg-black text-white transition-all duration-300 overflow-hidden"
        style={{ flexBasis: sidebarWidth }}
      >
        <RightSidebar onTabChange={handleTabChange} activeTab={activeTab}>
          {renderSidebarContent()}
        </RightSidebar>
      </div>
    </div>
  );
}
