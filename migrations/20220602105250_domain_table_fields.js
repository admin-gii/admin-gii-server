/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('domain_table_fields', (table) => {
    table.increments('id').primary();
    table
      .integer('domain_field_id')
      .references('id')
      .inTable('domain_fields')
      .onDelete('CASCADE');
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
  return knex.schema.dropTable('domain_table_fields');
};
