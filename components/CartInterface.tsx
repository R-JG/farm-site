'use client';

import { useRouter } from 'next/navigation';
import { CartItem } from '@/utils/types';

type Props = {
  baseUrl: string
};

const CartInterface = ({ baseUrl }: Props) => {

  const router = useRouter();

  const test = async () => {
    try {
      const testCartItems: CartItem[] = [
        { shopItemId: 'clkjcdn2n0000ijldbz2m10bd', quantity: 4 }
      ];
      const response = await fetch(`${baseUrl}/api/checkout-session`, { 
        method: 'POST', 
        body: JSON.stringify(testCartItems)
      });
      const redirectUrl = await response.text();
      router.push(redirectUrl);
    } catch (error) {
      console.error(error);
    };
  };

  return (
    <div>
      <button onClick={test}>TEST</button>
    </div>
  );
};

export default CartInterface;