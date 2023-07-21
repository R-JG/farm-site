import Link from 'next/link';
import { ShopItem } from '@/utils/types';
import ContentImage from './ContentImage';

type Props = {
  itemData: ShopItem & { images: { id: string, shopItemId: number }[] }, 
};

const ShopItemPreview = ({ itemData }: Props) => {
  return (
    <div className='h-fit w-fit mb-6 mx-6'>
      <Link 
        href={`/shop/${itemData.id}`}
        className='w-fit p-4 flex flex-col justify-start items-start hover:scale-105 transition-all'
      >
        <div className='w-52 aspect-square relative'>
          {(itemData.images.length > 0) &&
          <ContentImage
            src={itemData.images[0].id} 
            alt=''
            fill={true}
            sizes='(max-width: 640px) 40vw,20vw'
            className='object-cover rounded-md shadow'
          />}
        </div>
        <h1 className='w-52 my-2 font-medium'>{itemData.name}</h1>
        <p>{`$${itemData.price}`}</p>
      </Link>
    </div>
  );
};

export default ShopItemPreview;