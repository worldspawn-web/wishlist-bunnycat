'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from '@/i18n';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWishlist } from '@/hooks';
import { categoryEmoji } from '@/constants/categoryEmoji';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/ThemeToggle';
import LoadingSpinner from '@/components/LoadingSpinner';
import StatsPanel from '@/components/StatsPanel';
import WishCard from '@/components/WishCard';
import AddWishModal from '@/components/AddWishModal';
import LogoutConfirmModal from '@/components/LogoutConfirmModal';

interface WishlistClientProps {
  initialWishes: Wish[];
}

const WishlistClient: React.FC<WishlistClientProps> = ({ initialWishes }) => {
  const { wishes, stats, addWish, completeWish, uncompleteWish } = useWishlist(initialWishes);
  const [authorFilter, setAuthorFilter] = useState<'all' | 'cat' | 'bunny' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<WishCategory | 'all'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<'cat' | 'bunny'>('cat');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations();

  const filteredWishes = wishes.filter((wish) => {
    if (authorFilter === 'completed') return wish.completed;
    if (authorFilter !== 'all' && wish.author !== authorFilter) return false;
    if (categoryFilter !== 'all' && wish.category !== categoryFilter) return false;
    return !wish.completed;
  });

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = async () => {
    setIsLogoutModalOpen(false);
    setIsLoading(true);
    console.log('Starting logout');
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      console.log('Logout complete');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {isLoading && <LoadingSpinner />}
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{t('common.wishlist')} 🐈‍⬛🐰</h1>
          <div className="flex space-x-2 items-center">
            <ThemeToggle />
            <Button onClick={() => setIsAddModalOpen(true)}>{t('wishlist.addWish')}</Button>
            <Button variant="outline" onClick={handleLogout}>
              {t('wishlist.changeAccount')}
            </Button>
          </div>
        </div>
        <div className="flex mb-4">
          <div className="w-1/4 pr-4">
            <h2 className="text-xl font-semibold mb-2">{t('wishlist.filters')}</h2>
            <div className="space-y-2">
              <Select value={categoryFilter} onValueChange={(value: WishCategory | 'all') => setCategoryFilter(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('wishlist.allCategories')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('wishlist.allCategories')}</SelectItem>
                  {Object.entries(categoryEmoji).map(([category, emoji]) => (
                    <SelectItem key={category} value={category as WishCategory}>
                      {emoji} {t(`categories.${category}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant={authorFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setAuthorFilter('all')}
                className="w-full"
              >
                {t('wishlist.all')}
              </Button>
              <Button
                variant={authorFilter === 'cat' ? 'default' : 'outline'}
                onClick={() => setAuthorFilter('cat')}
                className="w-full"
              >
                {t('common.cat')}
              </Button>
              <Button
                variant={authorFilter === 'bunny' ? 'default' : 'outline'}
                onClick={() => setAuthorFilter('bunny')}
                className="w-full"
              >
                {t('common.bunny')}
              </Button>
              <Button
                variant={authorFilter === 'completed' ? 'default' : 'outline'}
                onClick={() => setAuthorFilter('completed')}
                className="w-full bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800 transition-colors duration-200"
              >
                {t('wishlist.completed')}
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
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default WishlistClient;
