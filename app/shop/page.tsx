import ShopItemList from '@/components/ShopItemList';

export const revalidate = 60;

const Shop = async () => {
  return (
    <main className='flex-grow flex flex-col justify-start items-center'>
      <ShopItemList />
    </main>
  );
};

export default Shop;