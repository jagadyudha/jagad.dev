import querystring from 'querystring';
const endPoint = 'https://www.getrevue.co/api/v2/subscribers/';

export const AddsSubscriber = async (
  email: string,
  first_name: string,
  last_name: string
) => {
  const access_token = process.env.GETREVUE_TOKEN;
  const response = await fetch(endPoint, {
    method: 'POST',
    headers: {
      Authorization: `Token ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      first_name,
      last_name,
      double_opt_in: false,
    }),
  });
  return response.json();
};
