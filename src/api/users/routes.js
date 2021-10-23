const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'PUT',
    path: '/users',
    handler: handler.putProfileUserByIdhandler,
  },
];

module.exports = routes;
