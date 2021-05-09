/* eslint-disable no-undef */
const fetch = require("node-fetch");

exports.faunaFetch = async ({ query, variables }) => {
  try {
    const response = await fetch("https://graphql.fauna.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }).then((res) => res.json());
    return response;
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
  }
};
