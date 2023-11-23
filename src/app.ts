import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoute } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

//application route.

app.use('/', UserRoute);

//route error handler
app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route is not found',
  });
});

export default app;
