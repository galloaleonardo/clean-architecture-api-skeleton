/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */

import { IUUIDGenerator } from '../../../../application/interfaces/helpers/IUUIDGenerator';
import { IFindUserByEmailRepository } from '../../../../application/interfaces/repositories/IFindUserByEmailRepository';
import { IPasswordHashing } from '../../../../application/interfaces/security/IPasswordHashing';

interface UserProperties {
  id?: string;
  email: string,
  firstName: string,
  lastName: string,
  password: string,
}

export class UserEntity {
  private _id: string | undefined;

  private _email: string;

  private _firstName: string;

  private _lastName: string;

  private _password: string;

  public constructor(
    user: UserProperties,
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly uuid: IUUIDGenerator,
    private readonly passwordHashing: IPasswordHashing,
  ) {
    this._id = this.setId(user.id);
    this._email = user.email;
    this._firstName = user.firstName;
    this._lastName = user.lastName;
    this._password = this.setPassword(user);
  }

  public id(): string | undefined {
    return this._id;
  }

  public email(): string {
    return this._email;
  }

  public firstName(): string {
    return this._firstName;
  }

  public lastName(): string {
    return this._lastName;
  }

  public password(): string {
    return this._password;
  }

  private setId(id: string | undefined) {
    if (id) {
      return id;
    }

    return this.uuid.make();
  }

  private setPassword(user: UserProperties): string {
    if (user.id) {
      return user.password;
    }

    return this.passwordHashing.hash(user.password);
  }

  public async isUniqueEmail(): Promise<boolean> {
    const existingUser = await this.findUserByEmailRepository.findByEmail(this._email);

    return !existingUser;
  }
}
