const { env } = process;

export const cfg = {
  knex: {
    config: {
      client: 'postgresql',
      connection: {
        host: env.DB_HOST,
        database: env.DB_NAME,
        user: env.DB_USER,
        password: env.DB_PASS,
        port: env.DB_PORT,
      },
    },
  },
};
