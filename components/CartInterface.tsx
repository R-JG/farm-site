'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem } from '@/utils/types';
import { parseCartItemArray } from '@/utils/validation';

type Props = {
  origin: 'normal' | 'checkout-success',
  baseUrl: string
};

const CartInterface = ({ origin, baseUrl }: Props) => {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const router = useRouter();

  const handleCheckoutButton = async (): Promise<void> => {
    try {
      const response = await fetch(`${baseUrl}/api/checkout-session`, { 
        method: 'POST', 
        body: JSON.stringify(cartItems)
      });
      const redirectUrl = await response.text();
      router.push(redirectUrl);
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    if (origin === 'normal') {
      const cartStorage = localStorage.getItem('cart');
      if (cartStorage) {
        setCartItems(parseCartItemArray(JSON.parse(cartStorage)));
      };
    };
    if (origin === 'checkout-success') {
      localStorage.removeItem('cart');
    };
  }, [origin]);

  return (
    <div>
      {cartItems.map(item => 
      <div
        key={item.shopItemId}
      >
        <span className=' text-red-400 m-4'>{item.shopItemId}</span>
        <span>{item.quantity}</span>
      </div>)}
      {(cartItems.length > 0) &&
      <button
        onClick={handleCheckoutButton}
        className='p-2 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
      >
        Purchase
      </button>}
      {(cartItems.length === 0) && 
      <h1>Cart is currently empty</h1>}
    </div>
  );
};

export default CartInterface;