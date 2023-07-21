import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { prisma } from '@/prisma/database';
import { NewNewsPost } from '@/utils/types';
import { createUploadSignature } from '@/utils/server';
import UpdateNewsInterface from '@/components/UpdateNewsInterface';
import { deleteUploadedFile } from '@/utils/server';
import { PUBLIC_CLOUDINARY_API_KEY, PUBLIC_CLOUDINARY_URL } from '@/utils/config';

const UpdateNewsPage = async () => {

  const session = await getServerSession(options);

  const sessionUser = (session?.user?.email) ? await prisma.user.findUnique({ 
    where: { email: session.user.email } 
  }) : null;

  const allPosts = await prisma.newsPost.findMany({ 
    orderBy: { createdAt: 'desc' } 
  });

  const createSignature = async (): Promise<null | { timestamp: number, signature: string }> => {
    'use server';
    if (sessionUser?.role !== 'ADMIN') return null;
    return createUploadSignature();
  };

  const createPost = async (postUploadData: FormData): Promise<{ success: boolean }> => {
    'use server';
    if (sessionUser?.role !== 'ADMIN') return { success: false };
    try {
      const formDataArray = Array.from(postUploadData);
      let newPost: NewNewsPost = {
        title: '',
        content: '',
        link: '',
        linkText: ''
      }; 
      let uploadedImageIds: string[] = [];
      formDataArray.forEach(([k, v]) => {
        if ((k in newPost) && (typeof v === 'string')) {
          newPost[k as keyof NewNewsPost] = v;
        } else if ((k === 'imageIds') && (typeof v === 'string')) {
          uploadedImageIds.push(v);
        };
      });
      const createdPost = await prisma.newsPost.create({ data: newPost });
      await Promise.all(uploadedImageIds.map(id => prisma.newsPostImage.create({
        data: { id, newsPostId: createdPost.id }
      })));
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
      const associatedImages = await prisma.newsPostImage.findMany({ 
        where: { newsPostId: postToDelete.id } 
      });
      await Promise.all(associatedImages.map(image => deleteUploadedFile(image.id)));
      await prisma.newsPostImage.deleteMany({ where: { newsPostId: postToDelete.id } });
      await prisma.newsPost.delete({ where: { id: postId } });
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
        publicUploadApiKey={PUBLIC_CLOUDINARY_API_KEY}
        publicUploadUrl={PUBLIC_CLOUDINARY_URL}
        allPosts={allPosts}
        createSignature={createSignature}
        createPost={createPost}
        deletePost={deletePost}
      />
    </main>
  );
};

export default UpdateNewsPage;