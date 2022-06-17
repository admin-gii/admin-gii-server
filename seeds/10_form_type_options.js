/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('form_type_options')
    .del()
    .then(() => {
      return knex('form_type_options').insert([
        {
          form_type_id: 2,
          label: 'First Name',
          value: 'Title',
        },
        {
          form_type_id: 1,
          label: 'First Name',
          value: 'Description',
        },
      ]);
    });
};
