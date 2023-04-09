/* eslint-disable no-unused-vars */
import { RequestModel } from '../requests/RequestModel';
import { ResponseModel } from '../responses/ResponseModel';

export interface Controller<T> {
  handle(data: RequestModel): Promise<ResponseModel<T>>
}
