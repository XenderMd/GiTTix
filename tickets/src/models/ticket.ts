import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface ITicketDocument {
  title: string;
  price: string;
}

// 2. Create a Schema corresponding to the document interface.
const ticketSchema = new Schema<ITicketDocument>({
  title: { type: String, required: true },
  price: { type: String, required: true },
});

ticketSchema.set('toJSON', {
  transform(doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  },
  versionKey: false,
});

// 3. Create a Model.
const TicketModel = model<ITicketDocument>('User', ticketSchema);

export class Ticket extends TicketModel {
  constructor(params: ITicketDocument) {
    super(params);
  }
}
