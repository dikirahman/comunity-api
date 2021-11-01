require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

// authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

// organizations
const organizations = require('./api/organizations');
const OrganizationsService = require('./services/postgres/OrganizationsService');
const OrganizationsValidator = require('./validator/organizations');

// members
const members = require('./api/members');
const MembersService = require('./services/postgres/MembersService');
const MembersValidator = require('./validator/members');

const init = async () => {
  // user service
  const usersService = new UsersService();
  // authentication service
  const authenticationsService = new AuthenticationsService();
  // member service 
  const membersService = new MembersService();
  // organization service
  const organizationsService = new OrganizationsService(membersService);

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // register plugin external
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // strategy jwt authentication
  server.auth.strategy('comunityapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  // register internal plugin
  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: organizations,
      options: {
        service: organizationsService,
        validator: OrganizationsValidator,
      }
    },
    {
      plugin: members,
      options: {
        membersService,
        organizationsService,
        validator: MembersValidator,
      }
    },
  ]);

  await server.start();

  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();