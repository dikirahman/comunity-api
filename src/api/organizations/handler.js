const ClientError = require('../../exceptions/ClientError');

class OrganizationsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postOrganizationHandler = this.postOrganizationHandler.bind(this);
  }

  async postOrganizationHandler(request, h) {
    try {
      this._validator.validateOrganizationPayload(request.payload);

      const {owner, name} = request.payload;

      const {id: credentialId} = request.auth.credentials;

      const organizationId = await this._service.addOrganization({
        owner: credentialId, name,
      });

      const response = h.response({
        status: 'success',
        message: 'Organisasi berhasil dibuat',
        data: {
          organizationId,
        },
      });

      response.code(201);
      return response;
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

module.exports = OrganizationsHandler;
