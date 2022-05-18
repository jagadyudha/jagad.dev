import { AddsSubscriber, ShowsSubscriber } from '@/lib/getrevue';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const getrevue = await AddsSubscriber(req.body.email);
      return res.status(200).json(getrevue);
    } catch (e) {
      return res.status(500).json(e);
    }
  } else {
    try {
      const getrevue = await ShowsSubscriber();
      return res.status(200).json({ count: getrevue.length });
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}
