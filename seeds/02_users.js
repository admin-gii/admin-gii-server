/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require('bcryptjs');
const generateHashPassword = async (password) => {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

const passwords = [];

(async () => {
  const password = await generateHashPassword('123456');
  passwords.push(password);
})();

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert([
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'example@exp.com',
          phone: 998914195596,
          role_id: 1,
          hash: passwords[0],
          status: true,
        },
        {
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'example@exp2.com',
          phone: 998914195597,
          role_id: 2,
          hash: passwords[0],
          status: true,
        },
      ]);
    });
};
