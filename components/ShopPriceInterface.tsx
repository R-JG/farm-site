'use client';

import { useState } from 'react';
import { ShopItemPrice } from '@/utils/types';
import AddToCartForm from '@/components/AddToCartForm';

type Props = {
  pricesInStock: ShopItemPrice[]
};

const ShopPriceInterface = ({ pricesInStock }: Props) => {

  const [selectedPrice, setSelectedPrice] = useState<ShopItemPrice | undefined>(pricesInStock[0]);

  if (!selectedPrice) return <div></div>;

  return (
    <div className='w-full mb-8 flex flex-row justify-between items-center'>
      <div className='flex flex-row justify-start items-center flex-wrap'>
        {(pricesInStock.length === 1) &&
        <span>
          {`$${pricesInStock[0].amount.toFixed(2)}`}
        </span>}
        {(pricesInStock.length > 1) && pricesInStock.map((price, index) => 
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