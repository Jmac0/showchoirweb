import type { NextApiRequest, NextApiResponse } from 'next';
const webhooks = require('gocardless-nodejs/webhooks');
import { buffer } from 'micro';
import dbConnect from '../../lib/dbConnect';
import { MandateType, MemberType } from '../../types';
import { getCustomerFromGoCardless } from './helpers/getCutomerGoCardless';
const webhookEndpointSecret = process.env.GC_WEBHOOK_SECRET;
// @ts-ignore
const Members = require('../../lib/models/member');

const processEvents = async (event: MandateType) => {
  await dbConnect();

  console.log(event);
  // get details of customer from go cardless
  const customer: MemberType = await getCustomerFromGoCardless(event);
  console.log(customer);
  switch (event.action) {
    //** handle canceled mandate **//
    case 'cancelled':
      await Members.findOneAndUpdate(
        { email: `${customer.email}` },
        { active: false },
      )
        .then((res: MemberType) => {
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
      break;
    /*Handle new customer sign up */
    case 'created':
      const newMember = await Members.create(customer);
      console.log(newMember);
      break;
    default:
      return console.log('Unknown event type');
  }
};

// Handle the coming Webhook and check its signature.
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
    checkSignature.map((event: MandateType) => {
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
