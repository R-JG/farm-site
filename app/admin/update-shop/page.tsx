import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { prisma } from '@/prisma/database';
import { NewShopItem } from '@/utils/types';
import { createUploadSignature } from '@/utils/server';
import UpdateShopInterface from '@/components/UpdateShopInterface';
import { deleteUploadedFile } from '@/utils/server';
import { PUBLIC_CLOUDINARY_API_KEY, PUBLIC_CLOUDINARY_URL } from '@/utils/config';

const UpdateShopPage = async () => {

  const session = await getServerSession(options);

  const sessionUser = (session?.user?.email) ? await prisma.user.findUnique({ 
    where: { email: session.user.email } 
  }) : null;

  const allShopItems = await prisma.shopItem.findMany({ 
    orderBy: { createdAt: 'desc' } 
  });

  const createSignature = async (): Promise<null | { timestamp: number, signature: string }> => {
    'use server';
    if (sessionUser?.role !== 'ADMIN') return null;
    return createUploadSignature();
  };

  const createShopItem = async (itemUploadData: FormData): Promise<{ success: boolean }> => {
    'use server';
    if (sessionUser?.role !== 'ADMIN') return { success: false };
    try {
      const formDataArray = Array.from(itemUploadData);
      let newItem: NewShopItem = {
        name: '',
        description: '',
        price: 0
      }; 
      let uploadedImageIds: string[] = [];
      formDataArray.forEach(([k, v]) => {
        if (k === 'price') {
          newItem[k] = Number(v);
        } else if ((k in newItem) && (typeof v === 'string')) {
          newItem[k as keyof Omit<NewShopItem, 'price'>] = v;
        } else if ((k === 'imageIds') && (typeof v === 'string')) {
          uploadedImageIds.push(v);
        };
      });
      const createdItem = await prisma.shopItem.create({ data: newItem });
      await Promise.all(uploadedImageIds.map(id => prisma.shopItemImage.create({
        data: { id, shopItemId: createdItem.id }
      })));
      revalidatePath('/');
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    };
  };

  const deleteShopItem = async (itemId: number): Promise<{ success: boolean }> => {
    'use server';
    if (sessionUser?.role !== 'ADMIN') return { success: false };
    try {
      const itemToDelete = await prisma.shopItem.findUnique({ where: { id: itemId } });
      if (!itemToDelete) return { success: false };
      const associatedImages = await prisma.shopItemImage.findMany({ 
        where: { shopItemId: itemToDelete.id } 
      });
      await Promise.all(associatedImages.map(image => deleteUploadedFile(image.id)));
      await prisma.shopItemImage.deleteMany({ where: { shopItemId: itemToDelete.id } });
      await prisma.shopItem.delete({ where: { id: itemId } });
      revalidatePath('/');
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    };
  };

  return (
    <main className='flex-grow'>
      <UpdateShopInterface 
        publicUploadApiKey={PUBLIC_CLOUDINARY_API_KEY}
        publicUploadUrl={PUBLIC_CLOUDINARY_URL}
        allShopItems={allShopItems}
        createSignature={createSignature}
        createShopItem={createShopItem}
        deleteShopItem={deleteShopItem}
      />
    </main>
  );
};

export default UpdateShopPage;