// components/tabs/my-stocks.tsx
import React from 'react';

const MyStocks = () => {
  return (
    <div className="bg-white text-black p-4 rounded-lg max-w-[320px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base font-bold">내 투자 종목</h1>
        <div className="flex gap-2">
          <button className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">$</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm">원</button>
        </div>
      </div>
      
      <div className="border-b border-gray-200 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">
              SX
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm">SOXL</span>
              <div className="flex items-center">
                <div className="w-4 h-2 bg-gray-300 mr-1"></div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold">16,623원</span>
            <span className="text-xs text-red-500">-2,313원(12.2%)</span>
          </div>
          
          <button className="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyStocks;