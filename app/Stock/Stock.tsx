'use client';

import { useState } from 'react';
import List, { Subscriber } from '../components/stock/list/list';
import Category from '../components/stock/category/category';

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

  const weekTitle = (
    <div className="flex items-center">
      <h1 className="text-black mt-[-12px] text-[22px] font-semibold">모든 주식 목록</h1>
    </div>
  );
  
  const subTitle = (
    <h2 className="text-gray-700 text-[15px] mb-4">
      대한민국 150만 이상 유튜브 채널에 대한 모든 주식 목록이에요.
    </h2>
  );

  return (
    <div className="mt-4">
      {weekTitle}
      {subTitle}

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

      <List 
        subscribers={subscribers}
        displayedSubscribers={displayedSubscribers}
        setSubscribers={setSubscribers}
      />
    </div>
  );
}