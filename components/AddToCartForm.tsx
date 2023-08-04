'use client';

import { useState, useEffect, MouseEvent } from 'react';
import { CartItem, ShopItemPrice } from '@/utils/types';
import { parseCartItemArray } from '@/utils/validation';

type Props = {
  shopItemPrice: ShopItemPrice
};

const AddToCartForm = ({ shopItemPrice }: Props) => {

  const [quantityInputValue, setQuantityInputValue] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const indexOfItemInCart = cartItems.findIndex(item => (item.priceId === shopItemPrice.id));

  const handleQuantityButton = (e: MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.name === '+') {
      const newQuantity = quantityInputValue + 1;
      if (shopItemPrice.inventory !== null) {
        if (indexOfItemInCart === -1) {
          if (newQuantity > shopItemPrice.inventory) return;
        } else if ((cartItems[indexOfItemInCart].quantity + newQuantity) > shopItemPrice.inventory) {
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
    if ((shopItemPrice.inventory === 0) || ((shopItemPrice.inventory !== null) && (indexOfItemInCart !== -1)
    && ((cartItems[indexOfItemInCart].quantity + quantityInputValue) > shopItemPrice.inventory))) return;
    let updatedCart: CartItem[] = [...cartItems];
    if (indexOfItemInCart === -1) {
      const newCartItem: CartItem = { 
        priceId: shopItemPrice.id, 
        shopItemId: shopItemPrice.shopItemId, 
        quantity: quantityInputValue 
      };
      updatedCart.push(newCartItem);
    } else {
      updatedCart[indexOfItemInCart].quantity += quantityInputValue;
    };
    const updatedIndexOfItemInCart = (
      (indexOfItemInCart === -1) ? (updatedCart.length - 1) : indexOfItemInCart
    );
    if ((shopItemPrice.inventory !== null) && (updatedCart[updatedIndexOfItemInCart].quantity >= shopItemPrice.inventory)) {
      setQuantityInputValue(0);
    } else {
      setQuantityInputValue(1);
    };
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  useEffect(() => {
    const cartStorage = localStorage.getItem('cart');
    if (!cartStorage) return;
    let newCartState: CartItem[] = [];
    newCartState.push(...parseCartItemArray(JSON.parse(cartStorage)));
    const indexOfPriceInCartStorage = newCartState.findIndex(item => (item.priceId === shopItemPrice.id));
    if ((indexOfPriceInCartStorage !== -1) && (shopItemPrice.inventory !== null) && 
    (newCartState[indexOfPriceInCartStorage].quantity >= shopItemPrice.inventory)) {
      newCartState[indexOfPriceInCartStorage].quantity = shopItemPrice.inventory;
      localStorage.setItem('cart', JSON.stringify(newCartState));
      setQuantityInputValue(0);
    };
    setCartItems(newCartState);
  }, [shopItemPrice]);

  return (
    <div className='w-fit mx-2 flex flex-row justify-end items-center'>
      <div className='h-[2rem] flex flex-col justify-start items-center'>
        <div className='h-[2rem] mx-2 bg-blue-50 bg-opacity-50 rounded-md flex flex-row justify-center items-center'>
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
        {(shopItemPrice.inventory !== null) && (((shopItemPrice.inventory <= 5) && (shopItemPrice.inventory > 0)) || 
        ((indexOfItemInCart !== -1) && 
        ((cartItems[indexOfItemInCart].quantity + quantityInputValue) >= shopItemPrice.inventory)) || 
        (quantityInputValue === shopItemPrice.inventory)) &&
        <span className='mt-2 text-blue-900 opacity-60'>
          {shopItemPrice.inventory} in stock
        </span>}
      </div>
      <div className='h-[2.5rem] flex flex-col justify-start items-center'>
        <button 
          onClick={handleAddToCartButton}
          className='h-[2.5rem] p-2 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Add To Cart
        </button>
        {(indexOfItemInCart !== -1) && (cartItems[indexOfItemInCart].quantity > 0) && 
        <span className='block text-blue-900 py-1 px-2 mx-3 opacity-60'>
          {cartItems[indexOfItemInCart].quantity} in cart
        </span>}
      </div>
    </div>
  );
};

export default AddToCartForm;