import Link from 'next/link';
import { ShopItem } from '@/utils/types';
import ContentImage from './ContentImage';

type Props = {
  itemData: ShopItem, 
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
        <div className='flex flex-row'>
          <p>{`$${itemData.price.toFixed(2)}`}</p>
          {(itemData.inventory === 0) && 
          <span className='text-sm py-1 px-2 mx-4 bg-blue-200 rounded-md'>
            Out of stock
          </span>}
        </div>
      </Link>
    </div>
  );
};

export default ShopItemPreview;