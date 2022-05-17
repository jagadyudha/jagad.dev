import { AddsSubscriber } from '@/lib/getrevue';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const peler = await AddsSubscriber(
      req.body.email,
      req.body.first_name,
      req.body.last_name
    );

    return res.status(200).json(peler);
  } else {
    return res.status(200).json({ error: 'Method Not Allowed' });
  }

  //   return res.status(200).json({
  //     music: {
  //       getData,
  //       getUrl,
  //       is_playing,
  //       cover,
  //     },
  //   });
}
