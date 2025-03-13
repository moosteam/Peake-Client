"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChartComponent } from "../components/stock/chart/chart";
import type { SeriesType } from "../components/stock/chart/chart";

export default function Home() {
  const [chartType, setChartType] = useState<SeriesType>('candlestick');
  
  const candlestickData = [
    { time: '2025-07-03', open: 65230, high: 65890, low: 64750, close: 65420, value: 500 },
    { time: '2025-07-04', open: 65420, high: 66100, low: 65280, close: 65940, value: 500 },
    { time: '2025-07-05', open: 65940, high: 66450, low: 65730, close: 66120, value: 500 },
    { time: '2025-07-06', open: 66120, high: 66580, low: 65700, close: 65880, value: 500 },
    { time: '2025-07-07', open: 65880, high: 66230, low: 65520, close: 65970, value: 500 },
    { time: '2025-07-08', open: 65970, high: 67540, low: 65850, close: 67320, value: 500 },
    { time: '2025-07-09', open: 67320, high: 67980, low: 67190, close: 67850, value: 500 },
    { time: '2025-07-10', open: 67850, high: 68470, low: 67640, close: 68210, value: 500 },
    { time: '2025-07-11', open: 68210, high: 68750, low: 67590, close: 67850, value: 500 },
    { time: '2025-07-12', open: 67850, high: 68120, low: 67230, close: 67540, value: 500 },
    { time: '2025-07-13', open: 67540, high: 67980, low: 67220, close: 67870, value: 500 },
    { time: '2025-07-14', open: 67870, high: 68650, low: 67750, close: 68430, value: 500 },
    { time: '2025-07-15', open: 68430, high: 69150, low: 68200, close: 68970, value: 500 },
    { time: '2025-07-16', open: 68970, high: 69540, low: 68740, close: 69280, value: 500 },
    { time: '2025-07-17', open: 69280, high: 70120, low: 69150, close: 69850, value: 500 },
    { time: '2025-07-18', open: 69850, high: 70560, low: 69720, close: 70430, value: 500 },
    { time: '2025-07-19', open: 70430, high: 70920, low: 69980, close: 70150, value: 500 },
    { time: '2025-07-20', open: 70150, high: 70580, low: 69850, close: 70320, value: 500 },
    { time: '2025-07-21', open: 70320, high: 71240, low: 70150, close: 71090, value: 500 },
    { time: '2025-07-22', open: 71090, high: 71430, low: 70780, close: 71350, value: 500 },
    { time: '2025-07-23', open: 71350, high: 72680, low: 71200, close: 72450, value: 500 },
    { time: '2025-07-24', open: 72450, high: 72890, low: 71980, close: 72650, value: 500 },
    { time: '2025-07-25', open: 72650, high: 73210, low: 72330, close: 73050, value: 500 },
    { time: '2025-07-26', open: 73050, high: 73680, low: 72840, close: 73450, value: 500 },
    { time: '2025-07-27', open: 73450, high: 74120, low: 73280, close: 73920, value: 500 },
    { time: '2025-07-28', open: 73920, high: 74580, low: 73450, close: 74250, value: 500 },
    { time: '2025-07-29', open: 74250, high: 74890, low: 73980, close: 74680, value: 500 },
    { time: '2025-07-30', open: 74680, high: 75320, low: 74450, close: 75180, value: 500 },
    { time: '2025-07-31', open: 75180, high: 75650, low: 74320, close: 74580, value: 500 },
    { time: '2025-08-01', open: 74580, high: 74950, low: 73890, close: 74320, value: 500 },
    { time: '2025-08-02', open: 74320, high: 74680, low: 73750, close: 74150, value: 500 },
    { time: '2025-08-03', open: 74150, high: 74380, low: 72980, close: 73250, value: 500 },
    { time: '2025-08-04', open: 73250, high: 73680, low: 72450, close: 72850, value: 500 },
    { time: '2025-08-05', open: 72850, high: 73250, low: 72520, close: 73120, value: 500 },
    { time: '2025-08-06', open: 73120, high: 73850, low: 72980, close: 73680, value: 500 },
    { time: '2025-08-07', open: 73680, high: 74320, low: 73540, close: 74190, value: 500 },
    { time: '2025-08-08', open: 74190, high: 74560, low: 73920, close: 74380, value: 500 },
    { time: '2025-08-09', open: 74380, high: 75020, low: 74250, close: 74870, value: 500 },
    { time: '2025-08-10', open: 74870, high: 75420, low: 74690, close: 75340, value: 500 },
    { time: '2025-08-11', open: 75340, high: 75890, low: 75120, close: 75720, value: 500 },
    { time: '2025-08-12', open: 75720, high: 76240, low: 75480, close: 76120, value: 500 },
    { time: '2025-08-13', open: 76120, high: 76590, low: 75850, close: 76450, value: 500 },
    { time: '2025-08-14', open: 76450, high: 76980, low: 76230, close: 76870, value: 500 },
    { time: '2025-08-15', open: 76870, high: 77350, low: 76580, close: 77220, value: 500 },
    { time: '2025-08-16', open: 77220, high: 77680, low: 76950, close: 77450, value: 500 },
    { time: '2025-08-17', open: 77450, high: 77920, low: 76890, close: 77120, value: 500 },
    { time: '2025-08-18', open: 77120, high: 77560, low: 76450, close: 76850, value: 500 },
    { time: '2025-08-19', open: 76850, high: 77320, low: 76580, close: 77150, value: 500 },
    { time: '2025-08-20', open: 77150, high: 77690, low: 76980, close: 77540, value: 500 },
    { time: '2025-08-21', open: 77540, high: 78150, low: 77320, close: 77980, value: 500 },
    { time: '2025-08-22', open: 77980, high: 78540, low: 77820, close: 78320, value: 500 },
    { time: '2025-08-23', open: 78320, high: 78980, low: 78150, close: 78790, value: 500 },
    { time: '2025-08-24', open: 78790, high: 79320, low: 78650, close: 79180, value: 500 },
    { time: '2025-08-25', open: 79180, high: 79680, low: 78920, close: 79480, value: 500 },
    { time: '2025-08-26', open: 79480, high: 79950, low: 79150, close: 79750, value: 500 },
    { time: '2025-08-27', open: 79750, high: 80280, low: 79450, close: 80120, value: 500 },
    { time: '2025-08-28', open: 80120, high: 80650, low: 79780, close: 80450, value: 500 },
    { time: '2025-08-29', open: 80450, high: 80920, low: 79980, close: 80580, value: 500 },
    { time: '2025-08-30', open: 80580, high: 81250, low: 80320, close: 81080, value: 500 },
    { time: '2025-08-31', open: 81080, high: 81650, low: 80780, close: 81420, value: 500 },
    { time: '2025-09-01', open: 81420, high: 81960, low: 81150, close: 81780, value: 500 },
    { time: '2025-09-02', open: 81780, high: 82350, low: 81620, close: 82250, value: 500 },
    { time: '2025-09-03', open: 82250, high: 82740, low: 81980, close: 82520, value: 500 },
    { time: '2025-09-04', open: 82520, high: 83100, low: 82380, close: 82950, value: 500 },
    { time: '2025-09-05', open: 82950, high: 83480, low: 82780, close: 83350, value: 500 },
    { time: '2025-09-06', open: 83350, high: 83820, low: 83120, close: 83780, value: 500 },
    { time: '2025-09-07', open: 83780, high: 84250, low: 83550, close: 84150, value: 500 },
    { time: '2025-09-08', open: 84150, high: 84650, low: 83890, close: 84520, value: 500 },
    { time: '2025-09-09', open: 84520, high: 84980, low: 84120, close: 84850, value: 500 },
    { time: '2025-09-10', open: 84850, high: 85350, low: 84520, close: 85180, value: 500 },
    { time: '2025-09-11', open: 85180, high: 85720, low: 84950, close: 85450, value: 500 },
    { time: '2025-09-12', open: 85450, high: 85980, low: 84780, close: 85120, value: 500 },
    { time: '2025-09-13', open: 85120, high: 85580, low: 84450, close: 84850, value: 500 },
    { time: '2025-09-14', open: 84850, high: 85320, low: 84250, close: 84580, value: 500 },
    { time: '2025-09-15', open: 84580, high: 84950, low: 83650, close: 83980, value: 500 },
    { time: '2025-09-16', open: 83980, high: 84350, low: 83450, close: 84120, value: 500 },
    { time: '2025-09-17', open: 84120, high: 84750, low: 83980, close: 84580, value: 500 },
    { time: '2025-09-18', open: 84580, high: 85120, low: 84380, close: 84950, value: 500 },
    { time: '2025-09-19', open: 84950, high: 85480, low: 84780, close: 85350, value: 500 },
    { time: '2025-09-20', open: 85350, high: 85880, low: 85120, close: 85750, value: 500 },
    { time: '2025-09-21', open: 85750, high: 86250, low: 85580, close: 86150, value: 500 },
    { time: '2025-09-22', open: 86150, high: 86650, low: 85980, close: 86520, value: 500 },
    { time: '2025-09-23', open: 86520, high: 87050, low: 86350, close: 86980, value: 500 },
    { time: '2025-09-24', open: 86980, high: 87450, low: 86720, close: 87320, value: 500 },
    { time: '2025-09-25', open: 87320, high: 87850, low: 87080, close: 87650, value: 500 },
    { time: '2025-09-26', open: 87650, high: 88250, low: 87450, close: 88120, value: 500 },
    { time: '2025-09-27', open: 88120, high: 88580, low: 87650, close: 87920, value: 500 },
    { time: '2025-09-28', open: 87920, high: 88350, low: 87580, close: 88120, value: 500 },
    { time: '2025-09-29', open: 88120, high: 88750, low: 87980, close: 88520, value: 500 },
    { time: '2025-09-30', open: 88520, high: 89150, low: 88350, close: 88950, value: 500 },
    { time: '2025-10-01', open: 88950, high: 89480, low: 88720, close: 89320, value: 500 },
    { time: '2025-10-02', open: 89320, high: 89850, low: 89050, close: 89650, value: 500 }
  ];

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
              89,650원 <span className="text-[15px] text-red-500">+0.9% (800원)</span>
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4 ml-[-100]">
          <ChartComponent 
            seriesType={chartType}
            data={candlestickData}
            onSeriesTypeChange={setChartType}
            chartOptions={{
              height: 400,
              layout: {
                background: { type: 'solid', color: 'white' },
                textColor: 'black',
              },
              crosshair: {
                mode: 1,
                vertLine: {
                  visible: true,
                  width: 2,         // 더 두껍게
                  color: 'rgba(21, 101, 192, 0.8)', // 더 진한 파란색
                  style: 1,         // 실선으로 시도
                },
                horzLine: {
                  visible: true,
                  width: 2,         // 더 두껍게
                  color: 'rgba(21, 101, 192, 0.8)', // 더 진한 파란색
                  style: 1,         // 실선으로 시도
                },
              },
              grid: {
                vertLines: {
                  color: 'rgba(197, 203, 206, 0.5)',
                },
                horzLines: {
                  color: 'rgba(197, 203, 206, 0.5)',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
