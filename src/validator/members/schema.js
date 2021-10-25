const Joi = require('joi');
 
const MemberPayloadSchema = Joi.object({
  organizationId: Joi.string().required(),
  userId: Joi.string().required(),
  role: Joi.string().required(),
});

module.exports = { MemberPayloadSchema };
