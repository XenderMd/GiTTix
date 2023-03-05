import { Schema, model } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// 1. Create an interface representing a document in MongoDB.
interface ITicketDocument {
  title: string;
  userId: string;
  price: number;
  version?: number;
  orderId?: string;
}

// 2. Create a Schema corresponding to the document interface.
const ticketSchema = new Schema<ITicketDocument>({
  title: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
  orderId: { type: String, required: false },
});

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

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
