import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@dstavila-gittix/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
