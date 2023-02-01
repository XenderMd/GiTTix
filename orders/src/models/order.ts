import mongoose, { Schema, model, mongo } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IOrderDocument {
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: TicketDoc;
}

// 2. Create a Schema corresponding to the document interface.
const orderSchema = new Schema<IOrderDocument>({
  userId: { type: String, required: true },
  status: { type: String, required: true },
  expiresAt: { type: mongoose.Schema.Types.Date },
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
});

orderSchema.set('toJSON', {
  transform(doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  },
  versionKey: false,
});

// 3. Create a Model.
const OrderModel = model<IOrderDocument>('Order', orderSchema);

export class Order extends OrderModel {
  constructor(params: IOrderDocument) {
    super(params);
  }
}
