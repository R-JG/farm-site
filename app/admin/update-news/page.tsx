import { File } from 'buffer';
import fsp from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { prisma } from '@/prisma/database';
import { NewNewsPost } from '@/utils/types';
import { PATH_TO_ROOT } from '@/utils/config';
import UpdateNewsInterface from '@/components/UpdateNewsInterface';

const UpdateNewsPage = async () => {

  const session = await getServerSession(options);

  const sessionUser = (session?.user?.email) ? await prisma.user.findUnique({ 
    where: { email: session.user.email } 
  }) : null;

  const allPosts = await prisma.newsPost.findMany({ 
    orderBy: { createdAt: 'desc' } 
  });

  const createPost = async (postUploadData: FormData): Promise<{ success: boolean }> => {
    'use server';
    if (sessionUser?.role !== 'ADMIN') return { success: false };
    try {
      const formDataArray = Array.from(postUploadData);
      let newPost: NewNewsPost = {
        title: '',
        content: '',
        link: '',
        linkText: '',
        images: []
      }; 
      let imageFile: File | undefined;
      formDataArray.forEach(([k, v]) => {
        if (v instanceof File) {
          imageFile = v;
        } else if ((k in newPost) && (typeof v === 'string') && (k !== 'images')) {
          newPost[k as keyof Omit<NewNewsPost, 'images'>] = v;
        };
      });
      if (imageFile) {
        const imageStream = imageFile.stream();
        const pathFromPublic = `/news-posts/${imageFile.name}`;
        await fsp.writeFile(`${PATH_TO_ROOT}/public${pathFromPublic}`, imageStream);
        newPost.images.push(pathFromPublic);
      };
      await prisma.newsPost.create({ data: newPost });
      revalidatePath('/');
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    };
  };

  const deletePost = async (postId: number): Promise<{ success: boolean }> => {
    'use server';
    if (sessionUser?.role !== 'ADMIN') return { success: false };
    try {
      const postToDelete = await prisma.newsPost.findUnique({ where: { id: postId } });
      if (!postToDelete) return { success: false };
      const associatedImagePath = postToDelete.images[0];
      const postsSharingImage = await prisma.newsPost.findMany({ 
        where: { images: { has: associatedImagePath } } 
      });
      await prisma.newsPost.delete({ where: { id: postId } });
      if (postsSharingImage.length <= 1) {
        await fsp.rm(`${PATH_TO_ROOT}/public${associatedImagePath}`); 
      };
      revalidatePath('/');
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    };
  };

  return (
    <main className='flex-grow'>
      <UpdateNewsInterface 
        allPosts={allPosts}
        createPost={createPost}
        deletePost={deletePost}
      />
    </main>
  );
};

export default UpdateNewsPage;