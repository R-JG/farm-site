import Image from 'next/image';
import Link from 'next/link';
import { ShopItem } from '@/utils/types';

type Props = {
  itemData: ShopItem, 

};

const ShopItemPreview = ({ itemData }: Props) => {
  return (
    <div className=''>
      <Link 
        href={`/shop/${itemData.id}`}
        className='w-fit p-4 mb-8 mx-14 flex flex-col justify-start items-start hover:scale-105 transition-all'
      >
        <div className='w-52 aspect-square relative'>
          {(itemData.images.length > 0) &&
          <Image
            src={itemData.images[0]} 
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