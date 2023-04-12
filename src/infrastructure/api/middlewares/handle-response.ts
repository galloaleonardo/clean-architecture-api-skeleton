import {
  Request, Response, NextFunction,
} from 'express';

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
        data: message,
        timestamp: Date.now(),
        status: body?.errorType,
        statusCode: response.statusCode,
      };
    }

    return oldJson.call(response, newResponse);
  };

  next();
}
