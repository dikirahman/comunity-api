exports.shorthands = undefined;
 
exports.up = (pgm) => {
  // memberikan constraint foreign key pada organization_id terhadap kolom id dari tabel organizations
  pgm.addConstraint('members', 'fk_members.organization_id_organizations.id', 'FOREIGN KEY(organization_id) REFERENCES organizations(id) ON DELETE CASCADE');
};
 
exports.down = (pgm) => {
  // menghapus constraint fk_members.organization_id_organizations.id pada tabel members
  pgm.dropConstraint('members', 'fk_members.organization_id_organizations.id');
};