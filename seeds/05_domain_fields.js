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
          name: 'Title',
          slug: 'title',
          domain_id: 1,
        },
        {
          name: 'Description',
          slug: 'desctiption',
          domain_id: 1,
        },
      ]);
    });
};
