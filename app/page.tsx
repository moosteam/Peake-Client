'use client';
import { useState } from 'react';
import Sidebar from './sidebar/sidebar';
import SearchBar from './searchbar/searchbar';
import Stock from './Stock/Stock'; // Stock 컴포넌트 임포트

export default function Home() {
  const [searchTime, setSearchTime] = useState('');

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      <Sidebar />

      <div className="flex-1 pl-[250px] pt-8">
        <div className="bg-white rounded-lg w-[95%] max-w-[1200px] 2xl:max-w-[1600px] min-h-[94vh] mx-auto p-6 mt-2">
          <SearchBar searchTime={searchTime} setSearchTime={setSearchTime} />
          <Stock />
        </div>
      </div>
    </div>
  );
}