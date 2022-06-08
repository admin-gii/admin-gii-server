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
        },
        {
          name: 'Description',
          slug: 'desctiption',
        },
      ]);
    });
};
