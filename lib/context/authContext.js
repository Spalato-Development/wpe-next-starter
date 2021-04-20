import React, { createContext, useState, useEffect } from 'react';

// https://dev.to/ksushiva/authentication-with-react-js-9e4
export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ loading: true, data: null });
    // we will use loading later


    const setAuthData = (data) => {
        setAuth({
            data: data,

        });
    };

    //2. if object with key 'authData' exists in localStorage, we are putting its value in auth.data and we set loading to false. 
    //This function will be executed every time component is mounted (every time the user refresh the page);
    useEffect(() => {
        setAuth({
            loading: false,
            data: JSON.parse(window.localStorage.getItem('authData'))
        });
    }, []);

    // 1. when **auth.data** changes we are setting **auth.data** in localStorage with the key 'authData'.
    useEffect(() => {
        window.localStorage.setItem('authData', JSON.stringify(auth.data));
    }, [auth.data]);


    return (
        <AuthContext.Provider value={{ auth, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;