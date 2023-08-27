export const getAllTimeCode = async () => {
  const response = await fetch(
    'https://wakatime.com/api/v1/users/current/all_time_since_today',
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${process.env.WAKATIME_API}`,
      },
    },
  );
  const data = await response.json();
  return data;
};
