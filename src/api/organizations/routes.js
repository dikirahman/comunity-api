const routes = (handler) =>  [
  {
    method: 'POST',
    path: '/organizations',
    handler: handler.postOrganizationHandler,
    options: {
      auth: 'comunityapp_jwt'
    }
  }
];

module.exports = routes;