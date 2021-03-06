/* eslint-disable camelcase */

exports.shorthands = undefined;
 
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    role_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    profession: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    about: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    website: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    username: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    email: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};
 
exports.down = (pgm) => {
  pgm.dropTable('users');
};
