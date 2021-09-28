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

  return res.status(200).json({
    music,
  });
}
