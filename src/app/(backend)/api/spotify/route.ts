import { NextResponse as res } from 'next/server';

import { getCurrentlyPlaying } from '@/services/spotify.service';

export const revalidate = 0;

export async function GET() {
  try {
    const response = await getCurrentlyPlaying();
    if (response?.status === 204) {
      return res.json({
        data: {
          isPlaying: false,
        },
      });
    }
    const music = await response.json();
    if (music.item === null) {
      return res.json({
        data: {
          isPlaying: false,
        },
      });
    }
    const data = {
      fullTitle: `${music.item.name} - ${music.item.artists[0].name}`,
      url: music.item.external_urls.spotify,
      isPlaying: music.is_playing,
    };
    return res.json({ error: null, data: data });
  } catch (error) {
    console.log(error);
    return res.json(
      { error: 'someting went wrong', data: null },
      { status: 500 },
    );
  }
}
