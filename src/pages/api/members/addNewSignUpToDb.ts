import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import axios from "axios";
const Members = require('../../../lib/models/member');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  try {
	  // add new potential member to db
    const response = await Members.create({
      first_name: req.body.data.firstName,
      last_name: req.body.data.lastName,
      email: req.body.data.email,
      post_code: req.body.data.postCode,
      phone_number: req.body.data.phoneNumber,
      street_address: req.body.data.streetAddress,
      town_city: req.body.data.townOrCity,
      county: req.body.data.county,
      age_confirm: req.body.data.ageConfirm,
      home_choir: req.body.data.homeChoir,
      consent: req.body.data.consent,
      active_mandate: false,
      mandate: '',
      membership_type: 'DD',
      go_cardless_id: '',
    }).then((res: {_id: string}) =>{
// if the response has the _id property we know it has been added to the db
		if(res._id){
//TODO redirect to cgflow route
			console.log('POST TO GC')
			axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gocardless/gcmandateflow`, {hello: 'Jamie'}).then((res)=> console.log(res.data) )
		}
	})

    res.status(200).json(response);
  } catch (err : any){
	  let message = ''
	 
	  if(err.code === 11000){
		  message = 'Account with this email already exists'
	  }
    res.status(400).json({message});
  }
}
