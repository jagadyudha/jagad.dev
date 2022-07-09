import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (req.method === 'POST') {
    await supabase.from('views').insert({ slug });
    await supabase.rpc('increment', {
      slug_: slug,
    });
    res.status(200).json({ status: 'ok' });
  }

  if (req.method === 'GET') {
    const { data } = await supabase
      .from('views')
      .select('*')
      .eq('slug', slug)
      .single();
    res.status(200).json(data?.count || 0);
  }
}
