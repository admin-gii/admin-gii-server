/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('domains_roles', (table) => {
    table.increments('id').primary();
    table
      .integer('domain_id')
      .references('id')
      .inTable('domains')
      .onDelete('CASCADE');
    table
      .integer('role_id')
      .references('id')
      .inTable('roles')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('domains_roles');
};
