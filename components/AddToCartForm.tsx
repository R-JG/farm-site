'use client';

import { useState, useEffect, MouseEvent } from 'react';
import { CartItem } from '@/utils/types';
import { parseCartItemArray } from '@/utils/validation';

type Props = {
  itemId: string,
  itemInventory: number | null
};

const AddToCartForm = ({ itemId, itemInventory }: Props) => {

  const [quantityInputValue, setQuantityInputValue] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const indexOfCurrentItemInCart = cartItems.findIndex(item => (item.shopItemId === itemId));

  const handleQuantityButton = (e: MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.name === '+') {
      const newQuantity = quantityInputValue + 1;
      if (itemInventory !== null) {
        if (indexOfCurrentItemInCart === -1) {
          if (newQuantity > itemInventory) return;
        } else if ((cartItems[indexOfCurrentItemInCart].quantity + newQuantity) > itemInventory) {
          return;
        };
      };
      setQuantityInputValue(newQuantity)
    };
    if ((e.currentTarget.name === '-') && (quantityInputValue > 1)) {
      setQuantityInputValue(quantityInputValue - 1);
    };
  };

  const handleAddToCartButton = (): void => {
    if ((itemInventory === 0) || (itemInventory !== null) && (indexOfCurrentItemInCart !== -1)
    && ((cartItems[indexOfCurrentItemInCart].quantity + quantityInputValue) > itemInventory)) return;
    let updatedCart: CartItem[] = [...cartItems];
    if (indexOfCurrentItemInCart === -1) {
      const newCartItem: CartItem = { shopItemId: itemId, quantity: quantityInputValue };
      updatedCart.push(newCartItem);
    } else {
      updatedCart[indexOfCurrentItemInCart].quantity += quantityInputValue;
    };
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  useEffect(() => {
    const cartStorage = localStorage.getItem('cart');
    const storageCartItems: CartItem[] = ((cartStorage) 
      ? parseCartItemArray(JSON.parse(cartStorage)) : []
    );
    setCartItems(storageCartItems);
  }, []);

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
          {quantityInputValue}
        </span>
        <button
          name='+'
          onClick={handleQuantityButton}
          className='px-3 py-1 bg-blue-100 bg-opacity-50 rounded-md hover:bg-blue-200 transition-colors'
        >
          +
        </button>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <button 
          onClick={handleAddToCartButton}
          className='p-2 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Add To Cart
        </button>
        {(indexOfCurrentItemInCart !== -1) && (cartItems[indexOfCurrentItemInCart].quantity > 0) && 
        <span className='block text-blue-900 py-1 px-2 mx-3 opacity-60'>
          {cartItems[indexOfCurrentItemInCart].quantity} in cart
        </span>}
      </div>
    </div>
  );
};

export default AddToCartForm;