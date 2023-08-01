import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/utils/stripe';

export const POST = async (request: NextRequest): Promise<Response> => {
  try {
    const event = await request.json();
    if (event.type === 'checkout.session.completed') {
      const checkoutSessionCompleted = event.data.object;
      if (typeof checkoutSessionCompleted.id !== 'string') {
        return new NextResponse('', { status: 400 });
      };
      const expandedSession = await stripe.checkout.sessions.retrieve(
        checkoutSessionCompleted.id, { expand: ['line_items'] }
      );
      console.log('LINEITEMS --> ', expandedSession.line_items);
    };

    return new NextResponse('', { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('', { status: 500 });
  };
};