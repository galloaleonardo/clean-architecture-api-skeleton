/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */

import { CreateUserDataIncomplete } from '../../../domain/models/user/data/CreateUserDataIncomplete';
import { UserEntity } from '../../../domain/models/user/entity/UserEntity';
import { User } from '../../../domain/models/user/User';
import { ICreateUserUseCase } from '../../../domain/use-cases/user/ICreateUserUseCase';
import { ICreateUserValidation } from '../../../domain/validators/user/ICreateUserValidation';
import { UnprocessableEntity } from '../../errors/UnprocessableEntityError';
import { ValidationError } from '../../errors/ValidationError';
import { IUUIDGenerator } from '../../interfaces/helpers/IUUIDGenerator';
import { ICreateUserRepository } from '../../interfaces/repositories/ICreateUserRepository';
import { IFindUserByEmailRepository } from '../../interfaces/repositories/IFindUserByEmailRepository';
import { IPasswordHashing } from '../../interfaces/security/IPasswordHashing';

export class CreateUser implements ICreateUserUseCase {
  constructor(
    private readonly createUserValidation: ICreateUserValidation,
    private readonly createUserRepository: ICreateUserRepository,
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly uuid: IUUIDGenerator,
    private readonly passwordHashing: IPasswordHashing,
  ) {}

  async create(data: CreateUserDataIncomplete): Promise<User> {
    const validatedUser = await this.createUserValidation.validate(data);

    if (Array.isArray(validatedUser)) {
      throw new UnprocessableEntity(JSON.stringify(validatedUser));
    }

    const user = new UserEntity(
      {
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        password: data.password,
      },
      this.findUserByEmailRepository,
      this.uuid,
      this.passwordHashing,
    );

    if (!await user.isUniqueEmail()) {
      throw new ValidationError('The email already in use');
    }

    return this.createUserRepository.create({
      id: user.id() as string,
      email: user.email(),
      first_name: user.firstName(),
      last_name: user.lastName(),
      password_hash: user.password(),
    });
  }
}
