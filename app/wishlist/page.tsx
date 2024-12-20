import { Suspense } from 'react';
import { Wish } from '@/types';
import WishlistClient from './WishlistClient';
import prisma from '@/lib/prisma';

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
