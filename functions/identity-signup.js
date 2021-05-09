/* eslint-disable no-undef */
const faunaFetch = require("./utils/fauna").faunaFetch;

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);
  const stripeID = 1;

  await faunaFetch({
    query: `
      mutation ($netlifyID: ID!, $stripeID: ID!) {
        createUser(data: { netlifyID: $netlifyID, stripeID: $stripeID }) {
          netlifyID
          stripeID
        }
      }
    `,
    variables: {
      netlifyID: user.id,
      stripeID,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ["free"],
      },
    }),
  };
};
