import { RepositoryError } from '../../../../../application/errors/RepositoryError';
import { CreateUserRepository } from '../../../../../application/interfaces/repositories/CreateUserRepository';
import { CreateUserData } from '../../../../../domain/models/user/data/CreateUserData';
import { User } from '../../../../../domain/models/user/User';
import { db } from '../../../../database/connection';

export class UserSQLRepository implements CreateUserRepository {
  private readonly table = process.env.USERS_TABLE || 'users';

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
}
