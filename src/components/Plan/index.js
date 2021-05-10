/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import styled from "styled-components";

import { CheckOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { useStripe } from "@stripe/react-stripe-js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 15px 25px;
  border-radius: 10px;
  position: relative;

  ${(props) =>
    props.isPopular
      ? `
      background-color: black;
      color: white;
      transform: scale(1.05);
      border: 3px solid white;
    `
      : ""}
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 7px;
`;

const Description = styled.span`
  font-weight: light;
  font-size: 13px;
  color: #9fa1a3;
`;

const Features = styled.ul`
  padding-left: 0;
  list-style: none;
  margin-left: -15px;
`;

const Feature = styled.li`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 30px;
`;

const HR = styled.div`
  width: 100%;
  border-top: 1px solid rgba(196, 196, 196, 0.27);
  margin: 10px 0;
`;

const Image = styled.img`
  width: 70px;
  height: 70px;
  margin-bottom: 15px;
  margin-top: 35px;
`;

const DollarSign = styled.span`
  font-size: 13px;
  margin-right: 2px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  left: -10px;
`;

const Plan = ({
  name,
  description,
  price,
  features,
  isCurrent,
  icon,
  isPopular,
  pricing,
}) => {
  const stripe = useStripe();

  return (
    <Container isPopular={isPopular}>
      {isPopular && (
        <Tag
          color="#1890ff"
          style={{
            borderRadius: 10,
            padding: "0 15",
            position: "absolute",
            top: 7,
            right: 7,
          }}
        >
          Popular
        </Tag>
      )}

      <Image src={icon} />
      <Name>{name}</Name>
      <Description>{description}</Description>
      <HR />
      <p
        style={{
          position: "relative",
          color: isPopular ? "white" : "#1890ff",
        }}
      >
        <DollarSign>$</DollarSign>
        <Price>{price}</Price>
      </p>
      <Features>
        {features.map((feature) => (
          <Feature key={feature}>
            <CheckOutlined style={{ marginRight: 10 }} />
            {feature}
          </Feature>
        ))}
      </Features>
      <Button
        type="primary"
        shape="round"
        size={"medium"}
        style={{ height: 40, padding: "0 50px", fontSize: 12 }}
        onClick={() => {
          fetch("/.netlify/functions/create-checkout-session", {
            method: "POST",
            body: JSON.stringify({
              priceId: pricing.monthly,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              stripe.redirectToCheckout({
                sessionId: data.sessionId,
              });
            });
        }}
      >
        {isCurrent ? "Your current plan" : `Go for ${name}`}
      </Button>
    </Container>
  );
};

Plan.defaultProps = {
  name: "Free",
  description: "To get started",
  price: 0,
  icon: "/1.png",
  isCurrent: false,
  features: ["1 TB cloud storage", "Up to 20 users", "Up to 1000 requests"],
};

export default Plan;
