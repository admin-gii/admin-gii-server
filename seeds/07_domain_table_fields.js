/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('domain_table_fields')
    .del()
    .then(() => {
      return knex('domain_table_fields').insert([
        {
          domain_field_id: 2,
          domain_id: 1,
        },
        {
          domain_field_id: 1,
          domain_id: 1,
        },
      ]);
    });
};
