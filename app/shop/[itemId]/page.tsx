import { getAllShopItemIds, getShopItemById } from '@/lib/database';
import ContentImage from '@/components/ContentImage';
import ThumbnailGallery from '@/components/ThumbnailGallery';
import ShopPriceInterface from '@/components/ShopPriceInterface';

type Props = {
  params: { itemId: string }
};

export const revalidate = 0;

export const generateStaticParams = async () => {
  const items = await getAllShopItemIds();
  return items.map(item => ({ itemId: item.id }))
};

const ShopItemPage = async ({ params }: Props) => {

  const itemData = await getShopItemById(params.itemId);

  if (!itemData) return <div></div>;

  return (
    <main className='w-full p-12 flex flex-row justify-evenly items-start'>
      {(itemData.images.length <= 1)
      ? <div className='relative w-[30vw] aspect-square'>
        <ContentImage 
          src={itemData.images[0].id} 
          alt=''
          fill={true}
          sizes='(max-width: 640px) 90vw, 40vw'
          className='object-cover rounded-md shadow-md'
        />
      </div>
      : <ThumbnailGallery 
        imageType='admin-content'
        images={itemData.images.map(image => image.id)}
      />}
      <div className='min-w-[30rem] p-4 mr-12 mt-16 flex flex-col justify-start items-start'>
        <h1 className='text-xl font-semibold mb-3'>
          {itemData.name}
        </h1>
        <div className='w-full self-end'>
          <ShopPriceInterface itemPrices={itemData.price} />
        </div>
        <p className='whitespace-pre-line max-w-lg mt-4'>
          {itemData.description}
        </p>
      </div>
    </main>
  );
};

export default ShopItemPage;