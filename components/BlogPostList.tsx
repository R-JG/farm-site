import { prisma } from '@/prisma/database';
import BlogPostPreview from './BlogPostPreview';

const BlogPostList = async () => {

  const getAllBlogPosts = async () => await prisma.blogPost.findMany({ 
    orderBy: { createdAt: 'desc' } 
  });

  const allBlogPosts = await getAllBlogPosts();

  return (
    <div className='p-6 flex flex-row justify-center items-start'>
      {allBlogPosts.map(post => 
      <BlogPostPreview key={post.id} postData={post} />)}
    </div>
  );
};

export default BlogPostList;