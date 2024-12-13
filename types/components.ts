import { Wish } from './wish';
import { Stats } from './stats';

export interface WishCardProps {
  wish: Wish;
  onComplete: (id: string, completedBy: 'cat' | 'bunny') => void;
  onUncomplete: (id: string) => void;
  currentUser: 'cat' | 'bunny';
}

export interface StatsPanelProps {
  stats: Stats;
}
