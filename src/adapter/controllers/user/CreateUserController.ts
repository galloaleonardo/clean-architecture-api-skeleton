/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */

import { ValidationError } from '../../../application/errors/ValidationError';
import { IController } from '../../../application/interfaces/controllers/IController';
import { RequestModel } from '../../../application/interfaces/requests/RequestModel';
import { ResponseHandler } from '../../../application/interfaces/responses/ResponseHandler';
import { ResponseModel } from '../../../application/interfaces/responses/ResponseModel';
import { CreateUserDataIncomplete } from '../../../domain/models/user/data/CreateUserDataIncomplete';
import { User } from '../../../domain/models/user/User';
import { ICreateUserUseCase } from '../../../domain/use-cases/user/ICreateUserUseCase';

type RequestOptionalBody = RequestModel<CreateUserDataIncomplete>;

export class CreateUserController implements IController<User | never> {
  constructor(
    private readonly createUser: ICreateUserUseCase,
    private readonly presenter: ResponseHandler<User>,
  ) {}

  async handle(data: RequestOptionalBody): Promise<ResponseModel<User>> {
    if (!data?.body) {
      throw new ValidationError('Missing body');
    }

    const userData: CreateUserDataIncomplete = {
      email: data.body.email,
      first_name: data.body.first_name,
      last_name: data.body.last_name,
      password: data.body.password,
    };

    const user = await this.createUser.create(userData);

    return this.presenter.response(user);
  }
}
