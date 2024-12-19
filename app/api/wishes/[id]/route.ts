import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const wish = await prisma.wish.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(wish);
  } catch (error) {
    console.error('Error updating wish:', error);
    return NextResponse.json({ error: 'Failed to update wish' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.wish.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Wish deleted' });
  } catch (error) {
    console.error('Error deleting wish:', error);
    return NextResponse.json({ error: 'Failed to delete wish' }, { status: 500 });
  }
}
