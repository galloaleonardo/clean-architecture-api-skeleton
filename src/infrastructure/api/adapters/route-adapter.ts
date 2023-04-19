import {
  Request, Response, NextFunction,
} from 'express';
import { DefaultApplicationError } from '../../../application/errors/DefaultApplicationError';
import { IController } from '../../../application/interfaces/controllers/IController';

export const routeAdapter = <T>(controller: IController<T>) => async (request: Request, response: Response, next: NextFunction) => Promise.resolve(
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
