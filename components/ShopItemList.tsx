import { prisma } from '@/prisma/database';
import ShopItemPreview from './ShopItemPreview';

const ShopItemList = async () => {

  const getAllShopItems = async () => await prisma.shopItem.findMany({
    orderBy: { createdAt: 'desc' } 
  });

  const allShopItems = await getAllShopItems();

  return (
    <div className='w-fit p-12 grid grid-cols-4 place-content-center'>
      {allShopItems.map(item => 
      <ShopItemPreview 
        key={item.id}
        itemData={item}
      />)}
    </div>
  );
};

export default ShopItemList;