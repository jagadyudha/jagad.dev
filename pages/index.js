import Head from "next/head";
import { createClient } from "contentful";
import Header from "../components/index/header";
import Games from "../components/index/games";
import Projects from "../components/index/projects";
import Spotify from "../components/index/spotify";
import Photos from "../components/index/photos";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFULL_SPACE_PROJECT,
    accessToken: process.env.CONTENTFULL_TOKEN_PROJECT,
  });
  const projects = await client.getEntries({ content_type: "project" });

  const photos = await client.getEntries({ content_type: "photo" });

  const games_res = await fetch(process.env.DB_STEAM);
  const games = await games_res.json();

  const spotify_res = await fetch(process.env.DB_SPOTIFY);
  const spotify = await spotify_res.json();

  return {
    props: {
      projects: projects.items,
      photos: photos.items,
      games,
      spotify,
    },
    revalidate: 1,
  };
}

export default function Home({ projects, games, spotify, photos }) {
  return (
    <main>
      <Head>
        <title>jagad yudha | frontend developer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Games items={games} />
      <Projects items={projects} />
      <Spotify items={spotify} />
      <Photos items={photos} />
    </main>
  );
}
