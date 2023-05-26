import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
} from '@dstavila-gittix/common';

import { Order } from '../models/order';

const router = express.Router();

router.post(
  '/api/payments',
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send({ success: true });
    } catch (error) {
      next(error);
    }
  }
);

export { router as createChargeRouter };
