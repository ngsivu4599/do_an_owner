import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import authService from "./api/auth";
import { RegisterAPI } from "./api/auth/register";

const Register = () => {
  const Router = useRouter();
  const registerState = { username: "", password: "" };
  const [registerData, setRegisterData] = useState(registerState);
  const { username, password } = registerData;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const body = {
      username: username,
      password: password,
      role: "admin",
      admin: {
        name: username,
      },
    };
    authService
      .handleRegister(body)
      .then((res) => {
        console.log(res);
        // Router.replace("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
          <input
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={handleChangeInput}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
          <button onClick={handleRegister}>register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
