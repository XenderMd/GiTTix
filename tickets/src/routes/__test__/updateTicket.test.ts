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
it('returns a 400 is the user provides and invalid title or price', async () => {});
it('updates the ticket provided valid inputs', async () => {});
