import type { NextApiRequest, NextApiResponse } from 'next';
const webhooks = require('gocardless-nodejs/webhooks');
import { buffer } from 'micro';
import dbConnect from '../../lib/dbConnect';
import { Mandate } from '../../types';
const gocardless = require('gocardless-nodejs');
const webhookEndpointSecret = process.env.GC_WEBHOOK_SECRET;
const constants = require('gocardless-nodejs/constants');
const Members = require('../../lib/models/member');
const client = gocardless(
  process.env.GO_CARDLESS_ACCESS_TOKEN,
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox,
);

const processEvents = async (event: Mandate) => {
  await dbConnect();
  switch (event.action) {
    //** handle canceled mandate **//
    case 'cancelled':
      // get the mandate id from the event
      const mandateId = event.links.mandate;
      // query Go Cardless for the mandate
      const mandate = await client.mandates.find(mandateId);
      // get Go Cardless customer ID from the mandate object
      const customerId = mandate.links.customer;
      // query Go Cardless for the actual customer details
      const customer = await client.customers.find(customerId);
      // Find and update the customer in Mongo, set active to false
      await Members.findOneAndUpdate(
        { email: `${customer.email}` },
        { active: false },
      );
      break;

    case 'created':
      console.log('------- NEW CUSTOMER ----------');
      console.log(event);
      break;
    default:
      return console.log('Unknown event type');
  }
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
  // if array pass to event handler function
  checkSignature &&
    checkSignature.map((event: Mandate) => {
      processEvents(event);
    });

  res.status(200).json('ok');
}
// turn off body parser
export const config = {
  api: {
    bodyParser: false,
  },
};
