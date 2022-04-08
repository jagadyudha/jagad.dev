import { getCurrentlyPlaying } from '../../lib/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getCurrentlyPlaying();

  if (response.status === 204) {
    return res.status(200).json({
      music: {
        is_playing: false,
      },
    });
  }

  const music = await response.json();
  if (music.item === null) {
    return res.status(200).json({
      music: {
        is_playing: false,
      },
    });
  }
  const getTitleArtist = `${music.item.name} - ${music.item.artists[0].name}`;
  const getData = getTitleArtist;
  //   getTitleArtist.length > 23
  //     ? getTitleArtist.charAt(22) === ' '
  //       ? `${getTitleArtist.slice(0, 22)}...`
  //       : `${getTitleArtist.slice(0, 23)}...`
  //     : getTitleArtist;
  const getUrl = music.item.external_urls.spotify;
  const is_playing = music.is_playing;
  const cover = music.item.album.images[0].url;

  return res.status(200).json({
    music: {
      getData,
      getUrl,
      is_playing,
      cover,
    },
  });
}
