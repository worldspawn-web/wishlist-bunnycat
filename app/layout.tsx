'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
      // will remove later, for testing and debugging purposes
      setTimeout(() => {
        setIsLoading(false);
      }, Math.floor(Math.random() * 2000) + 1000);
    };

    handleStart();
  }, [pathname]);

  return (
    <html lang="en">
      <body className={`${inter.className} ${isLoading ? 'overflow-hidden' : ''}`}>
        {isLoading && <LoadingSpinner />}
        <div className={`transition-all duration-300 ${isLoading ? 'blur-sm' : ''}`}>{children}</div>
      </body>
    </html>
  );
}
