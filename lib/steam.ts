const recentlygames_endpont = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_TOKEN}&steamid=${process.env.STEAM_ID}&format=json`;
const playersummaries_endpoint = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_TOKEN}&steamids=${process.env.STEAM_ID}`;

export const getRecentlyGames = async () => {
  const response = await fetch(recentlygames_endpont, {
    method: 'GET',
  });
  return response.json();
};

export const getPlayerSummaries = () => {
  return fetch(playersummaries_endpoint, {
    method: 'GET',
  });
};
