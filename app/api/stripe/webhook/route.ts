import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/utils/stripe';
import { decrementShopItemInventoryById } from '@/lib/database';
import { STRIPE_WEBHOOK_SECRET } from '@/utils/config';

export const POST = async (request: NextRequest): Promise<Response> => {
  try {
    const webhookSignature = request.headers.get('stripe-signature');

    console.log('SIGNATURE ---> ', webhookSignature);

    if (!webhookSignature) {
      return new NextResponse('signature is missing', { status: 401 });
    };
    const payload = await request.text();
    const event = stripe.webhooks.constructEvent(payload, webhookSignature, STRIPE_WEBHOOK_SECRET);

    // const event = await request.json();
    console.log('EVENTOBJECT ---> ', event.data.object);
    
    if (event.type === 'checkout.session.completed') {
      const checkoutSessionCompleted = event.data.object as any;
      const expandedSession = await stripe.checkout.sessions.retrieve(
        checkoutSessionCompleted.id, { expand: ['line_items'] }
      );
      if (expandedSession.line_items) {
        const inventoryUpdates = await Promise.all(expandedSession.line_items.data.map(async lineItem => {
          if (!lineItem.quantity || !lineItem.price || 
          (typeof lineItem.price.product !== 'string')) return;
          return decrementShopItemInventoryById(lineItem.price.product, lineItem.quantity);
        }));
        console.log('The following inventory updates have been applied: ', inventoryUpdates);
      };
    };
    return new NextResponse('', { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('', { status: 500 });
  };
};