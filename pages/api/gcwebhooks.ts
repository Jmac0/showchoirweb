import type { NextApiRequest, NextApiResponse } from 'next';
const webhooks = require('gocardless-nodejs/webhooks');
import { buffer } from 'micro';
const webhookEndpointSecret = process.env.GC_WEBHOOK_SECRET;
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
  console.log(checkSignature);

  res.status(200).json('ok');
}
// turn off body parser
export const config = {
  api: {
    bodyParser: false,
  },
};
