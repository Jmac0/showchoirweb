// Next.js API route support:
// https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
const Members = require('../../lib/models/member');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  const results = await Members.find({});

  console.log(results + 'hello');

  res.status(200).json({ results });
}
