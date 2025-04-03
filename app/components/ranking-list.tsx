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

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-black mb-8">랭킹</h1>

      {/* 필터 버튼 */}
      <div className="flex flex-row justify-center gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-full text-sm ${
            activeFilter === "subscribers" ? "bg-gray-300 text-gray-700" : "bg-gray-200 text-gray-500 hover:bg-gray-250"
          }`}
          onClick={() => handleFilterChange("subscribers")}
        >
          구독자 순
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm ${
            activeFilter === "donations" ? "bg-gray-300 text-gray-700" : "bg-gray-200 text-gray-500 hover:bg-gray-250"
          }`}
          onClick={() => handleFilterChange("donations")}
        >
          후원 순
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm ${
            activeFilter === "holders" ? "bg-gray-300 text-gray-700" : "bg-gray-200 text-gray-500 hover:bg-gray-250"
          }`}
          onClick={() => handleFilterChange("holders")}
        >
          보유자 순
        </button>
      </div>

      {/* 랭킹 리스트 */}
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        {rankingData.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-row items-center p-4 border-b border-gray-200 bg-white even:bg-gray-50 last:border-b-0"
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
  )
}

export default RankingList

