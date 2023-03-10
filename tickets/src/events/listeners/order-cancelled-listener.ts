import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import {
  Listener,
  OrderCancelledEvent,
  Subjects,
} from '@dstavila-gittix/common';
import { queueGroupName } from './queue-group-name';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const ticket = await Ticket.findOne({ orderId: data.id });
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    await ticket.set({ orderId: undefined });
    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      orderId: ticket.orderId,
      userId: ticket.userId,
      version: ticket.version || 0,
    });
    msg.ack();
  }
}
