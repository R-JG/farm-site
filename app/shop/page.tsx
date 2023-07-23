import ShopItemList from '@/components/ShopItemList';
import { prisma } from '@/prisma/database';

export const revalidate = 60;

const Shop = async () => {

  const allShopItems = await prisma.shopItem.findMany({ 
    include: { images: true } 
  });

  return (
    <main className='flex-grow flex flex-col justify-start items-center'>
      <ShopItemList allShopItems={allShopItems} />
    </main>
  );
};

export default Shop;