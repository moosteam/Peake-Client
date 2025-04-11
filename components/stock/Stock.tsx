'use client';
import { useState } from 'react';
import List, { Subscriber } from '@components/stock/list/list';
import Category from '@components/stock/category/category';
import SectionHeader from '@components/common/sectionheader/SectionHeader';
import { subscriberData } from '@dummy/data';
import SidebarWrapper from '@components/common/right-sidebar/SidebarWrapper';

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
      {/* 사이드바 영역 */}
      <SidebarWrapper />
    </div>
  );
}
