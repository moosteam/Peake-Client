// 필요한 라이브러리 및 컴포넌트 가져오기
import { AreaSeries, createChart, ColorType, IChartApi, SeriesOptionsMap } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

// 차트 색상 관련 인터페이스 정의
interface ChartColors {
  backgroundColor?: string;  // 배경색
  lineColor?: string;        // 선 색상
  textColor?: string;        // 텍스트 색상
  areaTopColor?: string;     // 영역 상단 색상
  areaBottomColor?: string;  // 영역 하단 색상
}

// 차트 컴포넌트 속성 인터페이스 정의
interface ChartComponentProps {
  data: { time: string; value: number }[];  // 차트 데이터 (시간과 값 쌍의 배열)
  colors?: ChartColors;                     // 차트 색상 설정 (선택적)
}

// 차트 컴포넌트 정의
export const ChartComponent: React.FC<ChartComponentProps> = (props) => {
  // props에서 데이터와 색상 설정 추출 (기본값 설정)
  const {
    data,
    colors: {
      backgroundColor = 'black',                        // 기본 배경색: 검정
      lineColor = '#2962FF',                           // 기본 선 색상: 파랑
      textColor = 'white',                             // 기본 텍스트 색상: 흰색
      areaTopColor = '#2962FF',                        // 기본 영역 상단 색상: 파랑
      areaBottomColor = 'rgba(41, 98, 255, 0.28)',     // 기본 영역 하단 색상: 투명한 파랑
    } = {},
  } = props;

  // 차트를 그릴 DOM 요소에 대한 참조 생성
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // 컴포넌트 마운트 및 업데이트 시 차트 생성 및 관리
  useEffect(
    () => {
      if (chartContainerRef.current) {
        // 창 크기 변경 시 차트 크기 조정 함수
        const handleResize = () => {
          if (chartContainerRef.current) {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
          }
        };

        // 차트 생성
        const chart: IChartApi = createChart(chartContainerRef.current, {
          layout: {
            background: { type: ColorType.Solid, color: backgroundColor },  // 배경 설정
            textColor,                                                     // 텍스트 색상 설정
          },
          width: chartContainerRef.current.clientWidth,  // 컨테이너 너비에 맞춤
          height: 300,                                  // 고정 높이 300px
        });
        chart.timeScale().fitContent();  // 시간 축 자동 조정

        // 영역 시리즈 추가 및 스타일 설정
        const newSeries = chart.addSeries(AreaSeries, { 
          lineColor,           // 선 색상
          topColor: areaTopColor,     // 영역 상단 색상
          bottomColor: areaBottomColor  // 영역 하단 색상
        } as SeriesOptionsMap['Area']);
        newSeries.setData(data);  // 데이터 설정

        // 창 크기 변경 이벤트 리스너 등록
        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 정리 작업
        return () => {
          window.removeEventListener('resize', handleResize);  // 이벤트 리스너 제거
          chart.remove();  // 차트 제거
        };
      }
    },
    // 의존성 배열: 이 값들이 변경되면 useEffect가 다시 실행됨
    [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
  );

  // 차트를 그릴 컨테이너 렌더링
  return (
    <div
      ref={chartContainerRef}
    />
  );
};