import Stripe from 'stripe';
declare const process: { env: Record<string, string | undefined> };

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
  typescript: true,
});  