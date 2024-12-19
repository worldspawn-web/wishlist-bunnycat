import { useState, useEffect } from 'react';
import { Wish, Stats } from '@/types';

export function useWishlist(initialWishes: Wish[] = []) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [stats, setStats] = useState<Stats>({
    cat: { completedWishes: 0, completedLastMonth: 0 },
    bunny: { completedWishes: 0, completedLastMonth: 0 },
  });

  useEffect(() => {
    if (initialWishes.length === 0) {
      fetchWishes();
    }
  }, [initialWishes]);

  useEffect(() => {
    updateStats();
  }, [wishes]);

  const fetchWishes = async () => {
    try {
      const response = await fetch('/api/wishes');
      if (!response.ok) {
        throw new Error('Failed to fetch wishes');
      }
      const fetchedWishes = await response.json();
      setWishes(fetchedWishes);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    }
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
    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWish),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add wish');
      }
      const createdWish = await response.json();
      setWishes([...wishes, createdWish]);
    } catch (error) {
      console.error('Error adding wish:', error);
      throw error; // Перебрасываем ошибку, чтобы ее можно было обработать в компоненте
    }
  };

  const completeWish = async (id: string, completedBy: 'cat' | 'bunny') => {
    try {
      const response = await fetch(`/api/wishes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true, completedBy }),
      });
      if (!response.ok) {
        throw new Error('Failed to complete wish');
      }
      await fetchWishes();
    } catch (error) {
      console.error('Error completing wish:', error);
    }
  };

  const uncompleteWish = async (id: string) => {
    try {
      const response = await fetch(`/api/wishes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: false, completedBy: null }),
      });
      if (!response.ok) {
        throw new Error('Failed to uncomplete wish');
      }
      await fetchWishes();
    } catch (error) {
      console.error('Error uncompleting wish:', error);
    }
  };

  return { wishes, stats, addWish, completeWish, uncompleteWish };
}
