import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    console.log('Creating payment intent for amount:', amount);

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        // Add any metadata you want to track
        source: 'portfolio_project',
      },
    });

    console.log('Payment intent created:', paymentIntent.id); // Debug log

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Stripe Error:', error);
    return NextResponse.json(
      {
        error: `Payment processing error: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      },
      { status: 500 },
    );
  }
}
