/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('domain_from_fields')
    .del()
    .then(() => {
      return knex('domain_from_fields').insert([
        {
          domain_field_id: 2,
          form_type_id: 1,
          domain_id: 1,
        },
        {
          domain_field_id: 1,
          form_type_id: 1,
          domain_id: 1,
        },
      ]);
    });
};
