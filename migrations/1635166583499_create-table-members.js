/* eslint-disable camelcase */

exports.shorthands = undefined;
 
exports.up = (pgm) => {
  pgm.createTable('members', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    organization_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    role: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    
  });
};
 
exports.down = (pgm) => {
  pgm.dropTable('members');
};
