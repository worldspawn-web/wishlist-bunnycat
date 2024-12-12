import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <main className="flex min-h-screen flex-col items-center justify-center p-24 relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-white">Список желаний</h1>
        <div className="flex space-x-4">
          <Link href="/auth/cat" passHref>
            <Button className="p-0 w-32 h-32" asChild>
              <div>
                <Image src="/black-cat.png" alt="Чёрный кот" width={128} height={128} className="rounded-md" priority />
              </div>
            </Button>
          </Link>
          <Link href="/auth/bunny" passHref>
            <Button className="p-0 w-32 h-32" asChild>
              <div>
                <Image src="/bunny.png" alt="Зайка" width={128} height={128} className="rounded-md" priority />
              </div>
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
