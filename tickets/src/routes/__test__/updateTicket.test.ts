import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'A new title',
      price: '50',
    })
    .expect(404);
});
it('returns a 401 if the user if not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'A new title',
      price: '50',
    })
    .expect(401);
});
it('returns a 401 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'Some title',
      price: 20,
    })
    .expect(201);

  //Make a put request as a different user -> global.singin() generates a different user id
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'Some new title',
      price: 21,
    })
    .expect(401);
});
it('returns a 400 is the user provides and invalid title or price', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Some title',
      price: 20,
    })
    .expect(201);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'Some title',
      price: -10,
    })
    .expect(400);
});
it('updates the ticket provided valid inputs', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Some title',
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'New Title', price: 25 })
    .expect(200);

  const ticketResponse = await request(app).get(
    `/api/tickets/${response.body.id}`
  );
  expect(ticketResponse.body.title).toEqual('New Title');
  expect(ticketResponse.body.price).toEqual(25);
});
