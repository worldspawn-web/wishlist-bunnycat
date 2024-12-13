export type WishCategory = 'Вкусняшка' | 'Путешествие' | 'Вещь' | 'Фильм/Сериал' | 'Игра' | 'Другое' | 'Активность';

export interface Wish {
  id: string;
  title: string;
  image: string;
  price?: number;
  priority: 'low' | 'medium' | 'high';
  platform?: 'wildberries' | 'ozon' | 'market' | 'other';
  comment?: string;
  author: 'cat' | 'bunny';
  link: string;
  completed: boolean;
  category: WishCategory;
  createdAt: Date;
  completedBy?: 'cat' | 'bunny';
}

export interface UserStats {
  completedWishes: number;
  completedLastMonth: number;
}

export interface Stats {
  cat: UserStats;
  bunny: UserStats;
}
