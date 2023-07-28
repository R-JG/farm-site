import { BASE_URL } from '@/utils/config';
import { getAllShopItemsByIds } from '@/lib/database';
import { ShopItem } from '@/utils/types';
import CartInterface from '@/components/CartInterface';

const CartPage = async () => {

  const findShopItemsForCart = async (itemIds: string[]): Promise<ShopItem[]> => {
    'use server';
    const shopItems = await getAllShopItemsByIds(itemIds);
    return shopItems;
  };

  return (
    <main className='py-8 pl-[20vw] flex-grow flex flex-col justify-start items-start'>
      <CartInterface 
        origin='normal'
        baseUrl={BASE_URL}
        findShopItemsForCart={findShopItemsForCart}
      />
    </main>
  );
};

export default CartPage;