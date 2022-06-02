/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  return knex('domains_roles')
    .del()
    .then(() => {
      return knex('domains_roles').insert([
        {
          id: 1,
          role_id: 2,
          domain_id: 1,
        },
        {
          id: 2,
          role_id: 1,
          domain_id: 1,
        },
      ]);
    });
};
