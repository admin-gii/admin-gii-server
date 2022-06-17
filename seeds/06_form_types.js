/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('form_types')
    .del()
    .then(() => {
      return knex('form_types').insert([
        {
          name: 'Title',
          slug: 'title',
          domain_id: 1,
          domain_label_field_id: 2,
          domain_value_field_id: 1,
        },
        {
          name: 'Description',
          slug: 'desctiption',
          domain_id: 1,
          domain_label_field_id: 1,
          domain_value_field_id: 2,
        },
      ]);
    });
};
