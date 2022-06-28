import React from "react";
import { Link } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { handleLogin } from "./api/auth/login";
import cookie from "js-cookie";
import { toast } from "react-toastify";
import {CODE_API_SUCCESS} from '../commom/constant'
const Login = () => {
  const Router = useRouter();
  const loginState = {username: "", password: ""};
  const [adminData, setAdminData] = useState(loginState)
  const {username, password} = adminData;
  
  const handleChangeInput = (e) =>{
    const {name, value} = e.target
    setAdminData({...adminData,[name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      "email": username,
      "password": password,
    }
    handleLogin(body)
      .then(res => {
        console.log(res)
        if(res.code===CODE_API_SUCCESS){
          cookie.set("token",res.token);
          Router.replace("/profiles");
        }else {
          console.log(33)
          toast.error(res.message)
        }

      
      })
      .catch(err => console.log(err))

  }

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
          <input type="text" placeholder="username" name="username" value={username} onChange={handleChangeInput}/>
          <input type="password" placeholder="password" name="password" value={password} onChange={handleChangeInput}/>
          <button onClick={handleSubmit}>login</button>
          <p className="message">
            Not registered? <Link href="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
