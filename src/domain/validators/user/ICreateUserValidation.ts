/* eslint-disable no-unused-vars */

import { CreateUserDataIncomplete } from '../../models/user/data/CreateUserDataIncomplete';

export interface ICreateUserValidation {
  validate(data: CreateUserDataIncomplete): Promise<CreateUserDataIncomplete | string[]>
}
