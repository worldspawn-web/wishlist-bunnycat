import { Suspense } from 'react';
import WishlistClient from './WishlistClient';
import prisma from '@/lib/prisma';
import { Wish } from '@/types';

async function getWishes(): Promise<Wish[]> {
  return await prisma.wish.findMany();
}

export default async function Wishlist() {
  const initialWishes = await getWishes();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WishlistClient initialWishes={initialWishes} />
    </Suspense>
  );
}
