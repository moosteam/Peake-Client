'use client';

import { useState, useRef, useEffect } from 'react';

type SubscriberFilterProps = {
  minSliderValue: number;
  setMinSliderValue: (value: number) => void;
  maxSliderValue: number;
  setMaxSliderValue: (value: number) => void;
  minInput: string;
  setMinInput: (value: string) => void;
  maxInput: string;
  setMaxInput: (value: string) => void;
  appliedMin: number;
  setAppliedMin: (value: number) => void;
  appliedMax: number;
  setAppliedMax: (value: number) => void;
};

export default function SubscriberFilter({
  minSliderValue,
  setMinSliderValue,
  maxSliderValue,
  setMaxSliderValue,
  minInput,
  setMinInput,
  maxInput,
  setMaxInput,
  appliedMin,
  setAppliedMin,
  appliedMax,
  setAppliedMax
}: SubscriberFilterProps) {
  const [subscriberFilterOpen, setSubscriberFilterOpen] = useState(false);
  const subscriberFilterRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const MIN = 150;
  const MAX = 640;
  const RANGE = MAX - MIN;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (subscriberFilterRef.current && !subscriberFilterRef.current.contains(event.target as Node)) {
        setSubscriberFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!rangeRef.current || !minThumbRef.current || !maxThumbRef.current || !trackRef.current) return;
    
    const minPercent = ((minSliderValue - MIN) / RANGE) * 100;
    const maxPercent = ((maxSliderValue - MIN) / RANGE) * 100;
    
    if (trackRef.current) {
      trackRef.current.style.left = `${minPercent}%`;
      trackRef.current.style.width = `${maxPercent - minPercent}%`;
    }
    
    minThumbRef.current.style.left = `${minPercent}%`;
    maxThumbRef.current.style.left = `${maxPercent}%`;
  }, [minSliderValue, maxSliderValue]);

  const handleMinMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const startX = e.clientX;
    const startLeft = ((minSliderValue - MIN) / RANGE) * 100;
    const rangeWidth = rangeRef.current?.getBoundingClientRect().width || 0;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaPercent = (deltaX / rangeWidth) * 100;
      const newPercent = Math.min(Math.max(0, startLeft + deltaPercent), maxPercent - 5);
      const newValue = Math.round(MIN + (newPercent * RANGE) / 100);
      
      if (newValue >= MIN && newValue <= maxSliderValue - 1) {
        setMinSliderValue(newValue);
        setMinInput(newValue.toString());
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMaxMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const startX = e.clientX;
    const startLeft = ((maxSliderValue - MIN) / RANGE) * 100;
    const rangeWidth = rangeRef.current?.getBoundingClientRect().width || 0;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaPercent = (deltaX / rangeWidth) * 100;
      const newPercent = Math.min(Math.max(minPercent + 5, startLeft + deltaPercent), 100);
      const newValue = Math.round(MIN + (newPercent * RANGE) / 100);
      
      if (newValue <= MAX && newValue >= minSliderValue + 1) {
        setMaxSliderValue(newValue);
        setMaxInput(newValue.toString());
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const minPercent = ((minSliderValue - MIN) / RANGE) * 100;
  const maxPercent = ((maxSliderValue - MIN) / RANGE) * 100;

  function applySubscriberFilter() {
    setAppliedMin(minSliderValue);
    setAppliedMax(maxSliderValue);
    setSubscriberFilterOpen(false);
  }

  function resetSubscriberFilter() {
    setMinInput("150");
    setMaxInput("640");
    setMinSliderValue(150);
    setMaxSliderValue(640);
    setAppliedMin(150);
    setAppliedMax(0);
    setSubscriberFilterOpen(false);
  }

  const subscriberRangeText = appliedMax
    ? `구독자 · ${appliedMin}만 ~ ${appliedMax}만`
    : "구독자 범위";

  return (
    <div className="relative inline-block" ref={subscriberFilterRef}>
      <button
        type="button"
        onClick={() => setSubscriberFilterOpen(!subscriberFilterOpen)}
        className={`text-sm relative px-3 py-1.5 rounded-[8px] cursor-pointer ${
          appliedMax ? 'text-blue-700 font-medium bg-blue-50' : 'text-gray-700 bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="inline-block w-5 h-5"
          >
            <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clipRule="evenodd" />
          </svg>
          <span className="ml-1">{subscriberRangeText}</span>
          <svg
            className={`ml-1 h-4 w-4 transition-transform duration-200 ${subscriberFilterOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {subscriberFilterOpen && (
        <div className="absolute mt-2 p-4 bg-white shadow-lg rounded-md w-64 z-10">
          <div className="text-sm font-medium mb-3 text-black">구독자 범위 설정</div>

          <div className="relative mb-8 px-2">
            <div 
              ref={rangeRef}
              className="h-1 w-full bg-gray-200 rounded-lg relative"
              style={{ marginTop: "15px" }}
            >
              <div
                ref={trackRef}
                className="absolute h-1 bg-blue-500 rounded-lg"
                style={{ 
                  left: `${minPercent}%`, 
                  width: `${maxPercent - minPercent}%` 
                }}
              ></div>
              <div
                ref={minThumbRef}
                className="absolute w-4 h-4 bg-white border border-gray-300 rounded-full -mt-1.5 -ml-2 shadow cursor-pointer"
                style={{ left: `${minPercent}%` }}
                onMouseDown={handleMinMouseDown}
              ></div>
              <div
                ref={maxThumbRef}
                className="absolute w-4 h-4 bg-white border border-gray-300 rounded-full -mt-1.5 -ml-2 shadow cursor-pointer"
                style={{ left: `${maxPercent}%` }}
                onMouseDown={handleMaxMouseDown}
              ></div>
            </div>
            <div className="absolute flex justify-between w-full mt-3">
              <div className="text-xs text-gray-500">{minSliderValue}만</div>
              <div className="text-xs text-gray-500">{maxSliderValue}만</div>
            </div>
          </div>
          
          <div className="flex justify-between mb-1 space-x-2">
            <div className="flex items-center w-full">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm text-gray-700"
                value={minInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setMinInput(value);
                  const parsed = parseInt(value);
                  if (!isNaN(parsed) && parsed >= MIN && parsed <= maxSliderValue - 1) {
                    setMinSliderValue(parsed);
                  }
                }}
                placeholder="150"
              />
              <span className="ml-1 text-sm text-gray-700">만</span>
            </div>
            <span className="text-gray-500">~</span>
            <div className="flex items-center w-full">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm text-gray-700"
                value={maxInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setMaxInput(value);
                  const parsed = parseInt(value);
                  if (!isNaN(parsed) && parsed <= MAX && parsed >= minSliderValue + 1) {
                    setMaxSliderValue(parsed);
                  }
                }}
                placeholder="640"
              />
              <span className="ml-1 text-sm text-gray-700">만</span>
            </div>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={resetSubscriberFilter}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              초기화
            </button>
            <button
              onClick={applySubscriberFilter}
              className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              적용
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
