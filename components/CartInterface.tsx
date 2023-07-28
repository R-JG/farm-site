'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShopItem, CartItem } from '@/utils/types';
import { parseCartItemArray } from '@/utils/validation';
import ContentImage from './ContentImage';

type Props = {
  origin: 'normal' | 'checkout-success',
  baseUrl: string,
  findShopItemsForCart: (itemIds: string[]) => Promise<ShopItem[]>
};

const CartInterface = ({ origin, baseUrl, findShopItemsForCart }: Props) => {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shopItemsInCart, setShopItemsInCart] = useState<(ShopItem & { quantity: number })[]>([]);

  const router = useRouter();

  const getCartTotal = (): number => {
    let total = 0;
    for (const shopItem of shopItemsInCart) {
      total += (shopItem.price * shopItem.quantity);
    };
    return total;
  };

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
        const cartStorageItems = parseCartItemArray(JSON.parse(cartStorage));
        findShopItemsForCart(cartStorageItems.map(item => item.shopItemId))
        .then(shopItemsInDb => {
          let updatedCartItems: CartItem[] = [];
          let shopItemDataForCart: (ShopItem & { quantity: number })[] = [];
          cartStorageItems.forEach(cartItem => {
            const itemInDb = shopItemsInDb.find(shopItem => (shopItem.id === cartItem.shopItemId));
            if (itemInDb) {
              updatedCartItems.push(cartItem);
              shopItemDataForCart.push({ ...itemInDb, quantity: cartItem.quantity })
            };
          });
          localStorage.setItem('cart', JSON.stringify(updatedCartItems));
          setCartItems(updatedCartItems);
          setShopItemsInCart(shopItemDataForCart);
        });
      };
    };
    if (origin === 'checkout-success') {
      localStorage.removeItem('cart');
    };
  }, [origin, findShopItemsForCart]);

  return (
    <div>
      <h1 className='text-2xl font-medium'>
        Cart:
      </h1>
      {shopItemsInCart.map(shopItem => 
      <div
        key={shopItem.id}
        className='my-6 flex flex-row justify-start items-center'
      >
        <div className='relative w-[10vw] aspect-square'>
          <ContentImage 
            src={shopItem.images[0].id}
            alt=''
            fill={true}
            sizes='(max-width: 640px) 20vw,10vw'
            className='object-cover rounded-md shadow'
          />
        </div>
        <div className='m-4 flex flex-col justify-center items-start'>
          <span className='my-2 text-lg font-medium'>
            {shopItem.name}
          </span>
          <span>
            Quantity: {shopItem.quantity}
          </span>
          <span>
            {`$${shopItem.price * shopItem.quantity}`}
            {(shopItem.quantity > 1) ? `($${shopItem.price} each)` : ''}
          </span>
        </div>
      </div>)}
      {(cartItems.length > 0) &&
      <div>
        <span>Total: ${getCartTotal()}</span>
        <button
          onClick={handleCheckoutButton}
          className='p-2 m-6 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Purchase
        </button>
      </div>}
      {(cartItems.length === 0) && 
      <h1>Cart is currently empty</h1>}
    </div>
  );
};

export default CartInterface;