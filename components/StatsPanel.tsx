import { Stats } from '@/types/wish';

interface StatsPanelProps {
  stats: Stats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <h2 className="text-xl font-semibold mb-4">Статистика</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Кот</h3>
          <p className="text-lg">
            {stats.cat.completedWishes}
            {stats.cat.completedLastMonth > 0 && (
              <span className="text-sm text-green-600 bg-green-100 rounded-full px-2 py-1 ml-2">
                +{stats.cat.completedLastMonth}
              </span>
            )}
          </p>
        </div>
        <div>
          <h3 className="font-medium">Зайка</h3>
          <p className="text-lg">
            {stats.bunny.completedWishes}
            {stats.bunny.completedLastMonth > 0 && (
              <span className="text-sm text-green-600 bg-green-100 rounded-full px-2 py-1 ml-2">
                +{stats.bunny.completedLastMonth}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
