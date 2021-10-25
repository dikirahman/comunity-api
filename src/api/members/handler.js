const ClientError = require('../../exceptions/ClientError');

class MembersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postMemberHandler(request, h) {
    try {
      this._validator.validateMemberPayload(request.payload);

      const {organizationId, userId, role} = request.payload;

      const {id: credentialId } = request.auth.credentials;

      await this._service.verifyOrganizationRole(id);

    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });

        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });

      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = MembersHandler;
