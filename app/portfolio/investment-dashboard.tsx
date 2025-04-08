"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { formatNumber } from "../../lib/utils"
import SectionHeader from "@components/common/sectionheader/SectionHeader"

// 포트폴리오 데이터 타입 정의
interface PortfolioItem {
  name: string
  value: number
  color: string
  percentage: number
}

const InvestmentDashboard = () => {
  // 포트폴리오 데이터
  const portfolioData: PortfolioItem[] = [
    { name: "침착맨", value: 40, color: "#00A3D9", percentage: 90.9 },
    { name: "침착맨", value: 30, color: "#4A90E2", percentage: 3.0 },
    { name: "침착맨", value: 10, color: "#F5A623", percentage: 2.4 },
    { name: "침착맨", value: 7, color: "#7ED321", percentage: 1.2 },
    { name: "침착맨", value: 13, color: "#6B7280", percentage: 1.2 },
    { name: "침착맨", value: 0, color: "#00A3D9", percentage: 1.2 },
  ]

  // 투자 데이터
  const investmentData = {
    heldCurrency: 15000000,
    totalCurrency: 20000000,
    totalPurchase: 1500000,
    totalValuation: 1499766,
    valuationProfit: -224,
    yieldRate: -0.01,
  }

  return (
    <>
      <SectionHeader 
        title="투자 내역" 
        subtitle="현재 내가 투자한 유튜버 목록이에요" 
      />

      {/* 상단 정보 섹션 */}
      <div className="flex flex-col md:flex-row justify-between mb-10">
        {/* 보유 화폐 */}
        <div className="flex-1 p-6 border-r border-gray-200">
          <h2 className="text-lg font-medium text-gray-600 mb-2">보유 화폐</h2>
          <p className="text-4xl font-bold text-black">{formatNumber(investmentData.heldCurrency)}</p>
        </div>

        {/* 총 보유 화폐 */}
        <div className="flex-1 p-6">
          <h2 className="text-lg font-medium text-gray-600 mb-2">총 보유 화폐</h2>
          <p className="text-4xl font-bold text-black">{formatNumber(investmentData.totalCurrency)}</p>
        </div>
      </div>

      {/* 중간 정보 섹션 */}
      <div className="flex flex-col md:flex-row justify-between mb-10">
        {/* 왼쪽 정보 */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-row justify-between items-center">
            <span className="text-lg text-black">총 매수</span>
            <span className="text-lg font-medium text-black">{formatNumber(investmentData.totalPurchase)}</span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <span className="text-lg text-black">총 평가</span>
            <span className="text-lg font-medium text-black">{formatNumber(investmentData.totalValuation)}</span>
          </div>
        </div>

        {/* 오른쪽 정보 */}
        <div className="flex-1 space-y-4 md:ml-8">
          <div className="flex flex-row justify-between items-center">
            <span className="text-lg text-black">평가손익</span>
            <span className="text-lg font-medium text-red-500">{formatNumber(investmentData.valuationProfit)}</span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <span className="text-lg text-black">수익률</span>
            <span className="text-lg font-medium text-red-500">{investmentData.yieldRate}%</span>
          </div>
        </div>
      </div>

      {/* 포트폴리오 섹션 */}
      <div className="mt-10"> {/* mt-12 → mt-10 */}
        <h2 className="text-xl font-bold mb-6 text-black">보유자산 포트폴리오</h2>
        <div className="flex flex-col md:flex-row">
          {/* 원 그래프 */}
          <div className="w-full md:w-1/2 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={0}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "비율"]} labelFormatter={() => "자산 비율"} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 포트폴리오 상세 */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            {portfolioData.map((item, index) => (
              <div key={index} className="flex flex-row items-center mb-3 text-black">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <span className="flex-1">{item.name}</span>
                <span className="font-medium">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default InvestmentDashboard

