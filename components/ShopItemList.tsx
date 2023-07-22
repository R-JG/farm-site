import { prisma } from '@/prisma/database';
import ShopItemPreview from './ShopItemPreview';

const ShopItemList = async () => {

  const allShopItems = await prisma.shopItem.findMany({ 
    include: { images: true } 
  });

  return (
    <div className='w-fit p-12 grid grid-cols-4 place-content-center'>
      {allShopItems.map((item: any) => 
      <ShopItemPreview 
        key={item.id}
        itemData={item}
      />)}
    </div>
  );
};

export default ShopItemList;