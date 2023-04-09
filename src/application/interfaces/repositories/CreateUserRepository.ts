/* eslint-disable no-unused-vars */
import { CreateUserData } from '../../../domain/models/user/data/CreateUserData';
import { User } from '../../../domain/models/user/User';

export interface CreateUserRepository {
  create(data: CreateUserData): Promise<User | never>
}
