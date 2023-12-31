import { ShopItem } from '@/utils/types';
import ShopItemPreview from './ShopItemPreview';

type Props = {
  allShopItems: ShopItem[]
};

const ShopItemList = async ({ allShopItems }: Props) => {
  return (
    <div className='w-fit p-6 sm:p-12 flex flex-col sm:grid grid-cols-4 place-content-center'>
      {allShopItems.map((item: any) => 
      <ShopItemPreview 
        key={item.id}
        itemData={item}
      />)}
    </div>
  );
};

export default ShopItemList;