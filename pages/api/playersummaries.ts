import { getPlayerSummaries } from '../../lib/steam';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getPlayerSummaries();

  if (response.status != 200) {
    return res.status(200).json({
      steam: {
        personastate: 'Offline',
      },
    });
  }

  const steam = await response.json();
  if (steam.item === null) {
    return res.status(200).json({
      steam: {
        personastate: 'Offline',
      },
    });
  }
  const getPersonName = steam.response.players[0].personaname;
  const getAvatar = steam.response.players[0].avatarfull;
  const getStatus =
    steam.response.players[0].personastate === 1
      ? 'Online'
      : steam.response.players[0].personastate === 2
      ? 'Busy'
      : steam.response.players[0].personastate === 3
      ? 'Away'
      : 'Offline';

  const getGames = !steam.response.players[0].gameextrainfo
    ? false
    : `playing ${steam.response.players[0].gameextrainfo}`;
  const getprofileUrl = steam.response.players[0].profileurl;
  return res.status(200).json({
    steam: {
      getPersonName,
      getAvatar,
      getStatus,
      getGames,
      getprofileUrl,
    },
  });
}
