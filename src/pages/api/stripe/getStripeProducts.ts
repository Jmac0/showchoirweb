// Next.js API route support:
// https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from './stripeConfig';
import Stripe from 'stripe';
type Products = {
  price: Stripe.Price[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const product = await stripe.prices.list({ active: true });

  res.status(200).json(product);
}
