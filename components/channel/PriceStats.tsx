interface StatItem {
  period: string;
  change: string;
  color: string;
}

interface PriceStatsProps {
  stats: StatItem[];
}

export default function PriceStats({ stats }: PriceStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-1 border rounded-lg overflow-hidden">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col items-center py-3 px-2 text-center">
          <span className="text-xs text-gray-500">{stat.period}</span>
          <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
        </div>
      ))}
    </div>
  );
}