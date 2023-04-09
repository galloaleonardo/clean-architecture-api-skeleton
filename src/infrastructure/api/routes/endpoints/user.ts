import { Router } from 'express';
import { createUserControllerFactory } from '../../../../main/factories/controllers/create-user-controller-factory';
import { routeAdapter } from '../../adapters/route-adapter';

export const userRoutes = Router();

const { createUserCreateController } = createUserControllerFactory();

userRoutes.post('/', routeAdapter(createUserCreateController));
