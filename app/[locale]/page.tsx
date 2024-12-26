'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function Home() {
  const t = useTranslations();
  const { locale } = useParams();

  return (
    <>
      <AnimatedBackground />
      <main className="flex min-h-screen flex-col items-center justify-center p-24 relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-white">{t('common.wishlist')}</h1>
        <div className="flex space-x-4">
          <Link href={`/${locale}/auth/cat`} passHref>
            <Button className="p-0 w-32 h-32">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/black-cat.png-hdmrlgmQ7X5JqTnVTOXbnytxkg456U.webp"
                alt={t('common.cat')}
                width={128}
                height={128}
                className="rounded-md"
                priority
              />
            </Button>
          </Link>
          <Link href={`/${locale}/auth/bunny`} passHref>
            <Button className="p-0 w-32 h-32">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bunny-ybhrOwD3qGsqhTwHoHmAs88Am7f1OQ.png"
                alt={t('common.bunny')}
                width={128}
                height={128}
                className="rounded-md"
                priority
              />
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
