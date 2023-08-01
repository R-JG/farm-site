import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/utils/stripe';
import { prisma } from '@/prisma/database';

export const POST = async (request: NextRequest): Promise<Response> => {
  try {
    const event = await request.json();
    if (event.type === 'checkout.session.completed') {
      const checkoutSessionCompleted = event.data.object;
      const expandedSession = await stripe.checkout.sessions.retrieve(
        checkoutSessionCompleted.id, { expand: ['line_items'] }
      );
      if (expandedSession.line_items) {
        const inventoryUpdates = await Promise.all(expandedSession.line_items.data.map(async lineItem => {
          if (!lineItem.quantity || !lineItem.price || 
          (typeof lineItem.price.product !== 'string')) return;

          console.log('PRODUCT ID --> ', lineItem.price.product);
          console.log('PRODUCT QUANTITY --> ', lineItem.quantity);

          return prisma.shopItem.update({ 
            where: { id: lineItem.price.product }, 
            data: { inventory: { decrement: lineItem.quantity } } });
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