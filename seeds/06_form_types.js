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
          id: 1,
          name: 'Title',
          slug: 'title',
        },
        {
          id: 2,
          name: 'Description',
          slug: 'desctiption',
        },
      ]);
    });
};
