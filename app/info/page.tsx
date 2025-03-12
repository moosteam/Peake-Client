"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChartComponent } from "../components/stock/chart/chart";
import type { SeriesType } from "../components/stock/chart/chart";

export default function Home() {
  const [chartType, setChartType] = useState<SeriesType>('candlestick');
  
  const candlestickData = [
    { time: '2025-07-03', open: 583, high: 605, low: 560, close: 575, value: 500 },
    { time: '2025-07-04', open: 575, high: 590, low: 550, close: 588, value: 500 },
    { time: '2025-07-05', open: 588, high: 620, low: 570, close: 615, value: 500 },
    { time: '2025-07-06', open: 615, high: 650, low: 600, close: 625, value: 500 },
    { time: '2025-07-07', open: 625, high: 640, low: 595, close: 635, value: 500 },
    { time: '2025-07-08', open: 635, high: 670, low: 620, close: 660, value: 500 },
    { time: '2025-07-09', open: 660, high: 700, low: 650, close: 685, value: 500 },
    { time: '2025-07-10', open: 685, high: 720, low: 670, close: 710, value: 500 },
    { time: '2025-07-11', open: 710, high: 750, low: 700, close: 735, value: 500 },
    { time: '2025-07-12', open: 735, high: 770, low: 720, close: 755, value: 500 },
    { time: '2025-07-13', open: 755, high: 790, low: 740, close: 780, value: 500 },
    { time: '2025-07-14', open: 780, high: 820, low: 770, close: 805, value: 500 },
    { time: '2025-07-15', open: 805, high: 840, low: 790, close: 825, value: 500 },
    { time: '2025-07-16', open: 825, high: 860, low: 810, close: 845, value: 500 },
    { time: '2025-07-17', open: 845, high: 880, low: 830, close: 865, value: 500 },
    { time: '2025-07-18', open: 865, high: 900, low: 850, close: 885, value: 500 },
    { time: '2025-07-19', open: 885, high: 920, low: 870, close: 905, value: 500 },
    { time: '2025-07-20', open: 905, high: 940, low: 890, close: 925, value: 500 },
    { time: '2025-07-21', open: 925, high: 960, low: 910, close: 945, value: 500 },
    { time: '2025-07-22', open: 945, high: 980, low: 930, close: 965, value: 500 },
    { time: '2025-07-23', open: 965, high: 1000, low: 950, close: 985, value: 500 },
    { time: '2025-07-24', open: 985, high: 1020, low: 970, close: 1005, value: 500 },
    { time: '2025-07-25', open: 1005, high: 1040, low: 990, close: 1025, value: 500 },
    { time: '2025-07-26', open: 1025, high: 1060, low: 1010, close: 1045, value: 500 },
    { time: '2025-07-27', open: 1045, high: 1080, low: 1030, close: 1065, value: 500 },
    { time: '2025-07-28', open: 1065, high: 1100, low: 1050, close: 1085, value: 500 },
    { time: '2025-07-29', open: 1085, high: 1120, low: 1070, close: 1105, value: 500 },
    { time: '2025-07-30', open: 1105, high: 1140, low: 1090, close: 1125, value: 500 },
    { time: '2025-07-31', open: 1125, high: 1160, low: 1110, close: 1145, value: 500 },
    { time: '2025-08-01', open: 1145, high: 1180, low: 1130, close: 1165, value: 500 },
    { time: '2025-08-02', open: 1165, high: 1200, low: 1150, close: 1185, value: 500 },
    { time: '2025-08-03', open: 1185, high: 1220, low: 1170, close: 1205, value: 500 },
    { time: '2025-08-04', open: 1205, high: 1240, low: 1190, close: 1225, value: 500 },
    { time: '2025-08-05', open: 1225, high: 1260, low: 1210, close: 1245, value: 500 },
    { time: '2025-08-06', open: 1245, high: 1280, low: 1230, close: 1265, value: 500 },
    { time: '2025-08-07', open: 1265, high: 1300, low: 1250, close: 1285, value: 500 },
    { time: '2025-08-08', open: 1285, high: 1320, low: 1270, close: 1305, value: 500 },
    { time: '2025-08-09', open: 1305, high: 1340, low: 1290, close: 1325, value: 500 },
    { time: '2025-08-10', open: 1325, high: 1360, low: 1310, close: 1345, value: 500 },
    { time: '2025-08-11', open: 1345, high: 1380, low: 1330, close: 1365, value: 500 },
    { time: '2025-08-12', open: 1365, high: 1400, low: 1350, close: 1385, value: 500 },
    { time: '2025-08-13', open: 1385, high: 1420, low: 1370, close: 1405, value: 500 },
    { time: '2025-08-14', open: 1405, high: 1440, low: 1390, close: 1425, value: 500 },
    { time: '2025-08-15', open: 1425, high: 1460, low: 1410, close: 1445, value: 500 },
    { time: '2025-08-16', open: 1445, high: 1480, low: 1430, close: 1465, value: 500 },
    { time: '2025-08-17', open: 1465, high: 1500, low: 1450, close: 1485, value: 500 },
    { time: '2025-08-18', open: 1485, high: 1520, low: 1470, close: 1505, value: 500 },
    { time: '2025-08-19', open: 1505, high: 1540, low: 1490, close: 1525, value: 500 },
    { time: '2025-08-20', open: 1525, high: 1560, low: 1510, close: 1545, value: 500 },
    { time: '2025-08-21', open: 1545, high: 1580, low: 1530, close: 1565, value: 500 },
    { time: '2025-08-22', open: 1565, high: 1600, low: 1550, close: 1585, value: 500 },
    { time: '2025-08-23', open: 1585, high: 1620, low: 1570, close: 1605, value: 500 },
    { time: '2025-08-24', open: 1605, high: 1640, low: 1590, close: 1625, value: 500 },
    { time: '2025-08-25', open: 1625, high: 1660, low: 1610, close: 1645, value: 500 },
    { time: '2025-08-26', open: 1645, high: 1680, low: 1630, close: 1665, value: 500 },
    { time: '2025-08-27', open: 1665, high: 1700, low: 1650, close: 1685, value: 500 },
    { time: '2025-08-28', open: 1685, high: 1720, low: 1670, close: 1705, value: 500 },
    { time: '2025-08-29', open: 1705, high: 1740, low: 1690, close: 1725, value: 500 },
    { time: '2025-08-30', open: 1725, high: 1760, low: 1710, close: 1745, value: 500 },
    { time: '2025-08-31', open: 1745, high: 1780, low: 1730, close: 1765, value: 500 },
    { time: '2025-09-01', open: 1765, high: 1800, low: 1750, close: 1785, value: 500 },
    { time: '2025-09-02', open: 1785, high: 1820, low: 1770, close: 1805, value: 500 },
    { time: '2025-09-03', open: 1805, high: 1840, low: 1790, close: 1825, value: 500 },
    { time: '2025-09-04', open: 1825, high: 1860, low: 1810, close: 1845, value: 500 },
    { time: '2025-09-05', open: 1845, high: 1880, low: 1830, close: 1865, value: 500 },
    { time: '2025-09-06', open: 1865, high: 1900, low: 1850, close: 1885, value: 500 },
    { time: '2025-09-07', open: 1885, high: 1920, low: 1870, close: 1905, value: 500 },
    { time: '2025-09-08', open: 1905, high: 1940, low: 1890, close: 1925, value: 500 },
    { time: '2025-09-09', open: 1925, high: 1960, low: 1910, close: 1945, value: 500 },
    { time: '2025-09-10', open: 1945, high: 1980, low: 1930, close: 1965, value: 500 },
    { time: '2025-09-11', open: 1965, high: 2000, low: 1950, close: 1985, value: 500 },
    { time: '2025-09-12', open: 1985, high: 2020, low: 1970, close: 2005, value: 500 },
    { time: '2025-09-13', open: 2005, high: 2040, low: 1990, close: 2025, value: 500 },
    { time: '2025-09-14', open: 2025, high: 2060, low: 2010, close: 2045, value: 500 },
    { time: '2025-09-15', open: 2045, high: 2080, low: 2030, close: 2065, value: 500 },
    { time: '2025-09-16', open: 2065, high: 2100, low: 2050, close: 2085, value: 500 },
    { time: '2025-09-17', open: 2085, high: 2120, low: 2070, close: 2105, value: 500 },
    { time: '2025-09-18', open: 2105, high: 2140, low: 2090, close: 2125, value: 500 },
    { time: '2025-09-19', open: 2125, high: 2160, low: 2110, close: 2145, value: 500 },
    { time: '2025-09-20', open: 2145, high: 2180, low: 2130, close: 2165, value: 500 },
    { time: '2025-09-21', open: 2165, high: 2200, low: 2150, close: 2185, value: 500 },
    { time: '2025-09-22', open: 2185, high: 2220, low: 2170, close: 2205, value: 500 },
    { time: '2025-09-23', open: 2205, high: 2240, low: 2190, close: 2225, value: 500 },
    { time: '2025-09-24', open: 2225, high: 2260, low: 2210, close: 2245, value: 500 },
    { time: '2025-09-25', open: 2245, high: 2280, low: 2230, close: 2265, value: 500 },
    { time: '2025-09-26', open: 2265, high: 2300, low: 2250, close: 2285, value: 500 },
    { time: '2025-09-27', open: 2285, high: 2320, low: 2270, close: 2305, value: 500 },
    { time: '2025-09-28', open: 2305, high: 2340, low: 2290, close: 2325, value: 500 },
    { time: '2025-09-29', open: 2325, high: 2360, low: 2310, close: 2345, value: 500 },
    { time: '2025-09-30', open: 2345, high: 2380, low: 2330, close: 2365, value: 500 },
    { time: '2025-10-01', open: 2365, high: 2400, low: 2350, close: 2385, value: 500 },
    { time: '2025-10-02', open: 2385, high: 2420, low: 2370, close: 2405, value: 500 }
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
              6,600원 <span className="text-[15px] text-red-500">+1.9% (123원)</span>
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
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
