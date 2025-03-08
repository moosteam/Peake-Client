'use client'
import { useState } from 'react';
import Sidebar from './sidebar/sidebar';
import SearchBar from './searchbar/searchbar';

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
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 w-1/7">
                    유튜버
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-500 w-1/7">
                    구독자 수
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-500 w-1/7">
                    등략율
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-500 w-1/7">
                    카테고리
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-500 w-1/7">
                    거래량
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-500 w-1/7">
                    안전율
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-500 w-1/7">
                    생성일
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-500">1</span>
                      <img src="/image.jpg" alt="US" className="w-8 h-8 mr-2 rounded-full" />
                      <span>사일렉스 홀딩스</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">500원</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <div className="text-red-500">
                      +8.0%
                      <div className="text-xs">+40원</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">바이오</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">2,500,000주</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className="text-red-500">매도</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-red-500 text-center">+45.0%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-500">2</span>
                      <img src="/image.jpg" alt="KR" className="w-8 h-8 mr-2 rounded-full" />
                      <span>삼성전자</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">70,000원</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <div className="text-green-500">
                      +1.5%
                      <div className="text-xs">+1,000원</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">반도체</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">1,000,000주</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className="text-green-500">매수</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-green-500 text-center">+1.5%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-500">3</span>
                      <img src="/image.jpg" alt="JP" className="w-8 h-8 mr-2 rounded-full" />
                      <span>소니</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">10,000엔</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <div className="text-red-500">
                      -0.5%
                      <div className="text-xs">-50엔</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">전자기기</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">500,000주</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className="text-red-500">관망</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-red-500 text-center">-0.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
