import { useState, useEffect } from 'react';
import useSWR from 'swr';

export type Reaction = {
  like_count: number;
  love_count: number;
  wow_count: number;
  yay_count: number;
};

const initialState = {
  liked: false,
  loved: false,
  wow: false,
  yay: false,
  read: false,
};

const useReactions = (slug: string) => {
  const [liked, setLiked] = useState(false);
  const [loved, setLoved] = useState(false);
  const [wow, setWow] = useState(false);
  const [yay, setYay] = useState(false);
  const [reactions, setReactions] = useState<Reaction>();

  const [hydrated, setHydrated] = useState(false);

  // Reaction count data
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR<Reaction>(`/api/reaction/${slug}`, fetcher, {
    refreshInterval: 25000,
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { liked, loved, wow, yay } = getReaction();

      // Set values after grabbing data from localStorage
      setLiked(liked);
      setLoved(loved);
      setWow(wow);
      setYay(yay);
    }
  }, [hydrated, setReaction]);

  useEffect(() => {
    setReactions(data);
  }, [data]);

  // helper function

  function getReaction() {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(slug) as string) || initialState;
    }
    return null;
  }

  function setReaction(reaction: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(slug, JSON.stringify(reaction));
    }
  }

  function updateReaction(reaction: string) {
    const current = getReaction();
    const updated = { ...current, [reaction]: !current[reaction] };
    setReaction(updated);
  }

  async function handleIncrementLike() {
    updateReaction('liked');

    await fetch(`/api/reaction/${slug}`, {
      method: 'POST',
      body: JSON.stringify({
        reaction: 'like_count',
        type: 'increment',
      }),
    });

    mutate({ ...data, like_count: data!.like_count + 1 } as Reaction);
  }

  async function handleDecrementLike() {
    updateReaction('liked');

    await fetch(`/api/reaction/${slug}`, {
      method: 'POST',
      body: JSON.stringify({
        reaction: 'like_count',
        type: 'decrement',
      }),
    });

    mutate({ ...data, like_count: data!.like_count - 1 } as Reaction);
  }

  async function handleIncrementLove() {
    updateReaction('loved');

    await fetch(`/api/reaction/${slug}`, {
      method: 'POST',
      body: JSON.stringify({
        reaction: 'love_count',
        type: 'increment',
      }),
    });

    mutate({ ...data, love_count: data!.love_count + 1 } as Reaction);
  }

  async function handleDecrementLove() {
    updateReaction('loved');

    await fetch(`/api/reaction/${slug}`, {
      method: 'POST',
      body: JSON.stringify({
        reaction: 'love_count',
        type: 'decrement',
      }),
    });

    mutate({ ...data, love_count: data!.love_count - 1 } as Reaction);
  }

  async function handleIncrementWow() {
    updateReaction('wow');

    await fetch(`/api/reaction/${slug}`, {
      method: 'POST',
      body: JSON.stringify({
        reaction: 'wow_count',
        type: 'increment',
      }),
    });

    mutate({ ...data, wow_count: data!.wow_count + 1 } as Reaction);
  }

  async function handleDecrementWow() {
    updateReaction('wow');

    await fetch(`/api/reaction/${slug}`, {
      method: 'POST',
      body: JSON.stringify({
        reaction: 'wow_count',
        type: 'decrement',
      }),
    });

    mutate({ ...data, wow_count: data!.wow_count - 1 } as Reaction);
  }

  async function handleIncrementYay() {
    updateReaction('yay');

    await fetch(`/api/reaction/${slug}`, {
      method: 'POST',
      body: JSON.stringify({
        reaction: 'yay_count',
        type: 'increment',
      }),
    });

    mutate({ ...data, yay_count: data!.yay_count + 1 } as Reaction);
  }

  async function handleDecrementYay() {
    updateReaction('yay');

    await fetch(`/api/reaction/${slug}`, {
      method: 'POST',
      body: JSON.stringify({
        reaction: 'yay_count',
        type: 'decrement',
      }),
    });

    mutate({ ...data, yay_count: data!.yay_count - 1 } as Reaction);
  }

  return {
    liked,
    loved,
    wow,
    yay,
    reactions,
    handleIncrementLike,
    handleDecrementLike,
    handleIncrementLove,
    handleDecrementLove,
    handleIncrementWow,
    handleDecrementWow,
    handleIncrementYay,
    handleDecrementYay,
  };
};

export default useReactions;
