import "tailwindcss/tailwind.css";
import MyLayout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
  return (
    <MyLayout>
      <div className="max-w-2xl px-8 mx-auto my-8 sm:my-14">
        <Component {...pageProps} />
      </div>
    </MyLayout>
  );
}

export default MyApp;
