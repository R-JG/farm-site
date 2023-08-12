import BlogPostPreview from './BlogPostPreview';
import { BlogPost } from '@/utils/types';

type Props = {
  allBlogPosts: BlogPost[]
};

const BlogPostList = async ({ allBlogPosts }: Props) => {

  return (
    <div className='p-6 flex flex-col sm:flex-row justify-center items-center sm:items-start'>
      {allBlogPosts.map(post => 
      <BlogPostPreview 
        key={post.id} 
        postData={post} 
      />)}
    </div>
  );
};

export default BlogPostList;