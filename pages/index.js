import { useState } from "react";
import {
  IdentityModal,
  useIdentityContext,
} from "react-netlify-identity-widget";
import "react-netlify-identity-widget/styles.css";
import "@reach/tabs/styles.css";

const Home = () => {
  const identity = useIdentityContext();
  const [dialog, setDialog] = useState(false);

  console.log(identity);
  return (
    <>
      <h1>Sign Up for Premium content</h1>

      <div className="user-info">
        <button id="left">Log In</button>
        <button id="right">Sign Up</button>
      </div>

      <div className="corgi-content">
        <div className="content">
          <h2>Free Content</h2>
          <div className="free"></div>
        </div>
        <div className="content">
          <h2>Pro Content</h2>
          <div className="pro"></div>
        </div>
        <div className="content">
          <h2>Premium Content</h2>
          <div className="premium"></div>
        </div>
      </div>
      {!dialog && <button onClick={() => setDialog(true)}>Log in</button>}
      {dialog && (
        <IdentityModal
          showDialog={dialog}
          onCloseDialog={() => setDialog(false)}
          onLogin={(user) => console.log("hello ", user)}
          onSignup={(user) => console.log("welcome ", user)}
          onLogout={() => console.log("bye ")}
        />
      )}
    </>
  );
};

export default Home;
