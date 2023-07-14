import { File } from 'buffer';
import fsp from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/prisma/database';
import { NewHomePost } from '@/utils/types';
import { PATH_TO_ROOT } from '@/utils/config';
import UpdateNewsInterface from '@/components/UpdateNewsInterface';

const UpdateNewsPage = async () => {

  const allPosts = await prisma.homePost.findMany({ 
    orderBy: { createdAt: 'asc' } 
  });

  const createPost = async (postUploadData: FormData): Promise<{ success: boolean }> => {
    'use server';
    try {
      const formDataArray = Array.from(postUploadData);
      let newPost: NewHomePost = {
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
          newPost[k as keyof Omit<NewHomePost, 'images'>] = v;
        };
      });
      if (imageFile) {
        const imageStream = imageFile.stream();
        const pathFromPublic = `/news-posts/${imageFile.name}`;
        await fsp.writeFile(`${PATH_TO_ROOT}/public${pathFromPublic}`, imageStream);
        newPost.images.push(pathFromPublic);
      };
      await prisma.homePost.create({ data: newPost });
      revalidatePath('/');
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    };
  };

  const deletePost = async (postId: number): Promise<{ success: boolean }> => {
    'use server';
    try {
      const postToDelete = await prisma.homePost.findUnique({ where: { id: postId } });
      if (!postToDelete) return { success: false };
      const associatedImagePath = postToDelete.images[0];
      const postsSharingImage = await prisma.homePost.findMany({ 
        where: { images: { has: associatedImagePath } } 
      });
      await prisma.homePost.delete({ where: { id: postId } });
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