//components
import Header from '@/components/index/header';
import Games from '@/components/index/games';
import Projects from '@/components/index/projects';
import Spotify from '@/components/index/spotify';
import Photos from '@/components/index/photos';

//lib
import { getContentful } from '@/lib/contentful';
import { getRecentlyPlayed } from '@/lib/spotify';
import { getRecentlyGames } from '@/lib/steam';
import { blurhash } from '@/lib/blurhash';

//games types
export interface GameListProps {
  appid: number;
  name: string;
  playtime_forever: string;
}

//projects types
export interface ProjectsFields {
  title: string;
  slug: string;
  desc: string;
  label: Array<string>;
}

export interface ProjectsProps {
  fields: ProjectsFields;
}

//photos types
export interface PhotosFields {
  title: string;
  slug: string;
  img: Array<any>;
}

export interface PhotosProps {
  fields: PhotosFields;
}

//index types
export interface IndexProps {
  games: GameListProps[];
  projects: ProjectsProps[];
  photos: PhotosProps[];
  spotify: Array<any>;
  plaiceholders: Array<string>;
}

export async function getStaticProps() {
  const projects = await getContentful('project');
  const photos = await getContentful('photo');
  const games = await getRecentlyGames();
  const spotify = await getRecentlyPlayed();
  const plaiceholders = await blurhash(photos);

  return {
    props: {
      projects,
      photos,
      games: games.response['games'],
      spotify: spotify['items'],
      plaiceholders,
    },
    revalidate: 1,
  };
}

const Home: React.FC<IndexProps> = ({
  games,
  projects,
  spotify,
  photos,
  plaiceholders,
}) => {
  return (
    <main>
      <Header />
      <Games items={games} />
      <Projects items={projects} />
      <Spotify items={spotify} />
      <Photos items={photos} plaiceholders={plaiceholders} />
    </main>
  );
};

export default Home;
