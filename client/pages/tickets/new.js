import { useState } from 'react';

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id='title'
            className='form-control'
          ></input>
        </div>
        <div className='mb-3'>
          <label htmlFor='price' className='form-label'>
            Price
          </label>
          <input
            value={price}
            onBlur={onBlur}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            id='price'
            className='form-control'
          ></input>
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default NewTicket;
