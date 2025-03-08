'use client';
import { useState } from 'react';
import Image from 'next/image';

const tableHeaderStyle = "px-3 py-2 text-sm font-medium text-gray-500";
const tableCellStyle = "px-3 py-2 text-sm text-gray-900";

type Subscriber = {
  name: string;
  count: number;
  category: string;
  volume: string;
  rate: string;
};

export default function Stock() {
  const [sortField, setSortField] = useState('subscribers');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    { name: '더블비', count: 180, category: '개그', volume: '2,500,000주', rate: '+8.0%' },
    { name: '뿌꾸', count: 160, category: '게임', volume: '1,000,000주', rate: '-1.5%' },
    { name: '미미미누', count: 100, category: '학습/공부', volume: '500,000주', rate: '+0.5%' },
  ]);
  const [sortOrderSubscribers, setSortOrderSubscribers] = useState('asc');
  const [sortOrderVolume, setSortOrderVolume] = useState('asc');

  function handleSortSubscribers() {
    setSortField('subscribers');
    const sortedSubscribers = [...subscribers].sort((a, b) => {
      return sortOrderSubscribers === 'asc' ? a.count - b.count : b.count - a.count;
    });
    setSubscribers(sortedSubscribers);
    setSortOrderSubscribers(sortOrderSubscribers === 'asc' ? 'desc' : 'asc');
    setSortOrderVolume('asc');
  }

  function handleSortVolume() {
    setSortField('volume');
    const sortedSubscribers = [...subscribers].sort((a, b) => {
      return sortOrderVolume === 'asc'
        ? parseInt(a.volume.replace(/,/g, '').replace('주', ''))
          - parseInt(b.volume.replace(/,/g, '').replace('주', ''))
        : parseInt(b.volume.replace(/,/g, '').replace('주', ''))
          - parseInt(a.volume.replace(/,/g, '').replace('주', ''));
    });
    setSubscribers(sortedSubscribers);
    setSortOrderVolume(sortOrderVolume === 'asc' ? 'desc' : 'asc');
    setSortOrderSubscribers('asc');
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse table-fixed rounded-lg overflow-hidden">
        <thead>
          <tr className="border-b">
            <th className={`${tableHeaderStyle} text-left w-1/6 rounded-tl-lg`}>유튜버</th>
            <th
              className={`${tableHeaderStyle} text-right w-1/8`}
              onClick={handleSortSubscribers}
            >
              구독자 수
              <button className="ml-1 relative top-[3px]">
                <Image 
                  src="/up-down.svg" 
                  alt="Sort" 
                  width={16} 
                  height={16} 
                  className="text-blue-500"
                />
              </button>
            </th>
            <th className={`${tableHeaderStyle} text-right w-1/6`}>등락률</th>
            <th className={`${tableHeaderStyle} text-right w-1/6`}>카테고리</th>
            <th
              className={`${tableHeaderStyle} text-right w-1/6`}
              onClick={handleSortVolume}
            >
              거래량
              <button className="ml-1 relative top-[3px]">
                <Image 
                  src="/up-down.svg" 
                  alt="Sort" 
                  width={16} 
                  height={16} 
                  className="text-blue-500"
                />
              </button>
            </th>
            <th className={`${tableHeaderStyle} text-right w-1/6 rounded-tr-lg`}>안전율</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber, index) => (
            <tr 
              className={`hover:bg-gray-50 ${index % 2 === 1 ? 'bg-white' : 'bg-[#F9FAFB]'}`} 
              key={index}
            >
              <td className={`${tableCellStyle}`}>
                <div className="flex items-center">
                  <span className="inline-block w-5 text-center mr-4 text-blue-500 text-sm">{index + 1}</span>
                  <img src="/image.jpg" alt="US" className="w-8 h-8 mr-2 rounded-full" />
                  <span className="text-sm">{subscriber.name}</span>
                </div>
              </td>
              <td className={`${tableCellStyle} text-right`}>{subscriber.count}만명</td>
              <td className="px-3 py-2 text-sm text-right">
                <div className={subscriber.rate.includes('-') ? "text-red-500" : "text-blue-500"}>
                  {subscriber.rate}
                </div>
              </td>
              <td className={`${tableCellStyle} text-right`}>{subscriber.category}</td>
              <td className={`${tableCellStyle} text-right`}>{subscriber.volume}</td>
              <td className="px-3 py-2 text-sm text-right">
                <span className="text-blue-500">0.5%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
