const { env } = process;

export const pg = {
  host: env.DB_HOST || 'localhost',
  port: env.DB_PORT || 5432,
  user: env.DB_USER || 'postgres',
  password: env.DB_PASS || '5555',
  database: env.DB_NAME || 'bot_constructor',
};
