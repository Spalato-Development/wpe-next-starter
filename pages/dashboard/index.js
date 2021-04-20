import React, { useContext, useEffect } from "react";
import Router from 'next/router'
import { AuthContext } from "../../lib/context/authContext";

const Dashboard = () => {

    const { auth } = useContext(AuthContext);
    const { loading } = auth;

    useEffect(() => {
        // if (!loading && (!auth || !auth.data)) {
        if ((!auth || !auth.data)) {
            Router.push("/auth/login")
        }
    }, [auth])

    if (loading) {
        return <p>Loading ...</p>
    }

    console.log("auth.data: ", auth.data)
    return (
        <>
            <h1>Dashboard</h1>
            {/* <h2>{auth.data.name}</h2> */}
        </>
    )
}

export default Dashboard;