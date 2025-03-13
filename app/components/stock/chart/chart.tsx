// 필요한 라이브러리 및 컴포넌트 가져오기
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
  SeriesOptionsMap
} from 'lightweight-charts';

// 차트 색상 관련 인터페이스 정의
interface ChartColors {
  backgroundColor?: string;  // 배경색
  lineColor?: string;        // 선 색상
  textColor?: string;        // 텍스트 색상
  areaTopColor?: string;     // 영역 상단 색상
  areaBottomColor?: string;  // 영역 하단 색상
}

// 시리즈 타입 정의
export type SeriesType = 'area' | 'bar' | 'baseline' | 'candlestick' | 'histogram' | 'line';

// 차트 컴포넌트 속성 인터페이스 정의
interface ChartComponentProps {
  seriesType?: SeriesType;                  // 시리즈 타입
  data?: any[];                             // 차트 데이터 (시리즈 타입에 맞는 형식)
  seriesOptions?: Record<string, any>;     // 시리즈별 옵션
  chartOptions?: Record<string, any>;      // 차트 전체 옵션
  colors?: ChartColors;                    // 차트 색상 설정 (선택적)
  onSeriesTypeChange?: (type: SeriesType) => void; // 시리즈 타입 변경 핸들러
  onTimeRangeChange?: (range: string) => void; // 시간 범위 변경 핸들러
}

// 시간 범위 옵션
const timeRangeOptions = ['1시간', '6시간', '1일', '1주일', '1개월'];

// 차트 컴포넌트 정의
export const ChartComponent: React.FC<ChartComponentProps> = (props) => {
  // props에서 데이터와 설정 추출
  const {
    seriesType = 'area',
    data = [],
    seriesOptions = {},
    chartOptions = {},
    colors = {},
    onSeriesTypeChange,
    onTimeRangeChange,
  } = props;

  // 선택된 시간 범위 상태
  const [selectedTimeRange, setSelectedTimeRange] = React.useState('1일');

  const {
    backgroundColor = 'white',                        // 기본 배경색: 흰색
    lineColor = '#2962FF',                           // 기본 선 색상: 파랑
    textColor = 'black',                             // 기본 텍스트 색상: 검정
    areaTopColor = '#2962FF',                        // 기본 영역 상단 색상: 파랑
    areaBottomColor = 'rgba(41, 98, 255, 0.28)',     // 기본 영역 하단 색상: 투명한 파랑
  } = colors;

  // 차트를 그릴 DOM 요소에 대한 참조 생성
  const containerRef = useRef<HTMLDivElement>(null);

  // 시리즈 타입 변경 핸들러
  const handleSeriesTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as SeriesType;
    if (onSeriesTypeChange) {
      onSeriesTypeChange(newType);
    }
  };

  // 시간 범위 변경 핸들러
  const handleTimeRangeChange = (range: string) => {
    setSelectedTimeRange(range);
    if (onTimeRangeChange) {
      onTimeRangeChange(range);
    }
  };

  // 컴포넌트 마운트 및 업데이트 시 차트 생성 및 관리
  useEffect(() => {
    if (containerRef.current) {
      // 기본 차트 옵션 설정
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
          borderColor: 'rgba(197, 203, 206, 0.8)',
          timeVisible: true,
          secondsVisible: false,
        },
        crosshair: {
          mode: 1,
          vertLine: {
            width: 1,
            color: 'rgba(32, 38, 46, 0.1)',
            style: 0,
          },
          horzLine: {
            width: 1,
            color: 'rgba(32, 38, 46, 0.1)',
            style: 0,
          },
        },
        ...chartOptions
      };

      // 차트 생성
      const chart: IChartApi = createChart(containerRef.current, {
        ...defaultChartOptions,
        crosshair: {
          mode: 1,
          vertLine: {
            color: 'rgba(32, 38, 46, 0.1)',
            style: 0,
          },
          horzLine: {
            color: 'rgba(32, 38, 46, 0.1)',
            style: 0,
          },
        },
      });
      let series;

      // 시리즈 타입에 따라 분기 처리
      switch (seriesType) {
        case 'area':
          series = chart.addSeries(AreaSeries, {
            lineColor,
            topColor: areaTopColor,
            bottomColor: areaBottomColor,
            lineWidth: 2,
            priceLineVisible: false,
            lastValueVisible: true,
            ...seriesOptions
          } as SeriesOptionsMap['Area']);
          break;
        case 'bar':
          series = chart.addSeries(BarSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            priceLineVisible: false,
            lastValueVisible: true,
            ...seriesOptions
          } as SeriesOptionsMap['Bar']);
          break;
        case 'baseline':
          series = chart.addSeries(BaselineSeries, {
            baseValue: { type: 'price', price: 0 },
            topLineColor: 'rgba(38, 166, 154, 1)',
            topFillColor1: 'rgba(38, 166, 154, 0.28)',
            topFillColor2: 'rgba(38, 166, 154, 0.05)',
            bottomLineColor: 'rgba(239, 83, 80, 1)',
            bottomFillColor1: 'rgba(239, 83, 80, 0.28)',
            bottomFillColor2: 'rgba(239, 83, 80, 0.05)',
            lineWidth: 2,
            priceLineVisible: false,
            lastValueVisible: true,
            ...seriesOptions
          } as SeriesOptionsMap['Baseline']);
          break;
        case 'candlestick':
          series = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: true,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
            priceLineVisible: false,
            lastValueVisible: true,
            ...seriesOptions
          } as SeriesOptionsMap['Candlestick']);
          break;
        case 'histogram':
          series = chart.addSeries(HistogramSeries, {
            color: '#26a69a',
            priceFormat: {
              type: 'volume',
            },
            priceLineVisible: false,
            lastValueVisible: true,
            ...seriesOptions
          } as SeriesOptionsMap['Histogram']);
          break;
        case 'line':
          series = chart.addSeries(LineSeries, {
            color: lineColor,
            lineWidth: 2,
            crosshairMarkerVisible: true,
            priceLineVisible: false,
            lastValueVisible: true,
            ...seriesOptions
          } as SeriesOptionsMap['Line']);
          break;
        default:
          console.error('알 수 없는 시리즈 타입입니다:', seriesType);
      }

      // 데이터 설정
      if (series && data.length > 0) {
        series.setData(data);
      }

      // 차트에 맞게 타임스케일 조정
      chart.timeScale().fitContent();

      // 창 크기 변경 시 차트 크기 조정 함수
      const handleResize = () => {
        if (containerRef.current) {
          chart.applyOptions({ width: containerRef.current.clientWidth });
        }
      };

      // 창 크기 변경 이벤트 리스너 등록
      window.addEventListener('resize', handleResize);

      // 컴포넌트 언마운트 시 정리 작업
      return () => {
        window.removeEventListener('resize', handleResize);  // 이벤트 리스너 제거
        chart.remove();  // 차트 제거
      };
    }
  }, [seriesType, data, seriesOptions, chartOptions, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

  // 차트를 그릴 컨테이너 렌더링
  return (
    <div>
      <div className="mb-4 flex flex-col space-y-4">
        {/* 차트 컨트롤 영역 */}
        <div className="flex flex-wrap items-center justify-between">
          {/* 시간 범위 탭 */}
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

          {/* 차트 타입 선택기 */}
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