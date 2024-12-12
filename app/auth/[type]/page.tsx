'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Auth({ params }: { params: { type: string } }) {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = params.type === 'cat' ? '143514' : '143500';
    if (password === correctPassword) {
      router.push('/wishlist');
    } else {
      alert('Неверный пароль');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Введите пароль для {params.type === 'cat' ? 'кота' : 'зайки'}</h1>
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
  );
}
