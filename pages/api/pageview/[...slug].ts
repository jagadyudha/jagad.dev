import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug }: any = req.query;
  const fullSlug = `/${slug.join('/')}`;

  if (req.method === 'POST') {
    await supabase.from('views').insert({ slug: fullSlug });
    await supabase.rpc('increment', {
      slug_: fullSlug,
    });
    res.status(200).json({ status: 'ok' });
  }

  if (req.method === 'GET') {
    const { data } = await supabase
      .from('views')
      .select('*')
      .eq('slug', fullSlug)
      .single();
    res.status(200).json({ count: data?.count || 0 });
  }
}
