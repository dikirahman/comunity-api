const InvariantError = require('../../exceptions/InvariantError');
const { OrganizationPayloadSchema } = require('./schema');
 
const OrganizationsValidator = {
  validateOrganizationPayload: (payload) => {
    const validationResult = OrganizationPayloadSchema.validate(payload);
 
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = OrganizationsValidator;
