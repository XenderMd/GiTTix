import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('fetches the order', async () => {
  const user = global.signin();
  //Craete a ticket
  const ticket = new Ticket({ title: 'Concert', price: 20 });
  await ticket.save();

  //Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  //Make a request to fetch the order
  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .expect(200);
  expect(fetchOrder.id).toEqual(order.id);
});

it('returns an error if one user tries to fetch another users order', async () => {
  const userOne = global.signin();
  const userTwo = global.signin();
  //Craete a ticket
  const ticket = new Ticket({ title: 'Concert', price: 20 });
  await ticket.save();

  //Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticket.id })
    .expect(201);
  //Make a request to fetch the order

  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', userTwo)
    .expect(401);
});
