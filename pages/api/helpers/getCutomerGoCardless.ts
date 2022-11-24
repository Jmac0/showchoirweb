const gocardless = require('gocardless-nodejs');
const constants = require('gocardless-nodejs/constants');
import { MemberType} from '../../../types';
const client = gocardless(
  process.env.GO_CARDLESS_ACCESS_TOKEN,
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox,
);
import { MandateType } from '../../../types';

export const getCustomerFromGoCardless = async (event: MandateType) => {
  // get the mandate id from the event
  const mandateId = event.links.mandate;
  // query Go Cardless for the mandate
  const mandate = await client.mandates.find(mandateId);

  const installments = await client.subscriptions.list({
    mandate: `${mandateId}`,
  });
  const membershipOption = installments.subscriptions[0].name;
  // get Go Cardless customer ID from the mandate object
  const customerId = mandate.links.customer;
  // query Go Cardless for the actual customer details
  const customer = await client.customers.find(customerId);

// return all customer info
      const newCustomerObject: MemberType =  {
        active: true,
        email: `${customer.email}`,
        memberOption: `${membershipOption}`,
        mandate: `${event.links.mandate}`,
        go_cardless_id: `${customer.id}`,
        first_name: `${customer.given_name}`,
        last_name: `${customer.family_name}`,
        address: `${customer.address_line1}, ${
          customer.address_line2 || ''
        }`.trim(),
      };



return newCustomerObject
};

/*
  active: boolean;
  mandate: string;
  memberOption: string;
  email: string;
  go_cardless_id: string;
  first_name: string;
  last_name: string;
  address: string;
  address_line2?: string;
  */
