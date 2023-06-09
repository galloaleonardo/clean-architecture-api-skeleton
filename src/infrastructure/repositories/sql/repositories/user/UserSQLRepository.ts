import { RepositoryError } from '../../../../../application/errors/RepositoryError';
import { ICreateUserRepository } from '../../../../../application/interfaces/repositories/ICreateUserRepository';
import { IFindUserByEmailRepository } from '../../../../../application/interfaces/repositories/IFindUserByEmailRepository';
import { CreateUserData } from '../../../../../domain/models/user/data/CreateUserData';
import { User } from '../../../../../domain/models/user/User';
import { ApplicationConfig } from '../../../../config/application-config';
import { db } from '../../../../database/connection';

export class UserSQLRepository implements ICreateUserRepository, IFindUserByEmailRepository {
  private readonly table = ApplicationConfig.USERS_TABLE || 'users';

  async create(data: CreateUserData): Promise<User> {
    try {
      await db<User>(this.table).insert(data);

      return data;
    } catch (error) {
      const err = error as Error;
      const repositoryError = new RepositoryError('Could not create user');

      repositoryError.stack = err?.stack as string;

      throw repositoryError;
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await db<User>(this.table)
        .select('*')
        .where('email', email)
        .first();

      return user as User;
    } catch (error) {
      const err = error as Error;
      const repositoryError = new RepositoryError('Could not find user by e-mail');

      repositoryError.stack = err?.stack as string;

      throw repositoryError;
    }
  }
}
