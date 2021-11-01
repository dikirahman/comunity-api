const MembersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'members',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const membersHandler = new MembersHandler(service, validator); 
    server.route(routes(membersHandler));
  },
};
