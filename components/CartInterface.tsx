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

  const [cartHasLoaded, setCartHasLoaded] = useState(false);
  const [orderIsProcessing, setOrderIsProcessing] = useState(false);
  const [shopItemsInCart, setShopItemsInCart] = useState<(ShopItem & { quantity: number })[]>([]);

  const router = useRouter();

  const getCartTotal = (): string => {
    let total = 0;
    for (const shopItem of shopItemsInCart) {
      total += (shopItem.price * shopItem.quantity);
    };
    return total.toFixed(2);
  };

  const handleCheckoutButton = async (): Promise<void> => {
    if (orderIsProcessing) return;
    setOrderIsProcessing(true);
    try {
      const cartItemData: CartItem[] = shopItemsInCart.map(item => (
        { shopItemId: item.id, quantity: item.quantity }
      ));
      const response = await fetch(`${baseUrl}/api/stripe/checkout-session`, { 
        method: 'POST', 
        body: JSON.stringify(cartItemData)
      });
      const redirectUrl = await response.text();
      router.push(redirectUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setOrderIsProcessing(false);
    };
  };

  const handleQuantityButton = (itemId: string, operation: '+' | '-'): void => {
    const targetItemIndex = shopItemsInCart.findIndex(item => (item.id === itemId));
    let updatedShopItems: (ShopItem & { quantity: number })[] = [...shopItemsInCart];
    if (operation === '+') {
      const itemInventory = shopItemsInCart[targetItemIndex].inventory;
      if ((itemInventory !== null) && ((updatedShopItems[targetItemIndex].quantity + 1) > itemInventory)) {
        return;
      };
      updatedShopItems[targetItemIndex].quantity++;
    };
    if (operation === '-') {
      if (updatedShopItems[targetItemIndex].quantity <= 1) {
        updatedShopItems.splice(targetItemIndex, 1);
      } else {
        updatedShopItems[targetItemIndex].quantity--;
      };
    };
    const updatedCartStorage: CartItem[] = updatedShopItems.map(item => (
      { shopItemId: item.id, quantity: item.quantity }
    ));
    localStorage.setItem('cart', JSON.stringify(updatedCartStorage));
    setShopItemsInCart(updatedShopItems);
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
            if (itemInDb && (itemInDb.inventory !== 0)) {
              if ((itemInDb.inventory !== null) && (cartItem.quantity > itemInDb.inventory)) {
                cartItem.quantity = itemInDb.inventory;
              };
              updatedCartItems.push(cartItem);
              shopItemDataForCart.push({ ...itemInDb, quantity: cartItem.quantity });
            };
          });
          localStorage.setItem('cart', JSON.stringify(updatedCartItems));
          setShopItemsInCart(shopItemDataForCart);
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
    <div className={`h-full p-9 rounded-2xl flex flex-col justify-start items-start ${(cartHasLoaded && (shopItemsInCart.length > 0)) && ' border-2 border-black '}`}>
      {shopItemsInCart.map(shopItem => 
      <div
        key={shopItem.id}
        className='my-2 flex flex-row justify-start items-center'
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
          <div className='py-2 flex flex-row justify-start items-center'>
            <span>Quantity:</span>
            <div className='h-min mx-2 bg-blue-50 bg-opacity-50 rounded-md flex flex-row justify-center items-center'>
              <button
                name='-'
                onClick={() => handleQuantityButton(shopItem.id, '-')}
                className='px-3 py-1 bg-blue-100 bg-opacity-50 rounded-md hover:bg-blue-200 transition-colors'
              >
                -
              </button>
              <span className='py-1 px-3'>
                {shopItem.quantity}
              </span>
              <button
                name='+'
                onClick={() => handleQuantityButton(shopItem.id, '+')}
                className='px-3 py-1 bg-blue-100 bg-opacity-50 rounded-md hover:bg-blue-200 transition-colors'
              >
                +
              </button>
            </div>
          </div>
          <span>
            <span>
              {`$${(shopItem.price * shopItem.quantity).toFixed(2)}`}
            </span>
            {(shopItem.quantity > 1) &&
            <span className='text-sm px-2 opacity-60'>
              {`($${shopItem.price.toFixed(2)} each)`}
            </span>}
          </span>
        </div>
      </div>)}
      {cartHasLoaded && (shopItemsInCart.length > 0) &&
      <div className='flex flex-col justify-start items-start'>
        <div className='my-4 flex flex-row justify-start items-center'>
          <span>
            Total: ${getCartTotal()}
          </span>
          <button
            onClick={handleCheckoutButton}
            className='p-2 mx-6 bg-blue-200 rounded active:bg-blue-300 hover:scale-105 transition-all'
          >
            {(orderIsProcessing) ? 'Loading...' : 'Purchase'}
          </button>
        </div>
        <span className='m-0 text-sm opacity-60'>
          *All prices are in Canadian dollars.
        </span>
      </div>}
      {cartHasLoaded && (shopItemsInCart.length === 0) && 
      <span className='my-10'>
        Your cart is currently empty
      </span>}
      {!cartHasLoaded && 
      <span className='my-10'>
        Loading cart...
      </span>}
    </div>
  );
};

export default CartInterface;