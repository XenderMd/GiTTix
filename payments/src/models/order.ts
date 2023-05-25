import { Schema, model, Types } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { OrderStatus } from '@dstavila-gittix/common';

// 1. Create an interface representing a document in MongoDB.
export interface IOrderDocument {
  _id: Types.ObjectId;
  version?: number;
  userId: string;
  price: number;
  status: OrderStatus;
}

// 2. Create a Schema corresponding to the document interface.
const orderSchema = new Schema<IOrderDocument>({
  _id: { type: 'ObjectID', required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created,
  },
});

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

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
