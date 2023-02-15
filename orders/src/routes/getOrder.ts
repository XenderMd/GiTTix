import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@dstavila-gittix/common';
import { Order } from '../models/order';

const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (mongoose.Types.ObjectId.isValid(req.params.orderId)) {
        const order = await Order.findById(req.params.orderId).populate(
          'ticket'
        );
        if (!order) {
          throw new NotFoundError();
        }
        if (order.userId !== req.currentUser!.id) {
          throw new NotAuthorizedError();
        }
        res.send(order);
      } else {
        throw new BadRequestError('Invalid order ID');
      }
    } catch (error) {
      next(error);
    }
  }
);

export { router as getOrderRouter };
