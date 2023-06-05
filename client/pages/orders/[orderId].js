import axiosClient from '../../api/build-client';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }
  return (
    <div>
      Time left to pay {timeLeft} seconds
      <StripeCheckout
        token={(token) => console.log(token)}
        stripeKey='pk_test_51NEAqZIYimF0LdsRMHo70BdfU2qVxHTNPJQApX6VZbctrQm4CORIshFFwGAwbIgYddjzqvLEcTbDA8ciMd7tORPV00StFmDxgo'
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
    </div>
  );
};

OrderShow.getInitialProps = async (context) => {
  const { orderId } = context.query;
  const client = axiosClient(context);
  const orderData = (await client.get(`/api/orders/${orderId}`)).data;
  return { order: orderData };
};

export default OrderShow;
