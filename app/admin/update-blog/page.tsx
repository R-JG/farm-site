import { File } from 'buffer';
import fsp from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { prisma } from '@/prisma/database';
import { NewBlogPost } from '@/utils/types';
import { PATH_TO_ROOT } from '@/utils/config';
import UpdateBlogInterface from '@/components/UpdateBlogInterface';

const UpdateBlogPage = async () => {

  const session = await getServerSession(options);

  const sessionUser = (session?.user?.email) ? await prisma.user.findUnique({ 
    where: { email: session.user.email } 
  }) : null;

  const allBlogPosts = await prisma.blogPost.findMany({ 
    orderBy: { createdAt: 'desc' } 
  });

  const createBlogPost = async (postRequestData: FormData): Promise<{ success: boolean }> => {
    'use server';
    if (sessionUser?.role !== 'ADMIN') return { success: false };
    try {
      const formDataArray = Array.from(postRequestData);
      let newPost: NewBlogPost = {
        title: '',
        content: '',
        author: '',
        date: '',
        images: []
      }; 
      let imageFiles: File[] = [];
      formDataArray.forEach(([k, v]) => {
        if (v instanceof File) {
          imageFiles.push(v);
        } else if ((k in newPost) && (typeof v === 'string') && (k !== 'images')) {
          newPost[k as keyof Omit<NewBlogPost, 'images'>] = v;
        };
      });
      for (const imageFile of imageFiles) {
        const imageStream = imageFile.stream();
        const pathFromPublic = `/blog-posts/${imageFile.name}`;
        await fsp.writeFile(`${PATH_TO_ROOT}/public${pathFromPublic}`, imageStream);
        newPost.images.push(pathFromPublic);
      };
      await prisma.blogPost.create({ data: newPost });
      revalidatePath('/update-blog');
      revalidatePath('/blog');
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    };
  };

  const deleteBlogPost = async (postId: number): Promise<{ success: boolean }> => {
    'use server';
    if (sessionUser?.role !== 'ADMIN') return { success: false };
    try {
      const postToDelete = await prisma.blogPost.findUnique({ where: { id: postId } });
      if (!postToDelete) return { success: false };
      const associatedImagePaths = postToDelete.images;
      let imagesToDelete: string[] = [];
      for (const path of associatedImagePaths) {
        const postsSharingImage = await prisma.blogPost.findMany({ 
          where: { images: { has: path } } 
        });
        if (postsSharingImage.length <= 1) {
          imagesToDelete.push(path);
        };
      };
      await prisma.blogPost.delete({ where: { id: postId } });
      for (const path of imagesToDelete) {
        await fsp.rm(`${PATH_TO_ROOT}/public${path}`); 
      };
      revalidatePath('/update-blog');
      revalidatePath('/blog');
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    };
  };

  return (
    <main className='flex-grow'>
      <UpdateBlogInterface 
        allBlogPosts={allBlogPosts}
        createBlogPost={createBlogPost}
        deleteBlogPost={deleteBlogPost}
      />
    </main>
  );
};

export default UpdateBlogPage;