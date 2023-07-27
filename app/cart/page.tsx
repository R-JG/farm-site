import { BASE_URL } from '@/utils/config';
import CartInterface from '@/components/CartInterface';

const CartPage = async () => {
  return (
    <main>
      <CartInterface 
        origin='normal'
        baseUrl={BASE_URL}
      />
    </main>
  );
};

export default CartPage;