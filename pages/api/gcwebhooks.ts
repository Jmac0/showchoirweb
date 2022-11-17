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
  switch (event.action) {
    //** handle canceled mandate **//
    case 'cancelled':
      // get details of customer from go cardless
      const canceledCustomer = await getCustomerFromGoCardless(event);
      // Find and update the customer in Mongo, set active to false
      await Members.findOneAndUpdate(
        { email: `${canceledCustomer.email}` },
        { active: false },
      );
      break;
    /*New customer sign up */
    case 'created':
      console.log('------- NEW CUSTOMER ----------');
      // get customer from Go Cardless
      const newCustomer = await getCustomerFromGoCardless(event);
      const addToDb: MemberType = {
        active: true,
        email: `${newCustomer.email}`,
        go_cardless_id: `${newCustomer.id}`,
        first_name: `${newCustomer.given_name}`,
        last_name: `${newCustomer.family_name}`,
        address: `${newCustomer.address_line1}, ${
          newCustomer.address_line2 || ''
        }`.trim(),
      };
      await Members.create(addToDb);
      break;
    default:
      return console.log('Unknown event type');
  }
};

/*
 "id": "CU000E2STQHMFB",
 "created_at": "2020-12-05T21:49:58.281Z",
 "email": "rudymcblowhard@gmail.com",
 "given_name": "Rudy",
 "family_name": "McBlowhard",
 "company_name": null,
 "address_line1": "Flat 11, Norfolk Mews",
 "address_line2": "140A South Street",
 "address_line3": null,
 "city": "Dorking",
 "region": null,
 "postal_code": "RH4 2EX",
 */
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
