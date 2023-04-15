import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@dstavila-gittix/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
