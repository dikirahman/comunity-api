const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { mapDBToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class MembersService {
  constructor() {
    this._pool = new Pool();
  }

  async addMember(organizationId, userId, role) {
    const id = `mem-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: `INSERT INTO members (id, organization_id, user_id, role, created_at)
      values ($1, $2, $3, $4, $5)
      RETURNING id`,
      values: [id, organizationId, userId, role, createdAt],
    }

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      // return fail
      throw new InvariantError('Gagal menambahkan member');
    }

    return result.rows[0].id;
  }

  async verifyMemberRole(organizationId, userId) {
    const query = {
      text: 'SELECT role FROM members WHERE organization_id = $1 AND user_id = $2',
      values: [organizationId, userId],
    };

    const result = await this._pool.query(query);

    const member = result.rows[0];

    if (member.role !== 1) {
      throw new AuthorizationError('Hanya admin dan owner yang bisa menambahkan member');
    }
  }

  async verifyMemberStatus(organizationId, userId) {
    const query = {
      text: 'SELECT * FROM members WHERE organization_id = $1 AND user_id = $2',
      values: [organizationId, userId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length) {
      throw new NotFoundError('user sudah terdaftar sebagai member');
    }
  }
}

module.exports = MembersService;
