import Header from '../components/index/header';
import Games from '../components/index/games';
import Projects from '../components/index/projects';
import Spotify from '../components/index/spotify';
import Photos from '../components/index/photos';
import { contentfulFetch, indexFetch } from '../helper/fetchdata';
import { getRecentlyPlayed } from '../lib/spotify';

export async function getStaticProps() {
  const projects = await contentfulFetch('project');
  const photos = await contentfulFetch('photo');
  const games = await indexFetch(process.env.DB_STEAM);
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

export default function Home({ projects, games, spotify, photos }) {
  return (
    <main>
      <Header />
      <Games items={games} />
      <Projects items={projects} />
      <Spotify items={spotify} />
      <Photos items={photos} />
    </main>
  );
}
