import { prisma } from '@/prisma/database';
import { NewHomePost, NewBlogPost, NewShopItem } from '@/utils/types';
import TEST_AdminForms from '@/components/TEST_AdminForms';

const TEST = () => {

  const createHomePost = async (newPostData: NewHomePost): Promise<void> => {
    'use server';
    try {
      await prisma.homePost.create({ data: newPostData });
    } catch (error) {
      console.error(error);
    };
  };

  const createBlogPost = async (newPostData: NewBlogPost): Promise<void> => {
    'use server';
    try {
      await prisma.blogPost.create({ data: newPostData });
    } catch (error) {
      console.error(error);
    };
  };

  const createShopItem = async (newItemData: NewShopItem): Promise<void> => {
    'use server';
    try {
      await prisma.shopItem.create({ data: newItemData });
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <main>
      <TEST_AdminForms 
        createHomePost={createHomePost} 
        createBlogPost={createBlogPost}
        createShopItem={createShopItem}
      />
    </main>
  );
};

export default TEST;