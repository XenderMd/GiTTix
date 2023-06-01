import { Schema, model } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// 1. Create an interface representing a document in MongoDB.
interface IPaymentDocument {
  stripeId: string;
  orderId: string;
  version?: number;
}

// 2. Create a Schema corresponding to the document interface.
const paymentSchema = new Schema<IPaymentDocument>({
  stripeId: { type: String, required: true },
  orderId: { type: String, required: false },
});

paymentSchema.set('versionKey', 'version');
paymentSchema.plugin(updateIfCurrentPlugin);

paymentSchema.set('toJSON', {
  transform(doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  },
  versionKey: false,
});

// 3. Create a Model.
const PaymentModel = model<IPaymentDocument>('Payment', paymentSchema);

export class Payment extends PaymentModel {
  constructor(params: IPaymentDocument) {
    super(params);
  }
}
