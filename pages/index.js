import Header from '../components/index/header';
import Games from '../components/index/games';
import Projects from '../components/index/projects';
import Spotify from '../components/index/spotify';
import Photos from '../components/index/photos';
import { getContentful } from '../lib/contentful';
import { getRecentlyPlayed } from '../lib/spotify';
import { getRecentlyGames } from '../lib/steam';

export async function getStaticProps() {
  const projects = await getContentful('project');
  const photos = await getContentful('photo');
  const games = await getRecentlyGames();
  const spotify = await getRecentlyPlayed();

  return {
    props: {
      projects: projects.data.items,
      photos: photos.data.items,
      games,
      spotify,
    },
    revalidate: 1,
  };
}

const Home = ({ games, projects, spotify, photos }) => {
  return (
    <main>
      <Header />
      <Games items={games} />
      <Projects items={projects} />
      <Spotify items={spotify} />
      <Photos items={photos} />
    </main>
  );
};

export default Home;
