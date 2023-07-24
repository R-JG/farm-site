import { getAllBlogPostIds, getBlogPostById } from '@/lib/database';

type Props = {
  params: { postId: string }
};

export const generateStaticParams = async () => {
  const posts = await getAllBlogPostIds();
  return posts.map(post => ({ postId: String(post.id) }));
};

const BlogPostPage = async ({ params }: Props) => {

  const postData = await getBlogPostById(Number(params.postId));

  if (!postData) return <div></div>;

  return (
    <main className='p-6 flex-grow flex flex-col justify-start items-center bg-blue-200'>
      <div className='w-[55vw] p-12 rounded-xl flex flex-col justify-start items-start bg-blue-100'>
        <h1 className='text-xl font-medium mb-2'>
          {postData.title}
        </h1>
        <h2>By {postData.author}</h2>
        <h3 className='mb-8'>
          {postData.date}
        </h3>
        <p className='whitespace-pre-line'>
          {postData.content}
        </p>
        <hr className='w-[35vw] my-12 border-[0.07rem] border-slate-800 opacity-70 self-center' />
      </div>
    </main>
  );
};

export default BlogPostPage;