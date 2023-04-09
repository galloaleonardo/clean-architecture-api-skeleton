import { Application } from 'express';
import { rateLimiter } from '../middlewares/rate-limit';
import { userRoutes } from './endpoints/user';

export const setupRoutes = (app: Application): void => {
  app.use('/users', rateLimiter, userRoutes);
};
