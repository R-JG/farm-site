import { prisma } from '@/prisma/database';

type Props = {
  params: { postId: string }
};

export const generateStaticParams = async () => {
  const posts = await prisma.blogPost.findMany();
  return posts.map(post => ({ postId: String(post.id) }));
};

const BlogPostPage = async ({ params }: Props) => {

  const postData = await prisma.blogPost.findFirst({ where: { id: Number(params.postId) } });

  if (!postData) return undefined;

  return (
    <main className='p-12 flex flex-col justify-start items-center'>
      <div className='w-[60vw] flex flex-col justify-start items-start'>
        <h1 className='text-xl font-medium mb-2'>
          {postData.title}
        </h1>
        <h3>By {postData.author}</h3>
        <h3 className='mb-8'>
          {postData.date}
        </h3>
        <p className=' whitespace-pre-line'>
          {postData.content}
        </p>
        <hr className='w-[40vw] my-12 border-[0.07rem] border-slate-800 opacity-70 self-center' />
      </div>
    </main>
  );
};

export default BlogPostPage;