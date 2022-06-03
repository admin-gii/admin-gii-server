/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('domain_values')
    .del()
    .then(() => {
      return knex('domain_values').insert([
        {
          id: 1,
          domain_field_id: 2,
          domain_id: 1,
          value: 'Title',
          group_id: '1a852ffa-4806-4676-88b4-6649800d3ac4',
        },
        {
          id: 2,
          domain_field_id: 1,
          domain_id: 1,
          value: 'Description',
          group_id: '1a852ffa-4806-4676-88b4-6649800d3ac4',
        },
      ]);
    });
};
