import { ResponseHandler } from '../../application/interfaces/responses/ResponseHandler';
import { ResponseModel } from '../../application/interfaces/responses/ResponseModel';

export class GenericCreatedResponse<T> implements ResponseHandler<T> {
  async response(body: T): Promise<ResponseModel<T>> {
    return {
      body,
      statusCode: 201,
    };
  }
}
