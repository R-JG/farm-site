import BlogPostList from '@/components/BlogPostList';
// import { getAllBlogPosts } from '@/lib/database';
import { BlogPost } from '@/utils/types';
import { BASE_URL } from '@/utils/config';

// export const revalidate = 60;

const Blog = async () => {

  const response = await fetch(`${BASE_URL}/api/blog-posts`, {
    method: 'GET',
  });
  const allBlogPosts = await response.json() as BlogPost[];

  // const allBlogPosts = await getAllBlogPosts();

  return (
    <main>
      <BlogPostList allBlogPosts={allBlogPosts} />
    </main>
  );
};

export default Blog;