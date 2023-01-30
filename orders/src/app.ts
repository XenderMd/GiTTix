import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

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

app.use(currentUser);

app.all(
  '*',
  asyncHandler(() => {
    throw new NotFoundError();
  })
);

app.use(errorHandler);

export { app };
