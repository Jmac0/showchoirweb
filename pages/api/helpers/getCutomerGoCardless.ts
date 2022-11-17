const gocardless = require('gocardless-nodejs');
const constants = require('gocardless-nodejs/constants');
const client = gocardless(
  process.env.GO_CARDLESS_ACCESS_TOKEN,
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox,
);
import { Mandate } from '../../../types';

export const getCustomerFromGoCardless = async (event: Mandate) => {
  // get the mandate id from the event
  const mandateId = event.links.mandate;
  // query Go Cardless for the mandate
  const mandate = await client.mandates.find(mandateId);
  // get Go Cardless customer ID from the mandate object
  const customerId = mandate.links.customer;
  // query Go Cardless for the actual customer details
  return await client.customers.find(customerId);
};
