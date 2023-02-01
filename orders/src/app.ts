import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { createOrderRouter } from './routes/createOrder';
import { deleteOrderRouter } from './routes/deleteOrder';
import { getOrderRouter } from './routes/getOrder';
import { getOrdersRouter } from './routes/getOrders';

import {
  asyncHandler,
  errorHandler,
  NotFoundError,
  currentUser,
} from '@dstavila-gittix/common';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(getOrderRouter);
app.use(getOrdersRouter);
app.use(deleteOrderRouter);
app.use(currentUser);
app.all(
  '*',
  asyncHandler(() => {
    throw new NotFoundError();
  })
);

app.use(errorHandler);

export { app };
