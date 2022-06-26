//default
import React from 'react';
import { InferGetStaticPropsType } from 'next';
import Steam from '@/components/steam-games';
import Spotify from '@/components/top-track';
import useSWR from 'swr';

//lib
import { getRecentlyPlayed } from '@/lib/spotify';
import { getRecentlyGames } from '@/lib/steam';

//seo
import { NextSeo } from 'next-seo';
import DataSeo from '@/_data/seo.json';

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

  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/playersummaries', fetcher);

  return (
    <>
      <NextSeo
        title={`${title} — Jagad Yudha Awali`}
        description={description}
        canonical={`${DataSeo.url}/activities`}
      />

      <main className='prose prose-invert max-w-none prose-a:no-underline'>
        <div className='mx-auto  mb-16 max-w-3xl text-center'>
          <h1 className='-my-1 text-3xl sm:text-5xl'>Steam Player Summaries</h1>
          <p className='text-md text-gray-400 sm:text-lg'>
            for now {data?.steam.getPersonName} is{' '}
            <span className='text-primary'>
              {data?.steam.getGames === false
                ? data?.steam.getStatus
                  ? data?.steam.getStatus
                  : '-'
                : data?.steam.getGames}
            </span>
          </p>
        </div>
        <Steam items={games} />

        <div className='my-16 mt-32 text-center'>
          <p className='-my-1 text-3xl font-bold text-white sm:text-5xl'>
            {`What I'm currently listening to.`}
          </p>
          <p className='text-md text-gray-400 sm:text-lg'>
            sometimes I like to listen to music on spotify.
          </p>
        </div>
        <Spotify items={spotify} />
      </main>
    </>
  );
};

export default Dashboard;
