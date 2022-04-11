import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { data } = await supabase
      .from('views')
      .select()
      .eq('slug', req.query.slug)
      .single();

    if (data) {
      await supabase.rpc('increment', {
        slug_: req.query.slug,
      });
    } else {
      await supabase.from('views').insert([{ slug: req.query.slug }]);
    }

    res.status(200).json({ status: 'ok' });
  }

  if (req.method === 'GET') {
    const { data } = await supabase
      .from('views')
      .select()
      .eq('slug', req.query.slug)
      .single();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(200).json({
        count: 0,
      });
    }
  }
}
