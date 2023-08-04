import Stripe from 'stripe';
import stripe from '@/utils/stripe';
import { NextRequest, NextResponse } from 'next/server';
import { getAllShopItemsByIds } from '@/lib/database';
import { parseCartItemArray } from '@/utils/validation';
import { BASE_URL } from '@/utils/config';

export const POST = async (request: NextRequest): Promise<Response> => {
  try {
    const requestBody = await request.json();
    const cartItems = parseCartItemArray(requestBody);
    if (cartItems.length <= 0) {
      return new NextResponse('Missing or incorrect cart data', { status: 400 });
    };
    const dbItems = await getAllShopItemsByIds(cartItems.map(item => item.shopItemId));
    const allCartItemsExist = cartItems.every(cartItem => 
      dbItems.some(dbItem => (dbItem.id === cartItem.shopItemId))
    );
    if (!allCartItemsExist) {
      return new NextResponse('Some cart items do not exist', { status: 500 });
    };
    /*
    let line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    await Promise.all(dbItems.map(async dbItem => {
      const stripeProduct = await stripe.products.retrieve(dbItem.id);
      if (!stripeProduct.default_price) throw new Error(`Price is not defined for item id: ${dbItem.id}`);
      const price = ((typeof stripeProduct.default_price !== 'string') 
        ? stripeProduct.default_price.id : stripeProduct.default_price
      );
      const quantity = cartItems.find(cartItem => (cartItem.shopItemId === dbItem.id))?.quantity ?? 1;
      line_items.push({ price, quantity });
    }));
    */
    const line_items = cartItems.map(cartItem => ({ price: cartItem.priceId, quantity: cartItem.quantity }));
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${BASE_URL}/cart/success`,
      cancel_url: `${BASE_URL}/cart`
    });
    if (!session.url) {
      return new NextResponse('Error in creating a checkout session', { status: 500 });
    };
    return new NextResponse(session.url, { status: 303 });
  } catch (error) {
    console.error(error);
    return new NextResponse('', { status: 500 });
  };
};