import React from 'react';

export type Props = {
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
  html_url: string;
  message?: string;
};

const useGithubRepo = (repo: string) => {
  const [state, setState] = React.useState<null | Props>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        const json = await response.json();
        return setState(json);
      } finally {
        setLoading(false);
      }
    };

    handleFetch();
  }, []);

  return { data: state, loading };
};

export default useGithubRepo;
