import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async () => {
  //Create an instance of a ticket
  const ticket = new Ticket({
    title: 'concert',
    price: 20,
    userId: '123',
  });
  //Save the ticket to the database
  await ticket.save();
  //Fetch the ticket twice
  const firstTicketInstance = await Ticket.findById(ticket.id);
  const secondTicketInstance = await Ticket.findById(ticket.id);
  //Make two separate changes to the tickets we fetched
  firstTicketInstance!.set({ price: 10 });
  secondTicketInstance!.set({ price: 15 });
  //Save the first fetched ticket
  await firstTicketInstance!.save();
  //Save the second fetched ticket
  await expect(secondTicketInstance!.save()).rejects.toThrow();
});
