import Image from 'next/image';
import { BASE_URL } from '@/utils/config';
import { getAllShopItemsByIds } from '@/lib/database';
import { ShopItem } from '@/utils/types';
import CartInterface from '@/components/CartInterface';
import graphic from '@/public/graphic--flowers.png';

const CheckoutSuccessPage = () => {

  const findShopItemsForCart = async (itemIds: string[]): Promise<ShopItem[]> => {
    'use server';
    const shopItems = await getAllShopItemsByIds(itemIds);
    return shopItems;
  };

  return (
    <main className='flex-grow p-8 flex flex-col justify-start items-center'>
      <h1 className='text-xl font-medium mt-10 mb-6'>
        Thank you for ordering from Coyote Song Farm & Forest!
      </h1>
      <p>
        Please check your email for a receipt.
      </p>
      <Image 
        src={graphic}
        alt=''
        sizes='(max-width: 640px) 30vw, 45vw'
        className='relative -z-10 bottom-10 w-[45vw] opacity-70'
      />
      <CartInterface 
        origin='checkout-success'
        baseUrl={BASE_URL}
        findShopItemsForCart={findShopItemsForCart}
      />
    </main>
  );
};

export default CheckoutSuccessPage;