import querystring from 'querystring';

const TOKEN = process.env.SPOTIFY_BASIC;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const CURRENTLY_PLAYING_URL =
  'https://api.spotify.com/v1/me/player/currently-playing?market=ID';

export const getToken = async () => {
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });
  return response.json();
};

export const getCurrentlyPlaying = async () => {
  const { access_token } = await getToken();
  return fetch(CURRENTLY_PLAYING_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
