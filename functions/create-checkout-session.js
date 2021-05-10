/* eslint-disable no-undef */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require("./utils/fauna");

exports.handler = async (event, context) => {
  const { body } = event;
  const { priceId } = JSON.parse(body);
  const {
    identity = { url: "https://example.com" },
    user,
  } = context.clientContext;

  console.log("ids are", user.sub);

  try {
    const result = await faunaFetch({
      query: `
        query ($netlifyID: ID!) {
          getUserByNetlifyID(netlifyID: $netlifyID) {
            stripeID
          }
        }
      `,
      variables: {
        netlifyID: user.sub,
      },
    });

    const { stripeID } = result.data.getUserByNetlifyID;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${identity.url}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${identity.url}/canceled.html`,
      customer: stripeID,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
    };
  } catch (e) {
    console.error(JSON.stringify(e.message, null, 2));
    return {
      statusCode: 400,
      body: "Not found",
    };
  }
};
