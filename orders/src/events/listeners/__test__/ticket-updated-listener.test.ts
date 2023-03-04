import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';
import { TicketUpdatedEvent } from '@dstavila-gittix/common';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketUpdatedListener } from '../ticket-updated-listener';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  //Create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  //Create and save a ticket
  const ticket = new Ticket({
    _id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Concert',
    price: 10,
  });
  await ticket.save();
  //Create a fake data object
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version! + 1,
    price: 15,
    title: 'New Concert',
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  //Create a fake msg object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  //Return stuff
  return { msg, data, ticket, listener };
};

it('finds, updates and saves a ticket', async () => {});
it('acks the message', async () => {});
