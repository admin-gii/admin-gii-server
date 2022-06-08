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
          name: 'Admin',
          slug: 'admin',
        },
        {
          name: 'User',
          slug: 'user',
        },
      ]);
    });
};
