const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class MembersService {
  constructor() {
    this._pool = new Pool();
  }

  async addMember({organizationId, userId, role}) {
    const id = `mem-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: `INSERT INTO members
      values($1, $2, $3, $4, $5)
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
      values: [organizatoinId, userId],
    };

    const result = await this._pool.query(query);

    const member = result.rows[0];

    if (member.role !== 1) {
      throw new AuthorizationError('Hanya admin yang bisa menambahkan member');
    }
  }
}

module.exports = MembersService;
