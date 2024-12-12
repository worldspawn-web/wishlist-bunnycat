'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import WishCard from '@/components/WishCard';
import AddWishModal from '@/components/AddWishModal';
import StatsPanel from '@/components/StatsPanel';
import { Wish, WishCategory, Stats } from '@/types/wish';

const initialWishes: Wish[] = [
  {
    id: '1',
    title: 'Завести кота (Тест)',
    image:
      'https://img05.rl0.ru/afisha/e1000x500i/daily.afisha.ru/uploads/images/4/ca/4ca125c0ba6fd4a29e6ea9732ffe68b0.jpg',
    priority: 'high',
    author: 'cat',
    link: '',
    completed: false,
    category: 'Другое',
    comment: 'Давно пора.',
    createdAt: new Date(),
  },
];

const categoryEmoji: Record<WishCategory, string> = {
  Вкусняшка: '🍕',
  Путешествие: '✈️',
  Вещь: '👕',
  'Фильм/Сериал': '🎬',
  Игра: '🎮',
  Другое: '🎁',
};

const initialStats: Stats = {
  cat: { completedWishes: 0, completedLastMonth: 0 },
  bunny: { completedWishes: 0, completedLastMonth: 0 },
};

export default function Wishlist() {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [authorFilter, setAuthorFilter] = useState<'all' | 'cat' | 'bunny' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<WishCategory | 'all'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [stats, setStats] = useState<Stats>(initialStats);
  const [currentUser, setCurrentUser] = useState<'cat' | 'bunny'>('cat');

  useEffect(() => {
    updateStats();
  }, [wishes]);

  const updateStats = () => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const newStats: Stats = {
      cat: { completedWishes: 0, completedLastMonth: 0 },
      bunny: { completedWishes: 0, completedLastMonth: 0 },
    };

    wishes.forEach((wish) => {
      if (wish.completed && wish.completedBy && wish.author !== wish.completedBy) {
        newStats[wish.completedBy].completedWishes++;
        if (new Date(wish.createdAt) >= lastMonth) {
          newStats[wish.completedBy].completedLastMonth++;
        }
      }
    });

    setStats(newStats);
  };

  const filteredWishes = wishes.filter((wish) => {
    if (authorFilter === 'completed') return wish.completed;
    if (authorFilter !== 'all' && wish.author !== authorFilter) return false;
    if (categoryFilter !== 'all' && wish.category !== categoryFilter) return false;
    return !wish.completed;
  });

  const addWish = (newWish: Wish) => {
    setWishes([...wishes, { ...newWish, createdAt: new Date() }]);
  };

  const completeWish = (id: string, completedBy: 'cat' | 'bunny') => {
    setWishes(wishes.map((wish) => (wish.id === id ? { ...wish, completed: true, completedBy } : wish)));
    updateStats();
  };

  const uncompleteWish = (id: string) => {
    setWishes(wishes.map((wish) => (wish.id === id ? { ...wish, completed: false, completedBy: undefined } : wish)));
    updateStats();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Список желаний 🐈‍⬛🐰</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>Добавить желание</Button>
        </div>
        <div className="flex mb-4">
          <div className="w-1/4 pr-4">
            <h2 className="text-xl font-semibold mb-2">Фильтры</h2>
            <div className="space-y-2">
              <Select value={categoryFilter} onValueChange={(value: WishCategory | 'all') => setCategoryFilter(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  {Object.entries(categoryEmoji).map(([category, emoji]) => (
                    <SelectItem key={category} value={category}>
                      {emoji} {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant={authorFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setAuthorFilter('all')}
                className="w-full"
              >
                Все
              </Button>
              <Button
                variant={authorFilter === 'cat' ? 'default' : 'outline'}
                onClick={() => setAuthorFilter('cat')}
                className="w-full"
              >
                Кот
              </Button>
              <Button
                variant={authorFilter === 'bunny' ? 'default' : 'outline'}
                onClick={() => setAuthorFilter('bunny')}
                className="w-full"
              >
                Зайка
              </Button>
              <Button
                variant={authorFilter === 'completed' ? 'default' : 'outline'}
                onClick={() => setAuthorFilter('completed')}
                className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900"
              >
                Выполнено
              </Button>
            </div>
            <StatsPanel stats={stats} />
          </div>
          <div className="w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWishes.map((wish) => (
                <WishCard
                  key={wish.id}
                  wish={wish}
                  onComplete={completeWish}
                  onUncomplete={uncompleteWish}
                  currentUser={currentUser}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddWishModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={addWish} />
    </div>
  );
}
