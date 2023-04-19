import {
  Request, Response, NextFunction,
} from 'express';
import { Logger } from '../../../main/factories/shared/logger';

const getErrorMessage = (message: string): unknown => {
  try {
    return JSON.parse(message);
  } catch (error) {
    return message;
  }
};

export function handleResponse(request: Request, response: Response, next: NextFunction) {
  const oldJson = response.json;

  response.json = (body: any): any => {
    let newResponse = {
      data: body,
      timestamp: Date.now(),
      status: 'ok',
      statusCode: response.statusCode,
    };

    if (body?.errorType || body?.errorMessage) {
      const message = getErrorMessage(body.errorMessage);

      newResponse = {
        data: { error: message },
        timestamp: Date.now(),
        status: body?.errorType,
        statusCode: response.statusCode,
      };

      switch (true) {
        case response.statusCode >= 500:
          Logger.error({ error: message });
          break;

        default:
          Logger.warn({ error: message });
          break;
      }

      return oldJson.call(response, newResponse);
    }

    Logger.info({ data: body });
    return oldJson.call(response, newResponse);
  };

  next();
}
