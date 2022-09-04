import { useState } from "react";
import Router from "next/router";

import useRequest from "../../hooks/use-request";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errors, doRequest } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: { email, password },
    onSuccess:()=>{Router.push("/");}
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign in</h1>
      <div className="mb-3">
        <label htmlFor="signinEmail" className="form-label">
          Email Address
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="signinEmail"
          className="form-control"
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="signinPassword" className="form-label">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="signinPassword"
          className="form-control"
          type="password"
        ></input>
      </div>
      {errors}
      <button className="btn btn-primary">Sign In</button>
    </form>
  );
};

export default signup;
