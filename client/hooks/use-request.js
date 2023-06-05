import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });
      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (error) {
      setErrors(
        <div className='alert alert-danger'>
          <h4>Oooops...</h4>
          <ul className='my-0'>
            {error.response.data.map((error) => {
              return <li key={error.message}>{error.message}</li>;
            })}
          </ul>
        </div>
      );
    }
  };

  return { errors, doRequest };
};

export default useRequest;
