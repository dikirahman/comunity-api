const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({role, name, username, email, password}) {
    // verify username
    await this.verifyNewUsername(username);

    // verify email
    await this.verifyNewEmail(email);

    const id = `user-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users (id, role_id, name, username, email, password, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, role, name, username, email, hashedPassword, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  // verify username
  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    // if username  already in database
    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.')
    }
  }

  async verifyNewEmail(email) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    // if email  already in database
    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Email sudah digunakan.')
    }
  }

  async editProfileUserById(id, {name, profession, about, website}) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE users SET name = $1, profession = $2, about = $3, website = $4 WHERE id = $5 RETURNING id',
      values: [name, profession, about, website, id],
    };
    const result = await this._pool.query(query);

    // if id not found
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui user. Id tidak ditemukan');
    }
  }
}

module.exports = UsersService;
