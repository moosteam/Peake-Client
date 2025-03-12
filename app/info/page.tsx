"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import * as LightweightCharts from 'lightweight-charts';

export default function Home() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
      
      const chart = LightweightCharts.createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 500,
        layout: {
          background: { type: 'solid', color: 'white' },
          textColor: 'rgba(33, 56, 77, 1)',
        },
        grid: {
          vertLines: {
            color: 'rgba(197, 203, 206, 0.5)',
          },
          horzLines: {
            color: 'rgba(197, 203, 206, 0.5)',
          },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      });

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });

      const volumeSeries = chart.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });

      const candleData = [
        { time: '2023-01-01', open: 6500, high: 6700, low: 6400, close: 6600 },
        { time: '2023-01-02', open: 6600, high: 6800, low: 6550, close: 6750 },
        { time: '2023-01-03', open: 6750, high: 6830, low: 6650, close: 6700 },
        { time: '2023-01-04', open: 6700, high: 6900, low: 6680, close: 6850 },
        { time: '2023-01-05', open: 6850, high: 7000, low: 6800, close: 6950 },
      ];

      const volumeData = [
        { time: '2023-01-01', value: 20000 },
        { time: '2023-01-02', value: 25000 },
        { time: '2023-01-03', value: 18000 },
        { time: '2023-01-04', value: 30000 },
        { time: '2023-01-05', value: 22000 },
      ];

      candlestickSeries.setData(candleData);
      volumeSeries.setData(volumeData);

      const handleResize = () => {
        if (chartContainerRef.current && chart) {
          chart.applyOptions({ 
            width: chartContainerRef.current.clientWidth 
          });
        }
      };

      window.addEventListener('resize', handleResize);
      
      chartRef.current = chart;

      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartRef.current) {
          chart.remove();
          chartRef.current = null;
        }
      };
    }
  }, []);

  const fetchChartData = async () => {

  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 pl-[150px] pt-8">
        <div className="flex items-start mt-2">
          <div className="mr-3 ml-[-100]">
            <Image src="/logo2.svg" alt="로고" width={64} height={40} className="rounded-[8px]" />
          </div>
          <div>
            <h1 className="text-black text-[22px] font-semibold">
              무스 <span className="text-sm font-medium text-gray-500">@무스</span>
            </h1>
            <h2 className="text-black text-[22px] mb-4">
              6,600원 <span className="text-[15px] text-red-500">+1.9% (123원)</span>
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4 ml-[-100]">
          <div className="w-full border border-gray-200 p-4 bg-transparent h-[600px]">
            <div id="chart-container" ref={chartContainerRef} className="w-full h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
