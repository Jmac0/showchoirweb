const mailchimp = require('@mailchimp/mailchimp_marketing');
const listId = process.env.MAILCHIMP_LIST_ID;
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // check first and last names are not the same as an anti spam filter
  if (req.body.firstName === req.body.lastName) {
    res
      .status(400)
      .json({ message: 'First name must be different from last name' });
    return;
  }

  try {
    // Get validation info for email from Abstract API
    const response = await axios.get(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${req.body.email}`,
    );
    // check email validation score is OK
    if (Number(response.data.quality_score) < 0.7) {
      res.status(400).json({ message: 'Email trust score too low' });
      return;
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
  // if all OK add to prospects list
  await mailchimp.lists
    .addListMember(listId, {
      email_address: req.body.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: req.body.firstName,
        LNAME: req.body.lastName,
      },
    })
    .then((response: any) => {
      // If email added OK send subscribed message back
      res.status(200).json(response.status);
    })
    .catch((err: any) => {
      // catch errors thrown by Mailchimp
      res.status(400).json(err.response.text);
    });
}
