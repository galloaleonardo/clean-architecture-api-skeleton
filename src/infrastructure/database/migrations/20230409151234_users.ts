import { Knex } from 'knex';
import { ApplicationConfig } from '../../config/application-config';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(ApplicationConfig.USERS_TABLE, (t) => {
    t.string('id').primary();
    t.string('email').notNullable().unique();
    t.string('first_name').notNullable();
    t.string('last_name').notNullable();
    t.string('password_hash').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ApplicationConfig.USERS_TABLE);
}
