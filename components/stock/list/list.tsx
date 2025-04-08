'use client';

import { useState } from 'react';
import Image from 'next/image';

const tableHeaderStyle = "px-3 py-2 text-sm font-medium";
const tableCellStyle = "px-3 py-2 text-sm text-gray-900";

export type Subscriber = {
  name: string;
  count: number;
  price: number;
  category: string;
  volume: string;
  rate: string;
  liked: boolean;
};

type ListProps = {
  subscribers: Subscriber[];
  displayedSubscribers: Subscriber[];
  setSubscribers: (subscribers: Subscriber[]) => void;
};

export default function List({ subscribers, displayedSubscribers, setSubscribers }: ListProps) {
  const [sortField, setSortField] = useState("");
  const [sortOrderSubscribers, setSortOrderSubscribers] = useState('desc');
  const [sortOrderVolume, setSortOrderVolume] = useState('asc');

  function toggleFavorite(index: number) {
    const newSubscribers = [...subscribers];
    const realIndex = subscribers.findIndex(
      sub => sub.name === displayedSubscribers[index].name
    );
    newSubscribers[realIndex] = { ...newSubscribers[realIndex], liked: !newSubscribers[realIndex].liked };
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
    <div className="overflow-x-auto">
      <table className="w-full border-collapse table-fixed rounded-lg overflow-hidden">
        <thead>
          <tr className="border-b">
            <th className={`${tableHeaderStyle} text-left w-1/7 rounded-tl-lg text-gray-500`}>
              <div className="relative left-[-6px]">유튜버</div>
            </th>
            <th
              className={`${tableHeaderStyle} text-right w-1/9 cursor-pointer ${
                sortField === 'subscribers' ? 'text-blue-500' : 'text-gray-500'
              }`}
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
              className={`${tableHeaderStyle} text-right w-1/9 cursor-pointer ${
                sortField === 'volume' ? 'text-blue-500' : 'text-gray-500'
              }`}
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
              <div className="relative -left-10">안전율</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedSubscribers.map((subscriber, index) => (
            <tr
              className={`hover:bg-gray-50 ${index % 2 === 1 ? 'bg-white' : 'bg-gray-50'}`}
              key={index}
              onClick={() => window.location.href = '/info'}
            >
              <td className={`${tableCellStyle} rounded-lg ${index === 0 ? 'rounded-tl-lg' : ''} ${index === displayedSubscribers.length - 1 ? 'rounded-bl-lg' : ''}`}>
                <div className="flex items-center">
                  <button onClick={() => toggleFavorite(index)} className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={subscriber.liked ? "#ef4444" : "#d1d5db"}
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <span className="inline-block w-5 text-center mr-4 text-blue-700 text-sm ml-4">
                    {index + 1}
                  </span>
                  <img src="/image.jpg" alt="kr" className="w-7 h-7 mr-3 rounded-full" />
                  <span className="text-sm">{subscriber.name}</span>
                </div>
              </td>
              <td className={`${tableCellStyle} text-right ${index === displayedSubscribers.length - 1 ? 'rounded-br-lg' : ''}`}>{subscriber.count}만명</td>
              <td className={`${tableCellStyle} text-right pl-6`}>{subscriber.price.toLocaleString()}원</td>
              <td className="px-3 py-2 text-sm text-right">
                <div className={subscriber.rate.includes('-') ? "text-red-500" : "text-blue-500"}>
                  {subscriber.rate}
                </div>
              </td>
              <td className={`${tableCellStyle} text-right`}>{subscriber.category}</td>
              <td className={`${tableCellStyle} text-right`}>{subscriber.volume}</td>
              <td className={`${tableCellStyle} text-right rounded-tr-lg rounded-br-lg`}>
                <div className="relative -left-10">
                  <span className="text-blue-500">0.5%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}