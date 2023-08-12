import Image from 'next/image';
import { BASE_URL } from '@/utils/config';
import { getAllShopItemsByIds } from '@/lib/database';
import { ShopItem } from '@/utils/types';
import CartInterface from '@/components/CartInterface';
import graphic from '@/public/graphic--produce-2.png';

const CartPage = async () => {

  const findShopItemsForCart = async (itemIds: string[]): Promise<ShopItem[]> => {
    'use server';
    const shopItems = await getAllShopItemsByIds(itemIds);
    return shopItems;
  };

  return (
    <main className='py-9 px-8 sm:px-16 flex-grow flex flex-col sm:flex-row justify-start items-center'>
      <div className='sm:w-[50%] sm:px-10 flex flex-col justify-start items-center'>
        <h1 className='text-2xl font-medium mb-3'>
          Cart:
        </h1>
        <CartInterface 
          origin='normal'
          baseUrl={BASE_URL}
          findShopItemsForCart={findShopItemsForCart}
        />
      </div>
      <div className='hidden sm:w-[50%] sm:flex flex-col justify-center items-center opacity-70'>
        <Image 
          src={graphic}
          alt=''
          sizes='(max-width: 640px) 30vw, 40vw'
          className='w-[40vw] aspect-square'
        />
      </div>
    </main>
  );
};

export default CartPage;