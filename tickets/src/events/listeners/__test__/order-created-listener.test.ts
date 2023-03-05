import mongoose from 'mongoose';
import { OrderCreatedEvent, OrderStatus } from '@dstavila-gittix/common';
import { OrderCreatedListener } from '../orders-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  //create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = new Ticket({
    title: 'Concert',
    price: 99,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  // Create the fake data event
  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: new mongoose.Types.ObjectId().toHexString(),
    expiresAt: 'alksjdlkasjdklasj',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};
