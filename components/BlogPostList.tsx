// import { prisma } from '@/prisma/database';
import BlogPostPreview from './BlogPostPreview';
import { BlogPost } from '@/utils/types';

type Props = {
  allBlogPosts: BlogPost[]
};

const BlogPostList = async ({ allBlogPosts }: Props) => {

  /*
  const allBlogPosts = await prisma.blogPost.findMany({ 
    orderBy: { createdAt: 'desc' } 
  });
  */

  return (
    <div className='p-6 flex flex-row justify-center items-start'>
      {allBlogPosts.map(post => 
      <BlogPostPreview 
        key={post.id} 
        postData={post} 
      />)}
    </div>
  );
};

export default BlogPostList;