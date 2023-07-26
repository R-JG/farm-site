import stripe from '@/utils/stripe';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import options from '@/app/api/auth/[...nextauth]/options';
import { NewShopItem } from '@/utils/types';
import { createUploadSignature } from '@/lib/server';
import UpdateShopInterface from '@/components/UpdateShopInterface';
import { deleteUploadedFile } from '@/lib/server';
import { PUBLIC_CLOUDINARY_API_KEY, PUBLIC_CLOUDINARY_URL } from '@/utils/config';
import { 
  getUserByEmail, getAllShopItems, getShopItemById, createShopItem, 
  createShopItemImage, deleteShopItemById, deleteAllShopItemImagesByItemId 
} from '@/lib/database';

const UpdateShopPage = async () => {

  const session = await getServerSession(options);

  const sessionUser = (session?.user?.email) ? await getUserByEmail(session.user.email) : null;

  const allShopItems = await getAllShopItems();

  const createSignature = async (): Promise<null | { timestamp: number, signature: string }> => {
    'use server';
    if (sessionUser?.role !== 'ADMIN') return null;
    return createUploadSignature();
  };

  const createItem = async (itemUploadData: FormData): Promise<{ success: boolean }> => {
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
      const createdItem = await createShopItem(newItem);
      await Promise.all(uploadedImageIds.map(id => createShopItemImage(id, createdItem.id)));
      const createdStripeProduct = await stripe.products.create({ 
        id: String(createdItem.id),
        name: createdItem.name,
        description: createdItem.description,
        images: uploadedImageIds.map(imageId => 
          `https://res.cloudinary.com/dsvixs5p2/image/upload/${imageId}`
        ),
        default_price_data: {
          currency: 'cad',
          unit_amount: (createdItem.price * 100)
        }
      });
      console.log('Created a new Stripe product: ', createdStripeProduct);
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
      const itemToDelete = await getShopItemById(itemId);
      if (!itemToDelete) return { success: false };
      const productDeleteResult = await stripe.products.update(String(itemToDelete.id), { active: false });
      console.log('Stripe product delete (set to inactive) result: ', productDeleteResult);
      await Promise.all(itemToDelete.images.map(image => deleteUploadedFile(image.id)));
      await deleteAllShopItemImagesByItemId(itemToDelete.id);
      await deleteShopItemById(itemToDelete.id);
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
        createShopItem={createItem}
        deleteShopItem={deleteShopItem}
      />
    </main>
  );
};

export default UpdateShopPage;