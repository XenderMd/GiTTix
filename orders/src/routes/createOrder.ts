import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';

import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from '@dstavila-gittix/common';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 60;

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => {
        return mongoose.Types.ObjectId.isValid(input);
      })
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { ticketId } = req.body;
    try {
      // Find the ticket the user is trying to order in the database
      const ticket = await Ticket.findById(ticketId);
      if (!ticket) {
        throw new NotFoundError();
      }

      // Make sure that this ticket is not already reserved
      // Run query to look at all the orders. Find an order where the ticket is
      // the ticket we just found *and* the order's status is *not* cancelled.
      // If we find an order, that menas that the ticket *is* reserved

      const isReserved = await ticket.isReserved!();

      if (isReserved) {
        throw new BadRequestError('Ticket is not available');
      }

      // Calculate an expiration date for this order
      const expiration = new Date();
      expiration.setSeconds(
        expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS
      );

      // Build the order and save it to the database
      const order = new Order({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket: ticket,
      });

      await order.save();

      // Publish an event saying that an order was created
      new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version || 0,
        status: order.status,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
          id: ticket.id,
          price: ticket.price,
        },
      });

      res.status(201).send(order);
    } catch (error) {
      next(error);
    }
  }
);

export { router as createOrderRouter };
