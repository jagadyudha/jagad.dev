import React from 'react';
import useGithubRepo from '@/hooks/useGithubRepo';
import { BiGitRepoForked, BiStar } from 'react-icons/bi';
import { GoMarkGithub } from 'react-icons/go';
import Link from '@/components/customLink';

export type Props = {
  repo: string;
};

const GithubCard: React.FC<Props> = ({ repo }) => {
  const { data, loading } = useGithubRepo(repo);

  if (loading) {
    return (
      <div className='max-w-md animate-pulse space-y-4 rounded-md border border-white border-opacity-20 bg-background_100 p-6 duration-300 hover:scale-105'>
        <GoMarkGithub className='text-3xl text-white' />
        <span className='block h-3 rounded-sm bg-zinc-600 text-2xl font-bold'></span>
        <span className='block h-3 rounded-sm bg-zinc-600 text-2xl font-bold'></span>
        <span className='block h-3 w-1/2 rounded-sm bg-zinc-600 text-2xl font-bold'></span>

        <div className='mt-0 flex space-x-6 text-sm lg:mt-4'>
          <span className='block h-2 w-1/2 rounded-sm bg-zinc-600 text-2xl font-bold'></span>
          <span className='block h-2 w-1/2 rounded-sm  bg-zinc-600 text-2xl font-bold'></span>
        </div>
      </div>
    );
  }

  return (
    <Link className='no-underline' href={data?.html_url!}>
      <div className='max-w-md space-y-4 rounded-md border border-white border-opacity-20 bg-background_100 p-6 duration-300 hover:scale-105'>
        <GoMarkGithub className='text-3xl text-white' />
        <span className='block text-2xl font-bold text-primary'>
          {data?.name}
        </span>
        <span className='block pb-5 text-gray-300'>{data?.description}</span>

        <div className='mt-0 flex space-x-6 text-sm lg:mt-4'>
          <div className='flex items-center space-x-1'>
            <BiGitRepoForked className='mr-1 text-lg text-gray-300' />
            <span className='block text-gray-300'>{data?.forks_count}</span>
            <span className='block text-gray-300'>Forks</span>
          </div>
          <div className='flex items-center space-x-1'>
            <BiStar className='mr-1 text-lg text-gray-300' />
            <span className='block text-gray-300'>
              {data?.stargazers_count}
            </span>
            <span className='block text-gray-300'>Starts</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GithubCard;
