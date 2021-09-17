import "tailwindcss/tailwind.css";
import Layout from "../components/layout/layout";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <div className="max-w-2xl px-8 mx-auto my-8 sm:my-14">
          <Component {...pageProps} />
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
