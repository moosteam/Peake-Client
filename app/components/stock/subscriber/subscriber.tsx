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

  function handleMinSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    if (value >= 150 && value <= maxSliderValue) {
        setMinSliderValue(value);
        setMinInput(value.toString());
    }
  }

  function handleMaxSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    if (value <= 640 && value >= minSliderValue) {
        setMaxSliderValue(value);
        setMaxInput(value.toString());
    }
  }

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

          <div className="relative mb-6 h-6">
            <input
              type="range"
              min="150"
              max="640"
              value={minSliderValue}
              onChange={handleMinSliderChange}
              className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer z-20"
              style={{ outline: 'none' }}
            />
            <input
              type="range"
              min="150"
              max="640"
              value={maxSliderValue}
              onChange={handleMaxSliderChange}
              className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer z-30"
              style={{ outline: 'none' }}
            />
            <div className="absolute w-full h-1 bg-gray-200 rounded-lg z-10"></div>
            <div className="absolute flex justify-between w-full mt-7 z-40">
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
                  if (!isNaN(parsed) && parsed >= 150 && parsed <= maxSliderValue) {
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
                  if (!isNaN(parsed) && parsed <= 640 && parsed >= minSliderValue) {
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