'use client';

import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useToast } from '@/components/ui/use-toast';

interface AuthClientProps {
  type: string;
  locale: string;
}

export default function AuthClient({ type, locale }: AuthClientProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = type === 'cat' ? '143514' : '143500';
    if (password === correctPassword) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Имитация задержки
        router.push(`/${locale}/wishlist`);
      } catch (error) {
        console.error('Navigation error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        variant: 'destructive',
        title: t('auth.invalidPassword'),
        description: t('auth.tryAgain'),
      });
      setPassword('');
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
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-64">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.enterPassword')}
            className="w-full"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('common.loading') : t('common.login')}
          </Button>
        </form>
      </main>
    </>
  );
}
