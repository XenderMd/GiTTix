import mongoose, { Schema, model, mongo } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface ITicketDocument {
  title: string;
  price: number;
}

// 2. Create a Schema corresponding to the document interface.
const ticketSchema = new Schema<ITicketDocument>({
  title: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
});

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
