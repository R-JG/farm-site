import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { NewBlogPost } from '@/utils/types';
import { createUploadSignature } from '@/lib/server';
import UpdateBlogInterface from '@/components/UpdateBlogInterface';
import { deleteUploadedFile } from '@/lib/server';
import { PUBLIC_CLOUDINARY_API_KEY, PUBLIC_CLOUDINARY_URL } from '@/utils/config';
import { 
  getUserByEmail, getAllBlogPosts, getBlogPostById, createBlogPost, 
  createBlogPostImage, deleteBlogPostById, deleteAllBlogPostImagesByPostId 
} from '@/lib/database';

const UpdateBlogPage = async () => {

  const session = await getServerSession(options);

  const sessionUser = (session?.user?.email) ? await getUserByEmail(session.user.email) : null;

  const allPosts = await getAllBlogPosts();

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
      const createdPost = await createBlogPost(newPost);
      await Promise.all(uploadedImageIds.map(id => createBlogPostImage(id, createdPost.id)));
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
      const postToDelete = await getBlogPostById(postId);
      if (!postToDelete) return { success: false };
      await Promise.all(postToDelete.images.map(image => deleteUploadedFile(image.id)));
      await deleteAllBlogPostImagesByPostId(postToDelete.id);
      await deleteBlogPostById(postToDelete.id);
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