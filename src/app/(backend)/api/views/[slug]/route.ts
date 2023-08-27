import { NextResponse as res, type NextRequest } from 'next/server';

import { getPostViews, incrementPostViews } from '@/services/posts.service';

export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const slug = params.slug;
    const views = await getPostViews(slug);
    return res.json({ error: null, views });
  } catch (error) {
    console.log(error);
    return res.json(
      { error: 'someting went wrong', views: null },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const slug = params.slug;
    const views = await incrementPostViews(slug);
    return res.json({ error: null, views });
  } catch (error) {
    console.log(error);
    return res.json(
      { error: 'someting went wrong', views: null },
      { status: 500 },
    );
  }
}
