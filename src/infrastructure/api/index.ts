import * as dotenv from 'dotenv';
import express from 'express';
import { ApplicationConfig } from '../config/application-config';
import { handleResponse } from './middlewares/handle-response';
import { rateLimiter } from './middlewares/rate-limit';
import { setupRoutes } from './routes/setup';

dotenv.config();

export const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use(handleResponse);

setupRoutes(app);

const port = ApplicationConfig.APPLICATION_PORT;

app.listen(port, () => {
  console.log(`Server listening at port ${port}.`);
});
