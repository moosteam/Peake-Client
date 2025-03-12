"use client";

import React from "react";
import Image from "next/image";
import {ChartComponent} from "../components/stock/chart/chart"
export default function Home() {
  const initialData = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
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
          <ChartComponent data={initialData}></ChartComponent>
        </div>
      </div>
    </div>
  );
}
