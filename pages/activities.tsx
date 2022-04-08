import React from 'react';
import { InferGetStaticPropsType } from 'next';
import Steam from '@/components/player-summaries';
import Spotify from '@/components/top-track';

import { getRecentlyPlayed } from '@/lib/spotify';
import { getRecentlyGames } from '@/lib/steam';

//seo
import { NextSeo } from 'next-seo';
import DataSeo from '@/_data/seo.json';
import { cardTwitter } from '@/lib/seo';

export async function getStaticProps() {
  const games = await getRecentlyGames();
  const spotify = await getRecentlyPlayed();

  return {
    props: {
      games: games.response['games'],
      spotify: spotify['items'],
    },
    revalidate: 1,
  };
}

const Dashboard = ({
  games,
  spotify,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = 'Activities';
  const description = `Because I enjoy sharing my hobbies, I decided to create an API to keep track my online activities.`;
  const ogimage = `${DataSeo.ogimage}?title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(description)}`;

  return (
    <>
      <NextSeo
        title={`${title} — Jagad Yudha Awali`}
        description={description}
        canonical={`${DataSeo.url}/posts`}
        openGraph={{
          type: 'article',
          url: `${DataSeo.url}/activities`,
          title: `${title} — Jagad Yudha Awali`,
          description: description,
          images: [
            {
              url: ogimage,
              width: 1280,
              height: 720,
              alt: title,
              type: 'image/jpeg',
            },
          ],
          site_name: title,
        }}
        twitter={cardTwitter}
      />

      <h1 className='font-sans text-3xl font-bold text-white sm:text-5xl'>
        Activities
      </h1>
      <p className='text-md my-5 mb-10 font-sans font-normal text-gray-400 sm:text-lg'>
        Because I enjoy sharing my hobbies, I decided to create an API to keep
        track my online activities, such as Steam, Spotify, and Photos.
      </p>
      <Steam items={games} />
      <Spotify items={spotify} />
    </>
  );
};

export default Dashboard;
