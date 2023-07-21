import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { prisma } from '@/prisma/database';
import { NewBlogPost } from '@/utils/types';
import { createUploadSignature } from '@/utils/server';
import UpdateBlogInterface from '@/components/UpdateBlogInterface';
import { deleteUploadedFile } from '@/utils/server';
import { PUBLIC_CLOUDINARY_API_KEY, PUBLIC_CLOUDINARY_URL } from '@/utils/config';

const UpdateBlogPage = async () => {

  const session = await getServerSession(options);

  const sessionUser = (session?.user?.email) ? await prisma.user.findUnique({ 
    where: { email: session.user.email } 
  }) : null;

  const allPosts = await prisma.blogPost.findMany({ 
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
      let newPost: NewBlogPost = {
        title: '',
        content: '',
        author: '',
        date: ''
      }; 
      let uploadedImageIds: string[] = [];
      formDataArray.forEach(([k, v]) => {
        if ((k in newPost) && (typeof v === 'string')) {
          newPost[k as keyof NewBlogPost] = v;
        } else if ((k === 'imageIds') && (typeof v === 'string')) {
          uploadedImageIds.push(v);
        };
      });
      const createdPost = await prisma.blogPost.create({ data: newPost });
      await Promise.all(uploadedImageIds.map(id => prisma.blogPostImage.create({
        data: { id, blogPostId: createdPost.id }
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
      const postToDelete = await prisma.blogPost.findUnique({ where: { id: postId } });
      if (!postToDelete) return { success: false };
      const associatedImages = await prisma.blogPostImage.findMany({ 
        where: { blogPostId: postToDelete.id } 
      });
      await Promise.all(associatedImages.map(image => deleteUploadedFile(image.id)));
      await prisma.blogPostImage.deleteMany({ where: { blogPostId: postToDelete.id } });
      await prisma.blogPost.delete({ where: { id: postId } });
      revalidatePath('/');
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    };
  };

  return (
    <main className='flex-grow'>
      <UpdateBlogInterface 
        publicUploadApiKey={PUBLIC_CLOUDINARY_API_KEY}
        publicUploadUrl={PUBLIC_CLOUDINARY_URL}
        allBlogPosts={allPosts}
        createSignature={createSignature}
        createBlogPost={createPost}
        deleteBlogPost={deletePost}
      />
    </main>
  );
};

export default UpdateBlogPage;