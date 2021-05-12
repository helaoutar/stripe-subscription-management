import { useEffect, useState } from "react";
import { Menu } from "antd";
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

const plans = [
  {
    name: "Basic",
    description: "To get started",
    price: 10,
    icon: "/3.png",
    isCurrent: false,
    features: ["1 TB cloud storage", "Up to 20 users", "Up to 1000 requests"],
    pricing: {
      monthly: "price_1IpIqQK5rzWBzreB0XjACXY3",
      yearly: "price_1IpIsyK5rzWBzreBkYJ4CoGg",
    },
  },
  {
    name: "Pro",
    isPopular: true,
    description: "For small businesses",
    price: 20,
    icon: "/2.png",
    isCurrent: false,
    features: ["5 TB cloud storage", "Up to 100 users", "Up to 10000 requests"],
    pricing: {
      monthly: "price_1IpIs3K5rzWBzreBw5u8wk6B",
      yearly: "price_1IpItHK5rzWBzreBFek7aP83",
    },
  },
  {
    name: "Premium",
    description: "For big businesses",
    price: 40,
    icon: "/1.png",
    isCurrent: false,
    features: ["20 TB cloud storage", "Unlimited users", "Unlimited requests"],
    pricing: {
      monthly: "price_1IphZ4K5rzWBzreBOLqoW4zT",
      yearly: "price_1IphZ4K5rzWBzreB9gcJK8lk",
    },
  },
];

const Home = () => {
  const identity = useIdentityContext();
  const [dialog, setDialog] = useState(false);

  const { user, logoutUser } = identity;

  useEffect(() => {
    identity.getFreshJWT();
  }, []);

  console.log(identity);

  return (
    <Container>
      <Menu theme="dark" mode="horizontal" style={{ marginBottom: 70 }}>
        {user ? (
          <Menu.Item style={{ float: "right" }} onClick={() => logoutUser()}>
            Log out
          </Menu.Item>
        ) : (
          <Menu.Item style={{ float: "right" }} onClick={() => setDialog(true)}>
            Sign in
          </Menu.Item>
        )}
      </Menu>
      <Title>Subscription plans</Title>
      <PlansContainer>
        {plans.map((plan) => (
          <Plan key={plan.name} {...plan} showDialog={() => setDialog(true)} />
        ))}
      </PlansContainer>
      {dialog && (
        <IdentityModal
          showDialog={dialog}
          onCloseDialog={() => setDialog(false)}
          onLogin={() => {
            setDialog(false);
          }}
          onSignup={(user) => console.log("welcome ", user)}
          onLogout={() => console.log("bye ")}
        />
      )}
    </Container>
  );
};

export default Home;
