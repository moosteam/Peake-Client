'use client';
import { useState } from 'react';
import Sidebar from './sidebar/sidebar';
import SearchBar from './searchbar/searchbar';
import Stock from './Stock/Stock'; 

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#FFFFFF]">
      <Sidebar />
      <div className="flex-1 pl-[250px] pt-8">
        <div className="bg-white rounded-lg w-[95%] max-w-[1600px] min-h-[94vh] mx-auto p-6 mt-[-8px]">
          {/* <SearchBar ... /> */}
          <Stock />
        </div>
      </div>
    </div>
  );
}