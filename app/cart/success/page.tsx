import { BASE_URL } from '@/utils/config';
import CartInterface from '@/components/CartInterface';

const CheckoutSuccessPage = () => {
  return (
    <main>
      <h1>Success!</h1>
      <CartInterface 
      origin='checkout-success'
        baseUrl={BASE_URL}
      />
    </main>
  );
};

export default CheckoutSuccessPage;