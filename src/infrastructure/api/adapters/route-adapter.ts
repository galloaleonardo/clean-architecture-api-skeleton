import {
  Request, Response, NextFunction,
} from 'express';
import { DefaultApplicationError } from '../../../application/errors/DefaultApplicationError';
import { Controller } from '../../../application/interfaces/controllers/Controller';

export const routeAdapter = <T>(controller: Controller<T>) => async (request: Request, response: Response, next: NextFunction) => Promise.resolve(
  controller.handle({
    query: request.query,
    params: request.params,
    body: request.body,
    headers: request.headers,
  }),
)
  .then((controllerResponse) => {
    response
      .status(controllerResponse.statusCode)
      .json(controllerResponse.body);
    return next();
  })
  .catch((error: DefaultApplicationError) => {
    response
      .status(error.statusCode)
      .json({ errorType: error.name, errorMessage: error.message });

    next();
  });
