// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config();
const { DB_USER, DB_PASS, DB_NAME } = process.env;

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      connectionString: `postgres://${DB_USER}:${DB_PASS}@postgres:5432/${DB_NAME}`,
    },
  },
};
