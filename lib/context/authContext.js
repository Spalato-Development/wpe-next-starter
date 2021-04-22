import React, { createContext, useState, useEffect } from 'react';

// https://dev.to/ksushiva/authentication-with-react-js-9e4
export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        loading: true,
        loggedUser: null
    });
    // we will use loading later


    const setAuthData = (data) => {
        setAuth({
            loading: false,
            ...data
        });
    };

    //2. if object with key 'authData' exists in localStorage, we are putting its value in auth.data and we set loading to false. 
    //This function will be executed every time component is mounted (every time the user refresh the page);
    useEffect(() => {
        let loggedUser = null
        try {
            loggedUser = JSON.parse(window.localStorage.getItem('authData'))
        } catch (error) {

        }
        setAuth({
            loading: false,
            loggedUser
        });
    }, []);

    // 1. when **auth.data** changes we are setting **auth.data** in localStorage with the key 'authData'.
    useEffect(() => {
        window.localStorage.setItem('authData', JSON.stringify(auth.loggedUser));
    }, [auth.loggedUser]);


    return (
        <AuthContext.Provider value={{ auth, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;