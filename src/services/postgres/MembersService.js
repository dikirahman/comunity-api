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
    const id = `org-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: `INSERT INTO members
      values($1, $2, $3, $4, $5)
      RETURNING Id`,
      values: [id, organizationId, userId, role, createdAt],
    }

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      // return fail
      throw new InvariantError('Gagal menambahkan member');
    }

    return result.rows[0].id;
  }

  async verifyOrganizationOwner(id) {
    const query = {
      text: 'SELECT * FROM organizations WHERE id = $1',
      values: [id],
    };

    // run query
    const result = await this._pool.query(query);

    // if note not found
    if (!result.rows.length) {
      throw new NotFoundError('Organisasi tidak ditemukan');
    }

    // if note found
    const note = result.rows[0];

    // if note is not hers
    if (note.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }       
  }

  async verifyOrganizationRole(id) {
    const query = {
      text: 'SELECT role FROM members WHERE user_id = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    const member = result.rows[0];

    if (member.role !== 1) {
      throw new AuthorizationError('Hanya admin yang bisa menambahkan member');
    }
  }
}

module.exports = MembersService;
