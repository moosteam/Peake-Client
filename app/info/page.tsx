"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Camera, Maximize2, Info } from "lucide-react"

export default function Home() {
  // const [chartType, setChartType] = useState<SeriesType>("candlestick")
  const [selectedTimeOption, setSelectedTimeOption] = useState<string>("1시간")
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false)
  const [selectedPeriodOption, setSelectedPeriodOption] = useState<string | null>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  const chartOptions = {
    height: 600,
    layout: {
      background: { type: "solid", color: "white" },
      textColor: "black",
    },
    grid: {
      vertLines: {
        color: "rgba(197, 203, 206, 0.5)",
        style: 1,
        visible: true,
      },
      horzLines: {
        color: "rgba(197, 203, 206, 0.5)",
      },
    },
  }

  const minuteOptions = ["1시간", "6시간", "1일", "1주일", "1달", "1년"]
  const periodOptions = ["AI 차트 형식", "지표"]

  const handleTimeSelection = (option: string) => {
    if (minuteOptions.includes(option)) {
      setSelectedTimeOption(option)
      setSelectedPeriodOption(null)
    } else if (periodOptions.includes(option)) {
      setSelectedPeriodOption(option)
      setSelectedTimeOption("")
    }
    setTimeDropdownOpen(false)
  }

  const displayedDropdownOption = selectedTimeOption || minuteOptions[0]
  const isMinuteActive = selectedTimeOption !== "" && selectedPeriodOption === null

  const marqueeItems = [
    {
      category: "급상승 채널",
      channels: [
        { name: "BJ 철구", change: "+8.0% (+4000원)" },
        { name: "쯔양", change: "+6.2% (+2800원)" },
      ],
      direction: "up",
    },
    {
      category: "급하락 채널",
      channels: [
        { name: "악동김블루", change: "-8.9% (-1000원)" },
        { name: "침착맨", change: "-5.4% (-700원)" },
      ],
      direction: "down",
    },
    {
      category: "인기 카테고리",
      channels: [{ name: "먹방", change: "" }],
      direction: "neutral",
    },
    {
      category: "인기 거래 채널",
      channels: [
        { name: "짤태수", change: "+6.5% (+2500원)" },
        { name: "김도", change: "+5.1% (+1800원)" },
      ],
      direction: "up",
    },
    {
      category: "최고 인기 채널",
      channels: [
        { name: "재열이형", change: "+5.2% (+3200원)" },
        { name: "랄로", change: "+7.8% (+3500원)" },
      ],
      direction: "up",
    },
  ]

  useEffect(() => {
    if (!marqueeRef.current) return

    const marqueeContent = marqueeRef.current
    const marqueeWidth = marqueeContent.scrollWidth / 3
    marqueeContent.style.animationDuration = `${marqueeWidth / 60}s`

    return () => {
      if (marqueeContent) {
        marqueeContent.style.animationDuration = ""
      }
    }
  }, [])

  const priceStats = [
    { period: "1시간", change: "-1.31%", color: "text-red-500" },
    { period: "6시간", change: "-5.85%", color: "text-red-500" },
    { period: "1일", change: "+1.72%", color: "text-green-500" },
    { period: "1주일", change: "+24.88%", color: "text-green-500" },
  ]

  const amountOptions = ["1,000", "10,000", "50,000", "100,000"]

  return (
    <div className="flex min-h-screen bg-white flex-col">
      <div className="flex-1 px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
          {/* Left section - Profile and Chart */}
          <div className="flex-1">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="relative">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden bg-white">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt="침착맨"
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
                <button
                  className="absolute -top-1 -left-1 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill={isFavorite ? "#FFD700" : "none"}
                    stroke={isFavorite ? "#FFD700" : "#888"}
                    strokeWidth="2"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-black text-xl font-semibold">침착맨</h1>
                  <span className="text-gray-500 text-sm">반갑습니다. 오늘도 즐겁게 날입니다.</span>
                </div>

                <div className="mt-1">
                  <h2 className="text-green-500 text-3xl font-bold">
                    2,000,000<span className="text-sm">명</span>
                    <span className="text-sm font-normal ml-2">2시간 +5.5%</span>
                  </h2>
                </div>

                <div className="flex items-center mt-4 gap-2 overflow-x-auto pb-2">
                  {minuteOptions.map((option) => (
                    <button
                      key={option}
                      className={`px-3 py-1.5 text-sm ${
                        selectedTimeOption === option
                          ? "text-black font-medium border-b-2 border-black"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => handleTimeSelection(option)}
                    >
                      {option}
                    </button>
                  ))}

                  <div className="h-4 border-l border-gray-300 mx-1"></div>

                  {periodOptions.map((option) => (
                    <button
                      key={option}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700"
                      onClick={() => handleTimeSelection(option)}
                    >
                      {option === "AI 차트 형식" && <Info className="w-4 h-4" />}
                      {option}
                    </button>
                  ))}

                  <div className="ml-auto flex gap-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <Camera className="w-5 h-5" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-100 rounded-lg h-[400px] flex items-center justify-center">
              {/* Chart placeholder */}
              <div className="text-gray-400">차트 영역</div>
            </div>
          </div>

          {/* Right section - Stats and Buy/Sell */}
          <div className="w-full lg:w-80 flex flex-col gap-4">
            <div className="grid grid-cols-4 gap-1 border rounded-lg overflow-hidden">
              {priceStats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center py-3 px-2 text-center">
                  <span className="text-xs text-gray-500">{stat.period}</span>
                  <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-2">
              <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-green-500 text-white hover:bg-green-600">
                구매
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-red-500 text-white hover:bg-red-600">
                판매
              </button>
            </div>

            <div className="mt-2 border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">금액</span>
                <span className="text-gray-500 text-sm">명</span>
              </div>

              <div className="grid grid-cols-4 gap-1">
                {amountOptions.map((amount, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .marquee-content {
          display: inline-block;
          white-space: nowrap;
          animation: marquee linear infinite;
          animation-fill-mode: forwards;
        }
      `}</style>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 py-3 overflow-hidden border-t border-gray-200">
        <div className="marquee-container overflow-hidden">
          <div ref={marqueeRef} className="marquee-content">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="inline-block">
                {marqueeItems.map((item, index) => (
                  <span key={`${i}-${index}`} className="mx-16 text-base">
                    <span
                      className={`font-medium ${
                        item.category === "급상승 채널"
                          ? "text-red-500"
                          : item.category === "급하락 채널"
                            ? "text-blue-500"
                            : "text-gray-900"
                      }`}
                    >
                      {item.category}:
                    </span>
                    {item.channels.map((channel, channelIndex) => (
                      <span key={channelIndex} className="ml-2 font-light">
                        <span className="text-black">{channel.name}</span>
                        {channel.change && (
                          <span className={`ml-1 ${channel.change.startsWith("+") ? "text-red-500" : "text-blue-500"}`}>
                            {channel.change}
                          </span>
                        )}
                        {channelIndex < item.channels.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

