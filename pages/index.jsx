import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import Login from "./login";
import cookie from "js-cookie";
import { useRouter } from "next/router";

function Index(){
  const token = cookie.get("token");
  const Router = useRouter();
  console.log(token)
  useEffect(()=>{
    Router.replace("/login");
  })
  return (
    <div className="app">
       
    </div>
  )
}

export default Index;