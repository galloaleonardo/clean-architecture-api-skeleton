/* eslint-disable no-unused-vars */
import { User } from '../../../domain/models/user/User';

export interface IFindUserByEmailRepository {
  findByEmail(email: string): Promise<User | never>
}
