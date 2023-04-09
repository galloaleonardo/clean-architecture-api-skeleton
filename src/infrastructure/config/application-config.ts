import dotenv from 'dotenv';
import { resolve } from 'path';

const dotenvFilePath = resolve(__dirname, '..', '..', '..', '.env');
dotenv.config({ path: dotenvFilePath });

export const ApplicationConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  APPLICATION_PORT: process.env.APPLICATION_PORT || '3000',
  DATABASE_CLIENT: process.env.DATABASE_CLIENT || '',
  DATABASE_PORT: process.env.DATABASE_PORT || '',
  DATABASE_HOST: process.env.DATABASE_HOST || '',
  DATABASE_NAME: process.env.DATABASE_NAME || '',
  DATABASE_USER: process.env.DATABASE_USER || '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
  USERS_TABLE: process.env.USERS_TABLE || '',
};
