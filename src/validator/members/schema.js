const Joi = require('joi');
 
const MemberPayloadSchema = Joi.object({
  organizationId: Joi.string().required(),
  userId: Joi.string().required(),
  role: Joi.number().required(),
});

module.exports = { MemberPayloadSchema };
