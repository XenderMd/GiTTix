import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

import { Order } from '../../models/order';
import { Payment } from '../../models/payment';
import { OrderStatus } from '@dstavila-gittix/common';
import { stripe } from '../../stripe';

it('returns a 404 when purchasing an order that does not exist', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'asdasdasd',
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it('returns a 401 when purchasing an order that does not belong to the user', async () => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Created,
    version: 0,
  });
  await order.save();
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'asdasdasd',
      orderId: order.id,
    })
    .expect(401);
});

it('returns a 400 when purchasing a cancelled order', async () => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Cancelled,
    version: 0,
  });
  await order.save();
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(order.userId))
    .send({
      token: 'asdasdasd',
      orderId: order.id,
    })
    .expect(400);
});

it('returns a 201 with valid inputs', async () => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Created,
    version: 0,
  });
  await order.save();
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(order.userId))
    .send({
      token: 'tok_visa',
      orderId: order.id,
    })
    .expect(201);

  const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
  expect(chargeOptions.source).toEqual('tok_visa');
  expect(chargeOptions.amount).toEqual(10 * 100);
  expect(chargeOptions.currency).toEqual('usd');

  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: 'stripeChargeId',
  });
  expect(payment).not.toBeNull();
});
