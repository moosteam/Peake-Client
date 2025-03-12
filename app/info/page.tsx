'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CandlestickData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export default function Home() {
  const [candlestickSeries, setCandlestickSeries] = useState<any[]>([]);
  const [candlestickOptions, setCandlestickOptions] = useState<any>({});
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data: CandlestickData[] = [];
    let basePrice = 6600;
    const totalPoints = 4 * 60; // 4시간 = 240분, 1분 단위로 240개 데이터

    for (let i = 0; i < totalPoints; i++) {
      const now = new Date();
      now.setMinutes(now.getMinutes() - (totalPoints - i) * 1); // 1분 간격
      const date = now.toISOString();

      const volatility = Math.random() * 0.02; // 변동성 유지
      const changePercent = (Math.random() - 0.5) * volatility;

      const open = Math.round(basePrice);
      const close = Math.round(open * (1 + changePercent));

      // 윅 길이 줄이기
      const highLowRange = open * 0.002; // 기존 0.005에서 0.002로 줄여 윅 짧게 설정
      const high = Math.max(open, close) + Math.round(Math.random() * highLowRange);
      const low = Math.min(open, close) - Math.round(Math.random() * highLowRange);

      data.push({ date, open, high, low, close });
      basePrice = close;
    }

    const candlestickData = data.map(item => ({
      x: new Date(item.date).getTime(), // 'New Date' -> 'new Date'로 수정
      y: [item.open, item.high, item.low, item.close],
    }));

    setCandlestickSeries([
      {
        name: '가격',
        data: candlestickData,
      },
    ]);

    const totalLen = candlestickData.length;
    const lastIndex = totalLen - 1;
    const showNum = 30; // 초기 화면에 30분(30개 데이터) 표시 (확대 1번 효과)
    const minIndex = lastIndex - showNum < 0 ? 0 : lastIndex - showNum;

    // y축 범위 계산
    const prices = candlestickData.flatMap(item => item.y);
    const minPrice = Math.min(...prices) * 0.98;
    const maxPrice = Math.max(...prices) * 1.02;

    setCandlestickOptions({
      chart: {
        type: 'candlestick',
        height: 620,
        background: 'transparent',
        animations: { enabled: false },
        zoom: { enabled: true, type: 'x', autoScaleYaxis: true },
        pan: { enabled: true, mode: 'x', speed: 10 },
        toolbar: {
          show: true,
          tools: {
            download: '다운로드',
            selection: '선택',
            zoom: '줌',
            zoomin: '확대',
            zoomout: '축소',
            pan: '이동',
            reset: '초기화',
          },
          autoSelected: 'pan',
        },
        selection: {
          enabled: true,
          type: 'x',
          xaxis: {
            min: candlestickData[minIndex].x,
            max: candlestickData[lastIndex].x,
          },
        },
        locales: [
          {
            name: 'ko',
            options: {
              months: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
              shortMonths: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
              days: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
              shortDays: ['일','월','화','수','목','금','토'],
              toolbar: {
                download: '다운로드',
                selection: '선택',
                zoom: '줌',
                zoomin: '확대',
                zoomout: '축소',
                pan: '이동',
                reset: '초기화',
              },
            },
          },
        ],
        defaultLocale: 'ko',
      },
      plotOptions: {
        candlestick: {
          colors: { upward: '#ff0000', downward: '#0000ff' },
          wick: { useFillColor: true },
          barWidth: '8%', // 1분 단위로 데이터가 많아지므로 더 작게 조정
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false,
          format: 'HH:mm',
          style: { fontSize: '14px', fontWeight: 'bold', colors: '#9CA3AF' },
          rotate: 0,
          showDuplicates: false,
        },
        tickAmount: 10, // 1분 단위에 맞게 더 많은 시간 표시
        axisBorder: { show: true, color: '#78909C' },
        axisTicks: { show: true, color: '#78909C' },
        tickPlacement: 'on',
        crosshairs: {
          show: true,
          width: 1,
          position: 'back',
          opacity: 0.9,
          stroke: { color: '#b6b6b6', width: 1, dashArray: 0 },
        },
        tooltip: { enabled: false },
      },
      yaxis: {
        opposite: true,
        min: minPrice,
        max: maxPrice,
        labels: {
          formatter: (value: number) => value.toFixed(0) + '원',
          style: { fontSize: '12px', fontWeight: 'bold' },
        },
        tooltip: { enabled: true },
        tickAmount: 8,
        crosshairs: {
          show: true,
          position: 'back',
          stroke: { color: '#b6b6b6', width: 1, dashArray: 0 },
        },
      },
      tooltip: {
        enabled: true,
        custom: function ({ dataPointIndex, w }: any) {
          const dataPoint = w.globals.initialSeries[0].data[dataPointIndex];
          const [o, h, l, c] = dataPoint.y;
          const date = new Date(dataPoint.x);
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const formattedTime = `${hours}:${minutes}`;
          const change = c - o;
          const changePercent = ((change / o) * 100).toFixed(2);
          const color = change >= 0 ? 'red' : 'blue';

          return `<div style="padding:6px; font-family:'Malgun Gothic',sans-serif; font-size:11px; border:1px solid #e0e0e0; box-shadow:0 2px 8px rgba(0,0,0,0.1); border-radius:4px; background-color:white;">
                    <strong>${formattedTime}</strong><br/>
                    시가: ${o.toLocaleString()}원<br/>
                    고가: ${h.toLocaleString()}원<br/>
                    저가: ${l.toLocaleString()}원<br/>
                    종가: ${c.toLocaleString()}원<br/>
                    변동: <span style="color:${color}; font-weight:bold;">${change >= 0 ? '+' : ''}${change.toLocaleString()}원 (${changePercent}%)</span>
                  </div>`;
        },
      },
      grid: {
        show: true,
        borderColor: '#f0f0f0',
        strokeDashArray: 0,
        position: 'back',
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
        row: { colors: undefined, opacity: 0.5 },
        column: { colors: undefined, opacity: 0.5 },
        padding: { top: 0, right: 10, bottom: 0, left: 10 },
      },
      title: {
        text: '분봉 차트',
        align: 'left',
        style: { fontSize: '14px', fontFamily: 'Malgun Gothic, sans-serif', fontWeight: 'bold' },
      },
      stroke: { width: 1, curve: 'straight' },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      responsive: [{ breakpoint: 1000, options: { chart: { width: '100%' } } }],
      states: { hover: { filter: { type: 'none' } }, active: { filter: { type: 'none' } } },
      theme: { mode: 'light' },
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 pl-[150px] pt-8">
        <div className="flex items-start mt-2">
          <div className="mr-3 ml-[-100]">
            <Image
              src="/logo2.svg"
              alt="로고"
              width={64}
              height={40}
              className="rounded-[8px]"
            />
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
        <div className="flex gap-4 mt-4 ml-[-100]">
          <div
            ref={chartContainerRef}
            className="relative w-[73%] h-[620px] border border-gray-200 p-4 bg-transparent"
            style={{ touchAction: 'none' }}
          >
            {candlestickSeries.length > 0 && (
              <Chart
                options={candlestickOptions}
                series={candlestickSeries}
                type="candlestick"
                height={620}
                width="100%"
              />
            )}
          </div>
          <div className="bg-transparent rounded-[13px] w-[23%] h-[620px] border border-gray-200" />
        </div>
      </div>

      <style jsx global>{`
        .apexcharts-canvas {
          cursor: grab !important;
        }
        .apexcharts-canvas:active {
          cursor: grabbing !important;
        }
        
        .apexcharts-candlestick {
          stroke-width: 1px !important;
        }
        
        .apexcharts-candlestick-area path {
          stroke-linecap: butt !important;
          stroke-width: 2px !important;
        }
        
        .apexcharts-candlestick-area rect {
          stroke-width: 0.5px !important;
        }
        
        .apexcharts-grid-row, .apexcharts-grid-column {
          stroke-width: 0.5px !important;
          stroke: #e0e0e0 !important;
        }
        
        .apexcharts-xaxis-texts-g text {
          font-weight: bold !important;
        }
        
        .apexcharts-candlestick[fill='#ff0000'] {
          fill: #ff0000 !important;
        }
        
        .apexcharts-candlestick[fill='#0000ff'] {
          fill: #0000ff !important;
        }
      `}</style>
    </div>
  );
}