import { getAllShopItemIds, getShopItemById } from '@/lib/database';
import ContentImage from '@/components/ContentImage';
import ThumbnailGallery from '@/components/ThumbnailGallery';
import AddToCartForm from '@/components/AddToCartForm';

type Props = {
  params: { itemId: string }
};

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
        <div className='w-full mb-8 flex flex-row justify-between items-center'>
          <span>
            {`$${itemData.price.toFixed(2)}`}
          </span>
          {(itemData.inventory === 0) 
          ? <span className='p-2 bg-blue-200 rounded'>
            Out of stock
          </span>
          : <AddToCartForm 
            itemId={itemData.id} 
            itemInventory={itemData.inventory}
          />}
        </div>
        <p className='whitespace-pre-line max-w-lg'>
          {itemData.description}
        </p>
      </div>
    </main>
  );
};

export default ShopItemPage;