"use client"

import React, { useEffect, useRef, useState, useLayoutEffect } from "react"
import {
  createChart,
  AreaSeries,
  BarSeries,
  BaselineSeries,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
  ColorType,
  type IChartApi,
  type SeriesOptionsMap,
} from "lightweight-charts"

interface ChartColors {
  backgroundColor?: string
  lineColor?: string
  textColor?: string
  areaTopColor?: string
  areaBottomColor?: string
}

export type SeriesType = "area" | "bar" | "bar2" | "baseline" | "candlestick" | "histogram" | "line"

interface ChartComponentProps {
  seriesType?: SeriesType
  data?: any[]
  seriesOptions?: Record<string, any>
  chartOptions?: Record<string, any>
  colors?: ChartColors
  onSeriesTypeChange?: (type: SeriesType) => void
  onTimeRangeChange?: (range: string) => void
}

const timeRangeOptions = ["1시간", "6시간", "1일", "1주일", "1개월"]

export const ChartComponent: React.FC<ChartComponentProps> = (props) => {
  const {
    seriesType = "area",
    data = [],
    seriesOptions = {},
    chartOptions = {},
    colors = {},
    onSeriesTypeChange,
    onTimeRangeChange,
  } = props

  const [selectedTimeRange, setSelectedTimeRange] = useState("1일")
  const [zoomLevel, setZoomLevel] = useState(0.8)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const fixedSplitRatio = 0.5
  const volumeHeightRatio = 0.12

  const {
    backgroundColor = "white",
    lineColor = "black",
    textColor = "black",
    areaTopColor = "#2962FF",
    areaBottomColor = "rgba(41, 98, 255, 0.28)",
  } = colors

  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<IChartApi | null>(null)

  const handleSeriesTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as SeriesType
    if (onSeriesTypeChange) {
      onSeriesTypeChange(newType)
    }
  }

  const handleTimeRangeChange = (range: string) => {
    setSelectedTimeRange(range)
    if (onTimeRangeChange) {
      onTimeRangeChange(range)
    }
  }

  const handleZoomIn = () => {
    if (!chartInstance.current) return
    const timeScale = chartInstance.current.timeScale()
    const visibleRange = timeScale.getVisibleLogicalRange()
    if (visibleRange !== null) {
      const rangeSize = visibleRange.to - visibleRange.from
      const middlePoint = (visibleRange.from + visibleRange.to) / 2
      const newRange = { from: middlePoint - rangeSize * 0.4, to: middlePoint + rangeSize * 0.4 }
      timeScale.setVisibleLogicalRange(newRange)
      setZoomLevel(zoomLevel + 0.2)
    }
  }

  const handleZoomOut = () => {
    if (!chartInstance.current) return
    const timeScale = chartInstance.current.timeScale()
    const visibleRange = timeScale.getVisibleLogicalRange()
    if (visibleRange !== null) {
      const rangeSize = visibleRange.to - visibleRange.from
      const middlePoint = (visibleRange.from + visibleRange.to) / 2
      const newRange = { from: middlePoint - rangeSize * 0.7, to: middlePoint + rangeSize * 0.7 }
      timeScale.setVisibleLogicalRange(newRange)
      setZoomLevel(Math.max(0.2, zoomLevel - 0.2))
    }
  }

  const handleZoomReset = () => {
    if (!chartInstance.current) return
    chartInstance.current.timeScale().fitContent()
    setTimeout(() => {
      if (!chartInstance.current) return
      const timeScale = chartInstance.current.timeScale()
      const visibleRange = timeScale.getVisibleLogicalRange()
      if (visibleRange !== null) {
        const rangeSize = visibleRange.to - visibleRange.from
        const middlePoint = (visibleRange.from + visibleRange.to) / 2
        const newRange = { from: middlePoint - rangeSize * 0.6, to: middlePoint + rangeSize * 0.6 }
        timeScale.setVisibleLogicalRange(newRange)
      }
      setZoomLevel(0.8)
    }, 50)
  }

  useLayoutEffect(() => {
    if (!containerRef.current || !chartRef.current) return
    const defaultChartOptions = {
      layout: { background: { type: ColorType.Solid, color: backgroundColor }, textColor },
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      grid: { vertLines: { color: "transparent" }, horzLines: { color: "rgba(197, 203, 206, 0.2)" } },
      timeScale: {
        borderColor: "transparent",
        timeVisible: true,
        secondsVisible: false,
        fixLeftEdge: false,
        fixRightEdge: false,
        minBarSpacing: 0.5,
        rightOffset: 5,
        barSpacing: 6,
        rightBarStaysOnScroll: false,
      },
      rightPriceScale: {
        borderColor: "transparent",
        scaleMargins: { top: 0.02, bottom: 1 - fixedSplitRatio + 0.02 },
        entireTextOnly: true,
      },
      ...chartOptions,
    }

    chartInstance.current = createChart(chartRef.current, defaultChartOptions)
    const commonSeriesOptions = { priceLineVisible: false, lastValueVisible: true }
    let mainSeries
    switch (seriesType) {
      case "candlestick":
        mainSeries = chartInstance.current.addSeries(CandlestickSeries, {
          ...commonSeriesOptions,
          upColor: "#E23C3C",
          downColor: "#3C82E2",
          borderVisible: true,
          borderUpColor: "#FFFFFF",
          borderDownColor: "#FFFFFF",
          wickUpColor: "#E23C3C",
          wickDownColor: "#3C82E2",
          ...seriesOptions,
        } as SeriesOptionsMap["Candlestick"])
        break
      case "area":
        mainSeries = chartInstance.current.addSeries(AreaSeries, {
          ...commonSeriesOptions,
          lineColor,
          topColor: areaTopColor,
          bottomColor: areaBottomColor,
          lineWidth: 2,
          ...seriesOptions,
        } as SeriesOptionsMap["Area"])
        break
      case "bar":
        mainSeries = chartInstance.current.addSeries(BarSeries, {
          ...commonSeriesOptions,
          upColor: "#E23C3C",
          downColor: "#3C82E2",
          ...seriesOptions,
        } as SeriesOptionsMap["Bar"])
        break
      case "bar2":
        mainSeries = chartInstance.current.addSeries(BarSeries, {
          ...commonSeriesOptions,
          upColor: "#4CAF50",
          downColor: "#9C27B0",
          ...seriesOptions,
        } as SeriesOptionsMap["Bar"])
        break
      case "baseline":
        mainSeries = chartInstance.current.addSeries(BaselineSeries, {
          ...commonSeriesOptions,
          baseValue: { type: "price", price: 0 },
          topLineColor: "#E23C3C",
          topFillColor1: "#E23C3C",
          topFillColor2: "#3C82E2",
          bottomLineColor: "#3C82E2",
          bottomFillColor1: "#3C82E3",
          bottomFillColor2: "#E23C3C",
          lineWidth: 2,
          ...seriesOptions,
        } as SeriesOptionsMap["Baseline"])
        break
      case "histogram":
        mainSeries = chartInstance.current.addSeries(HistogramSeries, {
          ...commonSeriesOptions,
          color: "#E23C3C",
          priceFormat: { type: "volume" },
          ...seriesOptions,
        } as SeriesOptionsMap["Histogram"])
        break
      case "line":
        mainSeries = chartInstance.current.addSeries(LineSeries, {
          ...commonSeriesOptions,
          color: lineColor,
          lineWidth: 2,
          crosshairMarkerVisible: true,
          ...seriesOptions,
        } as SeriesOptionsMap["Line"])
        break
      default:
        console.error("알 수 없는 시리즈 타입입니다:", seriesType)
    }

    const volumeSeries = chartInstance.current.addSeries(HistogramSeries, {
      priceFormat: {
        type: "volume",
        formatter: (value: number) => {
          if (value >= 1000000) {
            return (value / 1000000).toFixed(2) + "M"
          } else if (value >= 1000) {
            return (value / 1000).toFixed(2) + "K"
          }
          return value.toFixed(0)
        },
      },
      priceScaleId: "volume",
      base: 0,
    } as unknown as SeriesOptionsMap["Histogram"])

    chartInstance.current.priceScale("volume").applyOptions({
      scaleMargins: { top: 1 - volumeHeightRatio, bottom: 0 },
      borderVisible: false,
      entireTextOnly: true,
      mode: 1,
      textColor: "rgba(120, 123, 134, 0.8)",
    })

    if (mainSeries && data.length > 0) {
      mainSeries.setData(data)
    }

    if (volumeSeries && data.length > 0) {
      const volumeData = data.map((item: any) => ({
        time: item.time,
        value: item.value,
        color: item.close >= item.open ? "#E23C3C" : "#3C82E2",
      }))
      volumeSeries.setData(volumeData)
    }

    if (data.length > 0) {
      const timeScale = chartInstance.current.timeScale()
      timeScale.fitContent()
      const visibleRange = timeScale.getVisibleLogicalRange()
      if (visibleRange !== null) {
        const rangeSize = visibleRange.to - visibleRange.from
        const middlePoint = (visibleRange.from + visibleRange.to) / 2
        const newRangeSize = rangeSize * 0.8
        timeScale.setVisibleLogicalRange({
          from: middlePoint - newRangeSize / 2,
          to: middlePoint + newRangeSize / 2,
        })
        setIsInitialLoad(false)
      }
    }

    const handleResize = () => {
      if (!containerRef.current || !chartInstance.current) return
      const width = containerRef.current.clientWidth
      chartInstance.current.applyOptions({ width })
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (chartInstance.current) {
        chartInstance.current.remove()
        chartInstance.current = null
      }
    }
  }, [
    seriesType,
    data,
    seriesOptions,
    chartOptions,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ])

  useEffect(() => {
    if (data.length > 0) {
      setIsInitialLoad(true)
    }
  }, [data])

  return (
    <div>
      <div className="mb-4 flex flex-col space-y-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex overflow-x-auto pb-1 mb-2 w-full">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              {timeRangeOptions.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => handleTimeRangeChange(range)}
                  className={`px-4 py-2 text-sm font-medium border ${
                    selectedTimeRange === range
                      ? "bg-blue-600 text-white border-blue-600 z-10"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  } ${range === timeRangeOptions[0] ? "rounded-l-md" : ""} ${
                    range === timeRangeOptions[timeRangeOptions.length - 1] ? "rounded-r-md" : ""
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <label htmlFor="chart-type-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
              차트 타입:
            </label>
            <select
              id="chart-type-select"
              value={seriesType}
              onChange={handleSeriesTypeChange}
              className="block w-full sm:w-auto px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="area">Area</option>
              <option value="bar">Bar</option>
              <option value="bar2">막대2</option>
              <option value="baseline">Baseline</option>
              <option value="candlestick">캔들스틱</option>
              <option value="histogram">히스토그램</option>
              <option value="line">라인</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={handleZoomIn}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors"
              title="확대"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors"
              title="축소"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button
              onClick={handleZoomReset}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors"
              title="원래 크기로"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9z"></path>
                <path d="M12 7v5l3 3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div ref={containerRef} className="relative" style={{ width: "100%", height: "600px" }}>
        <div ref={chartRef} className="w-full h-full" />
      </div>
    </div>
  )
}

export default ChartComponent
