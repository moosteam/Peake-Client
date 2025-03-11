'use client';

import { useState, useRef, useEffect } from 'react';
import SubscriberFilter from '../subscriber/subscriber';

type CategoryProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
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

export default function Category({
  selectedCategory,
  setSelectedCategory,
  selectedPeriod,
  setSelectedPeriod,
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
}: CategoryProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const timeOptions = ['1시간', '6시간', '1일', '1주일', '1개월'];
  const categoryOptions = ['개그', '게임', '학습'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && 
          document.activeElement?.tagName !== 'INPUT' && 
          document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex gap-4 mb-4 relative mt-3">
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="text-sm relative px-3 py-1.5 rounded-[8px] cursor-pointer text-blue-700 font-medium bg-blue-50"
        >
          <span className="flex items-center">
            <span className="ml-1">{selectedPeriod}</span>
            <svg
              className={`ml-1 h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        {dropdownOpen && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-md w-full z-10">
            {timeOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedPeriod(option);
                  setDropdownOpen(false);
                }}
                className="block w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
          className={`text-sm relative px-3 py-1.5 rounded-[8px] cursor-pointer ${
            selectedCategory
              ? 'text-blue-700 font-medium bg-gray-100'
              : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="inline-block w-5 h-5"
            >
              <path
                d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
              />
            </svg>
            <span className="ml-1">{selectedCategory ? selectedCategory : "전체"}</span>
            <svg
              className={`ml-1 h-4 w-4 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        {categoryDropdownOpen && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-md w-full z-10">
            <button
              onClick={() => {
                setSelectedCategory("");
                setCategoryDropdownOpen(false);
              }}
              className="block w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
            >
              전체
            </button>
            {categoryOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelectedCategory(option);
                  setCategoryDropdownOpen(false);
                }}
                className="block w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <SubscriberFilter
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
      <div className="relative inline-block ml-225 mb-5">
        <button
          type="button"
          onClick={() => {
            if (searchInputRef.current) {
              searchInputRef.current.focus();
            }
          }}
          className={`text-sm relative px-3 py-1.5 rounded-[8px] cursor-pointer ${
            selectedCategory
              ? 'text-blue-700 font-medium bg-blue-50'
              : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 text-gray-700"
            >
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="채널명을 검색하세요."
              className="ml-2 border-none focus:outline-none"
            />
            <div className="absolute right-3">
              <span className="text-gray-600 text-xs px-1.5 py-0.5 rounded border border-gray-300 bg-gray-50">
                / 
              </span>
            </div>
          </span>
        </button>
      </div>
    </div>
  );
}