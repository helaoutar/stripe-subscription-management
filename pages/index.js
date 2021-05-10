import { useState } from "react";
import { Button, Menu } from "antd";
import {
  IdentityModal,
  useIdentityContext,
} from "react-netlify-identity-widget";
import "react-netlify-identity-widget/styles.css";
import "@reach/tabs/styles.css";
import "antd/dist/antd.css";
import styled from "styled-components";

import Plan from "../src/components/Plan";

const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding: 0 20%;
`;

const Container = styled.div``;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 45px;
  font-size: 30px;
`;

const Home = () => {
  const identity = useIdentityContext();
  const [dialog, setDialog] = useState(false);

  return (
    <Container>
      <Menu theme="dark" mode="horizontal" style={{ marginBottom: 70 }}>
        <Menu.Item style={{ float: "right" }} onClick={() => setDialog(true)}>
          Sign in
        </Menu.Item>
      </Menu>
      <Title>Subscription plans</Title>
      <PlansContainer>
        <Plan />
        <Plan isPopular />
        <Plan />
      </PlansContainer>
      {dialog && (
        <IdentityModal
          showDialog={dialog}
          onCloseDialog={() => setDialog(false)}
          onLogin={(user) => console.log("hello ", user)}
          onSignup={(user) => console.log("welcome ", user)}
          onLogout={() => console.log("bye ")}
        />
      )}
    </Container>
  );
};

export default Home;
