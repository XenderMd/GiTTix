import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@dstavila-gittix/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
