/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert([
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'example@exp.com',
          phone: 998914195596,
          role_id: 1,
          hash: 'sfkljfal',
          status: true,
        },
        {
          id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'example@exp2.com',
          phone: 998914195597,
          role_id: 2,
          hash: 'sfkljfal',
          status: true,
        },
      ]);
    });
};
