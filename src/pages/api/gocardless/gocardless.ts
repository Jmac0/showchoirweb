const gocardless = require('gocardless-nodejs');
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
const constants = require('gocardless-nodejs/constants');
const Members = require('../../lib/models/member');

const client = gocardless(
  process.env.GO_CARDLESS_ACCESS_TOKEN,
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  const redirectFlow = await client.redirectFlows.create({
    description: 'Show Choir',
    session_token: 'TK12pis3',
    success_redirect_url: 'https://www.show-choir.co.uk',
    prefilled_customer: {
      given_name: 'Mike',
      family_name: 'Strutter',
      email: 'frank.osborne@acmeplc.com',
    },
  });
  // get all active mandates
  /*   const instalmentSchedules = await client.mandates.list({
    status: 'active',
  });
  //get customer id from the mandates links array
  const customers = instalmentSchedules.mandates.map(
    (m: { links: { customer: any } }) => {
      return m.links.customer;
    },
  );

  */
  // retrieve customer details for each Factive mandate
  /*
  const result = await Promise.all(
    customers.map((customer: string) => {
      return client.customers.find(customer);
    }),
  );
*/
  // console.log(instalmentSchedules);

  // filter out unnecessary customer info
  /*
  const customerDetails = result.map((customer) => {
    return {
      active: true,
      go_cardless_id: customer.id,
      email: customer.email,
      first_name: customer.given_name,
      last_name: customer.family_name,
      address: `${customer.address_line1}, ${
        customer.address_line2 || ''
      }`.trim(),
    };
  });

  await Members.insertMany(customerDetails)
    .then((mongoRes: any) => {
      res.status(200).json(mongoRes);
    })
    .catch((err: any) => console.log(err));

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

  //const result = await Promise.all(activeCustomers);
  res.status(200).json(redirectFlow);
}

export {};
