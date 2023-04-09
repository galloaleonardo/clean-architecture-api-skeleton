import knex from 'knex';
import { ApplicationConfig } from '../config/application-config';

const connectionConfig = require('./connection-config');

type Environment = 'development' | 'production'

const env = ApplicationConfig.NODE_ENV as Environment;

export const db = knex(connectionConfig[env]);
