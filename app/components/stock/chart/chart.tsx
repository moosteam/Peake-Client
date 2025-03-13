'use client'

import React, { useEffect, useRef } from 'react';
import {
  createChart,
  AreaSeries,
  BarSeries,
  BaselineSeries,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
  ColorType,
  IChartApi,
  SeriesOptionsMap,
} from 'lightweight-charts';

interface ChartColors {
  backgroundColor?: string;
  lineColor?: string;
  textColor?: string;
  areaTopColor?: string;
  areaBottomColor?: string;
}

export type SeriesType = 'area' | 'bar' | 'baseline' | 'candlestick' | 'histogram' | 'line';

interface ChartComponentProps {
  seriesType?: SeriesType;
  data?: any[];
  seriesOptions?: Record<string, any>;
  chartOptions?: Record<string, any>;
  colors?: ChartColors;
  onSeriesTypeChange?: (type: SeriesType) => void;
  onTimeRangeChange?: (range: string) => void;
}

const timeRangeOptions = ['1시간', '6시간', '1일', '1주일', '1개월'];

export const ChartComponent: React.FC<ChartComponentProps> = (props) => {
  const {
    seriesType = 'area',
    data = [],
    seriesOptions = {},
    chartOptions = {},
    colors = {},
    onSeriesTypeChange,
    onTimeRangeChange,
  } = props;

  const [selectedTimeRange, setSelectedTimeRange] = React.useState('1일');

  const {
    backgroundColor = 'white',
    lineColor = 'black',
    textColor = 'black',
    areaTopColor = '#2962FF',
    areaBottomColor = 'rgba(41, 98, 255, 0.28)',
  } = colors;

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSeriesTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as SeriesType;
    if (onSeriesTypeChange) {
      onSeriesTypeChange(newType);
    }
  };

  const handleTimeRangeChange = (range: string) => {
    setSelectedTimeRange(range);
    if (onTimeRangeChange) {
      onTimeRangeChange(range);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const defaultChartOptions = {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        width: containerRef.current.clientWidth,
        height: 400,
        grid: {
          vertLines: { color: 'rgba(197, 203, 206, 0.5)' },
          horzLines: { color: 'rgba(197, 203, 206, 0.5)' },
        },
        timeScale: {
          // 기존 backgroundColor 대신 lineColor로 변경
          borderColor: lineColor,
          timeVisible: true,
          secondsVisible: false,
        },
        // 오른쪽 가격축 테두리도 lineColor로 변경
        rightPriceScale: {
          borderVisible: true,
          borderColor: lineColor,
        },
        ...chartOptions,
      };

      const chart: IChartApi = createChart(containerRef.current, defaultChartOptions);

      const commonSeriesOptions = {
        priceLineVisible: false,
        lastValueVisible: true,
      };

      let series;
      switch (seriesType) {
        case 'area':
          series = chart.addSeries(AreaSeries, {
            ...commonSeriesOptions,
            lineColor,
            topColor: areaTopColor,
            bottomColor: areaBottomColor,
            lineWidth: 2,
            ...seriesOptions,
          } as SeriesOptionsMap['Area']);
          break;
        case 'bar':
          series = chart.addSeries(BarSeries, {
            ...commonSeriesOptions,
            upColor: '#E23C3C',
            downColor: '#3C82E2',
            ...seriesOptions,
          } as SeriesOptionsMap['Bar']);
          break;
        case 'baseline':
          series = chart.addSeries(BaselineSeries, {
            ...commonSeriesOptions,
            baseValue: { type: 'price', price: 0 },
            topLineColor: '#E23C3C',
            topFillColor1: '#E23C3C',
            topFillColor2: '#3C82E2',
            bottomLineColor: '#3C82E2',
            bottomFillColor1: '#3C82E2',
            bottomFillColor2: '#E23C3C',
            lineWidth: 2,
            ...seriesOptions,
          } as SeriesOptionsMap['Baseline']);
          break;
        case 'candlestick':
          series = chart.addSeries(CandlestickSeries, {
            ...commonSeriesOptions,
            upColor: '#E23C3C',
            downColor: '#3C82E2',
            borderVisible: true,
            wickUpColor: '#E23C3C',
            wickDownColor: '#3C82E2',
            borderUpColor: '#E23C3C',   // 상승 캔들의 테두리 색상 추가
            borderDownColor: '#3C82E2', // 하락 캔들의 테두리 색상 추가
            ...seriesOptions,
          } as SeriesOptionsMap['Candlestick']);
          break;
        case 'histogram':
          series = chart.addSeries(HistogramSeries, {
            ...commonSeriesOptions,
            color: '#E23C3C',
            priceFormat: { type: 'volume' },
            ...seriesOptions,
          } as SeriesOptionsMap['Histogram']);
          break;
        case 'line':
          series = chart.addSeries(LineSeries, {
            ...commonSeriesOptions,
            color: lineColor,
            lineWidth: 2,
            crosshairMarkerVisible: true,
            ...seriesOptions,
          } as SeriesOptionsMap['Line']);
          break;
        default:
          console.error('알 수 없는 시리즈 타입입니다:', seriesType);
      }

      if (series && data.length > 0) {
        series.setData(data);
      }

      chart.timeScale().fitContent();

      const handleResize = () => {
        if (containerRef.current) {
          chart.applyOptions({ width: containerRef.current.clientWidth });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
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
  ]);

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
                      ? 'bg-blue-600 text-white border-blue-600 z-10'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  } ${
                    range === timeRangeOptions[0] ? 'rounded-l-md' : ''
                  } ${
                    range === timeRangeOptions[timeRangeOptions.length - 1] ? 'rounded-r-md' : ''
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
              <option value="baseline">Baseline</option>
              <option value="candlestick">캔들스틱</option>
              <option value="histogram">히스토그램</option>
              <option value="line">라인</option>
            </select>
          </div>
        </div>
      </div>
      <div ref={containerRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default ChartComponent;