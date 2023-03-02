// Next.js API route support:
// https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const constants = require('gocardless-nodejs/constants');
const gocardless = require('gocardless-nodejs');
const client = gocardless(
  process.env.GO_CARDLESS_ACCESS_TOKEN,
  constants.Environments.Sandbox,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // create a billing request returns a request id
    const { id } = await client.billingRequests.create({
      mandate_request: {
        scheme: 'bacs',
      },
    });

    const billingRequestFlow = await client.billingRequestFlows.create({
      redirect_uri: 'https://my-company.com/landing',
      exit_uri: 'https://my-company.com/exit',
      prefilled_customer: {
        given_name: 'Frank',
        family_name: 'Osborne',
        email: 'frank.osborne@acmeplc.com',
      },
      links: {
        billing_request: id,
      },
    });
    res.status(200).json(billingRequestFlow);
  } catch (e) {
    // @ts-ignore
    res.status(200).json(e.message);
  }
}
