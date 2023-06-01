import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@dstavila-gittix/common';

export class PaymentCreatdPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
