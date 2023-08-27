import React from 'react';

import { Metadata } from 'next';

import { getProjects } from '@/services/projects.service';

import ProjectIndex from '@/components/pages/projects';

import { ProjectProps } from '@/libs/types';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Projects',
  description: `Collection of my past endeavors, each representing a unique expression of my creativity and problem-solving abilities.`,
};

const Page = async () => {
  const projects = (await getProjects()) as ProjectProps[];
  return <ProjectIndex projects={projects} />;
};

export default Page;
