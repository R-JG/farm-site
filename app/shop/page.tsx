import ShopItemList from '@/components/ShopItemList';
import { getAllShopItems } from '@/lib/database';

export const revalidate = 0;

const Shop = async () => {

  const allShopItems = await getAllShopItems();

  return (
    <main className='flex-grow flex flex-col justify-start items-center'>
      <ShopItemList allShopItems={allShopItems} />
    </main>
  );
};

export default Shop;