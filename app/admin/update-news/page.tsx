import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { prisma } from '@/prisma/database';
import { NewNewsPost } from '@/utils/types';
import { createUploadSignature } from '@/utils/media';
import UpdateNewsInterface from '@/components/UpdateNewsInterface';
import { PUBLIC_CLOUDINARY_API_KEY, PUBLIC_CLOUDINARY_URL } from '@/utils/config';

const UpdateNewsPage = async () => {

  const session = await getServerSession(options);

  const sessionUser = (session?.user?.email) ? await prisma.user.findUnique({ 
    where: { email: session.user.email } 
  }) : null;

  const allPosts = await prisma.newsPost.findMany({ 
    orderBy: { createdAt: 'desc' } 
  });

  const createSignature = async (): Promise<{ timestamp: number, signature: string }> => {
    'use server';
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
          newPost[k as keyof Omit<NewNewsPost, 'images'>] = v;
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

  const deletePost = async () => {
    'use server';
    return 'delete placeholder';
  };

  /*
  const OLD_deletePost = async (postId: number): Promise<{ success: boolean }> => {
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
        await fsp.rm(`${rootDirPath}/public${associatedImagePath}`); 
      };
      revalidatePath('/');
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    };
  };
  */

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