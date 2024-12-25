import { StatsPanelProps } from '@/types/components';

export default function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-md p-4 mt-4 border border-gray-200 dark:border-gray-800 backdrop-blur-sm dark:backdrop-blur-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Статистика</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-800 dark:text-gray-200">Кот</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {stats.cat.completedWishes}
            {stats.cat.completedLastMonth > 0 && (
              <span className="text-sm text-green-600 dark:text-green-400 dark:bg-green-900 bg-green-100 rounded-full px-2 py-1 ml-2">
                +{stats.cat.completedLastMonth}
              </span>
            )}
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-800 dark:text-gray-200">Зайка</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {stats.bunny.completedWishes}
            {stats.bunny.completedLastMonth > 0 && (
              <span className="text-sm text-green-600 dark:text-green-400 dark:bg-green-900 bg-green-100 rounded-full px-2 py-1 ml-2">
                +{stats.bunny.completedLastMonth}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
