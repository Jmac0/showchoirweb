const gocardless = require('gocardless-nodejs');
import type { NextApiRequest, NextApiResponse } from 'next';

const constants = require('gocardless-nodejs/constants');

const client = gocardless(
  process.env.GO_CARDLESS_ACCESS_TOKEN,
  // Change this to constants.Environments.Live when you're ready to go live
  constants.Environments.Sandbox,
);
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  /* get all active mandates */
  const instalmentSchedules = await client.mandates.list({
    status: 'active',
  });
  /*get customer id from the mandates links array */
  const customers = instalmentSchedules.mandates.map(
    (m: { links: { customer: any } }) => {
      return m.links.customer;
    },
  );
  /* retrieve customer details for each active mandate*/
  const result = await Promise.all(
    customers.map((customer: string) => {
      return client.customers.find(customer);
    }),
  );

  /* filter out unnecessary customer info*/

  const customerDetails = result.map((customer) => {
    return {
      CGID: customer.id,
      Fname: customer.given_name,
      Lname: customer.family_name,
      adress: `${customer.address_line1}, ${
        customer.address_line2 || ''
      }`.trim(),
    };
  });

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

  // const result = await Promise.all(activeCustomers);

  // @ts-ignore
  res.status(200).json(customerDetails);
}

export {};
