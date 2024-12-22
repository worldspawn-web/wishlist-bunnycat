'use client';

import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n'; // Импортируем из нашего i18n.ts
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

export default function Auth({ params }: { params: { type: string } }) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const type = params.type;
  const t = useTranslations();

  useEffect(() => {
    console.log('Auth component mounted');
    return () => console.log('Auth component unmounted');
  }, []);

  useEffect(() => {
    console.log('isLoading changed:', isLoading);
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = type === 'cat' ? '143514' : '143500';
    if (password === correctPassword) {
      setIsLoading(true);
      console.log('Starting navigation');
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Имитация задержки
        await router.push('/wishlist');
      } catch (error) {
        console.error('Navigation error:', error);
      } finally {
        console.log('Navigation complete');
        setIsLoading(false);
      }
    } else {
      alert(t('auth.invalidPassword'));
    }
  };

  const iconSrc =
    type === 'cat'
      ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/black-cat.png-hdmrlgmQ7X5JqTnVTOXbnytxkg456U.webp'
      : 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bunny-ybhrOwD3qGsqhTwHoHmAs88Am7f1OQ.png';

  return (
    <>
      <AnimatedBackground />
      {isLoading && <LoadingSpinner />}
      <main className="flex min-h-screen flex-col items-center justify-center p-24 relative z-10">
        <Image
          src={iconSrc}
          alt={type === 'cat' ? t('common.cat') : t('common.bunny')}
          width={128}
          height={128}
          className="mb-8"
        />
        <h1 className="text-4xl font-bold mb-8 text-white">
          {t('auth.enterPassword', { animal: type === 'cat' ? t('common.cat') : t('common.bunny') })}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.enterPassword', { animal: '' })}
            className="w-64"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('common.loading') : t('common.login')}
          </Button>
        </form>
      </main>
    </>
  );
}
