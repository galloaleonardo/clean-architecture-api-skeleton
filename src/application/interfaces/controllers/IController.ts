/* eslint-disable no-unused-vars */
import { RequestModel } from '../requests/RequestModel';
import { ResponseModel } from '../responses/ResponseModel';

export interface IController<T> {
  handle(data: RequestModel): Promise<ResponseModel<T>>
}
