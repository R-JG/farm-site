import { File } from 'buffer';
import fsp from 'fs/promises';
import { prisma } from '@/prisma/database';
import { NewHomePost } from '@/utils/types';
import { PATH_TO_ROOT } from '@/utils/config';
import UpdateNewsInterface from '@/components/UpdateNewsInterface';

const UpdateNewsPage = async () => {

  const allPosts = await prisma.homePost.findMany();

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
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    };
  };

  return (
    <main>
      <UpdateNewsInterface 
        allPosts={allPosts}
        createPost={createPost}
      />
    </main>
  );
};

export default UpdateNewsPage;