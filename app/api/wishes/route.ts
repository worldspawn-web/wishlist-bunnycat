import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const wishes = await prisma.wish.findMany();
  return NextResponse.json(wishes);
}

export async function POST(request: Request) {
  const data = await request.json();
  const wish = await prisma.wish.create({ data });
  return NextResponse.json(wish);
}
