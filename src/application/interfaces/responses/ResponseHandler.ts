/* eslint-disable no-unused-vars */

import { ResponseModel } from './ResponseModel';

export interface ResponseHandler<T> {
  response(body: T): Promise<ResponseModel<T>>
}
