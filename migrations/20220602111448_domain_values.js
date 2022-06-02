/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('domain_values', (table) => {
    table.increments('id').primary();
    table.text('value');
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
    table.uuid('group_id').notNullable();
    table.boolean('has_relation').defaultTo(false);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
