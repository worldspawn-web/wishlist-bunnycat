import { useState, useEffect } from 'react';
import { Wish, Stats } from '@/types/wish';

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

const initialStats: Stats = {
  cat: { completedWishes: 0, completedLastMonth: 0 },
  bunny: { completedWishes: 0, completedLastMonth: 0 },
};

export function useWishlist() {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [stats, setStats] = useState<Stats>(initialStats);

  useEffect(() => {
    updateStats();
    // TODO: think about another way
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const addWish = (newWish: Wish) => {
    setWishes([...wishes, { ...newWish, createdAt: new Date() }]);
  };

  const completeWish = (id: string, completedBy: 'cat' | 'bunny') => {
    setWishes(wishes.map((wish) => (wish.id === id ? { ...wish, completed: true, completedBy } : wish)));
  };

  const uncompleteWish = (id: string) => {
    setWishes(wishes.map((wish) => (wish.id === id ? { ...wish, completed: false, completedBy: undefined } : wish)));
  };

  return { wishes, stats, addWish, completeWish, uncompleteWish };
}
