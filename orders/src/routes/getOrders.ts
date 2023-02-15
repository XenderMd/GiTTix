import express, { Request, Response, NextFunction } from 'express';
import { Order } from '../models/order';
import { requireAuth } from '@dstavila-gittix/common';

const router = express.Router();

router.get(
  '/api/orders',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await Order.find({ userId: req.currentUser?.id }).populate(
        'ticket'
      );
      res.send(orders);
    } catch (error) {
      next(error);
    }
  }
);

export { router as getOrdersRouter };
