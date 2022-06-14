/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('form_type_options', (table) => {
    table.increments('id').primary();
    table
      .integer('form_type_id')
      .references('id')
      .inTable('form_types')
      .onDelete('CASCADE');
    table.string('label');
    table.string('value');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
