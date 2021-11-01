const routes = (handler) => [
  {
    method: 'POST',
    path: '/members',
    handler: handler.postMemberHandler,
    options: {
      auth: 'comunityapp_jwt',
    },
  },
];

module.exports = routes;
