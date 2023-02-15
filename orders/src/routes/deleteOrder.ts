import express, { Request, Response, NextFunction } from 'express';

import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@dstavila-gittix/common';
import { Order, OrderStatus } from '../models/order';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
      if (!order) {
        throw new NotFoundError();
      }
      if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
      }
      order.status = OrderStatus.Cancelled;
      order.save();
      res.send(order);
    } catch (error) {
      next(error);
    }
  }
);

export { router as deleteOrderRouter };
