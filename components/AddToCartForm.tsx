'use client';

import { useState, MouseEvent } from 'react';
import { CartItem } from '@/utils/types';
import { parseCartItemArray } from '@/utils/validation';

type Props = {
  itemId: string
};

const AddToCartForm = ({ itemId }: Props) => {

  const [itemQuantity, setItemQuantity] = useState(1);
  const [cartHasBeenUpdated, setCartHasBeenUpdated] = useState(false);

  const handleQuantityButton = (e: MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.name === '+') setItemQuantity(itemQuantity + 1);
    if ((e.currentTarget.name === '-') && (itemQuantity > 1)) setItemQuantity(itemQuantity - 1);
  };

  const handleAddToCartButton = (): void => {
    const cartStorage = localStorage.getItem('cart');
    let updatedCart: CartItem[] = [];
    if (cartStorage) {
      const cartStorageItems = parseCartItemArray(JSON.parse(cartStorage));
      updatedCart.push(...cartStorageItems);
    };
    let selectedItemCartIndex: number | null = null;
    for (let i = 0; i < updatedCart.length; i++) {
      if (updatedCart[i].shopItemId === itemId) selectedItemCartIndex = i;
    };
    if (selectedItemCartIndex === null) {
      const newCartItem: CartItem = { shopItemId: itemId, quantity: itemQuantity };
      updatedCart.push(newCartItem);
    } else {
      updatedCart[selectedItemCartIndex].quantity += itemQuantity;
    };
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartHasBeenUpdated(true);
  };

  return (
    <div className='w-fit mx-2 flex flex-row justify-end items-center'>
      <div className='h-min mx-2 bg-blue-50 bg-opacity-50 rounded-md flex flex-row justify-center items-center'>
        <button
          name='-'
          onClick={handleQuantityButton}
          className='px-3 py-1 bg-blue-100 bg-opacity-50 rounded-md hover:bg-blue-200 transition-colors'
        >
          -
        </button>
        <span className='py-1 px-3'>
          {itemQuantity}
        </span>
        <button
          name='+'
          onClick={handleQuantityButton}
          className='px-3 py-1 bg-blue-100 bg-opacity-50 rounded-md hover:bg-blue-200 transition-colors'
        >
          +
        </button>
      </div>
      <button 
        onClick={handleAddToCartButton}
        className='p-2 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
      >
        Add To Cart
      </button>
      {cartHasBeenUpdated && 
      <div className=' text-blue-900 text-sm py-1 px-2 mx-3 rounded-lg bg-blue-200 opacity-60'>
        Added to cart
      </div>}
    </div>
  );
};

export default AddToCartForm;