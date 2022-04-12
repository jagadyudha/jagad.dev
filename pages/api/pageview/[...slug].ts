import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { count } = await supabase
      .from('pageview')
      .select('*', { count: 'exact' })
      .eq('url', `/${req.query.slug[0]}/${req.query.slug[1]}`);
    res.send({
      slug: `/${req.query.slug[0]}/${req.query.slug[1]}`,
      views: count,
    });
  }
}
