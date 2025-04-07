'use client';

import { useState } from 'react';
import List, { Subscriber } from '../components/stock/list/list';
import Category from '../components/stock/category/category';
import SectionHeader from '../components/common/SectionHeader';

export default function Stock() {
  const [selectedPeriod, setSelectedPeriod] = useState('실시간');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minInput, setMinInput] = useState<string>("150");
  const [maxInput, setMaxInput] = useState<string>("640");
  const [appliedMin, setAppliedMin] = useState<number>(150);
  const [appliedMax, setAppliedMax] = useState<number>(0);
  const [minSliderValue, setMinSliderValue] = useState<number>(150);
  const [maxSliderValue, setMaxSliderValue] = useState<number>(640);

  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    { name: '더블비', count: 180, price: 25000, category: '개그', volume: '2,500,000주', rate: '+8.0%', liked: false },
    { name: '뿌꾸', count: 160, price: 18500, category: '게임', volume: '1,000,000주', rate: '-1.5%', liked: false },
    { name: '미미미누', count: 190, price: 32000, category: '학습', volume: '500,000주', rate: '+0.5%', liked: false },
  ]);

  const displayedSubscribers = subscribers.filter(item => {
    return (
      (!selectedCategory || item.category === selectedCategory) &&
      item.count >= appliedMin &&
      (appliedMax === 0 || item.count <= appliedMax)
    );
  });


  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
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

      <div className="overflow-x-auto">
        <List 
          subscribers={subscribers}
          displayedSubscribers={displayedSubscribers}
          setSubscribers={setSubscribers}
        />
      </div>
    </div>
  );
}