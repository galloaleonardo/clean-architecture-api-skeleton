/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */

import { CreateUserDataIncomplete } from '../../../domain/models/user/data/CreateUserDataIncomplete';
import { UserEntity } from '../../../domain/models/user/entity/UserEntity';
import { User } from '../../../domain/models/user/User';
import { CreateUserUseCase } from '../../../domain/use-cases/user/CreateUserUseCase';
import { ICreateUserValidation } from '../../../domain/validators/user/ICreateUserValidation';
import { UnprocessableEntity } from '../../errors/UnprocessableEntityError';
import { ValidationError } from '../../errors/ValidationError';
import { UUIDGenerator } from '../../interfaces/helpers/UUIDGenerator';
import { CreateUserRepository } from '../../interfaces/repositories/CreateUserRepository';
import { FindUserByEmailRepository } from '../../interfaces/repositories/FindUserByEmailRepository';
import { PasswordHashing } from '../../interfaces/security/PasswordHashing';

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly createUserValidation: ICreateUserValidation,
    private readonly createUserRepository: CreateUserRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly uuid: UUIDGenerator,
    private readonly passwordHashing: PasswordHashing,
  ) {}

  async create(data: CreateUserDataIncomplete): Promise<User> {
    const validatedUser = await this.createUserValidation.validate(data);

    if (Array.isArray(validatedUser)) {
      throw new UnprocessableEntity(JSON.stringify(validatedUser));
    }

    const uniqueId = this.uuid.make();
    const hashedPassword = await this.passwordHashing.hash(data.password);

    const user = UserEntity.create(
      uniqueId,
      data.email,
      data.first_name,
      data.last_name,
      hashedPassword,
      this.findUserByEmailRepository,
    );

    if (!await user.isUniqueEmail()) {
      throw new ValidationError('The email already in use');
    }

    return this.createUserRepository.create({
      id: user.getId(),
      email: user.getEmail(),
      first_name: user.getFirstName(),
      last_name: user.getLastName(),
      password_hash: user.getHashedPassword(),
    });
  }
}
