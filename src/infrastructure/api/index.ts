import * as dotenv from 'dotenv';
import express from 'express';
import { ApplicationConfig } from '../config/application-config';
import { setupRoutes } from './routes/setup';

dotenv.config();

export const app = express();

app.use(express.json());

setupRoutes(app);

const port = ApplicationConfig.APPLICATION_PORT;

app.listen(port, () => {
  console.log(`Server listening at port ${port}.`);
});
