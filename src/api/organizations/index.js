const OrganizationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'organizations',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const organizationsHandler = new OrganizationsHandler(service, validator); 
    server.route(routes(organizationsHandler));
  },
};
