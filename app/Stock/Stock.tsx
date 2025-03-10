'use client';

import { useState } from 'react';
import Image from 'next/image';

const tableHeaderStyle = "px-3 py-2 text-sm font-medium";
const tableCellStyle = "px-3 py-2 text-sm text-gray-900";

type Subscriber = {
  name: string;
  count: number;
  price: number;
  category: string;
  volume: string;
  rate: string;
  liked: boolean;
};

export default function Stock() {
  const [selectedPeriod, setSelectedPeriod] = useState('실시간');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrderSubscribers, setSortOrderSubscribers] = useState('desc');
  const [sortOrderVolume, setSortOrderVolume] = useState('asc');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    { name: '더블비', count: 180, price: 25000, category: '개그', volume: '2,500,000주', rate: '+8.0%', liked: false },
    { name: '뿌꾸', count: 160, price: 18500, category: '게임', volume: '1,000,000주', rate: '-1.5%', liked: false },
    { name: '미미미누', count: 190, price: 32000, category: '학습/공부', volume: '500,000주', rate: '+0.5%', liked: false },
  ]);

  const displayedSubscribers = selectedCategory 
    ? subscribers.filter(item => item.category === selectedCategory)
    : subscribers;

  const timeOptions = ['1시간', '6시간', '1일', '1주일', '1개월'];
  const categoryOptions = ['개그', '게임', '학습/공부'];

  const weekTitle = (
    <div className="flex items-center">
      <h1 className="text-black mt-[-12px] text-[22px] font-semibold">모든 주식 목록</h1>
      {/* <span className="text-blue-900 text-sm ml-4">오늘 12시 20분 기준</span> */}
    </div>
  );
  const subTitle = <h2 className="text-gray-700 text-[15px] mb-4">대한민국 150만 이상 유튜브 채널에 대한 모든 주식 목록이에요.</h2>;

  function toggleFavorite(index: number) {
    const newSubscribers = [...subscribers];
    newSubscribers[index] = { ...newSubscribers[index], liked: !newSubscribers[index].liked };
    setSubscribers(newSubscribers);
  }

  function handleSortSubscribers() {
    let newOrder = 'desc';
    if (sortField === 'subscribers') {
      newOrder = sortOrderSubscribers === 'desc' ? 'asc' : 'desc';
    }
    setSortField('subscribers');
    setSortOrderSubscribers(newOrder);
    setSortOrderVolume('asc');
    const sortedSubscribers = [...subscribers].sort((a, b) => {
      return newOrder === 'desc' ? b.count - a.count : a.count - b.count;
    });
    setSubscribers(sortedSubscribers);
  }

  function handleSortVolume() {
    let newOrder = 'desc';
    if (sortField === 'volume') {
      newOrder = sortOrderVolume === 'desc' ? 'asc' : 'desc';
    }
    setSortField('volume');
    setSortOrderVolume(newOrder);
    setSortOrderSubscribers('asc');
    const sortedSubscribers = [...subscribers].sort((a, b) => {
      const volumeA = parseInt(a.volume.replace(/,/g, '').replace('주', ''));
      const volumeB = parseInt(b.volume.replace(/,/g, '').replace('주', ''));
      return newOrder === 'desc' ? volumeB - volumeA : volumeA - volumeB;
    });
    setSubscribers(sortedSubscribers);
  }

  return (
    <div className="mt-4">
      {weekTitle}
      {subTitle}

      <div className="flex gap-4 mb-4 relative mt-3">
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-sm relative px-3 py-1.5 rounded-[8px] cursor-pointer text-blue-700 font-medium bg-blue-50"
          >
            <span className="flex items-center">
              {selectedPeriod}
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
            className={`text-sm relative px-3 py-1.5 rounded-[8px] cursor-pointer ${selectedCategory ? 'text-blue-700 font-medium bg-blue-50' : 'text-gray-700 bg-gray-50 hover:bg-gray-100'}`}
          >
            <span className="flex items-center">
              {selectedCategory ? selectedCategory : "전체"}
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
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-fixed rounded-lg overflow-hidden">
          <thead>
            <tr className="border-b">
              <th className={`${tableHeaderStyle} text-left w-1/7 rounded-tl-lg text-gray-500`}>
                유튜버
              </th>
              <th
                className={`${tableHeaderStyle} text-right w-1/9 cursor-pointer ${sortField === 'subscribers' ? 'text-blue-500' : 'text-gray-500'}`}
                onClick={handleSortSubscribers}
              >
                구독자
                <button className="ml-1 relative top-[3px]">
                  {sortField === 'subscribers' ? (
                    <svg
                      className={`h-4 w-4 text-blue-500 ${sortOrderSubscribers === 'asc' ? 'transform rotate-180' : ''}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  ) : (
                    <Image
                      src="/up-down.svg"
                      alt="Sort"
                      width={16}
                      height={16}
                      className="text-gray-500"
                    />
                  )}
                </button>
              </th>
              <th className={`${tableHeaderStyle} text-right w-1/9 text-gray-500 pl-6`}>
                현재가
              </th>
              <th className={`${tableHeaderStyle} text-right w-1/9 text-gray-500`}>등락률</th>
              <th className={`${tableHeaderStyle} text-right w-1/9 text-gray-500`}>카테고리</th>
              <th
                className={`${tableHeaderStyle} text-right w-1/9 cursor-pointer ${sortField === 'volume' ? 'text-blue-500' : 'text-gray-500'}`}
                onClick={handleSortVolume}
              >
                거래량
                <button className="ml-1 relative top-[3px]">
                  {sortField === 'volume' ? (
                    <svg
                      className={`h-4 w-4 text-blue-500 ${sortOrderVolume === 'asc' ? 'transform rotate-180' : ''}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  ) : (
                    <Image
                      src="/up-down.svg"
                      alt="Sort"
                      width={16}
                      height={16}
                      className="text-gray-500"
                    />
                  )}
                </button>
              </th>
              <th className={`${tableHeaderStyle} text-right w-1/9 rounded-tr-lg text-gray-500`}>
                <div className="relative -left-14">안전율</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedSubscribers.map((subscriber, index) => (
              <tr
                className={`hover:bg-gray-50 ${index % 2 === 1 ? 'bg-white rounded-lg' : 'bg-[#F9FAFB] rounded-[8px]'}`}
                key={index}
              >
                <td className={tableCellStyle}>
                  <div className="flex items-center">
                    <button onClick={() => toggleFavorite(index)} className="mr-2 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill={subscriber.liked ? "#ef4444" : "#d1d5db"}
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <span className="inline-block w-5 text-center mr-4 text-blue-700 text-sm">
                      {index + 1}
                    </span>
                    <img src="/image.jpg" alt="US" className="w-8 h-8 mr-2 rounded-full" />
                    <span className="text-sm">
                      {subscriber.name}
                    </span>
                  </div>
                </td>
                <td className={`${tableCellStyle} text-right`}>{subscriber.count}만명</td>
                <td className={`${tableCellStyle} text-right pl-6`}>{subscriber.price.toLocaleString()}원</td>
                <td className="px-3 py-2 text-sm text-right">
                  <div className={subscriber.rate.includes('-') ? "text-red-500" : "text-blue-500"}>
                    {subscriber.rate}
                  </div>
                </td>
                <td className={`${tableCellStyle} text-right`}>{subscriber.category}</td>
                <td className={`${tableCellStyle} text-right`}>{subscriber.volume}</td>
                <td className="px-3 py-2 text-sm text-right">
                  <div className="relative -left-14">
                    <span className="text-blue-500">0.5%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
