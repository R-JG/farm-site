import { prisma } from '@/prisma/database';
import ContentImage from '@/components/ContentImage';

type Props = {
  params: { itemId: string }
};

export const generateStaticParams = async () => {
  const items = await prisma.shopItem.findMany();
  return items.map(item => ({ itemId: String(item.id) }))
};

const ShopItemPage = async ({ params }: Props) => {

  const itemData = await prisma.shopItem.findFirst({ 
    where: { id: Number(params.itemId) }, 
    include: { images: true } 
  });

  if (!itemData) return <div></div>;

  return (
    <main className='p-12 flex flex-row justify-center items-start'>
      <div className='w-[30vw] aspect-square relative'>
        <ContentImage 
          src={itemData.images[0].id} 
          alt=''
          fill={true}
          sizes='(max-width: 640px) 90vw, 40vw'
          className='object-cover rounded-md shadow-md'
        />
      </div>
      <div className='max-w-lg mx-16'>
        <h1 className=' text-xl font-semibold mb-3'>
          {itemData.name}
        </h1>
        <div className='w-full mb-8 flex flex-row justify-between items-center'>
          <span>{`$${itemData.price}`}</span>
          <button className='p-2 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'>
            Add to cart
          </button>
        </div>
        <p className='whitespace-pre-line'>
          {itemData.description}
        </p>
      </div>
    </main>
  );
};

export default ShopItemPage;