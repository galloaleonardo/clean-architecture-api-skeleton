import { DefaultApplicationError } from './DefaultApplicationError';

export class ValidationError extends DefaultApplicationError {
  name = 'ValidationError';

  statusCode = 400;
}
