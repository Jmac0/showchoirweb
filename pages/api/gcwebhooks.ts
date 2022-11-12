import type { NextApiRequest, NextApiResponse } from 'next';
const webhooks = require('gocardless-nodejs/webhooks');
import { buffer } from 'micro';
import { Mandate } from '../../types';
const gocardless = require('gocardless-nodejs');
const webhookEndpointSecret = process.env.GC_WEBHOOK_SECRET;
import dbConnect from '../../lib/dbConnect';
const constants = require('gocardless-nodejs/constants');
const Members = require('../../lib/models/member');
const client = gocardless(
  process.env.GO_CARDLESS_ACCESS_TOKEN,
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox,
);
const processMandate = async (events: [Mandate]) => {
  const mandateId = events[0].links.mandate;

  const mandate = await client.mandates.find(mandateId);
  const customerId = mandate.links.customer;
  const customerInfo = await client.customers.find(customerId);
  console.log(customerInfo);
};

// Handle the incoming Webhook and check its signature.
const parseEvents = (
  eventsRequestBody: any,
  signatureHeader: any, // From webhook header
) => {
  try {
    return webhooks.parse(
      eventsRequestBody,
      webhookEndpointSecret,
      signatureHeader,
    );
  } catch (error) {
    if (error instanceof webhooks.InvalidSignatureError) {
      console.log('invalid signature, look out!');
    }
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // get raw body as string
  const body = (await buffer(req)).toString();
  // get signature from headers
  const signature = req.headers['webhook-signature']?.toString();
  // check signature and if ok return array of events
  const checkSignature = parseEvents(body, signature);
  checkSignature && processMandate(checkSignature);

  res.status(200).json('ok');
}
// turn off body parser
export const config = {
  api: {
    bodyParser: false,
  },
};
