/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import "../styles/globals.css";
import { IdentityContextProvider } from "react-netlify-identity-widget";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51IZH8KK5rzWBzreBJMyBEBZdIFkNDaZ0N5D6IrQcLyNakwkO3ZWuxq6ybLlGDcNG3j5v74YlopnlnctEpNIpWYtP00gQAbTeOR"
);

function MyApp({ Component, pageProps }) {
  // TODO: get this from process.env
  const url = "https://helaoutar-stripe-subs.netlify.app/";

  return (
    <IdentityContextProvider url={url}>
      <Elements stripe={stripePromise}>
        <Component {...pageProps} />
      </Elements>
    </IdentityContextProvider>
  );
}

export default MyApp;
