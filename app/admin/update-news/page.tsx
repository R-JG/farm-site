import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { NewNewsPost } from '@/utils/types';
import { createUploadSignature } from '@/lib/server';
import UpdateNewsInterface from '@/components/UpdateNewsInterface';
import { deleteUploadedFile } from '@/lib/server';
import { PUBLIC_CLOUDINARY_API_KEY, PUBLIC_CLOUDINARY_URL } from '@/utils/config';
import { 
  getUserByEmail, getAllNewsPosts, getNewsPostById, createNewsPost, 
  createNewsPostImage, deleteNewsPostById, deleteAllNewsPostImagesByPostId 
} from '@/lib/database';

const UpdateNewsPage = async () => {

  const session = await getServerSession(options);

  const sessionUser = (session?.user?.email) ? await getUserByEmail(session.user.email) : null;

  const allPosts = await getAllNewsPosts();

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
      const createdPost = await createNewsPost(newPost);
      await Promise.all(uploadedImageIds.map(id => createNewsPostImage(id, createdPost.id)));
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
      const postToDelete = await getNewsPostById(postId);
      if (!postToDelete) return { success: false };
      await Promise.all(postToDelete.images.map(image => deleteUploadedFile(image.id)));
      await deleteAllNewsPostImagesByPostId(postToDelete.id);
      await deleteNewsPostById(postToDelete.id);
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