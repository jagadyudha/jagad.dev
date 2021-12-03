import Header from '../components/index/header';
import Games from '../components/index/games';
import Projects from '../components/index/projects';
import Spotify from '../components/index/spotify';
import Photos from '../components/index/photos';
import { getContentful } from '../lib/contentful';
import { getRecentlyPlayed } from '../lib/spotify';
import { getRecentlyGames } from '../lib/steam';
import { getPlaiceholder } from 'plaiceholder';

export interface IndexProps {
  games: any;
  projects: any;
  photos: any;
  spotify: any;
  plaiceholders: any;
}

export async function getStaticProps() {
  const projects = await getContentful('project');
  const photos = await getContentful('photo');
  const games = await getRecentlyGames();
  const spotify = await getRecentlyPlayed();

  const plaiceholders = await Promise.all(
    photos.data.items.map(async (item: any) => {
      const { base64 } = await getPlaiceholder(
        `https:${item.fields.img[0].fields.file.url}`
      );

      return base64;
    })
  ).then((values) => values);

  return {
    props: {
      projects: projects.data.items,
      photos: photos.data.items,
      games: games['response']['games'],
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
