'use client';

import { useState } from 'react';
import { ShopItemPrice } from '@/utils/types';
import AddToCartForm from '@/components/AddToCartForm';

type Props = {
  itemPrices: ShopItemPrice[]
};

const ShopPriceInterface = ({ itemPrices }: Props) => {

  const firstPriceInStock = itemPrices.find(item => ((item.inventory === null) || (item.inventory > 0)));

  const [selectedPrice, setSelectedPrice] = useState<ShopItemPrice | undefined>(firstPriceInStock);

  if (!selectedPrice) return <div></div>;

  return (
    <div className='w-full mb-4 sm:mb-8 flex flex-col sm:flex-row justify-between items-center'>
      <div className='mb-6 sm:mb-0 flex flex-row justify-start items-center flex-wrap'>
        {(itemPrices.length === 1) &&
        <span>
          {`$${itemPrices[0].amount.toFixed(2)}`}
        </span>}
        {(itemPrices.length > 1) && itemPrices.map((price, index) => 
        <button
          key={price.id}
          onClick={() => setSelectedPrice(price)}
          style={(price.id === selectedPrice.id) ? { borderColor: '#bfdbfe' } : undefined}
          className='p-1 mr-1 rounded-xl border-[0.2rem] border-transparent transition-colors'
        >
          {`$${price.amount.toFixed(2)}`}
        </button>)}
      </div>
      <AddToCartForm 
        key={selectedPrice.id}
        shopItemPrice={selectedPrice} 
      />
    </div>
  );
};

export default ShopPriceInterface;