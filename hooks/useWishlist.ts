import { useState, useEffect } from 'react';
import { Wish, Stats } from '@/types';
import prisma from '@/lib/prisma';

export function useWishlist() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [stats, setStats] = useState<Stats>({
    cat: { completedWishes: 0, completedLastMonth: 0 },
    bunny: { completedWishes: 0, completedLastMonth: 0 },
  });

  useEffect(() => {
    fetchWishes();
  }, []);

  useEffect(() => {
    updateStats();
  }, [wishes]);

  const fetchWishes = async () => {
    const fetchedWishes = await prisma.wish.findMany();
    setWishes(fetchedWishes);
  };

  const updateStats = () => {
    // debug
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

  const addWish = async (newWish: Omit<Wish, 'id' | 'createdAt'>) => {
    const createdWish = await prisma.wish.create({
      data: newWish,
    });
    setWishes([...wishes, createdWish]);
  };

  const completeWish = async (id: string, completedBy: 'cat' | 'bunny') => {
    await prisma.wish.update({
      where: { id },
      data: { completed: true, completedBy },
    });
    await fetchWishes();
  };

  const uncompleteWish = async (id: string) => {
    await prisma.wish.update({
      where: { id },
      data: { completed: false, completedBy: null },
    });
    await fetchWishes();
  };

  return { wishes, stats, addWish, completeWish, uncompleteWish };
}
