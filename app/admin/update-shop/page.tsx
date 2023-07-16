import { File } from 'buffer';
import fsp from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { prisma } from '@/prisma/database';
import { NewShopItem } from '@/utils/types';
import { PATH_TO_ROOT } from '@/utils/config';
import UpdateShopInterface from '@/components/UpdateShopInterface';

const UpdateShopPage = async () => {

  const session = await getServerSession(options);

  const sessionUser = await prisma.user.findUnique({ 
    where: { email: session?.user?.email ?? '' } 
  });

  const allItems = await prisma.shopItem.findMany({
    orderBy: { createdAt: 'desc' } 
  });

  const createItem = async (itemRequestData: FormData): Promise<{ success: boolean }> => {
    'use server';
    if (sessionUser?.role !== 'ADMIN') return { success: false };
    try {
      const formDataArray = Array.from(itemRequestData);
      let newItem: NewShopItem = {
        name: '',
        description: '',
        price: 0,
        images: []
      }; 
      let imageFiles: File[] = [];
      formDataArray.forEach(([k, v]) => {
        if (v instanceof File) {
          imageFiles.push(v);
        } else if (k === 'price') {
          newItem[k] = Number(v);
        } else if ((k in newItem) && (typeof v === 'string') && (k !== 'images')) {
          newItem[k as keyof Omit<NewShopItem, 'images' | 'price'>] = v;
        };
      });
      for (const imageFile of imageFiles) {
        const imageStream = imageFile.stream();
        const pathFromPublic = `/shop-items/${imageFile.name}`;
        await fsp.writeFile(`${PATH_TO_ROOT}/public${pathFromPublic}`, imageStream);
        newItem.images.push(pathFromPublic);
      };
      await prisma.shopItem.create({ data: newItem });
      revalidatePath('/update-shop');
      revalidatePath('/shop');
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    };
  };

  const deleteItem = async (itemId: number): Promise<{ success: boolean }> => {
    'use server';
    if (sessionUser?.role !== 'ADMIN') return { success: false };
    try {
      const itemToDelete = await prisma.shopItem.findUnique({ where: { id: itemId } });
      if (!itemToDelete) return { success: false };
      const associatedImagePaths = itemToDelete.images;
      let imagesToDelete: string[] = [];
      for (const path of associatedImagePaths) {
        const itemsSharingImage = await prisma.shopItem.findMany({ 
          where: { images: { has: path } } 
        });
        if (itemsSharingImage.length <= 1) {
          imagesToDelete.push(path);
        };
      };
      await prisma.shopItem.delete({ where: { id: itemId } });
      for (const path of imagesToDelete) {
        await fsp.rm(`${PATH_TO_ROOT}/public${path}`); 
      };
      revalidatePath('/update-shop');
      revalidatePath('/shop');
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    };
  };

  return (
    <main className='flex-grow'>
      <UpdateShopInterface 
        allItems={allItems}
        createItem={createItem}
        deleteItem={deleteItem}
      />
    </main>
  );
};

export default UpdateShopPage;