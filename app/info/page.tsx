"use client"

import { useState } from "react"
import Image from "next/image"
// import { ChartComponent } from "../components/chart/chart/chart"
// import type { SeriesType } from "../components/chart/chart/chart"
import { candlestickData } from "../components/chart/data/data"

export default function Home() {
  // const [chartType, setChartType] = useState<SeriesType>("candlestick")
  const [selectedTimeOption, setSelectedTimeOption] = useState<string>("1분")
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false)
  const [selectedPeriodOption, setSelectedPeriodOption] = useState<string | null>(null)

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

  return (
    <div className="flex min-h-screen bg-[#ffffff]">
      <div className="flex-1 pl-[150px] pt-8">
        <div className="flex items-start mt-2">
          <div className="mr-3 ml-[-100]">
          </div>
          <div>
            <h1 className="text-black text-[18px] font-semibold">
              무스 <span className="text-[14px] font-medium text-gray-500">@무스</span>
            </h1>
            <h2 className="text-black text-[22px] mb-4">
              89,650원 <span className="text-[15px] text-red-500 ml-2">+0.9% (+800원)</span>
            </h2>
            <div className="flex items-center">
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
    </div>
  )
}
