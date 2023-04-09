/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */

import { CreateUserDataIncomplete } from '../../../domain/models/user/data/CreateUserDataIncomplete';
import { User } from '../../../domain/models/user/User';
import { CreateUserUseCase } from '../../../domain/use-cases/user/CreateUserUseCase';
import { UUIDGenerator } from '../../interfaces/helpers/UUIDGenerator';
import { CreateUserRepository } from '../../interfaces/repositories/CreateUserRepository';
import { PasswordHashing } from '../../interfaces/security/PasswordHashing';

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly uuid: UUIDGenerator,
    private readonly passwordHashing: PasswordHashing,
  ) {}

  async create(data: CreateUserDataIncomplete): Promise<User> {
    const uniqueId = this.uuid.make();
    const hashedPassword = await this.passwordHashing.hash(data.password);

    const userData = {
      id: uniqueId,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password_hash: hashedPassword,
    };

    return this.createUserRepository.create(userData);
  }
}
