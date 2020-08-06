import React, { useState } from "react";
import AxiosWithAuth from "../utils/AxiosWithAuth";

const Login = (props) => {
  const [loginCredentials, setLoginCredentials] = useState({});

  const handleChange = (event) => {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await AxiosWithAuth().post("/api/login", loginCredentials);

      props.history.push("/users");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username..."
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password..."
          onChange={handleChange}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
