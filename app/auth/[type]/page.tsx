'use client';

import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Auth({ params }: { params: { type: string } }) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const type = params.type;

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
      alert('Неверный пароль');
    }
  };

  const iconSrc = type === 'cat' ? '/black-cat.png' : '/bunny.png';

  return (
    <>
      <AnimatedBackground />
      {isLoading && <LoadingSpinner />}
      <main className="flex min-h-screen flex-col items-center justify-center p-24 relative z-10">
        <Image src={iconSrc} alt={type === 'cat' ? 'Чёрный кот' : 'Зайка'} width={128} height={128} className="mb-8" />
        <h1 className="text-4xl font-bold mb-8 text-white">Введите пароль для {type === 'cat' ? 'кота' : 'зайки'}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            className="w-64"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Загрузка...' : 'Войти'}
          </Button>
        </form>
      </main>
    </>
  );
}
