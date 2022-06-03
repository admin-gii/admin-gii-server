/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('domain_fields', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('slug').unique().notNullable();
    table
      .integer('domain_id')
      .references('id')
      .inTable('domains')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('domain_fields');
};
