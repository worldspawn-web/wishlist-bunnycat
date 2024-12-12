'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Auth({ params }: { params: { type: string } }) {
  const [password, setPassword] = useState('');
  const router = useRouter();
  // @ts-expect-error - Sorry but that's TypeScript moment. Will have to re-factor later.
  const { type } = React.use(params);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = type === 'cat' ? '143514' : '143500';
    if (password === correctPassword) {
      router.push('/wishlist');
    } else {
      alert('Неверный пароль');
    }
  };

  const iconSrc = type === 'cat' ? '/black-cat.png' : '/bunny.png';

  return (
    <>
      <AnimatedBackground />
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
          <Button type="submit">Войти</Button>
        </form>
      </main>
    </>
  );
}
