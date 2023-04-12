import { Application } from 'express';
import { userRoutes } from './endpoints/user';

export const setupRoutes = (app: Application): void => {
  app.use('/users', userRoutes);
};
