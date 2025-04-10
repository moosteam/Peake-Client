"use client"

import { useState, useEffect } from "react"
import ChannelHeader from "@components/info/ChannelHeader"
import TimelineControls from "@components/info/TimelineControls"
import PriceStats from "@components/info/PriceStats"
import TradePanel from "@components/info/TradePanel"
import MarqueeNews from "@components/info/MarqueeNews"
import { ChartComponent } from "@components/chart/chart/chart"
import type { SeriesType } from "@components/chart/chart/chart"
import OrderBook from "@components/info/OrderBook"

export default function ChannelInfoPage() {
  const [selectedTimeOption, setSelectedTimeOption] = useState<string>("1시간")
  const [selectedPeriodOption, setSelectedPeriodOption] = useState<string | null>(null)
  const [chartData, setChartData] = useState<any[]>([])
  const [seriesType, setSeriesType] = useState<SeriesType>("candlestick")
  
  // Time options
  const minuteOptions = ["1시간", "6시간", "1일", "1주일", "1달", "1년"]
  const periodOptions = ["AI 차트 형식", "지표"]

  // Handle time selection
  const handleTimeSelection = (option: string) => {
    if (minuteOptions.includes(option)) {
      setSelectedTimeOption(option)
      setSelectedPeriodOption(null)
    } else if (periodOptions.includes(option)) {
      setSelectedPeriodOption(option)
      setSelectedTimeOption("")
    }
  }

  // Generate mock chart data based on selected time option
  useEffect(() => {
    // Generate sample data for the chart
    const generateData = () => {
      const now = new Date()
      const data = []
      let timeStep: number
      let dataPoints: number
      
      switch (selectedTimeOption) {
        case "1시간":
          timeStep = 60 // 1 minute intervals
          dataPoints = 60
          break
        case "6시간":
          timeStep = 360 // 6 minute intervals
          dataPoints = 60
          break
        case "1일":
          timeStep = 1440 // 24 minute intervals
          dataPoints = 60
          break
        case "1주일":
          timeStep = 10080 // 168 minute intervals (weekly)
          dataPoints = 60
          break
        case "1달":
          timeStep = 43200 // 720 minute intervals (monthly)
          dataPoints = 60
          break
        case "1년":
          timeStep = 525600 // 8760 minute intervals (yearly)
          dataPoints = 60
          break
        default:
          timeStep = 1440
          dataPoints = 60
      }

      // Base value and volatility
      let baseValue = 20000
      
      for (let i = 0; i < dataPoints; i++) {
        const time = Math.floor(now.getTime() / 1000) - (dataPoints - i) * timeStep
        
        // Add some randomness to create realistic looking data
        if (Math.random() > 0.5) {
          baseValue += 500
        }
        else {
          baseValue -= 500
        }
        
        
        if (seriesType === "candlestick") {
          // For candlestick charts
          const open = baseValue
          const high = open + open * (Math.random()/8)
          const low = open - open * (Math.random()/8)
          const close = baseValue - baseValue * (Math.random()/8) + baseValue * (Math.random()/8)
          
          data.push({
            time,
            open,
            high,
            low,
            close
          })
        } else {
          // For other chart types
          data.push({
            time,
            value: baseValue
          })
        }
      }
      
      return data
    }
    
    setChartData(generateData())
  }, [selectedTimeOption, seriesType])

  // Handle series type change
  const handleSeriesTypeChange = (type: SeriesType) => {
    setSeriesType(type)
  }

  // Price statistics
  const priceStats = [
    { period: "1시간", change: "-1.31%", color: "text-red-500" },
    { period: "6시간", change: "-5.85%", color: "text-red-500" },
    { period: "1일", change: "+1.72%", color: "text-green-500" },
    { period: "1주일", change: "+24.88%", color: "text-green-500" },
  ]

  // Amount options for trading
  const amountOptions = ["1,000", "10,000", "50,000", "100,000"]

  // Marquee news items
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

  // Chart colors
  const chartColors = {
    backgroundColor: "white",
    lineColor: "#2962FF",
    textColor: "#333333",
    areaTopColor: "#2962FF",
    areaBottomColor: "rgba(41, 98, 255, 0.28)",
  }

  return (
    <div className="flex min-h-screen bg-white flex-col">
      <div className="flex-1 px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
          {/* Left section - Profile and Chart */}
          <div className="flex-1">
            <ChannelHeader 
              name="침착맨"
              description="반갑습니다. 오늘도 즐겁게 날입니다."
              subscriberCount={2000000}
              changePercentage="+5.5%"
              changeTime="2시간"
            />
            
            <TimelineControls
              minuteOptions={minuteOptions}
              periodOptions={periodOptions}
              selectedTimeOption={selectedTimeOption}
              // selectedPeriodOption={selectedPeriodOption}
              onTimeSelection={handleTimeSelection}
            />

            <div className="mt-6 rounded-lg">
              <ChartComponent
                seriesType={seriesType}
                data={chartData}
                colors={chartColors}
                onSeriesTypeChange={handleSeriesTypeChange}
                onTimeRangeChange={handleTimeSelection}
                width="100%"
                height="400px"
                chartOptions={{
                  timeScale: {
                    timeVisible: true,
                    secondsVisible: false,
                  }
                }}
              />
            </div>
          </div>

          {/* Right section - Stats and Buy/Sell */}
          <div className="w-full lg:w-72 flex flex-col gap-3">
            <OrderBook />
            <PriceStats stats={priceStats} />
            <TradePanel amountOptions={amountOptions} />
          </div>
        </div>
      </div>

      <MarqueeNews items={marqueeItems} />
    </div>
  )
}

