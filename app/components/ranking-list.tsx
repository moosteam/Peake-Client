"use client"

import { useState } from "react"
import Image from "next/image"
import { formatNumber } from "../lib/utils"

// 랭킹 데이터 타입 정의
interface RankingItem {
  id: number
  username: string
  profileImage: string
  description: string
  userId: string
  amount: number
}

const weekTitle = (
    <div className="flex items-center">
      <h1 className="text-black mt-[-12px] text-[22px] font-semibold">
        유튜버 랭킹
      </h1>
    </div>
  );
  
const subTitle = (
    <h2 className="text-gray-700 text-[15px] mb-4 max-w-full break-words">
    실시간 유튜버 구독자 순위에요
    </h2>
);


// 필터 타입 정의
type FilterType = "subscribers" | "donations" | "holders"

const RankingList = () => {
  // 현재 선택된 필터
  const [activeFilter, setActiveFilter] = useState<FilterType>("subscribers")

  // 랭킹 데이터
  const rankingData: RankingItem[] = [
    {
      id: 1,
      username: "집착맨",
      profileImage: "/image.jpg",
      description: "반갑습니다. 오늘도 즐거운 날입니다.",
      userId: "Lockdown_J001",
      amount: 2000000,
    },
    {
      id: 2,
      username: "집착맨",
      profileImage: "/image.jpg",
      description: "반갑습니다. 오늘도 즐거운 날입니다.",
      userId: "Lockdown_J002",
      amount: 2000000,
    },
    {
      id: 3,
      username: "집착맨",
      profileImage: "/image.jpg",
      description: "반갑습니다. 오늘도 즐거운 날입니다.",
      userId: "Lockdown_J003",
      amount: 2000000,
    },
    {
      id: 4,
      username: "집착맨",
      profileImage: "/image.jpg",
      description: "반갑습니다. 오늘도 즐거운 날입니다.",
      userId: "Lockdown_J004",
      amount: 2000000,
    },
    {
      id: 5,
      username: "집착맨",
      profileImage: "/image.jpg",
      description: "반갑습니다. 오늘도 즐거운 날입니다.",
      userId: "Lockdown_J005",
      amount: 2000000,
    },
  ]

  // 필터 변경 핸들러
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter)
  }

  const weekTitle = (
    <div className="flex items-center mb-2">
      <h1 className="text-black text-2xl font-semibold">유튜버 랭킹</h1>
    </div>
  );
  
  const subTitle = (
    <h2 className="text-gray-700 text-base mb-6">
      실시간 유튜버 구독자 순위에요
    </h2>
  );

  return (
    <div className="w-full px-6 sm:px-8 lg:px-10 max-w-[1600px] mx-auto"> {/* px-4 → px-6 */}
      {weekTitle}
      {subTitle}
      
      <div className="flex flex-wrap gap-3 mb-8"> {/* mb-8 유지 */}
        {["subscribers", "donations", "holders"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === filter 
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => handleFilterChange(filter as FilterType)}
          >
            {filter === "subscribers" && "구독자 순"}
            {filter === "donations" && "후원 순"}
            {filter === "holders" && "보유자 순"}
          </button>
        ))}
      </div>

      {/* Updated Ranking List */}
      <div className="bg-white rounded-xl shadow-sm">
        {rankingData.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[50px_100px_1fr_auto] items-center p-4 border-b last:border-b-0 hover:bg-gray-50"
          >
            {/* 순위 */}
            <div className="w-12 text-center font-bold text-2xl text-black">{item.id}</div>

            {/* 프로필 이미지 */}
            <div className="flex-shrink-0 ml-4 mr-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-black">
                <Image
                  src={item.profileImage || "/image.jpg"}
                  alt={item.username}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* 사용자 정보 */}
            <div className="flex flex-col flex-grow">
              <div className="flex flex-row items-center">
                <h3 className="font-bold text-lg text-black">{item.username}</h3>
                <span className="text-xs text-gray-500 ml-2">by {item.userId}</span>
              </div>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>

            {/* 금액 */}
            <div className="text-xl text-gray-700 font-medium ml-auto">{formatNumber(item.amount)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RankingList

