const dotenv = require('dotenv');
dotenv.config();
const { env } = process;

export const cfg = {
  knex_dev: {
    config: {
      client: 'postgresql',
      connection: {
        host: 'localhost',
        database: env.DB_NAME,
        user: env.DB_USER,
        password: env.DB_PASS,
        port: env.DB_PORT,
      },
    },
  },
  knex_prod: {
    config: {
      client: 'postgresql',
      connection: {
        host: 'postgres',
        database: env.DB_NAME,
        user: env.DB_USER,
        password: env.DB_PASS,
        port: 5432,
      },
    },
  },
  jwt_secret: env.JWT_SECRET,
  node_env: env.NODE_ENV,
};
