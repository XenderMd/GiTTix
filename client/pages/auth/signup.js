import { useState } from "react";
import axios from "axios";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", {
        email,
        password,
      });
    } catch (error) {
        setErrors(error.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign up</h1>
      <div className="mb-3">
        <label htmlFor="signupEmail" className="form-label">
          Email Address
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="signupEmail"
          className="form-control"
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="signupPassword" className="form-label">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="signupPassword"
          className="form-control"
          type="password"
        ></input>
      </div>
      {errors.length>0 && <div className="alert alert-danger">
        <h4>Oooops...</h4>
        <ul className="my-0">
            {errors.map((error)=>{return(<li key={error.message}>{error.message}</li>)})}
        </ul>
      </div>}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default signup;
