import { DefaultApplicationError } from './DefaultApplicationError';

export class UnprocessableEntity extends DefaultApplicationError {
  name = 'UnprocessableEntity';

  statusCode = 422;
}
