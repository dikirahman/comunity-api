const Joi = require('joi');
 
const OrganizationPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { OrganizationPayloadSchema };
