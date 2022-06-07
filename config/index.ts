const dotenv = require('dotenv');
dotenv.config();
const { env } = process;

export const cfg = {
  knex: {
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
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: '1d',
  },

  node_env: env.NODE_ENV,
};
