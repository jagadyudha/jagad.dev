import querystring from 'querystring';

const token_basic = process.env.SPOTIFY_BASIC;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
const token_endpoint = 'https://accounts.spotify.com/api/token';
const currentlyplaying_endpoint =
  'https://api.spotify.com/v1/me/player/currently-playing?market=ID';

export const getTokenFromRefresh = async () => {
  const response = await fetch(token_endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token_basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export const getCurrentlyPlaying = async () => {
  const { access_token } = await getTokenFromRefresh();
  return fetch(currentlyplaying_endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
