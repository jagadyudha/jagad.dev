import React from 'react'
import PostShow from '@/components/pages/posts/show'
import { getPost, getPosts } from '@/services/posts.service'
import { PostProps } from '@/libs/types'
import { getOpenGraphImage } from '@/libs/helper'

export async function generateStaticParams() {
  const posts = await getPosts() as PostProps[];
  return posts.map((post) => ({
    slug: post.slug
  }));
}

const Post = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug
  const post = await getPost(slug) as PostProps
  return (
   <PostShow post={post}/>
  )
}

export default Post