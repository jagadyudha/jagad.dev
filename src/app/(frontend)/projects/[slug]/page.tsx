import React from 'react';

import { Metadata } from 'next';

import { getProject, getProjects } from '@/services/projects.service';

import { ProjectShow } from '@/components/pages/projects/show';

import { dataOpenGraph } from '@/libs/data';
import { ProjectProps } from '@/libs/types';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const project = (await getProject(slug)) as ProjectProps;

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    openGraph: {
      ...dataOpenGraph,
      title: project.frontmatter.title,
      url: '/projects/' + project.slug,
    },
  };
}

export async function generateStaticParams() {
  const posts = (await getProjects()) as ProjectProps[];
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const Post = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const project = (await getProject(slug)) as ProjectProps;
  return <ProjectShow project={project} />;
};

export default Post;
