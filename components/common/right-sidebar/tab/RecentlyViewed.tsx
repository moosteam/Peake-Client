// components/tabs/recently-viewed.tsx
import React from 'react';

const RecentlyViewed = () => {
  return (
    <div className="bg-white text-black p-4 rounded-lg max-w-[320px]">
      <h1 className="text-base font-bold mb-4">최근 본 종목</h1>
      <div className="space-y-3">
        <p className="text-gray-500 text-sm">아직 조회한 종목이 없습니다.</p>
      </div>
    </div>
  );
};

export default RecentlyViewed;