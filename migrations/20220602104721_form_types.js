/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('form_types', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('slug').unique().notNullable();
    table
      .integer('domain_id')
      .references('id')
      .inTable('domains')
      .onDelete('CASCADE');
    table
      .integer('domain_label_field_id')
      .references('id')
      .inTable('domain_fields')
      .onDelete('CASCADE');
    table
      .integer('domain_value_field_id')
      .references('id')
      .inTable('domain_fields')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('form_types');
};
