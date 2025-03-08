'use client'
import { useState } from 'react';
import Sidebar from './sidebar/sidebar';
import SearchBar from './searchbar/searchbar';
import { FaSort } from 'react-icons/fa';

const tableHeaderStyle = "px-3 py-2 text-sm font-medium text-gray-500";
const tableCellStyle = "px-3 py-2 text-sm text-gray-900";

export default function Home() {
  const [searchTime, setSearchTime] = useState('');
  const [sortField, setSortField] = useState('subscribers');
  const [subscribers, setSubscribers] = useState([
    { name: '더블비', count: 500, category: '개그', volume: '2,500,000주', rate: '+8.0%' },
    { name: '뿌꾸', count: 70000, category: '게임', volume: '1,000,000주', rate: '-1.5%' },
    { name: '미미미누', count: 10000, category: '학습/공부', volume: '500,000주', rate: '+0.5%' },
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
      return sortOrderVolume === 'asc' ? parseInt(a.volume.replace(/,/g, '').replace('주', '')) - parseInt(b.volume.replace(/,/g, '').replace('주', '')) : parseInt(b.volume.replace(/,/g, '').replace('주', '')) - parseInt(a.volume.replace(/,/g, '').replace('주', ''));
    });
    setSubscribers(sortedSubscribers);
    setSortOrderVolume(sortOrderVolume === 'asc' ? 'desc' : 'asc');
    setSortOrderSubscribers('asc');
  }

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      <Sidebar />

      <div className="flex-1 pl-[250px] pt-8">
        <div className="bg-white rounded-lg w-[95%] max-w-[1200px] 2xl:max-w-[1600px] min-h-[94vh] mx-auto p-6 mt-2">
          <SearchBar searchTime={searchTime} setSearchTime={setSearchTime} />

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr className="border-b">
                  <th className={`${tableHeaderStyle} text-left w-1/6`}>
                    유튜버
                  </th>
                  <th className={`${tableHeaderStyle} text-right w-1/8`} onClick={handleSortSubscribers}>
                    구독자 수
                    <button className="ml-2">
                      {sortOrderSubscribers === 'asc' ? '▲' : sortOrderSubscribers === 'desc' ? '▼' : <FaSort />}
                    </button>
                  </th>
                  <th className={`${tableHeaderStyle} text-right w-1/6`}>
                    등략률
                  </th>
                  <th className={`${tableHeaderStyle} text-right w-1/6`}>
                    카테고리
                  </th>
                  <th className={`${tableHeaderStyle} text-right w-1/6`} onClick={handleSortVolume}>
                    거래량
                    <button className="ml-2">
                      {sortOrderVolume === 'asc' ? '▲' : sortOrderVolume === 'desc' ? '▼' : <FaSort />}
                    </button>
                  </th>
                  <th className={`${tableHeaderStyle} text-right w-1/6`}>
                    안전율
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber, index) => (
                  <tr className="hover:bg-gray-50" key={index}>
                    <td className={`${tableCellStyle}`}>
                      <div className="flex items-center">
                        <span className="inline-block w-5 text-center mr-4 text-blue-500 text-sm">{index + 1}</span>
                        <img src="/image.jpg" alt="US" className="w-8 h-8 mr-2 rounded-full" />
                        <span className="text-sm">{subscriber.name}</span>
                      </div>
                    </td>
                    <td className={`${tableCellStyle} text-right`}>{subscriber.count}명</td>
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
        </div>
      </div>
    </div>
  );
}
