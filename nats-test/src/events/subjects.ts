export enum Subjects {
  TicketCreated = 'ticket:creatd',
  OrderUpdated = 'order:updated',
}

const printSubject = (subject: Subjects) => {};

printSubject(Subjects.TicketCreated);
