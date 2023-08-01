import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest): Promise<Response> => {
  try {
    const event = await request.json();
    
    console.log ('PARSEDEVENT', event);

    if (event.type === 'checkout.session.completed') {
      console.log('WEBHOOK event is the correct type...');
      const checkoutSessionCompleted = event.data.object;
      console.log('SESSION', checkoutSessionCompleted);
      console.log('LINEITEMS', checkoutSessionCompleted.line_items)
    };

    return new NextResponse('', { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('', { status: 500 });
  };
};