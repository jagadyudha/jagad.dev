import { getCurrentlyPlaying } from '../../lib/spotify';

export default async function handler(req, res) {
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
  const getData =
    getTitleArtist.length > 25
      ? `${getTitleArtist.slice(0, 25)}...`
      : getTitleArtist;
  const getUrl = music.item.external_urls.spotify;
  return res.status(200).json({
    music: {
      getData,
      getUrl,
      is_playing: true,
    },
  });
}
