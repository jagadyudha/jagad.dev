const access_token = process.env.GETREVUE_TOKEN;

export const AddsSubscriber = async (email: string) => {
  const response = await fetch('https://www.getrevue.co/api/v2/subscribers/', {
    method: 'POST',
    headers: {
      Authorization: `Token ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      double_opt_in: false,
    }),
  });
  return response.json();
};

export const ShowsSubscriber = async () => {
  const response = await fetch('https://www.getrevue.co/api/v2/subscribers/', {
    method: 'GET',
    headers: {
      Authorization: `Token ${access_token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
