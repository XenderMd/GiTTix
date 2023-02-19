import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  TicketCreatedEvent,
} from '@dstavila-gittix/common';
import { Ticket } from '../../models/ticket';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'orders-service';
  onMessage(data: TicketCreatedEvent['data'], msg: Message) {}
}
