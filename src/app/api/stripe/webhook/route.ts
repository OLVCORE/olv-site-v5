import { NextRequest } from 'next/server';
import { stripe } from '../../../../lib/stripe';
import { supabase } from '../../../../lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') ?? '';

  // Read raw body as buffer
  const body = await req.arrayBuffer();
  let event: any;

  try {
    const textBody = Buffer.from(body).toString();
    event = stripe.webhooks.constructEvent(
      textBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;

    // Determine credits based on lookup_key passed via metadata
    const lookup = session.metadata?.lookup_key as string | undefined;
    const creditsMap: Record<string, number> = {
      credit_1: 1,
      credit_5: 5,
      credit_20: 20,
      credit_50: 50,
    };
    const credits_remaining = lookup ? creditsMap[lookup] ?? 0 : 0;

    // Generate token valid for 24h (or persist until credits zerados)
    const access_token = crypto.randomUUID();
    const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    await supabase.from('paid_sessions').insert({
      session_id: session.id,
      customer_email: session.customer_details?.email ?? null,
      simulator: session.metadata?.simulator ?? null,
      access_token,
      credits_remaining,
      expires_at,
    });
  }

  return new Response('Received', { status: 200 });
} 