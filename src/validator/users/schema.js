const Joi = require('joi');
 
const UserPayloadSchema = Joi.object({
  role: Joi.string().required(),
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { UserPayloadSchema };
