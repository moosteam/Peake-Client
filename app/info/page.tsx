"use client"

import { useState } from "react"
import Image from "next/image"
// import { ChartComponent } from "../components/chart/chart/chart"
// import type { SeriesType } from "../components/chart/chart/chart"
import { candlestickData } from "../components/chart/data/data"

export default function Home() {
  // const [chartType, setChartType] = useState<SeriesType>("candlestick")

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

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      <div className="flex-1 pl-[150px] pt-8">
        <div className="flex items-start mt-2">
          <div className="mr-3 ml-[-100]">
          </div>
          <div>
            <h1 className="text-black text-[22px] font-semibold">
              무스 <span className="text-sm font-medium text-gray-500">@무스</span>
            </h1>
            <h2 className="text-black text-[22px] mb-4">
              89,650원 <span className="text-[15px] text-red-500">+0.9% (800원)</span>
            </h2>
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

