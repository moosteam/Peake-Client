'use client'
import { useState } from 'react';
import Sidebar from './sidebar/sidebar';
import SearchBar from './searchbar/searchbar';

const tableHeaderStyle = "px-3 py-2 text-sm font-medium text-gray-500";
const tableCellStyle = "px-3 py-2 text-sm text-gray-900";

export default function Home() {
  const [searchTime, setSearchTime] = useState('');

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      <Sidebar />

      <div className="flex-1 pl-[250px] pt-8">
        <div className="bg-white rounded-lg w-[95%] max-w-[1200px] 2xl:max-w-[1600px] min-h-[94vh] mx-auto p-6 mt-2">
          <SearchBar searchTime={searchTime} setSearchTime={setSearchTime} />

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr className="border-b">
                  <th className={`${tableHeaderStyle} text-left w-1/7`}>
                    유튜버
                  </th>
                  <th className={`${tableHeaderStyle} text-right w-1/7`}>
                    구독자 수
                  </th>
                  <th className={`${tableHeaderStyle} text-right w-1/7`}>
                    등략율
                  </th>
                  <th className={`${tableHeaderStyle} text-right w-1/7`}>
                    카테고리
                  </th>
                  <th className={`${tableHeaderStyle} text-right w-1/7`}>
                    거래량
                  </th>
                  <th className={`${tableHeaderStyle} text-right w-1/7`}>
                    안전율
                  </th>
                  <th className={`${tableHeaderStyle} text-right w-1/7`}>
                    생성일
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className={`${tableCellStyle}`}>
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-500 text-sm">1</span>
                      <img src="/image.jpg" alt="US" className="w-8 h-8 mr-2 rounded-full" />
                      <span className="text-sm">사일렉스 홀딩스</span>
                    </div>
                  </td>
                  <td className={`${tableCellStyle} text-right`}>500명</td>
                  <td className="px-3 py-2 text-sm text-right">
                    <div className="text-red-500">
                      +8.0%
                      <div className="text-xs">+40원</div>
                    </div>
                  </td>
                  <td className={`${tableCellStyle} text-right`}>바이오</td>
                  <td className={`${tableCellStyle} text-right`}>2,500,000주</td>
                  <td className="px-3 py-2 text-sm text-right">
                    <span className="text-red-500">0.5%</span>
                  </td>
                  <td className="px-3 py-2 text-sm text-red-500 text-right">23-10-15</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className={`${tableCellStyle}`}>
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-500 text-sm">2</span>
                      <img src="/image.jpg" alt="KR" className="w-8 h-8 mr-2 rounded-full" />
                      <span className="text-sm">삼성전자</span>
                    </div>
                  </td>
                  <td className={`${tableCellStyle} text-right`}>70,000명</td>
                  <td className="px-3 py-2 text-sm text-right">
                    <div className="text-green-500">
                      +1.5%
                      <div className="text-xs">+1,000원</div>
                    </div>
                  </td>
                  <td className={`${tableCellStyle} text-right`}>반도체</td>
                  <td className={`${tableCellStyle} text-right`}>1,000,000주</td>
                  <td className="px-3 py-2 text-sm text-right">
                    <span className="text-green-500">0.5%</span>
                  </td>
                  <td className="px-3 py-2 text-sm text-green-500 text-right">24-05-22</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className={`${tableCellStyle}`}>
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-500 text-sm">3</span>
                      <img src="/image.jpg" alt="JP" className="w-8 h-8 mr-2 rounded-full" />
                      <span className="text-sm">소니</span>
                    </div>
                  </td>
                  <td className={`${tableCellStyle} text-right`}>10,000명</td>
                  <td className="px-3 py-2 text-sm text-right">
                    <div className="text-red-500">
                      -0.5%
                      <div className="text-xs">-50엔</div>
                    </div>
                  </td>
                  <td className={`${tableCellStyle} text-right`}>전자기기</td>
                  <td className={`${tableCellStyle} text-right`}>500,000주</td>
                  <td className="px-3 py-2 text-sm text-right">
                    <span className="text-red-500">0.5%</span>
                  </td>
                  <td className="px-3 py-2 text-sm text-red-500 text-right">25-10-20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
