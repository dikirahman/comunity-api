const MembersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'members',
  version: '1.0.0',
  register: async (server, { 
    membersService,
    organizationsService, 
    validator 
  }) => {
    
    const membersHandler = new MembersHandler(
    membersService,
    organizationsService,
    validator
    ); 
    server.route(routes(membersHandler));
  },
};
