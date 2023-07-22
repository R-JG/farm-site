import BlogPostList from '@/components/BlogPostList';

export const revalidate = 60;

const Blog = async () => {
  return (
    <main>
      <BlogPostList />
    </main>
  );
};

export default Blog;