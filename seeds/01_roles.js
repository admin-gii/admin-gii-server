/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('roles')
    .del()
    .then(() => {
      return knex('roles').insert([
        {
          id: 1,
          name: 'Admin',
          slug: 'admin',
        },
        {
          id: 2,
          name: 'User',
          slug: 'user',
        },
      ]);
    });
};
