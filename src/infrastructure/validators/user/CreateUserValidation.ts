import Joi, { ValidationError } from 'joi';
import { CreateUserDataIncomplete } from '../../../domain/models/user/data/CreateUserDataIncomplete';

const schema = Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export class CreateUserValidation {
  async validate(data: CreateUserDataIncomplete): Promise<CreateUserDataIncomplete | string[]> {
    try {
      const user = await schema.validateAsync(data, { abortEarly: false }) as CreateUserDataIncomplete;

      return user;
    } catch (error) {
      const err = error as ValidationError;

      const messages = err?.details?.map((e) => e.message) || [];

      return messages;
    }
  }
}
