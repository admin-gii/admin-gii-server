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
  jwt_secret: env.JWT_SECRET,
};
