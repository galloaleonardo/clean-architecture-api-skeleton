/* eslint-disable no-unused-vars */
import { User } from '../../../domain/models/user/User';

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<User | never>
}
