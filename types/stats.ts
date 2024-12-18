export interface UserStats {
  completedWishes: number;
  completedLastMonth: number;
}

export interface Stats {
  cat: UserStats;
  bunny: UserStats;
}
