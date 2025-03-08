'use client';
import { useState, useCallback } from 'react';
import { FaSort } from 'react-icons/fa';

const tableHeaderStyle = "px-3 py-2 text-sm font-medium text-gray-500";
const tableCellStyle = "px-3 py-2 text-sm text-gray-900";
const SORT_ORDER_ASC = 'asc';
const SORT_ORDER_DESC = 'desc';
const SORT_FIELDS = {
  SUBSCRIBERS: 'subscribers',
  VOLUME: 'volume',
} as const;

type SortField = typeof SORT_FIELDS[keyof typeof SORT_FIELDS];
type SortOrder = 'asc' | 'desc';

interface Subscriber {
  name: string;
  count: number;
  category: string;
  volume: string;
  rate: string;
}

interface TableRowProps {
  subscriber: Subscriber;
  index: number;
}

const TableRow = ({ subscriber, index }: TableRowProps) => (
  <tr className="hover:bg-gray-50" key={index}>
    <td className={`${tableCellStyle}`}>
      <div className="flex items-center">
        <span className="inline-block w-5 text-center mr-4 text-blue-500 text-sm">{index + 1}</span>
        <img src="/image.jpg" alt="US" className="w-8 h-8 mr-2 rounded-full" />
        <span className="text-sm">{subscriber.name}</span>
      </div>
    </td>
    <td className={`${tableCellStyle} text-right`}>{subscriber.count}만명</td>
    <td className="px-3 py-2 text-sm text-right">
      <div className={subscriber.rate.includes('-') ? "text-red-500" : "text-blue-500"}>
        {subscriber.rate}
      </div>
    </td>
    <td className={`${tableCellStyle} text-right`}>{subscriber.category}</td>
    <td className={`${tableCellStyle} text-right`}>{subscriber.volume}</td>
    <td className="px-3 py-2 text-sm text-right">
      <span className="text-blue-500">0.5%</span>
    </td>
  </tr>
);

export default function Stock() {
  const [sortField, setSortField] = useState<SortField>(SORT_FIELDS.SUBSCRIBERS);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    { name: '더블비', count: 180, category: '개그', volume: '2,500,000주', rate: '+8.0%' },
    { name: '뿌꾸', count: 160, category: '게임', volume: '1,000,000주', rate: '-1.5%' },
    { name: '미미미누', count: 100, category: '학습/공부', volume: '500,000주', rate: '+0.5%' },
  ]);
  const [sortOrderSubscribers, setSortOrderSubscribers] = useState<SortOrder>(SORT_ORDER_ASC);
  const [sortOrderVolume, setSortOrderVolume] = useState<SortOrder>(SORT_ORDER_ASC);

  const toggleSortOrder = (currentOrder: SortOrder): SortOrder =>
    currentOrder === SORT_ORDER_ASC ? SORT_ORDER_DESC : SORT_ORDER_ASC;

  const parseVolumeToNumber = useCallback((volume: string): number =>
    parseInt(volume.replace(/,/g, '').replace('주', '')),
  []);

  const sortSubscribers = useCallback(
    (field: SortField, order: SortOrder) => {
      const sortedSubscribers = [...subscribers].sort((a, b) => {
        if (field === SORT_FIELDS.SUBSCRIBERS) {
          return order === SORT_ORDER_ASC ? a.count - b.count : b.count - a.count;
        }
        if (field === SORT_FIELDS.VOLUME) {
          const aVolume = parseVolumeToNumber(a.volume);
          const bVolume = parseVolumeToNumber(b.volume);
          return order === SORT_ORDER_ASC ? aVolume - bVolume : bVolume - aVolume;
        }
        return 0;
      });
      setSubscribers(sortedSubscribers);
    },
    [subscribers, parseVolumeToNumber]
  );

  const handleSortSubscribers = useCallback(() => {
    const newOrder = toggleSortOrder(sortOrderSubscribers);
    setSortField(SORT_FIELDS.SUBSCRIBERS);
    sortSubscribers(SORT_FIELDS.SUBSCRIBERS, newOrder);
    setSortOrderSubscribers(newOrder);
    setSortOrderVolume(SORT_ORDER_ASC);
  }, [sortOrderSubscribers, sortSubscribers]);

  const handleSortVolume = useCallback(() => {
    const newOrder = toggleSortOrder(sortOrderVolume);
    setSortField(SORT_FIELDS.VOLUME);
    sortSubscribers(SORT_FIELDS.VOLUME, newOrder);
    setSortOrderVolume(newOrder);
    setSortOrderSubscribers(SORT_ORDER_ASC);
  }, [sortOrderVolume, sortSubscribers]);

  const renderSortIcon = (field: SortField, order: SortOrder) => (
    <button className="ml-2">
      {sortField !== field ? (
        <FaSort />
      ) : order === SORT_ORDER_ASC ? (
        '▲'
      ) : (
        '▼'
      )}
    </button>
  );

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr className="border-b">
            <th className={`${tableHeaderStyle} text-left w-1/6`}>유튜버</th>
            <th
              className={`${tableHeaderStyle} text-right w-1/8`}
              onClick={handleSortSubscribers}
            >
              구독자 수
              {renderSortIcon(SORT_FIELDS.SUBSCRIBERS, sortOrderSubscribers)}
            </th>
            <th className={`${tableHeaderStyle} text-right w-1/6`}>등락률</th>
            <th className={`${tableHeaderStyle} text-right w-1/6`}>카테고리</th>
            <th
              className={`${tableHeaderStyle} text-right w-1/6`}
              onClick={handleSortVolume}
            >
              거래량
              {renderSortIcon(SORT_FIELDS.VOLUME, sortOrderVolume)}
            </th>
            <th className={`${tableHeaderStyle} text-right w-1/6`}>안전율</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber, index) => (
            <TableRow key={index} subscriber={subscriber} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}