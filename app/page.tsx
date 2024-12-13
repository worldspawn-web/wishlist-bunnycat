import Image from 'next/image';
import Link from 'next/link';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <main className="flex min-h-screen flex-col items-center justify-center p-24 relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-white">Список желаний</h1>
        <div className="flex space-x-4">
          <Link href="/auth/cat" passHref>
            <Button className="p-0 w-32 h-32">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/black-cat.png-hdmrlgmQ7X5JqTnVTOXbnytxkg456U.webp"
                alt="Чёрный кот"
                width={128}
                height={128}
                className="rounded-md"
                priority
              />
            </Button>
          </Link>
          <Link href="/auth/bunny" passHref>
            <Button className="p-0 w-32 h-32">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bunny-ybhrOwD3qGsqhTwHoHmAs88Am7f1OQ.png"
                alt="Зайка"
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
