import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from '@dstavila-gittix/common';

import { Order } from '../models/order';
import { stripe } from '../stripe';

const router = express.Router();

router.post(
  '/api/payments',
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, orderId } = req.body;
      const order = await Order.findById(orderId);
      if (!order) {
        throw new NotFoundError();
      }
      if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
      }
      if (order.status === OrderStatus.Cancelled) {
        throw new BadRequestError('Cannot pay for a cancelled order');
      }
      await stripe.charges.create({
        currency: 'usd',
        amount: order.price * 100,
        source: token,
      });
      res.send({ success: true });
    } catch (error) {
      next(error);
    }
  }
);

export { router as createChargeRouter };
