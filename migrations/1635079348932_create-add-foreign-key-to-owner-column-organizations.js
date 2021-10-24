exports.shorthands = undefined;
 
exports.up = (pgm) => {
  // memberikan constraint foreign key pada owner terhadap kolom id dari tabel users
  pgm.addConstraint('organizations', 'fk_organizations.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};
 
exports.down = (pgm) => {
  // menghapus constraint fk_organizations.owner_users.id pada tabel organizations
  pgm.dropConstraint('organizations', 'fk_organizations.owner_users.id');
};