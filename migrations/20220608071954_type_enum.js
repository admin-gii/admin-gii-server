/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(`
    CREATE TYPE domain_value_type AS ENUM ( 'text', 'number', 'email', 'color', 'range', 'tel', 'search', 'file', 'password', 'hidden', 'url', 'textarea', 'select', 'checkbox', 'radio', 'date', 'time', 'datetime');
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.raw(`
    DROP TYPE domain_value_type;
  `);
};
