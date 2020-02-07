
exports.up = function(knex) {
  return knex.raw(`
    create table "table"
    (
      text text
    );
  `);
};

exports.down = function(knex) {
  return knex.raw(`
    drop table "table"
  `);
};
