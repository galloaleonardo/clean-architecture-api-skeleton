/* eslint-disable import/no-import-module-exports */

import { resolve } from 'path';
import { ApplicationConfig } from '../config/application-config';

module.exports = {
  development: {
    client: ApplicationConfig.DATABASE_CLIENT,
    connection: {
      host: ApplicationConfig.DATABASE_HOST,
      database: ApplicationConfig.DATABASE_NAME,
      user: ApplicationConfig.DATABASE_USER,
      password: ApplicationConfig.DATABASE_PASSWORD,
      port: parseInt(ApplicationConfig.DATABASE_PORT, 10),
    },
    pool: {
      min: 2,
      max: 10,
    },
    debug: false,
  },
  production: {
    client: ApplicationConfig.DATABASE_CLIENT,
    connection: {
      host: ApplicationConfig.DATABASE_HOST,
      database: ApplicationConfig.DATABASE_NAME,
      user: ApplicationConfig.DATABASE_USER,
      password: ApplicationConfig.DATABASE_PASSWORD,
      port: parseInt(ApplicationConfig.DATABASE_PORT, 10),
    },
    pool: {
      min: 2,
      max: 10,
    },
    debug: false,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: resolve(__dirname, 'migrations'),
  },
};
