import "../styles/globals.css";
import Layout from "../components/Layout";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import 'react-toastify/dist/ReactToastify.css';
import theme from "../src/theme";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
export default function MyApp(props) {
  const { Component, pageProps } = props;
  var token;
  useEffect(() => {
    token = Cookies.get("token");
  });
  const Router = useRouter();
  const hiddenLayout = Router.pathname === "/login" ? true : false;
  const hiddenLayoutRegister = Router.pathname === "/register" ? true : false;

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title> Đồ Án Onwer </title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
          <link rel="icon" href="/logo1.png" /> 
      </Head>
      {
      hiddenLayout || hiddenLayoutRegister ? (
        <>
         <ToastContainer />
        <Component {...pageProps} />
        </>
       

      ) : (
        <Layout>
           <ToastContainer />
          <Component {...pageProps} />
        </Layout>
      )}
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
