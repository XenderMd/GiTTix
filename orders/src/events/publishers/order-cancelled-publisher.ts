import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from '@dstavila-gittix/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
