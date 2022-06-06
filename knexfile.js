// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config();
const { DB_USER, DB_PASS, DB_NAME, DB_PORT, DB_HOST, NODE_ENV } = process.env;

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      connectionString: `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      connectionString: `postgres://${DB_USER}:${DB_PASS}@postgres:5432/${DB_NAME}`,
    },
  },
};
