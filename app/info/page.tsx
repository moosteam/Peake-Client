"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
// import { ChartComponent } from "../components/chart/chart/chart"
// import type { SeriesType } from "../components/chart/chart/chart"
import { candlestickData } from "../components/chart/data/data"

export default function Home() {
  // const [chartType, setChartType] = useState<SeriesType>("candlestick")
  const [selectedTimeOption, setSelectedTimeOption] = useState<string>("1분")
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false)
  const [selectedPeriodOption, setSelectedPeriodOption] = useState<string | null>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

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

  const minuteOptions = ["1분", "3분", "5분", "10분", "15분", "30분", "60분"]
  const periodOptions = ["일", "주", "월", "년"]
  const handleTimeSelection = (option: string) => {
    if (minuteOptions.includes(option)) {
      setSelectedTimeOption(option)
      setSelectedPeriodOption(null)
    } 
    else if (periodOptions.includes(option)) {
      setSelectedPeriodOption(option)
      setSelectedTimeOption("")
    }
    setTimeDropdownOpen(false)
  }

  const displayedDropdownOption = selectedTimeOption || "1분"
  const isMinuteActive = selectedTimeOption !== "" && selectedPeriodOption === null

  const marqueeItems = [
    { 
      category: "급상승 채널", 
      channels: [
        { name: "BJ 철구", change: "+8.0% (+4000원)" },
        { name: "쯔양", change: "+6.2% (+2800원)" }
      ],
      direction: "up" 
    },
    { 
      category: "급하락 채널", 
      channels: [
        { name: "악동김블루", change: "-8.9% (-1000원)" },
        { name: "침착맨", change: "-5.4% (-700원)" }
      ],
      direction: "down" 
    },
    { 
      category: "인기 카테고리", 
      channels: [{ name: "먹방", change: "" }],
      direction: "neutral" 
    },
    { 
      category: "인기 거래 채널", 
      channels: [
        { name: "짤태수", change: "+6.5% (+2500원)" },
        { name: "김도", change: "+5.1% (+1800원)" }
      ],
      direction: "up" 
    },
    { 
      category: "최고 인기 채널", 
      channels: [
        { name: "재열이형", change: "+5.2% (+3200원)" },
        { name: "랄로", change: "+7.8% (+3500원)" }
      ],
      direction: "up" 
    }
  ]
  
  useEffect(() => {
    if (!marqueeRef.current) return;

    const marqueeContent = marqueeRef.current;
    const marqueeWidth = marqueeContent.scrollWidth / 3;
    marqueeContent.style.animationDuration = `${marqueeWidth / 60}s`; 
    
    return () => {
      if (marqueeContent) {
        marqueeContent.style.animationDuration = '';
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-[#ffffff] flex-col">
      <div className="flex-1 pl-[150px] pt-8">
        <div className="flex items-start mt-2">
          <div className="mr-4 ml-[-100]">
            <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden">
              <Image 
                src="/logo2.svg" 
                alt="Logo" 
                width={54} 
                height={54}
                className="rounded-full"
              />
            </div>
          </div>
          <div>
            <h1 className="text-black text-[18px] font-semibold">
              무스 <span className="text-[14px] font-medium text-gray-500">@무스</span>
            </h1>
            <h2 className="text-black text-[22px] mb-4">
              89,650원 <span className="text-[15px] text-red-500 ml-2">+0.9% (+800원)</span>
            </h2>
            <div className="flex items-center ">
              <div className="relative inline-block -mt-2">
                <div className="flex gap-4">
                  <div className="relative inline-block">
                    <button
                      type="button"
                      onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                      className={`text-sm relative px-3 py-1.5 rounded-[8px] cursor-pointer ${
                        isMinuteActive ? 'text-blue-700 font-medium bg-blue-50' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="ml-1">{displayedDropdownOption}</span>
                        <svg
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${timeDropdownOpen ? 'rotate-180' : ''}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    {timeDropdownOpen && (
                      <div className="absolute mt-2 bg-white shadow-lg rounded-md w-full z-10">
                        {minuteOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleTimeSelection(option)}
                            className="block w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-[-6]">
                    {periodOptions.map((period, index) => (
                      <button 
                        key={period}
                        className={`text-sm px-3 py-1.5 rounded-[8px] ${
                          index > 0 ? 'ml-2' : ''
                        } cursor-pointer ${
                          selectedPeriodOption === period
                            ? 'text-blue-700 font-medium bg-blue-50' 
                            : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => handleTimeSelection(period)}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-[-50] ml-[-100]">
          <div className="bg-white rounded-[13px] w-[1200px] h-[630px] mt-20">
            {/* <ChartComponent
              seriesType={chartType}
              data={candlestickData}
              onSeriesTypeChange={setChartType}
              chartOptions={chartOptions}
            /> */}
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
      
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 py-4 overflow-hidden border-t border-gray-100">
        <div className="marquee-container overflow-hidden">
          <div 
            ref={marqueeRef}
            className="marquee-content"
          >
            {[...Array(3)].map((_, i) => (
              <span key={i} className="inline-block">
                {marqueeItems.map((item, index) => (
                  <span 
                    key={`${i}-${index}`} 
                    className="mx-16 text-base"
                  >
                    <span className={`font-medium ${item.direction === "down" ? 'text-blue-500' : 'text-red-500'}`}>
                      {item.category}:
                    </span>
                    {item.channels.map((channel, channelIndex) => (
                      <span key={channelIndex} className="ml-2 font-light">
                        <span className="text-gray-700">{channel.name}</span>
                        {channel.change && (
                          <span className={`ml-1 ${item.direction === "down" ? 'text-blue-500' : 'text-red-500'}`}>
                            {channel.change}
                          </span>
                        )}
                        {channelIndex < item.channels.length - 1 ? ',' : ''}
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