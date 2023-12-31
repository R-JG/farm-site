'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShopItem, ShopItemPrice, CartItem } from '@/utils/types';
import { parseCartItemArray } from '@/utils/validation';
import ContentImage from './ContentImage';

type CartItemData = ShopItemPrice & { name: string, featuredImageId: string, quantity: number };

type Props = {
  origin: 'normal' | 'checkout-success',
  baseUrl: string,
  findShopItemsForCart: (itemIds: string[]) => Promise<ShopItem[]>
};

const CartInterface = ({ origin, baseUrl, findShopItemsForCart }: Props) => {

  const [cartHasLoaded, setCartHasLoaded] = useState(false);
  const [orderIsProcessing, setOrderIsProcessing] = useState(false);
  const [cartItemData, setCartItemData] = useState<CartItemData[]>([]);

  const router = useRouter();

  const getCartTotal = (): string => {
    let total = 0;
    for (const cartItem of cartItemData) {
      total += (cartItem.amount * cartItem.quantity);
    };
    return total.toFixed(2);
  };

  const handleCheckoutButton = async (): Promise<void> => {
    if (orderIsProcessing) return;
    setOrderIsProcessing(true);
    try {
      const checkoutData: CartItem[] = cartItemData.map(item => ({ 
        priceId: item.id,
        shopItemId: item.shopItemId, 
        quantity: item.quantity 
      }));
      const response = await fetch(`${baseUrl}/api/stripe/checkout-session`, { 
        method: 'POST', 
        body: JSON.stringify(checkoutData)
      });
      const redirectUrl = await response.text();
      router.push(redirectUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setOrderIsProcessing(false);
    };
  };

  const handleQuantityButton = (priceId: string, operation: '+' | '-'): void => {
    const cartItemIndex = cartItemData.findIndex(item => (item.id === priceId));
    const cartItem = cartItemData[cartItemIndex];
    let updatedCartItems: CartItemData[] = [...cartItemData];
    if (operation === '+') {
      if ((cartItem.inventory !== null) && ((cartItem.quantity + 1) > cartItem.inventory)) {
        return;
      };
      updatedCartItems[cartItemIndex].quantity++;
    };
    if (operation === '-') {
      if (cartItem.quantity <= 1) {
        updatedCartItems.splice(cartItemIndex, 1);
      } else {
        updatedCartItems[cartItemIndex].quantity--;
      };
    };
    const updatedCartStorage: CartItem[] = updatedCartItems.map(item => ({ 
      priceId: item.id, 
      shopItemId: item.shopItemId, 
      quantity: item.quantity 
    }));
    localStorage.setItem('cart', JSON.stringify(updatedCartStorage));
    setCartItemData(updatedCartItems);
  };

  useEffect(() => {
    if (origin === 'normal') {
      const cartStorage = localStorage.getItem('cart');
      if (cartStorage !== null) {
        const cartStorageItems = parseCartItemArray(JSON.parse(cartStorage));
        findShopItemsForCart(cartStorageItems.map(item => item.shopItemId))
        .then(shopItemsInDb => {
          let updatedCartItems: CartItem[] = [];
          let cartStateData: CartItemData[] = [];
          cartStorageItems.forEach(cartItem => {
            if (cartItem.quantity > 0) {
              const shopItemInDb = shopItemsInDb.find(shopItem => (shopItem.id === cartItem.shopItemId));
              if (shopItemInDb) {
                const priceInDb = shopItemInDb.price.find(price => (price.id === cartItem.priceId));
                if (priceInDb) {
                  if ((priceInDb.inventory !== null) && (cartItem.quantity > priceInDb.inventory)) {
                    cartItem.quantity = priceInDb.inventory;
                  };
                  updatedCartItems.push(cartItem);
                  cartStateData.push({ 
                    ...priceInDb, 
                    name: shopItemInDb.name, 
                    featuredImageId: shopItemInDb.images[0].id,
                    quantity: cartItem.quantity
                  });
                };
              };
            };
          });
          localStorage.setItem('cart', JSON.stringify(updatedCartItems));
          setCartItemData(cartStateData);
          setCartHasLoaded(true);
        });
      } else {
        setCartHasLoaded(true);
      };
    };
    if (origin === 'checkout-success') {
      localStorage.removeItem('cart');
      setCartHasLoaded(true);
    };
  }, [origin, findShopItemsForCart]);

  if (origin === 'checkout-success') return (<div></div>);

  return (
    <div className={`w-[90vw] sm:w-fit sm:h-full p-6 sm:p-9 rounded-2xl flex flex-col justify-start items-center sm:items-start ${(cartHasLoaded && (cartItemData.length > 0)) && ' border-2 border-black '}`}>
      {cartItemData.map(cartItem => 
      <div
        key={cartItem.id}
        className='my-3 sm:my-2 flex flex-col sm:flex-row justify-start items-center'
      >
        <div className='relative w-[50vw] sm:w-[10vw] aspect-square'>
          <ContentImage 
            src={cartItem.featuredImageId}
            alt=''
            fill={true}
            sizes='(max-width: 640px) 50vw,10vw'
            className='object-cover rounded-md shadow'
          />
        </div>
        <div className='m-4 flex flex-col justify-center items-start'>
          <span className='my-2 text-lg font-medium'>
            {cartItem.name}
          </span>
          <span className='text-sm opacity-70'>
              {`$${cartItem.amount.toFixed(2)} each`}
          </span>
          <div className='py-2 flex flex-row justify-start items-center'>
            <span>Quantity:</span>
            <div className='h-[2rem] flex flex-col justify-start items-center'>
              <div className='h-[2rem] mx-2 bg-blue-50 bg-opacity-50 rounded-md flex flex-row justify-center items-center'>
                <button
                  name='-'
                  onClick={() => handleQuantityButton(cartItem.id, '-')}
                  className='px-3 py-1 bg-blue-100 bg-opacity-50 rounded-md hover:bg-blue-200 transition-colors'
                >
                  -
                </button>
                <span className='py-1 px-3'>
                  {cartItem.quantity}
                </span>
                <button
                  name='+'
                  onClick={() => handleQuantityButton(cartItem.id, '+')}
                  className='px-3 py-1 bg-blue-100 bg-opacity-50 rounded-md hover:bg-blue-200 transition-colors'
                >
                  +
                </button>
              </div>
              {(cartItem.quantity === cartItem.inventory) && 
              <span className='text-sm text-blue-900 opacity-50'>
                {cartItem.inventory} in stock
              </span>}
            </div>
            <span>
              {`$${(cartItem.amount * cartItem.quantity).toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>)}
      {cartHasLoaded && (cartItemData.length > 0) &&
      <div className=' self-end mr-4 flex flex-col justify-start items-end'>
        <div className='my-4 flex flex-row justify-start items-center'>
          <span className='mx-4'>
            Total: ${getCartTotal()}
          </span>
          <button
            onClick={handleCheckoutButton}
            className='p-2 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
          >
            {(orderIsProcessing) ? 'Loading...' : 'Purchase'}
          </button>
        </div>
        <span className='text-xs opacity-50'>
          *Taxes are not included in the total.
        </span>
        <span className='text-xs opacity-50'>
          *All prices are in Canadian dollars.
        </span>
      </div>}
      {cartHasLoaded && (cartItemData.length === 0) && 
      <div className='flex flex-col justify-start items-center'>
        <span className='my-4'>
          Your cart is currently empty
        </span>
        <Link
          href='/shop'
          className='p-2 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
        >
          Go to shop
        </Link>
      </div>}
      {!cartHasLoaded && 
      <span className='my-10'>
        Loading cart...
      </span>}
    </div>
  );
};

export default CartInterface;