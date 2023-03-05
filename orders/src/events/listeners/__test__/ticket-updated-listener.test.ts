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
    _id: new mongoose.Types.ObjectId(),
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

it('finds, updates and saves a ticket', async () => {
  const { ticket, msg, listener, data } = await setup();
  await listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
  const { msg, data, listener } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has skipped a version number', async () => {
  const { msg, data, listener } = await setup();
  data.version = 10;
  expect(listener.onMessage(data, msg)).rejects.toThrow();
  expect(msg.ack).not.toHaveBeenCalled();
});
