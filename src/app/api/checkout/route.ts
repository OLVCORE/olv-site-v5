import { NextRequest } from 'next/server';
import { stripe } from '../../../lib/stripe';
import { SITE_URL } from '../../../lib/siteConfig';

export async function POST(req: NextRequest) {
  try {
    const { priceId, simulator } = await req.json();
    if (!priceId || !simulator) {
      return new Response('Missing parameters', { status: 400 });
    }

    // Recover price info to capture lookup_key (credits mapping)
    const price = await stripe.prices.retrieve(priceId as string);
    const lookup_key = (price.lookup_key ?? '') as string;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${SITE_URL}/simuladores/${simulator}?success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/simuladores/${simulator}?canceled=1`,
      metadata: {
        simulator,
        lookup_key,
      },
    });

    return Response.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return new Response('Server Error', { status: 500 });
  }
} 