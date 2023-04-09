/* eslint-disable no-unused-vars */
import { CreateUserDataIncomplete } from '../../models/user/data/CreateUserDataIncomplete';
import { User } from '../../models/user/User';

export interface CreateUserUseCase {
  create(data: CreateUserDataIncomplete): Promise<User> | never
}
