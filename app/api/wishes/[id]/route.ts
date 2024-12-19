import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json();
  const wish = await prisma.wish.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(wish);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.wish.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ message: 'Wish deleted' });
}
