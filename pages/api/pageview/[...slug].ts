import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug }: any = req.query;
  const fullSlug = `/${slug.join('/')}`;

  if (req.method === 'POST') {
    const { data } = await supabase
      .from('views')
      .select()
      .eq('slug', fullSlug)
      .single();

    if (data) {
      await supabase.rpc('increment', {
        slug_: fullSlug,
      });
    } else {
      await supabase.from('views').insert({ slug: fullSlug });
    }

    res.status(200).json({ status: 'ok' });
  }

  if (req.method === 'GET') {
    const { data } = await supabase
      .from('views')
      .select('*')
      .eq('slug', fullSlug)
      .single();
    if (data) {
      res.send(data);
    } else {
      res.send({ slug: fullSlug, count: 0 });
    }
  }
}
