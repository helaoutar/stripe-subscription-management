/* eslint-disable no-undef */
exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ["sub:free"],
      },
    }),
  };
};
