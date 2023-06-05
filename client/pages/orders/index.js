import axiosClient from '../../api/build-client';

const OrderIndex = ({ orders }) => {
  return (
    <ul>
      {orders.map((order) => {
        return (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li>
        );
      })}
    </ul>
  );
};

OrderIndex.getInitialProps = async (context) => {
  const client = axiosClient(context);
  const orderData = (await client.get(`/api/orders`)).data;
  return { orders: orderData };
};

export default OrderIndex;
