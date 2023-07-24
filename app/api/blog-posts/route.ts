import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/database';

export const GET = async () => {
  const allBlogPosts = await getAllBlogPosts();
  return NextResponse.json(allBlogPosts);
};