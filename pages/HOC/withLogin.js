import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';

const withLogin = (authComponent) => {
    return (props) => {
        const token = Cookies.get("token");
        const Router = useRouter();
        if(token){
            Router.replace("/dashboard");
        }
    }
};

export default withLogin;