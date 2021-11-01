const ClientError = require('../../exceptions/ClientError');

class MembersHandler {
  constructor(membersService, organizationsService, validator) {
    this._membersService = membersService;
    this._organizationService = organizationsService;
    this._validator = validator;

    this.postMemberHandler = this.postMemberHandler.bind(this);
  }

  async postMemberHandler(request, h) {
    try {
      this._validator.validateMemberPayload(request.payload);

      const {organizationId, userId, role} = request.payload;

      const {id: credentialId } = request.auth.credentials;

      await this._membersService.verifyOrganizationOwner(id);

      await this._membersService.addMember(organizationId, userId, role)
      
      const response = h.response({
        status: 'success',
        message: 'Kolaborasi berhasil ditambahkan',
        data: {
          memberId,
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

module.exports = MembersHandler;
