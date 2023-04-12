/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */

import { CreateUserRepository } from '../../../../application/interfaces/repositories/CreateUserRepository';
import { FindUserByEmailRepository } from '../../../../application/interfaces/repositories/FindUserByEmailRepository';

export class UserEntity {
  private constructor(
    private readonly id: string,
    private readonly email: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly passwordHash: string,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
  ) {}

  static create(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    passwordHash: string,
    findUserByEmailRepository: FindUserByEmailRepository,
  ): UserEntity {
    return new UserEntity(
      id,
      email,
      firstName,
      lastName,
      passwordHash,
      findUserByEmailRepository,
    );
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getHashedPassword(): string {
    return this.passwordHash;
  }

  async isUniqueEmail(): Promise<boolean> {
    const existingUser = await this.findUserByEmailRepository.findByEmail(this.email);

    return !existingUser;
  }
}
