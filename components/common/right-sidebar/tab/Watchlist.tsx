
// components/tabs/watchlist.tsx
import React from 'react';

const Watchlist = () => {
  const stocks = [
    { id: 1, name: '에스티로이드', symbol: 'WILD', price: '8,467원', change: '+4,952원', percent: '140.9%', trend: 'up', color: 'bg-gray-200' },
    { id: 2, name: 'SOXL', symbol: 'SX', price: '16,816원', change: '-2,120원', percent: '11.1%', trend: 'down', color: 'bg-orange-500' },
    { id: 3, name: '샤프스 테크놀로지', symbol: 'PLAYS', price: '29원', change: '+9원', percent: '45.0%', trend: 'up', color: 'bg-blue-500' },
    { id: 4, name: 'TSLL', symbol: '2x', price: '13,227원', change: '-1,393원', percent: '9.5%', trend: 'down', color: 'bg-red-500' },
    { id: 5, name: 'SOXS', symbol: 'SOXS', price: '33,899원', change: '+3,203원', percent: '10.4%', trend: 'up', color: 'bg-orange-500' },
    { id: 6, name: '테슬라', symbol: 'T', price: '384,397원', change: '-19,248원', percent: '4.7%', trend: 'down', color: 'bg-red-500' },
    { id: 7, name: '리세이프', symbol: '', price: '815원', change: '+308원', percent: '60.7%', trend: 'up', color: 'bg-gray-200' },
    { id: 8, name: 'TSLA', symbol: 'TSLA', price: '51,426원', change: '+3,381원', percent: '7.0%', trend: 'up', color: 'bg-red-500' },
    { id: 9, name: '하이드로팜 홀딩스', symbol: '', price: '3,306원', change: '+815원', percent: '32.7%', trend: 'up', color: 'bg-green-500' },
    { id: 10, name: '엔비디아', symbol: '', price: '162,080원', change: '-7,458원', percent: '4.3%', trend: 'down', color: 'bg-green-500' },
  ];

  return (
    <div className="bg-white text-black p-4 rounded-lg max-w-[320px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-base font-bold">관심 종목</h1>
        <div className="flex gap-2">
          <button className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">$</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm">원</button>
        </div>
      </div>
      
      <div className="mb-4">
        <h2 className="text-sm font-semibold">관심 주식 TOP 10</h2>
        <p className="text-gray-400 text-xs">관심 그룹에 담아보세요</p>
      </div>
      
      <div className="space-y-3">
        {stocks.map((stock) => (
          <div key={stock.id} className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${stock.color} flex items-center justify-center text-black font-bold text-xs`}>
                {stock.symbol}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-sm truncate max-w-[120px]">{stock.name}</span>
                <div className="flex items-center">
                  <div className="w-4 h-2 bg-gray-300 mr-1"></div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold">{stock.price}</span>
              <span className={`text-xs ${stock.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stock.change}({stock.percent})
              </span>
            </div>
            
            <button className="ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        ))}
        
        <button className="w-full py-3 flex items-center justify-center text-blue-500 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          추가하기
        </button>
      </div>
    </div>
  );
};

export default Watchlist;