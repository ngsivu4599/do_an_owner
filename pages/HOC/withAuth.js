import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';

const withAuth = (WrappedComponent) => {
    return (props) => {
        if (typeof window !== "undefined") {
            const Router = useRouter();
            const token = Cookies.get("token");
            if (!token) {
                Router.replace("/login");
                return null;
            }
            return <WrappedComponent {...props }
            /> 
        } else {
            // if we are on server, return null
            return null;
        }
    }
};

export default withAuth;