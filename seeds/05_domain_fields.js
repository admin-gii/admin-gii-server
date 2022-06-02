/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('domain_fields')
    .del()
    .then(() => {
      return knex('domain_fields').insert([
        {
          id: 1,
          name: 'Title',
          slug: 'title',
          domain_id: 1,
        },
        {
          id: 2,
          name: 'Description',
          slug: 'desctiption',
          domain_id: 1,
        },
      ]);
    });
};
