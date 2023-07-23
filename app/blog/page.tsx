import BlogPostList from '@/components/BlogPostList';
import { prisma } from '@/prisma/database';
import { cache } from 'react';

export const revalidate = 60;

const Blog = async () => {

  const getAllBlogPosts = cache(async () => await prisma.blogPost.findMany({ 
    orderBy: { createdAt: 'desc' } 
  }));

  const allBlogPosts = await getAllBlogPosts();

  return (
    <main>
      <BlogPostList allBlogPosts={allBlogPosts} />
    </main>
  );
};

export default Blog;