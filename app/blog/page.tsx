import BlogPostList from '@/components/BlogPostList';
import { getAllBlogPosts } from '@/lib/database';

export const revalidate = 60;

const Blog = async () => {

  const allBlogPosts = await getAllBlogPosts();

  return (
    <main>
      <BlogPostList allBlogPosts={allBlogPosts} />
    </main>
  );
};

export default Blog;