import mongoose, { Schema, model, mongo } from 'mongoose';

import { Order, OrderStatus } from './order';

// 1. Create an interface representing a document in MongoDB.
export interface ITicketDocument {
  _id: string;
  title: string;
  price: number;
  isReserved?(): Promise<boolean>;
}

// 2. Create a Schema corresponding to the document interface.
const ticketSchema = new Schema<ITicketDocument>({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
});

ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });
  return !!existingOrder;
};

ticketSchema.set('toJSON', {
  transform(doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  },
  versionKey: false,
});

// 3. Create a Model.
const TicketModel = model<ITicketDocument>('Ticket', ticketSchema);

export class Ticket extends TicketModel {
  constructor(params: ITicketDocument) {
    super(params);
  }
}
