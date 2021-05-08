import "../styles/globals.css";
import { IdentityContextProvider } from "react-netlify-identity-widget";

function MyApp({ Component, pageProps }) {
  const url = "https://mystifying-lovelace-3f5e80.netlify.app";

  return (
    <IdentityContextProvider url={url}>
      <Component {...pageProps} />
    </IdentityContextProvider>
  );
}

export default MyApp;
