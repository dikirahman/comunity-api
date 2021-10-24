const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class OrganizationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addOrganization({owner, name}) {
    const id = `org-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    
    const query = {
      text: `INSERT INTO organizations (id, owner, name, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING Id`,
      values: [id, owner, name, createdAt, updatedAt],
    }

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      // return fail
      throw new InvariantError('Organisasi gagal dibuat');
    }

    return result.rows[0].id;
  }
}

module.exports = OrganizationsService;
