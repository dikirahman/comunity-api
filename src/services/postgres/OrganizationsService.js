const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class OrganizationsService {
  constructor(memberService) {
    this._pool = new Pool();
    this._memberService = memberService;
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

  async verifyOrganizationRole(organizationId, userId) {
    try {
      await this.verifyOrganizationOwner(organizationId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      try {
        await this._memberService.verifyMemberRole(organizationId, userId);
      } catch {
        throw error;
      }
    }
  }
}

module.exports = OrganizationsService;
