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
  createShopItemImage, deleteShopItemById, deleteAllShopItemImagesByItemId, 
  updateShopItemInventoryByPriceId, createShopItemPrice, deleteAllShopItemPricesByItemId 
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
    let createdDbItemId: string | undefined;
    let uploadedImageIds: string[] = [];
    try {
      const formDataArray = Array.from(itemUploadData);
      let newItem: NewShopItem = {
        name: '',
        description: '',
      }; 
      let priceObjectData: { amount: number, inventory: number | null }[] = [];
      formDataArray.forEach(([k, v]) => {
        if (k === 'price') {
          const [priceAmount, priceInventory] = v.toString().split(/\s+/);
          const priceObjectEntry = { 
            amount: Number(priceAmount), 
            inventory: priceInventory ? Number(priceInventory) : null 
          };  
          if (Number.isNaN(priceObjectEntry.amount) || 
          ((priceObjectEntry.inventory !== null) && Number.isNaN(priceObjectEntry.inventory))) {
            throw new Error('Missing valid price data for shop item creation');
          } else {
            priceObjectData.push(priceObjectEntry);
          };
        } else if ((k in newItem) && (typeof v === 'string')) {
          newItem[k as keyof Omit<NewShopItem, 'inventory'>] = v;
        } else if ((k === 'imageIds') && (typeof v === 'string')) {
          uploadedImageIds.push(v);
        };
      });
      priceObjectData.sort((a, b) => (a.amount - b.amount));

      console.log('PRICE OBJECT DATA ---> ', priceObjectData);

      const [defaultPriceObject, ...additionalPriceObjects] = priceObjectData;
      const createdDbItem = await createShopItem(newItem);
      createdDbItemId = createdDbItem.id;
      const createdStripeProduct = await stripe.products.create({ 
        id: createdDbItem.id,
        name: createdDbItem.name,
        description: createdDbItem.description,
        images: uploadedImageIds.map(imageId => 
          `https://res.cloudinary.com/dsvixs5p2/image/upload/${imageId}`
        ),
        default_price_data: {
          currency: 'cad',
          unit_amount: (defaultPriceObject.amount * 100)
        }
      });
      const stripeAdditionalPrices = await Promise.all(
        additionalPriceObjects.map(price => stripe.prices.create({
          product: createdStripeProduct.id,
          currency: 'cad',
          unit_amount: (price.amount * 100)
        }))
      );
      console.log('Created a new Stripe product: ', createdStripeProduct);
      const dbDefaultPrice = createShopItemPrice( 
        String(createdStripeProduct.default_price), 
        createdDbItem.id, 
        defaultPriceObject.amount, 
        defaultPriceObject.inventory
      );
      const dbAdditionalPrices = stripeAdditionalPrices.map((price, index) => createShopItemPrice(
        price.id, 
        createdDbItem.id, 
        additionalPriceObjects[index].amount, 
        additionalPriceObjects[index].inventory
      ));
      const dbItemImages = uploadedImageIds.map((id, index) => 
        createShopItemImage(id, createdDbItem.id, (index + 1))
      );
      await Promise.all([dbDefaultPrice, dbAdditionalPrices, dbItemImages]);
      revalidatePath('/shop');
      revalidatePath('/admin/update-shop');
      return { success: true };
    } catch (error) {
      console.error(error);
      if (uploadedImageIds.length > 0) {
        uploadedImageIds.forEach(imageId => deleteUploadedFile(imageId));
      };
      if (createdDbItemId) {
        deleteShopItemById(createdDbItemId);
      };
      return { success: false };
    };
  };

  const deleteShopItem = async (itemId: string): Promise<{ success: boolean }> => {
    'use server';
    if (sessionUser?.role !== 'ADMIN') return { success: false };
    try {
      const itemToDelete = await getShopItemById(itemId);
      if (!itemToDelete) return { success: false };
      const productDeleteResult = await stripe.products.update(itemToDelete.id, { active: false });
      console.log('Stripe product delete (set to inactive) result: ', productDeleteResult);
      await Promise.all(itemToDelete.images.map(image => deleteUploadedFile(image.id)));
      await Promise.all([deleteAllShopItemPricesByItemId(itemToDelete.id), deleteAllShopItemImagesByItemId(itemToDelete.id)]);
      await deleteShopItemById(itemToDelete.id);
      revalidatePath('/shop');
      revalidatePath('/admin/update-shop');
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    };
  };

  const updateItemInventory = async (
    priceId: string, 
    newInventory: number | null
  ): Promise<{ success: boolean, inventory?: number | null }> => {
    'use server';
    if (sessionUser?.role !== 'ADMIN') return { success: false };
    try {
      const updatedPriceObject = await updateShopItemInventoryByPriceId(priceId, newInventory);
      revalidatePath('/shop');
      revalidatePath('/admin/update-shop');
      return { success: true, inventory: updatedPriceObject.inventory };
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
        updateItemInventory={updateItemInventory}
      />
    </main>
  );
};

export default UpdateShopPage;