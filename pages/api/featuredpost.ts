import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { data } = await supabase
      .from('views')
      .select('slug')
      .order('count', { ascending: false })
      .limit(4);

    const modifiers = data?.map((item) => {
      return item.slug;
    });

    res.status(200).json(modifiers);
  }
}
